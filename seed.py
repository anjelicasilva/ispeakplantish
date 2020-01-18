import csv
import psycopg2
from server import app
from model import db, connect_to_db, CommonHouseplant

def load_common_houseplants():
    """Seed common houseplants data from common-houseplants.csv."""
    
    with open('common-houseplants.csv', newline='') as csvfile:
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
    load_common_houseplants()