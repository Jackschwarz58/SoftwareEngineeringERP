var downloadButton = document.getElementById("download-button");
var downloadSalesButton = document.getElementById("download-button-sales");

if(downloadButton != undefined){
    downloadButton.onclick = function() {
        var currentTime = new Date();
        var dd = String(currentTime.getDate()).padStart(2, '0');
        var mm = String(currentTime.getMonth() + 1).padStart(2, '0');
        var yyyy = currentTime.getFullYear();
        console.log("Downloading CSV");
        table.download("csv", "inventory-data_" + mm + dd + yyyy + ".csv");
    }
}
if(downloadSalesButton != undefined){
    downloadSalesButton.onclick = function() {
        var currentTime = new Date();
        var dd = String(currentTime.getDate()).padStart(2, '0');
        var mm = String(currentTime.getMonth() + 1).padStart(2, '0');
        var yyyy = currentTime.getFullYear();
        console.log("Downloading CSV");
        table.download("csv", "sales-data_" + mm + dd + yyyy + ".csv");
    }
}