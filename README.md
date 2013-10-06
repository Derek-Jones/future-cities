Future Cities Hackathon

London  5 October 2013

Collection of Code and ideas.


1) Build a model that predicts the probability that a given parking space will be available at a specified time.

2) Build a list of roads having the greatest probabiity of containing an empty parking bay (output: start/lang long, list of roads to visit).

3) Dislay route using Google maps (input: lat/long, roads along route)

FILES

resources/
parking_euclid.txt, parking_manhat.txt 
These files contain a Relative Neighborhood Graph (as an edge list) for the lat/lon points held in the file: unique-lat-long-with-headers.csv (using Euclidian and Manhattan distance metrics).  The integer values correspond to the row in the lat/long file.

unique-lat-long-with-headers.csv
A list of the unique lat/long points from the file: parkingcashless (which contains 241,251 rows with no lat/long).

car-route.R
R program for creating Relative Neighborhood Graph from unique-lat-long-with-headers.csv

In A Nutshell
=============
Team name: Parking Utopia

App description: From current location, give directions to closest spaces that are likely to be available at the current time. Model built from historical data of parking space usage. Predicts usage for every 5 minute interval for every day of the week.

Github link: https://github.com/Derek-Jones/future-cities

Ipython notebook file to rebuild the model: https://github.com/Derek-Jones/future-cities/blob/master/Future%20city.ipynb

App link: http://derek-jones.github.io/future-cities/

Presentation link: https://docs.google.com/presentation/d/1drYgu8Srsqlx70eZD6ptcsvzdADU50qqut0NEl-SJwU/edit?usp=sharing
