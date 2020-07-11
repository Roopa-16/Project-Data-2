// Create Variables
var months = [];
var Tsunami_Cause_Code = [];

  // read Json
  d3.json("get_tsunami_data.json").then((data) =>{

    // Get the data
    months = data.Mo;
    cause = data.Tsunami_Cause_Code;
    
    console.log(months);

    // Build Bar/bubble Chart
    //Use `sample_values` as the values for the bar chart.
function create_charts(sample) {
// read Json
  d3.json("get_tsunami_data.json").then((data) => {

    //Get the data
  samples = data.samples;

  //filter the samples from the Json file
  var subject = samples.filter(sample_object => sample_object.id == sample);
  var results = subject[0];
  var otu_ids = results.otu_ids;
  var sample_values = results.sample_values;
  var otu_labels = results.otu_labels;

  // Build the bubble chart
var bubble = {
  x:otu_ids,
  y:sample_values,
  text: otu_labels,
  mode:'markers',
  marker:{
    size: sample_values,
    color: otu_ids,
    colorscale:"Earth"
  }
},

  data = [bubble];
  var layout ={
   title: "Belly Button Biodiversity",
   xaxis:{ title: "OTU_ IDS"}
 };
    Plotly.newPlot("bubble", data, layout);

// bar chart
var bar = [{
  x: sample_values.slice(0, 10),
  y: otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse(),
  type: "bar",
  orientation: "h",
}];

// Render the plot to the div tag with id "plot"
 Plotly.newPlot("bar", bar);
  });
};

function optionChanged (sample) {
panel(sample);
create_charts(sample);
}