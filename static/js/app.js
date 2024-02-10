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

    // Drop down menu: 
   


    // Sort the data by descending
    let sortedsamples = samples.sort((a, b) => b.samples - a.samples);

    // Slice the first 10 objects for plotting
    let slicedData = sortedsamples.slice(0, 10);

    // Reverse the array to accommodate Plotly's defaults
    slicedData.reverse();

    // Trace1 for the Sample Data
    let trace1 = {
        x: slicedData.map(object => object.sample_values),
        y: slicedData.map(object => object.otu_ids),
        text: slicedData.map(object => object.otu_labels),
        name: "Labels",
        type: "bar",
        orientation: "h"
    };

    // Data array
    let data = [trace1];

    // Apply a title to the layout
    let layout = {
    title: "top 10 OTUs found in ${id}",
    margin: {
        l: 100,
        r: 100,
        t: 100,
        b: 100
    }
    };

    // Render the plot to the div tag with id "plot"
    Plotly.newPlot("plot", data, layout);


// 3.  Create a bubble chart that displays each sample.
// Use otu_ids for the x values.
// Use sample_values for the y values.
// Use sample_values for the marker size.
// Use otu_ids for the marker colors.
// Use otu_labels for the text values.


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