var downloadButton = document.getElementById("download-button");

downloadButton.onclick = function() {
    var currentTime = new Date();
    var dd = String(currentTime.getDate()).padStart(2, '0');
    var mm = String(currentTime.getMonth() + 1).padStart(2, '0');
    var yyyy = currentTime.getFullYear();
    console.log("Download Clicked");
    table.download("csv", "inventory-data" + mm + dd + yyyy + ".csv");
}