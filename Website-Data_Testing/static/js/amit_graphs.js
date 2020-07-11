function graphTsunamisByYear() {
  var yearTotals = [];
  var counter = 0;
  var currentYear = 0;

  for(i = 0; i < filteredData.length; i++) {
    if (i == 0) {
      // Initialize for first time
      currentYear = filteredData[i]["Year"];
      if (filteredData[i]["Maximum Water Height (m)"] > 0) {
        counter += 1;
      }
    } // end if
    else {  
      if (filteredData[i]["Year"] == currentYear) {
        if (filteredData[i]["Maximum Water Height (m)"] > 0) {
          counter += 1;
        }
        if (i == (filteredData.length - 1)) {
          yearTotals.push(counter);
        }
      }
      else {
        // Different year found
        yearTotals.push(counter);
        counter = 0;
        currentYear = filteredData[i]["Year"];
      }
    } // end else
  } // end for

  
  x_axis = [2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020];
  y_axis = yearTotals;

  
  // Create a plotly line chart using x_axis and y_axis above
} // end function graphTsunamisByYear()


function graphCountryHistogram() {
  var countryArray = [];

  filteredData.forEach(function(d) {
    if(d["Maximum Water Height (m)"] > 0) {
      countryArray.push(d["Country"]);
    } // end if

  }) // end forEach()

  console.log(countryArray);
  var trace = {
    x: countryArray,
    type: 'histogram',
  };
  var data = [trace];
  Plotly.newPlot('histogram', data);
}



function graphYearHistogram() {
  var yearArray = [];

  filteredData.forEach(function(d) {
    if(d["Maximum Water Height (m)"] > 0) {
      yearArray.push(d["Year"]);
    } // end if

  }) // end forEach()

  console.log(yearArray);
  var trace = {
    x: yearArray,
    type: 'histogram',
  };
  var data = [trace];
  Plotly.newPlot('histogram', data);
}

