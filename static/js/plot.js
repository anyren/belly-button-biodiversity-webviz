
// data retreival
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

let selectedID=0;
let samples;
let metadata;

d3.json(url).then(function(data) {
    let names = (data['names']);
    samples = (data['samples']);
    metadata = (data['metadata']);
    
    // populate dropdown options
    let select = document.getElementById("selInd");
    let options = names;
    for(let i = 0; i < options.length; i++) {
        let opt = options[i];
        let el = document.createElement("option");
        el.textContent = opt;
        el.value = i;
        select.add(el);
    };

    // initialize page
    loadPage(selectedID, samples, metadata);

});


// // watch for change to dropdown
d3.selectAll("#selInd").on("change", getID);

function getID(){
    //console.log("updating");
    //dropdown event handling
    var dropdownMenu = d3.select("#selInd");
    var selectedID = dropdownMenu.property("value");
    loadPage(selectedID, samples, metadata);
};

function loadPage(selectedID, samples, metadata){
    topTenOTU(selectedID, samples);
    bubble(selectedID, samples);
    gauge(selectedID, metadata);
    clearTable();
    demoTable(selectedID, metadata);
};

function clearTable(){
    let table = document.getElementById("demo");
    let rows = table.rows.length;
    // remove header row
    if(table.getElementsByTagName("thead")[0]){
        let thead = table.getElementsByTagName("thead")[0];
        table.removeChild(thead);
    };
    //remove table body
    if(table.getElementsByTagName("tbody")[0]){
        let tbody = table.getElementsByTagName("tbody")[0];
        table.removeChild(tbody);
    };
    };

function demoTable(selectedID, metadata){
    let table = document.getElementById("demo");
    md = metadata[selectedID];
    let keys = Object.keys(md);
    let values = Object.values(md);
    // add header 
    let header = table.createTHead();
    let headerRow = header.insertRow(0);    
    let headerCell = headerRow.insertCell(0);
    headerCell.innerHTML = "<b>Demographic Info</b>";

    // add table body
    let body = table.createTBody();
    for (i=0; i<values.length; i++){
        let row = body.insertRow(i);
        let text0 = keys[i];
        let text1 = values[i];
        let cell0 = row.insertCell(0);
        let cell1 = row.insertCell(1);
        let newText0 = document.createTextNode(text0);
        cell0.appendChild(newText0);
        let newText1 = document.createTextNode(text1);
        cell1.appendChild(newText1);
    }
    };


function topTenOTU(selectedID, sampleData) {
    let i = selectedID;
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
        title: "Top Ten Microbial OTU's of Subject",
        xaxis:{
            title: "OTU Count"
        }
    };
    
    Plotly.newPlot("top-ten", data, layout);
    
};

function bubble(selectedID, sampleData){
    let i = selectedID;
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
        title: 'Sample Size of All OTUs Present',
        showlegend: false,
        xaxis:{
            title: "OTU ID"
        },
      };
      
      Plotly.newPlot('bubble', data, layout);
 
};
function gauge(selectedID, sampleData){
    let i = selectedID;
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
            steps: [
              { range: [0, 2], color: "lightyellow" },
              { range: [1, 3], color: "yellow" },
              { range: [2, 4], color: "yellowgreen" },
              { range: [3, 5], color: "lightgreen" },
              { range: [4, 6], color: "green" },
              { range: [5, 7], color: "bluegreen" },
              { range: [6, 8], color: "lightblue" },
              { range: [7, 9], color: "blue" },
              { range: [8, 10], color: "darkblue" },
              { range: [9, 11], color: "black" },
            ],
            // steps: [
            //     { range: [0, 2]},
            //     { range: [1, 3]},
            //     { range: [2, 4]},
            //     { range: [3, 5]},
            //     { range: [4, 6]},
            //     { range: [5, 7]},
            //     { range: [6, 8]},
            //     { range: [7, 9]},
            //     { range: [8, 10]},
            //     { range: [9, 11]},
            //   ],
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