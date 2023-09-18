const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// const dataPromise = d3.json(url);
// console.log("Data Promise", dataPromise);

d3.json(url).then(function(data) {
    
    console.log(data);

    let patients = Object.values(data.samples);
    console.log(patients);

    let labels = Object.keys(data.samples[0]);
    console.log(labels);

    let patient = Object.values(data.samples[0]);
    console.log(patient);

    let sampleValues = Object.values(data.samples[0].sample_values);
    console.log(sampleValues);

    // Function to create array of otu labels for the chart as the values are stored as INTs and not strings in the array
    
    // function yAxisLabels(yLabels) {
    //     for (let i = 0, i < yLabels.length, i++) {
    //         let otu_labels = yLabels[i];

    //         return otu_labels;
    //     } 
    // } 


    function init() {
        
        // Function to create array of otu labels for the chart as the values are stored as INTs and not strings in the original array

        let sampleOTU = Object.values(data.samples[0].otu_ids).slice(0, 10);

        let sampleOTUArray = [];
        
        for (let i = 0, i < sampleOTU.length, i++) {

            otu = sampleOTU[i];
            sampleOTUArray.push(otu);

        }

        let plotData = [{
            x: Object.values(data.samples[0].sample_values.slice(0, 10)),
            // y: Object.values(data.samples[0].otu_ids).slice(0, 10),
            y: sampleOTUArray;
            type: "bar",
            orientation: "h"
        }];

        let layout = {
            // tickmode: "linear",
            tickvals: Object.values(data.samples[0].otu_ids.slice(0, 10)),
            height: 600,
            width: 400
        }

        Plotly.newPlot("plot", plotData, layout);
    }

    init();

});

// console.log("Hello");

// let samples = Object.values(bellyButtonData);
// console.log(samples);

// let entries = Object.keys(bellyButtonData);
// console.log(entries);

// function.init() {
//     let data = [{
//         x: 
//     }]
// }