from flask import Flask
from flask_sqlalchemy import SQLAlchemy


db = SQLAlchemy()

class User(db.Model):
    """Stores information about each user on the iSpeakPlantish website."""

    __tablename__ = "users"

    user_id = db.Column(db.Integer,
                        primary_key=True,
                        unique=True,
                        autoincrement=True)
    first_name = db.Column(db.String(100), nullable = False)
    last_name = db.Column(db.String(100), nullable = False)
    email = db.Column(db.String(100), unique=True, nullable = False)
    password = db.Column(db.String(100), unique=True, nullable = False)
    profile_photo_url = db.Column(db.String(500),
                                  nullable = True, 
                                  default = '/static/img/default-profile-photo.png')
    phone_number = db.Column(db.String(10), unique=True, nullable = True)
    reminders_enabled = db.Column(db.Boolean, default = False)
    created_at = db.Column(db.Date)

    # followers = db.relationship('Follower')
    entries = db.relationship('Entry')
    houseplants = db.relationship('Houseplant')

    def __repr__(self):
        return f"User('{self.first_name}', '{self.last_name}', '{self.email}')"


# class Follower(db.Model):
#     """Stores information regarding which users follow other users."""

#     __tablename__ = "followers"

#     follower_id = db.Column(db.Integer, 
#                             db.ForeignKey('users.user_id'), 
#                             unique=True,
#                             primary_key=True,)
#     followed_id = db.Column(db.Integer, db.ForeignKey('users.user_id'))

#     users = db.relationship('User')


class Entry(db.Model):
    """Stores all the entries that were written for each user's houseplant."""

    __tablename__ = "entries"

    journal_entry_id = db.Column(db.Integer, 
                                primary_key=True,
                                unique=True,
                                autoincrement=True)
    journal_entry_text = db.Column(db.String(10000), nullable=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.user_id'), nullable=False)
    user_houseplant_id = db.Column(db.Integer, 
                                   db.ForeignKey('houseplants.user_houseplant_id'), 
                                   nullable=False)
    date_time = db.Column(db.DateTime)
    water_update = db.Column(db.String(100), nullable=True)
    fertilizer_update = db.Column(db.String(100), nullable=True)
    rotation_update = db.Column(db.String(100), nullable=True)
    light_update = db.Column(db.String(100), nullable=True)

    users = db.relationship('User')
    houseplants = db.relationship('Houseplant')
    photos = db.relationship('Photo')


class Photo(db.Model):
    """Stores photo updates for all of user's houseplants."""

    __tablename__ = "photos"

    photo_id = db.Column(db.Integer, 
                        primary_key=True,
                        unique=True,
                        autoincrement=True)
    journal_entry_id = db.Column(db.Integer, db.ForeignKey('entries.journal_entry_id'))
    photo_url = db.Column(db.String(500), nullable=False)
    photo_update = db.Column(db.DateTime, nullable=False)

    entries = db.relationship('Entry')


class Houseplant(db.Model):
    """Stores all houseplants of each user."""

    __tablename__ = "houseplants"

    user_houseplant_id = db.Column(db.Integer,
                                  primary_key=True,
                                  unique=True,
                                  autoincrement=True)
    common_houseplant_id = db.Column(db.Integer, 
                                     db.ForeignKey('common_houseplants.common_houseplant_id'), 
                                     nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.user_id'), nullable=False)

    common_houseplants = db.relationship('CommonHouseplant')
    users = db.relationship('User')
    entries = db.relationship('Entry')


class CommonHouseplant(db.Model):
    """Stores information about the most common houseplants."""

    __tablename__ = "common_houseplants"

    common_houseplant_id = db.Column(db.Integer,
                                    primary_key=True,
                                    unique=True,
                                    autoincrement=True)
    latin_name = db.Column(db.String(500), nullable=False)
    common_name = db.Column(db.String(500), nullable=True)
    common_houseplant_photo_url = db.Column(db.String(500), nullable=False)
    light_requirements = db.Column(db.String(500),nullable=True)
    general_description = db.Column(db.String(500), nullable=False)

    houseplants = db.relationship('Houseplant')


##############################################################################
# Helper functions
def connect_to_db(app):
    """Connect the database to the Flask app."""

    app.config["SQLALCHEMY_DATABASE_URI"] = 'postgresql:///ispeakplantish_db'
    app.config["SQLALCHEMY_ECHO"] = False
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

    db.app = app
    db.init_app(app)

if __name__ == "__main__":
    """If this module is run interactively, 
    you are able to work with the database directly."""

    from server import app
    connect_to_db(app)
    print("Connected to database")
    db.create_all()
