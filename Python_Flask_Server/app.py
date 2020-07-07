# Project 2 Flask server

# Imports
from bs4 import BeautifulSoup as bs
import time
import datetime
import requests
from splinter import Browser
from flask import Flask, jsonify, redirect
from flask_cors import CORS
import pymongo
import platform

# Flask setup
app = Flask(__name__)
CORS(app)

# Create connection variable
conn = 'mongodb://localhost:27017'

# Pass connection to the pymongo instance.
client = pymongo.MongoClient(conn)

# Connect to a database. Will create one if not already available.
db = client.Project2

@app.route("/")
def home():
    """List all available routes."""
    return (
        f"Available Routes:<br/>"
        f"/get_tsunami_status<br/>"
        f"/update_tsunami_status<br/>"
        f"/get_tsunami_data"
    )


@app.route("/get_tsunami_status", methods=['GET'])
def gettsunamistatus():
    # Get the one record in the collection tsunamistatus_collection,
    # which contains the web scraped tsunami status headline
    status_data = db.tsunamistatus_collection.find_one()
    
    # Remove the MongoDB ID from the return object
    # Otherwise, this object cannot be jsonified
    del status_data['_id']

    # Return the status object
    response = jsonify(status_data)
    return response


@app.route("/update_tsunami_status", methods=['GET'])
def updatetsunamistatus():
    # Open Chrome browser with chromedriver
    system = platform.system()
    
    if (system == "Darwin"):
        print("Mac Driver")
        executable_path = {'executable_path': '/usr/local/bin/chromedriver'}
    else:
        print("Windows Driver")
        executable_path = {'executable_path': 'chromedriver.exe'}

    browser = Browser('chrome', **executable_path, headless=False)
    time.sleep(2)
    
    # URL of page to be scraped
    tsunami_status_URL = "https://www.tsunami.gov"

    # Use splinter to browse page
    browser.visit(tsunami_status_URL)

    # Give the splinter browser time to open the page
    time.sleep(2)
    
    # Store HTML from splinter's site visit
    html = browser.html

    # Create soup object
    soup = bs(html, 'html.parser')
    
    # Find latest tsunami status header
    tsunami_status_header = soup.find('div', id="statusNote")\
                                .find('div', id="statusHead").text
    browser.quit()
    
    # Define dictionary for scrape results
    dictTsunamiStatus = {}
    dictTsunamiStatus["StatusMsg"] = tsunami_status_header
    dictTsunamiStatus["TimestampUTC"] = time.time()
    dictTsunamiStatus["TimestampLocal"] = datetime.datetime.fromtimestamp(time.time()).strftime('%Y-%m-%d %H:%M:%S')
    
    # Remove existing rows
    try:
        db.tsunamistatus_collection.delete_many({})
    except:
        print("An exception occurred, continue running")
    
    # Insert new row
    db.tsunamistatus_collection.insert_one(dictTsunamiStatus)
    del dictTsunamiStatus['_id']
    
    # Return the status object
    response = jsonify(dictTsunamiStatus)
    return response

  
@app.route("/get_tsunami_data")
def gettsunamidata():
    # Declare empty list and dictionary used during data processing
    return_tsunami_data = []
    temp_json_data = {}
    
    # Get all documents from the collection of tsunami data
    tsunami_data = list(db.tsunamidata_collection.find({}))
    
    # For each data row returned, strip the MongoDB "_id"
    # and append to the return object
    for x in range(len(tsunami_data)):
        temp_json_data = tsunami_data[x]

        # Remove the MongoDB ID from the row
        # Otherwise, this object cannot be jsonified
        del temp_json_data['_id']
        
        return_tsunami_data.append(temp_json_data)
        temp_json_data = {}

    # Return the data object
    response = jsonify(return_tsunami_data)
    return response


if __name__ == "__main__":
    app.run(debug=True)
