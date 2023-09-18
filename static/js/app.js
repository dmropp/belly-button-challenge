const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// const dataPromise = d3.json(url);
// console.log("Data Promise", dataPromise);

d3.json(url).then(function(data) {
    
    console.log(data);

    // let patients = Object.values(data.samples);
    // console.log(patients);

    // let labels = Object.keys(data.samples[0]);
    // console.log(labels);

    // let patient = Object.values(data.samples[0]);
    // console.log(patient);

    // let sampleValues = Object.values(data.samples[0].sample_values);
    // console.log(sampleValues);

    function init() {
        
        // For loop to create array of otu labels for the chart as the values are stored as INTs and not strings in the original array

        let sampleOTUIDs = Object.values(data.samples[0].otu_ids).slice(0, 10).reverse();

        let sampleOTUIDArray = [];
        
        for (let i = 0; i < sampleOTUIDs.length; i++) { // Can I make this a function for looping through the first 10 items in the array?

            otu = `OSU ${sampleOTUIDs[i]}`;
            sampleOTUIDArray.push(otu);

        }

        let sampleOTULabels = Object.values(data.samples[0].otu_labels).slice(0, 10).reverse();
        let sampleOTUNames = [];

        for (let j = 0; j < sampleOTULabels.length; j++) {

            otuLabel = sampleOTULabels[j];
            console.log(otuLabel);
            sampleOTULabels.push(otuLabel);
        }

        let plotData = [{
            x: Object.values(data.samples[0].sample_values.slice(0, 10)).reverse(),
            // y: Object.values(data.samples[0].otu_ids).slice(0, 10),
            y: sampleOTUIDArray,
            type: "bar",
            orientation: "h"
        }];

        let layout = {
            // tickmode: "linear",

            // https://plotly.com/python/tick-formatting/, referenced for tick formatting
            tickvals: Object.values(data.samples[0].otu_ids.slice(0, 10)),
            // hovertext: sampleOTULabels, // https://plotly.com/python/reference/scatter/#scatter-hovertext, referenced for how to format hovertext
            height: 600,
            width: 400
        }

        Plotly.newPlot("plot", plotData, layout);
    }

    init();

});