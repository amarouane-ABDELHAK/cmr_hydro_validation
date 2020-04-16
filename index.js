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
  cmr_data_g = cmr_data['data']['feed']['entry']
  cmr_records = get_cmr_data(cmr_data_g);
  hydro_data_g = hydro_data['data']['aggregations']['ds_short_name']['buckets']
  hydro_records = get_hydro_data(hydro_data_g);
  let data = table_data(cmr_records, hydro_records);
  init_tabular(data)




})).catch(error => {
  console.log(error);
});
const $ = require("jquery")
const get_cmr_data = (data) => {
  cmr_record = {}
  data.forEach(element => {
    short_name = element['short_name']
    cmr_record[short_name] = {'cmr_count': element['granule_count']}
    
  });
    return cmr_record
}

const get_hydro_data = (data) => {
  hydro_record = {}
  data.forEach(element => {
    short_name = element['key']
    hydro_record[short_name] = {'hydro_count': element['doc_count']}
  });
  return hydro_record

}

const table_data = (cmr_data, hydro_data) => {

  //{'id': index+1, 'shortname':value, 'cmr':cmr_count, 'hydro':hydro_count, 'db': db_count, 'match':int(match)}
  cmr_list = Object.keys(cmr_data)
  hydro_list = Object.keys(hydro_data)
  //let intersection = cmr_list.filter(x => hydro_list.includes(x));
  //Using union 
  let union = [...new Set([...cmr_list, ...hydro_list])]
  let index = 0
  final_result = new Array
  union.forEach(element => {
    index += 1;
    cmr_count = cmr_data[element]['cmr_count'] || 0
    hydro_count = (hydro_data[element] && hydro_data[element]['hydro_count']) || 0
    final_result.push({'id': index, 'shortname':element, 'cmr': cmr_count,
     'hydro': hydro_count, 'match': cmr_count == hydro_count })
  
  });
  return final_result;
}

const init_tabular = (tabledata) => {
  var table = new Tabulator("#validation-table", {
  data:tabledata,           //load row data from array
  cellHozAlign:"center",
  cellVertAlign:"middle",
  layout:"fitColumns",      //fit columns to width of table
  responsiveLayout:"hide",  //hide columns that dont fit on the table
  tooltips:true,            //show tool tips on cells
  addRowPos:"top",          //when adding a new row, add it to the top of the table
  history:true,             //allow undo and redo actions on the table
  pagination:"local",       //paginate the data
  paginationSize:20,         //allow 7 rows per page of data
  movableColumns:true,      //allow column order to be changed
  resizableRows:true,       //allow row order to be changed
  initialSort:[             //set the initial sort order of the data
      {column:"Short name", dir:"asc"},
  ],
  columns:[                 //define the table columns
      {title:"Id", field:"id", hozAlign:"center"},
      {title:"Short name", field:"shortname", hozAlign:"center"},
      {title:"CMR Count", field:"cmr", hozAlign:"center"},
      {title:"Hydro Count", field:"hydro", hozAlign:"center"},
      {title:"Match", field:"match",  hozAlign:"center", formatter:"tickCross", sorter:"boolean"}
  ],
});
$("#tabulator-controls input[name=name]").on("keyup", function(){
table.setFilter( "shortname", "like", $(this).val())
});
}


