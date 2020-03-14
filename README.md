# ISpeakPlantish
ISpeakPlantish is a full-stack web application that acts as a houseplant journal for plant lovers. It offers tracker journal logs to grow, nurture, and care for your small-space greenery. <br/>

## Contents
* [Features](#features)
* [Technologies & Stack](#techstack)
* [Set-up & Installation](#installation)

## <a name="features"></a>Features
* User registration, log-in, & log-out
* Search common houseplants and add it to your plant collection.
* Text water and fertilizer reminders to yourself
* Join group chats to discuss plant diagnosis, trade cuttings, or give freebies!
* Learn about hundreds of common houseplants in our Homepage's Plant of the Moment section!


## <a name="techstack"></a>Technologies and Stack
**Backend:**
Python, Flask, SQLAlchemy, PostgreSQL, FlaskSocketIO <br/>
**Frontend:**
React, Javascript, jQuery, Babel, Bootstrap, Google Fonts, HTML5, CSS3 <br/>
**APIs:**
Cloudinary, Twilio



## <a name="installation"></a>Set-up & Installation
Install a code editor like [VS code](https://code.visualstudio.com/download).<br/>
Install [postgreSQL](https://www.postgresql.org/) for the relational database.<br/>
Install [python3](https://www.python.org/downloads/mac-osx/)<br/>
Install the package installer for Python [pip](https://pip.pypa.io/en/stable/installing/)<br/>

Clone or fork repository:
```
$ git clone https://github.com/anjelicasilva/ISpeakPlantish.git
```
Create and activate a virtual environment inside the ispeakplantish directory:
```
$ virtualenv env
$ source env/bin/activate
```
Install dependencies:
```
$ pip3 install -r requirements.txt
```
Make an account with [Cloudinary](https://cloudinary.com/documentation) & get an [API key](https://cloudinary.com/users/register/free).<br/>
Make an account with [Twilio](https://www.twilio.com/docs) & get an [API key](https://www.twilio.com/docs/usage/api).<br/>

Store these keys in a file named 'secrets.sh' <br/> IMPORTANT REMINDER: Do NOT check this file in using Git
```
$ source secrets.sh
```
With PostgreSQL, create the ISpeakPlantish database
```
$ createdb ispeakplantish_db
```
Create all tables and relations in the database and seed all data:
```
$ python3 -seed.py
```
Run the app from the command line:
```
$ python3 server.py
```