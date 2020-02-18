from flask import Flask, render_template, redirect, request, jsonify, flash
from flask_debugtoolbar import DebugToolbarExtension
from jinja2 import StrictUndefined
import csv
import time
import json

import os
from werkzeug.utils import secure_filename
import cloudinary
import cloudinary.uploader
import cloudinary.api

from model import db, connect_to_db, User, Follower, Entry, Photo, Houseplant, CommonHouseplant


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
    """Show the iSpeakPlantish index."""
    
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


@app.route('/add_new_houseplant_to_user_profile', methods=['POST'])
def add_new_houseplant_data():
    
    # if request.is_json:
    #     my_stuff = request.json()
    common_houseplant_id = request.form.get('addCommonHouseplantId')
    
    add_users_new_houseplant = Houseplant(
        common_houseplant_id = common_houseplant_id,
        # hardcode user for now until, user signup pages are created
        user_id = 1
    )

    db.session.add(add_users_new_houseplant)
    db.session.commit()

    return 'New houseplant added!'


@app.route('/add_new_journal_entry_to_user_profile', methods=['POST'])
def add_new_journal_entry_data():

    user_houseplant_id = request.form.get('addUserHouseplantId')

    journal_entry_text = request.form.get('addJournalEntryText')

    water_update = request.form.get('addWaterUpdate')
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
        journal_entry_text = journal_entry_text,
        water_update = water_update,
        fertilizer_update = fertilizer_update,
        # hardcode user_id and user_houseplant_id for now until, user signup pages are created
        user_id = 1,
        # access this value from the frontend
        user_houseplant_id = user_houseplant_id
    )

    db.session.add(add_users_new_journal_entry)
    db.session.commit()

    return 'New journal entry added!'


ALLOWED_EXTENSIONS = {'gif', 'png', 'jpg', 'jpeg'}

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/add_image', methods=['POST'])
def add_user_houseplant_images():
    "Add user's personal houseplant photos to database"
    
    #Get number of journal entry records found without fetching and add 1 to get the 
    # current journal entry id to be added next
    num_of_all_entries = Entry.query.count()

    file = request.files['file']
   
    # check if the post request has the file part
    if 'file' not in request.files:
        flash('File extension not allowed')
        
    file = request.files['file']
    # if user does not select file, browser also
    # submit an empty part without filename
    if file.filename == '':
        flash('No selected file')
        
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        
        upload_img_file = cloudinary.uploader.upload(file,
                                                    folder = 'ispeakplantish',
                                                    )
                                                    #change public_id to plant photo id from database
        print('upload_img_file:')
        print(upload_img_file)

        #request journal_entry_id from form or num of all entries + 1 
        # after figuring out how to upload the image to cloudinary at the same time
        # when the journal entry text is being added
        new_photo = Photo(journal_entry_id = (num_of_all_entries),
                        photo_url = upload_img_file['secure_url'],)


        db.session.add(new_photo)
        db.session.commit()
    
    return 'Added to cloudinary!'

#############################################

if __name__ == '__main__':
    connect_to_db(app)
    # We have to set debug=True here, since it has to be True at the point
    # that we invoke the DebugToolbarExtension
    app.run(debug=True,  host='0.0.0.0')

    #Use the DebugToolbar
    DebugToolbarExtension(app)
    