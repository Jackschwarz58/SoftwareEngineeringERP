function sendData(jsonToSend) {
    $.ajax({
        url: "/file/sendData",
        dataType: 'json',
        type: 'post',
        contentType: 'application/json',
        data: jsonToSend,

        success: function(data){
            console.log("Inventiory Data from fileClient Sent"); //display data in cosole to see if I receive it CHANGE THIS
        }
    })
}

function sendSalesData(jsonToSend) {
    $.ajax({
        url: "/file/sendSalesData",
        type: 'post',
        data: jsonToSend,

        success: function(data){
            console.log("Sales Data from fileClient Sent"); //display data in cosole to see if I receive it CHANGE THIS
        }
    })
}
