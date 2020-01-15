from flask import Flask, render_template, request, session, jsonify
from flask_debugtoolbar, import DebugToolbarExtension

from model import db, connect_to_db

app = Flask(__name__)

# Key required to run Flask sessions and for the debug toolbar
app.secret_key = 'ispeakplantish'

@app.route("/")
def show_homepage():
    """Show the iSpeakPlantish homepage."""
    return render_template("homepage.html")

#############################################

if __name__ == '__main__':
    connect_to_db(app)
    app.run(debug=True, host='0.0.0.0')
    
    #Use the DebugToolbar
    DebugToolbarExtension(app)
