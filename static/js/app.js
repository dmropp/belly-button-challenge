const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// const dataPromise = d3.json(url);
// console.log("Data Promise", dataPromise);

d3.json(url).then(function(data) {
    
    console.log(data);

    // // let patients = Object.values(data.samples);
    // // console.log(patients);

    // // let labels = Object.keys(data.samples[0]);
    // // console.log(labels);

    // // let patient = Object.values(data.samples[0]);
    // // console.log(patient);

    // // let sampleValues = Object.values(data.samples[0].sample_values);
    // // console.log(sampleValues);

    function init() {
        
        // For loop to create array of otu labels for the chart as the values are stored as INTs and not strings in the original array

        let sampleOTUIDs = Object.values(data.samples[0].otu_ids).slice(0, 10).reverse();

        let sampleOTUIDArray = [];
        
        for (let i = 0; i < sampleOTUIDs.length; i++) { // Can I make this a function for looping through the first 10 items in the array?

            otu = `OSU ${sampleOTUIDs[i]}`;
            console.log(otu);
            sampleOTUIDArray.push(otu);

        }

        // For loop to create array of OTU labels for chart hovertext
        
        let sampleOTULabels = Object.values(data.samples[0].otu_labels).slice(0, 10).reverse();
        // console.log(sampleOTULabels.length);
        let sampleOTUNames = [];

        for (let j = 0; j < sampleOTULabels.length; j++) {

            otuLabel = sampleOTULabels[j];
            console.log(otuLabel);
            sampleOTUNames.push(otuLabel);
        }

        // console.log(sampleOTUIDArray.length);
        // console.log(sampleOTUNames.length);

        let plotData = [{
            x: Object.values(data.samples[0].sample_values.slice(0, 10)).reverse(),
            // y: Object.values(data.samples[0].otu_ids).slice(0, 10),
            y: sampleOTUIDArray,
            text: sampleOTUNames, // https://plotly.com/javascript/hover-text-and-formatting/, referenced for how to format hovertext
            type: "bar",
            orientation: "h"
        }];

        let layout = {
            // tickmode: "linear",

            // https://plotly.com/javascript/tick-formatting/, referenced for tick formatting
            tickvals: Object.values(data.samples[0].otu_ids.slice(0, 10)),
            // hovertext: sampleOTULabels, 
            height: 600,
            width: 400
        }

        Plotly.newPlot("plot", plotData, layout);
    }

    
    //For loop to append options from the names dataset to the dropdown menu
    let dropdownRow = d3.selectAll("#selDataset");
    let subjectIDs = Object.values(data.names);

    for (let k = 0; k < subjectIDs.length; k++) {

            row = dropdownRow.append("option").text(`${subjectIDs[k]}`);
            // row = dropdownRow.append("option", value=subjectIDs[k]).text(`${subjectIDs[k]}`).attr(subjectIDs[k]);

    }
    
    d3.selectAll("#selDataset").on("change", getData);

    function getData() {

        let dropdownMenu = d3.select("#selDataset");

        let dataset = dropdownMenu.property("value");

        console.log(dataset);

        function selectValue(selectedID) {
            return selectedID.samples.id === 940;
        }

        // let currentData = Object.values(data.samples["940"]).slice(0, 10).reverse(); //can't figure out how to access specific value, do I need to remap the array or filter data? Map to new array and then filter?
        // map data to new array
        // create filtering function to get value == to selected value
        // call filtering function

        let currentData = Object.values(data.samples.id.filter)
        
        console.log(currentData);
    }


    // let row = dropdownRow.append("option").text("940");

    init();

});