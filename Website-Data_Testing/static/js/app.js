// --------------------------------------------------------------------------------
// Project 2: Tsunami Dashboard
// --------------------------------------------------------------------------------

// URLs to our Flask routes
var get_tsunami_status_URL = "http://127.0.0.1:5000/get_tsunami_status";
var update_tsunami_status_URL = "http://127.0.0.1:5000/update_tsunami_status";
var get_tsunami_data_URL = "http://127.0.0.1:5000/get_tsunami_data";

// Global dataset arrays
var originalData = [];
var filteredData = [];

// Global tsunami status banner text strings
var tsunamiStatusText = "";
var tsunamiStatusTimestamp = "";

// GET TSUNAMI STATUS STORED IN DB
fetch(get_tsunami_status_URL)
  .then((resp) => resp.json())
  .then(function (data) {
    console.log("Fetched tsunami status");
    tsunamiStatusText = data.StatusMsg;
    tsunamiStatusTimestamp = data.TimestampLocal;
  })
  .catch(error => console.log(error));


// BEGINNING OF MAP FUNCTION
function mapFunction(filteredData) {

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

  console.log("Checkpoint 1");

  // Loop through locations in the and create earthquake markers
  for (var i = 0; i < filteredData.length; i++) {
    console.log("Checkpoint 2 part" + i);

    // YEAR Recorded
    var timeRecorded = filteredData[i].Year;


    // For i earthquake there will be a short array with longitude and latitude
    var coordinates = [];
    coordinates.push(filteredData[i].Latitude);
    coordinates.push(filteredData[i].Longitude);


    // Setting the marker radius for the earthquake magnitude circle at location by passing magnitude into the circleSize function
    earthquakeCircleMarkers.push(
      L.circle(coordinates, {
        stroke: true,
        color: "green",
        weight: 1,
        fillOpacity: circleOpacityLevel(filteredData[i]["Earthquake Magnitude"]),
        fillColor: circleColor(filteredData[i]["Earthquake Magnitude"]),
        radius: circleSize(filteredData[i]["Earthquake Magnitude"])
      }).bindPopup("<b>" + filteredData[i]["Location Name"] + "</b><br>" +
        "<hr>" +
        "<b>Year:</b> " + timeRecorded + "<br>" +
        "<b>Location:</b> " + filteredData[i]["Location Name"] + "<br>" +
        "<b>Magnitude:</b> " + filteredData[i]["Earthquake Magnitude"] + "<br>" +
        "<b>Magnitude Category for Map:</b> " + circleCategory(filteredData[i]["Earthquake Magnitude"]) + "<br>"
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
        fillColor: WaveCircleColor(filteredData[i]["Tsunami Cause Code"]),
        radius: waveCircleSize(filteredData[i]["Maximum Water Height (m)"])
      }).bindPopup("<b>" + filteredData[i]["Location Name"] + "</b><br>" +
        "<hr>" +
        "<b>Year:</b> " + timeRecorded + "<br>" +
        "<b>Location:</b> " + filteredData[i]["Location Name"] + "<br>" +
        "<b>Tsunami Cause Code:</b> " + filteredData[i]["Tsunami Cause Code"] + "<br>" +
        "<bTsunami Cause Code Description:</b> " + tsunamiCauseDescription(filteredData[i]["Tsunami Cause Code"]) + "<br>"
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

    // Once we get a response, send the filteredData object and other information to the createMap function
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
        37.09, -95.71
      ],
      zoom: 5,
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

    legend.onAdd = function () {
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

      //Below is an alternative method to making the legend
      // magnitudes = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

      // for (var i = 0; i < magnitudes.length; i++) {
      //   div.innerHTML +=
      //     '<i style="background:' + circleColor(magnitudes[i] + 1) + '"></i> ' +
      //       + magnitudes[i] + (magnitudes[i + 1] ? ' - ' + magnitudes[i + 1] + '<br>' : ' + ');
      // }

      return div;
    };

    legend.addTo(myMap);
  }
}

// END OF MAP FUNCTION


