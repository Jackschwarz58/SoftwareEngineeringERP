var salesModal = document.getElementById("salesModal");
var salesBtn = document.getElementById("openSales");
var closeSales = document.getElementById("closeSalesModal");
var cancelSaleButton = document.getElementById("cancelSale");

salesBtn.onclick = function() {
    salesModal.style.display = "block";
}

closeSales.onclick = function() {
    document.getElementById("sale-name-field").value = "";
    document.getElementById("sale-quan-field").value = "";
    document.getElementById("sale-price-field").value = "";
    
    salesModal.style.display = "none";
    location.reload();
} 

cancelSaleButton.onclick = function() {
    document.getElementById("sale-name-field").value = "";
    document.getElementById("sale-quan-field").value = "";
    document.getElementById("sale-price-field").value = "";
    
    salesModal.style.display = "none";
    location.reload();
} 