import csv
import psycopg2
from faker import Faker
from server import app
from model import db, connect_to_db, CommonHouseplant, User, Follower, Entry, Houseplant, Photo
from random import randint


def load_users():
    """Seed fake users using Faker library."""

    faker = Faker()
    for i in range(10):
        first_name = str(faker.first_name())
        last_name = str(faker.last_name())
        fake_user = User(
            first_name = first_name,
            last_name = last_name,
            email = first_name + last_name + "@gmail.com",
            password = faker.password(length=10, 
                                      special_chars=False, 
                                      digits=True, 
                                      upper_case=True, 
                                      lower_case=True),
            phone_number = faker.numerify(text = '#########')
        )
        db.session.add(fake_user)
    db.session.commit()


def load_followers():
    """Seed followers from random generator."""

    for i, row in enumerate(open("seed_data/followers-seed.txt")):
        row = row.rstrip()
        follower_id, followed_id = row.split("|")
        new_follower = Follower(
                            follower_id = follower_id,
                            followed_id = followed_id
        )
        db.session.add(new_follower)
    db.session.commit()


def load_houseplants():
    """Seed houseplants for each user."""

    for i, row in enumerate(open("seed_data/houseplants-seed.txt")):
        row = row.rstrip()
        common_houseplant_id, user = row.split("|")
        new_houseplant = Houseplant(
                            common_houseplant_id = common_houseplant_id,
                            user_id = user
        )
        db.session.add(new_houseplant)
    db.session.commit()


def load_entries():
    """Seed entries for all users."""

    for i,row in enumerate(open("seed_data/entries-seed.txt")):
        row = row.rstrip()
        row = row.split("|")
        for index, item  in enumerate(row):
            if item == "True":
                row[index] = True
            elif item == "False":
                row[index] = False
        entry, user, plant, water, fertilizer, rotation, light = row
        
        new_entry = Entry(
                        journal_entry_text = entry,
                        user_id = user,
                        user_houseplant_id = plant,
                        water_update = water,
                        fertilizer_update = fertilizer,
                        rotation_update = rotation,
                        light_update = light
        )
        db.session.add(new_entry)
    db.session.commit()


def load_photos():
    """Seed photos of all users' houseplants."""

    for row in open("seed_data/photos-seed.txt"):
        row = row.rstrip().split("|")
        
            
        journal_entry_id, plant_photo = row

        new_photo_entry = Photo(
                            journal_entry_id = journal_entry_id,
                            photo_url = plant_photo
                            )
        db.session.add(new_photo_entry)
    db.session.commit()


def load_common_houseplants():
    """Seed common houseplants data from common-houseplants.csv."""
    
    with open('seed_data/common-houseplants-data.csv', newline='') as csvfile:
            reader = csv.DictReader(csvfile)
            for row in reader:
                common_houseplant = CommonHouseplant(latin_name = row['Latin Name'].strip(), 
                                                    common_name = row['Common Name'].strip(), 
                                                    common_houseplant_photo_url = row['Plant Image'].strip(), 
                                                    light_requirements = row['Light'].strip(), 
                                                    general_description = row['Description'].strip())
                db.session.add(common_houseplant)
            db.session.commit()


if __name__ == "__main__":
    connect_to_db(app)

    # In case tables haven't been created, create them
    db.create_all()

    # Run functions in the file to seed all the different databases.
    load_users()
    load_followers()
    load_common_houseplants()
    load_houseplants()
    load_entries()
    load_photos()
    
   