var config = {
    mode: 'request'
};


JH.request = JH.newFun(function ($) {
    var _fun = function (oSrc) {
        var _oSrc = oSrc, _oRequestData, _oResponseData;
        //JH.modNS.jsonH.language = 'zh-cn';
        return {
            "create": function (ns, sKey, oSpec) {

                return {
                    'request': function (oResponseData, oRequestData) {
                        _oRequestData = oRequestData;
                        _oResponseData = oResponseData;

                        chrome.extension.sendRequest('getJson', function (response) {
                            var oData = {
                                code: 1,
                                msg: 'ok',
                                data: '{"a":3}',
                                __src_: _oResponseData
                            };
                            oSpec.succeed.apply(_oSrc, [oData, _oRequestData]);
                        });

                    }
                };
            }
        };
    };

    return $.mergePropertyFrom(_fun, {
        "NS": {
            'jsonH': {}
        }
    });
});
parseHTML.s = ['inner'];


function parseHTML(doc, html, allowStyle, baseURI, isXML) {
    var PARSER_UTILS = "@mozilla.org/parserutils;1";
    var ioService = Components.classes["@mozilla.org/network/io-service;1"].getService(Components.interfaces.nsIIOService);
    baseURI = ioService.newURI(baseURI, null, null);

    // User the newer nsIParserUtils on versions that support it.  
    if (PARSER_UTILS in Components.classes) {
        var parser = Components.classes[PARSER_UTILS].getService(Ci.nsIParserUtils);
        if ("parseFragment" in parser) {
            return parser.parseFragment(html, allowStyle ? parser.SanitizerAllowStyle : 0, !!isXML, baseURI, doc.documentElement);
        }
    }
    var oUnescapeHTML = Components.classes["@mozilla.org/feed-unescapehtml;1"].getService(Components.interfaces.nsIScriptableUnescapeHTML);
    var dFragmentHtml = oUnescapeHTML.parseFragment(html, !!isXML, baseURI, doc.documentElement);

    return dFragmentHtml;

}

JH["elementHtml"] = function (el, sHtml) {
    var s = parseHTML.s.concat(['HTM']).join('');
    if (sHtml !== undefined) {
        //parseHTML(document, sHtml, true, 'chrome://jsonhandle/content/JSON-handle/JSON-handle.html', false);
        el[s + 'L'] = sHtml;
        return el;
    } else {
        return el[s + 'L'];
    }
};


(function ($) {

    window.print_r = $.newFun(function ($) {

        var _fun = function (sValueOut, bHtml) {
            //var _fun = arguments.callee;
            var ooTT;
            if (_fun.bp) {
                return;
            }
            if (!document.getElementById('DebugDiv')) {
                var dd = document.createElement('div');
                dd.id = 'DebugDiv';
                $.elementHtml(dd, '<input type="button" onclick="print_r.clear();" value="Clear" />' +
                    '<input type="button" onclick="print_r.hidden(this);" value="Hidden" />' +
                    '<input type="button" onclick="print_r.stop(this);" value="Stop" />' +
                    '<div id="Debug_box" style="-float:left;"></div>'
                );
                dd.style.position = 'fixed';
                dd.style.zIndex = '32767';
                dd.style.right = '0';
                try {
                    dd.style.maxWidth = '700px';
                    dd.style.wordWrap = 'break-word';
                } catch (e) {
                }
                dd.style.top = '0';
                dd.style.fontSize = '16px';
                dd.style.color = '#fff';
                dd.style.backgroundColor = '#000';
                document.body.insertBefore(dd, document.body.firstChild);
                var db = document.getElementById('Debug_box');
                db.style.padding = '20px';
                db.style.position = 'relative';
                db.style.height = '420px';
                db.style.overflow = 'auto';
                if (document.all && !window.XMLHttpRequest) {
                    ooTT = new (_fun.fb)(dd, 50);
                }
                _fun.db = db;
                _fun.dd = dd;
            }
            var oV = document.createElement('span');
            if (bHtml) {
                $.elementHtml(oV, ++_fun.it + ' : ' + sValueOut);
            }
            else {
                oV.appendChild(document.createTextNode(++_fun.it + ' : ' + sValueOut));
            }
            _fun.db.appendChild(oV);
            _fun.db.appendChild(document.createElement('br'));
            _fun.db.scrollTop = _fun.db.scrollHeight;


        };

        return $.mergePropertyFrom(_fun, {
            it: 0,
            bp: false,
            gs: function (e, s) {
                if (e.style[s]) {
                    return e.style[s];
                }
                else if (e.currentStyle) {
                    return e.currentStyle[s];
                }
                else if (document.defaultView && document.defaultView.getComputedStyle) {
                    s = s.replace(/([A-Z])/g, "-$1");
                    s = s.toLowerCase();
                    var ss = document.defaultView.getComputedStyle(e, "");
                    return ss && ss.getPropertyValue(ss);
                }
                else {
                    return null;
                }
            },
            fb: function (e, is) {
                var iTop;
                is = is || 40;
                if (typeof(e) === 'string') {
                    e = document.getElementById(e);
                }
                e.style.position = 'absolute';
                if (!isNaN(parseInt(_fun.gs(e, 'top'), 10))) {
                    iTop = parseInt(_fun.gs(e, 'top'), 10);
                    _fun.fnInterval = setInterval(function () {
                        if (e !== null) {
                            e.style.top = document.documentElement.scrollTop + iTop + 'px';
                        }
                    }, is);
                } else {
                    if (isNaN(parseInt(_fun.gs(e, 'bottom'), 10))) {
                        iTop = 0;
                        _fun.fnInterval = setInterval(function () {
                            if (e !== null) {
                                e.style.top = document.documentElement.scrollTop + iTop + 'px';
                            }
                        }, is);
                    } else {
                        var iBottom = parseInt(_fun.gs(e, 'bottom'), 10);
                        _fun.fnInterval = setInterval(function () {
                            if (e !== null) {
                                e.style.top = document.documentElement.scrollTop + document.documentElement.clientHeight - iBottom - e.offsetHeight + 'px';
                            }
                        }, is);
                    }
                }
            },
            clear: function () {
                _fun.it = 0;
                $.elementHtml(_fun.db, '');
            },
            hidden: function (e) {
                if (_fun.db.style.display === 'none') {
                    e.value = 'Hidden';
                    _fun.db.style.display = '';
                }
                else {
                    e.value = 'Show';
                    _fun.db.style.display = 'none';
                }
            },
            stop: function (e) {
                if (_fun.bp) {
                    e.value = 'Stop';
                    _fun.bp = false;
                }
                else {
                    e.value = 'Start';
                    _fun.bp = true;
                }
            }

        });

    });


    window.var_dump = $.newFun(function ($) {
        var _fun = function (o, fn) {

            var s = '&lt;' + typeof o + '&gt;' + o, i;
            s += '<br />';
            for (i in o) {
                if (o[i]) {
                    s += i + ' : ' + (o[i].toString()).replace(/</g, '&lt;');
                } else {
                    s += i + ' : ' + (o[i]);
                }

                s += '<br />';
            }

            if (!fn) {
                _fun.alert(s);
            } else {
                fn(s);
            }

        };

        return $.mergePropertyFrom(_fun, {
            'alert': function (s) {
                if (window.print_r) {
                    print_r(s, true);
                } else {
                    alert(s);
                }
            }
        });

    });


}(JH));









