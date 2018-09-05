$(function() {
    $("#output").click(function() {
        var output = "";
        var spaceFull = "　";
        var spaceHalf = " ";
        var tblObj = document.getElementById("myTBL");
        var rowCnt = tblObj.rows.length; // 行数

        for (var i = 1; i < rowCnt; i++) {

            // if (doInputCheck($("#sellerCode_" + i).val(), "通販業者コード")) { $("#message").css('display', 'none') } else { return }; // 通販業者コード空ではない判定
            // if (doInputCheck($("#seller_" + i).val(), "通販業者名称")) { $("#message").css('display', 'none') } else { return }; // 通販業者名称空ではない判定
            // if (doInputCheck($("#postOfficeCode_" + i).val(), "コンビニコード")) { $("#message").css('display', 'none') } else { return }; // コンビニコード空ではない判定
            // if (doInputCheck($("#dcCode_" + i).val(), "DCコード")) { $("#message").css('display', 'none') } else { return }; // DCコード空ではない判定
            // if (doInputCheck($("#dcName_" + i).val(), "DC名称")) { $("#message").css('display', 'none') } else { return }; // DC名称空ではない判定
            // if (doInputCheck($("#postOfficeBranchCode_" + i).val(), "コンビニ店舗コード")) { $("#message").css('display', 'none') } else { return }; // コンビニ店舗コード空ではない判定
            // if (doInputCheck($("#postOfficeBranchName_" + i).val(), "コンビニ店舗名称")) { $("#message").css('display', 'none') } else { return }; // コンビニ店舗名称空ではない判定
            if (doInputCheck($("#pickupStartDate_" + i).val(), "受取可能日")) { $("#message").css('display', 'none') } else { return }; // 受取可能日空ではない判定
            if (doInputCheck($("#pickupAvailableTime_" + i).val(), "受取可能時間")) { $("#message").css('display', 'none') } else { return }; // 受取可能時間空ではない判定
            // if (doInputCheck($("#trackingNumber_" + i).val(), "送り状番号")) { $("#message").css('display', 'none') } else { return }; // 送り状番号空ではない判定
            if (doInputCheck($("#orderNumber_" + i).val(), "注文番号")) { $("#message").css('display', 'none') } else { return }; // 注文番号空ではない判定
            // if (doInputCheck($("#buyer_" + i).val(), "注文主名称")) { $("#message").css('display', 'none') } else { return }; // 注文主名称空ではない判定
            // if (doInputCheck($("#shipDate_" + i).val(), "発送年月日")) { $("#message").css('display', 'none') } else { return }; // 発送年月日空ではない判定


            var deliveryStatus = $("#deliveryStatus_" + i).val(); // データ種別 長さ固定1ﾊﾞｲﾄ
            var sellerCode = $("#sellerCode_" + i).val(); // 通販業者コード 長さ固定6ﾊﾞｲﾄ
            var seller = paddingright($("#seller_" + i).val(), spaceFull, 40) // 通販業者名称 長さ80ﾊﾞｲﾄ
            var postOfficeCode = $("#postOfficeCode_" + i).val(); // コンビニコード 長さ固定4ﾊﾞｲﾄ
            var dcCode = paddingright($("#dcCode_" + i).val(), spaceHalf, 10); // DCコード 長さ10ﾊﾞｲﾄ
            var dcName = paddingright($("#dcName_" + i).val(), spaceFull, 25); // DC名称 長さ50ﾊﾞｲﾄ
            var postOfficeBranchCode = paddingright($("#postOfficeBranchCode_" + i).val(), spaceHalf, 10); // コンビニ店舗コード 長さ10ﾊﾞｲﾄ
            var postOfficeBranchName = paddingright($("#postOfficeBranchName_" + i).val(), spaceFull, 25); // コンビニ店舗名称 長さ50ﾊﾞｲﾄ
            var pickupStartDateVal = $("#pickupStartDate_" + i).val(); // 受取可能日 長さ固定8ﾊﾞｲﾄ
            var formatType = "yyyyMMdd";
            var dateFormat = new DateFormat(formatType);
            var pickupStartDate = dateFormat.format(new Date(pickupStartDateVal));
            var ordDate = $("#ordDate_" + i).val(); // 注文日

            if (parseInt(pickupStartDate) < parseInt(ordDate)) {
                $("#message").css('display', 'block');
                $("#errMsg").text('＊受取可能日不正です。(受取可能日は注文日より遅くはずです。注文日が' + ordDate + ')');
                $("#errMsg").css('color', '#ff0000');
                return;
            } else {
                $("#message").css('display', 'none');
            }
            var endDateVal = new Date(pickupStartDateVal);
            endDateVal.setDate(endDateVal.getDate() + 7);


            var pickupAvailableTimeVal = $("#pickupAvailableTime_" + i).val(); // 受取可能時間 長さ固定6ﾊﾞｲﾄ
            var dateTime = new Date();
            var s = dateTime.getSeconds();
            var times = pickupAvailableTimeVal.replace(":", "");
            var ss = ('0' + s).slice(-2);
            var pickupAvailableTime = times + ss;

            var pickupEndDate = dateFormat.format(new Date(endDateVal));; // 受渡期限日 長さ固定8ﾊﾞｲﾄ
            var trackingNumber = $("#trackingNumber_" + i).val(); // 送り状番号 長さ固定12ﾊﾞｲﾄ
            var orderNumber = paddingright($("#orderNumber_" + i).val(), spaceHalf, 30); // 注文番号 長さ30ﾊﾞｲﾄ
            var buyer = paddingright($("#buyer_" + i).val(), spaceFull, 20); // 注文主名称 長さ40ﾊﾞｲﾄ
            var shipDate = $("#shipDate_" + i).val(); // 発送年月日 長さ固定8ﾊﾞｲﾄ
            var fileCreatedDate = getOutPutDateTime(); // 送信日時 長さ固定12ﾊﾞｲﾄ
            var dropshipFlag = $("#dropshipFlag_" + i).val(); // 納品方法フラグ 長さ固定1ﾊﾞｲﾄ

            var content = deliveryStatus + sellerCode + seller + postOfficeCode + dcCode + dcName + postOfficeBranchCode + postOfficeBranchName +
                pickupStartDate + pickupAvailableTime + pickupEndDate + trackingNumber + orderNumber + buyer + shipDate + fileCreatedDate + dropshipFlag;
            output = output + content + "\r\n";
        }
        $("#File").text(output);
        $("#fileName").text("H070041Rt" + fileCreatedDate + getDateTime() + "0000" + ".dat");
        $("#doDownload").attr('disabled', false);
    });

    $("#doDownload").click(function() {
        createFile();
        // $("#fileName").text("H070041Rt" + $("#fileCreatedDate_1").val() + getDateTime() + "0000" + ".dat");
    });
});

