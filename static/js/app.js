const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

var patients; // variable to store subject sample data
var patientMetadata; // variable to store subject metadata/demographic data

// https://stackoverflow.com/questions/12656580/returning-array-from-d3-json, referenced for how to use D3.json()
d3.json(url).then(function(data) {
    
    patients = Object.values(data.samples);
    patientMetadata = Object.values(data.metadata);

    //For loop to append options from the names dataset to the dropdown menu
    let dropdownRow = d3.selectAll("#selDataset");
    let subjectIDs = Object.values(data.names);

    for (let k = 0; k < subjectIDs.length; k++) {
            row = dropdownRow.append("option").text(`${subjectIDs[k]}`);
    }

    init(patients[0], patientMetadata[0]);
});

// Function to create and populate bar plot, bubble plot, gauge plot, and subject demographic/metadata
function init(data, metaData) {
    
    // Call functions to assign variables that will be used for plots
    barChartLabels = createLabels(data);
    barChartHoverText = createHoverText(data);
    barChartX = setX(data);
    bubbleChartX = setBubbleChartX(data);

    // Create bar plot
    let barChartData = [{
        x: barChartX.slice(0, 10).reverse(),
        y: barChartLabels.slice(0, 10).reverse(),
        text: barChartHoverText.slice(0, 10).reverse(), // https://plotly.com/javascript/hover-text-and-formatting/, referenced for how to format hovertext
        type: "bar",
        orientation: "h"
    }];

    let barChartLayout = {
        //tickvals: barChartTickVals, // https://plotly.com/javascript/tick-formatting/, referenced for tick formatting
        tickvals: bubbleChartX.slice(0, 10),
        height: 600,
        width: 400
    };

    Plotly.newPlot("bar", barChartData, barChartLayout);

    // Create bubble plot
    let bubbleChartData = [{ //https://plotly.com/javascript/bubble-charts/, referenced for creating bubble chart
        x: bubbleChartX,
        y: barChartX,
        text: barChartHoverText,
        mode: "markers",
        marker: {
            size: barChartX,
            color: bubbleChartX,
        }
    }];

    let bubbleChartLayout = {
        xaxis: {title: "OTU ID"}, // https://plotly.com/javascript/line-charts/, referenced for how to set x axis title
        height: 400,
        width: 1200
    };

    Plotly.newPlot("bubble", bubbleChartData, bubbleChartLayout);

    // Create gauge plot
    let gaugeChartData = [{  //https://plotly.com/javascript/gauge-charts/, referenced for how to make gauge charts
        domain: {x: [0, 1], y: [0, 1]},
        value: metaData.wfreq,
        title: "Belly Button Washing Frequency <br> Scrubs per Week", //https://forum.freecodecamp.org/t/how-to-add-new-line-in-string/17763, referenced for how to add line breaks
        type: "indicator",
        mode: "gauge+number",
        gauge: {
            axis: {range: [null, 10]},
            bar: {color: "darkblue"},
            steps: [
                {range: [0, 1], color: "darkred"}, // https://www.w3schools.com/cssref/css_colors.php, used for color reference
                {range: [1, 2], color: "firebrick"},
                {range: [2, 3], color: "indianred"},
                {range: [3, 4], color: "lightpink"},
                {range: [4, 5], color: "snow"},
                {range: [5, 6], color: "palegreen"},
                {range: [6, 7], color: "lightgreen"},
                {range: [7, 8], color: "forestgreen"},
                {range: [8, 9], color: "green"},
                {range: [9, 10], color: "darkgreen"}
            ]
        }
    }];

    let gaugeChartLayout = {
        width: 600,
        height: 600,
    };

    Plotly.newPlot("gauge", gaugeChartData, gaugeChartLayout);

    // Populate demographic field with subject metadata
    metadataField = d3.select("#sample-metadata");
    metadataField.text(""); //https://stackoverflow.com/questions/5744233/how-to-empty-the-content-of-a-div, referenced for how to clear a div
    metadataField.append("p").text(`id: ${metaData.id}`);
    metadataField.append("p").text(`ethnicity: ${metaData.ethnicity}`);
    metadataField.append("p").text(`gender: ${metaData.gender}`);
    metadataField.append("p").text(`age: ${metaData.age}`);
    metadataField.append("p").text(`location: ${metaData.location}`);
    metadataField.append("p").text(`bbtype: ${metaData.bbtype}`);
    metadataField.append("p").text(`wfreq: ${metaData.wfreq}`);
}

// Function to create x axis tick labels for bar plot, converting from int to string with 'OTU' preceding the OTU ID number
function createLabels (subjectData) {

    let sampleOTUIDs = Object.values(subjectData.otu_ids);
    let sampleOTUIDArray = [];
    
    for (let i = 0; i < sampleOTUIDs.length; i++) { 
        otu = `OTU ${sampleOTUIDs[i]}`;
        sampleOTUIDArray.push(otu);
    } 

    return sampleOTUIDArray;
}

// Function to create plot hovertext
function createHoverText (data) {

    let sampleOTULabels = Object.values(data.otu_labels);
    let sampleOTUNames = [];

    for (let j = 0; j < sampleOTULabels.length; j++) {
        otuLabel = sampleOTULabels[j];
        sampleOTUNames.push(otuLabel);
    }

    return sampleOTUNames;
}

// Function to store OTU counts
function setX(data) {
    return Object.values(data.sample_values);
}

// Function to store just OTU id integer
function setBubbleChartX(data) {
    return Object.values(data.otu_ids);
}

// Method called when new value is selected in dropdown
d3.selectAll("#selDataset").on("change", optionChanged);

// Function to assign value selected in the dropdown menu to a variable, and the pass the variable to update plots and demographic data
function optionChanged() {
    
    let dropdownMenu = d3.select("#selDataset");
    let dataset = dropdownMenu.property("value");

    // Function to filter sample data to select sample data for subject ID chosen in the dropdown menu
    function selectValue(selectedID) {
        return selectedID.id === dataset;
    }

    // Function to filter metadata to select metadata for subject ID chosed in the dropdown menu
    function selectInteger(selectedInt) {
        return selectedInt.id === parseInt(dataset); // Subject ID stored as string in metadata, needed to be converted to int
    }

    let patientData = patients.filter(selectValue);
    let updatedMetadata = patientMetadata.filter(selectInteger);

    init(patientData[0], updatedMetadata[0]); // Call function to update plots and demographic data with selected subject
}