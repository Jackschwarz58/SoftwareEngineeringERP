var table;
var salesData;
var invDataNames;
var setFilterButton = document.getElementById("search-filter-button");
var clearFilterButton = document.getElementById("clear-filter-button");

window.onload = function() {
    createSalesTable();

    pullSalesData();
    setAutocomplete("sale-name-field");
    setTotalItemsSold();
    setTotalEarnings();
    setBestWorstSellingItem();
}

function createSalesTable() {
    table = new Tabulator("#sales-table-container", {
        layout: "fitColumns",
        placeholder: ":( No Data Received (Refresh)",
        rowClick: function(e, row) {console.log("Row Name: \"" + row.getData().name + "\" Clicked!");},
        columns: [
            {title: "Name", field:"name", width:250},
            {title: "Units Sold", field:"sold", width:100},
            {title: "Price", field:"money", formatter:"money", formatterParams: {symbol:"$"}},
            {title: "Date Reported", field:"dateReported", formatter:function(cell, formatterParams, onRendered) {
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
    table.setData(salesData);
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
    location.reload();
}

function setTotalItemsSold() {
    var sum = salesData.reduce(function(previousValue, currentValue) {
        return {
            sold: parseInt(previousValue.sold) + parseInt(currentValue.sold)
        }
    });
    document.getElementById("total-items-sold").innerHTML += "<br> <div class=\"data-text\">" + sum.sold +"</span>";
}

function setTotalEarnings() {
    var sum = salesData.reduce(function(previousValue, currentValue) {
        return {
            money: parseFloat(previousValue.money) + parseFloat(currentValue.money)
        }
    });
    document.getElementById("total-items-money").innerHTML += "<br> <div class=\"data-text\">" + currencyFormat(parseFloat(sum.money)) +"</span>";
}

function setBestWorstSellingItem() {
    var items = {};
    for(var i = 0; i < salesData.length; ++i) {
        //console.log(parseInt(salesData[i].sold));
        if(!(salesData[i].name in items))
            items[salesData[i].name] = parseInt(salesData[i].sold);
        else
            items[salesData[i].name] += parseInt(salesData[i].sold);
    }
    var best = Object.keys(items).reduce(function(a, b){ return items[a] > items[b] ? a : b });
    document.getElementById("total-items-best-sell").innerHTML += "<br> <div class=\"data-text\">" + best +"</span>";
    
    var worst = Object.keys(items).reduce(function(a, b){ return items[a] < items[b] ? a : b });
    document.getElementById("total-items-worst-sell").innerHTML += "<br> <div class=\"data-text\">" + worst +"</span>";
}

function currencyFormat(num) {
    return '$' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

setFilterButton.onclick = function() {
    var searchTxt = document.getElementById("filter-field").value;
    var categorySelection = document.getElementById("table-field-list").value;
    var typeSelection = document.getElementById("type-field-list").value;        
    
    table.setFilter(categorySelection, typeSelection, searchTxt);
}

clearFilterButton.onclick = function() {
    document.getElementById("filter-field").value ="";

    table.clearFilter();
}