// GET TSUNAMI DATA
fetch(get_tsunami_data_URL)
  .then((resp) => resp.json())
  .then(function (data) {
    // Parse data - Convert numeric datatypes from strings to numbers
    data.forEach(function (d) {
      d["Damage $Mil"] = +d["Damage $Mil"];
      d["Damage Description"] = +d["Damage Description"];
      d["Death Description"] = +d["Death Description"];
      d["Deaths"] = +d["Deaths"];
      d["Distance From Source (km)"] = +d["Distance From Source (km)"];
      d["Dy"] = +d["Dy"];
      d["Earthquake Magnitude"] = +d["Earthquake Magnitude"];
      d["Houses Damaged"] = +d["Houses Damaged"];
      d["Houses Damaged Description"] = +d["Houses Damaged Description"];
      d["Houses Destroyed"] = +d["Houses Destroyed"];
      d["Houses Destroyed Description"] = +d["Houses Destroyed Description"];
      d["Hr"] = +d["Hr"];
      d["Initial Wave Arrival Day"] = +d["Initial Wave Arrival Day"];
      d["Initial Wave Arrival Hour"] = +d["Initial Wave Arrival Hour"];
      d["Initial Wave Arrival Minute"] = +d["Initial Wave Arrival Minute"];
      d["Injuries"] = +d["Injuries"];
      d["Injuries Description"] = +d["Injuries Description"];
      d["Latitude"] = +d["Latitude"];
      d["Longitude"] = +d["Longitude"];
      d["Max Inundation Distance (m)"] = +d["Max Inundation Distance (m)"];
      d["Max Wave Arrival Day"] = +d["Max Wave Arrival Day"];
      d["Max Wave Arrival Hour"] = +d["Max Wave Arrival Hour"];
      d["Max Wave Arrival Minute"] = +d["Max Wave Arrival Minute"];
      d["Maximum Water Height (m)"] = +d["Maximum Water Height (m)"];
      d["Measurement Type"] = +d["Measurement Type"];
      d["Missing"] = +d["Missing"];
      d["Missing Description"] = +d["Missing Description"];
      d["Mn"] = +d["Mn"];
      d["Mo"] = +d["Mo"];
      d["Period"] = +d["Period"];
      d["Sec"] = +d["Sec"];
      d["Travel Hours"] = +d["Travel Hours"];
      d["Travel Minutes"] = +d["Travel Minutes"];
      d["Tsu Src"] = +d["Tsu Src"];
      d["Tsunami Cause Code"] = +d["Tsunami Cause Code"];
      d["Tsunami Event Validity"] = +d["Tsunami Event Validity"];
      d["Vol"] = +d["Vol"];
      d["Year"] = +d["Year"];
    }); // end forEach()

    // Store a deep copy of the original dataset
    originalData = JSON.parse(JSON.stringify(data));

    filterData(data, 2016, 2020);

    funFacts(9, 28);

    // Create data table in HTML with our json2table() function
    document.getElementById('dataTable').innerHTML = json2table(filteredData, 'table table-sm table-striped');

    // Once table is created, call DataTable which uses jQuery
    $(document).ready(function () {
      $('.table').DataTable({
        "scrollX": true,
        "scrollY": true
      });
    });

    // CALL OTHER JS FUNCTIONS HERE 

    mapFunction(filteredData);


  }) // end fetch()
  .catch(error => console.log(error));


function filterData(data, startYear, endYear) {
  // Start with emptying filteredData
  filteredData = [];

  data.forEach(function (d) {
    // Delete unwanted key-value pairs
    delete d["Tsunami Event Validity"];
    delete d["Tsu Src"];
    delete d["Vol"];
    delete d["More Info"];
    delete d["Doubtful Runup"];
    delete d["Period"];
    delete d["First Motion"];

    // Check if year of current record is within the range passed into this function
    if ((d["Year"] >= startYear) && (d["Year"] <= endYear)) {
      filteredData.push(d);
    } // end if
  }); // end forEach()

} // end function filterData()



