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



    function init() {
        let plotData = [{
            x: Object.values(data.samples[0].sample_values.slice(0, 10)),
            y: Object.values(data.samples[0].otu_ids).slice(0, 10),
            type: "bar",
            orientation: "h"
        }];

        let layout = {
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