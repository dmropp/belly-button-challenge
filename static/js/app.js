const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// https://stackoverflow.com/questions/12656580/returning-array-from-d3-json, referenced for how to use D3.json()

var patients; //probably will need to fix global variable to include whole dataset
var patientMetadata;


d3.json(url).then(function(data) {
    
    console.log(data);

    patients = Object.values(data.samples);
    // patients = Object.values(data);
    console.log(patients);

    patientMetadata = Object.values(data.metadata);
    console.log(patientMetadata);

    //For loop to append options from the names dataset to the dropdown menu
    let dropdownRow = d3.selectAll("#selDataset");
    let subjectIDs = Object.values(data.names);

    for (let k = 0; k < subjectIDs.length; k++) {

            row = dropdownRow.append("option").text(`${subjectIDs[k]}`);

    }

    init(patients[0], patientMetadata[0]);
});

function init(data, metaData) {
    
    // For loop to create array of otu labels for the chart as the values are stored as INTs and not strings in the original array

    console.log(data);

    barChartLabels = createLabels(data);

    // console.log(barChartLabels);

    barChartHoverText = createHoverText(data);

    // console.log(barChartHoverText);

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
        text: barChartHoverText,
        mode: "markers",
        marker: {
            size: barChartX,
            //color: set colors based on otu_ids
        }
    }]

    let bubbleChartLayout = {
        height: 400,
        width: 1200
    }

    Plotly.newPlot("bubble", bubbleChartData, bubbleChartLayout);

    // call function to populate sample metadata div id sample-metadata
    // populateMetadata(data);
    metadataField = d3.select("#sample-metadata");
    metadataField.append("p").text(`id: ${metaData.id}`); //figure out if these need to be inserted as lines or line breaks
    metadataField.append("p").text(`ethnicity: ${metaData.ethnicity}`);
    metadataField.append("p").text(`gender: ${metaData.gender}`);
    metadataField.append("p").text(`age: ${metaData.age}`);
    metadataField.append("p").text(`location: ${metaData.location}`);
    metadataField.append("p").text(`bbtype: ${metaData.bbtype}`);
    metadataField.append("p").text(`wfreq: ${metaData.wfreq}`);


    // for (a = 0; a < metadataText.length; a++) {
    //     row = metadataField.append("tr").text(metadataText[a]);
    // }
    // metadataField.append("p").text(metaData.id);
    //metadataField.text(metaData.ethnicity);
    // do I need to create a function that maps the data?
}

function createLabels (subjectData) {
    let sampleOTUIDs = Object.values(subjectData.otu_ids);

    let sampleOTUIDArray = [];
    
    for (let i = 0; i < sampleOTUIDs.length; i++) { // Can I make this a function for looping through the first 10 items in the array?

        otu = `OTU ${sampleOTUIDs[i]}`;
        // console.log(otu);
        sampleOTUIDArray.push(otu);

    } 

    return sampleOTUIDArray;
}

function createHoverText (data) {
    let sampleOTULabels = Object.values(data.otu_labels);
    let sampleOTUNames = [];

    for (let j = 0; j < sampleOTULabels.length; j++) {

        otuLabel = sampleOTULabels[j];
        // console.log(otuLabel);
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

    // console.log(patientData);

    // updateBarChart(patientData);

    init(patientData[0]);
}

//Need to reference Plotly documentation to figure out why this isn't working
//Do I need this function?
// function updateBarChart(newData) {
//     console.log(newData[0]);
//     init(newData[0]);
// }