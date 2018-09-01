$(function() {
    alert("拡張機能CORSを追加");
    console.log('https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi?hl=en-US)');
    $("#search").click(function() {

        var orderNumName = "orderNum";
        var orderNumVal = $("#order_num").val();
        // jQuery ajax を使って JSON を受け取る

        /*$.get("http://localhost:8088/test/get?" + orderNumName + "=" + orderNumVal, function(data) {
            alert(data);
        });*/
        // 获取的值，放到入力框中
        $("#mytr").css("display", "block");
        // $("#order_val").val("ss");

        $.post("http://localhost:8080/test/post?" + orderNumName + "=" + orderNumVal, function(data) {
            /*optional stuff to do after success */
            // data Json Object
            $("#order_val").val(orderNumVal);
            $("#code").val(data.code);
            $("#codeName").val(data.codeName);
            // alert(textDate);
        });

    });

    $("#reset").click(function() {
        $("#mytr").css("display", "none");
        $("#order_num").val("");
    });

});