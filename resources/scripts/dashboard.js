var modal = document.getElementById("addModal");
var btn = document.getElementById("openAdd");
var span = document.getElementsByClassName("close")[0];
var closeAddButtons = document.getElementById("cancelAdd");
var moreTagsButton = document.getElementById("more-tags-button");
var moreTagsButtonEdit = document.getElementById("more-tags-button-edit");
var salesModal = document.getElementById("salesModal");
var salesBtn = document.getElementById("openSales");
var closeSales = document.getElementById("closeSalesModal");
var cancelSaleButton = document.getElementById("cancelSale");




var salesData;
var dates = [];
var minDate;
var maxDate;
var salesWithinSevenWeeks = [];

$.ajax({
    url: "/file/pullSalesData",
    method: 'GET',
    async:false,
    success: function(data){
        console.log(typeof data + " == " + data.length +"===="+ JSON.stringify(data));
        salesData = data;
    }
})


window.onload = function() {
    findDateRange();
    getWeeklySales();
};

function findDateRange() {
    for(var i = 0; i < salesData.length; ++i) {
        console.log(salesData[i].dateReported);
        dates.push(salesData[i].dateReported);
    }
    minDate = Math.min.apply(false,dates);
    maxDate = Math.max.apply(false,dates);
}

function getWeeklySales() {
    var today = new Date().getTime();
    var oneWeek = 604800;
    var sevenWeeks = oneWeek * 7;
    var withinSevenWeeks = today - sevenWeeks;
    console.log("Today: "  + today + ' Within 7 weeks: ' + withinSevenWeeks);
    
    for(var i = 0; i < salesData.length; ++i) {
        if(salesData[i].dateReported >= withinSevenWeeks){
            salesWithinSevenWeeks.push(salesData[i]);
        }
    }
    console.log("Sales Within: " + JSON.stringify(salesWithinSevenWeeks));
}

function addNewSale() {
    var itemName = document.getElementById("sale-name-field").value;
    var amtSold = document.getElementById("sale-quan-field").value;
    var priceSold = document.getElementById("sale-price-field").value;
    var now = new Date().getTime();
    
    var newSale = {name: itemName,sold:amtSold, money:priceSold, dateReported: now};
    sendSalesData(newSale);
}


var chart = new frappe.Chart("#line-graph", { //Need to replace with SQL data once imported
    data:{
        labels: ["Jan 3rd","Jan 10th", "Jan 17th", "Jan 24th", "Jan 31st",
                 "Feb 7th", "Feb 14th"],
        datasets: [
            {
                name: "Total Inventory", type: "Line",
                values: [945, 998, 769, 812, 834, 801, 883]
            }
        ]
    },
    type: 'line', //'bar', 'line', 'scatter', 'pie', 'percentage'
    height: 250
});


//----------------------------Temporary Methods to generate Table data for "Recent Sales"----------------------------
var myVar = setInterval(addDummyData, 5000);

function addDummyData() { 
    var x = document.getElementById('sold-items-table').insertRow(0);
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
//----------------------------Temporary Methods to generate Table data for "Recent Sales"----------------------------

var chart = new frappe.Chart("#bar-chart", { //Need to replace with SQL data once imported
    data:{
        labels: ["Yellow Shirt (L)","Black Shirt (M)", "Black Jacket (M)", "Maroon Shirt (S)", "Red Shirt (L)",
                 "Denim Jacket (M)", "Grey Hoodie (L)", "Black Jacket (S))"
                ],
        datasets: [
            {
                name: "Top Selling Inventory", type: "bar",
                values: [132, 110, 98, 94, 88, 80, 76, 71]
            }
        ]
    },
    type: 'bar', //'bar', 'line', 'scatter', 'pie', 'percentage'
    height: 200
});

btn.onclick = function() {
    modal.style.display = "block";
}

span.onclick = function() {
    modal.style.display = "none";
}

closeAddButtons.onclick = function() {
    modal.style.display = "none";
} 

salesBtn.onclick = function() {
    salesModal.style.display = "block";
}

closeSales.onclick = function() {
    salesModal.style.display = "none";
} 

cancelSaleButton.onclick = function() {
    salesModal.style.display = "none";
} 




moreTagsButton.onclick = function() {
    document.getElementById("tag-field-container").insertAdjacentHTML('beforeend',"<input placeholder=\"Tag\"class=\"input-field add-tags-field\" type=\"text\" name=\"tags\" size=\"10\">");
}
