var salesData;
var todayDate = new Date();

$.ajax({
    url: "/file/pullSalesData",
    method: 'GET',
    async:false,
    success: function(data){
        salesData = data;
    }
});

window.onload = function() {
    createMonthlySales();
    createProfitLoss();
    createSalesRatio();
    createForecastDemand();
};


function createMonthlySales(){
    var startDate = new Date(todayDate.getFullYear() - 1, 12, 1);
    var endDate = new Date(todayDate.getFullYear(), 12, 31);
    var hmap = new frappe.Chart("#heat-map", {
        data:{
            dataPoints: {
                "1587620791": 2000, //These are Time-Stamps followed by data values
                "1463673055": 113,
                "1476892421": 57,
            },
            start: startDate, // a JS date object
            end: endDate,
        },
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