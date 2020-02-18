var modal = document.getElementById("addModal");
var btn = document.getElementById("openAdd");
var span = document.getElementsByClassName("close")[0];
var closeButtons = document.getElementById("cancelAdd");

btn.onclick = function() {
  modal.style.display = "block";
}

span.onclick = function() {
  modal.style.display = "none";
}

closeButtons.onclick = function() {
  modal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
} 