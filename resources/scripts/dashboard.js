var salesModal = document.getElementById("salesModal");

var salesData;
var salesWithinSevenWeeks = [];
var monthAbbr = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
var listOfPastSevenDates = [];
var dateTest = ["Jan 3rd","Jan 10th", "Jan 17th", "Jan 24th", "Jan 31st",
                "Feb 7th", "Feb 14th"];
var dateLabels =[];
var weekByWeekSales = {};
var oneWeek = 604800000;
var salesPerWeek = [];
var topSellingWeeklyInvLabels = [];
var topSellingWeeklyInvSales = [];


$.ajax({
    url: "/file/pullSalesData",
    method: 'GET',
    async:false,
    success: function(data){
        salesData = data;
    }
});

window.onload = function() {
    getWeeklySales();
    getChartLabels();
    getSalesPerWeekList();
    getQuanSoldWeeksChart();
    getTopSellingInventory();
    
    createWeeklySalesChart();
    createTopSellingChart();
};

function getWeeklySales() {
    var today = new Date().getTime();
    var sevenWeeks = oneWeek * 7;
    var withinSevenWeeks = today - sevenWeeks;
    console.log("Today: "  + today + ' Within 7 weeks: ' + withinSevenWeeks);

    for(var i = 0; i < salesData.length; ++i) {
        if(salesData[i].dateReported >= withinSevenWeeks){
            salesWithinSevenWeeks.push(salesData[i]);
        }
    }
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

    salesModal.style.display = "none";
}

function getChartLabels() {
    var prevSaturday = new Date();
    dateLabels.push((monthAbbr[prevSaturday.getMonth()] + " " + prevSaturday.getDate()));
    prevSaturday.setDate(prevSaturday.getDate() - (prevSaturday.getDay() + 1) % 7);

    for(var i = 0; i < 6; ++i) {
        dateLabels.push((monthAbbr[prevSaturday.getMonth()] + " " + prevSaturday.getDate()));
        listOfPastSevenDates += prevSaturday;
        prevSaturday.setDate(prevSaturday.getDate() - 7);

    }
    dateLabels.reverse();
}

function isDateWithinRange(toCheck, minVal, maxVal) {
    var currentDate = new Date(parseInt(toCheck));
    var minDate = new Date(minVal);
    var maxDate =  new Date(maxVal);

    if (currentDate > minDate && currentDate < maxDate){return 1;}
    else{return 0;}
}

function getSalesPerWeekList() {
    var now = new Date().getTime();

    var j = 1;
    for(var i = 6; i >= 0; --i) {
        weekByWeekSales[dateLabels[i]] = new Array();

        for(var k = 0; k < salesWithinSevenWeeks.length; ++k) {
            if(isDateWithinRange(salesWithinSevenWeeks[k].dateReported, now - (oneWeek * j), (now - (oneWeek * (j - 1))))) {
                weekByWeekSales[dateLabels[i]].push(salesWithinSevenWeeks[k]);
            }
        }
        j++;
    }
}

function getQuanSoldWeeksChart() {    
    for(var i = 0; i < 7; ++i) {
        var total = 0;
        for(var k = 0; k < weekByWeekSales[dateLabels[i]].length; ++k) {
            total += parseInt(weekByWeekSales[dateLabels[i]][k].sold);
        }
        salesPerWeek.push(total);
    }
}

function getTopSellingInventory() {
    var thisWeek = weekByWeekSales[dateLabels[dateLabels.length - 1]];


    thisWeek.sort(function(a, b) {
        return parseInt(b.money) - parseInt(a.money);
    });

    if(thisWeek.length >= 8)
        thisWeek = thisWeek.slice(0,8);
    else
        thisWeek = thisWeek.slice(0,thisWeek.length);

    for(var i = 0; i < thisWeek.length; ++i) {
        topSellingWeeklyInvLabels.push(thisWeek[i].name);
        topSellingWeeklyInvSales.push(parseInt(thisWeek[i].money));
    }
}

function createWeeklySalesChart() {
    var chart = new frappe.Chart("#line-graph", {
        data:{
            labels: dateLabels,
            datasets: [
                {
                    name: "Total Inventory", type: "Line",
                    values: salesPerWeek
                }
            ]
        },
        type: 'line',
        height: 250
    });
}

var myVar = setInterval(addDummyData, 5000);

function addDummyData() { //TODO: DELETE THIS 
    var x = document.getElementById('sold-items-table').insertRow(1);
    var y = x.insertCell(0);
    var z = x.insertCell(1);
    y.innerHTML= Math.floor(Math.random() * 100);
    z.innerHTML= generateDummyData();
}

function generateDummyData() { //Temporary Method to generate Table data for "Recent Sales"
    var titles = ["T-Shirt", "Hoodie", "Jacket", "Shirt"];
    var colors = ["Red", "Blue", "Purple", "Forrest Green", "Yellow", "Orange", "Pink"];
    var sizes = ["(S)", "(M)", "(L)", "(XS)", "(XL)"];

    var dataElement = colors[Math.floor(Math.random() * 7)]+ " " +titles[Math.floor(Math.random() * 4)] +  " " + sizes[Math.floor(Math.random() * 5)];
    return dataElement;
}

function createTopSellingChart() {
    var chart = new frappe.Chart("#bar-chart", { //Need to replace with SQL data once imported
        data:{
            labels: topSellingWeeklyInvLabels,
            datasets: [
                {
                    name: "Top Selling Inventory", type: "bar",
                    values: topSellingWeeklyInvSales
                }
            ]
        },
        type: 'bar', //'bar', 'line', 'scatter', 'pie', 'percentage'
        height: 200
    });
    
    var salesSum = topSellingWeeklyInvSales.reduce(function(a, b){
        return a + b;
    }, 0);
    
    document.getElementById("tot-sales-number").innerHTML = currencyFormat(salesSum);
}

function currencyFormat(num) {
  return '$' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}