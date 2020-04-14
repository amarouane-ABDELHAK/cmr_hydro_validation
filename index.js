const Tabulator = require("tabulator-tables")
const axios = require('axios');
const cors = "https://cors-anywhere.herokuapp.com"

axios.all([
  axios.get(`https://cmr.earthdata.nasa.gov/search/collections.json?provider=ghrc_cloud&page_size=1000&include_granule_counts=true`),
  axios.get(`${cors}/https://ghrc.nsstc.nasa.gov/hydro/es_proxy.php?esurl=_sql?sql=SELECT%20ds_short_name%20from%20ghrc_inv%20group%20by%20ds_short_name%20limit%201000`, {
    headers: {
        'Access-Control-Allow-Origin': '*'
      }
  })
]).then(axios.spread((cmr_data, hydro_data) => {
  console.log(cmr_data);
  console.log(hydro_data);
})).catch(error => {
  console.log(error);
});
const $ = require("jquery")
const get_cmr_data = (provider) => {
    return {}
}

const get_hydro_data = () => {

}

const init_tabular = () => {
    var tabledata = [
        {id:1, name:"Oli Bob", progress:12, gender:"male", rating:1, col:"red", dob:"19/02/1984", car:1, lucky_no:5, activity:[1, 20, 5, 3, 10, 13, 17, 15, 9, 11, 10, 12, 14, 16, 13, 9, 7, 11, 10, 13]},
        {id:2, name:"Mary May", progress:1, gender:"female", rating:2, col:"blue", dob:"14/05/1982", car:true, lucky_no:10, activity:[10, 12, 14, 16, 13, 9, 7, 11, 10, 13, 1, 2, 5, 4, 1, 16, 4, 2, 1, 3]},
        {id:3, name:"Christine Lobowski", progress:42, gender:"female", rating:0, col:"green", dob:"22/05/1982", car:"true", lucky_no:12, activity:[1, 2, 5, 4, 1, 16, 4, 2, 1, 3, 3, 7, 9, 1, 4, 8, 2, 6, 4, 2]},
        {id:4, name:"Brendon Philips", progress:100, gender:"male", rating:1, col:"orange", dob:"01/08/1980", lucky_no:18, activity:[3, 7, 9, 1, 4, 8, 2, 6, 4, 2, 1, 3, 1, 3, 3, 1, 1, 3, 1, 3]},
        {id:5, name:"Margret Marmajuke", progress:16, gender:"female", rating:5, col:"yellow", dob:"31/01/1999", lucky_no:33, activity:[1, 3, 1, 3, 3, 1, 1, 3, 1, 3, 20, 17, 15, 11, 16, 9, 12, 14, 20, 12]},
        {id:6, name:"Frank Harbours", progress:38, gender:"male", rating:4, col:"red", dob:"12/05/1966", car:1, lucky_no:2, activity:[20, 17, 15, 11, 16, 9, 12, 14, 20, 12, 11, 7, 6, 12, 14, 13, 11, 10, 9, 6]},
        {id:7, name:"Jamie Newhart", progress:23, gender:"male", rating:3, col:"green", dob:"14/05/1985", car:true, lucky_no:63, activity:[11, 7, 6, 12, 14, 13, 11, 10, 9, 6, 4, 17, 11, 12, 0, 5, 12, 14, 18, 11]},
        {id:8, name:"Gemma Jane", progress:60, gender:"female", rating:0, col:"red", dob:"22/05/1982", car:"true", lucky_no:72, activity:[4, 17, 11, 12, 0, 5, 12, 14, 18, 11, 11, 15, 19, 20, 17, 16, 16, 5, 3, 2]},
        {id:9, name:"Emily Sykes", progress:42, gender:"female", rating:1, col:"maroon", dob:"11/11/1970", lucky_no:44, activity:[11, 15, 19, 20, 17, 16, 16, 5, 3, 2, 1, 2, 3, 4, 5, 4, 2, 5, 9, 8]},
        {id:10, name:"James Newman", progress:73, gender:"male", rating:5, col:"red", dob:"22/03/1998", lucky_no:9, activity:[1, 20, 5, 3, 10, 13, 17, 15, 9, 11, 1, 2, 3, 4, 5, 4, 2, 5, 9, 8]},
        {id:11, name:"Martin Barryman", progress:20, gender:"male", rating:5, col:"violet", dob:"04/04/2001", activity:[1, 2, 3, 4, 5, 4, 11, 7, 6, 12, 14, 13, 11, 10, 9, 6, 2, 5, 9, 8]},
        {id:12, name:"Jenny Green", progress:56, gender:"female", rating:4, col:"indigo", dob:"12/11/1998", car:true, activity:[11, 15, 19, 20, 17, 15, 11, 16, 9, 12, 14, 20, 12, 20, 17, 16, 16, 5, 3, 2]},
        {id:13, name:"Alan Francis", progress:90, gender:"male", rating:3, col:"blue", dob:"07/08/1972", car:true, activity:[4, 17, 11, 7, 6, 12, 14, 13, 11, 10, 9, 6, 11, 12, 0, 5, 12, 14, 18, 11]},
        {id:14, name:"John Phillips", progress:80, gender:"male", rating:1, col:"green", dob:"24/09/1950", car:true, activity:[11, 7, 6, 12, 14, 1, 20, 5, 3, 10, 13, 17, 15, 9, 1, 13, 11, 10, 9, 6]},
        {id:15, name:"Ed White", progress:70, gender:"male", rating:0, col:"yellow", dob:"19/06/1976", activity:[20, 17, 15, 11, 16, 9, 4, 17, 11, 12, 0, 5, 12, 14, 18, 11, 12, 14, 20, 12]},
        {id:16, name:"Paul Branderson", progress:60, gender:"male", rating:5, col:"orange", dob:"01/01/1982", activity:[1, 3, 1, 3, 3, 1, 11, 15, 19, 20, 17, 16, 16, 5, 3, 2, 1, 3, 1, 3]},
        {id:18, name:"Emma Netwon", progress:40, gender:"female", rating:4, col:"brown", dob:"07/10/1963", car:true, activity:[3, 7, 9, 1, 4, 8, 3, 7, 9, 1, 4, 8, 2, 6, 4, 2, 2, 6, 4, 2]},
        {id:19, name:"Hannah Farnsworth", progress:30, gender:"female", rating:1, col:"pink", dob:"11/02/1991", activity:[1, 2, 5, 4, 1, 16, 10, 12, 14, 16, 13, 9, 7, 11, 10, 13, 4, 2, 1, 3]},
        {id:20, name:"Victoria Bath", progress:20, gender:"female", rating:2, col:"purple", dob:"22/03/1986", activity:[10, 12, 14, 16, 13, 9, 7, 1, 2, 3, 4, 5, 4, 2, 5, 9, 8, 11, 10, 13]},
        ];
    var table = new Tabulator("#validation-table", {
        data:tabledata,           //load row data from array
        layout:"fitColumns",      //fit columns to width of table
        responsiveLayout:"hide",  //hide columns that dont fit on the table
        tooltips:true,            //show tool tips on cells
        addRowPos:"top",          //when adding a new row, add it to the top of the table
        history:true,             //allow undo and redo actions on the table
        pagination:"local",       //paginate the data
        paginationSize:7,         //allow 7 rows per page of data
        movableColumns:true,      //allow column order to be changed
        resizableRows:true,       //allow row order to be changed
        initialSort:[             //set the initial sort order of the data
            {column:"name", dir:"asc"},
        ],
        columns:[                 //define the table columns
            {title:"Name", field:"name", editor:"input"},
            {title:"Task Progress", field:"progress", hozAlign:"left", formatter:"progress", editor:true},
            {title:"Gender", field:"gender", width:95, editor:"select", editorParams:{values:["male", "female"]}},
            {title:"Rating", field:"rating", formatter:"star", hozAlign:"center", width:100, editor:true},
            {title:"Color", field:"col", width:130, editor:"input"},
            {title:"Date Of Birth", field:"dob", width:130, sorter:"date", hozAlign:"center"},
            {title:"Driver", field:"car", width:90,  hozAlign:"center", formatter:"tickCross", sorter:"boolean", editor:true},
        ],
    });
    $("#tabulator-controls input[name=name]").on("keyup", function(){
    	table.setFilter( "name", "like", $(this).val())
    });
}

window.init_tabular = init_tabular()