// Function funFacts() take in a Month and Day and returns interesting facts based on the filterData
// Fun facts: Number of tsunami entries in our dataset that match
//            The largest tsunami (maximum water height) recorded that day
//            Largest death description category number found
//            Largest Missing description category number found
//            Largest Injuries description category number found
//            Largest Damage description category number found
//            Largest Houses Destroyed description category number found
//            Largest Houses Damaged description category number found
function funFacts(inputMonth, inputDay) {
  var nbrTsunamiEntries = 0;
  var maxWaterHeight = 0;
  var maxWaterHeightCountry = "";
  var maxDeathDesc = 0;
  var maxDeathDescString = "";
  var maxMissingDesc = 0;
  var maxMissingDescString = "";
  var maxInjuriesDesc = 0;
  var maxInjuriesDescString = "";
  var maxDamageDesc = 0;
  var maxDamageDescString = "";
  var maxHousesDestroyedDesc = 0;
  var maxHousesDestroyedDescString = "";
  var maxHousesDamagedDesc = 0;
  var maxHousesDamagedDescString = "";

  filteredData.forEach(function (d) {
    // Check for date match
    if ((d["Mo"] == inputMonth) && (d["Dy"] == inputDay)) {

      // Increment number of matched data rows
      nbrTsunamiEntries++;

      // Check Death Description and update if needed
      if (d["Death Description"] > maxDeathDesc) {
        maxDeathDesc = d["Death Description"];
      } // end if Death Description

      // Check Missing Description and update if needed
      if (d["Missing Description"] > maxMissingDesc) {
        maxMissingDesc = d["Missing Description"];
      } // end if Missing Description

      // Check Injuries Description and update if needed
      if (d["Injuries Description"] > maxInjuriesDesc) {
        maxInjuriesDesc = d["Injuries Description"];
      } // end if Injuries Description

      // Check Damage Description desc and update if needed
      if (d["Damage Description"] > maxDamageDesc) {
        maxDamageDesc = d["Damage Description"];
      } // end if Damage Description

      // Check Houses Destroyed Description desc and update if needed
      if (d["Houses Destroyed Description"] > maxHousesDestroyedDesc) {
        maxHousesDestroyedDesc = d["Houses Destroyed Description"];
      } // end if Houses Destroyed Description

      // Check Houses Damaged Description desc and update if needed
      if (d["Houses Damaged Description"] > maxHousesDamagedDesc) {
        maxHousesDamagedDesc = d["Houses Damaged Description"];
      } // end if Houses Damaged Description

      // Check for largest value of Max Water Height
      if (d["Maximum Water Height (m)"] > maxWaterHeight) {
        maxWaterHeight = d["Maximum Water Height (m)"];
        maxWaterHeightCountry = d["Country"];
      } // end if
    } // end if date match
  }) // end forEach()

  // Assign strings to description category numbers assigned

  switch (maxDeathDesc) {
    case 0:
      maxDeathDescString = "None"
      break;
    case 1:
      maxDeathDescString = "Few (~1 to 50 deaths)"
      break;
    case 2:
      maxDeathDescString = "Some (~51 to 100 deaths)"
      break;
    case 3:
      maxDeathDescString = "Many (~101 to 1000 deaths)"
      break;
    case 4:
      maxDeathDescString = "Very many (over 1000 deaths)"
      break;
  } // end switch Death Description


  switch (maxMissingDesc) {
    case 0:
      maxMissingDescString = "None"
      break;
    case 1:
      maxMissingDescString = "Few (~1 to 50 missing)"
      break;
    case 2:
      maxMissingDescString = "Some (~51 to 100 missing)"
      break;
    case 3:
      maxMissingDescString = "Many (~101 to 1000 missing)"
      break;
    case 4:
      maxMissingDescString = "Very many (over 1000 missing)"
      break;
  } // end switch Missing Description


  switch (maxInjuriesDesc) {
    case 0:
      maxInjuriesDescString = "None"
      break;
    case 1:
      maxInjuriesDescString = "Few (~1 to 50 injuries)"
      break;
    case 2:
      maxInjuriesDescString = "Some (~51 to 100 injuries)"
      break;
    case 3:
      maxInjuriesDescString = "Many (~101 to 1000 injuries)"
      break;
    case 4:
      maxInjuriesDescString = "Very many (over 1000 injuries)"
      break;
  } // end switch Injuries Description


  switch (maxDamageDesc) {
    case 0:
      maxDamageDescString = "None"
      break;
    case 1:
      maxDamageDescString = "Limited (roughly corresponding to less than $1 million)"
      break;
    case 2:
      maxDamageDescString = "Moderate (~$1 to $5 million)"
      break;
    case 3:
      maxDamageDescString = "Severe (~$5 to $25 million)"
      break;
    case 4:
      maxDamageDescString = "Extreme (~$25 million or more)"
      break;
  } // end switch Damage Description


  switch (maxHousesDestroyedDesc) {
    case 0:
      maxHousesDestroyedDescString = "None"
      break;
    case 1:
      maxHousesDestroyedDescString = "Few (~1 to 50 houses destroyed)"
      break;
    case 2:
      maxHousesDestroyedDescString = "Some (~51 to 100 houses destroyed)"
      break;
    case 3:
      maxHousesDestroyedDescString = "Many (101 to 1000 houses destroyed)"
      break;
    case 4:
      maxHousesDestroyedDescString = "Very Many (~over 1000 houses destroyed)"
      break;
  } // end switch Houses Destroyed Description  


  switch (maxHousesDamagedDesc) {
    case 0:
      maxHousesDamagedDescString = "None"
      break;
    case 1:
      maxHousesDamagedDescString = "Few (~1 to 50 houses damaged)"
      break;
    case 2:
      maxHousesDamagedDescString = "Some (~51 to 100 houses damaged)"
      break;
    case 3:
      maxHousesDamagedDescString = "Many (101 to 1000 houses damaged)"
      break;
    case 4:
      maxHousesDamagedDescString = "Very Many (~over 1000 houses damaged)"
      break;
  } // end switch Houses Damaged Description  


  console.log(`Fun facts to return about: Month ${inputMonth} and Day ${inputDay}:`);
  console.log(`Number of data rows found: ${nbrTsunamiEntries}`);
  console.log(`Max water height: ${maxWaterHeight} at country: ${maxWaterHeightCountry}`);
  console.log(`Death summary: ${maxDeathDescString}`);
  console.log(`Missing summary: ${maxMissingDescString}`);
  console.log(`Injuries summary: ${maxInjuriesDescString}`);
  console.log(`Damage Cost summary: ${maxDamageDescString}`);
  console.log(`Houses Destroyed summary: ${maxHousesDestroyedDescString}`);
  console.log(`Houses Damaged summary: ${maxHousesDamagedDescString}`);

} // end function funFacts()


