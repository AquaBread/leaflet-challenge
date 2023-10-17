const myMap = L.map('map').setView([0, 0], 2);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

const geoJsonUrl = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_week.geojson';
fetch(geoJsonUrl)
  .then(response => response.json())
  .then(data => {
    function getMarkerColor(depth) {
      if (depth < 10) return 'green';
      else if (depth < 30) return 'yellow';
      else if (depth < 70) return 'orange';
      else return 'red';
    }

    function getMarkerSize(magnitude) {
        return magnitude * 5;
    }

    const legend = L.control({ position: 'bottomright' });
    legend.onAdd = function (map) {
        const div = L.DomUtil.create('div', 'info legend');
        const depths = [0, 10, 30, 70];
        const colors = ['green', 'yellow', 'orange', 'red'];
        div.innerHTML = '<strong>Depth (km)</strong><br>';
        for (let i = 0; i < depths.length; i++) {
            div.innerHTML +=
                '<i style="background:' + colors[i] + '"></i> ' +
                depths[i] + (depths[i + 1] ? '&ndash;' + depths[i + 1] + '<br>' : '+');
        }
        return div;
    };
    legend.addTo(myMap);

    // Add CSS styles for the legend
    const legendStyle = document.createElement('style');
    legendStyle.innerHTML = `
      .info.legend {
        background: white;
        padding: 5px;
        border: 1px solid #000;
        border-radius: 5px;
        text-align: center;
        max-width: 120px;
      }
      .info.legend i {
        width: 18px;
        height: 18px;
        margin-right: 5px;
        display: inline-block;
      }
    `;
    document.getElementsByTagName('head')[0].appendChild(legendStyle);

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

        marker.bindPopup(
            `Magnitude: ${magnitude}<br>Depth: ${depth} km<br>Location: ${feature.properties.place}`
        );
    });
  });

