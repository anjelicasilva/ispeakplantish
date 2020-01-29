from flask import Flask, render_template, redirect, request
from flask_debugtoolbar import DebugToolbarExtension
from jinja2 import StrictUndefined
import csv

from model import db, connect_to_db


app = Flask(__name__)

# Key required to run Flask sessions and for the debug toolbar
app.secret_key = 'ispeakplantish'

# Rather than failing silently, undefined variables in Jinja2 raise an error.
app.jinja_env.undefined = StrictUndefined


@app.route("/")
def show_index():
    """Show the iSpeakPlantish index."""
    
    return render_template("index.html")





















# @app.route("/add-houseplant-form")
# def add_new_houseplant_form():
#     """Show form to add a new houseplant."""
#     common_houseplants_lst = []
#     with open('seed_data/common-houseplants-data.csv', newline='') as csvfile:
#             reader = csv.DictReader(csvfile)
#             for row in reader:
#                 common_houseplant_latin_name = row['Latin Name'].strip()
#                 common_houseplants_lst = common_houseplants_lst.append(common_houseplant_latin_name)


#     return render_template(common_houseplants_lst, "add_new_houseplant_form.html")


# @app.route("/add-houseplant", methods=["POST"])
# def add_houseplant():
#     """Add new houseplant information to database."""

#     latin_name = request.form.get("latinName")
#     common_name = request.form.get("commonName")
#     light_requirements = request.form.get("lightRequirements")
#     notes = request.form.get("notes")

#     print(latin_name, common_name, light_requirements, notes)
#     return redirect("/")


#############################################

if __name__ == '__main__':
    connect_to_db(app)
    # We have to set debug=True here, since it has to be True at the point
    # that we invoke the DebugToolbarExtension
    app.run(debug=True,  host='0.0.0.0')

    #Use the DebugToolbar
    DebugToolbarExtension(app)