function addRow(tablName) { // 行追加
    var tblObj = document.getElementById(tablName); // tblObj 対象のテーブル
    var rowCnt = tblObj.rows.length; // テーブルの行数
    var colCnt = tblObj.rows[0].cells.length; // 行内セルの数 
    var row = tblObj.insertRow(rowCnt); // 行の末尾に,新規行を追加
    makeCtrl(row, rowCnt);

}

function delRow(tablName) { // 行削除 
    var tblObj = document.getElementById(tablName);
    var rowCnt = tblObj.rows.length; // 行数
    if (rowCnt == 2) { alert("これ以上削除できません。"); return; }
    tblObj.deleteRow(-1); // 末尾行を削除
}

function makeCtrl(row, index) {
    try {
        // テキストボックス作成(データ種別)
        var deliveryStatus = document.createElement("select"); /*  selectタグを作成して…  */
        deliveryStatus.id = "deliveryStatus_" + index;
        deliveryStatus.add(new Option("受取可能", "1"));
        deliveryStatus.add(new Option("催促", "2"));
        deliveryStatus.style.width = '85px';
        deliveryStatus.style.height = '21px';
        deliveryStatus.onchange = function() {
            doSelect("#deliveryStatus_" + index, "#dropshipFlag_" + index);
        }
        var cell_0 = row.insertCell(0);
        cell_0.style.paddingBottom = '3px';
        cell_0.appendChild(deliveryStatus); /*  formに追加する  */

        // テキストボックス作成(通販業者コード)
        var sellerCode = document.createElement("input");
        sellerCode.id = "sellerCode_" + index;
        sellerCode.type = "text";
        sellerCode.value = "510002";
        sellerCode.disabled = "disabled";
        var cell_1 = row.insertCell(1);
        cell_1.appendChild(sellerCode); /*  formに追加する  */
        cell_1.classList.add("showClass");

        // テキストボックス作成(通販業者名称)
        var seller = document.createElement("input");
        seller.id = "seller_" + index;
        seller.type = "text";
        seller.value = "楽天ブックス";
        seller.disabled = "disabled";
        var cell_2 = row.insertCell(2);
        cell_2.appendChild(seller); /*  formに追加する  */
        cell_2.classList.add("showClass");

        // テキストボックス作成(コンビニコード)
        var postOfficeCode = document.createElement("input");
        postOfficeCode.id = "postOfficeCode_" + index;
        postOfficeCode.type = "text";
        postOfficeCode.disabled = "disabled";
        var cell_3 = row.insertCell(3);
        cell_3.appendChild(postOfficeCode); /*  formに追加する  */
        cell_3.classList.add("showClass");

        // テキストボックス作成(DCコード)
        var dcCode = document.createElement("input");
        dcCode.id = "dcCode_" + index;
        dcCode.type = "text";
        var cell_4 = row.insertCell(4);
        cell_4.appendChild(dcCode); /*  formに追加する  */
        cell_4.classList.add("showClass");

        // テキストボックス作成(DC名称)
        var dcName = document.createElement("input");
        dcName.id = "dcName_" + index;
        dcName.type = "text";
        var cell_5 = row.insertCell(5);
        cell_5.appendChild(dcName); /*  formに追加する  */
        cell_5.classList.add("showClass");

        // テキストボックス作成(コンビニ店舗コード)
        var postOfficeBranchCode = document.createElement("input");
        postOfficeBranchCode.id = "postOfficeBranchCode_" + index;
        postOfficeBranchCode.type = "text";
        postOfficeBranchCode.disabled = "disabled";
        var cell_6 = row.insertCell(6);
        cell_6.appendChild(postOfficeBranchCode); /*  formに追加する  */
        cell_6.classList.add("showClass");

        // テキストボックス作成(コンビニ店舗名称)
        var postOfficeBranchName = document.createElement("input");
        postOfficeBranchName.id = "postOfficeBranchName_" + index;
        postOfficeBranchName.type = "text";
        postOfficeBranchName.disabled = "disabled";
        var cell_7 = row.insertCell(7);
        cell_7.appendChild(postOfficeBranchName); /*  formに追加する  */
        cell_7.classList.add("showClass");

        // テキストボックス作成(受取可能日)
        var pickupStartDate = document.createElement("input");
        pickupStartDate.id = "pickupStartDate_" + index;
        pickupStartDate.type = "date";
        var cell_8 = row.insertCell(8);
        cell_8.appendChild(pickupStartDate); /*  formに追加する  */
        cell_8.classList.add("dateWidth");

        // テキストボックス作成(受取可能時間)
        var pickupAvailableTime = document.createElement("input");
        pickupAvailableTime.id = "pickupAvailableTime_" + index;
        pickupAvailableTime.type = "time";
        var cell_9 = row.insertCell(9);
        cell_9.appendChild(pickupAvailableTime); /*  formに追加する  */


        // テキストボックス作成(受渡期限日)
        var pickupEndDate = document.createElement("input");
        pickupEndDate.id = "pickupEndDate_" + index;
        pickupEndDate.type = "text";
        var cell_10 = row.insertCell(10);
        cell_10.appendChild(pickupEndDate); /*  formに追加する  */
        cell_10.classList.add("showClass");

        // テキストボックス作成(送り状番号)
        var trackingNumber = document.createElement("input");
        trackingNumber.id = "trackingNumber_" + index;
        trackingNumber.type = "text";
        trackingNumber.disabled = "disabled";
        var cell_11 = row.insertCell(11);
        cell_11.appendChild(trackingNumber); /*  formに追加する  */

        // テキストボックス作成(注文番号)
        var orderNumber = document.createElement("input");
        orderNumber.id = "orderNumber_" + index;
        orderNumber.type = "text";
        var cell_12 = row.insertCell(12);
        cell_12.appendChild(orderNumber); /*  formに追加する  */
        cell_12.classList.add("orderWidth");

        // テキストボックス作成(注文主名称)
        var buyer = document.createElement("input");
        buyer.id = "buyer_" + index;
        buyer.type = "text";
        buyer.disabled = "disabled";
        var cell_13 = row.insertCell(13);
        cell_13.appendChild(buyer); /*  formに追加する  */
        cell_13.classList.add("showClass");

        // テキストボックス作成(発送年月日)
        var shipDate = document.createElement("input");
        shipDate.id = "shipDate_" + index;
        shipDate.type = "text";
        var cell_14 = row.insertCell(14);
        cell_14.appendChild(shipDate); /*  formに追加する  */
        cell_14.classList.add("showClass");

        // テキストボックス作成(送信日時)
        var fileCreatedDate = document.createElement("input");
        fileCreatedDate.id = "fileCreatedDate_" + index;
        fileCreatedDate.type = "text";
        fileCreatedDate.style.width = '100px';
        var cell_15 = row.insertCell(15);
        cell_15.appendChild(fileCreatedDate); /*  formに追加する  */
        cell_15.classList.add("showClass");

        // テキストボックス作成(納品方法フラグ)
        var dropshipFlag = document.createElement("select"); /*  selectタグを作成して…  */
        dropshipFlag.id = "dropshipFlag_" + index;
        dropshipFlag.add(new Option("ＣＤＣ経由", "0"));
        dropshipFlag.add(new Option("店舗直納", "1"));
        deliveryStatus.style.width = '90px';
        deliveryStatus.style.height = '21px';
        var cell_16 = row.insertCell(16);
        cell_16.style.paddingBottom = '3px';
        cell_16.appendChild(dropshipFlag); /*  formに追加する  */

        // 検索ボタンを追加
        var searchBtn = document.createElement("button");
        var btnName = document.createTextNode("search");
        searchBtn.id = "search" + index;
        searchBtn.appendChild(btnName);
        searchBtn.style.height = '22px';
        searchBtn.onclick = function() {
            doSearch(index);
        };
        var cell_17 = row.insertCell(17);
        cell_17.appendChild(searchBtn);

        // テキストボックス作成(注文日)
        var ordDate = document.createElement("input");
        ordDate.id = "ordDate_" + index;
        ordDate.type = "text";
        ordDate.style.width = '50px';
        var cell_18 = row.insertCell(18);
        cell_18.appendChild(ordDate); /*  formに追加する  */
        cell_18.classList.add("showClass");


    } catch (e) {
        alert(e); // バグの内容をダイアログで表示する
    } finally {
        //alert( "完了" );  // バグの内容をダイアログで表示する
    }
}

