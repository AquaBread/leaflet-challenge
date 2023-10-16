// Initialize the map
const myMap = L.map('map').setView([0, 0], 2);

// Add a tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

// Load earthquake data from the USGS GeoJSON URL
const geoJsonUrl = 'YOUR_USGS_JSON_URL_HERE';
fetch(geoJsonUrl)
    .then(response => response.json())
    .then(data => {
        // Create a function to determine marker color based on depth
        function getMarkerColor(depth) {
            if (depth < 10) return 'green';
            else if (depth < 30) return 'yellow';
            else if (depth < 70) return 'orange';
            else return 'red';
        }

        // Create a function to determine marker size based on magnitude
        function getMarkerSize(magnitude) {
            return magnitude * 5;
        }

        // Create a legend
        const legend = L.control({ position: 'bottomright' });
        legend.onAdd = function (map) {
            const div = L.DomUtil.create('div', 'info legend');
            const depths = [0, 10, 30, 70];
            div.innerHTML = '<strong>Depth (km)</strong><br>';
            for (let i = 0; i < depths.length; i++) {
                div.innerHTML +=
                    '<i style="background:' + getMarkerColor(depths[i] + 1) + '"></i> ' +
                    depths[i] + (depths[i + 1] ? '&ndash;' + depths[i + 1] + '<br>' : '+');
            }
            return div;
        };
        legend.addTo(myMap);

        // Loop through the earthquake data and create markers
        data.features.forEach(feature => {
            const coordinates = feature.geometry.coordinates;
            const magnitude = feature.properties.mag;
            const depth = coordinates[2];
            const marker = L.circleMarker([coordinates[1], coordinates[0]], {
                radius: getMarkerSize(magnitude),
                color: 'black',
                weight: 1,
                fillOpacity: 0.7,
                fillColor: getMarkerColor(depth)
            }).addTo(myMap);

            // Create popups for each marker
            marker.bindPopup(
                `Magnitude: ${magnitude}<br>Depth: ${depth} km<br>Location: ${feature.properties.place}`
            );
        });
    });