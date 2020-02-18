var editModal = document.getElementById("editModal");
var btn = document.getElementById("openAdd");
var span = document.getElementsByClassName("close-edit")[0];
var closeButtons = document.getElementById("cancel-edit");


var tableData = [
    {id:1, name:"Yellow Shirt (L)", quan:"1003", desc:"Yellow 100% Cotton Blend T-Shirt", tags:"Large, Shirt, Yellow", ex:"Any Extra Data Here"},
    {id:2, name:"Yellow Shirt (M)", quan:"974", desc:"Yellow 100% Cotton Blend T-Shirt", tags:"Medium, Shirt, Yellow", ex:"Any Extra Data Here"},
    {id:3, name:"Yellow Shirt (S)", quan:"1243", desc:"Yellow 100% Cotton Blend T-Shirt", tags:"Small, Shirt, Yellow", ex:"Any Extra Data Here"},
];

var table = new Tabulator("#example-table", {
    data:tableData, layout: "fitColumns",  rowClick:function(e, row){
        var rowClicked = row.getData();
        console.log(row.getData());
        
        editModal.style.display = "block";       
        console.log(rowClicked["name"]);
        document.getElementById("editNameInput").value = rowClicked["name"];
        document.getElementById("editQuanInput").value = rowClicked["quan"];
        document.getElementById("editDescInput").textContent = rowClicked["desc"];
        document.getElementById("editTagsInput").value = rowClicked["tags"];        
    },
    columns:[
        {title:"ID",field:"id", width:50, resizable:false},
        {title:"Name",field:"name", width: 150},
        {title:"Quantity", field:"quan", width:100},
        {title:"Description",field:"desc"},
        {title:"Tags",field:"tags", width:180},
        {title:"Example Field",field:"ex", width:200},
    ],
});

span.onclick = function() {
    console.log("Close Button Clicked")
    editModal.style.display = "none";
}

closeButtons.onclick = function() {
    console.log("Close Button Clicked")
    editModal.style.display = "none";
}

window.onclick = function(event) {
    console.log("Outside Button Clicked")
    if (event.target == editModal) {
        editModal.style.display = "none";
  }
} 