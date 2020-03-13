from model import db, connect_to_db, User, Follower, Entry, Photo, Houseplant, CommonHouseplant
from flask import Flask, render_template, redirect, request, jsonify, flash, session
from flask_debugtoolbar import DebugToolbarExtension
from jinja2 import StrictUndefined
import csv
import time
from datetime import datetime, date
import json
import os
from random import randint
from werkzeug.utils import secure_filename
import cloudinary
import cloudinary.uploader
import cloudinary.api
from twilio.rest import Client
from flask_socketio import SocketIO, emit, send, join_room, leave_room
# import emojis
from time import localtime, strftime


app = Flask(__name__)

# Key required to run Flask sessions and for the debug toolbar
app.secret_key = 'ispeakplantish'

# Rather than failing silently, undefined variables in Jinja2 raise an error.
app.jinja_env.undefined = StrictUndefined

#Set cloudinary configuration parameters globally
cloudinary.config(
    cloud_name = os.environ.get('CLOUDINARY_CLOUD_NAME'),
    api_key = os.environ.get('CLOUDINARY_API_KEY'),
    api_secret = os.environ.get('CLOUDINARY_API_SECRET'),
    cloudinary_url = os.environ.get('CLOUDINARY_URL'),
    cloudinary_upload_preset = os.environ.get('CLOUDINARY_UPLOAD_PRESET')
)


@app.route("/")
def show_index():
    """Show the iSpeakPlantish homepage."""
    # google_api_key = os.environ.get('GOOGLE_API_KEY')

    # return render_template("index.html", 
    #                         google_api_key=google_api_key)
    # return render_template("googleMapsIndex.html")
    return render_template("index.html")


@app.route('/api/users')
def get_users():

    users = User.query.all()
    return jsonify({user.user_id: user.to_dict() for user in users})


@app.route('/api/followers')
def get_followers():

    followers = Follower.query.all()
    return jsonify({follower.id: follower.to_dict() for follower in followers})


@app.route('/api/entries')
def get_entries():

    entries = Entry.query.all()
    return jsonify({entry.journal_entry_id: entry.to_dict() for entry in entries})


@app.route('/api/photos')
def get_photos():

    photos = Photo.query.all()
    return jsonify({photo.photo_id: photo.to_dict() for photo in photos})


@app.route('/api/houseplants')
def get_houseplants():
    # if request.is_json:
    #     my_stuff = request.json()
    houseplants = Houseplant.query.all()
    return jsonify({houseplant.user_houseplant_id: houseplant.to_dict() for houseplant in houseplants})


@app.route('/api/common_houseplants')
def get_common_houseplants():
    # time.sleep(7)
    common_houseplants = CommonHouseplant.query.all()
    return jsonify({common_houseplant.common_name: common_houseplant.to_dict() for common_houseplant in common_houseplants})


# Houseplants owned by User 1
@app.route('/api/houseplants/user1')
def get_user_specific_houseplants():
    users_houseplants = Houseplant.query.filter_by(user_id="1").all()
    return jsonify({users_houseplant.user_houseplant_id: users_houseplant.to_dict() for users_houseplant in users_houseplants})



###############################################################################
#                                                                             #
#                      USER AUTHENTICATION ROUTES                             #
#                                                                             #
###############################################################################



@app.route('/api/register', methods=['POST'])
def register():
    """Register user and save user information to database"""
   
    fname = request.form.get('addFirstName')
    lname = request.form.get('addLastName')
    email = request.form.get('addEmail')
    password = request.form.get('addPassword')
    reenter = request.form.get('addReEnter')
    phone = request.form.get('addPhone')

    user = User.query.filter_by(email = email).first()

    # if user != None and user.email == email and user.check_password(password) == True:
    # #Already exists in the system
    #     return 'Please try logging in'

    if user != None: 
        return 'An account with this email already exists'

    # if the password and re-entered password does not match
    elif password != reenter:
        return 'Password does not match, please try again'

    # New user
    else:
        new_user = User(first_name = fname,
                        last_name = lname,
                        email = email,
                        password = password, 
                        phone_number = phone,
                        created_at = datetime.today())

        #set password
        new_user.set_password(password)

        db.session.add(new_user)
        db.session.commit()

        #save user to session
        newly_registered_user = User.query.filter_by(email = email).first()
        session['current_user_id'] = newly_registered_user.user_id
        session['first_name'] = newly_registered_user.first_name

        return {'current_user_id': session['current_user_id'],
                'first_name': newly_registered_user.first_name,
                'last_name': newly_registered_user.last_name,
                }


