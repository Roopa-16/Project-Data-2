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

  cols.map(function(col) {
    headerRow += '<th>' + capitalizeFirstLetter(col) + '</th>';
  }); // end cols.map

  json.map(function(row) {
    bodyRows += '<tr>';

    cols.map(function(colName) {
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
