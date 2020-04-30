var salesModal = document.getElementById("sales-modal");
var salesBtn = document.getElementById("open-sales");
var closeSales = document.getElementById("close-sales-modal");
var cancelSaleButton = document.getElementById("cancel-sale");

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