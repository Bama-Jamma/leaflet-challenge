# leaflet-challenge

# USGS Earthquake Visualization

The USGS Earthquake Visualization project is a web-based application that allows users to explore earthquake data collected by the United States Geological Survey (USGS). The application visualizes earthquake locations, magnitudes, and depths on an interactive map using Leaflet.js. Additionally, it provides the option to overlay tectonic plates data to illustrate the relationship between tectonic plates and seismic activity.

### If you do not wish to run this application locally, you can [visit the deployed application](https://bama-jamma.github.io/leaflet-challenge/).


## Getting Started

To get started with the USGS Earthquake Visualization project, follow these steps:

1. Clone the repository to your local machine.
2. Open the `index.html` file in a web browser.

## Features

The USGS Earthquake Visualization application offers the following features:

- Interactive map display with earthquake markers.
- Earthquake markers sized according to their magnitudes and colored based on their depths.
- Popup information for each earthquake marker displaying its magnitude and depth.
- Legend indicating the color scale for earthquake depths.
- Layer controls to toggle between different datasets (earthquakes and tectonic plates).
- Choice of base maps (OpenStreetMap, Dark Map, and Satellite).

## Usage

1. When you open the application, it will display a map centered on California with earthquake markers plotted on the map.
2. The earthquake markers' sizes represent the earthquake magnitudes, and the colors represent the depths.
3. Click on an earthquake marker to view additional information about that specific earthquake.
4. Use the layer controls in the top-right corner to toggle the display of earthquake data and tectonic plates data.
5. You can also choose different base maps using the layer controls.

## Data Sources

The earthquake data is sourced from the USGS GeoJSON Feed, which provides updated earthquake data in GeoJSON format.

- USGS GeoJSON Feed: [https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php](https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php)

## Bonus: Tectonic Plates Data

As part of the bonus challenge, we have added the capability to overlay tectonic plates data on the map. This dataset illustrates the boundaries of tectonic plates and provides additional context for understanding seismic activity.

- Tectonic Plates Data: [https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json](https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json)

## Dependencies

The USGS Earthquake Visualization project uses the following libraries:

- Leaflet.js: [https://leafletjs.com/](https://leafletjs.com/)
- D3.js: [https://d3js.org/](https://d3js.org/)


## File Structure

- `index.html`: The main HTML file containing the web application's structure and layout.
- `static/js/app.js`: The JavaScript file responsible for fetching earthquake and tectonic plates data, creating the map, and adding markers.
- `static/css/style.css`: The CSS file containing styles for the web application.

## Credits

The USGS Earthquake Visualization project was developed as part of a coding challenge, using data from the USGS GeoJSON Feed and tectonic plates data from GitHub user fraxen.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.


