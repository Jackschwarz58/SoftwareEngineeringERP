var salesTable;
var salesData;

window.onload = function() {
    createSalesTable();
    
    pullSalesData();
}

function createSalesTable() {
    salesTable = new Tabulator("#sales-table-container", {
        layout: "fitColumns",
        placeholder: ":( No Data Received (Refresh)",
        rowClick: function(e, row) {console.log("Row Name: \"" + row.getData().name + "\" Clicked!");},
        columns: [
            {title: "Name", field:"name", width:200},
            {title: "Units Sold", field:"sold", bottomCalc:"sum"},
            {title: "Price", field:"money", bottomCalc:"sum", formatter:"money", formatterParams: {symbol:"$"}, bottomCalcParams:{precision: "2"}},
            {title: "Sale Date", field:"dateReported", formatter:function(cell, formatterParams, onRendered) {
                return moment(parseInt(cell.getValue())).format("M/D/YY h:mm a");
            }},
        ],
    })
}

function pullSalesData() {
     $.ajax({
        url: "/file/pullSalesData",
        method: 'GET',
        async:false,
        success: function(data){
            salesData = data;
            console.log('Received Sales Data');
        }
    });
   salesTable.setData(salesData);
}