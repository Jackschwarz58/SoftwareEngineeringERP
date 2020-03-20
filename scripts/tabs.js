var editModal = document.getElementById("editModal");
var addModal = document.getElementById("addModal");
var rowClicked = "";



//Dummy Table Data
var tableData = [];
 /*   {id:1, name:"Yellow Shirt (L)", quan:"1003", desc:"Yellow 100% Cotton Blend T-Shirt", tags:"Large, Shirt, Yellow", ex:"$29.99"},
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
    {id:24, name:"Forrest Green Jacket (S)", quan:"303", desc:"Nike Forest Green Jacket; Front Zipper; Jordan Brand", tags:"Small,Jacket,Forest,Jordan,Male,On Sale", ex:"$59.99"},
    {id:25, name:"Grey Hoodie (L)", quan:"121", desc:"Wool Grey Hoodie; Cold-Tech; New Pocket Deisgn", tags:"Large,Hoodie,Grey,Unisex,Cold-Tech", ex:"$89.99"},
    {id:26, name:"Grey Hoodie (M)", quan:"237", desc:"Wool Grey Hoodie; Cold-Tech; New Pocket Deisgn", tags:"Medium,Hoodie,Grey,Unisex,Cold-Tech", ex:"$89.99"},
    {id:27, name:"Grey Hoodie (S)", quan:"213", desc:"Wool Grey Hoodie; Cold-Tech; New Pocket Deisgn", tags:"Small,Hoodie,Grey,Unisex,Cold-Tech", ex:"$89.99"},
    {id:28, name:"Charcoal Hoodie (L)", quan:"97", desc:"Charcoal Grey Hoodie; Cold-Tech; New Pocket Deisgn", tags:"Large,Hoodie,Charcoal,Unisex,Cold-Tech", ex:"$89.99"},
    {id:29, name:"Charcoal Hoodie (M)", quan:"143", desc:"Charcoal Grey Hoodie; Cold-Tech; New Pocket Deisgn", tags:"Medium,Hoodie,Charcoal,Unisex,Cold-Tech", ex:"$89.99"},
    {id:30, name:"Charcoal Hoodie (S)", quan:"102", desc:"Charcoal Grey Hoodie; Cold-Tech; New Pocket Deisgn", tags:"Small,Hoodie,Charcoal,Unisex,Cold-Tech", ex:"$89.99"},
    {id:31, name:"Maroon Hoodie (L)", quan:"154", desc:"Maroon Hoodie; Cold-Tech; New Pocket Deisgn", tags:"Large,Hoodie,Maroon,Unisex,Cold-Tech", ex:"$89.99"},
    {id:32, name:"Maroon Hoodie (M)", quan:"123", desc:"Maroon Hoodie; Cold-Tech; New Pocket Deisgn", tags:"Medium,Hoodie,Maroon,Unisex,Cold-Tech", ex:"$89.99"},
    {id:33, name:"Maroon Hoodie (S)", quan:"131", desc:"Maroon Hoodie; Cold-Tech; New Pocket Deisgn", tags:"Small,Hoodie,Maroon,Unisex,Cold-Tech", ex:"$89.99"}
];*/


// At the start of the application get the information stored in the database
updateTableFromDB();

var table;
function createTable(inputData) {
	
    table = new Tabulator("#table", {
        data:inputData, layout: "fitColumns",  rowClick:function(e, row){
            rowClicked = row.getData();
            console.log(row.getData());

            editModal.style.display = "block";   

            console.log("Call Edit Modal: " + rowClicked["name"]);

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
			{title:"Sold",field:"sold", width:100},
			{title:"Total",field:"total", width:100},
            {title:"Date Added",field:"dateadd", width:200},
			{title:"Date Modified",field:"datemod", width:200},
            {title:"Tags",field:"tags",},
            
        ],
    });
}

function addNew() {
    var nameField = document.getElementById("add-name-field").value;
    var quanField = document.getElementById("add-quan-field").value;
    var descField = document.getElementById("add-desc-field").value;
    var tagsField = document.getElementById("add-tags-field").value;

    var newEntry = {name: nameField, 
                    quan: quanField, 
                    desc: descField, 
                    tags: tagsField,
					sold: 0,
					total: 0 
                    };

    console.log("New Entry Confirmed, exiting add modal: " + newEntry);
	
	updateDBEntry(newEntry);

    addToTable(newEntry);

    clearModalFields(nameField, quanField, descField, tagsField);

    addModal.style.display = "none";
	
	updateTableFromDB();
}

function addToTable(entry) {
    tableData.push(entry);
    table.addData(entry);
}

function applyEdit() {
    console.log("Edit saving... Applying edit to " + rowClicked["name"]);

    var nameField = document.getElementById("editNameInput").value;
    var quanField = document.getElementById("editQuanInput").value;
    var descField = document.getElementById("editDescInput").value;
    var tagsField = document.getElementById("editTagsInput").value;

    rowClicked["name"] = nameField;
    rowClicked["quan"] = quanField;
    rowClicked["desc"] = descField;
    rowClicked["tags"] = tagsField;
	
	var entry = {
					id: rowClicked["id"], 
                    name: nameField, 
                    quan: quanField, 
                    desc: descField, 
                    tags: tagsField,
					sold: 0,
					total: 0
				};

    console.log("Modify confirmed, exiting edit modal");

	updateDBEntry(entry);

    table.updateData([entry]);

    clearModalFields(nameField, quanField, descField, tagsField);

    editModal.style.display = "none";    
}

function updateTableFromDB() {
    tableData = [];
    var xmlhttp = new XMLHttpRequest();
    var url = "http://localhost/scripts/gettable.php";

    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
			var json = JSON.parse(this.responseText);
            createTable(json);
        }
    }
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

function updateDBEntry(entry) 
{
	let updateId = entry.id;
	let name = entry.name;
	let quan = entry.quan;
	let details = entry.desc;
	let sold = entry.sold;
	let tags = entry.tags;
	let total = entry.total;
	
	name = name.replace(/ /, "%20");
	details = details.replace(/ /, "%20");
	tags = tags.replace(/ /, "%20");
	
	console.log("Updating ID " + updateId + " named " + name);
	var xmlhttp = new XMLHttpRequest();
	
	if(updateId === undefined)
		updateId = 0;
	
    var url = "http://localhost/scripts/additem.php"
	url += "?id=" + updateId; 
	url += "&q=" + quan;
	url += "&n=" + name;
	url += "&d=" + details;
	url += "&s=" + sold;
	url += "&t=" + tags;
	url += "&tot=" + total;
	
	console.log(url);
	

    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
			console.log("Updated/Added item");
        }
    }
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

function clearModalFields(field1, field2, field3, field4) {
    field1.value = "";
    field2.value = "";
    field3.value = "";
    field4.value = "";
} 