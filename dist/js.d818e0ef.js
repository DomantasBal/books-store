// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"src/js/index.js":[function(require,module,exports) {
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
// ==================== localstorage.js ==================== //

var savedBooks = [];

// CONSTRUCTOR FUNCTION TO POPULATE BOOK OBJECT WITH FORM DATA
function Book(id, name, author, category, year, price, artwork) {
  this.id = id;
  this.name = name;
  this.author = author;
  this.category = category;
  this.year = year;
  this.price = price;
  this.artwork = artwork;
}

// COLLECTS FORM DATA AND CREATES NEW OBJECT
function addNewBook(event) {
  event.preventDefault();
  var form = document.getElementById("new-book-form");
  var storedBooks = JSON.parse(localStorage.getItem("books")) || [];
  var booksArray = Array.isArray(storedBooks) ? storedBooks : [];
  var book = new Book(storedBooks.length + 1, form.elements[0].value, form.elements[1].value, form.elements[2].value, form.elements[3].value, parseFloat(form.elements[4].value), form.elements[5].value);

  // APPEND THE NEW BOOK TO THE ARRAY AT LOCALSTORAGE
  var updatedBooks = [].concat(_toConsumableArray(booksArray), [book]);

  //   SETS UPDATED BOOKS ARRAY IN LOCALSTORAGE
  localStorage.setItem("books", JSON.stringify(updatedBooks));
  form.reset();
  location.reload();
}

// ==================== createBookListing.js ==================== //

// FORM SUBMIT EVENT
var form = document.getElementById("new-book-form");
form.addEventListener("submit", addNewBook);
function bookTemplate(book) {
  return "\n    <article id=".concat(book.id, " class=\"single-book\">\n    <img src=\"./src/img/book-test.jpg\" alt=\"\" />\n    <div class=\"book-info\">\n      <h3 class=\"single-book__name editable\">Title: ").concat(book.name, "</h3>\n      <p class=\"single-book__author editable\">Author: ").concat(book.author, "</p>\n      <p class=\"single-book_category editable\">Category: ").concat(book.category, "</p>\n      <p class=\"single-book__years editable\">Year: ").concat(book.year, "</p>\n      <p class=\"single-book__price editable\">").concat(book.price, "\u20AC</p>\n    </div>\n    <div class=\"book-controls\">\n      <button class=\"btn edit\" data-book-id=\"").concat(book.id, "\">Edit</button>\n      <button class=\"btn save\" data-book-id=\"").concat(book.id, "\" style=\"display:none\">Save</button>\n      <button class=\"btn delete\" data-book-id=\"").concat(book.id, "\">Delete</button>\n    </div>\n  </article>\n      ");
}
function bindBookEventListeners() {
  // EDIT BTN FUNC
  var editButtons = document.querySelectorAll(".btn.edit");
  editButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      var bookId = button.getAttribute("data-book-id");
      editBook(bookId);
    });
  });

  // DELETE BTN FUNC
  var deleteButtons = document.querySelectorAll(".btn.delete");
  deleteButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      var bookId = button.getAttribute("data-book-id");
      deleteBook(bookId);
    });
  });
}

// ==================== editBook.js ==================== //

