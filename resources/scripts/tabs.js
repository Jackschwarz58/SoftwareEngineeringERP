var editModal = document.getElementById("editModal");
var addModal = document.getElementById("addModal");
var removeItemButton = document.getElementById("remove-item-edit");
var rowClicked = "";
var rowClickedIndex ;
var invNames;
var table;

var setFilterButton = document.getElementById("search-filter-button");
var clearFilterButton = document.getElementById("clear-filter-button");

function pullInvNameData() {
    $.ajax({
        url: "/file/pullInvDataNames",
        method: 'GET',
        async:false,
        success: function(data){
            invNames = data;
            console.log("Successfully pulled item names" + data);
            autocomplete(document.getElementById("add-name-field"), invNames);
        },
        error: function (err) {
           console.log(err);
      },
    });
}

window.onload = function() {
    createTable();
    table.setData("/file/pullData");
    pullInvNameData();
}

function createTable() {
    table = new Tabulator("#table", {
        layout: "fitColumns", 
        placeholder: "N/A",
        rowClick:function(e, row){
            rowClicked = row.getData();
            rowClickedIndex = row.getIndex();
            console.log("(" + rowClickedIndex + ") \"" + rowClicked["name"] + "\"");


            editModal.style.display = "block";   

            console.log("Call Edit Modal: " + rowClicked["ex"]);

            document.getElementById("editNameInput").value = rowClicked["name"];
            document.getElementById("editQuanInput").value = rowClicked["quan"];
            document.getElementById("editPriceInput").value = rowClicked["ex"];   
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
}

function addNew() {
    var nameField = document.getElementById("add-name-field").value;    
    var quanField = document.getElementById("add-quan-field").value;
    var priceField = document.getElementById("add-price-field").value;
    var descField = document.getElementById("add-desc-field").value;
    var tagsField = "";

    if(nameField == "" || quanField == ""){
        console.log("A Field is Missing!");
        var fieldsMissing ="";

        if(nameField =="")
            fieldsMissing += "    -Name\n"
        if(quanField =="")
            fieldsMissing += "    -Quantity\n"

        alert("Invalid Form: Missing one or more required fields:\n" + fieldsMissing);

        return;
    }

    var tagNum = document.querySelectorAll('.add-tags-field').length;
    var i;
    for(i = 0; i < tagNum; i++) {
        tagsField += document.getElementsByClassName("add-tags-field")[i].value;
        if((i+1) != tagNum) {
            tagsField += ",";
        }
    }

    var newEntry = {id:table.getRows().length + 1, 
                    name: nameField, 
                    quan: quanField, 
                    desc: descField, 
                    tags: tagsField, 
                    ex: priceField};

    console.log("New Entry Confirmed, exiting add modal: " + newEntry);

    table.addData(newEntry);

    document.getElementById("add-name-field").value = "";    
    document.getElementById("add-quan-field").value = "";
    document.getElementById("add-price-field").value = "";
    document.getElementById("add-desc-field").value = "";
    var i;
    for(i = 0; i < tagNum; i++) {
        document.getElementsByClassName("add-tags-field")[i].value = "";
    }

    sendData(JSON.stringify(table.getData()));

    addModal.style.display = "none";
}


function applyEdit() {
    console.log("Edit saving... Applying edit to " + rowClicked["name"]);

    var nameField = document.getElementById("editNameInput").value;
    var quanField = document.getElementById("editQuanInput").value;
    var priceField = document.getElementById("editPriceInput").value;
    var descField = document.getElementById("editDescInput").value;
    var tagsField = document.getElementById("editTagsInput").value;

    if(nameField == "" || quanField == ""){
        console.log("A Field is Missing!");
        var fieldsMissing ="";

        if(nameField =="")
            fieldsMissing += "    -Name\n"
        if(quanField =="")
            fieldsMissing += "    -Quantity\n"

        alert("Invalid Form: Missing one or more required fields:\n" + fieldsMissing);
        return;
    }

    rowClicked["name"] = nameField;
    rowClicked["quan"] = quanField;
    rowClicked["ex"] = priceField;
    rowClicked["desc"] = descField;
    rowClicked["tags"] = tagsField;

    console.log("Modify confirmed, exiting edit modal");

    table.updateData([{id: rowClicked["id"], 
                       name:nameField, 
                       quan:quanField, 
                       desc:descField, 
                       tags:tagsField,
                       ex:priceField}]);

    document.getElementById("editNameInput").value = "";    
    document.getElementById("editQuanInput").value = "";
    document.getElementById("editPriceInput").value = "";
    document.getElementById("editDescInput").value = "";

    sendData(JSON.stringify(table.getData()));

    editModal.style.display = "none";

}


setFilterButton.onclick = function() {
    var searchTxt = document.getElementById("filter-field").value;
    var categorySelection = document.getElementById("table-field-list").value;
    var typeSelection = document.getElementById("type-field-list").value;

    table.setFilter(categorySelection, typeSelection, searchTxt);
}

clearFilterButton.onclick = function() {
    document.getElementById("filter-field").value ="";

    table.clearFilter();
}

function removeItem() {
    if(confirm("Are you sure you want to delete this item?\n\nThis cannot be undone")) {
        table.deleteRow(rowClickedIndex);
        sendData(JSON.stringify(table.getData()));
        editModal.style.display = "none";
    }
    else {
        //Nothing
    }
}