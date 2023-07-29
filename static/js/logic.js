function getColor(depth) {
    const colorScale = d3.interpolate("#ADFF2F", "#FFFF00");
    const depthScale = d3.scaleLinear().domain([10, 30]).range([0, 1]);
  
    return colorScale(depthScale(depth));
  }
  
  
  // Function to calculate scaled marker radius based on magnitude
  function getMarkerRadius(mag) {
    return mag * 5;
  }
  
  // Use D3 to fetch the earthquake data
  const earthquakeUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";
  const platesUrl = "https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json";
  
  // Promise.all to fetch both datasets
  Promise.all([
    d3.json(earthquakeUrl),
    d3.json(platesUrl)
  ]).then((data) => {
    const [earthquakeData, platesData] = data;
  
    // Initialize the map and center it on California
    const map = L.map("map").setView([36.778259, -119.417931], 5);
  
    // Add a tile layer (base map)
    const openStreetMapLayer = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png");
    const darkMapLayer = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution:
        'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors'
    });
    const satelliteMapLayer = L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}", {
      attribution:
        'Map data © <a href="https://www.arcgis.com/home/item.html?id=10df2279f9684e4a9f6a7f08febac2a9">ArcGIS</a>'
    });
  
    const baseMaps = {
      "OpenStreetMap": openStreetMapLayer,
      "Dark Map": darkMapLayer,
      "Satellite": satelliteMapLayer
    };
  
    openStreetMapLayer.addTo(map);
  
    // Create a layer group for earthquake markers
    const earthquakeLayer = L.layerGroup();
  
    // Loop through the earthquake data and create markers
    earthquakeData.features.forEach((earthquake) => {
      const lat = earthquake.geometry.coordinates[1];
      const lon = earthquake.geometry.coordinates[0];
      const mag = earthquake.properties.mag;
      const depth = earthquake.geometry.coordinates[2];
  
      // Create a circle marker for each earthquake
      const marker = L.circleMarker([lat, lon], {
        radius: getMarkerRadius(mag), // Set the marker radius based on magnitude
        fillColor: getColor(depth),
        color: "#333",
        weight: 1,
        opacity: 1,
        fillOpacity: 0.8,
      });
  
      // Add a popup with additional information about the earthquake
      marker.bindPopup(
        `Magnitude: ${mag}<br>Depth: ${depth} km`
      );
  
      // Add the marker to the earthquake layer
      marker.addTo(earthquakeLayer);
    });
  
    // Create a GeoJSON layer for tectonic plates
    const platesLayer = L.geoJSON(platesData, {
      style: {
        color: "#FF4500", // Orange color for tectonic plate boundaries
        weight: 2
      }
    });
  
    // Create an overlay object for layer control
    const overlayMaps = {
      "Earthquakes": earthquakeLayer,
      "Tectonic Plates": platesLayer
    };
  
    // Create a legend control
    const legend = L.control({ position: "bottomright" });
  
    // Function to generate the legend content
    legend.onAdd = function (map) {
      const div = L.DomUtil.create("div", "info legend");
      const depths = [-10, 10, 30, 50, 70, 90];
      const labels = [];
  
      for (let i = 0; i < depths.length; i++) {
        const from = depths[i];
        const to = depths[i + 1];
  
        labels.push(
          `<i style="background:${getColor(from + 1)}"></i> ${from + 1} km ${to ? "&ndash;" + to + " km" : "+"}`
        );
      }
  
      div.innerHTML = labels.join("<br>");
      return div;
    };
  
    // Add earthquake and tectonic plates layers to the map
    earthquakeLayer.addTo(map);
    platesLayer.addTo(map);
  
    // Add layer control to the map
    L.control.layers(baseMaps, overlayMaps).addTo(map);
  
    // Add legend to the map
    legend.addTo(map);
  });
  
  
  
  