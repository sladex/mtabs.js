/* mtabs.js - v0.0.1 - 2013-10-18
* http://sladex.org/mtabs.js/
* Copyright (c) 2013 Sladex; Licensed MIT */
(function () {
    'use strict';
    window.mtabs = function (wrap, params) {
        var merge = function (defaults, params) {
                var obj = {}, p;
                for (p in defaults) { obj[p] = defaults[p]; }
                for (p in params) { obj[p] = params[p]; }
                return obj;
            },
            s = merge({ // merging default options and user's
                index: 0,
                sclass: 'mtabs-selected',
                ev: 'click',
                hash: true,
                cb: 0
            }, params),
            $ = function (id) {
                return document.getElementById(id);
            },
            eventListener = document.addEventListener ? true : false,
            tabs = [],  // actual tab which css class will be toggling
            tabsL = [], // clickable area, usually the same as tabs
            tabsC = [], // containers to show/hide
            cIds = [],  // containers ids
            change = function (index, cId) {
                for (var k = 0; k < tabs.length; k++) {
                    tabs[k].classList.remove(s.sclass);
                }
                tabs[index].classList.add(s.sclass);
                for (var c = 0; c < tabsC.length; c++) {
                    tabsC[c].style.display = 'none';
                }
                $(cId).style.display = 'block';
            },
            getCID = function (link) {
                return link.getAttribute('href').slice(1);
            },
            prepareLink = function (el) {
                tabsL.push(el);
                var cId = getCID(el),
                    fireEvent = function (el) {
                        var index = tabsL.indexOf(el),
                            cId = getCID(el);
                        change(index, cId);
                        if (s.cb) {
                            s.cb.apply(el, [index, tabs, tabsC, tabsL]);
                        }
                    };
                tabsC.push($(cId));
                cIds.push(cId);
                if (eventListener) {
                    el.addEventListener(s.ev, function (e) {
                        fireEvent(el);
                        e.preventDefault();
                    }, false);
                }
                else {
                    el.attachEvent('on' + s.ev, function (e) {
                        fireEvent(el);
                        e.returnValue = false;
                    });
                }
            };
        var allEls = $(wrap).getElementsByTagName('*'),
            allElsLength = allEls.length;
        for (var i = 0; i < allElsLength; i++) {
            if (allEls[i].classList.contains(s.sclass)) {
                var ch = allEls[i].parentNode.childNodes;
                for (var j = 0; j < ch.length; j++) {
                    if (ch[j].nodeType === 1) { // === Node.ELEMENT_NODE
                        tabs.push(ch[j]);
                    }
                }
            }
        }
        for (var t = 0, tl = tabs.length; t < tl; t++) {
            var tabEls = tabs[t].getElementsByTagName('*'),
                tabElsLength = tabEls.length,
                tabLinkPrepared = false;
            for (var q = 0; q < tabElsLength; q++) {    // trying to find inner action link
                if (tabEls[q].getAttribute('data-mtabs')) {
                    prepareLink(tabEls[q]);
                    tabLinkPrepared = true;
                }
            }
            if (!tabLinkPrepared) { // otherwhise the tab itself is our action link
                prepareLink(tabs[t]);
            }
        }

        var jump = cIds.indexOf(location.hash.slice(1)),
            initIndex = (jump > -1 && s.hash) ? jump : (s.index || 0);
        /*
        console.log(initIndex);
        console.log(tabs);
        console.log(tabsL);
        console.log(tabsC);
        console.log(cIds);
        */
        var cId = getCID(tabsL[initIndex]);
        change(initIndex, cId);
    };

    if (!Array.prototype.indexOf) { //ie8
      Array.prototype.indexOf = function (searchElement) {
        if (this === null) { throw new TypeError(); }
        var n, k, t = Object(this),
            len = t.length >>> 0;
        if (len === 0) { return -1; }
        n = 0;
        if (arguments.length > 1) {
          n = Number(arguments[1]);
          if (n != n) { // shortcut for verifying if it's NaN
            n = 0;
          } else if (n !== 0 && n != Infinity && n != -Infinity) {
            n = (n > 0 || -1) * Math.floor(Math.abs(n));
          }
        }
        if (n >= len) { return -1; }
        for (k = n >= 0 ? n : Math.max(len - Math.abs(n), 0); k < len; k++) {
          if (k in t && t[k] === searchElement) {
            return k;
          }
        }
        return -1;
      };
    }

})();
