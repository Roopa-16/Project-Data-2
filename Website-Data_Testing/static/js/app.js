// --------------------------------------------------------------------------------
// Project 2: Tsunami Dashboard
// --------------------------------------------------------------------------------

// URLs to our Flask routes
var get_tsunami_status_URL    = "http://127.0.0.1:5000/get_tsunami_status";
var update_tsunami_status_URL = "http://127.0.0.1:5000/update_tsunami_status";
var get_tsunami_data_URL      = "http://127.0.0.1:5000/get_tsunami_data";

// Global dataset arrays
var originalData = [];
var filteredData = [];

// Global tsunami status banner text strings
var tsunamiStatusText = "";
var tsunamiStatusTimestamp = "";

// GET TSUNAMI STATUS STORED IN DB
fetch(get_tsunami_status_URL)
  .then((resp) => resp.json())
  .then(function(data) {
    console.log("Fetched tsunami status");
    tsunamiStatusText = data.StatusMsg;
    tsunamiStatusTimestamp = data.TimestampLocal;
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

    // Store a copy of the original dataset
    originalData = data;

    filterData(data, 2016, 2020);

    funFacts(9, 28);

}) // end fetch()
.catch(error=>console.log(error));


function filterData(data, startYear, endYear) {
  // Start with emptying filteredData
  filteredData = [];

  data.forEach(function(d) {
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
  
  filteredData.forEach(function(d) {
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

  switch(maxDeathDesc) {
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


  switch(maxMissingDesc) {
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


  switch(maxInjuriesDesc) {
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


  switch(maxDamageDesc) {
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


  switch(maxHousesDestroyedDesc) {
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


  switch(maxHousesDamagedDesc) {
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


