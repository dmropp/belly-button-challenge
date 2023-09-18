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
        
        // For loop to create array of otu labels for the chart as the values are stored as INTs and not strings in the original array

        let sampleOTU = Object.values(data.samples[0].otu_ids).slice(0, 10).reverse();

        let sampleOTUArray = [];
        
        for (let i = 0; i < sampleOTU.length; i++) {

            otu = `OSU ${sampleOTU[i]}`;
            sampleOTUArray.push(otu);

        }

        let plotData = [{
            x: Object.values(data.samples[0].sample_values.slice(0, 10)).reverse(),
            // y: Object.values(data.samples[0].otu_ids).slice(0, 10),
            y: sampleOTUArray,
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