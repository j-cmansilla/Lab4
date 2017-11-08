function cipherData(){
    var textJSon = document.getElementById('textareaJSon');
    var text = textJSon.value;
    var textCipher = document.getElementById('textareaCifrado');
    //textCipher.value = textCipher.value+" "+text;
    
    $.ajax({
        url: "/cipher",
        method: 'POST',
        type: 'json',
        data: {"value": text},
        success: function(res){
            console.log(res);
            if(res.sucess){
                console.log('Token generado');
                textCipher.value = res.token;
            }
        }
    });


}