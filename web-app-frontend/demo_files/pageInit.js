JH.md.jsonH.language = document.documentElement.lang;


function startJsonH(sJson) {
    var oJH = JH.md.jsonH(sJson);
    JH.e('#enterValue').select();

    var sIni = document.head.getAttribute('data-jhini');
    var oJhIni = sIni && JSON.parse(sIni);
    console.log(oJhIni);
    if (oJhIni) {
        JH.e('#showValueInNav').checked = oJhIni.showValue;
        oJH.checkShowValueInNav(JH.e('#showValueInNav'));

        JH.e('#showIco').checked = oJhIni.showIco;
        oJH.checkShowIco(JH.e('#showIco'));

        JH.e('#icoAsFolder').checked = oJhIni.showStyle == 'folder';
        oJH.checkIcoAsFolderBtn(JH.e('#icoAsFolder'));
    }
    //showValueInNav
    //showIco
    //icoAsFolder
    //showValue : Application.prefs.getValue('extensions.jsonhandle.showValue', true),
    //showIco : Application.prefs.getValue('extensions.jsonhandle.showIco', false),
    //showStyle : Application.prefs.getValue('extensions.jsonhandle.showStyle', '')
    //"checkShowIco" : function (elm) {
    //"checkShowValueInNav" : function (elm) {
    //"checkIcoAsFolderBtn" : function (elm) {//debugger;
}

function jsonH_error(sJson) {
    alert(sJson);
}

//var oJson = JH.md.JSON();


var oView = {
    context: this
};

var sJson = '';
var eJsonData = JH.e('#jsonData');

if (eJsonData.firstChild) {

    startJsonH(eJsonData.firstChild.data);

} else {

    //var aSearch = location.search.match(/[\W]enterValue=([^&]*).*/);
    //if(aSearch) {
    //sJson = decodeURIComponent(aSearch[1]);
    //startJsonH(sJson);
    //}else{


    if (config.mode === 'request') {
        var jsonH_Request = JH.request(oView);
        var getJsonStringRequest = jsonH_Request.create(JH.request.NS.jsonH, 'getJsonString', {succeed: function (oResponseData, oRequestData) {
            try {
                startJsonH(oResponseData.data);
            }
            catch (e) {
                jsonH_error(oResponseData.data);
            }
        }});
        try {
            getJsonStringRequest.request('first view');
        } catch (e) {
            startJsonH();
        }

    } else if (config.mode === 'script_string') {
        startJsonH(script_JsonString);
    } else {
        startJsonH();
    }

    //}


}


//var jsonH_transceiver = $.transceiver(oView);
//jsonH_transceiver.follow(JH.transceiver.NS.jsonH, 'getJsonString', function (oFireData, oListenData) {
//try{
//startJsonH(oResponseData.data);
//}
//catch(e) {
//jsonH_error(oResponseData.data);
//}
//});






