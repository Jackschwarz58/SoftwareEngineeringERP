var salesTable;
var salesData;

window.onload = function() {
    createSalesTable();
    
    pullSalesData();
}

function createSalesTable() {
    salesTable = new Tabulator("#sales-table-container", {
        layout: "fitColumns",
        placeholder: "No Data Received :(",
        rowClick: function(e, row) {console.log("Row Name: \"" + row.getData().name + "\" Clicked!");},
        columns: [
            {title: "Name", field:"name"},
            {title: "Amt Sold", field:"sold", bottomCalc:"sum"},
            {title: "Price", field:"money", bottomCalc:"sum", formatter:"money", formatterParams: {symbol:"$"}},
            {title: "Sale Date", field:"dateReported"},
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