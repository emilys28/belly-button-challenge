// 1. Use the D3 library to read in samples.json from the URL

//creating constant variable URL
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

//reading then displaying data in console log
d3.json(url).then(function(data) {
     console.log(data);
});

// 2. Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.
// Use sample_values as the values for the bar chart.
// Use otu_ids as the labels for the bar chart.
// Use otu_labels as the hovertext for the chart.

// Function to initialize the page
function init() {
    let dropdownMenu = d3.select("#selDataset");
    // Read data from the JSON file
    d3.json(url).then(function(data) {
        // Extract sample IDs from data
        const sampleIds = data.names;
        
        // dropdown menu with sample IDs
        sampleIds.forEach((id) => {
            dropdownMenu.append("option").text(id).property("value", id);
        });

        // Display the first sample by default
        let firstSample = sampleIds[0];
        BarCharts(firstSample);
        BubbleCharts(firstSample);
    });
}


// Function to build BAR charts
function BarCharts(sampleId) {
    d3.json(url).then(function(data) {
        // Filter data for the selected sample
        const sample = data.samples.find(sample => sample.id === sampleId);
        
        // Extract top 10 OTUs
        let otuIds = sample.otu_ids.slice(0, 10).map(id => `OTU ${id}`).reverse();
        let sampleValues = sample.sample_values.slice(0, 10).reverse();
        let otuLabels = sample.otu_labels.slice(0, 10).reverse();

        // Create horizontal bar chart
        let trace1 = {
            x: sampleValues,
            y: otuIds,
            text: otuLabels,
            type: "bar",
            orientation: "h"
        };
        let layout1 = {
            title: "Top 10 OTUs",
            xaxis: { title: "Sample Values" },
            yaxis: { title: "OTU IDs" }
        };
        Plotly.newPlot("bar", [trace1], layout1);
    });
}
    


// 3.  Create a bubble chart that displays each sample.
// Use otu_ids for the x values.
// Use sample_values for the y values.
// Use sample_values for the marker size.
// Use otu_ids for the marker colors.
// Use otu_labels for the text values.

// Function to build BUBBLE chart
function BubbleCharts(sampleId) {
    d3.json(url).then(function(data) {
        // Filter data for the selected sample
        const sample = data.samples.find(sample => sample.id === sampleId);
        
        // Extract top 10 OTUs
        let otuIds = sample.otu_ids;
        let sampleValues = sample.sample_values;
        let otuLabels = sample.otu_labels;

        // Create bubble chart
        let trace2 = {
            x: otuIds,
            y: sampleValues,
            text: otuLabels,
            mode: 'markers',
            marker: {
                size: sampleValues,
                color: otuIds,
                colorscale: 'Earth'
            }
        };
        let layout2 = {
            title: 'Sample Bubble Chart',
            xaxis: { title: 'OTU IDs' },
            yaxis: { title: 'Sample Values' }
        };
        Plotly.newPlot("bubble", [trace2], layout2);
    });
}


// 4. Display the sample metadata, i.e., an individual's demographic information.



// 5. Display each key-value pair from the metadata JSON object somewhere on the page.



// 6. Update all the plots when a new sample is selected. 
// Additionally, you are welcome to create any layout that you would like for your dashboard. 


// 7. Deploy your app to a free static page hosting service, such as GitHub Pages. 
// Submit the links to your deployment and your GitHub repo. 
// Ensure that your repository has regular commits and a thorough README.md file




// OPTIONAL:
// Advanced Challenge Assignment (Optional with no extra points earning)

// The following task is advanced and therefore optional.
// Adapt the Gauge Chart from https://plot.ly/javascript/gauge-charts/ to plot the weekly washing frequency of the individual.
// You will need to modify the example gauge code to account for values ranging from 0 through 9.
// Update the chart whenever a new sample is selected.

// Event listener for dropdown change
function optionChanged(newSampleId) {
    buildCharts(newSampleId);
}

// Initialize the page
init();