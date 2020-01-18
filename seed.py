import csv
import psycopg2
from faker import Faker
from server import app
from model import db, connect_to_db, CommonHouseplant, User


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


def load_users():
    """Seed fake users using Faker library."""

    faker = Faker()
    for num in range(11):
        first_name = str(faker.first_name())
        last_name = str(faker.last_name())
        fake_user = User(
            first_name = first_name,
            last_name = last_name,
            email = first_name + last_name + "@gmail.com",
            password = faker.password(length=10, special_chars=False, digits=True, upper_case=True, lower_case=True),
            phone_number = faker.numerify(text = '#########')
        )
        db.session.add(fake_user)
    db.session.commit()


if __name__ == "__main__":
    connect_to_db(app)

    # In case tables haven't been created, create them
    db.create_all()

    # Run functions in the file to seed all the different databases.
    load_common_houseplants()
    load_users()