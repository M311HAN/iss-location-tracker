# ISS Location Tracker

[Check out the live site here!](https://github.com/M311HAN/iss-location-tracker/)

![iss tracker homepage](images/iss-tracker.png)

The ISS Location Tracker is a web application that tracks the current location of the International Space Station (ISS) and displays it on a map. The application provides real-time updates of the ISS's latitude, longitude, and timestamp, and allows users to follow the iss satellite on a live map while being able to adjust the update interval.

The default update interval is set to 5 seconds, which is a balanced choice for tracking the ISS. It is frequent enough to provide reasonably current data without being overly demanding on resources. While updating every second might offer more real-time data, it could be overkill and place unnecessary load on the server. By providing an option for users to customize the interval time, the application caters to varying needs and preferences. Additionally, users can toggle the "Follow ISS" feature to automatically pan the map to the ISS's position.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Setup and Installation](#setup-and-installation)
- [File Structure](#file-structure)
- [Usage](#usage)
- [Code Overview](#code-overview)
  - [HTML](#html)
  - [JavaScript](#javascript)
  - [CSS](#css)
- [Error Handling and UI Feedback](#error-handling-and-ui-feedback)
- [Contributing](#contributing)
- [License](#license)

## Features

- Real-time tracking of the ISS location.
- Adjustable update intervals (1 second, 5 seconds, 10 seconds, 30 seconds).
- Displays the ISS's latitude, longitude, and timestamp.
- Converts timestamp to a readable date and time.
- "Follow ISS" feature to automatically pan the map to the ISS's position.
- Interactive map using Leaflet.js.

## Technologies Used

- HTML
- CSS
- JavaScript
- Leaflet.js
- Open Notify API

## Setup and Installation

```bash
# Clone the repository:
git clone https://github.com/your-username/iss-location-tracker.git

# Navigate into the cloned directory with:
cd iss-location-tracker

# Open the project in your favorite code editor.

# Open index.html in your web browser to view the application. This can be done by right clicking on the index.html file and selecting "open with live server".
```

## File Structure

- index.html: The main HTML file containing the structure of the web application.
- css/styles.css: The CSS file for styling the web application.
- js/script.js: The JavaScript file containing the logic for fetching ISS location data and updating the map.
- images: this directory holds all the images for the site

## Usage

- View ISS Location: Open the application to see the current location of the ISS on the map.
- Adjust Update Interval: Use the dropdown menu to select how often the ISS data should be refreshed.
- Follow ISS: Toggle the switch to enable or disable the automatic panning of the map to follow the ISS's position.

## Code Overview

## HTML
The index.html file sets up the structure of the web application, including:

- Header and title.
- Dropdown menu for selecting the update interval.
- Sections for displaying the ISS's latitude, longitude, timestamp, and readable date & time.
- A switch for toggling the "Follow ISS" feature.
- A container for the Leaflet map.

## JavaScript

The js/script.js file contains the logic for:

- Fetching ISS location data from the Open Notify API.
- Updating the HTML elements with the fetched data.
- Handling errors and displaying appropriate messages.
- Managing the update interval and "Follow ISS" feature.
- Initializing and updating the Leaflet map.

## CSS
- The css/styles.css file styles the web application, including the layout, typography, and custom switch for the "Follow ISS" feature.

## Error Handling and UI Feedback

- If the data cannot be fetched or the API is down, the UI will display "Data unavailable" messages.
- If the fetch operation takes longer than 500ms, a loading message will be displayed to indicate that the data is being fetched.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request for any enhancements or bug fixes.

## License
This project was created by Melihhan (https://github.com/M311HAN). [Visit the repository](https://github.com/M311HAN?tab=repositories) for more projects and further collaboration.
