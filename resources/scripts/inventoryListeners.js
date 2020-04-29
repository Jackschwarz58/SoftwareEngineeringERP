var modal = document.getElementById("addModal");
var btn = document.getElementById("openAdd");
var span = document.getElementsByClassName("close")[0];
var closeAddButtons = document.getElementById("cancelAdd");


var editModal = document.getElementById("editModal");
var closeEdit = document.getElementsByClassName("close-edit")[0];
var closeEditButtons = document.getElementById("cancel-edit");

var moreTagsButton = document.getElementById("more-tags-button");
var moreTagsButtonEdit = document.getElementById("more-tags-button-edit");

closeEdit.onclick =function() {
    editModal.style.display = "none";
}

closeEditButtons.onclick =function() {
    editModal.style.display = "none";
    
    document.getElementById("editNameInput").value = "";    
    document.getElementById("editQuanInput").value = "";
    document.getElementById("editPriceInput").value = "";
    document.getElementById("editDescInput").value = "";
}

btn.onclick = function() {
    modal.style.display = "block";
}

span.onclick = function() {
    modal.style.display = "none";
}

closeAddButtons.onclick = function() {
    modal.style.display = "none";

    document.getElementById("add-name-field").value = "";    
    document.getElementById("add-quan-field").value = "";
    document.getElementById("add-price-field").value = "";
    document.getElementById("add-desc-field").value = "";
} 

moreTagsButton.onclick = function() {
    document.getElementById("tag-field-container").insertAdjacentHTML('beforeend',"<input placeholder=\"Tag\"class=\"input-field add-tags-field\" type=\"text\" name=\"tags\" size=\"10\">");
}

moreTagsButtonEdit.onclick = function() {
    document.getElementById("tag-field-container").insertAdjacentHTML('beforeend',"<input placeholder=\"Tag\"class=\"input-field \" id=\"editTagsInput\" type=\"text\" name=\"tags\" size=\"10\">");
}