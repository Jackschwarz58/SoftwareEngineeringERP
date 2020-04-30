var salesTable;
var salesData;
var invDataNames;

window.onload = function() {
    createSalesTable();

    pullSalesData();
    setAutocomplete("sale-name-field");
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

function addNewSale() {
    var itemName = document.getElementById("sale-name-field").value;
    var amtSold = document.getElementById("sale-quan-field").value;
    var priceSold = document.getElementById("sale-price-field").value;
    var now = new Date().getTime();

    if(itemName == "" || amtSold == "" || priceSold == ""){
        console.log("A Field is Missing!");
        var fieldsMissing ="";

        if(itemName =="")
            fieldsMissing += "    -Item Name\n"
        if(amtSold =="")
            fieldsMissing += "    -Amount Sold\n"
        if(priceSold =="")
            fieldsMissing += "    -Price\n"

        alert("Invalid Form: Missing one or more required fields:\n" + fieldsMissing);

        return;
    }

    var newSale = {name: itemName,sold:amtSold, money:priceSold, dateReported: now};
    sendSalesData(newSale);
    
    document.getElementById("sale-name-field").value = "";
    document.getElementById("sale-quan-field").value = "";
    document.getElementById("sale-price-field").value = "";

    salesModal.style.display = "none";
}