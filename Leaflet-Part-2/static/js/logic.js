const url = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson';

// Add a Leaflet tile layer for OpenStreetMap.
let streets = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

// Create a Leaflet map object.
var myMap = L.map("map", {
    center: [37.09, -95.71],
    zoom: 3,
    layers: [streets]
});

// Define basemaps as the street map and satellite view
let baseMaps = {
    "Streets": streets,
    "Satellite View": L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        attribution: '&copy; Esri'
    })
};

// Define the earthquake layer group and tectonic plate layer group for the map
let earthquake_data = new L.LayerGroup();
let tectonics = new L.LayerGroup();

// Define the overlays and link the layer groups to separate overlays
let overlays = {
    "Earthquakes": earthquake_data,
    "Tectonic Plates": tectonics
};

// Add a control layer and pass in baseMaps and overlays
L.control.layers(baseMaps, overlays).addTo(myMap);

//this styleInfo function will dictate the stying for all of the earthquake points on the map
function styleInfo(feature) {
    return {
        color: chooseColor(feature.geometry.coordinates[2]),
        radius: chooseRadius(feature.properties.mag), //sets radius based on magnitude 
        fillColor: chooseColor(feature.geometry.coordinates[2]) //sets fillColor based on the depth of the earthquake
    }
};

//define a function to choose the fillColor of the earthquake based on earthquake depth
function chooseColor(depth) {
    if (depth <= 10) return "red";
    else if (depth > 10 & depth <= 25) return "orange";
    else if (depth > 25 & depth <= 40) return "yellow";
    else if (depth > 40 & depth <= 55) return "pink";
    else if (depth > 55 & depth <= 70) return "blue";
    else return "green";
};

//define a function to determine the radius of each earthquake marker
function chooseRadius(magnitude) {
    return magnitude*5;
};

//
d3.json(url).then(function (data) { //pull the earthquake JSON data with d3
    L.geoJson(data, {
        pointToLayer: function (feature, latlon) {  //declare a point to layer function that takes a feature and latlon
            return L.circleMarker(latlon).bindPopup(feature.id); //function creates a circleMarker at latlon and binds a popup with the earthquake id
        },
        style: styleInfo //style the CircleMarker with the styleInfo function as defined above
    }).addTo(earthquake_data); // add the earthquake data to the earthquake_data layergroup / overlay
    earthquake_data.addTo(myMap);

    //this function pulls the tectonic plate data and draws a purple line over the plates
    d3.json("https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json").then(function (data) { //pulls tectonic data with d3.json
        L.geoJson(data, {
            color: "yellow",  //sets the line color to purple
            weight: 3
        }).addTo(tectonics); //add the tectonic data to the tectonic layergroup / overlay
        tectonics.addTo(myMap);
    });


});

// Create legend
var legend = L.control({ position: "bottomright" });
legend.onAdd = function(myMap) {
    var div = L.DomUtil.create("div", "legend legend-box");
    div.innerHTML += "<h4>Depth Color Legend</h4>";
    div.innerHTML += '<i style="background: red"></i><span>(Depth < 10)</span><br>';
    div.innerHTML += '<i style="background: orange"></i><span>(10 < Depth <= 25)</span><br>';
    div.innerHTML += '<i style="background: yellow"></i><span>(25 < Depth <= 40)</span><br>';
    div.innerHTML += '<i style="background: pink"></i><span>(40 < Depth <= 55)</span><br>';
    div.innerHTML += '<i style="background: blue"></i><span>(55 < Depth <= 70)</span><br>';
    div.innerHTML += '<i style="background: green"></i><span>(Depth > 70)</span><br';

    return div;
};

legend.addTo(myMap); // Add the legend to the map

legend.addTo(myMap).getContainer().classList.add('legend-box');

