var salesData;
var todayDate = new Date();
var heatMapStartDate = new Date(2019, 12, 1);
var heatMapEndDate = new Date(2020, 12, 31);

var salesByDay= {
        start: heatMapStartDate,
        end: heatMapEndDate
}

$.ajax({
    url: "/file/pullSalesData",
    method: 'GET',
    async:false,
    success: function(data){
        salesData = data;
    }
});

window.onload = function() {
    getSalesSeperatedByDay();
    
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
        colors: ['#e1daf2', '#c9b9f0', '#9c7bed', '#6a34ed', '#250478'],
    });
}

function createSalesRatio() {
    // Sales to Ratio Graph
    let chart = new frappe.Chart( "#chart", { // or DOM element
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
        tooltipOptions: {
            formatTooltipX: d => (d + '').toUpperCase(),
            formatTooltipY: d => d + ' sold',
        },
    });
}

function createProfitLoss() {
    // dummy chart for right module
    let right = new frappe.Chart( "#right", { // or DOM element
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
    let regression = new frappe.Chart( "#regression", { // or DOM element
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