function makeFieldsEditable(bookElement, isEditable) {
  bookElement.querySelectorAll(".editable").forEach(function (field) {
    field.contentEditable = isEditable;
  });
  fieldsColorChange(bookElement, isEditable);
}
function fieldsColorChange(bookElement, isEditable) {
  // Styling on editing
  var nameField = bookElement.querySelector(".single-book__name");
  var authorField = bookElement.querySelector(".single-book__author");
  var categoryField = bookElement.querySelector(".single-book_category");
  var yearsField = bookElement.querySelector(".single-book__years");
  var priceField = bookElement.querySelector(".single-book__price");
  var colorChange = [nameField, authorField, categoryField, yearsField, priceField];
  if (isEditable) {
    var _iterator = _createForOfIteratorHelper(colorChange),
      _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var color = _step.value;
        color.style.background = "#8AFFFF";
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
  } else {
    var _iterator2 = _createForOfIteratorHelper(colorChange),
      _step2;
    try {
      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
        var _color = _step2.value;
        _color.style.background = "none";
      }
    } catch (err) {
      _iterator2.e(err);
    } finally {
      _iterator2.f();
    }
  }
}
function saveEditedBook(bookElement, bookId) {
  var updatedBook = {
    id: bookId,
    name: bookElement.querySelector(".single-book__name").innerText,
    author: bookElement.querySelector(".single-book__author").innerText,
    category: bookElement.querySelector(".single-book_category").innerText,
    year: bookElement.querySelector(".single-book__years").innerText,
    price: parseFloat(bookElement.querySelector(".single-book__price").innerText.slice(0, -1)),
    artwork: ""
  };

  // Retrieve storedBooks from localStorage
  var storedBooks = JSON.parse(localStorage.getItem("books"));
  // Find the index of the book to update
  var bookIndex = storedBooks.findIndex(function (book) {
    return book.id === bookId;
  });

  // Update the book in the storedBooks array
  storedBooks[bookIndex] = updatedBook;
  localStorage.setItem("books", JSON.stringify(storedBooks));
  makeFieldsEditable(bookElement, false);
}
function editBook(bookId) {
  var bookElement = document.getElementById(bookId);
  var saveButton = bookElement.querySelector(".btn.save");
  var editButton = bookElement.querySelector(".btn.edit");
  if (editButton.textContent === "Edit") {
    makeFieldsEditable(bookElement, true);
    editButton.textContent = "Cancel";
    saveButton.style.display = "inline-block";
  } else {
    makeFieldsEditable(bookElement, false);
    editButton.textContent = "Edit";
    saveButton.style.display = "none";
  }
  saveButton.addEventListener("click", function () {
    saveEditedBook(bookElement, parseInt(bookId));
    editButton.textContent = "Edit";
    saveButton.style.display = "none";
  });
}

// ==================== deleteBook.js ==================== //
function deleteBook(bookId) {
  var storedBooks = JSON.parse(localStorage.getItem("books"));
  var idNumber = Number(bookId);

  // Find the index of the book to delete
  var bookIndex = storedBooks.findIndex(function (book) {
    return book.id === idNumber;
  });
  if (bookIndex !== -1) {
    storedBooks.splice(bookIndex, 1);
    localStorage.setItem("books", JSON.stringify(storedBooks));
  } else {
    alert("book was not found in database.");
  }
  location.reload();
}

// ==================== filters.js ==================== //

function filterAndRenderBooks() {
  var authorFilter = document.getElementById("authors-select");
  var categoryFilter = document.getElementById("category-select");
  var priceSort = document.getElementById("price-select");
  var storedBooks = JSON.parse(localStorage.getItem("books"));
  var filteredBooks = storedBooks;
  if (authorFilter !== null && authorFilter.value) {
    filteredBooks = filteredBooks.filter(function (book) {
      return book.author === authorFilter.value;
    });
  }
  if (categoryFilter !== null && categoryFilter.value) {
    filteredBooks = filteredBooks.filter(function (book) {
      return book.category === categoryFilter.value;
    });
  }
  if (priceSort !== null && priceSort.value) {
    filteredBooks.sort(function (a, b) {
      if (priceSort.value === "min-max") {
        return a.price - b.price;
      } else if (priceSort.value === "max-min") {
        return b.price - a.price;
      }
      return 0;
    });
  }
  var booksContainer = document.querySelector(".books-container");
  if (booksContainer !== null) {
    booksContainer.innerHTML = ""; // Clear previous content before adding new ones
    filteredBooks.forEach(function (book) {
      var bookHtml = bookTemplate(book);
      if (typeof bookHtml === "string") {
        booksContainer.innerHTML += bookHtml;
      }
    });
    bindBookEventListeners();
  }
}

// AUTHOR FILTER
var selectAuthor = document.getElementById("authors-select");
selectAuthor.addEventListener("change", filterAndRenderBooks);

// CATEGORY FILTER
var selectCategory = document.getElementById("category-select");
selectCategory.addEventListener("change", filterAndRenderBooks);

// PRICE SORT
var selectPrice = document.getElementById("price-select");
selectPrice.addEventListener("change", filterAndRenderBooks);
window.addEventListener("load", filterAndRenderBooks);

// ==================== search.js ==================== //
},{}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}
module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "60653" + '/');
  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);
    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);
          if (didAccept) {
            handled = true;
          }
        }
      });

      // Enable HMR for CSS by default.
      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });
      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }
    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }
    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }
    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}
function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}
function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}
function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }
  var parents = [];
  var k, d, dep;
  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }
  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }
  return parents;
}
function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}
function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }
  if (checkedAssets[id]) {
    return;
  }
  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }
  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}
function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }
  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }
  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/js/index.js"], null)
//# sourceMappingURL=/js.d818e0ef.js.map