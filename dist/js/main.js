window.NodeList&&!NodeList.prototype.forEach&&(NodeList.prototype.forEach=function(t,e){e=e||window;for(var o=0;o<this.length;o++)t.call(e,this[o],o,this)}),window.HTMLCollection&&!HTMLCollection.prototype.forEach&&(HTMLCollection.prototype.forEach=function(t,e){e=e||window;for(var o=0;o<this.length;o++)t.call(e,this[o],o,this)}),Array.prototype.forEach||(Array.prototype.forEach=function(t,e){"use strict";var o,r;if(null==this)throw new TypeError("this is null or not defined");var n,c=Object(this),i=c.length>>>0;if("[object Function]"!=={}.toString.call(t))throw new TypeError(t+" is not a function");for(2<=arguments.length&&(o=e),r=0;r<i;)r in c&&(n=c[r],t.call(o,n,r,c)),r++}),Element.prototype.matches||(Element.prototype.matches=Element.prototype.msMatchesSelector||Element.prototype.webkitMatchesSelector),Element.prototype.closest||(Element.prototype.closest=function(t){var e=this;if(!document.documentElement.contains(e))return null;do{if(e.matches(t))return e;e=e.parentElement||e.parentNode}while(null!==e&&1===e.nodeType);return null});var globalJS=function(){"use strict";var n,t,e,o,r,c,i={required:function(t){return"checkbox"===t.type&&t.checked||"checkbox"!==t.type&&""!==t.value},email:function(t){return/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/.test(t)}};function l(t,e,o){e&&("string"==typeof e||"object"==typeof e)&&t&&o&&"function"==typeof o&&("string"==typeof e?NodeList.prototype.isPrototypeOf(t)?t.forEach(function(t){t.addEventListener(e,o,!1)}):t.addEventListener(e,o,!1):e.forEach(function(e){NodeList.prototype.isPrototypeOf(t)&&"string"==typeof e?t.forEach(function(t){t.addEventListener(e,o,!1)}):"string"==typeof e&&t.addEventListener(e,o,!1)}))}function a(t){t.preventDefault()}function s(t){var e=n.querySelector(".c-modal"),o=t.target.getAttribute("data-modal-target"),r=n.querySelector(o);e.classList.toggle("show-modal"),r.classList.toggle("in"),r.classList.toggle("show")}function u(t){t.preventDefault(),c.elements.forEach(function(t){var e,o;"hidden"!==(o=(e=t).target||e).type&&"submit"!==o.type&&(null!==o.getAttribute("required")&&!i.required(o)||""!==o.value&&i[o.type]&&!i[o.type](o.value)?o.closest("div").classList.add("error"):o.closest("div").classList.remove("error"))})}return{init:function(){n=document.querySelector(".p-practice"),t=n.querySelectorAll(".c-nav a"),e=n.querySelectorAll(".c-products a"),o=n.querySelectorAll(".btn-open-modal"),r=n.querySelectorAll(".close"),c=n.querySelector(".c-form"),l(t,"click",a),l(e,"click",a),l(o,"click",s),l(r,"click",s),l(c,"submit",u)}}}();document.addEventListener("DOMContentLoaded",globalJS.init);