var modal = document.getElementById("addModal");
var salesModal = document.getElementById("salesModal");

var btn = document.getElementById("openAdd");
var span = document.getElementsByClassName("close")[0];
var closeAddButtons = document.getElementById("cancelAdd");
var moreTagsButton = document.getElementById("more-tags-button");
var salesBtn = document.getElementById("openSales");
var closeSales = document.getElementById("closeSalesModal");
var cancelSaleButton = document.getElementById("cancelSale");

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
