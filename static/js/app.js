// 1. Use the D3 library to read in samples.json from the URL

//creating constant variable URL
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

//reading w/ D3 then displaying data in console log
d3.json(url).then(function(data) {
     console.log(data);
});

// 2. Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.
// Use sample_values as the values for the bar chart.
// Use otu_ids as the labels for the bar chart.
// Use otu_labels as the hovertext for the chart.

// Function to initialize the page w/ dropdown and graphs we want
function init() {
    let dropdownMenu = d3.select("#selDataset");
    // Read data from the JSON file
    d3.json(url).then((data) => {
        // Extract sample IDs from data
        let sampleIds = data.names;
        
        // dropdown menu with sample IDs
        sampleIds.forEach((id) => {
            console.log(id);
            dropdownMenu.append("option").text(id).property("value", id);
        });

        // Display the first sample by default
        const firstSample = sampleIds[0];

        // Display first sample in console
        console.log(firstSample);

        // Build the charts
        BarCharts(firstSample);
        BubbleCharts(firstSample);
        Metadata(firstSample);
        GaugeChart(firstSample);
    });
};


// Function to build BAR charts
function BarCharts(sampleId) {
    // Use D3 to retrieve all of the data
    d3.json(url).then(function(data) {
        // Filter data for the selected sample
        let sample = data.samples.find(sample => sample.id == sampleId);
        
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
            title: `Top 10 OTUs for Subject ${sampleId}`,
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
    // Use D3 to retrieve all of the data
    d3.json(url).then((data) => {
        // Filter data for the selected sample
        let sample = data.samples.find(sample => sample.id == sampleId);
        
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
            title: `Bubble Chart for Subject ${sampleId}`,
            xaxis: { title: 'OTU IDs' },
            yaxis: { title: 'Sample Values' }
        };
        Plotly.newPlot("bubble", [trace2], layout2);
    });
}


// 4. Display the sample metadata, i.e., an individual's demographic information.

function Metadata(sampleID) {

    // Use D3 to retrieve all of the data
    d3.json(url).then((data) => {

        // Retrieve all metadata
        let metadata = data.metadata;

        // Filter based on the value of the sample
        let sample = metadata.filter(result => result.id == sampleID);

        // Log the array of metadata objects after the have been filtered
        console.log(sample)

        // Get the first index from the array
        let valueData = sample[0];

        // Clear out metadata
        d3.select("#sample-metadata").html("");

        // 5. Display each key-value pair from the metadata JSON object somewhere on the page.
        // Use Object.entries to add each key/value pair to the panel
        Object.entries(valueData).forEach(([key, value]) => {

            // Log the individual key/value pairs as they are being appended to the metadata panel
            console.log(key, value);

            d3.select("#sample-metadata").append("h5").text(`${key}: ${value}`);
        });
    });

};



// 7. Deploy your app to a free static page hosting service, such as GitHub Pages. 
// Submit the links to your deployment and your GitHub repo. 
// Ensure that your repository has regular commits and a thorough README.md file


function GaugeChart(sampleID) {
    d3.json(url).then((data) => {
        // Retrieve metadata for the selected sample
        let metadata = data.metadata;
        let sample = metadata.find(item => item.id == sampleID);
        let frequency = sample.wfreq;

        // Trace for the data for the gauge chart
        let trace3 = [{
            type: "indicator",
            mode: "gauge+number",
            value: frequency,
            domain: { x: [0, 1], y: [0, 1] },
            title: { text: `Washing Frequency for Subject ${sampleID}` }, 
            gauge: {
                axis: { range: [null, 9] }, 
                bar: { color: "black" },
                steps: [
                    { range: [0, 1], color: "red" },
                    { range: [1, 2], color: "orange" },
                    { range: [2, 3], color: "yellow" },
                    { range: [3, 4], color: "lightgreen" },
                    { range: [4, 5], color: "darkgreen" },
                    { range: [5, 6], color: "lightblue" },
                    { range: [6, 7], color: "blue" },
                    { range: [7, 8], color: "violet" },
                    { range: [8, 9], color: "purple" },
                ]
            }
        }];

        let layout3 = {
            width: 600, 
            height: 450,
            margin: { t: 0, b: 0 } 
        };

        // Use Plotly to plot the data in a gauge chart
        Plotly.newPlot("gauge", trace3, layout3);
    });
};

// 6. Update all the plots when a new sample is selected. 
// Additionally, you are welcome to create any layout that you would like for your dashboard. 
// Event listener for dropdown change
function optionChanged(sample) {
    BarCharts(sample);
    BubbleCharts(sample);
    Metadata(sample);
    GaugeChart(sample);
}

// Initialize the page
init();