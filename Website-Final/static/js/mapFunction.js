function mapFunction(inputData) {

    // Magnitude color scheme
    var minimalGreen = "#00fc0d";
    var minorYellowGreen = "#9bfc00";
    var noticeableYellow = "#d6fc00";
    var mediumYellow = "#fcf800";
    var significantOrange = "#fcbd00";
    var strongOrange = "#fc8200";
    var badOrange = "#fc5400";
    var terribleOrange = "#fc0000";
    var extremeRed = "#fc0032";
    var historicallyExtremeRed = "#a60d2e";

    //This function returns the applicable color based on the magnitude
    function circleColor(magnitude) {
        var colorForCircle = "";

        if (magnitude < 2) {
            colorForCircle = minimalGreen;
        }
        else if ((magnitude >= 2) && (magnitude < 3)) {
            colorForCircle = minorYellowGreen;
        }
        else if ((magnitude >= 3) && (magnitude < 4)) {
            colorForCircle = noticeableYellow;
        }
        else if ((magnitude >= 4) && (magnitude < 5)) {
            colorForCircle = mediumYellow;
        }
        else if ((magnitude >= 5) && (magnitude < 6)) {
            colorForCircle = significantOrange;
        }
        else if ((magnitude >= 6) && (magnitude < 7)) {
            colorForCircle = strongOrange;
        }
        else if ((magnitude >= 7) && (magnitude < 8)) {
            colorForCircle = badOrange;
        }
        else if ((magnitude >= 8) && (magnitude < 9)) {
            colorForCircle = terribleOrange;
        }
        else if ((magnitude >= 9) && (magnitude < 10)) {
            colorForCircle = extremeRed;
        }
        else if (magnitude >= 10) {
            colorForCircle = historicallyExtremeRed;
        }

        return colorForCircle;
    }


    //This function returns the description of the size based on the magnitude
    function circleCategory(magnitude) {
        var categoryForCircle = "";

        if (magnitude < 2) {
            categoryForCircle = "Minimal";
        }
        else if ((magnitude >= 2) && (magnitude < 3)) {
            categoryForCircle = "Minor";
        }
        else if ((magnitude >= 3) && (magnitude < 4)) {
            categoryForCircle = "Noticeable";
        }
        else if ((magnitude >= 4) && (magnitude < 5)) {
            categoryForCircle = "Medium";
        }
        else if ((magnitude >= 5) && (magnitude < 6)) {
            categoryForCircle = "Significant";
        }
        else if ((magnitude >= 6) && (magnitude < 7)) {
            categoryForCircle = "Strong";
        }
        else if ((magnitude >= 7) && (magnitude < 8)) {
            categoryForCircle = "Bad";
        }
        else if ((magnitude >= 8) && (magnitude < 9)) {
            categoryForCircle = "Terrible";
        }
        else if ((magnitude >= 9) && (magnitude < 10)) {
            categoryForCircle = "Extreme";
        }
        else if (magnitude >= 10) {
            categoryForCircle = "Historically Extreme";
        }

        return categoryForCircle;
    }

    // Using a proportional instead of pre-set values below
    //This function returns the applicable size based on the magnitude
    function circleSize(magnitude) {
        if (magnitude > 0) {
            return (50000 * magnitude);
        }
        else {
            return 0;
        }
    }

    //    //Not using non-proportional, pre-set function
    // //This function returns the applicable size based on the magnitude
    // function circleSizePreSet(magnitude) {
    //     var circleRadius = 0;

    //     if (magnitude < 2) {
    //         circleRadius = 35000;
    //     }
    //     else if ((magnitude >= 2) && (magnitude < 3)) {
    //         circleRadius = 75000;
    //     }
    //     else if ((magnitude >= 3) && (magnitude < 4)) {
    //         circleRadius = 150000;
    //     }
    //     else if ((magnitude >= 4) && (magnitude < 5)) {
    //         circleRadius = 300000;
    //     }
    //     else if ((magnitude >= 5) && (magnitude < 6)) {
    //         circleRadius = 450000;
    //     }
    //     else if ((magnitude >= 6) && (magnitude < 7)) {
    //         circleRadius = 600000;
    //     }
    //     else if ((magnitude >= 7) && (magnitude < 8)) {
    //         circleRadius = 750000;
    //     }
    //     else if ((magnitude >= 8) && (magnitude < 9)) {
    //         circleRadius = 900000;
    //     }
    //     else if ((magnitude >= 9) && (magnitude < 10)) {
    //         circleRadius = 1050000;
    //     }
    //     else if (magnitude >= 10) {
    //         circleRadius = 1100000;
    //     }

    //     return circleRadius;
    // }

    //This function returns the applicable opacity based on the magnitude
    function circleOpacityLevel(magnitude) {
        var circleOpacity = "";

        if (magnitude < 2) {
            circleOpacity = 1;
        }
        else if ((magnitude >= 2) && (magnitude < 3)) {
            circleOpacity = .93;
        }
        else if ((magnitude >= 3) && (magnitude < 4)) {
            circleOpacity = .86;
        }
        else if ((magnitude >= 4) && (magnitude < 5)) {
            circleOpacity = .80;
        }
        else if ((magnitude >= 5) && (magnitude < 6)) {
            circleOpacity = .74;
        }
        else if ((magnitude >= 6) && (magnitude < 7)) {
            circleOpacity = .68;
        }
        else if ((magnitude >= 7) && (magnitude < 8)) {
            circleOpacity = .60;
        }
        else if ((magnitude >= 8) && (magnitude < 9)) {
            circleOpacity = .52;
        }
        else if ((magnitude >= 9) && (magnitude < 10)) {
            circleOpacity = .44;
        }
        else if (magnitude >= 10) {
            circleOpacity = .35;
        }

        return circleOpacity;
    }


    //This function returns the applicable tsunami cause description based on the code
    function tsunamiCauseDescription(causeCode) {
        var tsunamiCauseDescription = "";

        if (causeCode == 0) {
            tsunamiCauseDescription = "Unknown";
        }
        else if (causeCode == 1) {
            tsunamiCauseDescription = "Earthquake";
        }
        else if (causeCode == 2) {
            tsunamiCauseDescription = "Questionable Earthquake";
        }
        else if (causeCode == 3) {
            tsunamiCauseDescription = "Earthquake and Landslide";
        }
        else if (causeCode == 4) {
            tsunamiCauseDescription = "Volcano and Earthquake";
        }
        else if (causeCode == 5) {
            tsunamiCauseDescription = "Volcano, Earthquake, and Landslide";
        }
        else if (causeCode == 6) {
            tsunamiCauseDescription = "Volcano";
        }
        else if (causeCode == 7) {
            tsunamiCauseDescription = "Volcano and Landslide";
        }
        else if (causeCode == 8) {
            tsunamiCauseDescription = "Landslide";
        }
        else if (causeCode == 9) {
            tsunamiCauseDescription = "Meteorological";
        }
        else if (causeCode == 10) {
            tsunamiCauseDescription = "Explosion";
        }
        else if (causeCode == 11) {
            tsunamiCauseDescription = "Astronomical Tide";
        }
        else {
            tsunamiCauseDescription = "Unspecified";
        }
        return tsunamiCauseDescription;
    }


    
    //This function returns the applicable tsunami cause description based on the code
    function WaveCircleColor(causeCode) {
        var WaveCircleColor = "";

        if (causeCode == 0) {
            WaveCircleColor = "#808080";
        }
        else if (causeCode == 1) {
            WaveCircleColor = "#FF0000";
        }
        else if (causeCode == 2) {
            WaveCircleColor = "#800000";
        }
        else if (causeCode == 3) {
            WaveCircleColor = "#00FF00";
        }
        else if (causeCode == 4) {
            WaveCircleColor = "#008000";
        }
        else if (causeCode == 5) {
            WaveCircleColor = "#00FFFF";
        }
        else if (causeCode == 6) {
            WaveCircleColor = "#008080";
        }
        else if (causeCode == 7) {
            WaveCircleColor = "#0000FF";
        }
        else if (causeCode == 8) {
            WaveCircleColor = "#FF00FF";
        }
        else if (causeCode == 9) {
            WaveCircleColor = "Meteorological";
        }
        else if (causeCode == 10) {
            WaveCircleColor = "#800080";
        }
        else if (causeCode == 11) {
            WaveCircleColor = "#C0C0C0";
        }
        else {
            WaveCircleColor = "#000000";
        }
        return WaveCircleColor;
    }

    // Using a proportional instead of pre-set values below
    //This function returns the applicable size based on the wave maximum height
    function waveCircleSize(height) {
        if (height > 0) {
            return (5000 * height);
        }
        else {
            return 0;
        }
    }


    // Define array to hold created earthquake markers
    var earthquakeCircleMarkers = [];

    // Define array to hold created wave's water heightand cause markers
    var waterHeightandCauseMarkers = [];

    // Loop through locations in the and create earthquake markers
    for (var i = 0; i < inputData.length; i++) {

        // YEAR Recorded
        var timeRecorded = inputData[i].Year;


        // For i earthquake there will be a short array with longitude and latitude
        var coordinates = [];
        coordinates.push(inputData[i].Latitude);
        coordinates.push(inputData[i].Longitude);


        // Setting the marker radius for the earthquake magnitude circle at location by passing magnitude into the circleSize function
        earthquakeCircleMarkers.push(
            L.circle(coordinates, {
                stroke: true,
                color: "green",
                weight: 1,
                fillOpacity: circleOpacityLevel(inputData[i]["Earthquake Magnitude"]),
                fillColor: circleColor(inputData[i]["Earthquake Magnitude"]),
                radius: circleSize(inputData[i]["Earthquake Magnitude"])
            }).bindPopup("<b>" + inputData[i]["Location Name"] + "</b><br>" +
                "<hr>" +
                "<b>Year:</b> " + timeRecorded + "<br>" +
                "<b>Location:</b> " + inputData[i]["Location Name"] + "<br>" +
                "<b>Magnitude:</b> " + inputData[i]["Earthquake Magnitude"] + "<br>" +
                "<b>Magnitude Category for Map:</b> " + circleCategory(inputData[i]["Earthquake Magnitude"]) + "<br>"
            )
        )

        // Setting the marker radius for the water height circle at location by passing by into the waterCircleSize function
        //and setting the color of the cirle by the cause of the tsunami
        waterHeightandCauseMarkers.push(
            L.circle(coordinates, {
                stroke: true,
                color: "blue",
                weight: 1,
                fillOpacity: .5,
                fillColor: WaveCircleColor(inputData[i]["Tsunami Cause Code"]),
                radius: waveCircleSize(inputData[i]["Maximum Water Height (m)"])
            }).bindPopup("<b>" + inputData[i]["Location Name"] + "</b><br>" +
                "<hr>" +
                "<b>Year:</b> " + timeRecorded + "<br>" +
                "<b>Location:</b> " + inputData[i]["Location Name"] + "<br>" +
                "<b>Tsunami Cause Code:</b> " + inputData[i]["Tsunami Cause Code"] + "<br>" +
                "<bTsunami Cause Code Description:</b> " + tsunamiCauseDescription(inputData[i]["Tsunami Cause Code"]) + "<br>"
            )
        )
    }

    // Create layer groups
    var earthquakeCircleGroupLayer = L.layerGroup(earthquakeCircleMarkers);
    var waterHeightandCauseGroupLayer = L.layerGroup(waterHeightandCauseMarkers);

    //This section is for the fault lines information
    var fault_line_URL = "https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json";

    d3.json(fault_line_URL, function (responseData) {
        // This makes a variable to hold the response data from the fault lines data source
        var fault_line_data = responseData;

        // Defines a function that is run once for each feature in faultLineData
        // Create fault lines
        function forEachFault(feature, layer) {
            L.polyline(feature.geometry.coordinates);
        }
        // Creates a GeoJSON layer containing the features array of the faultLineData object
        // Run the onEachFaultLine function once for each element in the array
        var fault_lines = L.geoJSON(fault_line_data, {
            onEachFeature: forEachFault,
            style: {
                weight: 4,
                color: 'orange'
            }
        });

        // Once we get a response, send the inputData object and other information to the createMap function
        createMap(waterHeightandCauseGroupLayer, earthquakeCircleGroupLayer, fault_lines);
    });





    function createMap(waterHeightandCauseGroupLayer, earthquakeCircleGroupLayer, fault_lines) {

        // Define streetmap, darkmap layers
        // Street Map
        var streetMap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
            attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
            tileSize: 512,
            maxZoom: 18,
            zoomOffset: -1,
            id: "mapbox/streets-v11",
            accessToken: API_KEY
        });

        // Dark Map
        var darkMap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
            attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
            maxZoom: 18,
            id: "dark-v10",
            accessToken: API_KEY
        });

        // Outdoors Map
        var outdoorsMap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
            maxZoom: 16,
            id: "outdoors-v11",
            accessToken: API_KEY
        });

        // Satellite Map
        var satelliteMap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
            maxZoom: 18,
            id: "satellite-v9",
            accessToken: API_KEY
        });

        // Define a baseMaps object to hold our base layers
        var baseMaps = {
            "Street Map": streetMap,
            "Dark Map": darkMap,
            "Outdoor Map": outdoorsMap,
            "Satellite Map": satelliteMap,
        };

        // Create overlay object to hold our overlay layer, and another for the circles
        var overlayMaps = {
            "Cause and Water Height": waterHeightandCauseGroupLayer,
            "Magnitude of Earthquakes": earthquakeCircleGroupLayer,
            "Fault Lines": fault_lines
        };

        // Create our map, giving it the streetmap and earthquakes layers to display on load
        var myMap = L.map("map", {
            center: [
                0, 0
            ],
            zoom: 2,
            layers: [streetMap, waterHeightandCauseGroupLayer, earthquakeCircleGroupLayer, fault_lines]
        });

        // Create a layer control
        // Pass in our baseMaps and overlayMaps
        // Add the layer control to the map
        L.control.layers(baseMaps, overlayMaps, {
            collapsed: false
        }).addTo(myMap);


        // This section adds in the legend for the map 

        // Build legend and add to the map
        var legend = L.control({ position: 'bottomleft' });

        legend.onAdd = function (myMap) {
            var div = L.DomUtil.create('div', 'info legend');
            div.innerHTML += "<h4>Magnitude colors:"
            div.innerHTML += '<i style="background: ' + minimalGreen + '"></i><span>Magnitude <2; Minimal</span><br>';
            div.innerHTML += '<i style="background: ' + minorYellowGreen + '"></i><span>Magnitude 2-3; Minor</span><br>',
                div.innerHTML += '<i style="background: ' + noticeableYellow + '"></i><span>Magnitude 3-4; Noticeable</span><br>';
            div.innerHTML += '<i style="background: ' + mediumYellow + '"></i><span>Magnitude 4-5; Medium</span><br>';
            div.innerHTML += '<i style="background: ' + significantOrange + '"></i><span>Magnitude 5-6; Significant</span><br>';
            div.innerHTML += '<i style="background: ' + strongOrange + '"></i><span>Magnitude 6-7; Strong</span><br>';
            div.innerHTML += '<i style="background: ' + badOrange + '"></i><span>Magnitude 7-8; Bad</span><br>';
            div.innerHTML += '<i style="background: ' + terribleOrange + '"></i><span>Magnitude 8-9; Terrible</span><br>';
            div.innerHTML += '<i style="background: ' + extremeRed + '"></i><span>Magnitude 9-10; Extreme</span><br>';
            div.innerHTML += '<i style="background: ' + historicallyExtremeRed + '"></i><span>Magnitude >10; Historically Extreme</span><br>';

            return div;
        }

        legend.addTo(myMap);
    }
    console.log("Returning from mapFunction");
}