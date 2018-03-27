/*
* forEach
* This polyfill adds compatibility to all Browsers supporting.
*/
if (window.NodeList && !NodeList.prototype.forEach) {
    NodeList.prototype.forEach = function (callback, thisArg) {
        thisArg = thisArg || window;
        for (var i = 0; i < this.length; i++) {
            callback.call(thisArg, this[i], i, this);
        }
    };
}

if (window.HTMLCollection && !HTMLCollection.prototype.forEach) {
    HTMLCollection.prototype.forEach = function (callback, thisArg) {
        thisArg = thisArg || window;
        for (var i = 0; i < this.length; i++) {
            callback.call(thisArg, this[i], i, this);
        }
    };
}

if (!Array.prototype.forEach) {
    Array.prototype.forEach = function forEach(callback, thisArg) {
        'use strict';
         var T, k;

        if (this == null) {
            throw new TypeError("this is null or not defined");
        }

        var kValue,
            O = Object(this),
            len = O.length >>> 0;

        if ({}.toString.call(callback) !== "[object Function]") {
            throw new TypeError(callback + " is not a function");
        }

        if (arguments.length >= 2) {
            T = thisArg;
        }

        k = 0;

        while (k < len) {
            if (k in O) {
                kValue = O[k];
                callback.call(T, kValue, k, O);
            }
            k++;
        }
    };
}

/*
* matches
* This polyfill adds compatibility to all Browsers supporting.
*/
if (!Element.prototype.matches) {
    Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
}

/*
* closest
* This polyfill adds compatibility to all Browsers supporting.
*/
if (!Element.prototype.closest) {
    Element.prototype.closest = function (s) {
        var el = this;
        if (!document.documentElement.contains(el)) {
            return null;
        }
        do {
            if (el.matches(s)) {
                return el;
            }
            el = el.parentElement || el.parentNode;
        } while (el !== null && el.nodeType === 1);
        return null;
    };
}