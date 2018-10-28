function responseIsOK(response) {
    return response.status == 200 && response.data.code == 200;
}

function objValueIsEmpty(obj) {
    for (var key in obj) {
        if (typeof (obj[key]) == 'object') {
            return objValueIsEmpty(obj[key]);
        }
        if (typeof (obj[key]) == 'string') {
            if (isStringEmpty(obj[key])) {
                return key;
            }
        }
    }
    return "";
}

function isNull(obj) {
    if (typeof (obj) != 'number') {
        return obj == null;
    }
    return false;
}

function isUndefined(obj) {
    return typeof (obj) == "undefined";
}

function numberFormat(numObj, intBit) {
    var val = numObj;
    var str = "";
    var i = 0;
    if (val != "") {
        for (i = 0; i < intBit; i++)
            str = str + "0";
        val = str + val;
        val = val.substring(val.length - intBit, val.length);
    }
    return val;
}

String.prototype.endsWith = function (str) {
    var reg = new RegExp(str + "$");
    return reg.test(this);
}


function getCurrentDay() {
    var cdata = new Date();
    var DAYS = ["星期天", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
    return DAYS[cdata.getDay()];
}

function IsJsonString(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

//验证数据是否改动过
function validateIsDifferent(obj1, obj2) {
    if (obj1 == null || obj2 == null) {
        return true;
    }
    return JSON.stringify(obj1) != JSON.stringify(obj2);
}

function isInteger(obj) {
    return (obj | 0) === obj;
}

function isStringEmpty(data) {
    if (data == null || isUndefined(data))
        return true;
    if (typeof (data) == "number" && data == 0) {
        return true;
    }
    if (data.length == 0) {
        return true;
    }
    return false;
}

//验证Email是否正确
function regIsEmail(fData) {
    var reg = new RegExp("^([0-9A-Za-z\-_\.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$");
    return reg.test(fData);
}

//判断手机号是否正确
function isPoneAvailable(phone) {
    var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
    if (phone.length != 11 || !myreg.test(phone)) {
        return false;
    } else {
        return true;
    }
}

function getAudioType(fileName) {
    var voiceExt = fileName.substr(fileName.lastIndexOf(".")).toLowerCase();
    var audioType = "audio/mp3";
    switch (voiceExt) {
        case ".mp3": {
            audioType = "audio/mp3";
            break;
        }
        case ".wav": {
            audioType = "audio/wav";
            break;
        }
        case ".wma": {
            audioType = "audio/wma";
            break;
        }
        case ".mid":
        case ".midi": {
            audioType = "audio/mid";
            break;
        }
        case ".ogg": {
            audioType = "audio/ogg";
            break;
        }
        default:
            break;
    }
    return audioType;
}

function DateMinus(sDate) {
    let sdate = new Date(sDate);
    let now = new Date();
    let days = now.getTime() - sdate.getTime();
    let day = parseInt(days / (1000 * 60 * 60 * 24));
    return day;
}

Date.prototype.format = function (format) {
    var o = {
        "M+": this.getMonth() + 1, //month
        "d+": this.getDate(), //day
        "h+": this.getHours(), //hour
        "m+": this.getMinutes(), //minute
        "s+": this.getSeconds(), //second
        "q+": Math.floor((this.getMonth() + 3) / 3), //quarter
        "S": this.getMilliseconds() //millisecond
    }
    if (/(y+)/.test(format)) format = format.replace(RegExp.$1,
        (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(format))
            format = format.replace(RegExp.$1,
                RegExp.$1.length == 1 ? o[k] :
                    ("00" + o[k]).substr(("" + o[k]).length));
    return format;
}

function copyObject(item) {
    return Object.assign({}, item);
}

function copyObjectByJSON(obj) {
    return JSON.parse(JSON.stringify(obj));
}

//success/warning/info/error
function showMessage(obj, msg, msgType = 0) {

    var title = '提示'
    var dialogType = 'success'
    switch (msgType) {
        case 0:
            dialogType = 'error'
            break
        case 1:
            dialogType = 'success'
            break
        case 2:
            dialogType = 'warning'
            break
        case 3:
            dialogType = 'info'
            break
    }
    var dialog = obj.$notify({
        //title: title,
        showClose: true,
        message: msg,
        type: dialogType,
    });
}


//success/warning/info/error
function showMSG(obj, msg, msgType = 0) {

    var dialogType = 'success'
    switch (msgType) {
        case 0:
            dialogType = 'error'
            break
        case 1:
            dialogType = 'success'
            break
        case 2:
            dialogType = 'warning'
            break
        case 3:
            dialogType = 'info'
            break
    }
    var dialog = obj.$message({
        message: msg,
        type: dialogType,
    });
}


function downloadFile(document, url) {
    try {
        var elemIF = document.createElement("iframe");
        elemIF.src = url;
        elemIF.style.display = "none";
        document.body.appendChild(elemIF);
    } catch (e) {
        console.log(e);
        return e;
    }
    return true;
}

function isIE() {
    var agent = navigator.userAgent.toLowerCase();

    var regStr_ie = /msie [\d.]+;/gi;
    //IE
    if (agent.indexOf("msie") > 0) {
        return agent.match(regStr_ie);
    }
}

function requestFullScreen() {
    var doc = document.documentElement;
    var i = 0;
    if (doc.requestFullScreen) { //W3C
        doc.requestFullScreen();
    } else if (doc.webkitRequestFullScreen) { //Chrome
        doc.webkitRequestFullScreen();
        i = 1;
    } else if (doc.msRequestFullscreen) { //IE
        doc.msRequestFullscreen();
        i = 2;
    } else if (doc.mozRequestFullScreen) { //firefox
        doc.mozRequestFullScreen();
        i = 3;
    }
    console.log(i);
}


function exitFullScreen() {
    var el = document,
        cfs = el.cancelFullScreen || el.webkitCancelFullScreen || el.mozCancelFullScreen || el.exitFullScreen,
        wscript;

    if (typeof cfs != "undefined" && cfs) {
        cfs.call(el);
        return;
    }

    if (typeof window.ActiveXObject != "undefined") {
        wscript = new ActiveXObject("WScript.Shell");
        if (wscript != null) {
            wscript.SendKeys("{F11}");
        }
    }
}

function saveFile(imgUrl) {
    var oPop = window.open(imgUrl, "", "width=1, height=1, top=5000, left=5000");
    for (; oPop.document.readyState != "complete";) {
        if (oPop.document.readyState == "complete") break;
    }
    oPop.document.execCommand("SaveAs");
    oPop.close();
}

function getFileExtension(filename) {

    var ext = /\.[^\.]+$/.exec(filename);
    return ext;
    var index1 = filename.lastIndexOf(".");
    var index2 = filename.length;
    var extname = filename.substring(index1, index2); //后缀名
    return extname;
}

function compareDate(dStart, dEnd) {
    if (isUndefined(dStart) || isStringEmpty(dStart)) {
        return true;
    }
    if (isUndefined(dEnd) || isStringEmpty(dEnd)) {
        return false;
    }
    start_at = new Date(dStart.replace(/^(\d{4})(\d{2})(\d{2})$/, "$1/$2/$3"));
    end_at = new Date(dEnd.replace(/^(\d{4})(\d{2})(\d{2})$/, "$1/$2/$3"));
    return end_at > start_at;
}
