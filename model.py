from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime, date
import pytz
from tzlocal import get_localzone
tz = get_localzone()
PST = pytz.timezone('America/Los_Angeles')
UTC = pytz.timezone('UTC')
#LOGIN, LOGOUT, REGISTRATION
from werkzeug.security import generate_password_hash, check_password_hash


db = SQLAlchemy()
# default=(datetime.today()).astimezone(pytz.timezone('US/Pacific')))

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
    password = db.Column(db.String(10000), nullable = False)
    profile_photo_url = db.Column(db.String(500),
                                  nullable = True, 
                                  default = '/static/img/default-profile-photo.png')
    phone_number = db.Column(db.String(11), unique=True, nullable = True)
    reminders_enabled = db.Column(db.Boolean, default = False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow())

    followers = db.relationship('Follower',
                                primaryjoin="User.user_id==Follower.followed_id")
    entries = db.relationship('Entry')
    houseplants = db.relationship('Houseplant')

    def __repr__(self):
        return f"User('{self.first_name}', '{self.last_name}', '{self.email}')"

    def to_dict(self):
        return {'user_id': self.user_id,
                'first_name': self.first_name,
                'last_name': self.last_name,
                'email': self.email,
                'password': self.password,
                'profile_photo_url': self.profile_photo_url,
                'phone_number': self.phone_number,
                'reminders_enabled': self.reminders_enabled,
                'created_at': self.created_at}
    
   #Functions to encrypt and hash passwords
   #returns None
    def set_password(self, password):
        self.password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password) 


class Follower(db.Model):
    """Stores information regarding which users follow other users."""

    __tablename__ = "followers"

    id = db.Column(db.Integer,
                   primary_key=True,
                   unique=True,
                   autoincrement=True)
    follower_id = db.Column(db.Integer, db.ForeignKey('users.user_id'))
    followed_id = db.Column(db.Integer, db.ForeignKey('users.user_id'))

    users = db.relationship('User',
                            foreign_keys=[follower_id])

    def to_dict(self):
        return {'id': self.id,
                'follower_id': self.follower_id,
                'followed_id': self.followed_id}


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
    date_time = db.Column(db.String, nullable = False, default=datetime.today())
    water_update = db.Column(db.Boolean, nullable=True, default=False)
    fertilizer_update = db.Column(db.Boolean, nullable=True, default=False)

    users = db.relationship('User')
    houseplants = db.relationship('Houseplant')
    photos = db.relationship('Photo')

    def to_dict(self):
        return {'journal_entry_id': self.journal_entry_id,
                'journal_entry_text': self.journal_entry_text,
                'user_id': self.user_id,
                'user_houseplant_id': self.user_houseplant_id,
                'date_time': self.date_time,
                'water_update': self.water_update,
                'fertilizer_update': self.fertilizer_update,}


class Photo(db.Model):
    """Stores photo updates for all of user's houseplants."""

    __tablename__ = "photos"

    photo_id = db.Column(db.Integer, 
                        primary_key=True,
                        unique=True,
                        autoincrement=True)
    journal_entry_id = db.Column(db.Integer, db.ForeignKey('entries.journal_entry_id'))
    photo_url = db.Column(db.String(10000), nullable=False)
    photo_update = db.Column(db.DateTime, nullable=False, default=datetime.today())

    entries = db.relationship('Entry')

    def to_dict(self):
        return {'photo_id': self.photo_id,
                'journal_entry_id': self.journal_entry_id,
                'photo_url': self.photo_url,
                'photo_update': self.photo_update}


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

    def to_dict(self):
        return {'user_houseplant_id': self.user_houseplant_id,
                'common_houseplant_id': self.common_houseplant_id,
                'user_id': self.user_id}


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
    light_requirements = db.Column(db.String(10),nullable=True)
    general_description = db.Column(db.Text(), nullable=False)

    houseplants = db.relationship('Houseplant')

    def to_dict(self):
        return {'common_houseplant_id': self.common_houseplant_id,
                'latin_name': self.latin_name,
                'common_name': self.common_name,
                'common_houseplant_photo_url': self.common_houseplant_photo_url,
                'light_requirements': self.light_requirements,
                'general_description': self.general_description}


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