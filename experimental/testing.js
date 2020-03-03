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


var chart = new frappe.Chart("#top-selling-pie-chart", { //Need to replace with SQL data once imported
    data:{
        labels: ["Yellow Shirt (L)","Red Hoodie (M)", "Green Shirt (S)", "Red Hoodie (L)"],
    datasets: [
        {
            name: "Yellow Shirt (L)", type: "Bar",
            values: [769]
        },
        {
            name: "Green Shirt (L)", type: "Bar",
            values: [945]
        }
    ]
    },
    type: 'bar', //'bar', 'line', 'scatter', 'pie', 'percentage'
    height: 250,
    /*colors: ['#92d4f9', '#367599', '#bffff4', '#ff7863', '#cc8587']*/
    colors: ['purple', 'red']
});
