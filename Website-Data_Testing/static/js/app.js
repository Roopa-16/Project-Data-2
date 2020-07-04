// --------------------------------------------------------------------------------
// Project 2: Tsunami Dashboard
// --------------------------------------------------------------------------------

var get_tsunami_status_URL    = "http://127.0.0.1:5000/get_tsunami_status";
var update_tsunami_status_URL = "http://127.0.0.1:5000/update_tsunami_status";
var get_tsunami_data_URL      = "http://127.0.0.1:5000/get_tsunami_data";


// GET TSUNAMI STATUS STORED IN DB
fetch(get_tsunami_status_URL)
  .then((resp) => resp.json())
  .then(function(data) {
    console.log("Data contents:");
    console.log(data.StatusMsg);
    console.log(data.TimestampLocal);
})
.catch(error=>console.log(error));


// // GET LATEST TSUNAMI STATUS VIA REQUESTING NEW WEB SCRAPE
// fetch(update_tsunami_status_URL)
//   .then((resp) => resp.json())
//   .then(function(data) {
//     console.log("Data contents:");
//     console.log(data.StatusMsg);
//     console.log(data.TimestampLocal);
// })
// .catch(error=>console.log(error));


// GET TSUNAMI DATA
fetch(get_tsunami_data_URL)
  .then((resp) => resp.json())
  .then(function(data) {
    console.log("Data contents:");
    console.log(data)

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

}) // end fetch()
.catch(error=>console.log(error));



