parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"egi3":[function(require,module,exports) {
function e(e){return new Promise(function(n,t){var o=(JSON.parse(localStorage.getItem("books"))||[]).filter(function(n){return n.name.toLowerCase().includes(e.toLowerCase())});o.length>0?n(o):t("No books found")})}function n(n){n.preventDefault(),e(document.getElementById("search-input").value).then(function(e){var n=document.querySelector(".books-container");n.innerHTML="",e.forEach(function(e){var t=bookTemplate(e);"string"==typeof t&&(n.innerHTML+=t)}),bindBookEventListeners()}).catch(function(e){console.error(e)})}var t=document.getElementById("search-form");t.addEventListener("submit",n);
},{}]},{},["egi3"], null)
//# sourceMappingURL=/searchBooks.c4b8e0ef.js.map