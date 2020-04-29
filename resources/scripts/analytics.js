var salesData;
var inventoryData;

var itemSales = [];

var todayDate = new Date();
var heatMapStartDate = new Date(2019, 12, 1);
var heatMapEndDate = new Date(2020, 12, 31);

var salesByDay= {
    start: heatMapStartDate,
    end: heatMapEndDate
}

var salesInvRatio = {
    labels: new Array(),
    datasets: new Array()
}
function pullData() {
    $.ajax({
        url: "/file/pullSalesData",
        method: 'GET',
        async:false,
        success: function(data){
            salesData = data;
            console.log('Received Sales Data');
        }
    });


    $.ajax({
        url: "/file/pullData",
        method: 'GET',
        async:false,
        success: function(data){
            inventoryData = data;
            console.log('Received Inv Data');
        }
    });
}

window.onload = function() {
    pullData();

    getItemTotSales();
    getSalesSeperatedByDay();
    getSalesInvRatio();

    createMonthlySales();
    createProfitLoss();
    createSalesRatio();
    createForecastDemand();
};

function getSalesSeperatedByDay() {
    var datapointsArray = {};
    for(var i = 0; i < salesData.length; ++i) {
        if(isDateWithinRange(salesData[i].dateReported, heatMapStartDate, heatMapEndDate)) {
            datapointsArray[Math.floor(salesData[i].dateReported/1000)] =
                parseInt(salesData[i].sold);
        }
    }
    salesByDay.dataPoints = datapointsArray;
}

function getItemTotSales() {
    for(var i = 0; i < salesData.length; ++i) {
        var total = {
            name: currItemName,
            sales: new Array(),
            money: new Array()
        };
        var currItemName;
        var sold = 0;
        var money = 0;
        currItemName = salesData[i].name;
        for(var k = 0; k < salesData.length; ++k) {
            if(salesData[k].name == currItemName) {
                if(isDateWithinRange(salesData[k].dateReported, heatMapStartDate, heatMapEndDate)) {
                    money += parseInt(salesData[k].money);
                    sold += parseInt(salesData[k].sold);
                }
            }
        }
        total.name = currItemName;
        total.sales = sold;
        total.money = money;
        itemSales.push(total);
    }
}

function getSalesInvRatio() {
    var datasets = [];
    var inv ={
        name: "Inventory",
        chartType: 'bar',
        values: new Array()
    }
    var sales ={
        name: "Sales",
        chartType: 'line',
        values: new Array()
    }

    for(var i = 0; i < itemSales.length; ++i) {
        sales.values.push(itemSales[i].sales); 

        var invObj = search(itemSales[i].name, inventoryData);
        
        console.log("invObj: " + invObj);

        if(typeof invObj !== 'undefined') {
            console.log("Got Here");
            inv.values.push(invObj.quan);
            salesInvRatio.labels.push(invObj.name);
        }
    }
    salesInvRatio.datasets.push(inv);
    salesInvRatio.datasets.push(sales);


    console.log(salesInvRatio);
}

function isDateWithinRange(toCheck, minVal, maxVal) {
    var currentDate = new Date(parseInt(toCheck));
    var minDate = new Date(minVal);
    var maxDate =  new Date(maxVal);

    if (currentDate > minDate && currentDate < maxDate){return 1;}
    else{return 0;}
}

function createMonthlySales(){
    var hmap = new frappe.Chart("#heat-map", {
        data: salesByDay,
        type: 'heatmap',
        colors: ['#e1daf2', '#c9b9f0', '#9c7bed', '#6a34ed', '#250478']
    });
}

function search(nameKey, myArray){
    for (var i=0; i < myArray.length; i++) {
        if (myArray[i].name === nameKey) {
            return myArray[i];
        }
    }
}

function createSalesRatio() {
    // Sales to Ratio Graph
    var chart = new frappe.Chart( "#chart", { // or DOM element
        data: salesInvRatio,

        title: "Sales to Inventory Ratio",
        type: 'axis-mixed', // or 'bar', 'line', 'pie', 'percentage'
        colors: ['purple', '#ffa3ef', 'light-blue']
    });
}

function createProfitLoss() {
    // dummy chart for right module
    var right = new frappe.Chart( "#right", { // or DOM element
        data: {
            labels: ["YS", "BS", "GS", "RS",
                     "BlJ", "NJ", "DJ", "FJ", "GrH", "CH", "MH"],

            datasets: [
                {
                    name: "Inventory", chartType: 'bar',
                    values: [3220, 2959, 2015, 919, 
                             350, 661, 850, 902, 571, 399, 408]
                },
                {
                    name: "Sales", chartType: 'line',
                    values: [1390, 1239, 839, 234,
                             298, 378, 502, 436, 401, 249, 273]
                }
            ]
        },

        title: "Sales to Inventory Ratio",
        type: 'axis-mixed', // or 'bar', 'line', 'pie', 'percentage'
        colors: ['purple', '#ffa3ef', 'light-blue'],
    });
}

function createForecastDemand() {
    var regression = new frappe.Chart( "#regression", { // or DOM element
        data: {
            labels: ["YS", "BS", "GS", "RS",
                     "BlJ", "NJ", "DJ", "FJ", "GrH", "CH", "MH"],

            datasets: [
                {
                    name: "Inventory", chartType: 'scatter',
                    values: [3220, 2959, 2015, 919, 
                             350, 661, 850, 902, 571, 399, 408]
                },
                {
                    name: "Sales", chartType: 'line',
                    values: [1390, 1239, 839, 234,
                             298, 378, 502, 436, 401, 249, 273]
                }
            ]
        },

        title: "Sales to Inventory Ratio",
        type: 'axis-mixed', // or 'bar', 'line', 'pie', 'percentage'
        colors: ['purple', '#ffa3ef', 'light-blue'],
    });
}