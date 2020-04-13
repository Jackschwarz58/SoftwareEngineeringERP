var startDate = new Date(2019, 12, 1);
var endDate = new Date(2020, 12, 31);
var hmap = new frappe.Chart("#heat-map", {
    data:{
        dataPoints: {
            /*"1426744959": 20,
            "1463673055": 113,
            "1476892421": 57,*/
            // ...
        },
        start: startDate, // a JS date object
        end: endDate,
    },
    type: 'heatmap', //'bar', 'line', 'scatter', 'pie', 'percentage'
    colors: ['#e1daf2', '#c9b9f0', '#9c7bed', '#6a34ed', '#250478'],
});

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
  });

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