$.ajax({
        url: "/file/pullData",
        method: 'GET',
        success: function(data){
            console.log(typeof data); //display data in cosole to see if I receive it CHANGE THIS
    }
})