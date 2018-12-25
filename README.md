# CielMeteo

Presentation
============

The Rest-api called "CielMeteo"  return information about the average price and the standard deviation from appartments near a given location with given features : sleeps, bathrooms, bedrooms.

As inputs, you provide information :



	code --> Be Careful it is an intern code to CielMeteo. Example  27685 for les_getsd
    city --> les_gets. Note that this is the code which will determine the city




Then, you send a POST request at /api/v1/meteociel with in the body request the fields above. 




Result
============

return in an array, the different metrics in a JSON format : 

    [
    {
        "date": "2018-12-25T16:00:00.000Z",
        "time": 16,
        "temperature": 11,
        "windchill": 11,
        "wind_orientation": 74,
        "wind": 5,
        "wind_gust": 15,
        "precipitation": "--",
        "humidity": 73,
        "pression": 1029,
        "code": 27685,
        "city": "les_gets"
    },
    {
        "date": "2018-12-25T19:00:00.000Z",
        "time": 19,
        "temperature": 8,
        "windchill": 6,
        "wind_orientation": 60,
        "wind": 10,
        "wind_gust": 10,
        "precipitation": "--",
        "humidity": 87,
        "pression": 1030,
        "code": 27685,
        "city": "les_gets"
    }, ...

 

Installation
============

Requirements
------------
Before anything, you need the following software installed on your machine:

  * [node js](https://nodejs.org/en/download/)
 

Project installation
--------------------
To install the project, you must at first copy the installation script then run it:


	cd /MeteoCiel
	npm install


Run
--------------------

To run the project locally

	cd /MeteoCiel
	node server.js


Test 
--------------------

You can test with Postman in local 
http://localhost:3000/api/v1/meteociel


