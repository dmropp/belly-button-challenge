const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// https://stackoverflow.com/questions/12656580/returning-array-from-d3-json, referenced for how to use D3.json()

var patients;


d3.json(url).then(function(data) {
    
    console.log(data);

    patients = Object.values(data.samples);
    console.log(patients);

    //For loop to append options from the names dataset to the dropdown menu
    let dropdownRow = d3.selectAll("#selDataset");
    let subjectIDs = Object.values(data.names);

    for (let k = 0; k < subjectIDs.length; k++) {

            row = dropdownRow.append("option").text(`${subjectIDs[k]}`);

    }

    init(patients[0]);
});

function init(data) {
    
    // For loop to create array of otu labels for the chart as the values are stored as INTs and not strings in the original array

    console.log(data);

    barChartLabels = createLabels(data);

    console.log(barChartLabels);

    barChartHoverText = createHoverText(data);

    barChartX = setX(data);

    barChartTickVals = setTickValues(data);

    bubbleChartX = setBubbleChartX(data);

    let barChartData = [{
        x: barChartX.slice(0, 10).reverse(),
        y: barChartLabels.slice(0, 10).reverse(),
        text: barChartHoverText.slice(0, 10).reverse(), // https://plotly.com/javascript/hover-text-and-formatting/, referenced for how to format hovertext
        type: "bar",
        orientation: "h"
    }];

    let barChartLayout = {
        tickvals: barChartTickVals, // https://plotly.com/javascript/tick-formatting/, referenced for tick formatting
        height: 600,
        width: 400
    }

    Plotly.newPlot("bar", barChartData, barChartLayout);

    // fix variable names because they're confusing

    let bubbleChartData = [{ //https://plotly.com/javascript/bubble-charts/, referenced for creating bubble chart
        x: bubbleChartX,
        y: barChartX,
        mode: "markers",
        marker: {
            size: barChartX
        }
    }]

    let bubbleChartLayout = {
        height: 400,
        width: 1200
    }

    Plotly.newPlot("bubble", bubbleChartData, bubbleChartLayout);
}

function createLabels (subjectData) {
    let sampleOTUIDs = Object.values(subjectData.otu_ids);

    let sampleOTUIDArray = [];
    
    for (let i = 0; i < sampleOTUIDs.length; i++) { // Can I make this a function for looping through the first 10 items in the array?

        otu = `OTU ${sampleOTUIDs[i]}`;
        console.log(otu);
        sampleOTUIDArray.push(otu);

    } 

    return sampleOTUIDArray;
}

function createHoverText (data) {
    let sampleOTULabels = Object.values(data.otu_labels);
    let sampleOTUNames = [];

    for (let j = 0; j < sampleOTULabels.length; j++) {

        otuLabel = sampleOTULabels[j];
        console.log(otuLabel);
        sampleOTUNames.push(otuLabel);
    }

    return sampleOTUNames;
}

function setX(data) {
    // return Object.values(data.sample_values.slice(0, 10)).reverse();
    return Object.values(data.sample_values);
}

function setBubbleChartX(data) {
    // return Object.values(data.sample_values.slice(0, 10)).reverse();
    return Object.values(data.otu_ids);
}

function setTickValues(data) {
    return Object.values(data.otu_ids.slice(0, 10));
}

d3.selectAll("#selDataset").on("change", optionChanged);

function optionChanged(v) {
    console.log(v);

    let dropdownMenu = d3.select("#selDataset");

    let dataset = dropdownMenu.property("value");

    console.log(dataset);

    function selectValue(selectedID) {
        return selectedID.id === dataset;
    }

    let patientData = patients.filter(selectValue);

    console.log(patientData);

    updateBarChart(patientData);
}

//Need to reference Plotly documentation to figure out why this isn't working
function updateBarChart(newData) {
    console.log(newData[0]);
    init(newData[0]);
}