var modal = document.getElementById("addModal");
var btn = document.getElementById("openAdd");
var span = document.getElementsByClassName("close")[0];
var closeAddButtons = document.getElementById("cancelAdd");

var editModal = document.getElementById("editModal");
var closeEdit = document.getElementsByClassName("close-edit")[0];
var closeEditButtons = document.getElementById("cancel-edit");

closeEdit.onclick =function() {
    editModal.style.display = "none";
}

closeEditButtons.onclick =function() {
    editModal.style.display = "none";
}

btn.onclick = function() {
    modal.style.display = "block";
}

span.onclick = function() {
    modal.style.display = "none";
}

closeAddButtons.onclick = function() {
    modal.style.display = "none";
}