parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"mahc":[function(require,module,exports) {
function e(e,t){var n="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!n){if(Array.isArray(e)||(n=o(e))||t&&e&&"number"==typeof e.length){n&&(e=n);var r=0,a=function(){};return{s:a,n:function(){return r>=e.length?{done:!0}:{done:!1,value:e[r++]}},e:function(e){throw e},f:a}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var i,l=!0,c=!1;return{s:function(){n=n.call(e)},n:function(){var e=n.next();return l=e.done,e},e:function(e){c=!0,i=e},f:function(){try{l||null==n.return||n.return()}finally{if(c)throw i}}}}function t(e){return a(e)||r(e)||o(e)||n()}function n(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function o(e,t){if(e){if("string"==typeof e)return i(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?i(e,t):void 0}}function r(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}function a(e){if(Array.isArray(e))return i(e)}function i(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,o=new Array(t);n<t;n++)o[n]=e[n];return o}var l=[];function c(e,t,n,o,r,a,i){this.id=e,this.name=t,this.author=n,this.category=o,this.year=r,this.price=a,this.artwork=i}function s(e){e.preventDefault();var n=document.getElementById("new-book-form"),o=JSON.parse(localStorage.getItem("books"))||[],r=Array.isArray(o)?o:[],a=n.elements[4],i=parseFloat(a.value);if(d(a),a.style.borderColor="",isNaN(i))u(a);else{var l=new c(o.length+1,n.elements[0].value,n.elements[1].value,n.elements[2].value,n.elements[3].value,parseFloat(n.elements[4].value),n.elements[5].value),s=[].concat(t(r),[l]);localStorage.setItem("books",JSON.stringify(s)),n.reset(),k(),location.reload()}}function u(e){e.style.borderColor="red",e.value="",e.placeholder="Please enter a valid number for the price."}function d(e){var t=e.previousElementSibling;t&&t.classList.contains("error-message")&&t.remove()}var y=document.getElementById("new-book-form");function f(e){return"\n    <article id=".concat(e.id,' class="single-book">\n    <div class="single-book__img">\n    <img src="').concat(e.artwork,'" />\n    </div>\n    <div class="book-info">\n    <div>\n    <span>Title:</span> <h3 class="single-book__name editable">').concat(e.name,'</h3>\n    </div>\n    <div>\n    <span>Author:</span>  <p class="single-book__author editable">').concat(e.author,'</p>\n    </div>\n    <div>\n    <span>Category:</span>  <p class="single-book_category editable">').concat(e.category,'</p>\n    </div>\n    <div>\n    <span>Year:</span> <p class="single-book__years editable">').concat(e.year,'</p>\n    </div>\n    <div class="price">\n    <p class="single-book__price editable">').concat(e.price,'</p><span>€</span> \n    </div>\n    </div>\n    <div class="book-controls">\n      <button class="btn edit" data-book-id="').concat(e.id,'">Edit</button>\n      <button class="btn save" data-book-id="').concat(e.id,'" style="display:none">Save</button>\n      <button class="btn delete" data-book-id="').concat(e.id,'">Delete</button>\n    </div>\n  </article>\n      ')}function m(){document.querySelectorAll(".btn.edit").forEach(function(e){e.addEventListener("click",function(){g(e.getAttribute("data-book-id"))})}),document.querySelectorAll(".btn.delete").forEach(function(e){e.addEventListener("click",function(){h(e.getAttribute("data-book-id"))})})}function b(e,t){e.querySelectorAll(".editable").forEach(function(e){e.contentEditable=t}),v(e,t)}function v(t,n){var o=[t.querySelector(".single-book__name"),t.querySelector(".single-book__author"),t.querySelector(".single-book_category"),t.querySelector(".single-book__years"),t.querySelector(".single-book__price")];if(n){var r,a=e(o);try{for(a.s();!(r=a.n()).done;){r.value.style.background="#fec868"}}catch(c){a.e(c)}finally{a.f()}}else{var i,l=e(o);try{for(l.s();!(i=l.n()).done;){i.value.style.background="none"}}catch(c){l.e(c)}finally{l.f()}}}function p(e,t){var n={id:t,name:e.querySelector(".single-book__name").innerText,author:e.querySelector(".single-book__author").innerText,category:e.querySelector(".single-book_category").innerText,year:e.querySelector(".single-book__years").innerText,price:parseFloat(e.querySelector(".single-book__price").innerText.slice(0,-1)),artwork:""},o=JSON.parse(localStorage.getItem("books")),r=o.findIndex(function(e){return e.id===t});o[r]=n,localStorage.setItem("books",JSON.stringify(o)),b(e,!1)}function g(e){var t=document.getElementById(e),n=t.querySelector(".btn.save"),o=t.querySelector(".btn.edit");"Edit"===o.textContent?(b(t,!0),o.textContent="Cancel",n.style.display="inline-block"):(b(t,!1),o.textContent="Edit",n.style.display="none"),n.addEventListener("click",function(){p(t,parseInt(e)),o.textContent="Edit",n.style.display="none"})}function h(e){var t=JSON.parse(localStorage.getItem("books")),n=Number(e),o=t.findIndex(function(e){return e.id===n});-1!==o?(t.splice(o,1),localStorage.setItem("books",JSON.stringify(t))):alert("book was not found in database."),k(),location.reload()}function k(){var e=document.getElementById("authors-select"),n=document.getElementById("category-select"),o=JSON.parse(localStorage.getItem("books")),r=t(new Set(o.map(function(e){return e.author}))),a=t(new Set(o.map(function(e){return e.category})));e.innerHTML='<option value="">All authors</option>',r.forEach(function(t){return e.appendChild(new Option(t,t))}),n.innerHTML='<option value="">All categories</option>',a.forEach(function(e){return n.appendChild(new Option(e,e))})}function S(){var e=document.getElementById("authors-select"),t=document.getElementById("category-select"),n=document.getElementById("price-select"),o=JSON.parse(localStorage.getItem("books"));null!==e&&e.value&&(o=o.filter(function(t){return t.author===e.value})),null!==t&&t.value&&(o=o.filter(function(e){return e.category===t.value})),null!==n&&n.value&&o.sort(function(e,t){return"min-max"===n.value?e.price-t.price:"max-min"===n.value?t.price-e.price:0});var r=document.querySelector(".books-container");null!==r&&(o.length>0?(r.innerHTML="",o.forEach(function(e){var t=f(e);"string"==typeof t&&(r.innerHTML+=t)}),m()):r.innerHTML="<p>No books listed.</p>")}y.addEventListener("submit",s);var E=document.getElementById("authors-select");E.addEventListener("change",S);var I=document.getElementById("category-select");I.addEventListener("change",S);var _=document.getElementById("price-select");function w(){var e=document.getElementById("search-input").value.toLowerCase().trim(),t=JSON.parse(localStorage.getItem("books")).filter(function(t){return t.name.toLowerCase().includes(e)}),n=document.querySelector(".books-container");null!==n&&(n.innerHTML="",t.length>0?(t.forEach(function(e){var t=f(e);"string"==typeof t&&(n.innerHTML+=t)}),m()):n.innerText="No books found.")}_.addEventListener("change",S),window.addEventListener("load",function(){S(),k()});var L=document.getElementById("search-form");L.addEventListener("submit",function(e){e.preventDefault(),w(),T("books")});var q=document.querySelector(".add-book");q.addEventListener("click",function(){document.getElementById("new-book-form").elements[0].focus(),T("new-book")});var A=document.querySelector("#hero-btn");function T(e){document.getElementById(e).scrollIntoView({behavior:"smooth"})}A.addEventListener("click",function(){T("books")});var x=document.querySelector(".burger"),B=document.querySelector(".close-icon"),N=document.querySelector("#header"),C=N.style.top;x.addEventListener("click",function(){N.style.opacity=1,N.style.top=0,x.style.opacity=0}),B.addEventListener("click",function(){x.style.opacity=1,N.style.opacity=0,N.style.top=C});
},{}]},{},["mahc"], null)
//# sourceMappingURL=/js.f2ad6045.js.map