/*
   文字列の右側に
   指定の文字,指定長さを埋めます
 */
function paddingright(val, char, n) {
    for (; val.length < n; val += char);
    return val;
}
/*
   「""」 の場false
   「null」 の場false
 */
function isNotEmpty(str) { // 項目空でない処理
    if (str != null && str.length > 0) {
        console.log("not null");
        return true;
    }
    return false;
}

function doInputCheck(str, Contents) { // 入力必須項目判定
    if (!isNotEmpty(str)) {
        $("#message").css('display', 'block');
        $("#errMsg").text('＊' + Contents + 'は必須項目です。');
        $("#errMsg").css('color', '#ff0000');
        return　 false;
    }
    return true;
}

function dataCheck(str) { // データ整合性チェック
    if (!isNotEmpty(str)) {
        $("#message").css('display', 'block');
        $("#errMsg").text('＊該当注文番号データ不正です。');
        $("#errMsg").css('color', '#ff0000');
        return　 false;
    }
    return true;
}

function doSelect(varId, varObj) { //  ドロップダウンボックスのステータス設定処理
    var status = $(varId).val();
    if (status == "2") {
        $(varObj).val(" ");
        $(varObj).prepend("<option value=' '>空</option>");
        $(varObj).attr('disabled', 'disabled');
    } else {
        $(varObj).val("0");
        $(varObj + " option[value=' ']").remove();
        $(varObj).attr('disabled', false);

    }
}

