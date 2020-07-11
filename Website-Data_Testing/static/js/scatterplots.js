function scatterMagnitudeVsHeight(data) {
  var earthquake_mag = [];
  var max_water_height = [];

  data.forEach(function(d) {
    if ((d["Earthquake Magnitude"] > 0) &&
        (d["Maximum Water Height (m)"] > 0)) {
          earthquake_mag.push(d["Earthquake Magnitude"]);
          max_water_height.push(d["Maximum Water Height (m)"]);
        }
  }) // end forEach
  var trace1 = {
    x: earthquake_mag,
    y: max_water_height,
    mode: 'markers',
    type: 'scatter'
  };
    
  var plotdata = [trace1];
  var layout = {
    title: 'Earthquake Magnitude vs Maximum Water Height (m)',
    xaxis: {
      title: 'Earthquake Magnitude'
    },
    yaxis: {
      title: 'Maximum Water Height (m)'
    }
    };
  Plotly.newPlot('scatterMagnitudeVsHeight', plotdata, layout);
}



function scatterHeightvsDistance(data) {
  var max_water_height = [];
  var max_water_dist = [];

  data.forEach(function(d) {
    if ((d["Maximum Water Height (m)"] > 0) &&
        (d["Max Inundation Distance (m)"] > 0)) {
          max_water_height.push(d["Maximum Water Height (m)"]);
          max_water_dist.push(d["Max Inundation Distance (m)"]);
        }
  }) // end forEach
  var trace1 = {
    x: max_water_height,
    y: max_water_dist,
    mode: 'markers',
    type: 'scatter'
  };
    
  var plotdata = [trace1];
  var layout = {
    title: 'Maximum Water Height (m) vs Maximum Inundation Distance (m)',
    xaxis: {
      title: 'Maximum Water Height (m)'
    },
    yaxis: {
      title: 'Maximum Inundation Distance (m)'
    }
    };
  Plotly.newPlot('scatterHeightvsDistance', plotdata, layout);
}



function scatterMagnitudevsDistance(data) {
  var earthquake_mag = [];
  var max_water_dist = [];

  data.forEach(function(d) {
    if ((d["Earthquake Magnitude"] > 0) &&
        (d["Max Inundation Distance (m)"] > 0)) {
          earthquake_mag.push(d["Earthquake Magnitude"]);
          max_water_dist.push(d["Max Inundation Distance (m)"]);
        }
  }) // end forEach
  var trace1 = {
    x: earthquake_mag,
    y: max_water_dist,
    mode: 'markers',
    type: 'scatter'
  };
    
  var plotdata = [trace1];
  var layout = {
    title: 'Earthquake Magnitude vs Maximum Inundation Distance (m)',
    xaxis: {
      title: 'Earthquake Magnitude'
    },
    yaxis: {
      title: 'Maximum Inundation Distance (m)'
    }
    };
  Plotly.newPlot('scatterMagnitudevsDistance', plotdata, layout);
}





