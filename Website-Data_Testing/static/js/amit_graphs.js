function graphTsunamisByYear(data) {
  var yearTotals = [];
  var counter = 0;
  var currentYear = 0;

  for(i = 0; i < data.length; i++) {
    if (i == 0) {
      // Initialize for first time
      currentYear = data[i]["Year"];
      if (data[i]["Maximum Water Height (m)"] > 0) {
        counter += 1;
      }
    } // end if
    else {  
      if (data[i]["Year"] == currentYear) {
        if (data[i]["Maximum Water Height (m)"] > 0) {
          counter += 1;
        }
        if (i == (data.length - 1)) {
          yearTotals.push(counter);
        }
      }
      else {
        // Different year found
        yearTotals.push(counter);
        counter = 0;
        currentYear = data[i]["Year"];
      }
    } // end else
  } // end for

  
  x_axis = [2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020];
  y_axis = yearTotals;

  var trace1 = {
    x: x_axis,
    y: y_axis,
    type: 'line'
  };
  var data = [trace1];
  var layout = {
      title: 'Tsunami By Year',
      xaxis: {
        title: 'Years'
      },
      yaxis: {
        title: 'Total Number of Tsunamis'
      }
      };
    
  Plotly.newPlot('linegraph', data, layout);

} // end function graphTsunamisByYear()


function graphCountryHistogram(data) {
  var countryArray = [];

  data.forEach(function(d) {
    if(d["Maximum Water Height (m)"] > 0) {
      countryArray.push(d["Country"]);
    } // end if

  }) // end forEach()

  var trace = {
    x: countryArray,
    type: 'histogram',
  };
  var data = [trace];
  Plotly.newPlot('histogram', data);
}



function graphYearHistogram(data) {
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
