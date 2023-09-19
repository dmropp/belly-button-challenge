const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// const dataPromise = d3.json(url);
// console.log("Data Promise", dataPromise);

// may need to create separate function outside of json call for manipulating data. Going to leave on change outside JSON function and see if that works
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

    init();
});

function init() {
    
    // For loop to create array of otu labels for the chart as the values are stored as INTs and not strings in the original array

    // let sampleOTUIDs = Object.values(data.samples[0].otu_ids).slice(0, 10).reverse();

    console.log(patients);

    let sampleOTUIDs = Object.values(patients[0].otu_ids).slice(0, 10).reverse();

    let sampleOTUIDArray = [];
    
    for (let i = 0; i < sampleOTUIDs.length; i++) { // Can I make this a function for looping through the first 10 items in the array?

        otu = `OSU ${sampleOTUIDs[i]}`;
        console.log(otu);
        sampleOTUIDArray.push(otu);

    } 

    console.log(sampleOTUIDArray);
    
    // For loop to create array of OTU labels for chart hovertext
    
    let sampleOTULabels = Object.values(patients[0].otu_labels).slice(0, 10).reverse();
    let sampleOTUNames = [];

    for (let j = 0; j < sampleOTULabels.length; j++) {

        otuLabel = sampleOTULabels[j];
        console.log(otuLabel);
        sampleOTUNames.push(otuLabel);
    }

    let plotData = [{
        x: Object.values(patients[0].sample_values.slice(0, 10)).reverse(),
        y: sampleOTUIDArray,
        text: sampleOTUNames, // https://plotly.com/javascript/hover-text-and-formatting/, referenced for how to format hovertext
        type: "bar",
        orientation: "h"
    }];

    let layout = {
        tickvals: Object.values(patients[0].otu_ids.slice(0, 10)), // https://plotly.com/javascript/tick-formatting/, referenced for tick formatting
        height: 600,
        width: 400
    }

    Plotly.newPlot("plot", plotData, layout);
}

// d3.selectAll("#selDataset").on("change", optionChanged);

// function optionChanged() {

//     let dropdownMenu = d3.select("#selDataset");

//     let dataset = dropdownMenu.property("value");

//     console.log(dataset);

//     function selectValue(selectedID) {
//         return selectedID.id === dataset;
//     }

//     let patientData = patients.filter(selectValue);

//     console.log(patientData);

//     updateBarChart(patientData);
// }

// function updateBarChart(newData) {
//     Plotly.restyle("bar", "x", "y", [newData]);
// }

// init();

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

function updateBarChart(newData) {
        Plotly.restyle("bar", "x", "y", [newData]);
}