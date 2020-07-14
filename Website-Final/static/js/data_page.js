// --------------------------------------------------------------------------------
// Project 2: Tsunami Dashboard - Data Page
// --------------------------------------------------------------------------------

// URLs to our Flask routes
var get_tsunami_data_URL      = "http://127.0.0.1:5000/get_tsunami_data";

// Global dataset arrays
var originalData = [];
var filteredData20Years = [];
var filteredData5Years = [];

// GET TSUNAMI DATA
fetch(get_tsunami_data_URL)
  .then((resp) => resp.json())
  .then(function(data) {
    // Parse data - Convert numeric datatypes from strings to numbers
    data.forEach(function(d) {
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
    //originalData = JSON.parse(JSON.stringify(data));

    // Create filtered data arrays
    filteredData20Years = filterData(data, 2000, 2020);
    filteredData5Years = filterData(data, 2016, 2020);

    // ----------- BEGIN DATA TABLE CREATION AND DISPLAY ---------------
    // Create data table in HTML with our json2table() function
    document.getElementById('dataTable').innerHTML = json2table(filteredData5Years, 'table table-sm table-striped');
    // Once table is created, call DataTable which uses jQuery
    $(document).ready( function () {
      $('.table').DataTable( {
        "scrollX" : true,
        "scrollY" : true
      });
    });
    // ----------- END DATA TABLE CREATION AND DISPLAY ---------------

  }) // end fetch()
.catch(error=>console.log(error));


function filterData(data, startYear, endYear) {
  // Start with emptying filteredData
  var filteredData = [];

  // Create deep copy of data set into the function
  var deepCopy = JSON.parse(JSON.stringify(data));

  deepCopy.forEach(function(d) {
    // Delete unwanted key-value pairs
    delete d["Tsu Src"];
    delete d["Vol"];
    delete d["More Info"];
    delete d["Period"];
    delete d["First Motion"];

    // Filter for criteria:
    //   - Year of current record is within the range passed into this function
    //   - Tsunami Event Validity = 4, meaning Definite Tsunami
    //   - Doubtful Runup = "n",       meaning runup entry was not doubtful
    if (((d["Year"] >= startYear) && (d["Year"] <= endYear))  &&
         (d["Tsunami Event Validity"] == 4) &&
         (d["Doubtful Runup"] == "n") &&
         (d["Maximum Water Height (m)"] > 0)) {
      filteredData.push(d);
    } // end if
  }); // end forEach()

  return filteredData;
} // end function filterData()