@app.route("/api/login", methods=["POST"])
def verify_user():
    """Verify and log in user"""
    
    email = request.form.get("loginEmail")
    password = request.form.get("loginPassword")

    verify_user = User.query.filter_by(email=email).first()
    print('verify which user', verify_user)
    if verify_user:
        if verify_user.check_password(password) == True:
            session['current_user_id'] = verify_user.user_id
            session['first_name'] = verify_user.first_name
            return {'current_user_id': session['current_user_id'],
                    'first_name': verify_user.first_name,
                    'last_name': verify_user.last_name,}
        else:
            return 'Incorrect Password'
    return 'Incorrect Login Information'


@app.route("/api/profile", methods=["GET"])
def show_user_profile():
    """Return the current user's profile"""
    
    #default to none if it doesn't exist
    current_user_id = session.get('current_user_id', None)
    
    if current_user_id != None:
        current_user = User.query.filter_by(user_id=current_user_id).first()
        print('check', current_user)
        current_user_info = {
                            'current_user_id': current_user_id,
                            'first_name':current_user.first_name,
                            'last_name':current_user.last_name,
                            'is_user_logged_in': 'yes',
                            }
    else:
        current_user_info = {'is_user_logged_in': 'no'}
    return jsonify(current_user_info)


@app.route("/api/logout", methods=["GET"])
def user_logout():
    """Log out user from session"""
    
    # If key is in the dictionary, remove it and return its value, else return default. 
    # If default is not given and key is not in the dictionary, a KeyError is raised.
    session.pop('current_user_id', None)
    session.pop('first_name', None)

    return 'User is logged out'



###############################################################################
#                                                                             #
#                           ENTRIES ROUTES                                    #
#                                                                             #
###############################################################################



@app.route('/api/add_new_houseplant_to_user_profile', methods=['POST'])
def add_new_houseplant_data():
    common_houseplant_id = request.form.get('addCommonHouseplantId')
    current_user_id= request.form.get('currentUserId')

    add_users_new_houseplant = Houseplant(
        common_houseplant_id = common_houseplant_id,
        user_id = current_user_id,
    )

    db.session.add(add_users_new_houseplant)
    db.session.commit()

    return 'New houseplant added!'


@app.route('/api/add_new_journal_entry_to_user_profile', methods=['POST'])
def add_new_journal_entry_data():

    current_user_id= request.form.get('currentUserId')
    user_houseplant_id = request.form.get('addUserHouseplantId')
    journal_entry_text = request.form.get('addJournalEntryText')
    water_update = request.form.get('addWaterUpdate')
    date_time = request.form.get('addDateTime')

    #testing pyramid
    # create method needs_update(string) => boolean

    if water_update == "true":
        water_update = True
    else:
        water_update = False

    fertilizer_update = request.form.get('addFertilizerUpdate')
    if fertilizer_update == "true":
        fertilizer_update = True
    else:
        fertilizer_update = False
    
    add_users_new_journal_entry = Entry(
        date_time = date_time,
        journal_entry_text = journal_entry_text,
        water_update = water_update,
        fertilizer_update = fertilizer_update,
        # hardcode user_id and user_houseplant_id for now until, user signup pages are created
        user_id = current_user_id,
        # access this value from the frontend
        user_houseplant_id = user_houseplant_id
    )

    db.session.add(add_users_new_journal_entry)
    db.session.commit()

    print(add_users_new_journal_entry.journal_entry_id)

    # add image endpoint

    return str(add_users_new_journal_entry.journal_entry_id)  #return journal entry id


ALLOWED_EXTENSIONS = {'gif', 'png', 'jpg', 'jpeg'}

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


