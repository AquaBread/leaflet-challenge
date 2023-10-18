# leaflet-challenge

This project is focused on visualizing earthquake data from the United States Geological Survey (USGS) in order to provide a meaningful and educational way to present this data to the public and government organizations. The goal is to develop tools that can help in better understanding the impact of earthquakes and related geological data. The project is divided into two parts:

## Part 1: Create the Earthquake Visualization
In this part of the project, the following steps need to be completed:

Data Retrieval: The project starts by obtaining earthquake data from the USGS. This data is available in different formats and is updated every 5 minutes. You can choose a specific dataset, such as "All Earthquakes from the Past 7 Days," from the USGS GeoJSON Feed.

Data Import and Visualization: Using the chosen dataset and Leaflet, you need to create an interactive map. The map should display earthquake locations based on their longitude and latitude. The markers representing the earthquakes should vary in size to reflect the earthquake's magnitude and in color to indicate the depth of the earthquake. Earthquakes with higher magnitudes should appear larger, and those with greater depths should appear darker in color.

Popups: Each earthquake marker should have popups that provide additional information about the earthquake when clicked.

Legend: Create a legend for the map to provide context for the earthquake data.

## Part 2: Gather and Plot More Data (Optional)
This part of the project is optional and does not earn extra points. It involves adding a second dataset to the map to illustrate the relationship between tectonic plates and seismic activity. The tectonic plates dataset can be found at a specific URL.

## Tasks for Part 2 include:

Plot Tectonic Plates Data: Add the tectonic plates dataset to the map alongside the earthquake data.

Additional Base Maps: Provide options for different base maps to choose from, allowing users to select their preferred map style.

Separate Overlays: Organize the data into separate overlays that can be turned on and off independently. This means that users can choose to view either the earthquake data or the tectonic plates data or both simultaneously.

Layer Controls: Add layer controls to the map to enable users to switch between different data layers easily.

The project essentially involves creating an interactive web map using Leaflet that allows users to explore earthquake data and, optionally, tectonic plate data in a visually informative way. It aims to provide a better understanding of earthquake-related information and its impact on the environment. The optional Part 2 adds complexity to the project by including additional geological data and enhancing the user experience.
