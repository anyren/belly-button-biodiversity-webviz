
// data retreival
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

d3.json(url).then(function(data) {
    let samples = (data['samples']);
    let metadata = (data['metadata']);
    console.log(samples);
    console.log(metadata);
    topTenOTU(samples);
    bubble(samples);
    gauge(metadata);
});

// load initial bar graph

// watch for change to dropdown
//d3.selectAll("#selInd").on("change", updatePlotly)

//update plot
function topTenOTU(sampleData) {

    // dropdown event handling
    // let dropdownMenu = d3.select("#selInd");
    // let dataset = dropdownMenu.property("value");

    // for(let i=0; i < sampleData.length; i++){
    //     let otu = sampleData[i]['otu_ids'];
    //     let sampleVol = sampleData[i]['sample_values'];
    // };
    let i = 0;
    let subject = sampleData[i];
    let otuTen = subject['otu_ids'].slice(0,10).map((item)=> 'OTU_'+ item.toString()).reverse();
    let sampleVolTen = subject['sample_values'].slice(0,10).reverse();
    let labelTen = subject['otu_labels'].slice(0,10).reverse();

    let trace1 = {
        x:sampleVolTen,
        y:otuTen,
        type: "bar",
        orientation: "h",
        text: labelTen
    };

    let data = [trace1];
    let layout = {
        title: "Belly Buttons"
    };
    
    Plotly.newPlot("top-ten", data, layout);
    
    // let ordered
    // // Initialize x and y arrays
    // let x = [];
    // let y = [];

    // if (dataset === 'dataset1') {
    //     x = sampleData[0]['sample_values'];
    //     y = sampleData[0]['otu_ids'];

    // }

    // else if (dataset === 'dataset2') {
    //     x = [10, 20, 30, 40, 50];
    //     y = [1, 10, 100, 100, 10];
    // }

    // // Note the extra brackets around 'x' and 'y'
    // Plotly.restyle("bar-graph", "x", [x]);
    // Plotly.restyle("bar-graph", "y", [y]);
};

function bubble(sampleData){
    let i = 0;
    let subject = sampleData[i];
    let otu = subject['otu_ids'];
    let sampleVal = subject['sample_values'];
    let labels = subject['otu_labels'];

    var trace1 = {
        x: otu,
        y: sampleVal,
        mode: 'markers',
        marker: {
          color:sampleVal,
          colorscale: 'Bluered',
          size: sampleVal
        }
      };
      
      var data = [trace1];
      
      var layout = {
        title: 'Sample Size of OTUs',
        showlegend: false,
      };
      
      Plotly.newPlot('bubble', data, layout);
 
};
function gauge(sampleData){
    let i = 0;
    let subject = sampleData[i];
    let washFrequency = subject['wfreq'];
      
    var data = [
    {
        domain: { 
            x: [0, 1], 
            y: [0, 1] 
        },
        value: washFrequency,
        title: { text: "Wash Frequency" },
        type: "indicator",
        mode: "gauge+number",
        gauge: {
            bar: { color: "darkblue" },
            axis: { range: [null, 10] },
            // steps: [
            //   { range: [0, 2], color: "lightyellow" },
            //   { range: [1, 3], color: "yellow" },
            //   { range: [2, 4], color: "yellowgreen" },
            //   { range: [3, 5], color: "lightgreen" },
            //   { range: [4, 6], color: "green" },
            //   { range: [5, 7], color: "bluegreen" },
            //   { range: [6, 8], color: "lightblue" },
            //   { range: [7, 9], color: "blue" },
            //   { range: [8, 10], color: "darkblue" },
            //   { range: [9, 11], color: "black" },
            // ],
            steps: [
                { range: [0, 2]},
                { range: [1, 3]},
                { range: [2, 4]},
                { range: [3, 5]},
                { range: [4, 6]},
                { range: [5, 7]},
                { range: [6, 8]},
                { range: [7, 9]},
                { range: [8, 10]},
                { range: [9, 11]},
              ],
            // threshold: {
            //   line: { color: "red", width: 4 },
            //   thickness: 0.75,
            //   value: 490
            // }
        }
    }
    ];
    
    var layout = { 
        margin: { t: 0, b: 0 } 
    };

    
      
      Plotly.newPlot('gauge', data, layout);
 
};
  
// init();