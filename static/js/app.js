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

    init(patients);
});

function init(data) {
    
    // For loop to create array of otu labels for the chart as the values are stored as INTs and not strings in the original array

    console.log(data);

    barChartLabels = createLabels(data);

    console.log(barChartLabels);

    barChartHoverText = createHoverText(data);

    barChartX = setX(data);

    barChartTickVals = setTickValues(data);

    let plotData = [{
        x: barChartX,
        y: barChartLabels,
        text: barChartHoverText, // https://plotly.com/javascript/hover-text-and-formatting/, referenced for how to format hovertext
        type: "bar",
        orientation: "h"
    }];

    let layout = {
        tickvals: barChartTickVals, // https://plotly.com/javascript/tick-formatting/, referenced for tick formatting
        height: 600,
        width: 400
    }

    Plotly.newPlot("plot", plotData, layout);
}

function createLabels (subjectData) {
    let sampleOTUIDs = Object.values(subjectData[0].otu_ids).slice(0, 10).reverse();

    let sampleOTUIDArray = [];
    
    for (let i = 0; i < sampleOTUIDs.length; i++) { // Can I make this a function for looping through the first 10 items in the array?

        otu = `OSU ${sampleOTUIDs[i]}`;
        console.log(otu);
        sampleOTUIDArray.push(otu);

    } 

    return sampleOTUIDArray;
}

function createHoverText (data) {
    let sampleOTULabels = Object.values(data[0].otu_labels).slice(0, 10).reverse();
    let sampleOTUNames = [];

    for (let j = 0; j < sampleOTULabels.length; j++) {

        otuLabel = sampleOTULabels[j];
        console.log(otuLabel);
        sampleOTUNames.push(otuLabel);
    }

    return sampleOTUNames;
}

function setX(data) {
    return Object.values(data[0].sample_values.slice(0, 10)).reverse();
}

function setTickValues(data) {
    return Object.values(data[0].otu_ids.slice(0, 10));
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

// Need to reference Plotly documentation to figure out why this isn't working
function updateBarChart(newData) {
        Plotly.restyle("bar", setX, createLabels, [newData]);
}