function getDateTime() { // 日付時間取得
    var dateTime;
    var now = new Date();
    var s = now.getSeconds();
    var miss = now.getMilliseconds();
    var ss = ('0' + s).slice(-2);
    var ms = ('0' + miss).slice(-3);
    dateTime = ss + ms;
    return dateTime;
}

function getOutPutDateTime() { // 日付時間取得
    var dateTime;
    var now = new Date();
    var y = now.getFullYear();
    var m = now.getMonth() + 1;
    var d = now.getDate();
    var h = now.getHours();
    // var mi = now.getMinutes();
    var s = now.getSeconds();
    var mm = ('0' + m).slice(-2);
    var dd = ('0' + d).slice(-2);
    var hh = ('0' + h).slice(-2);
    // var mmi = ('0' + mi).slice(-2);
    var ss = ('0' + s).slice(-2);
    dateTime = y + mm + dd + hh + ss;
    return dateTime;
}

function createFile() { //　ファイル作成
    // body... 
    var content = $("#File").text();
    var filename = $("#fileName").text();
    var codes = Encoding.stringToCode(content);
    var sjisArray = Encoding.convert(codes, { to: 'SJIS' });
    var type = 'text/csv;charset=Shift-JIS';
    var blob = new Blob([new Uint8Array(sjisArray)], { type: type });
    if (window.navigator.msSaveBlob) {
        window.navigator.msSaveOrOpenBlob(blob, filename);
        return false;
    }

    var fr = new FileReader();
    fr.onload = function(e) {
        var src = e.target.result;
        src = new Uint8Array(src);
        src = String.fromCharCode.apply("", src);
        src = btoa(src);
        src = "data:" + type + ";base64," + src;
        var a = $('<a download="' + filename + '">').attr("href", src).text("");
        a.appendTo($('body')).first().get(0).click();
        a.remove();
    }

    fr.readAsArrayBuffer(blob);
}