@app.route('/api/add_image', methods=['POST'])
def add_user_houseplant_images():
    "Add user's personal houseplant photos to database"
    
    # num_of_all_entries = Entry.query.count()
    file = request.files['file']
    journal_id = request.form['journalEntryId']
    # check if the post request has the file part
    if 'file' not in request.files:
        flash('File extension not allowed')
        
    file = request.files['file']
    if file.filename == '':
        flash('No selected file')
        
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        
        upload_img_file = cloudinary.uploader.upload(file,
                                                    folder = 'ispeakplantish',
                                                    )
        print('upload_img_file:')
        print(upload_img_file)
        new_photo = Photo(journal_entry_id = journal_id,
                        photo_url = upload_img_file['secure_url'],
                        )

        db.session.add(new_photo)
        db.session.commit()
    
    return 'Added to cloudinary!'



###############################################################################
#                                                                             #
#                          NICE-TO-HAVES ROUTES                               #
#                                                                             #
###############################################################################



@app.route('/api/send_sms', methods=['POST'])
def send_sms_reminder():
    "Send user a sms reminder to water or fertilize their plant"

    selected_sms_reminder = request.form.get('selectedSMSReminder')
    selected_common_name = request.form.get('selectedCommonName')

    if selected_common_name == None:
        selected_common_name = "plants"
    if selected_sms_reminder == 'sendWaterSMS':
        sms_body = f'Friendly reminder to water your {selected_common_name} today.'
 
    elif selected_sms_reminder == 'sendFertilizerSMS':
        sms_body = f'Friendly reminder to fertilize your {selected_common_name} today.'


    phone = os.environ.get("PHONE_NUMBER")
    twilio_phone = os.environ.get("TWILIO_PHONE_NUMBER")
    account_sid = os.environ.get("TWILIO_ACCOUNT_SID")
    auth_token = os.environ.get("TWILIO_AUTH_TOKEN")

    client = Client(account_sid, auth_token)

    message = client.messages.create(
        to = phone,
        from_ = twilio_phone,
        body = sms_body,
        )

    return 'Sent user a SMS reminder'


@app.route('/api/plant_of_the_day')
def plant_of_the_day():

    random_common_houseplant_id = randint(1,92)
    plant_of_the_day = CommonHouseplant.query.filter_by(common_houseplant_id=str(random_common_houseplant_id)).all()
    
    return jsonify({plant.common_houseplant_id: plant.to_dict() for plant in plant_of_the_day})


###############################################################################
#                                                                             #
#                          SOCKETIO                                           #
#                                                                             #
###############################################################################


# socketio = SocketIO(app)

# def messageReceived():
#   print('message was received!!!')

# @socketio.on('message')
# def handle_my_custom_event(json):
#   print('received my event: ' + str( json ))

#   socketio.emit('my response', json)



################



socketio = SocketIO(app)
ROOMS = ["General Discussion", "Plant Diagnosis", "Trading", "Free Cuttings"]

@app.route('/chat')
def test():
    return  render_template('forum.html', 
                            current_user_name = session.get('first_name', None),
                            rooms=ROOMS)


@app.route('/api/forum')
def forum_info():
    return {'current_user_name': session['first_name'],
            'rooms': ROOMS,
           }


@socketio.on('message')
def message(data):

  print(f"\n\n{data}\n\n")
  
  send({'msg': data['msg'],
        'current_user_name': data['currentUserName'],
        'time_stamp': strftime('%b-%d %I:%M%p', localtime())},
        room=data['room'])


@socketio.on('join')
def join(data):
    join_room(data['room'])
    send({'msg': data['currentUserName'] + " has joined the " + data['room'] + " room."}, 
          room=data['room'])


@socketio.on('leave')
def leave(data):

    leave_room(data['room'])
    send({'msg': data['currentUserName'] + " has left the " + data['room'] + " room."}, 
          room=data['room'])


#############################################

if __name__ == '__main__':
    connect_to_db(app)
    # We have to set debug=True here, since it has to be True at the point
    # that we invoke the DebugToolbarExtension
    # app.run(debug=True,  host='0.0.0.0')
    socketio.run(app, debug = True, host='0.0.0.0')
    #Use the DebugToolbar
    DebugToolbarExtension(app)