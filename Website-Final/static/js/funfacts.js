// Function funFacts() returns interesting facts based on the input dataset and current date
// Fun facts: Number of tsunami entries in our dataset that match
//            The largest tsunami (maximum water height) recorded that day
//            Largest death description category number found
//            Largest Missing description category number found
//            Largest Injuries description category number found
//            Largest Damage description category number found
//            Largest Houses Destroyed description category number found
//            Largest Houses Damaged description category number found
function funFacts(data) {
  var today = new Date();
  var currentMonth = today.getMonth() + 1;
  var currentDay = today.getDate();
  var currentMonthString = String(today.getMonth() + 1).padStart(2, '0');
  var currentDayString = String(today.getDate()).padStart(2, '0');

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
  
  data.forEach(function(d) {
    // Check for date match
    if ((d["Mo"] == currentMonth) && 
        (d["Dy"] == currentDay)) {

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

  document.getElementById("funfacts").innerHTML = `Fun facts for today's date: ${currentMonthString}/${currentDayString}`
  
  if (nbrTsunamiEntries == 0) {
    document.getElementById("funfactstext").innerHTML = "No tsunami events found with this Month and Day<br>" +
                                                        "Max water height recorded: 0 m<br>" +
                                                        "Death summary: None<br>" +
                                                        "Missing summary: None<br>" +
                                                        "Injuries summary: None<br>" +
                                                        "Damage Cost summary: None<br>" +
                                                        "Houses Destroyed summary: None<br>" +
                                                        "Houses Damaged summary: None"
  }
  else {
    document.getElementById("funfactstext").innerHTML = `Number of tsunami events found on this date: ${nbrTsunamiEntries}<br>` +
                                                        `Max water height recorded (m): ${maxWaterHeight} at Country: ${maxWaterHeightCountry}<br>` +
                                                        `Death summary: ${maxDeathDescString}<br>` +
                                                        `Missing summary: ${maxMissingDescString}<br>` +
                                                        `Injuries summary: ${maxInjuriesDescString}<br>` +
                                                        `Damage Cost summary: ${maxDamageDescString}<br>` +
                                                        `Houses Destroyed summary: ${maxHousesDestroyedDescString}<br>` +
                                                        `Houses Damaged summary: ${maxHousesDamagedDescString}`                                      
  }








  // console.log(`Fun facts to return about: Month ${currentMonth}, Day ${currentDay}:`);
  // console.log(`Number of data rows found: ${nbrTsunamiEntries}`);
  // console.log(`Max water height: ${maxWaterHeight} at country: ${maxWaterHeightCountry}`);
  // console.log(`Death summary: ${maxDeathDescString}`);
  // console.log(`Missing summary: ${maxMissingDescString}`);
  // console.log(`Injuries summary: ${maxInjuriesDescString}`);
  // console.log(`Damage Cost summary: ${maxDamageDescString}`);
  // console.log(`Houses Destroyed summary: ${maxHousesDestroyedDescString}`);
  // console.log(`Houses Damaged summary: ${maxHousesDamagedDescString}`);

} // end function funFacts()