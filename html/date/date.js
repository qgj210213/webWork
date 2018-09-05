function dateEdite() {

    var dateStr = "2015-08-25";
    var dateFt = new Date(dateStr);
    var dateStr2 = "2015-08-28";
    var dateFt2 = new Date(dateStr2);
    // 日付値比較
    if (dateStr > dateStr2) {
        console.log('大きく日付' + dateFt)
    } else {
        console.log('大きく日付2' + dateFt2)
    }
    console.log(dateFt);
    dateFt.setDate(dateFt.getDate() + 7);
    console.log(dateFt);
    var DateYYmmdd = new Date();
    console.log('yyyymmdd  '+DateYYmmdd.getFullYear());
}
dateEdite();