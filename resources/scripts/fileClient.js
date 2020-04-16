function sendData(jsonToSend) {
    $.ajax({
        url: "/file/sendData",
        dataType: 'json',
        type: 'post',
        contentType: 'application/json',
        data: jsonToSend,

        success: function(data){
            console.log("Data from fileClient Sent"); //display data in cosole to see if I receive it CHANGE THIS
        }
    })
}