function json2table(json, classes) {
  var cols = ["Year",
    "Mo",
    "Dy",
    "Hr",
    "Mn",
    "Sec",
    "Tsunami Cause Code",
    "Earthquake Magnitude",
    "Country",
    "Area",
    "Location Name",
    "Latitude",
    "Longitude",
    "Distance From Source (km)",
    "Initial Wave Arrival Day",
    "Initial Wave Arrival Hour",
    "Initial Wave Arrival Minute",
    "Travel Hours",
    "Travel Minutes",
    "Max Wave Arrival Day",
    "Max Wave Arrival Hour",
    "Max Wave Arrival Minute",
    "Maximum Water Height (m)",
    "Max Inundation Distance (m)",
    "Deaths",
    "Death Description",
    "Missing",
    "Missing Description",
    "Injuries",
    "Injuries Description",
    "Damage $Mil",
    "Damage Description",
    "Houses Destroyed",
    "Houses Destroyed Description",
    "Houses Damaged",
    "Houses Damaged Description"]

  var headerRow = '';
  var bodyRows = '';

  classes = classes || '';

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  } // end function capitalizeFirstLetter()

  cols.map(function (col) {
    headerRow += '<th>' + capitalizeFirstLetter(col) + '</th>';
  }); // end cols.map

  json.map(function (row) {
    bodyRows += '<tr>';

    cols.map(function (colName) {
      bodyRows += '<td>' + row[colName] + '</td>';
    })

    bodyRows += '</tr>';
  }); // end json.map

  return '<table class="' +
    classes +
    '"><thead><tr>' +
    headerRow +
    '</tr></thead><tbody>' +
    bodyRows +
    '</tbody></table>';

} // end function json2table()