function doSearch(index) {
    // $("#orderNumber_" + index).val("001" + index);
    var textData = null;
    var orderNumName = "orderNum";
    var orderNumVal = $("#orderNumber_" + index).val();
    doClear(index);
    if (doInputCheck(orderNumVal, "注文番号")) {
        $("#message").css('display', 'none')
    } else { return }; // 注文番号空ではない判定
    // 郵便局jsonデータを取得
    $.post("http://localhost:8088/post?" + orderNumName + "=" + orderNumVal, function(data) {
        // データが有無判定
        if (data == "" || data == null) {
            alert("該当注文番号データが存在しない。");
            return;
        }

        // データ整合性チェック
        if (dataCheck(data.postOfficeCode)) { $("#message").css('display', 'none') } else { return }; // コンビニコード空ではない判定
        if (dataCheck(data.postOfficeBranchCode)) { $("#message").css('display', 'none') } else { return }; // コンビニ店舗コード空ではない判定
        if (dataCheck(data.postOfficeBranchName)) { $("#message").css('display', 'none') } else { return }; // コンビニ店舗名称空ではない判定
        if (dataCheck(data.trackingNumber)) { $("#message").css('display', 'none') } else { return }; // 送り状番号空ではない判定
        if (dataCheck(data.buyer)) { $("#message").css('display', 'none') } else { return }; // 注文主名称空ではない判定
        if (dataCheck(data.shipDate)) { $("#message").css('display', 'none') } else { return }; // 発送年月日空ではない判定
        if (dataCheck(data.ordDate)) { $("#message").css('display', 'none') } else { return }; // 注文日
        // タグ値を設定
        $("#postOfficeCode_" + index).val(data.postOfficeCode); // コンビニコード
        $("#dcCode_" + index).val("999999"); // DCコード
        $("#dcName_" + index).val("ＪＰ"); // DC名称
        $("#postOfficeBranchCode_" + index).val(data.postOfficeBranchCode); // コンビニ店舗コード
        $("#postOfficeBranchName_" + index).val(data.postOfficeBranchName); // コンビニ店舗名称
        $("#trackingNumber_" + index).val(data.trackingNumber); // 送り状番号
        $("#buyer_" + index).val(data.buyer); // 注文主名称
        $("#shipDate_" + index).val(data.shipDate); // 発送年月日
        $("#ordDate_" + index).val(data.ordDate); // 注文日

    }).fail(function() {
        alert("Failed to load resource: net::ERR_CONNECTION_REFUSED");
    });

}

function doClear(index) {
    // タグ値をクリア
    $("#postOfficeCode_" + index).val(null); // コンビニコード
    $("#postOfficeBranchCode_" + index).val(null); // コンビニ店舗コード
    $("#postOfficeBranchName_" + index).val(null); // コンビニ店舗名称
    $("#trackingNumber_" + index).val(null); // 送り状番号
    $("#buyer_" + index).val(null); // 注文主名称
    $("#shipDate_" + index).val(null); // 発送年月日
    $("#ordDate_" + index).val(null); // 注文日
}