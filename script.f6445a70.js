parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"L4bL":[function(require,module,exports) {
!function(){"use strict";var e=document.querySelector(".navigation__hamburgerButton"),t=document.querySelector(".navigation__list-arrowButton"),a=document.querySelector(".navigation__list"),i=document.querySelectorAll(".navigation__link");function s(){i.forEach(function(e){window.matchMedia("(max-width: 767px)").matches&&!e.classList.contains("linksFade")?e.classList.add("linksFade"):e.classList.remove("linksFade")})}e.addEventListener("click",function(){e.classList.toggle("js-active"),a.classList.toggle("navigation__list--open"),s(),a.classList.contains("navigation__list--open")?e.setAttribute("aria-expanded",!0):(e.setAttribute("aria-expanded",!1),t.setAttribute("aria-expanded",!1))}),t.addEventListener("click",function(){a.classList.toggle("navigation__list--open"),a.classList.contains("navigation__list--open")?(e.classList.add("js-active"),t.setAttribute("aria-expanded",!0)):(e.classList.remove("js-active"),t.setAttribute("aria-expanded",!1),e.setAttribute("aria-expanded",!1)),s(),t.innerText=">"===t.innerText?"<":">"}),i.forEach(function(i){i.addEventListener("click",function(){a.classList.remove("navigation__list--open"),e.classList.remove("js-active"),t.setAttribute("aria-expanded",!1),e.setAttribute("aria-expanded",!1),s()})}),window.addEventListener("scroll",function(){window.pageYOffset>200?t.classList.add("navigation__list-arrowButton--active"):t.classList.remove("navigation__list-arrowButton--active")});var n=document.querySelector("body").classList,c=document.querySelector("#mode-switcher"),o=window.matchMedia("(prefers-color-scheme: dark)").matches;console.log("Dark mode is ".concat(o?"🌒 on":"☀️ off",".")),o?n.add("dark"):n.remove("dark"),n.contains("dark")&&(c.checked=!0,c.classList.add("checkbox--active"),c.setAttribute("aria-checked",!0)),c.addEventListener("click",function(){null!==document.querySelector("#mode-switcher:checked")?(n.add("dark"),c.classList.add("checkbox--active"),c.setAttribute("aria-checked",!0)):(n.remove("dark"),c.classList.remove("checkbox--active"),c.setAttribute("aria-checked",!1))})}();
},{}]},{},["L4bL"], null)
//# sourceMappingURL=script.f6445a70.js.map