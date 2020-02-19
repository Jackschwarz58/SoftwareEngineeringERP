var editModal = document.getElementById("editModal");
var addModal = document.getElementById("addModal");
var downloadButton = document.getElementById("download-button");

//Dummy Table Data
var tableData = [
    {id:1, name:"Yellow Shirt (L)", quan:"1003", desc:"Yellow 100% Cotton Blend T-Shirt", tags:"Large, Shirt, Yellow", ex:"$29.99"},
    {id:2, name:"Yellow Shirt (M)", quan:"974", desc:"Yellow 100% Cotton Blend T-Shirt", tags:"Medium, Shirt, Yellow", ex:"$29.99"},
    {id:3, name:"Yellow Shirt (S)", quan:"1243", desc:"Yellow 100% Cotton Blend T-Shirt", tags:"Small, Shirt, Yellow", ex:"$29.99"},
    {id:4, name:"Blue Shirt (L)", quan:"1043", desc:"Blue 100% Cotton Blend T-Shirt", tags:"Large, Shirt, Blue", ex:"$29.99"},
    {id:5, name:"Blue Shirt (M)", quan:"873", desc:"Blue 100% Cotton Blend T-Shirt", tags:"Medium, Shirt, Blue", ex:"$29.99"},
    {id:6, name:"Blue Shirt (S)", quan:"1043", desc:"Blue 100% Cotton Blend T-Shirt", tags:"Small, Shirt, Blue", ex:"$29.99"},
    {id:7, name:"Green Shirt (L)", quan:"798", desc:"Green 100% Cotton Blend T-Shirt", tags:"Large, Shirt, Green", ex:"$29.99"},
    {id:8, name:"Green Shirt (M)", quan:"953", desc:"Green 100% Cotton Blend T-Shirt", tags:"Medium, Shirt, Green", ex:"$29.99"},
    {id:9, name:"Green Shirt (S)", quan:"264", desc:"Green 100% Cotton Blend T-Shirt", tags:"Small, Shirt, Green", ex:"$29.99"},
    {id:10, name:"Red Shirt (L)", quan:"245", desc:"Red 100% Cotton Blend T-Shirt", tags:"Large, Shirt, Red", ex:"$29.99"},
    {id:11, name:"Red Shirt (M)", quan:"362", desc:"Red 100% Cotton Blend T-Shirt", tags:"Medium, Shirt, Red", ex:"$29.99"},
    {id:12, name:"Red Shirt (S)", quan:"312", desc:"Red 100% Cotton Blend T-Shirt", tags:"Small, Shirt, Red", ex:"$29.99"},
    {id:13, name:"Black Jacket (L)", quan:"109", desc:"Nike Black Jacket; Front Zipper; Jordan Brand", tags:"Large,Black,Jacket,Jordan,Male,On Sale", ex:"$59.99"},
    {id:14, name:"Black Jacket (M)", quan:"89", desc:"Nike Black Jacket; Front Zipper; Jordan Brand", tags:"Medium,Black,Jacket,Jordan,Male,On Sale", ex:"$59.99"},
    {id:15, name:"Black Jacket (S)", quan:"152", desc:"Nike Black Jacket; Front Zipper; Jordan Brand", tags:"Small,Black,Jacket,Jordan,Male,On Sale", ex:"$59.99"},
    {id:16, name:"Navy Blue Jacket (L)", quan:"245", desc:"Nike Navy Blue Jacket; Front Zipper; Jordan Brand", tags:"Large,Navy,Jacket,Jordan,Male,On Sale", ex:"$59.99"},
    {id:17, name:"Navy Blue Jacket (M)", quan:"203", desc:"Nike Navy Blue Jacket; Front Zipper; Jordan Brand", tags:"Medium,Navy,Jacket,Jordan,Male,On Sale", ex:"$59.99"},
    {id:18, name:"Navy Blue Jacket (S)", quan:"213", desc:"Nike Navy Blue Jacket; Front Zipper; Jordan Brand", tags:"Small,Navy,Jacket,Jordan,Male,On Sale", ex:"$59.99"},
    {id:19, name:"Denim Jacket (L)", quan:"299", desc:"Nike Denim Jacket; Front Zipper", tags:"Large,Jacket,Denim,Male,On Sale", ex:"$79.99"},
    {id:20, name:"Denim Jacket (M)", quan:"273", desc:"Nike Denim Jacket; Front Zipper", tags:"Medium,Jacket,Denim,Male,On Sale", ex:"$79.99"},
    {id:21, name:"Denim Jacket (S)", quan:"278", desc:"Nike Black Jacket; Front Zipper", tags:"Small,Jacket,Denim,Male,On Sale", ex:"$79.99"},
    {id:22, name:"Forest Green Jacket (L)", quan:"312", desc:"Nike Forest Green Jacket; Front Zipper; Jordan Brand", tags:"Large,Jacket,Forest,Jordan,Male,On Sale", ex:"$59.99"},
    {id:23, name:"Forest Green Jacket (M)", quan:"287", desc:"Nike Forest Green Jacket; Front Zipper; Jordan Brand", tags:"Medium,Jacket,Forest,Jordan,Male,On Sale", ex:"$59.99"},
    {id:24, name:"Forrest Green Jacket (S)", quan:"303", desc:"Nike Forest Green Jacket; Front Zipper; Jordan Brand", tags:"Small,Jacket,Forest,Jordan,Male,On Sale", ex:"$59.99"}
];

var table = new Tabulator("#table", {
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
        {title:"Pricing (USD)",field:"ex", width:200},
    ],
});

function addNew() {
    var nameField = document.getElementById("add-name-field");
    var quanField = document.getElementById("add-quan-field");
    var descField = document.getElementById("add-desc-field");
    var tagsField = document.getElementById("add-tags-field");

    var newEntry = {id:tableData[tableData.length - 1]["id"] + 1, 
                    name: nameField.value, 
                    quan: quanField.value, 
                    desc: descField.value, 
                    tags: tagsField.value, 
                    ex:"Pricing Info"};

    console.log(newEntry);

    tableData.push(newEntry);
    table.addData(newEntry);

    clearModalFields(nameField, quanField, descField, tagsField);

    addModal.style.display = "none";
}

function clearModalFields(field1, field2, field3, field4) {
    field1.value = "";
    field2.value = "";
    field3.value = "";
    field4.value = "";
}
downloadButton.onclick = function() {
    console.log("Download Clicked");
    table.download("csv", "data.csv");
}