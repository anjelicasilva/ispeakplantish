import csv
import psycopg2

with open('houseplants.csv', newline='') as csvfile:
        reader = csv.DictReader(csvfile)
        for row in reader:
            print(row)
            print()
            print()
            print()
            # print(row['Latin Name'], row['Common Name'], row['Description'], row['Light'])
