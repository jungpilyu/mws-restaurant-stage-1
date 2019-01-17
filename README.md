# Restaurant Reviews Application

[shot]: ./img/shot.png
[shot1]: ./img/shot1.png
[shot2]: ./img/shot2.png

## Overview

This work was done as a partial fulfillment of the requirements for "Front-End Web Developer Nanodegree" of the Udacity. The project implements a front-end of restaurant-review site which supports the following features:

* A fully responsive layout
* Responsive images in 5 levels
* A restaurant listings page with a map
* A restaurant detail information
* Some Accessibility supports
* Service worker implementation for offline browsing

## External Library Dependency
- [leaflet library](https://www.mapbox.com/) for MapBox API call to draw a map
- some [gulp](https://gulpjs.com/) building-related libraries (autoprefixer, sass, browser-sync) during the development

## Installation

1. Clone the this repository.
2. From the project root directory, launch a local client server using Python from your terminal:
Python 2: `python2 -m SimpleHTTPServer 8000` 
Python 3: `python3 -m http.server 8000`
3. Visit the site in your browser at `http://localhost:8000`

In Chrome you can open the Console, go to Application / Service Workers, and then check the Offline option to see offline behavior.

## Screen shot
![screen shot][shot]
![screen shot][shot1]
![screen shot][shot2]
