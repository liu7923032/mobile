/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "dist/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _vue = __webpack_require__(2);
	
	var _vue2 = _interopRequireDefault(_vue);
	
	var _vueRouter = __webpack_require__(4);
	
	var _vueRouter2 = _interopRequireDefault(_vueRouter);
	
	var _routers = __webpack_require__(5);
	
	var _routers2 = _interopRequireDefault(_routers);
	
	var _fastclick = __webpack_require__(92);
	
	var _fastclick2 = _interopRequireDefault(_fastclick);
	
	var _vTouch = __webpack_require__(93);
	
	var _vTouch2 = _interopRequireDefault(_vTouch);
	
	var _vueResource = __webpack_require__(107);
	
	var _vueResource2 = _interopRequireDefault(_vueResource);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	//加载weui
	
	// 1:创建启动的版本
	
	//加载触摸插件
	
	//配置路由规则
	_vue2.default.use(_vueRouter2.default);
	
	//加载数据请求组件
	
	_vue2.default.use(_vTouch2.default);
	_vue2.default.use(_vueResource2.default);
	
	var router = new _vueRouter2.default({
	    hashbang: true,
	    // root:'/home',
	    // history:true,
	    saveScrollPosition: true
	});
	// 路由器需要一个根组件。
	// 出于演示的目的，这里使用一个空的组件，直接使用 HTML 作为应用的模板
	var App = _vue2.default.extend({});
	
	//设置访问的地址
	_vue2.default.http.options.root = 'http://ht.mdsd.cn:9000/api';
	
	// 创建一个路由器实例
	// 创建实例时可以传入配置参数进行定制，为保持简单，这里使用默认配置
	
	// 定义路由规则
	// 每条路由规则应该映射到一个组件。这里的“组件”可以是一个使用 Vue.extend
	// 创建的组件构造函数，也可以是一个组件选项对象。
	// 稍后我们会讲解嵌套路由
	//注册路由
	(0, _routers2.default)(router);
	
	// router.redirect({
	// 	"*":'/home'
	// })
	
	//权限检查
	router.beforeEach(function (transition) {
	    //处理左侧滚动不影响右边
	    // $("html, body, #page").removeClass("scroll-hide");
	    _fastclick2.default.attach(document.body);
	
	    if (transition.to.auth) {
	        if (localStorage.userId) {
	            transition.next();
	        } else {
	            var redirect = encodeURIComponent(transition.to.path);
	            transition.redirect('/login?redirect=' + redirect);
	        }
	    } else {
	        transition.next();
	    }
	});
	
	// 现在我们可以启动应用了！
	// 路由器会创建一个 App 实例，并且挂载到选择符 #app 匹配的元素上。
	router.start(App, '#app');

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/*!
	 * Vue.js v1.0.15
	 * (c) 2016 Evan You
	 * Released under the MIT License.
	 */
	'use strict';
	
	function set(obj, key, val) {
	  if (hasOwn(obj, key)) {
	    obj[key] = val;
	    return;
	  }
	  if (obj._isVue) {
	    set(obj._data, key, val);
	    return;
	  }
	  var ob = obj.__ob__;
	  if (!ob) {
	    obj[key] = val;
	    return;
	  }
	  ob.convert(key, val);
	  ob.dep.notify();
	  if (ob.vms) {
	    var i = ob.vms.length;
	    while (i--) {
	      var vm = ob.vms[i];
	      vm._proxy(key);
	      vm._digest();
	    }
	  }
	  return val;
	}
	
	/**
	 * Delete a property and trigger change if necessary.
	 *
	 * @param {Object} obj
	 * @param {String} key
	 */
	
	function del(obj, key) {
	  if (!hasOwn(obj, key)) {
	    return;
	  }
	  delete obj[key];
	  var ob = obj.__ob__;
	  if (!ob) {
	    return;
	  }
	  ob.dep.notify();
	  if (ob.vms) {
	    var i = ob.vms.length;
	    while (i--) {
	      var vm = ob.vms[i];
	      vm._unproxy(key);
	      vm._digest();
	    }
	  }
	}
	
	var hasOwnProperty = Object.prototype.hasOwnProperty;
	/**
	 * Check whether the object has the property.
	 *
	 * @param {Object} obj
	 * @param {String} key
	 * @return {Boolean}
	 */
	
	function hasOwn(obj, key) {
	  return hasOwnProperty.call(obj, key);
	}
	
	/**
	 * Check if an expression is a literal value.
	 *
	 * @param {String} exp
	 * @return {Boolean}
	 */
	
	var literalValueRE = /^\s?(true|false|[\d\.]+|'[^']*'|"[^"]*")\s?$/;
	
	function isLiteral(exp) {
	  return literalValueRE.test(exp);
	}
	
	/**
	 * Check if a string starts with $ or _
	 *
	 * @param {String} str
	 * @return {Boolean}
	 */
	
	function isReserved(str) {
	  var c = (str + '').charCodeAt(0);
	  return c === 0x24 || c === 0x5F;
	}
	
	/**
	 * Guard text output, make sure undefined outputs
	 * empty string
	 *
	 * @param {*} value
	 * @return {String}
	 */
	
	function _toString(value) {
	  return value == null ? '' : value.toString();
	}
	
	/**
	 * Check and convert possible numeric strings to numbers
	 * before setting back to data
	 *
	 * @param {*} value
	 * @return {*|Number}
	 */
	
	function toNumber(value) {
	  if (typeof value !== 'string') {
	    return value;
	  } else {
	    var parsed = Number(value);
	    return isNaN(parsed) ? value : parsed;
	  }
	}
	
	/**
	 * Convert string boolean literals into real booleans.
	 *
	 * @param {*} value
	 * @return {*|Boolean}
	 */
	
	function toBoolean(value) {
	  return value === 'true' ? true : value === 'false' ? false : value;
	}
	
	/**
	 * Strip quotes from a string
	 *
	 * @param {String} str
	 * @return {String | false}
	 */
	
	function stripQuotes(str) {
	  var a = str.charCodeAt(0);
	  var b = str.charCodeAt(str.length - 1);
	  return a === b && (a === 0x22 || a === 0x27) ? str.slice(1, -1) : str;
	}
	
	/**
	 * Camelize a hyphen-delmited string.
	 *
	 * @param {String} str
	 * @return {String}
	 */
	
	var camelizeRE = /-(\w)/g;
	
	function camelize(str) {
	  return str.replace(camelizeRE, toUpper);
	}
	
	function toUpper(_, c) {
	  return c ? c.toUpperCase() : '';
	}
	
	/**
	 * Hyphenate a camelCase string.
	 *
	 * @param {String} str
	 * @return {String}
	 */
	
	var hyphenateRE = /([a-z\d])([A-Z])/g;
	
	function hyphenate(str) {
	  return str.replace(hyphenateRE, '$1-$2').toLowerCase();
	}
	
	/**
	 * Converts hyphen/underscore/slash delimitered names into
	 * camelized classNames.
	 *
	 * e.g. my-component => MyComponent
	 *      some_else    => SomeElse
	 *      some/comp    => SomeComp
	 *
	 * @param {String} str
	 * @return {String}
	 */
	
	var classifyRE = /(?:^|[-_\/])(\w)/g;
	
	function classify(str) {
	  return str.replace(classifyRE, toUpper);
	}
	
	/**
	 * Simple bind, faster than native
	 *
	 * @param {Function} fn
	 * @param {Object} ctx
	 * @return {Function}
	 */
	
	function bind$1(fn, ctx) {
	  return function (a) {
	    var l = arguments.length;
	    return l ? l > 1 ? fn.apply(ctx, arguments) : fn.call(ctx, a) : fn.call(ctx);
	  };
	}
	
	/**
	 * Convert an Array-like object to a real Array.
	 *
	 * @param {Array-like} list
	 * @param {Number} [start] - start index
	 * @return {Array}
	 */
	
	function toArray(list, start) {
	  start = start || 0;
	  var i = list.length - start;
	  var ret = new Array(i);
	  while (i--) {
	    ret[i] = list[i + start];
	  }
	  return ret;
	}
	
	/**
	 * Mix properties into target object.
	 *
	 * @param {Object} to
	 * @param {Object} from
	 */
	
	function extend(to, from) {
	  var keys = Object.keys(from);
	  var i = keys.length;
	  while (i--) {
	    to[keys[i]] = from[keys[i]];
	  }
	  return to;
	}
	
	/**
	 * Quick object check - this is primarily used to tell
	 * Objects from primitive values when we know the value
	 * is a JSON-compliant type.
	 *
	 * @param {*} obj
	 * @return {Boolean}
	 */
	
	function isObject(obj) {
	  return obj !== null && typeof obj === 'object';
	}
	
	/**
	 * Strict object type check. Only returns true
	 * for plain JavaScript objects.
	 *
	 * @param {*} obj
	 * @return {Boolean}
	 */
	
	var toString = Object.prototype.toString;
	var OBJECT_STRING = '[object Object]';
	
	function isPlainObject(obj) {
	  return toString.call(obj) === OBJECT_STRING;
	}
	
	/**
	 * Array type check.
	 *
	 * @param {*} obj
	 * @return {Boolean}
	 */
	
	var isArray = Array.isArray;
	
	/**
	 * Define a non-enumerable property
	 *
	 * @param {Object} obj
	 * @param {String} key
	 * @param {*} val
	 * @param {Boolean} [enumerable]
	 */
	
	function def(obj, key, val, enumerable) {
	  Object.defineProperty(obj, key, {
	    value: val,
	    enumerable: !!enumerable,
	    writable: true,
	    configurable: true
	  });
	}
	
	/**
	 * Debounce a function so it only gets called after the
	 * input stops arriving after the given wait period.
	 *
	 * @param {Function} func
	 * @param {Number} wait
	 * @return {Function} - the debounced function
	 */
	
	function _debounce(func, wait) {
	  var timeout, args, context, timestamp, result;
	  var later = function later() {
	    var last = Date.now() - timestamp;
	    if (last < wait && last >= 0) {
	      timeout = setTimeout(later, wait - last);
	    } else {
	      timeout = null;
	      result = func.apply(context, args);
	      if (!timeout) context = args = null;
	    }
	  };
	  return function () {
	    context = this;
	    args = arguments;
	    timestamp = Date.now();
	    if (!timeout) {
	      timeout = setTimeout(later, wait);
	    }
	    return result;
	  };
	}
	
	/**
	 * Manual indexOf because it's slightly faster than
	 * native.
	 *
	 * @param {Array} arr
	 * @param {*} obj
	 */
	
	function indexOf(arr, obj) {
	  var i = arr.length;
	  while (i--) {
	    if (arr[i] === obj) return i;
	  }
	  return -1;
	}
	
	/**
	 * Make a cancellable version of an async callback.
	 *
	 * @param {Function} fn
	 * @return {Function}
	 */
	
	function cancellable(fn) {
	  var cb = function cb() {
	    if (!cb.cancelled) {
	      return fn.apply(this, arguments);
	    }
	  };
	  cb.cancel = function () {
	    cb.cancelled = true;
	  };
	  return cb;
	}
	
	/**
	 * Check if two values are loosely equal - that is,
	 * if they are plain objects, do they have the same shape?
	 *
	 * @param {*} a
	 * @param {*} b
	 * @return {Boolean}
	 */
	
	function looseEqual(a, b) {
	  /* eslint-disable eqeqeq */
	  return a == b || (isObject(a) && isObject(b) ? JSON.stringify(a) === JSON.stringify(b) : false);
	  /* eslint-enable eqeqeq */
	}
	
	var hasProto = ('__proto__' in {});
	
	// Browser environment sniffing
	var inBrowser = typeof window !== 'undefined' && Object.prototype.toString.call(window) !== '[object Object]';
	
	var isIE9 = inBrowser && navigator.userAgent.toLowerCase().indexOf('msie 9.0') > 0;
	
	var isAndroid = inBrowser && navigator.userAgent.toLowerCase().indexOf('android') > 0;
	
	var transitionProp = undefined;
	var transitionEndEvent = undefined;
	var animationProp = undefined;
	var animationEndEvent = undefined;
	
	// Transition property/event sniffing
	if (inBrowser && !isIE9) {
	  var isWebkitTrans = window.ontransitionend === undefined && window.onwebkittransitionend !== undefined;
	  var isWebkitAnim = window.onanimationend === undefined && window.onwebkitanimationend !== undefined;
	  transitionProp = isWebkitTrans ? 'WebkitTransition' : 'transition';
	  transitionEndEvent = isWebkitTrans ? 'webkitTransitionEnd' : 'transitionend';
	  animationProp = isWebkitAnim ? 'WebkitAnimation' : 'animation';
	  animationEndEvent = isWebkitAnim ? 'webkitAnimationEnd' : 'animationend';
	}
	
	/**
	 * Defer a task to execute it asynchronously. Ideally this
	 * should be executed as a microtask, so we leverage
	 * MutationObserver if it's available, and fallback to
	 * setTimeout(0).
	 *
	 * @param {Function} cb
	 * @param {Object} ctx
	 */
	
	var nextTick = (function () {
	  var callbacks = [];
	  var pending = false;
	  var timerFunc;
	  function nextTickHandler() {
	    pending = false;
	    var copies = callbacks.slice(0);
	    callbacks = [];
	    for (var i = 0; i < copies.length; i++) {
	      copies[i]();
	    }
	  }
	  /* istanbul ignore if */
	  if (typeof MutationObserver !== 'undefined') {
	    var counter = 1;
	    var observer = new MutationObserver(nextTickHandler);
	    var textNode = document.createTextNode(counter);
	    observer.observe(textNode, {
	      characterData: true
	    });
	    timerFunc = function () {
	      counter = (counter + 1) % 2;
	      textNode.data = counter;
	    };
	  } else {
	    timerFunc = setTimeout;
	  }
	  return function (cb, ctx) {
	    var func = ctx ? function () {
	      cb.call(ctx);
	    } : cb;
	    callbacks.push(func);
	    if (pending) return;
	    pending = true;
	    timerFunc(nextTickHandler, 0);
	  };
	})();
	
	function Cache(limit) {
	  this.size = 0;
	  this.limit = limit;
	  this.head = this.tail = undefined;
	  this._keymap = Object.create(null);
	}
	
	var p = Cache.prototype;
	
	/**
	 * Put <value> into the cache associated with <key>.
	 * Returns the entry which was removed to make room for
	 * the new entry. Otherwise undefined is returned.
	 * (i.e. if there was enough room already).
	 *
	 * @param {String} key
	 * @param {*} value
	 * @return {Entry|undefined}
	 */
	
	p.put = function (key, value) {
	  var removed;
	  if (this.size === this.limit) {
	    removed = this.shift();
	  }
	
	  var entry = this.get(key, true);
	  if (!entry) {
	    entry = {
	      key: key
	    };
	    this._keymap[key] = entry;
	    if (this.tail) {
	      this.tail.newer = entry;
	      entry.older = this.tail;
	    } else {
	      this.head = entry;
	    }
	    this.tail = entry;
	    this.size++;
	  }
	  entry.value = value;
	
	  return removed;
	};
	
	/**
	 * Purge the least recently used (oldest) entry from the
	 * cache. Returns the removed entry or undefined if the
	 * cache was empty.
	 */
	
	p.shift = function () {
	  var entry = this.head;
	  if (entry) {
	    this.head = this.head.newer;
	    this.head.older = undefined;
	    entry.newer = entry.older = undefined;
	    this._keymap[entry.key] = undefined;
	    this.size--;
	  }
	  return entry;
	};
	
	/**
	 * Get and register recent use of <key>. Returns the value
	 * associated with <key> or undefined if not in cache.
	 *
	 * @param {String} key
	 * @param {Boolean} returnEntry
	 * @return {Entry|*}
	 */
	
	p.get = function (key, returnEntry) {
	  var entry = this._keymap[key];
	  if (entry === undefined) return;
	  if (entry === this.tail) {
	    return returnEntry ? entry : entry.value;
	  }
	  // HEAD--------------TAIL
	  //   <.older   .newer>
	  //  <--- add direction --
	  //   A  B  C  <D>  E
	  if (entry.newer) {
	    if (entry === this.head) {
	      this.head = entry.newer;
	    }
	    entry.newer.older = entry.older; // C <-- E.
	  }
	  if (entry.older) {
	    entry.older.newer = entry.newer; // C. --> E
	  }
	  entry.newer = undefined; // D --x
	  entry.older = this.tail; // D. --> E
	  if (this.tail) {
	    this.tail.newer = entry; // E. <-- D
	  }
	  this.tail = entry;
	  return returnEntry ? entry : entry.value;
	};
	
	var cache$1 = new Cache(1000);
	var filterTokenRE = /[^\s'"]+|'[^']*'|"[^"]*"/g;
	var reservedArgRE = /^in$|^-?\d+/;
	
	/**
	 * Parser state
	 */
	
	var str;
	var dir;
	var c;
	var prev;
	var i;
	var l;
	var lastFilterIndex;
	var inSingle;
	var inDouble;
	var curly;
	var square;
	var paren;
	/**
	 * Push a filter to the current directive object
	 */
	
	function pushFilter() {
	  var exp = str.slice(lastFilterIndex, i).trim();
	  var filter;
	  if (exp) {
	    filter = {};
	    var tokens = exp.match(filterTokenRE);
	    filter.name = tokens[0];
	    if (tokens.length > 1) {
	      filter.args = tokens.slice(1).map(processFilterArg);
	    }
	  }
	  if (filter) {
	    (dir.filters = dir.filters || []).push(filter);
	  }
	  lastFilterIndex = i + 1;
	}
	
	/**
	 * Check if an argument is dynamic and strip quotes.
	 *
	 * @param {String} arg
	 * @return {Object}
	 */
	
	function processFilterArg(arg) {
	  if (reservedArgRE.test(arg)) {
	    return {
	      value: toNumber(arg),
	      dynamic: false
	    };
	  } else {
	    var stripped = stripQuotes(arg);
	    var dynamic = stripped === arg;
	    return {
	      value: dynamic ? arg : stripped,
	      dynamic: dynamic
	    };
	  }
	}
	
	/**
	 * Parse a directive value and extract the expression
	 * and its filters into a descriptor.
	 *
	 * Example:
	 *
	 * "a + 1 | uppercase" will yield:
	 * {
	 *   expression: 'a + 1',
	 *   filters: [
	 *     { name: 'uppercase', args: null }
	 *   ]
	 * }
	 *
	 * @param {String} str
	 * @return {Object}
	 */
	
	function parseDirective(s) {
	
	  var hit = cache$1.get(s);
	  if (hit) {
	    return hit;
	  }
	
	  // reset parser state
	  str = s;
	  inSingle = inDouble = false;
	  curly = square = paren = 0;
	  lastFilterIndex = 0;
	  dir = {};
	
	  for (i = 0, l = str.length; i < l; i++) {
	    prev = c;
	    c = str.charCodeAt(i);
	    if (inSingle) {
	      // check single quote
	      if (c === 0x27 && prev !== 0x5C) inSingle = !inSingle;
	    } else if (inDouble) {
	      // check double quote
	      if (c === 0x22 && prev !== 0x5C) inDouble = !inDouble;
	    } else if (c === 0x7C && // pipe
	    str.charCodeAt(i + 1) !== 0x7C && str.charCodeAt(i - 1) !== 0x7C) {
	      if (dir.expression == null) {
	        // first filter, end of expression
	        lastFilterIndex = i + 1;
	        dir.expression = str.slice(0, i).trim();
	      } else {
	        // already has filter
	        pushFilter();
	      }
	    } else {
	      switch (c) {
	        case 0x22:
	          inDouble = true;break; // "
	        case 0x27:
	          inSingle = true;break; // '
	        case 0x28:
	          paren++;break; // (
	        case 0x29:
	          paren--;break; // )
	        case 0x5B:
	          square++;break; // [
	        case 0x5D:
	          square--;break; // ]
	        case 0x7B:
	          curly++;break; // {
	        case 0x7D:
	          curly--;break; // }
	      }
	    }
	  }
	
	  if (dir.expression == null) {
	    dir.expression = str.slice(0, i).trim();
	  } else if (lastFilterIndex !== 0) {
	    pushFilter();
	  }
	
	  cache$1.put(s, dir);
	  return dir;
	}
	
	var directive = Object.freeze({
	  parseDirective: parseDirective
	});
	
	var regexEscapeRE = /[-.*+?^${}()|[\]\/\\]/g;
	var cache = undefined;
	var tagRE = undefined;
	var htmlRE = undefined;
	/**
	 * Escape a string so it can be used in a RegExp
	 * constructor.
	 *
	 * @param {String} str
	 */
	
	function escapeRegex(str) {
	  return str.replace(regexEscapeRE, '\\$&');
	}
	
	function compileRegex() {
	  var open = escapeRegex(config.delimiters[0]);
	  var close = escapeRegex(config.delimiters[1]);
	  var unsafeOpen = escapeRegex(config.unsafeDelimiters[0]);
	  var unsafeClose = escapeRegex(config.unsafeDelimiters[1]);
	  tagRE = new RegExp(unsafeOpen + '(.+?)' + unsafeClose + '|' + open + '(.+?)' + close, 'g');
	  htmlRE = new RegExp('^' + unsafeOpen + '.*' + unsafeClose + '$');
	  // reset cache
	  cache = new Cache(1000);
	}
	
	/**
	 * Parse a template text string into an array of tokens.
	 *
	 * @param {String} text
	 * @return {Array<Object> | null}
	 *               - {String} type
	 *               - {String} value
	 *               - {Boolean} [html]
	 *               - {Boolean} [oneTime]
	 */
	
	function parseText(text) {
	  if (!cache) {
	    compileRegex();
	  }
	  var hit = cache.get(text);
	  if (hit) {
	    return hit;
	  }
	  text = text.replace(/\n/g, '');
	  if (!tagRE.test(text)) {
	    return null;
	  }
	  var tokens = [];
	  var lastIndex = tagRE.lastIndex = 0;
	  var match, index, html, value, first, oneTime;
	  /* eslint-disable no-cond-assign */
	  while (match = tagRE.exec(text)) {
	    /* eslint-enable no-cond-assign */
	    index = match.index;
	    // push text token
	    if (index > lastIndex) {
	      tokens.push({
	        value: text.slice(lastIndex, index)
	      });
	    }
	    // tag token
	    html = htmlRE.test(match[0]);
	    value = html ? match[1] : match[2];
	    first = value.charCodeAt(0);
	    oneTime = first === 42; // *
	    value = oneTime ? value.slice(1) : value;
	    tokens.push({
	      tag: true,
	      value: value.trim(),
	      html: html,
	      oneTime: oneTime
	    });
	    lastIndex = index + match[0].length;
	  }
	  if (lastIndex < text.length) {
	    tokens.push({
	      value: text.slice(lastIndex)
	    });
	  }
	  cache.put(text, tokens);
	  return tokens;
	}
	
	/**
	 * Format a list of tokens into an expression.
	 * e.g. tokens parsed from 'a {{b}} c' can be serialized
	 * into one single expression as '"a " + b + " c"'.
	 *
	 * @param {Array} tokens
	 * @param {Vue} [vm]
	 * @return {String}
	 */
	
	function tokensToExp(tokens, vm) {
	  if (tokens.length > 1) {
	    return tokens.map(function (token) {
	      return formatToken(token, vm);
	    }).join('+');
	  } else {
	    return formatToken(tokens[0], vm, true);
	  }
	}
	
	/**
	 * Format a single token.
	 *
	 * @param {Object} token
	 * @param {Vue} [vm]
	 * @param {Boolean} [single]
	 * @return {String}
	 */
	
	function formatToken(token, vm, single) {
	  return token.tag ? token.oneTime && vm ? '"' + vm.$eval(token.value) + '"' : inlineFilters(token.value, single) : '"' + token.value + '"';
	}
	
	/**
	 * For an attribute with multiple interpolation tags,
	 * e.g. attr="some-{{thing | filter}}", in order to combine
	 * the whole thing into a single watchable expression, we
	 * have to inline those filters. This function does exactly
	 * that. This is a bit hacky but it avoids heavy changes
	 * to directive parser and watcher mechanism.
	 *
	 * @param {String} exp
	 * @param {Boolean} single
	 * @return {String}
	 */
	
	var filterRE$1 = /[^|]\|[^|]/;
	function inlineFilters(exp, single) {
	  if (!filterRE$1.test(exp)) {
	    return single ? exp : '(' + exp + ')';
	  } else {
	    var dir = parseDirective(exp);
	    if (!dir.filters) {
	      return '(' + exp + ')';
	    } else {
	      return 'this._applyFilters(' + dir.expression + // value
	      ',null,' + // oldValue (null for read)
	      JSON.stringify(dir.filters) + // filter descriptors
	      ',false)'; // write?
	    }
	  }
	}
	
	var text$1 = Object.freeze({
	  compileRegex: compileRegex,
	  parseText: parseText,
	  tokensToExp: tokensToExp
	});
	
	var delimiters = ['{{', '}}'];
	var unsafeDelimiters = ['{{{', '}}}'];
	
	var config = Object.defineProperties({
	
	  /**
	   * Whether to print debug messages.
	   * Also enables stack trace for warnings.
	   *
	   * @type {Boolean}
	   */
	
	  debug: false,
	
	  /**
	   * Whether to suppress warnings.
	   *
	   * @type {Boolean}
	   */
	
	  silent: false,
	
	  /**
	   * Whether to use async rendering.
	   */
	
	  async: true,
	
	  /**
	   * Whether to warn against errors caught when evaluating
	   * expressions.
	   */
	
	  warnExpressionErrors: true,
	
	  /**
	   * Whether or not to handle fully object properties which
	   * are already backed by getters and seters. Depending on
	   * use case and environment, this might introduce non-neglible
	   * performance penalties.
	   */
	  convertAllProperties: false,
	
	  /**
	   * Internal flag to indicate the delimiters have been
	   * changed.
	   *
	   * @type {Boolean}
	   */
	
	  _delimitersChanged: true,
	
	  /**
	   * List of asset types that a component can own.
	   *
	   * @type {Array}
	   */
	
	  _assetTypes: ['component', 'directive', 'elementDirective', 'filter', 'transition', 'partial'],
	
	  /**
	   * prop binding modes
	   */
	
	  _propBindingModes: {
	    ONE_WAY: 0,
	    TWO_WAY: 1,
	    ONE_TIME: 2
	  },
	
	  /**
	   * Max circular updates allowed in a batcher flush cycle.
	   */
	
	  _maxUpdateCount: 100
	
	}, {
	  delimiters: { /**
	                 * Interpolation delimiters. Changing these would trigger
	                 * the text parser to re-compile the regular expressions.
	                 *
	                 * @type {Array<String>}
	                 */
	
	    get: function get() {
	      return delimiters;
	    },
	    set: function set(val) {
	      delimiters = val;
	      compileRegex();
	    },
	    configurable: true,
	    enumerable: true
	  },
	  unsafeDelimiters: {
	    get: function get() {
	      return unsafeDelimiters;
	    },
	    set: function set(val) {
	      unsafeDelimiters = val;
	      compileRegex();
	    },
	    configurable: true,
	    enumerable: true
	  }
	});
	
	var warn = undefined;
	
	if (process.env.NODE_ENV !== 'production') {
	  (function () {
	    var hasConsole = typeof console !== 'undefined';
	    warn = function (msg, e) {
	      if (hasConsole && (!config.silent || config.debug)) {
	        console.warn('[Vue warn]: ' + msg);
	        /* istanbul ignore if */
	        if (config.debug) {
	          if (e) {
	            throw e;
	          } else {
	            console.warn(new Error('Warning Stack Trace').stack);
	          }
	        }
	      }
	    };
	  })();
	}
	
	/**
	 * Append with transition.
	 *
	 * @param {Element} el
	 * @param {Element} target
	 * @param {Vue} vm
	 * @param {Function} [cb]
	 */
	
	function appendWithTransition(el, target, vm, cb) {
	  applyTransition(el, 1, function () {
	    target.appendChild(el);
	  }, vm, cb);
	}
	
	/**
	 * InsertBefore with transition.
	 *
	 * @param {Element} el
	 * @param {Element} target
	 * @param {Vue} vm
	 * @param {Function} [cb]
	 */
	
	function beforeWithTransition(el, target, vm, cb) {
	  applyTransition(el, 1, function () {
	    before(el, target);
	  }, vm, cb);
	}
	
	/**
	 * Remove with transition.
	 *
	 * @param {Element} el
	 * @param {Vue} vm
	 * @param {Function} [cb]
	 */
	
	function removeWithTransition(el, vm, cb) {
	  applyTransition(el, -1, function () {
	    remove(el);
	  }, vm, cb);
	}
	
	/**
	 * Apply transitions with an operation callback.
	 *
	 * @param {Element} el
	 * @param {Number} direction
	 *                  1: enter
	 *                 -1: leave
	 * @param {Function} op - the actual DOM operation
	 * @param {Vue} vm
	 * @param {Function} [cb]
	 */
	
	function applyTransition(el, direction, op, vm, cb) {
	  var transition = el.__v_trans;
	  if (!transition ||
	  // skip if there are no js hooks and CSS transition is
	  // not supported
	  !transition.hooks && !transitionEndEvent ||
	  // skip transitions for initial compile
	  !vm._isCompiled ||
	  // if the vm is being manipulated by a parent directive
	  // during the parent's compilation phase, skip the
	  // animation.
	  vm.$parent && !vm.$parent._isCompiled) {
	    op();
	    if (cb) cb();
	    return;
	  }
	  var action = direction > 0 ? 'enter' : 'leave';
	  transition[action](op, cb);
	}
	
	/**
	 * Query an element selector if it's not an element already.
	 *
	 * @param {String|Element} el
	 * @return {Element}
	 */
	
	function query(el) {
	  if (typeof el === 'string') {
	    var selector = el;
	    el = document.querySelector(el);
	    if (!el) {
	      process.env.NODE_ENV !== 'production' && warn('Cannot find element: ' + selector);
	    }
	  }
	  return el;
	}
	
	/**
	 * Check if a node is in the document.
	 * Note: document.documentElement.contains should work here
	 * but always returns false for comment nodes in phantomjs,
	 * making unit tests difficult. This is fixed by doing the
	 * contains() check on the node's parentNode instead of
	 * the node itself.
	 *
	 * @param {Node} node
	 * @return {Boolean}
	 */
	
	function inDoc(node) {
	  var doc = document.documentElement;
	  var parent = node && node.parentNode;
	  return doc === node || doc === parent || !!(parent && parent.nodeType === 1 && doc.contains(parent));
	}
	
	/**
	 * Get and remove an attribute from a node.
	 *
	 * @param {Node} node
	 * @param {String} _attr
	 */
	
	function getAttr(node, _attr) {
	  var val = node.getAttribute(_attr);
	  if (val !== null) {
	    node.removeAttribute(_attr);
	  }
	  return val;
	}
	
	/**
	 * Get an attribute with colon or v-bind: prefix.
	 *
	 * @param {Node} node
	 * @param {String} name
	 * @return {String|null}
	 */
	
	function getBindAttr(node, name) {
	  var val = getAttr(node, ':' + name);
	  if (val === null) {
	    val = getAttr(node, 'v-bind:' + name);
	  }
	  return val;
	}
	
	/**
	 * Check the presence of a bind attribute.
	 *
	 * @param {Node} node
	 * @param {String} name
	 * @return {Boolean}
	 */
	
	function hasBindAttr(node, name) {
	  return node.hasAttribute(name) || node.hasAttribute(':' + name) || node.hasAttribute('v-bind:' + name);
	}
	
	/**
	 * Insert el before target
	 *
	 * @param {Element} el
	 * @param {Element} target
	 */
	
	function before(el, target) {
	  target.parentNode.insertBefore(el, target);
	}
	
	/**
	 * Insert el after target
	 *
	 * @param {Element} el
	 * @param {Element} target
	 */
	
	function after(el, target) {
	  if (target.nextSibling) {
	    before(el, target.nextSibling);
	  } else {
	    target.parentNode.appendChild(el);
	  }
	}
	
	/**
	 * Remove el from DOM
	 *
	 * @param {Element} el
	 */
	
	function remove(el) {
	  el.parentNode.removeChild(el);
	}
	
	/**
	 * Prepend el to target
	 *
	 * @param {Element} el
	 * @param {Element} target
	 */
	
	function prepend(el, target) {
	  if (target.firstChild) {
	    before(el, target.firstChild);
	  } else {
	    target.appendChild(el);
	  }
	}
	
	/**
	 * Replace target with el
	 *
	 * @param {Element} target
	 * @param {Element} el
	 */
	
	function replace(target, el) {
	  var parent = target.parentNode;
	  if (parent) {
	    parent.replaceChild(el, target);
	  }
	}
	
	/**
	 * Add event listener shorthand.
	 *
	 * @param {Element} el
	 * @param {String} event
	 * @param {Function} cb
	 */
	
	function on$1(el, event, cb) {
	  el.addEventListener(event, cb);
	}
	
	/**
	 * Remove event listener shorthand.
	 *
	 * @param {Element} el
	 * @param {String} event
	 * @param {Function} cb
	 */
	
	function off(el, event, cb) {
	  el.removeEventListener(event, cb);
	}
	
	/**
	 * In IE9, setAttribute('class') will result in empty class
	 * if the element also has the :class attribute; However in
	 * PhantomJS, setting `className` does not work on SVG elements...
	 * So we have to do a conditional check here.
	 *
	 * @param {Element} el
	 * @param {String} cls
	 */
	
	function setClass(el, cls) {
	  /* istanbul ignore if */
	  if (isIE9 && !(el instanceof SVGElement)) {
	    el.className = cls;
	  } else {
	    el.setAttribute('class', cls);
	  }
	}
	
	/**
	 * Add class with compatibility for IE & SVG
	 *
	 * @param {Element} el
	 * @param {String} cls
	 */
	
	function addClass(el, cls) {
	  if (el.classList) {
	    el.classList.add(cls);
	  } else {
	    var cur = ' ' + (el.getAttribute('class') || '') + ' ';
	    if (cur.indexOf(' ' + cls + ' ') < 0) {
	      setClass(el, (cur + cls).trim());
	    }
	  }
	}
	
	/**
	 * Remove class with compatibility for IE & SVG
	 *
	 * @param {Element} el
	 * @param {String} cls
	 */
	
	function removeClass(el, cls) {
	  if (el.classList) {
	    el.classList.remove(cls);
	  } else {
	    var cur = ' ' + (el.getAttribute('class') || '') + ' ';
	    var tar = ' ' + cls + ' ';
	    while (cur.indexOf(tar) >= 0) {
	      cur = cur.replace(tar, ' ');
	    }
	    setClass(el, cur.trim());
	  }
	  if (!el.className) {
	    el.removeAttribute('class');
	  }
	}
	
	/**
	 * Extract raw content inside an element into a temporary
	 * container div
	 *
	 * @param {Element} el
	 * @param {Boolean} asFragment
	 * @return {Element}
	 */
	
	function extractContent(el, asFragment) {
	  var child;
	  var rawContent;
	  /* istanbul ignore if */
	  if (isTemplate(el) && el.content instanceof DocumentFragment) {
	    el = el.content;
	  }
	  if (el.hasChildNodes()) {
	    trimNode(el);
	    rawContent = asFragment ? document.createDocumentFragment() : document.createElement('div');
	    /* eslint-disable no-cond-assign */
	    while (child = el.firstChild) {
	      /* eslint-enable no-cond-assign */
	      rawContent.appendChild(child);
	    }
	  }
	  return rawContent;
	}
	
	/**
	 * Trim possible empty head/tail textNodes inside a parent.
	 *
	 * @param {Node} node
	 */
	
	function trimNode(node) {
	  trim(node, node.firstChild);
	  trim(node, node.lastChild);
	}
	
	function trim(parent, node) {
	  if (node && node.nodeType === 3 && !node.data.trim()) {
	    parent.removeChild(node);
	  }
	}
	
	/**
	 * Check if an element is a template tag.
	 * Note if the template appears inside an SVG its tagName
	 * will be in lowercase.
	 *
	 * @param {Element} el
	 */
	
	function isTemplate(el) {
	  return el.tagName && el.tagName.toLowerCase() === 'template';
	}
	
	/**
	 * Create an "anchor" for performing dom insertion/removals.
	 * This is used in a number of scenarios:
	 * - fragment instance
	 * - v-html
	 * - v-if
	 * - v-for
	 * - component
	 *
	 * @param {String} content
	 * @param {Boolean} persist - IE trashes empty textNodes on
	 *                            cloneNode(true), so in certain
	 *                            cases the anchor needs to be
	 *                            non-empty to be persisted in
	 *                            templates.
	 * @return {Comment|Text}
	 */
	
	function createAnchor(content, persist) {
	  var anchor = config.debug ? document.createComment(content) : document.createTextNode(persist ? ' ' : '');
	  anchor.__vue_anchor = true;
	  return anchor;
	}
	
	/**
	 * Find a component ref attribute that starts with $.
	 *
	 * @param {Element} node
	 * @return {String|undefined}
	 */
	
	var refRE = /^v-ref:/;
	
	function findRef(node) {
	  if (node.hasAttributes()) {
	    var attrs = node.attributes;
	    for (var i = 0, l = attrs.length; i < l; i++) {
	      var name = attrs[i].name;
	      if (refRE.test(name)) {
	        return camelize(name.replace(refRE, ''));
	      }
	    }
	  }
	}
	
	/**
	 * Map a function to a range of nodes .
	 *
	 * @param {Node} node
	 * @param {Node} end
	 * @param {Function} op
	 */
	
	function mapNodeRange(node, end, op) {
	  var next;
	  while (node !== end) {
	    next = node.nextSibling;
	    op(node);
	    node = next;
	  }
	  op(end);
	}
	
	/**
	 * Remove a range of nodes with transition, store
	 * the nodes in a fragment with correct ordering,
	 * and call callback when done.
	 *
	 * @param {Node} start
	 * @param {Node} end
	 * @param {Vue} vm
	 * @param {DocumentFragment} frag
	 * @param {Function} cb
	 */
	
	function removeNodeRange(start, end, vm, frag, cb) {
	  var done = false;
	  var removed = 0;
	  var nodes = [];
	  mapNodeRange(start, end, function (node) {
	    if (node === end) done = true;
	    nodes.push(node);
	    removeWithTransition(node, vm, onRemoved);
	  });
	  function onRemoved() {
	    removed++;
	    if (done && removed >= nodes.length) {
	      for (var i = 0; i < nodes.length; i++) {
	        frag.appendChild(nodes[i]);
	      }
	      cb && cb();
	    }
	  }
	}
	
	var commonTagRE = /^(div|p|span|img|a|b|i|br|ul|ol|li|h1|h2|h3|h4|h5|h6|code|pre|table|th|td|tr|form|label|input|select|option|nav|article|section|header|footer)$/;
	var reservedTagRE = /^(slot|partial|component)$/;
	
	/**
	 * Check if an element is a component, if yes return its
	 * component id.
	 *
	 * @param {Element} el
	 * @param {Object} options
	 * @return {Object|undefined}
	 */
	
	function checkComponentAttr(el, options) {
	  var tag = el.tagName.toLowerCase();
	  var hasAttrs = el.hasAttributes();
	  if (!commonTagRE.test(tag) && !reservedTagRE.test(tag)) {
	    if (resolveAsset(options, 'components', tag)) {
	      return { id: tag };
	    } else {
	      var is = hasAttrs && getIsBinding(el);
	      if (is) {
	        return is;
	      } else if (process.env.NODE_ENV !== 'production') {
	        if (tag.indexOf('-') > -1 || /HTMLUnknownElement/.test(el.toString()) &&
	        // Chrome returns unknown for several HTML5 elements.
	        // https://code.google.com/p/chromium/issues/detail?id=540526
	        !/^(data|time|rtc|rb)$/.test(tag)) {
	          warn('Unknown custom element: <' + tag + '> - did you ' + 'register the component correctly?');
	        }
	      }
	    }
	  } else if (hasAttrs) {
	    return getIsBinding(el);
	  }
	}
	
	/**
	 * Get "is" binding from an element.
	 *
	 * @param {Element} el
	 * @return {Object|undefined}
	 */
	
	function getIsBinding(el) {
	  // dynamic syntax
	  var exp = getAttr(el, 'is');
	  if (exp != null) {
	    return { id: exp };
	  } else {
	    exp = getBindAttr(el, 'is');
	    if (exp != null) {
	      return { id: exp, dynamic: true };
	    }
	  }
	}
	
	/**
	 * Set a prop's initial value on a vm and its data object.
	 *
	 * @param {Vue} vm
	 * @param {Object} prop
	 * @param {*} value
	 */
	
	function initProp(vm, prop, value) {
	  var key = prop.path;
	  value = coerceProp(prop, value);
	  vm[key] = vm._data[key] = assertProp(prop, value) ? value : undefined;
	}
	
	/**
	 * Assert whether a prop is valid.
	 *
	 * @param {Object} prop
	 * @param {*} value
	 */
	
	function assertProp(prop, value) {
	  // if a prop is not provided and is not required,
	  // skip the check.
	  if (prop.raw === null && !prop.required) {
	    return true;
	  }
	  var options = prop.options;
	  var type = options.type;
	  var valid = true;
	  var expectedType;
	  if (type) {
	    if (type === String) {
	      expectedType = 'string';
	      valid = typeof value === expectedType;
	    } else if (type === Number) {
	      expectedType = 'number';
	      valid = typeof value === 'number';
	    } else if (type === Boolean) {
	      expectedType = 'boolean';
	      valid = typeof value === 'boolean';
	    } else if (type === Function) {
	      expectedType = 'function';
	      valid = typeof value === 'function';
	    } else if (type === Object) {
	      expectedType = 'object';
	      valid = isPlainObject(value);
	    } else if (type === Array) {
	      expectedType = 'array';
	      valid = isArray(value);
	    } else {
	      valid = value instanceof type;
	    }
	  }
	  if (!valid) {
	    process.env.NODE_ENV !== 'production' && warn('Invalid prop: type check failed for ' + prop.path + '="' + prop.raw + '".' + ' Expected ' + formatType(expectedType) + ', got ' + formatValue(value) + '.');
	    return false;
	  }
	  var validator = options.validator;
	  if (validator) {
	    if (!validator.call(null, value)) {
	      process.env.NODE_ENV !== 'production' && warn('Invalid prop: custom validator check failed for ' + prop.path + '="' + prop.raw + '"');
	      return false;
	    }
	  }
	  return true;
	}
	
	/**
	 * Force parsing value with coerce option.
	 *
	 * @param {*} value
	 * @param {Object} options
	 * @return {*}
	 */
	
	function coerceProp(prop, value) {
	  var coerce = prop.options.coerce;
	  if (!coerce) {
	    return value;
	  }
	  // coerce is a function
	  return coerce(value);
	}
	
	function formatType(val) {
	  return val ? val.charAt(0).toUpperCase() + val.slice(1) : 'custom type';
	}
	
	function formatValue(val) {
	  return Object.prototype.toString.call(val).slice(8, -1);
	}
	
	/**
	 * Option overwriting strategies are functions that handle
	 * how to merge a parent option value and a child option
	 * value into the final value.
	 *
	 * All strategy functions follow the same signature:
	 *
	 * @param {*} parentVal
	 * @param {*} childVal
	 * @param {Vue} [vm]
	 */
	
	var strats = config.optionMergeStrategies = Object.create(null);
	
	/**
	 * Helper that recursively merges two data objects together.
	 */
	
	function mergeData(to, from) {
	  var key, toVal, fromVal;
	  for (key in from) {
	    toVal = to[key];
	    fromVal = from[key];
	    if (!hasOwn(to, key)) {
	      set(to, key, fromVal);
	    } else if (isObject(toVal) && isObject(fromVal)) {
	      mergeData(toVal, fromVal);
	    }
	  }
	  return to;
	}
	
	/**
	 * Data
	 */
	
	strats.data = function (parentVal, childVal, vm) {
	  if (!vm) {
	    // in a Vue.extend merge, both should be functions
	    if (!childVal) {
	      return parentVal;
	    }
	    if (typeof childVal !== 'function') {
	      process.env.NODE_ENV !== 'production' && warn('The "data" option should be a function ' + 'that returns a per-instance value in component ' + 'definitions.');
	      return parentVal;
	    }
	    if (!parentVal) {
	      return childVal;
	    }
	    // when parentVal & childVal are both present,
	    // we need to return a function that returns the
	    // merged result of both functions... no need to
	    // check if parentVal is a function here because
	    // it has to be a function to pass previous merges.
	    return function mergedDataFn() {
	      return mergeData(childVal.call(this), parentVal.call(this));
	    };
	  } else if (parentVal || childVal) {
	    return function mergedInstanceDataFn() {
	      // instance merge
	      var instanceData = typeof childVal === 'function' ? childVal.call(vm) : childVal;
	      var defaultData = typeof parentVal === 'function' ? parentVal.call(vm) : undefined;
	      if (instanceData) {
	        return mergeData(instanceData, defaultData);
	      } else {
	        return defaultData;
	      }
	    };
	  }
	};
	
	/**
	 * El
	 */
	
	strats.el = function (parentVal, childVal, vm) {
	  if (!vm && childVal && typeof childVal !== 'function') {
	    process.env.NODE_ENV !== 'production' && warn('The "el" option should be a function ' + 'that returns a per-instance value in component ' + 'definitions.');
	    return;
	  }
	  var ret = childVal || parentVal;
	  // invoke the element factory if this is instance merge
	  return vm && typeof ret === 'function' ? ret.call(vm) : ret;
	};
	
	/**
	 * Hooks and param attributes are merged as arrays.
	 */
	
	strats.init = strats.created = strats.ready = strats.attached = strats.detached = strats.beforeCompile = strats.compiled = strats.beforeDestroy = strats.destroyed = function (parentVal, childVal) {
	  return childVal ? parentVal ? parentVal.concat(childVal) : isArray(childVal) ? childVal : [childVal] : parentVal;
	};
	
	/**
	 * 0.11 deprecation warning
	 */
	
	strats.paramAttributes = function () {
	  /* istanbul ignore next */
	  process.env.NODE_ENV !== 'production' && warn('"paramAttributes" option has been deprecated in 0.12. ' + 'Use "props" instead.');
	};
	
	/**
	 * Assets
	 *
	 * When a vm is present (instance creation), we need to do
	 * a three-way merge between constructor options, instance
	 * options and parent options.
	 */
	
	function mergeAssets(parentVal, childVal) {
	  var res = Object.create(parentVal);
	  return childVal ? extend(res, guardArrayAssets(childVal)) : res;
	}
	
	config._assetTypes.forEach(function (type) {
	  strats[type + 's'] = mergeAssets;
	});
	
	/**
	 * Events & Watchers.
	 *
	 * Events & watchers hashes should not overwrite one
	 * another, so we merge them as arrays.
	 */
	
	strats.watch = strats.events = function (parentVal, childVal) {
	  if (!childVal) return parentVal;
	  if (!parentVal) return childVal;
	  var ret = {};
	  extend(ret, parentVal);
	  for (var key in childVal) {
	    var parent = ret[key];
	    var child = childVal[key];
	    if (parent && !isArray(parent)) {
	      parent = [parent];
	    }
	    ret[key] = parent ? parent.concat(child) : [child];
	  }
	  return ret;
	};
	
	/**
	 * Other object hashes.
	 */
	
	strats.props = strats.methods = strats.computed = function (parentVal, childVal) {
	  if (!childVal) return parentVal;
	  if (!parentVal) return childVal;
	  var ret = Object.create(null);
	  extend(ret, parentVal);
	  extend(ret, childVal);
	  return ret;
	};
	
	/**
	 * Default strategy.
	 */
	
	var defaultStrat = function defaultStrat(parentVal, childVal) {
	  return childVal === undefined ? parentVal : childVal;
	};
	
	/**
	 * Make sure component options get converted to actual
	 * constructors.
	 *
	 * @param {Object} options
	 */
	
	function guardComponents(options) {
	  if (options.components) {
	    var components = options.components = guardArrayAssets(options.components);
	    var def;
	    var ids = Object.keys(components);
	    for (var i = 0, l = ids.length; i < l; i++) {
	      var key = ids[i];
	      if (commonTagRE.test(key) || reservedTagRE.test(key)) {
	        process.env.NODE_ENV !== 'production' && warn('Do not use built-in or reserved HTML elements as component ' + 'id: ' + key);
	        continue;
	      }
	      def = components[key];
	      if (isPlainObject(def)) {
	        components[key] = Vue.extend(def);
	      }
	    }
	  }
	}
	
	/**
	 * Ensure all props option syntax are normalized into the
	 * Object-based format.
	 *
	 * @param {Object} options
	 */
	
	function guardProps(options) {
	  var props = options.props;
	  var i, val;
	  if (isArray(props)) {
	    options.props = {};
	    i = props.length;
	    while (i--) {
	      val = props[i];
	      if (typeof val === 'string') {
	        options.props[val] = null;
	      } else if (val.name) {
	        options.props[val.name] = val;
	      }
	    }
	  } else if (isPlainObject(props)) {
	    var keys = Object.keys(props);
	    i = keys.length;
	    while (i--) {
	      val = props[keys[i]];
	      if (typeof val === 'function') {
	        props[keys[i]] = { type: val };
	      }
	    }
	  }
	}
	
	/**
	 * Guard an Array-format assets option and converted it
	 * into the key-value Object format.
	 *
	 * @param {Object|Array} assets
	 * @return {Object}
	 */
	
	function guardArrayAssets(assets) {
	  if (isArray(assets)) {
	    var res = {};
	    var i = assets.length;
	    var asset;
	    while (i--) {
	      asset = assets[i];
	      var id = typeof asset === 'function' ? asset.options && asset.options.name || asset.id : asset.name || asset.id;
	      if (!id) {
	        process.env.NODE_ENV !== 'production' && warn('Array-syntax assets must provide a "name" or "id" field.');
	      } else {
	        res[id] = asset;
	      }
	    }
	    return res;
	  }
	  return assets;
	}
	
	/**
	 * Merge two option objects into a new one.
	 * Core utility used in both instantiation and inheritance.
	 *
	 * @param {Object} parent
	 * @param {Object} child
	 * @param {Vue} [vm] - if vm is present, indicates this is
	 *                     an instantiation merge.
	 */
	
	function mergeOptions(parent, child, vm) {
	  guardComponents(child);
	  guardProps(child);
	  var options = {};
	  var key;
	  if (child.mixins) {
	    for (var i = 0, l = child.mixins.length; i < l; i++) {
	      parent = mergeOptions(parent, child.mixins[i], vm);
	    }
	  }
	  for (key in parent) {
	    mergeField(key);
	  }
	  for (key in child) {
	    if (!hasOwn(parent, key)) {
	      mergeField(key);
	    }
	  }
	  function mergeField(key) {
	    var strat = strats[key] || defaultStrat;
	    options[key] = strat(parent[key], child[key], vm, key);
	  }
	  return options;
	}
	
	/**
	 * Resolve an asset.
	 * This function is used because child instances need access
	 * to assets defined in its ancestor chain.
	 *
	 * @param {Object} options
	 * @param {String} type
	 * @param {String} id
	 * @return {Object|Function}
	 */
	
	function resolveAsset(options, type, id) {
	  var assets = options[type];
	  var camelizedId;
	  return assets[id] ||
	  // camelCase ID
	  assets[camelizedId = camelize(id)] ||
	  // Pascal Case ID
	  assets[camelizedId.charAt(0).toUpperCase() + camelizedId.slice(1)];
	}
	
	/**
	 * Assert asset exists
	 */
	
	function assertAsset(val, type, id) {
	  if (!val) {
	    process.env.NODE_ENV !== 'production' && warn('Failed to resolve ' + type + ': ' + id);
	  }
	}
	
	var arrayProto = Array.prototype;
	var arrayMethods = Object.create(arrayProto)
	
	/**
	 * Intercept mutating methods and emit events
	 */
	
	;['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse'].forEach(function (method) {
	  // cache original method
	  var original = arrayProto[method];
	  def(arrayMethods, method, function mutator() {
	    // avoid leaking arguments:
	    // http://jsperf.com/closure-with-arguments
	    var i = arguments.length;
	    var args = new Array(i);
	    while (i--) {
	      args[i] = arguments[i];
	    }
	    var result = original.apply(this, args);
	    var ob = this.__ob__;
	    var inserted;
	    switch (method) {
	      case 'push':
	        inserted = args;
	        break;
	      case 'unshift':
	        inserted = args;
	        break;
	      case 'splice':
	        inserted = args.slice(2);
	        break;
	    }
	    if (inserted) ob.observeArray(inserted);
	    // notify change
	    ob.dep.notify();
	    return result;
	  });
	});
	
	/**
	 * Swap the element at the given index with a new value
	 * and emits corresponding event.
	 *
	 * @param {Number} index
	 * @param {*} val
	 * @return {*} - replaced element
	 */
	
	def(arrayProto, '$set', function $set(index, val) {
	  if (index >= this.length) {
	    this.length = Number(index) + 1;
	  }
	  return this.splice(index, 1, val)[0];
	});
	
	/**
	 * Convenience method to remove the element at given index.
	 *
	 * @param {Number} index
	 * @param {*} val
	 */
	
	def(arrayProto, '$remove', function $remove(item) {
	  /* istanbul ignore if */
	  if (!this.length) return;
	  var index = indexOf(this, item);
	  if (index > -1) {
	    return this.splice(index, 1);
	  }
	});
	
	var uid$3 = 0;
	
	/**
	 * A dep is an observable that can have multiple
	 * directives subscribing to it.
	 *
	 * @constructor
	 */
	function Dep() {
	  this.id = uid$3++;
	  this.subs = [];
	}
	
	// the current target watcher being evaluated.
	// this is globally unique because there could be only one
	// watcher being evaluated at any time.
	Dep.target = null;
	
	/**
	 * Add a directive subscriber.
	 *
	 * @param {Directive} sub
	 */
	
	Dep.prototype.addSub = function (sub) {
	  this.subs.push(sub);
	};
	
	/**
	 * Remove a directive subscriber.
	 *
	 * @param {Directive} sub
	 */
	
	Dep.prototype.removeSub = function (sub) {
	  this.subs.$remove(sub);
	};
	
	/**
	 * Add self as a dependency to the target watcher.
	 */
	
	Dep.prototype.depend = function () {
	  Dep.target.addDep(this);
	};
	
	/**
	 * Notify all subscribers of a new value.
	 */
	
	Dep.prototype.notify = function () {
	  // stablize the subscriber list first
	  var subs = toArray(this.subs);
	  for (var i = 0, l = subs.length; i < l; i++) {
	    subs[i].update();
	  }
	};
	
	var arrayKeys = Object.getOwnPropertyNames(arrayMethods);
	
	/**
	 * Observer class that are attached to each observed
	 * object. Once attached, the observer converts target
	 * object's property keys into getter/setters that
	 * collect dependencies and dispatches updates.
	 *
	 * @param {Array|Object} value
	 * @constructor
	 */
	
	function Observer(value) {
	  this.value = value;
	  this.dep = new Dep();
	  def(value, '__ob__', this);
	  if (isArray(value)) {
	    var augment = hasProto ? protoAugment : copyAugment;
	    augment(value, arrayMethods, arrayKeys);
	    this.observeArray(value);
	  } else {
	    this.walk(value);
	  }
	}
	
	// Instance methods
	
	/**
	 * Walk through each property and convert them into
	 * getter/setters. This method should only be called when
	 * value type is Object.
	 *
	 * @param {Object} obj
	 */
	
	Observer.prototype.walk = function (obj) {
	  var keys = Object.keys(obj);
	  for (var i = 0, l = keys.length; i < l; i++) {
	    this.convert(keys[i], obj[keys[i]]);
	  }
	};
	
	/**
	 * Observe a list of Array items.
	 *
	 * @param {Array} items
	 */
	
	Observer.prototype.observeArray = function (items) {
	  for (var i = 0, l = items.length; i < l; i++) {
	    observe(items[i]);
	  }
	};
	
	/**
	 * Convert a property into getter/setter so we can emit
	 * the events when the property is accessed/changed.
	 *
	 * @param {String} key
	 * @param {*} val
	 */
	
	Observer.prototype.convert = function (key, val) {
	  defineReactive(this.value, key, val);
	};
	
	/**
	 * Add an owner vm, so that when $set/$delete mutations
	 * happen we can notify owner vms to proxy the keys and
	 * digest the watchers. This is only called when the object
	 * is observed as an instance's root $data.
	 *
	 * @param {Vue} vm
	 */
	
	Observer.prototype.addVm = function (vm) {
	  (this.vms || (this.vms = [])).push(vm);
	};
	
	/**
	 * Remove an owner vm. This is called when the object is
	 * swapped out as an instance's $data object.
	 *
	 * @param {Vue} vm
	 */
	
	Observer.prototype.removeVm = function (vm) {
	  this.vms.$remove(vm);
	};
	
	// helpers
	
	/**
	 * Augment an target Object or Array by intercepting
	 * the prototype chain using __proto__
	 *
	 * @param {Object|Array} target
	 * @param {Object} proto
	 */
	
	function protoAugment(target, src) {
	  target.__proto__ = src;
	}
	
	/**
	 * Augment an target Object or Array by defining
	 * hidden properties.
	 *
	 * @param {Object|Array} target
	 * @param {Object} proto
	 */
	
	function copyAugment(target, src, keys) {
	  for (var i = 0, l = keys.length; i < l; i++) {
	    var key = keys[i];
	    def(target, key, src[key]);
	  }
	}
	
	/**
	 * Attempt to create an observer instance for a value,
	 * returns the new observer if successfully observed,
	 * or the existing observer if the value already has one.
	 *
	 * @param {*} value
	 * @param {Vue} [vm]
	 * @return {Observer|undefined}
	 * @static
	 */
	
	function observe(value, vm) {
	  if (!value || typeof value !== 'object') {
	    return;
	  }
	  var ob;
	  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
	    ob = value.__ob__;
	  } else if ((isArray(value) || isPlainObject(value)) && Object.isExtensible(value) && !value._isVue) {
	    ob = new Observer(value);
	  }
	  if (ob && vm) {
	    ob.addVm(vm);
	  }
	  return ob;
	}
	
	/**
	 * Define a reactive property on an Object.
	 *
	 * @param {Object} obj
	 * @param {String} key
	 * @param {*} val
	 */
	
	function defineReactive(obj, key, val) {
	  var dep = new Dep();
	
	  // cater for pre-defined getter/setters
	  var getter, setter;
	  if (config.convertAllProperties) {
	    var property = Object.getOwnPropertyDescriptor(obj, key);
	    if (property && property.configurable === false) {
	      return;
	    }
	    getter = property && property.get;
	    setter = property && property.set;
	  }
	
	  var childOb = observe(val);
	  Object.defineProperty(obj, key, {
	    enumerable: true,
	    configurable: true,
	    get: function reactiveGetter() {
	      var value = getter ? getter.call(obj) : val;
	      if (Dep.target) {
	        dep.depend();
	        if (childOb) {
	          childOb.dep.depend();
	        }
	        if (isArray(value)) {
	          for (var e, i = 0, l = value.length; i < l; i++) {
	            e = value[i];
	            e && e.__ob__ && e.__ob__.dep.depend();
	          }
	        }
	      }
	      return value;
	    },
	    set: function reactiveSetter(newVal) {
	      var value = getter ? getter.call(obj) : val;
	      if (newVal === value) {
	        return;
	      }
	      if (setter) {
	        setter.call(obj, newVal);
	      } else {
	        val = newVal;
	      }
	      childOb = observe(newVal);
	      dep.notify();
	    }
	  });
	}
	
	var util = Object.freeze({
		defineReactive: defineReactive,
		set: set,
		del: del,
		hasOwn: hasOwn,
		isLiteral: isLiteral,
		isReserved: isReserved,
		_toString: _toString,
		toNumber: toNumber,
		toBoolean: toBoolean,
		stripQuotes: stripQuotes,
		camelize: camelize,
		hyphenate: hyphenate,
		classify: classify,
		bind: bind$1,
		toArray: toArray,
		extend: extend,
		isObject: isObject,
		isPlainObject: isPlainObject,
		def: def,
		debounce: _debounce,
		indexOf: indexOf,
		cancellable: cancellable,
		looseEqual: looseEqual,
		isArray: isArray,
		hasProto: hasProto,
		inBrowser: inBrowser,
		isIE9: isIE9,
		isAndroid: isAndroid,
		get transitionProp () { return transitionProp; },
		get transitionEndEvent () { return transitionEndEvent; },
		get animationProp () { return animationProp; },
		get animationEndEvent () { return animationEndEvent; },
		nextTick: nextTick,
		query: query,
		inDoc: inDoc,
		getAttr: getAttr,
		getBindAttr: getBindAttr,
		hasBindAttr: hasBindAttr,
		before: before,
		after: after,
		remove: remove,
		prepend: prepend,
		replace: replace,
		on: on$1,
		off: off,
		setClass: setClass,
		addClass: addClass,
		removeClass: removeClass,
		extractContent: extractContent,
		trimNode: trimNode,
		isTemplate: isTemplate,
		createAnchor: createAnchor,
		findRef: findRef,
		mapNodeRange: mapNodeRange,
		removeNodeRange: removeNodeRange,
		mergeOptions: mergeOptions,
		resolveAsset: resolveAsset,
		assertAsset: assertAsset,
		checkComponentAttr: checkComponentAttr,
		initProp: initProp,
		assertProp: assertProp,
		coerceProp: coerceProp,
		commonTagRE: commonTagRE,
		reservedTagRE: reservedTagRE,
		get warn () { return warn; }
	});
	
	var uid = 0;
	
	function initMixin (Vue) {
	
	  /**
	   * The main init sequence. This is called for every
	   * instance, including ones that are created from extended
	   * constructors.
	   *
	   * @param {Object} options - this options object should be
	   *                           the result of merging class
	   *                           options and the options passed
	   *                           in to the constructor.
	   */
	
	  Vue.prototype._init = function (options) {
	
	    options = options || {};
	
	    this.$el = null;
	    this.$parent = options.parent;
	    this.$root = this.$parent ? this.$parent.$root : this;
	    this.$children = [];
	    this.$refs = {}; // child vm references
	    this.$els = {}; // element references
	    this._watchers = []; // all watchers as an array
	    this._directives = []; // all directives
	
	    // a uid
	    this._uid = uid++;
	
	    // a flag to avoid this being observed
	    this._isVue = true;
	
	    // events bookkeeping
	    this._events = {}; // registered callbacks
	    this._eventsCount = {}; // for $broadcast optimization
	
	    // fragment instance properties
	    this._isFragment = false;
	    this._fragment = // @type {DocumentFragment}
	    this._fragmentStart = // @type {Text|Comment}
	    this._fragmentEnd = null; // @type {Text|Comment}
	
	    // lifecycle state
	    this._isCompiled = this._isDestroyed = this._isReady = this._isAttached = this._isBeingDestroyed = false;
	    this._unlinkFn = null;
	
	    // context:
	    // if this is a transcluded component, context
	    // will be the common parent vm of this instance
	    // and its host.
	    this._context = options._context || this.$parent;
	
	    // scope:
	    // if this is inside an inline v-for, the scope
	    // will be the intermediate scope created for this
	    // repeat fragment. this is used for linking props
	    // and container directives.
	    this._scope = options._scope;
	
	    // fragment:
	    // if this instance is compiled inside a Fragment, it
	    // needs to reigster itself as a child of that fragment
	    // for attach/detach to work properly.
	    this._frag = options._frag;
	    if (this._frag) {
	      this._frag.children.push(this);
	    }
	
	    // push self into parent / transclusion host
	    if (this.$parent) {
	      this.$parent.$children.push(this);
	    }
	
	    // merge options.
	    options = this.$options = mergeOptions(this.constructor.options, options, this);
	
	    // set ref
	    this._updateRef();
	
	    // initialize data as empty object.
	    // it will be filled up in _initScope().
	    this._data = {};
	
	    // call init hook
	    this._callHook('init');
	
	    // initialize data observation and scope inheritance.
	    this._initState();
	
	    // setup event system and option events.
	    this._initEvents();
	
	    // call created hook
	    this._callHook('created');
	
	    // if `el` option is passed, start compilation.
	    if (options.el) {
	      this.$mount(options.el);
	    }
	  };
	}
	
	var pathCache = new Cache(1000);
	
	// actions
	var APPEND = 0;
	var PUSH = 1;
	var INC_SUB_PATH_DEPTH = 2;
	var PUSH_SUB_PATH = 3;
	
	// states
	var BEFORE_PATH = 0;
	var IN_PATH = 1;
	var BEFORE_IDENT = 2;
	var IN_IDENT = 3;
	var IN_SUB_PATH = 4;
	var IN_SINGLE_QUOTE = 5;
	var IN_DOUBLE_QUOTE = 6;
	var AFTER_PATH = 7;
	var ERROR = 8;
	
	var pathStateMachine = [];
	
	pathStateMachine[BEFORE_PATH] = {
	  'ws': [BEFORE_PATH],
	  'ident': [IN_IDENT, APPEND],
	  '[': [IN_SUB_PATH],
	  'eof': [AFTER_PATH]
	};
	
	pathStateMachine[IN_PATH] = {
	  'ws': [IN_PATH],
	  '.': [BEFORE_IDENT],
	  '[': [IN_SUB_PATH],
	  'eof': [AFTER_PATH]
	};
	
	pathStateMachine[BEFORE_IDENT] = {
	  'ws': [BEFORE_IDENT],
	  'ident': [IN_IDENT, APPEND]
	};
	
	pathStateMachine[IN_IDENT] = {
	  'ident': [IN_IDENT, APPEND],
	  '0': [IN_IDENT, APPEND],
	  'number': [IN_IDENT, APPEND],
	  'ws': [IN_PATH, PUSH],
	  '.': [BEFORE_IDENT, PUSH],
	  '[': [IN_SUB_PATH, PUSH],
	  'eof': [AFTER_PATH, PUSH]
	};
	
	pathStateMachine[IN_SUB_PATH] = {
	  "'": [IN_SINGLE_QUOTE, APPEND],
	  '"': [IN_DOUBLE_QUOTE, APPEND],
	  '[': [IN_SUB_PATH, INC_SUB_PATH_DEPTH],
	  ']': [IN_PATH, PUSH_SUB_PATH],
	  'eof': ERROR,
	  'else': [IN_SUB_PATH, APPEND]
	};
	
	pathStateMachine[IN_SINGLE_QUOTE] = {
	  "'": [IN_SUB_PATH, APPEND],
	  'eof': ERROR,
	  'else': [IN_SINGLE_QUOTE, APPEND]
	};
	
	pathStateMachine[IN_DOUBLE_QUOTE] = {
	  '"': [IN_SUB_PATH, APPEND],
	  'eof': ERROR,
	  'else': [IN_DOUBLE_QUOTE, APPEND]
	};
	
	/**
	 * Determine the type of a character in a keypath.
	 *
	 * @param {Char} ch
	 * @return {String} type
	 */
	
	function getPathCharType(ch) {
	  if (ch === undefined) {
	    return 'eof';
	  }
	
	  var code = ch.charCodeAt(0);
	
	  switch (code) {
	    case 0x5B: // [
	    case 0x5D: // ]
	    case 0x2E: // .
	    case 0x22: // "
	    case 0x27: // '
	    case 0x30:
	      // 0
	      return ch;
	
	    case 0x5F: // _
	    case 0x24:
	      // $
	      return 'ident';
	
	    case 0x20: // Space
	    case 0x09: // Tab
	    case 0x0A: // Newline
	    case 0x0D: // Return
	    case 0xA0: // No-break space
	    case 0xFEFF: // Byte Order Mark
	    case 0x2028: // Line Separator
	    case 0x2029:
	      // Paragraph Separator
	      return 'ws';
	  }
	
	  // a-z, A-Z
	  if (code >= 0x61 && code <= 0x7A || code >= 0x41 && code <= 0x5A) {
	    return 'ident';
	  }
	
	  // 1-9
	  if (code >= 0x31 && code <= 0x39) {
	    return 'number';
	  }
	
	  return 'else';
	}
	
	/**
	 * Format a subPath, return its plain form if it is
	 * a literal string or number. Otherwise prepend the
	 * dynamic indicator (*).
	 *
	 * @param {String} path
	 * @return {String}
	 */
	
	function formatSubPath(path) {
	  var trimmed = path.trim();
	  // invalid leading 0
	  if (path.charAt(0) === '0' && isNaN(path)) {
	    return false;
	  }
	  return isLiteral(trimmed) ? stripQuotes(trimmed) : '*' + trimmed;
	}
	
	/**
	 * Parse a string path into an array of segments
	 *
	 * @param {String} path
	 * @return {Array|undefined}
	 */
	
	function parse(path) {
	  var keys = [];
	  var index = -1;
	  var mode = BEFORE_PATH;
	  var subPathDepth = 0;
	  var c, newChar, key, type, transition, action, typeMap;
	
	  var actions = [];
	
	  actions[PUSH] = function () {
	    if (key !== undefined) {
	      keys.push(key);
	      key = undefined;
	    }
	  };
	
	  actions[APPEND] = function () {
	    if (key === undefined) {
	      key = newChar;
	    } else {
	      key += newChar;
	    }
	  };
	
	  actions[INC_SUB_PATH_DEPTH] = function () {
	    actions[APPEND]();
	    subPathDepth++;
	  };
	
	  actions[PUSH_SUB_PATH] = function () {
	    if (subPathDepth > 0) {
	      subPathDepth--;
	      mode = IN_SUB_PATH;
	      actions[APPEND]();
	    } else {
	      subPathDepth = 0;
	      key = formatSubPath(key);
	      if (key === false) {
	        return false;
	      } else {
	        actions[PUSH]();
	      }
	    }
	  };
	
	  function maybeUnescapeQuote() {
	    var nextChar = path[index + 1];
	    if (mode === IN_SINGLE_QUOTE && nextChar === "'" || mode === IN_DOUBLE_QUOTE && nextChar === '"') {
	      index++;
	      newChar = '\\' + nextChar;
	      actions[APPEND]();
	      return true;
	    }
	  }
	
	  while (mode != null) {
	    index++;
	    c = path[index];
	
	    if (c === '\\' && maybeUnescapeQuote()) {
	      continue;
	    }
	
	    type = getPathCharType(c);
	    typeMap = pathStateMachine[mode];
	    transition = typeMap[type] || typeMap['else'] || ERROR;
	
	    if (transition === ERROR) {
	      return; // parse error
	    }
	
	    mode = transition[0];
	    action = actions[transition[1]];
	    if (action) {
	      newChar = transition[2];
	      newChar = newChar === undefined ? c : newChar;
	      if (action() === false) {
	        return;
	      }
	    }
	
	    if (mode === AFTER_PATH) {
	      keys.raw = path;
	      return keys;
	    }
	  }
	}
	
	/**
	 * External parse that check for a cache hit first
	 *
	 * @param {String} path
	 * @return {Array|undefined}
	 */
	
	function parsePath(path) {
	  var hit = pathCache.get(path);
	  if (!hit) {
	    hit = parse(path);
	    if (hit) {
	      pathCache.put(path, hit);
	    }
	  }
	  return hit;
	}
	
	/**
	 * Get from an object from a path string
	 *
	 * @param {Object} obj
	 * @param {String} path
	 */
	
	function getPath(obj, path) {
	  return parseExpression(path).get(obj);
	}
	
	/**
	 * Warn against setting non-existent root path on a vm.
	 */
	
	var warnNonExistent;
	if (process.env.NODE_ENV !== 'production') {
	  warnNonExistent = function (path) {
	    warn('You are setting a non-existent path "' + path.raw + '" ' + 'on a vm instance. Consider pre-initializing the property ' + 'with the "data" option for more reliable reactivity ' + 'and better performance.');
	  };
	}
	
	/**
	 * Set on an object from a path
	 *
	 * @param {Object} obj
	 * @param {String | Array} path
	 * @param {*} val
	 */
	
	function setPath(obj, path, val) {
	  var original = obj;
	  if (typeof path === 'string') {
	    path = parse(path);
	  }
	  if (!path || !isObject(obj)) {
	    return false;
	  }
	  var last, key;
	  for (var i = 0, l = path.length; i < l; i++) {
	    last = obj;
	    key = path[i];
	    if (key.charAt(0) === '*') {
	      key = parseExpression(key.slice(1)).get.call(original, original);
	    }
	    if (i < l - 1) {
	      obj = obj[key];
	      if (!isObject(obj)) {
	        obj = {};
	        if (process.env.NODE_ENV !== 'production' && last._isVue) {
	          warnNonExistent(path);
	        }
	        set(last, key, obj);
	      }
	    } else {
	      if (isArray(obj)) {
	        obj.$set(key, val);
	      } else if (key in obj) {
	        obj[key] = val;
	      } else {
	        if (process.env.NODE_ENV !== 'production' && obj._isVue) {
	          warnNonExistent(path);
	        }
	        set(obj, key, val);
	      }
	    }
	  }
	  return true;
	}
	
	var path = Object.freeze({
	  parsePath: parsePath,
	  getPath: getPath,
	  setPath: setPath
	});
	
	var expressionCache = new Cache(1000);
	
	var allowedKeywords = 'Math,Date,this,true,false,null,undefined,Infinity,NaN,' + 'isNaN,isFinite,decodeURI,decodeURIComponent,encodeURI,' + 'encodeURIComponent,parseInt,parseFloat';
	var allowedKeywordsRE = new RegExp('^(' + allowedKeywords.replace(/,/g, '\\b|') + '\\b)');
	
	// keywords that don't make sense inside expressions
	var improperKeywords = 'break,case,class,catch,const,continue,debugger,default,' + 'delete,do,else,export,extends,finally,for,function,if,' + 'import,in,instanceof,let,return,super,switch,throw,try,' + 'var,while,with,yield,enum,await,implements,package,' + 'proctected,static,interface,private,public';
	var improperKeywordsRE = new RegExp('^(' + improperKeywords.replace(/,/g, '\\b|') + '\\b)');
	
	var wsRE = /\s/g;
	var newlineRE = /\n/g;
	var saveRE = /[\{,]\s*[\w\$_]+\s*:|('(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*")|new |typeof |void /g;
	var restoreRE = /"(\d+)"/g;
	var pathTestRE = /^[A-Za-z_$][\w$]*(?:\.[A-Za-z_$][\w$]*|\['.*?'\]|\[".*?"\]|\[\d+\]|\[[A-Za-z_$][\w$]*\])*$/;
	var identRE = /[^\w$\.](?:[A-Za-z_$][\w$]*)/g;
	var booleanLiteralRE = /^(?:true|false)$/;
	
	/**
	 * Save / Rewrite / Restore
	 *
	 * When rewriting paths found in an expression, it is
	 * possible for the same letter sequences to be found in
	 * strings and Object literal property keys. Therefore we
	 * remove and store these parts in a temporary array, and
	 * restore them after the path rewrite.
	 */
	
	var saved = [];
	
	/**
	 * Save replacer
	 *
	 * The save regex can match two possible cases:
	 * 1. An opening object literal
	 * 2. A string
	 * If matched as a plain string, we need to escape its
	 * newlines, since the string needs to be preserved when
	 * generating the function body.
	 *
	 * @param {String} str
	 * @param {String} isString - str if matched as a string
	 * @return {String} - placeholder with index
	 */
	
	function save(str, isString) {
	  var i = saved.length;
	  saved[i] = isString ? str.replace(newlineRE, '\\n') : str;
	  return '"' + i + '"';
	}
	
	/**
	 * Path rewrite replacer
	 *
	 * @param {String} raw
	 * @return {String}
	 */
	
	function rewrite(raw) {
	  var c = raw.charAt(0);
	  var path = raw.slice(1);
	  if (allowedKeywordsRE.test(path)) {
	    return raw;
	  } else {
	    path = path.indexOf('"') > -1 ? path.replace(restoreRE, restore) : path;
	    return c + 'scope.' + path;
	  }
	}
	
	/**
	 * Restore replacer
	 *
	 * @param {String} str
	 * @param {String} i - matched save index
	 * @return {String}
	 */
	
	function restore(str, i) {
	  return saved[i];
	}
	
	/**
	 * Rewrite an expression, prefixing all path accessors with
	 * `scope.` and generate getter/setter functions.
	 *
	 * @param {String} exp
	 * @return {Function}
	 */
	
	function compileGetter(exp) {
	  if (improperKeywordsRE.test(exp)) {
	    process.env.NODE_ENV !== 'production' && warn('Avoid using reserved keywords in expression: ' + exp);
	  }
	  // reset state
	  saved.length = 0;
	  // save strings and object literal keys
	  var body = exp.replace(saveRE, save).replace(wsRE, '');
	  // rewrite all paths
	  // pad 1 space here becaue the regex matches 1 extra char
	  body = (' ' + body).replace(identRE, rewrite).replace(restoreRE, restore);
	  return makeGetterFn(body);
	}
	
	/**
	 * Build a getter function. Requires eval.
	 *
	 * We isolate the try/catch so it doesn't affect the
	 * optimization of the parse function when it is not called.
	 *
	 * @param {String} body
	 * @return {Function|undefined}
	 */
	
	function makeGetterFn(body) {
	  try {
	    return new Function('scope', 'return ' + body + ';');
	  } catch (e) {
	    process.env.NODE_ENV !== 'production' && warn('Invalid expression. ' + 'Generated function body: ' + body);
	  }
	}
	
	/**
	 * Compile a setter function for the expression.
	 *
	 * @param {String} exp
	 * @return {Function|undefined}
	 */
	
	function compileSetter(exp) {
	  var path = parsePath(exp);
	  if (path) {
	    return function (scope, val) {
	      setPath(scope, path, val);
	    };
	  } else {
	    process.env.NODE_ENV !== 'production' && warn('Invalid setter expression: ' + exp);
	  }
	}
	
	/**
	 * Parse an expression into re-written getter/setters.
	 *
	 * @param {String} exp
	 * @param {Boolean} needSet
	 * @return {Function}
	 */
	
	function parseExpression(exp, needSet) {
	  exp = exp.trim();
	  // try cache
	  var hit = expressionCache.get(exp);
	  if (hit) {
	    if (needSet && !hit.set) {
	      hit.set = compileSetter(hit.exp);
	    }
	    return hit;
	  }
	  var res = { exp: exp };
	  res.get = isSimplePath(exp) && exp.indexOf('[') < 0
	  // optimized super simple getter
	  ? makeGetterFn('scope.' + exp)
	  // dynamic getter
	  : compileGetter(exp);
	  if (needSet) {
	    res.set = compileSetter(exp);
	  }
	  expressionCache.put(exp, res);
	  return res;
	}
	
	/**
	 * Check if an expression is a simple path.
	 *
	 * @param {String} exp
	 * @return {Boolean}
	 */
	
	function isSimplePath(exp) {
	  return pathTestRE.test(exp) &&
	  // don't treat true/false as paths
	  !booleanLiteralRE.test(exp) &&
	  // Math constants e.g. Math.PI, Math.E etc.
	  exp.slice(0, 5) !== 'Math.';
	}
	
	var expression = Object.freeze({
	  parseExpression: parseExpression,
	  isSimplePath: isSimplePath
	});
	
	// we have two separate queues: one for directive updates
	// and one for user watcher registered via $watch().
	// we want to guarantee directive updates to be called
	// before user watchers so that when user watchers are
	// triggered, the DOM would have already been in updated
	// state.
	var queue = [];
	var userQueue = [];
	var has = {};
	var circular = {};
	var waiting = false;
	var internalQueueDepleted = false;
	
	/**
	 * Reset the batcher's state.
	 */
	
	function resetBatcherState() {
	  queue = [];
	  userQueue = [];
	  has = {};
	  circular = {};
	  waiting = internalQueueDepleted = false;
	}
	
	/**
	 * Flush both queues and run the watchers.
	 */
	
	function flushBatcherQueue() {
	  runBatcherQueue(queue);
	  internalQueueDepleted = true;
	  runBatcherQueue(userQueue);
	  // dev tool hook
	  /* istanbul ignore if */
	  if (process.env.NODE_ENV !== 'production') {
	    if (inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__) {
	      window.__VUE_DEVTOOLS_GLOBAL_HOOK__.emit('flush');
	    }
	  }
	  resetBatcherState();
	}
	
	/**
	 * Run the watchers in a single queue.
	 *
	 * @param {Array} queue
	 */
	
	function runBatcherQueue(queue) {
	  // do not cache length because more watchers might be pushed
	  // as we run existing watchers
	  for (var i = 0; i < queue.length; i++) {
	    var watcher = queue[i];
	    var id = watcher.id;
	    has[id] = null;
	    watcher.run();
	    // in dev build, check and stop circular updates.
	    if (process.env.NODE_ENV !== 'production' && has[id] != null) {
	      circular[id] = (circular[id] || 0) + 1;
	      if (circular[id] > config._maxUpdateCount) {
	        queue.splice(has[id], 1);
	        warn('You may have an infinite update loop for watcher ' + 'with expression: ' + watcher.expression);
	      }
	    }
	  }
	}
	
	/**
	 * Push a watcher into the watcher queue.
	 * Jobs with duplicate IDs will be skipped unless it's
	 * pushed when the queue is being flushed.
	 *
	 * @param {Watcher} watcher
	 *   properties:
	 *   - {Number} id
	 *   - {Function} run
	 */
	
	function pushWatcher(watcher) {
	  var id = watcher.id;
	  if (has[id] == null) {
	    // if an internal watcher is pushed, but the internal
	    // queue is already depleted, we run it immediately.
	    if (internalQueueDepleted && !watcher.user) {
	      watcher.run();
	      return;
	    }
	    // push watcher into appropriate queue
	    var q = watcher.user ? userQueue : queue;
	    has[id] = q.length;
	    q.push(watcher);
	    // queue the flush
	    if (!waiting) {
	      waiting = true;
	      nextTick(flushBatcherQueue);
	    }
	  }
	}
	
	var uid$2 = 0;
	
	/**
	 * A watcher parses an expression, collects dependencies,
	 * and fires callback when the expression value changes.
	 * This is used for both the $watch() api and directives.
	 *
	 * @param {Vue} vm
	 * @param {String} expression
	 * @param {Function} cb
	 * @param {Object} options
	 *                 - {Array} filters
	 *                 - {Boolean} twoWay
	 *                 - {Boolean} deep
	 *                 - {Boolean} user
	 *                 - {Boolean} sync
	 *                 - {Boolean} lazy
	 *                 - {Function} [preProcess]
	 *                 - {Function} [postProcess]
	 * @constructor
	 */
	function Watcher(vm, expOrFn, cb, options) {
	  // mix in options
	  if (options) {
	    extend(this, options);
	  }
	  var isFn = typeof expOrFn === 'function';
	  this.vm = vm;
	  vm._watchers.push(this);
	  this.expression = isFn ? expOrFn.toString() : expOrFn;
	  this.cb = cb;
	  this.id = ++uid$2; // uid for batching
	  this.active = true;
	  this.dirty = this.lazy; // for lazy watchers
	  this.deps = Object.create(null);
	  this.newDeps = null;
	  this.prevError = null; // for async error stacks
	  // parse expression for getter/setter
	  if (isFn) {
	    this.getter = expOrFn;
	    this.setter = undefined;
	  } else {
	    var res = parseExpression(expOrFn, this.twoWay);
	    this.getter = res.get;
	    this.setter = res.set;
	  }
	  this.value = this.lazy ? undefined : this.get();
	  // state for avoiding false triggers for deep and Array
	  // watchers during vm._digest()
	  this.queued = this.shallow = false;
	}
	
	/**
	 * Add a dependency to this directive.
	 *
	 * @param {Dep} dep
	 */
	
	Watcher.prototype.addDep = function (dep) {
	  var id = dep.id;
	  if (!this.newDeps[id]) {
	    this.newDeps[id] = dep;
	    if (!this.deps[id]) {
	      this.deps[id] = dep;
	      dep.addSub(this);
	    }
	  }
	};
	
	/**
	 * Evaluate the getter, and re-collect dependencies.
	 */
	
	Watcher.prototype.get = function () {
	  this.beforeGet();
	  var scope = this.scope || this.vm;
	  var value;
	  try {
	    value = this.getter.call(scope, scope);
	  } catch (e) {
	    if (process.env.NODE_ENV !== 'production' && config.warnExpressionErrors) {
	      warn('Error when evaluating expression "' + this.expression + '". ' + (config.debug ? '' : 'Turn on debug mode to see stack trace.'), e);
	    }
	  }
	  // "touch" every property so they are all tracked as
	  // dependencies for deep watching
	  if (this.deep) {
	    traverse(value);
	  }
	  if (this.preProcess) {
	    value = this.preProcess(value);
	  }
	  if (this.filters) {
	    value = scope._applyFilters(value, null, this.filters, false);
	  }
	  if (this.postProcess) {
	    value = this.postProcess(value);
	  }
	  this.afterGet();
	  return value;
	};
	
	/**
	 * Set the corresponding value with the setter.
	 *
	 * @param {*} value
	 */
	
	Watcher.prototype.set = function (value) {
	  var scope = this.scope || this.vm;
	  if (this.filters) {
	    value = scope._applyFilters(value, this.value, this.filters, true);
	  }
	  try {
	    this.setter.call(scope, scope, value);
	  } catch (e) {
	    if (process.env.NODE_ENV !== 'production' && config.warnExpressionErrors) {
	      warn('Error when evaluating setter "' + this.expression + '"', e);
	    }
	  }
	  // two-way sync for v-for alias
	  var forContext = scope.$forContext;
	  if (forContext && forContext.alias === this.expression) {
	    if (forContext.filters) {
	      process.env.NODE_ENV !== 'production' && warn('It seems you are using two-way binding on ' + 'a v-for alias (' + this.expression + '), and the ' + 'v-for has filters. This will not work properly. ' + 'Either remove the filters or use an array of ' + 'objects and bind to object properties instead.');
	      return;
	    }
	    forContext._withLock(function () {
	      if (scope.$key) {
	        // original is an object
	        forContext.rawValue[scope.$key] = value;
	      } else {
	        forContext.rawValue.$set(scope.$index, value);
	      }
	    });
	  }
	};
	
	/**
	 * Prepare for dependency collection.
	 */
	
	Watcher.prototype.beforeGet = function () {
	  Dep.target = this;
	  this.newDeps = Object.create(null);
	};
	
	/**
	 * Clean up for dependency collection.
	 */
	
	Watcher.prototype.afterGet = function () {
	  Dep.target = null;
	  var ids = Object.keys(this.deps);
	  var i = ids.length;
	  while (i--) {
	    var id = ids[i];
	    if (!this.newDeps[id]) {
	      this.deps[id].removeSub(this);
	    }
	  }
	  this.deps = this.newDeps;
	};
	
	/**
	 * Subscriber interface.
	 * Will be called when a dependency changes.
	 *
	 * @param {Boolean} shallow
	 */
	
	Watcher.prototype.update = function (shallow) {
	  if (this.lazy) {
	    this.dirty = true;
	  } else if (this.sync || !config.async) {
	    this.run();
	  } else {
	    // if queued, only overwrite shallow with non-shallow,
	    // but not the other way around.
	    this.shallow = this.queued ? shallow ? this.shallow : false : !!shallow;
	    this.queued = true;
	    // record before-push error stack in debug mode
	    /* istanbul ignore if */
	    if (process.env.NODE_ENV !== 'production' && config.debug) {
	      this.prevError = new Error('[vue] async stack trace');
	    }
	    pushWatcher(this);
	  }
	};
	
	/**
	 * Batcher job interface.
	 * Will be called by the batcher.
	 */
	
	Watcher.prototype.run = function () {
	  if (this.active) {
	    var value = this.get();
	    if (value !== this.value ||
	    // Deep watchers and watchers on Object/Arrays should fire even
	    // when the value is the same, because the value may
	    // have mutated; but only do so if this is a
	    // non-shallow update (caused by a vm digest).
	    (isObject(value) || this.deep) && !this.shallow) {
	      // set new value
	      var oldValue = this.value;
	      this.value = value;
	      // in debug + async mode, when a watcher callbacks
	      // throws, we also throw the saved before-push error
	      // so the full cross-tick stack trace is available.
	      var prevError = this.prevError;
	      /* istanbul ignore if */
	      if (process.env.NODE_ENV !== 'production' && config.debug && prevError) {
	        this.prevError = null;
	        try {
	          this.cb.call(this.vm, value, oldValue);
	        } catch (e) {
	          nextTick(function () {
	            throw prevError;
	          }, 0);
	          throw e;
	        }
	      } else {
	        this.cb.call(this.vm, value, oldValue);
	      }
	    }
	    this.queued = this.shallow = false;
	  }
	};
	
	/**
	 * Evaluate the value of the watcher.
	 * This only gets called for lazy watchers.
	 */
	
	Watcher.prototype.evaluate = function () {
	  // avoid overwriting another watcher that is being
	  // collected.
	  var current = Dep.target;
	  this.value = this.get();
	  this.dirty = false;
	  Dep.target = current;
	};
	
	/**
	 * Depend on all deps collected by this watcher.
	 */
	
	Watcher.prototype.depend = function () {
	  var depIds = Object.keys(this.deps);
	  var i = depIds.length;
	  while (i--) {
	    this.deps[depIds[i]].depend();
	  }
	};
	
	/**
	 * Remove self from all dependencies' subcriber list.
	 */
	
	Watcher.prototype.teardown = function () {
	  if (this.active) {
	    // remove self from vm's watcher list
	    // we can skip this if the vm if being destroyed
	    // which can improve teardown performance.
	    if (!this.vm._isBeingDestroyed) {
	      this.vm._watchers.$remove(this);
	    }
	    var depIds = Object.keys(this.deps);
	    var i = depIds.length;
	    while (i--) {
	      this.deps[depIds[i]].removeSub(this);
	    }
	    this.active = false;
	    this.vm = this.cb = this.value = null;
	  }
	};
	
	/**
	 * Recrusively traverse an object to evoke all converted
	 * getters, so that every nested property inside the object
	 * is collected as a "deep" dependency.
	 *
	 * @param {*} val
	 */
	
	function traverse(val) {
	  var i, keys;
	  if (isArray(val)) {
	    i = val.length;
	    while (i--) traverse(val[i]);
	  } else if (isObject(val)) {
	    keys = Object.keys(val);
	    i = keys.length;
	    while (i--) traverse(val[keys[i]]);
	  }
	}
	
	var cloak = {
	  bind: function bind() {
	    var el = this.el;
	    this.vm.$once('pre-hook:compiled', function () {
	      el.removeAttribute('v-cloak');
	    });
	  }
	};
	
	var ref = {
	  bind: function bind() {
	    process.env.NODE_ENV !== 'production' && warn('v-ref:' + this.arg + ' must be used on a child ' + 'component. Found on <' + this.el.tagName.toLowerCase() + '>.');
	  }
	};
	
	var ON = 700;
	var MODEL = 800;
	var BIND = 850;
	var TRANSITION = 1100;
	var EL = 1500;
	var COMPONENT = 1500;
	var PARTIAL = 1750;
	var FOR = 2000;
	var IF = 2000;
	var SLOT = 2100;
	
	var el = {
	
	  priority: EL,
	
	  bind: function bind() {
	    /* istanbul ignore if */
	    if (!this.arg) {
	      return;
	    }
	    var id = this.id = camelize(this.arg);
	    var refs = (this._scope || this.vm).$els;
	    if (hasOwn(refs, id)) {
	      refs[id] = this.el;
	    } else {
	      defineReactive(refs, id, this.el);
	    }
	  },
	
	  unbind: function unbind() {
	    var refs = (this._scope || this.vm).$els;
	    if (refs[this.id] === this.el) {
	      refs[this.id] = null;
	    }
	  }
	};
	
	var prefixes = ['-webkit-', '-moz-', '-ms-'];
	var camelPrefixes = ['Webkit', 'Moz', 'ms'];
	var importantRE = /!important;?$/;
	var propCache = Object.create(null);
	
	var testEl = null;
	
	var style = {
	
	  deep: true,
	
	  update: function update(value) {
	    if (typeof value === 'string') {
	      this.el.style.cssText = value;
	    } else if (isArray(value)) {
	      this.handleObject(value.reduce(extend, {}));
	    } else {
	      this.handleObject(value || {});
	    }
	  },
	
	  handleObject: function handleObject(value) {
	    // cache object styles so that only changed props
	    // are actually updated.
	    var cache = this.cache || (this.cache = {});
	    var name, val;
	    for (name in cache) {
	      if (!(name in value)) {
	        this.handleSingle(name, null);
	        delete cache[name];
	      }
	    }
	    for (name in value) {
	      val = value[name];
	      if (val !== cache[name]) {
	        cache[name] = val;
	        this.handleSingle(name, val);
	      }
	    }
	  },
	
	  handleSingle: function handleSingle(prop, value) {
	    prop = normalize(prop);
	    if (!prop) return; // unsupported prop
	    // cast possible numbers/booleans into strings
	    if (value != null) value += '';
	    if (value) {
	      var isImportant = importantRE.test(value) ? 'important' : '';
	      if (isImportant) {
	        value = value.replace(importantRE, '').trim();
	      }
	      this.el.style.setProperty(prop, value, isImportant);
	    } else {
	      this.el.style.removeProperty(prop);
	    }
	  }
	
	};
	
	/**
	 * Normalize a CSS property name.
	 * - cache result
	 * - auto prefix
	 * - camelCase -> dash-case
	 *
	 * @param {String} prop
	 * @return {String}
	 */
	
	function normalize(prop) {
	  if (propCache[prop]) {
	    return propCache[prop];
	  }
	  var res = prefix(prop);
	  propCache[prop] = propCache[res] = res;
	  return res;
	}
	
	/**
	 * Auto detect the appropriate prefix for a CSS property.
	 * https://gist.github.com/paulirish/523692
	 *
	 * @param {String} prop
	 * @return {String}
	 */
	
	function prefix(prop) {
	  prop = hyphenate(prop);
	  var camel = camelize(prop);
	  var upper = camel.charAt(0).toUpperCase() + camel.slice(1);
	  if (!testEl) {
	    testEl = document.createElement('div');
	  }
	  if (camel in testEl.style) {
	    return prop;
	  }
	  var i = prefixes.length;
	  var prefixed;
	  while (i--) {
	    prefixed = camelPrefixes[i] + upper;
	    if (prefixed in testEl.style) {
	      return prefixes[i] + prop;
	    }
	  }
	}
	
	// xlink
	var xlinkNS = 'http://www.w3.org/1999/xlink';
	var xlinkRE = /^xlink:/;
	
	// check for attributes that prohibit interpolations
	var disallowedInterpAttrRE = /^v-|^:|^@|^(?:is|transition|transition-mode|debounce|track-by|stagger|enter-stagger|leave-stagger)$/;
	// these attributes should also set their corresponding properties
	// because they only affect the initial state of the element
	var attrWithPropsRE = /^(?:value|checked|selected|muted)$/;
	
	// these attributes should set a hidden property for
	// binding v-model to object values
	var modelProps = {
	  value: '_value',
	  'true-value': '_trueValue',
	  'false-value': '_falseValue'
	};
	
	var bind = {
	
	  priority: BIND,
	
	  bind: function bind() {
	    var attr = this.arg;
	    var tag = this.el.tagName;
	    // should be deep watch on object mode
	    if (!attr) {
	      this.deep = true;
	    }
	    // handle interpolation bindings
	    var descriptor = this.descriptor;
	    var tokens = descriptor.interp;
	    if (tokens) {
	      // handle interpolations with one-time tokens
	      if (descriptor.hasOneTime) {
	        this.expression = tokensToExp(tokens, this._scope || this.vm);
	      }
	
	      // only allow binding on native attributes
	      if (disallowedInterpAttrRE.test(attr) || attr === 'name' && (tag === 'PARTIAL' || tag === 'SLOT')) {
	        process.env.NODE_ENV !== 'production' && warn(attr + '="' + descriptor.raw + '": ' + 'attribute interpolation is not allowed in Vue.js ' + 'directives and special attributes.');
	        this.el.removeAttribute(attr);
	        this.invalid = true;
	      }
	
	      /* istanbul ignore if */
	      if (process.env.NODE_ENV !== 'production') {
	        var raw = attr + '="' + descriptor.raw + '": ';
	        // warn src
	        if (attr === 'src') {
	          warn(raw + 'interpolation in "src" attribute will cause ' + 'a 404 request. Use v-bind:src instead.');
	        }
	
	        // warn style
	        if (attr === 'style') {
	          warn(raw + 'interpolation in "style" attribute will cause ' + 'the attribute to be discarded in Internet Explorer. ' + 'Use v-bind:style instead.');
	        }
	      }
	    }
	  },
	
	  update: function update(value) {
	    if (this.invalid) {
	      return;
	    }
	    var attr = this.arg;
	    if (this.arg) {
	      this.handleSingle(attr, value);
	    } else {
	      this.handleObject(value || {});
	    }
	  },
	
	  // share object handler with v-bind:class
	  handleObject: style.handleObject,
	
	  handleSingle: function handleSingle(attr, value) {
	    var el = this.el;
	    var interp = this.descriptor.interp;
	    if (!interp && attrWithPropsRE.test(attr) && attr in el) {
	      el[attr] = attr === 'value' ? value == null // IE9 will set input.value to "null" for null...
	      ? '' : value : value;
	    }
	    // set model props
	    var modelProp = modelProps[attr];
	    if (!interp && modelProp) {
	      el[modelProp] = value;
	      // update v-model if present
	      var model = el.__v_model;
	      if (model) {
	        model.listener();
	      }
	    }
	    // do not set value attribute for textarea
	    if (attr === 'value' && el.tagName === 'TEXTAREA') {
	      el.removeAttribute(attr);
	      return;
	    }
	    // update attribute
	    if (value != null && value !== false) {
	      if (attr === 'class') {
	        // handle edge case #1960:
	        // class interpolation should not overwrite Vue transition class
	        if (el.__v_trans) {
	          value += ' ' + el.__v_trans.id + '-transition';
	        }
	        setClass(el, value);
	      } else if (xlinkRE.test(attr)) {
	        el.setAttributeNS(xlinkNS, attr, value);
	      } else {
	        el.setAttribute(attr, value);
	      }
	    } else {
	      el.removeAttribute(attr);
	    }
	  }
	};
	
	// keyCode aliases
	var keyCodes = {
	  esc: 27,
	  tab: 9,
	  enter: 13,
	  space: 32,
	  'delete': 46,
	  up: 38,
	  left: 37,
	  right: 39,
	  down: 40
	};
	
	function keyFilter(handler, keys) {
	  var codes = keys.map(function (key) {
	    var charCode = key.charCodeAt(0);
	    if (charCode > 47 && charCode < 58) {
	      return parseInt(key, 10);
	    }
	    if (key.length === 1) {
	      charCode = key.toUpperCase().charCodeAt(0);
	      if (charCode > 64 && charCode < 91) {
	        return charCode;
	      }
	    }
	    return keyCodes[key];
	  });
	  return function keyHandler(e) {
	    if (codes.indexOf(e.keyCode) > -1) {
	      return handler.call(this, e);
	    }
	  };
	}
	
	function stopFilter(handler) {
	  return function stopHandler(e) {
	    e.stopPropagation();
	    return handler.call(this, e);
	  };
	}
	
	function preventFilter(handler) {
	  return function preventHandler(e) {
	    e.preventDefault();
	    return handler.call(this, e);
	  };
	}
	
	var on = {
	
	  acceptStatement: true,
	  priority: ON,
	
	  bind: function bind() {
	    // deal with iframes
	    if (this.el.tagName === 'IFRAME' && this.arg !== 'load') {
	      var self = this;
	      this.iframeBind = function () {
	        on$1(self.el.contentWindow, self.arg, self.handler);
	      };
	      this.on('load', this.iframeBind);
	    }
	  },
	
	  update: function update(handler) {
	    // stub a noop for v-on with no value,
	    // e.g. @mousedown.prevent
	    if (!this.descriptor.raw) {
	      handler = function () {};
	    }
	
	    if (typeof handler !== 'function') {
	      process.env.NODE_ENV !== 'production' && warn('v-on:' + this.arg + '="' + this.expression + '" expects a function value, ' + 'got ' + handler);
	      return;
	    }
	
	    // apply modifiers
	    if (this.modifiers.stop) {
	      handler = stopFilter(handler);
	    }
	    if (this.modifiers.prevent) {
	      handler = preventFilter(handler);
	    }
	    // key filter
	    var keys = Object.keys(this.modifiers).filter(function (key) {
	      return key !== 'stop' && key !== 'prevent';
	    });
	    if (keys.length) {
	      handler = keyFilter(handler, keys);
	    }
	
	    this.reset();
	    this.handler = handler;
	
	    if (this.iframeBind) {
	      this.iframeBind();
	    } else {
	      on$1(this.el, this.arg, this.handler);
	    }
	  },
	
	  reset: function reset() {
	    var el = this.iframeBind ? this.el.contentWindow : this.el;
	    if (this.handler) {
	      off(el, this.arg, this.handler);
	    }
	  },
	
	  unbind: function unbind() {
	    this.reset();
	  }
	};
	
	var checkbox = {
	
	  bind: function bind() {
	    var self = this;
	    var el = this.el;
	
	    this.getValue = function () {
	      return el.hasOwnProperty('_value') ? el._value : self.params.number ? toNumber(el.value) : el.value;
	    };
	
	    function getBooleanValue() {
	      var val = el.checked;
	      if (val && el.hasOwnProperty('_trueValue')) {
	        return el._trueValue;
	      }
	      if (!val && el.hasOwnProperty('_falseValue')) {
	        return el._falseValue;
	      }
	      return val;
	    }
	
	    this.listener = function () {
	      var model = self._watcher.value;
	      if (isArray(model)) {
	        var val = self.getValue();
	        if (el.checked) {
	          if (indexOf(model, val) < 0) {
	            model.push(val);
	          }
	        } else {
	          model.$remove(val);
	        }
	      } else {
	        self.set(getBooleanValue());
	      }
	    };
	
	    this.on('change', this.listener);
	    if (el.hasAttribute('checked')) {
	      this.afterBind = this.listener;
	    }
	  },
	
	  update: function update(value) {
	    var el = this.el;
	    if (isArray(value)) {
	      el.checked = indexOf(value, this.getValue()) > -1;
	    } else {
	      if (el.hasOwnProperty('_trueValue')) {
	        el.checked = looseEqual(value, el._trueValue);
	      } else {
	        el.checked = !!value;
	      }
	    }
	  }
	};
	
	var select = {
	
	  bind: function bind() {
	    var self = this;
	    var el = this.el;
	
	    // method to force update DOM using latest value.
	    this.forceUpdate = function () {
	      if (self._watcher) {
	        self.update(self._watcher.get());
	      }
	    };
	
	    // check if this is a multiple select
	    var multiple = this.multiple = el.hasAttribute('multiple');
	
	    // attach listener
	    this.listener = function () {
	      var value = getValue(el, multiple);
	      value = self.params.number ? isArray(value) ? value.map(toNumber) : toNumber(value) : value;
	      self.set(value);
	    };
	    this.on('change', this.listener);
	
	    // if has initial value, set afterBind
	    var initValue = getValue(el, multiple, true);
	    if (multiple && initValue.length || !multiple && initValue !== null) {
	      this.afterBind = this.listener;
	    }
	
	    // All major browsers except Firefox resets
	    // selectedIndex with value -1 to 0 when the element
	    // is appended to a new parent, therefore we have to
	    // force a DOM update whenever that happens...
	    this.vm.$on('hook:attached', this.forceUpdate);
	  },
	
	  update: function update(value) {
	    var el = this.el;
	    el.selectedIndex = -1;
	    var multi = this.multiple && isArray(value);
	    var options = el.options;
	    var i = options.length;
	    var op, val;
	    while (i--) {
	      op = options[i];
	      val = op.hasOwnProperty('_value') ? op._value : op.value;
	      /* eslint-disable eqeqeq */
	      op.selected = multi ? indexOf$1(value, val) > -1 : looseEqual(value, val);
	      /* eslint-enable eqeqeq */
	    }
	  },
	
	  unbind: function unbind() {
	    /* istanbul ignore next */
	    this.vm.$off('hook:attached', this.forceUpdate);
	  }
	};
	
	/**
	 * Get select value
	 *
	 * @param {SelectElement} el
	 * @param {Boolean} multi
	 * @param {Boolean} init
	 * @return {Array|*}
	 */
	
	function getValue(el, multi, init) {
	  var res = multi ? [] : null;
	  var op, val, selected;
	  for (var i = 0, l = el.options.length; i < l; i++) {
	    op = el.options[i];
	    selected = init ? op.hasAttribute('selected') : op.selected;
	    if (selected) {
	      val = op.hasOwnProperty('_value') ? op._value : op.value;
	      if (multi) {
	        res.push(val);
	      } else {
	        return val;
	      }
	    }
	  }
	  return res;
	}
	
	/**
	 * Native Array.indexOf uses strict equal, but in this
	 * case we need to match string/numbers with custom equal.
	 *
	 * @param {Array} arr
	 * @param {*} val
	 */
	
	function indexOf$1(arr, val) {
	  var i = arr.length;
	  while (i--) {
	    if (looseEqual(arr[i], val)) {
	      return i;
	    }
	  }
	  return -1;
	}
	
	var radio = {
	
	  bind: function bind() {
	    var self = this;
	    var el = this.el;
	
	    this.getValue = function () {
	      // value overwrite via v-bind:value
	      if (el.hasOwnProperty('_value')) {
	        return el._value;
	      }
	      var val = el.value;
	      if (self.params.number) {
	        val = toNumber(val);
	      }
	      return val;
	    };
	
	    this.listener = function () {
	      self.set(self.getValue());
	    };
	    this.on('change', this.listener);
	
	    if (el.hasAttribute('checked')) {
	      this.afterBind = this.listener;
	    }
	  },
	
	  update: function update(value) {
	    this.el.checked = looseEqual(value, this.getValue());
	  }
	};
	
	var text$2 = {
	
	  bind: function bind() {
	    var self = this;
	    var el = this.el;
	    var isRange = el.type === 'range';
	    var lazy = this.params.lazy;
	    var number = this.params.number;
	    var debounce = this.params.debounce;
	
	    // handle composition events.
	    //   http://blog.evanyou.me/2014/01/03/composition-event/
	    // skip this for Android because it handles composition
	    // events quite differently. Android doesn't trigger
	    // composition events for language input methods e.g.
	    // Chinese, but instead triggers them for spelling
	    // suggestions... (see Discussion/#162)
	    var composing = false;
	    if (!isAndroid && !isRange) {
	      this.on('compositionstart', function () {
	        composing = true;
	      });
	      this.on('compositionend', function () {
	        composing = false;
	        // in IE11 the "compositionend" event fires AFTER
	        // the "input" event, so the input handler is blocked
	        // at the end... have to call it here.
	        //
	        // #1327: in lazy mode this is unecessary.
	        if (!lazy) {
	          self.listener();
	        }
	      });
	    }
	
	    // prevent messing with the input when user is typing,
	    // and force update on blur.
	    this.focused = false;
	    if (!isRange && !lazy) {
	      this.on('focus', function () {
	        self.focused = true;
	      });
	      this.on('blur', function () {
	        self.focused = false;
	        // do not sync value after fragment removal (#2017)
	        if (!self._frag || self._frag.inserted) {
	          self.rawListener();
	        }
	      });
	    }
	
	    // Now attach the main listener
	    this.listener = this.rawListener = function () {
	      if (composing || !self._bound) {
	        return;
	      }
	      var val = number || isRange ? toNumber(el.value) : el.value;
	      self.set(val);
	      // force update on next tick to avoid lock & same value
	      // also only update when user is not typing
	      nextTick(function () {
	        if (self._bound && !self.focused) {
	          self.update(self._watcher.value);
	        }
	      });
	    };
	
	    // apply debounce
	    if (debounce) {
	      this.listener = _debounce(this.listener, debounce);
	    }
	
	    // Support jQuery events, since jQuery.trigger() doesn't
	    // trigger native events in some cases and some plugins
	    // rely on $.trigger()
	    //
	    // We want to make sure if a listener is attached using
	    // jQuery, it is also removed with jQuery, that's why
	    // we do the check for each directive instance and
	    // store that check result on itself. This also allows
	    // easier test coverage control by unsetting the global
	    // jQuery variable in tests.
	    this.hasjQuery = typeof jQuery === 'function';
	    if (this.hasjQuery) {
	      jQuery(el).on('change', this.listener);
	      if (!lazy) {
	        jQuery(el).on('input', this.listener);
	      }
	    } else {
	      this.on('change', this.listener);
	      if (!lazy) {
	        this.on('input', this.listener);
	      }
	    }
	
	    // IE9 doesn't fire input event on backspace/del/cut
	    if (!lazy && isIE9) {
	      this.on('cut', function () {
	        nextTick(self.listener);
	      });
	      this.on('keyup', function (e) {
	        if (e.keyCode === 46 || e.keyCode === 8) {
	          self.listener();
	        }
	      });
	    }
	
	    // set initial value if present
	    if (el.hasAttribute('value') || el.tagName === 'TEXTAREA' && el.value.trim()) {
	      this.afterBind = this.listener;
	    }
	  },
	
	  update: function update(value) {
	    this.el.value = _toString(value);
	  },
	
	  unbind: function unbind() {
	    var el = this.el;
	    if (this.hasjQuery) {
	      jQuery(el).off('change', this.listener);
	      jQuery(el).off('input', this.listener);
	    }
	  }
	};
	
	var handlers = {
	  text: text$2,
	  radio: radio,
	  select: select,
	  checkbox: checkbox
	};
	
	var model = {
	
	  priority: MODEL,
	  twoWay: true,
	  handlers: handlers,
	  params: ['lazy', 'number', 'debounce'],
	
	  /**
	   * Possible elements:
	   *   <select>
	   *   <textarea>
	   *   <input type="*">
	   *     - text
	   *     - checkbox
	   *     - radio
	   *     - number
	   */
	
	  bind: function bind() {
	    // friendly warning...
	    this.checkFilters();
	    if (this.hasRead && !this.hasWrite) {
	      process.env.NODE_ENV !== 'production' && warn('It seems you are using a read-only filter with ' + 'v-model. You might want to use a two-way filter ' + 'to ensure correct behavior.');
	    }
	    var el = this.el;
	    var tag = el.tagName;
	    var handler;
	    if (tag === 'INPUT') {
	      handler = handlers[el.type] || handlers.text;
	    } else if (tag === 'SELECT') {
	      handler = handlers.select;
	    } else if (tag === 'TEXTAREA') {
	      handler = handlers.text;
	    } else {
	      process.env.NODE_ENV !== 'production' && warn('v-model does not support element type: ' + tag);
	      return;
	    }
	    el.__v_model = this;
	    handler.bind.call(this);
	    this.update = handler.update;
	    this._unbind = handler.unbind;
	  },
	
	  /**
	   * Check read/write filter stats.
	   */
	
	  checkFilters: function checkFilters() {
	    var filters = this.filters;
	    if (!filters) return;
	    var i = filters.length;
	    while (i--) {
	      var filter = resolveAsset(this.vm.$options, 'filters', filters[i].name);
	      if (typeof filter === 'function' || filter.read) {
	        this.hasRead = true;
	      }
	      if (filter.write) {
	        this.hasWrite = true;
	      }
	    }
	  },
	
	  unbind: function unbind() {
	    this.el.__v_model = null;
	    this._unbind && this._unbind();
	  }
	};
	
	var show = {
	
	  bind: function bind() {
	    // check else block
	    var next = this.el.nextElementSibling;
	    if (next && getAttr(next, 'v-else') !== null) {
	      this.elseEl = next;
	    }
	  },
	
	  update: function update(value) {
	    this.apply(this.el, value);
	    if (this.elseEl) {
	      this.apply(this.elseEl, !value);
	    }
	  },
	
	  apply: function apply(el, value) {
	    if (inDoc(el)) {
	      applyTransition(el, value ? 1 : -1, toggle, this.vm);
	    } else {
	      toggle();
	    }
	    function toggle() {
	      el.style.display = value ? '' : 'none';
	    }
	  }
	};
	
	var templateCache = new Cache(1000);
	var idSelectorCache = new Cache(1000);
	
	var map = {
	  efault: [0, '', ''],
	  legend: [1, '<fieldset>', '</fieldset>'],
	  tr: [2, '<table><tbody>', '</tbody></table>'],
	  col: [2, '<table><tbody></tbody><colgroup>', '</colgroup></table>']
	};
	
	map.td = map.th = [3, '<table><tbody><tr>', '</tr></tbody></table>'];
	
	map.option = map.optgroup = [1, '<select multiple="multiple">', '</select>'];
	
	map.thead = map.tbody = map.colgroup = map.caption = map.tfoot = [1, '<table>', '</table>'];
	
	map.g = map.defs = map.symbol = map.use = map.image = map.text = map.circle = map.ellipse = map.line = map.path = map.polygon = map.polyline = map.rect = [1, '<svg ' + 'xmlns="http://www.w3.org/2000/svg" ' + 'xmlns:xlink="http://www.w3.org/1999/xlink" ' + 'xmlns:ev="http://www.w3.org/2001/xml-events"' + 'version="1.1">', '</svg>'];
	
	/**
	 * Check if a node is a supported template node with a
	 * DocumentFragment content.
	 *
	 * @param {Node} node
	 * @return {Boolean}
	 */
	
	function isRealTemplate(node) {
	  return isTemplate(node) && node.content instanceof DocumentFragment;
	}
	
	var tagRE$1 = /<([\w:]+)/;
	var entityRE = /&#?\w+?;/;
	
	/**
	 * Convert a string template to a DocumentFragment.
	 * Determines correct wrapping by tag types. Wrapping
	 * strategy found in jQuery & component/domify.
	 *
	 * @param {String} templateString
	 * @param {Boolean} raw
	 * @return {DocumentFragment}
	 */
	
	function stringToFragment(templateString, raw) {
	  // try a cache hit first
	  var hit = templateCache.get(templateString);
	  if (hit) {
	    return hit;
	  }
	
	  var frag = document.createDocumentFragment();
	  var tagMatch = templateString.match(tagRE$1);
	  var entityMatch = entityRE.test(templateString);
	
	  if (!tagMatch && !entityMatch) {
	    // text only, return a single text node.
	    frag.appendChild(document.createTextNode(templateString));
	  } else {
	
	    var tag = tagMatch && tagMatch[1];
	    var wrap = map[tag] || map.efault;
	    var depth = wrap[0];
	    var prefix = wrap[1];
	    var suffix = wrap[2];
	    var node = document.createElement('div');
	
	    var templateStringToUse = raw ? templateString : templateString.trim();
	    node.innerHTML = prefix + templateStringToUse + suffix;
	    while (depth--) {
	      node = node.lastChild;
	    }
	
	    var child;
	    /* eslint-disable no-cond-assign */
	    while (child = node.firstChild) {
	      /* eslint-enable no-cond-assign */
	      frag.appendChild(child);
	    }
	  }
	
	  templateCache.put(templateString, frag);
	  return frag;
	}
	
	/**
	 * Convert a template node to a DocumentFragment.
	 *
	 * @param {Node} node
	 * @return {DocumentFragment}
	 */
	
	function nodeToFragment(node) {
	  // if its a template tag and the browser supports it,
	  // its content is already a document fragment.
	  if (isRealTemplate(node)) {
	    trimNode(node.content);
	    return node.content;
	  }
	  // script template
	  if (node.tagName === 'SCRIPT') {
	    return stringToFragment(node.textContent);
	  }
	  // normal node, clone it to avoid mutating the original
	  var clonedNode = cloneNode(node);
	  var frag = document.createDocumentFragment();
	  var child;
	  /* eslint-disable no-cond-assign */
	  while (child = clonedNode.firstChild) {
	    /* eslint-enable no-cond-assign */
	    frag.appendChild(child);
	  }
	  trimNode(frag);
	  return frag;
	}
	
	// Test for the presence of the Safari template cloning bug
	// https://bugs.webkit.org/showug.cgi?id=137755
	var hasBrokenTemplate = (function () {
	  /* istanbul ignore else */
	  if (inBrowser) {
	    var a = document.createElement('div');
	    a.innerHTML = '<template>1</template>';
	    return !a.cloneNode(true).firstChild.innerHTML;
	  } else {
	    return false;
	  }
	})();
	
	// Test for IE10/11 textarea placeholder clone bug
	var hasTextareaCloneBug = (function () {
	  /* istanbul ignore else */
	  if (inBrowser) {
	    var t = document.createElement('textarea');
	    t.placeholder = 't';
	    return t.cloneNode(true).value === 't';
	  } else {
	    return false;
	  }
	})();
	
	/**
	 * 1. Deal with Safari cloning nested <template> bug by
	 *    manually cloning all template instances.
	 * 2. Deal with IE10/11 textarea placeholder bug by setting
	 *    the correct value after cloning.
	 *
	 * @param {Element|DocumentFragment} node
	 * @return {Element|DocumentFragment}
	 */
	
	function cloneNode(node) {
	  if (!node.querySelectorAll) {
	    return node.cloneNode();
	  }
	  var res = node.cloneNode(true);
	  var i, original, cloned;
	  /* istanbul ignore if */
	  if (hasBrokenTemplate) {
	    var tempClone = res;
	    if (isRealTemplate(node)) {
	      node = node.content;
	      tempClone = res.content;
	    }
	    original = node.querySelectorAll('template');
	    if (original.length) {
	      cloned = tempClone.querySelectorAll('template');
	      i = cloned.length;
	      while (i--) {
	        cloned[i].parentNode.replaceChild(cloneNode(original[i]), cloned[i]);
	      }
	    }
	  }
	  /* istanbul ignore if */
	  if (hasTextareaCloneBug) {
	    if (node.tagName === 'TEXTAREA') {
	      res.value = node.value;
	    } else {
	      original = node.querySelectorAll('textarea');
	      if (original.length) {
	        cloned = res.querySelectorAll('textarea');
	        i = cloned.length;
	        while (i--) {
	          cloned[i].value = original[i].value;
	        }
	      }
	    }
	  }
	  return res;
	}
	
	/**
	 * Process the template option and normalizes it into a
	 * a DocumentFragment that can be used as a partial or a
	 * instance template.
	 *
	 * @param {*} template
	 *        Possible values include:
	 *        - DocumentFragment object
	 *        - Node object of type Template
	 *        - id selector: '#some-template-id'
	 *        - template string: '<div><span>{{msg}}</span></div>'
	 * @param {Boolean} shouldClone
	 * @param {Boolean} raw
	 *        inline HTML interpolation. Do not check for id
	 *        selector and keep whitespace in the string.
	 * @return {DocumentFragment|undefined}
	 */
	
	function parseTemplate(template, shouldClone, raw) {
	  var node, frag;
	
	  // if the template is already a document fragment,
	  // do nothing
	  if (template instanceof DocumentFragment) {
	    trimNode(template);
	    return shouldClone ? cloneNode(template) : template;
	  }
	
	  if (typeof template === 'string') {
	    // id selector
	    if (!raw && template.charAt(0) === '#') {
	      // id selector can be cached too
	      frag = idSelectorCache.get(template);
	      if (!frag) {
	        node = document.getElementById(template.slice(1));
	        if (node) {
	          frag = nodeToFragment(node);
	          // save selector to cache
	          idSelectorCache.put(template, frag);
	        }
	      }
	    } else {
	      // normal string template
	      frag = stringToFragment(template, raw);
	    }
	  } else if (template.nodeType) {
	    // a direct node
	    frag = nodeToFragment(template);
	  }
	
	  return frag && shouldClone ? cloneNode(frag) : frag;
	}
	
	var template = Object.freeze({
	  cloneNode: cloneNode,
	  parseTemplate: parseTemplate
	});
	
	/**
	 * Abstraction for a partially-compiled fragment.
	 * Can optionally compile content with a child scope.
	 *
	 * @param {Function} linker
	 * @param {Vue} vm
	 * @param {DocumentFragment} frag
	 * @param {Vue} [host]
	 * @param {Object} [scope]
	 */
	function Fragment(linker, vm, frag, host, scope, parentFrag) {
	  this.children = [];
	  this.childFrags = [];
	  this.vm = vm;
	  this.scope = scope;
	  this.inserted = false;
	  this.parentFrag = parentFrag;
	  if (parentFrag) {
	    parentFrag.childFrags.push(this);
	  }
	  this.unlink = linker(vm, frag, host, scope, this);
	  var single = this.single = frag.childNodes.length === 1 &&
	  // do not go single mode if the only node is an anchor
	  !frag.childNodes[0].__vue_anchor;
	  if (single) {
	    this.node = frag.childNodes[0];
	    this.before = singleBefore;
	    this.remove = singleRemove;
	  } else {
	    this.node = createAnchor('fragment-start');
	    this.end = createAnchor('fragment-end');
	    this.frag = frag;
	    prepend(this.node, frag);
	    frag.appendChild(this.end);
	    this.before = multiBefore;
	    this.remove = multiRemove;
	  }
	  this.node.__vfrag__ = this;
	}
	
	/**
	 * Call attach/detach for all components contained within
	 * this fragment. Also do so recursively for all child
	 * fragments.
	 *
	 * @param {Function} hook
	 */
	
	Fragment.prototype.callHook = function (hook) {
	  var i, l;
	  for (i = 0, l = this.childFrags.length; i < l; i++) {
	    this.childFrags[i].callHook(hook);
	  }
	  for (i = 0, l = this.children.length; i < l; i++) {
	    hook(this.children[i]);
	  }
	};
	
	/**
	 * Insert fragment before target, single node version
	 *
	 * @param {Node} target
	 * @param {Boolean} withTransition
	 */
	
	function singleBefore(target, withTransition) {
	  this.inserted = true;
	  var method = withTransition !== false ? beforeWithTransition : before;
	  method(this.node, target, this.vm);
	  if (inDoc(this.node)) {
	    this.callHook(attach);
	  }
	}
	
	/**
	 * Remove fragment, single node version
	 */
	
	function singleRemove() {
	  this.inserted = false;
	  var shouldCallRemove = inDoc(this.node);
	  var self = this;
	  this.beforeRemove();
	  removeWithTransition(this.node, this.vm, function () {
	    if (shouldCallRemove) {
	      self.callHook(detach);
	    }
	    self.destroy();
	  });
	}
	
	/**
	 * Insert fragment before target, multi-nodes version
	 *
	 * @param {Node} target
	 * @param {Boolean} withTransition
	 */
	
	function multiBefore(target, withTransition) {
	  this.inserted = true;
	  var vm = this.vm;
	  var method = withTransition !== false ? beforeWithTransition : before;
	  mapNodeRange(this.node, this.end, function (node) {
	    method(node, target, vm);
	  });
	  if (inDoc(this.node)) {
	    this.callHook(attach);
	  }
	}
	
	/**
	 * Remove fragment, multi-nodes version
	 */
	
	function multiRemove() {
	  this.inserted = false;
	  var self = this;
	  var shouldCallRemove = inDoc(this.node);
	  this.beforeRemove();
	  removeNodeRange(this.node, this.end, this.vm, this.frag, function () {
	    if (shouldCallRemove) {
	      self.callHook(detach);
	    }
	    self.destroy();
	  });
	}
	
	/**
	 * Prepare the fragment for removal.
	 */
	
	Fragment.prototype.beforeRemove = function () {
	  var i, l;
	  for (i = 0, l = this.childFrags.length; i < l; i++) {
	    // call the same method recursively on child
	    // fragments, depth-first
	    this.childFrags[i].beforeRemove(false);
	  }
	  for (i = 0, l = this.children.length; i < l; i++) {
	    // Call destroy for all contained instances,
	    // with remove:false and defer:true.
	    // Defer is necessary because we need to
	    // keep the children to call detach hooks
	    // on them.
	    this.children[i].$destroy(false, true);
	  }
	  var dirs = this.unlink.dirs;
	  for (i = 0, l = dirs.length; i < l; i++) {
	    // disable the watchers on all the directives
	    // so that the rendered content stays the same
	    // during removal.
	    dirs[i]._watcher && dirs[i]._watcher.teardown();
	  }
	};
	
	/**
	 * Destroy the fragment.
	 */
	
	Fragment.prototype.destroy = function () {
	  if (this.parentFrag) {
	    this.parentFrag.childFrags.$remove(this);
	  }
	  this.node.__vfrag__ = null;
	  this.unlink();
	};
	
	/**
	 * Call attach hook for a Vue instance.
	 *
	 * @param {Vue} child
	 */
	
	function attach(child) {
	  if (!child._isAttached) {
	    child._callHook('attached');
	  }
	}
	
	/**
	 * Call detach hook for a Vue instance.
	 *
	 * @param {Vue} child
	 */
	
	function detach(child) {
	  if (child._isAttached) {
	    child._callHook('detached');
	  }
	}
	
	var linkerCache = new Cache(5000);
	
	/**
	 * A factory that can be used to create instances of a
	 * fragment. Caches the compiled linker if possible.
	 *
	 * @param {Vue} vm
	 * @param {Element|String} el
	 */
	function FragmentFactory(vm, el) {
	  this.vm = vm;
	  var template;
	  var isString = typeof el === 'string';
	  if (isString || isTemplate(el)) {
	    template = parseTemplate(el, true);
	  } else {
	    template = document.createDocumentFragment();
	    template.appendChild(el);
	  }
	  this.template = template;
	  // linker can be cached, but only for components
	  var linker;
	  var cid = vm.constructor.cid;
	  if (cid > 0) {
	    var cacheId = cid + (isString ? el : el.outerHTML);
	    linker = linkerCache.get(cacheId);
	    if (!linker) {
	      linker = compile(template, vm.$options, true);
	      linkerCache.put(cacheId, linker);
	    }
	  } else {
	    linker = compile(template, vm.$options, true);
	  }
	  this.linker = linker;
	}
	
	/**
	 * Create a fragment instance with given host and scope.
	 *
	 * @param {Vue} host
	 * @param {Object} scope
	 * @param {Fragment} parentFrag
	 */
	
	FragmentFactory.prototype.create = function (host, scope, parentFrag) {
	  var frag = cloneNode(this.template);
	  return new Fragment(this.linker, this.vm, frag, host, scope, parentFrag);
	};
	
	var vIf = {
	
	  priority: IF,
	
	  bind: function bind() {
	    var el = this.el;
	    if (!el.__vue__) {
	      // check else block
	      var next = el.nextElementSibling;
	      if (next && getAttr(next, 'v-else') !== null) {
	        remove(next);
	        this.elseFactory = new FragmentFactory(this.vm, next);
	      }
	      // check main block
	      this.anchor = createAnchor('v-if');
	      replace(el, this.anchor);
	      this.factory = new FragmentFactory(this.vm, el);
	    } else {
	      process.env.NODE_ENV !== 'production' && warn('v-if="' + this.expression + '" cannot be ' + 'used on an instance root element.');
	      this.invalid = true;
	    }
	  },
	
	  update: function update(value) {
	    if (this.invalid) return;
	    if (value) {
	      if (!this.frag) {
	        this.insert();
	      }
	    } else {
	      this.remove();
	    }
	  },
	
	  insert: function insert() {
	    if (this.elseFrag) {
	      this.elseFrag.remove();
	      this.elseFrag = null;
	    }
	    this.frag = this.factory.create(this._host, this._scope, this._frag);
	    this.frag.before(this.anchor);
	  },
	
	  remove: function remove() {
	    if (this.frag) {
	      this.frag.remove();
	      this.frag = null;
	    }
	    if (this.elseFactory && !this.elseFrag) {
	      this.elseFrag = this.elseFactory.create(this._host, this._scope, this._frag);
	      this.elseFrag.before(this.anchor);
	    }
	  },
	
	  unbind: function unbind() {
	    if (this.frag) {
	      this.frag.destroy();
	    }
	  }
	};
	
	var uid$1 = 0;
	
	var vFor = {
	
	  priority: FOR,
	
	  params: ['track-by', 'stagger', 'enter-stagger', 'leave-stagger'],
	
	  bind: function bind() {
	    // support "item in items" syntax
	    var inMatch = this.expression.match(/(.*) in (.*)/);
	    if (inMatch) {
	      var itMatch = inMatch[1].match(/\((.*),(.*)\)/);
	      if (itMatch) {
	        this.iterator = itMatch[1].trim();
	        this.alias = itMatch[2].trim();
	      } else {
	        this.alias = inMatch[1].trim();
	      }
	      this.expression = inMatch[2];
	    }
	
	    if (!this.alias) {
	      process.env.NODE_ENV !== 'production' && warn('Alias is required in v-for.');
	      return;
	    }
	
	    // uid as a cache identifier
	    this.id = '__v-for__' + ++uid$1;
	
	    // check if this is an option list,
	    // so that we know if we need to update the <select>'s
	    // v-model when the option list has changed.
	    // because v-model has a lower priority than v-for,
	    // the v-model is not bound here yet, so we have to
	    // retrive it in the actual updateModel() function.
	    var tag = this.el.tagName;
	    this.isOption = (tag === 'OPTION' || tag === 'OPTGROUP') && this.el.parentNode.tagName === 'SELECT';
	
	    // setup anchor nodes
	    this.start = createAnchor('v-for-start');
	    this.end = createAnchor('v-for-end');
	    replace(this.el, this.end);
	    before(this.start, this.end);
	
	    // cache
	    this.cache = Object.create(null);
	
	    // fragment factory
	    this.factory = new FragmentFactory(this.vm, this.el);
	  },
	
	  update: function update(data) {
	    this.diff(data);
	    this.updateRef();
	    this.updateModel();
	  },
	
	  /**
	   * Diff, based on new data and old data, determine the
	   * minimum amount of DOM manipulations needed to make the
	   * DOM reflect the new data Array.
	   *
	   * The algorithm diffs the new data Array by storing a
	   * hidden reference to an owner vm instance on previously
	   * seen data. This allows us to achieve O(n) which is
	   * better than a levenshtein distance based algorithm,
	   * which is O(m * n).
	   *
	   * @param {Array} data
	   */
	
	  diff: function diff(data) {
	    // check if the Array was converted from an Object
	    var item = data[0];
	    var convertedFromObject = this.fromObject = isObject(item) && hasOwn(item, '$key') && hasOwn(item, '$value');
	
	    var trackByKey = this.params.trackBy;
	    var oldFrags = this.frags;
	    var frags = this.frags = new Array(data.length);
	    var alias = this.alias;
	    var iterator = this.iterator;
	    var start = this.start;
	    var end = this.end;
	    var inDocument = inDoc(start);
	    var init = !oldFrags;
	    var i, l, frag, key, value, primitive;
	
	    // First pass, go through the new Array and fill up
	    // the new frags array. If a piece of data has a cached
	    // instance for it, we reuse it. Otherwise build a new
	    // instance.
	    for (i = 0, l = data.length; i < l; i++) {
	      item = data[i];
	      key = convertedFromObject ? item.$key : null;
	      value = convertedFromObject ? item.$value : item;
	      primitive = !isObject(value);
	      frag = !init && this.getCachedFrag(value, i, key);
	      if (frag) {
	        // reusable fragment
	        frag.reused = true;
	        // update $index
	        frag.scope.$index = i;
	        // update $key
	        if (key) {
	          frag.scope.$key = key;
	        }
	        // update iterator
	        if (iterator) {
	          frag.scope[iterator] = key !== null ? key : i;
	        }
	        // update data for track-by, object repeat &
	        // primitive values.
	        if (trackByKey || convertedFromObject || primitive) {
	          frag.scope[alias] = value;
	        }
	      } else {
	        // new isntance
	        frag = this.create(value, alias, i, key);
	        frag.fresh = !init;
	      }
	      frags[i] = frag;
	      if (init) {
	        frag.before(end);
	      }
	    }
	
	    // we're done for the initial render.
	    if (init) {
	      return;
	    }
	
	    // Second pass, go through the old fragments and
	    // destroy those who are not reused (and remove them
	    // from cache)
	    var removalIndex = 0;
	    var totalRemoved = oldFrags.length - frags.length;
	    for (i = 0, l = oldFrags.length; i < l; i++) {
	      frag = oldFrags[i];
	      if (!frag.reused) {
	        this.deleteCachedFrag(frag);
	        this.remove(frag, removalIndex++, totalRemoved, inDocument);
	      }
	    }
	
	    // Final pass, move/insert new fragments into the
	    // right place.
	    var targetPrev, prevEl, currentPrev;
	    var insertionIndex = 0;
	    for (i = 0, l = frags.length; i < l; i++) {
	      frag = frags[i];
	      // this is the frag that we should be after
	      targetPrev = frags[i - 1];
	      prevEl = targetPrev ? targetPrev.staggerCb ? targetPrev.staggerAnchor : targetPrev.end || targetPrev.node : start;
	      if (frag.reused && !frag.staggerCb) {
	        currentPrev = findPrevFrag(frag, start, this.id);
	        if (currentPrev !== targetPrev && (!currentPrev ||
	        // optimization for moving a single item.
	        // thanks to suggestions by @livoras in #1807
	        findPrevFrag(currentPrev, start, this.id) !== targetPrev)) {
	          this.move(frag, prevEl);
	        }
	      } else {
	        // new instance, or still in stagger.
	        // insert with updated stagger index.
	        this.insert(frag, insertionIndex++, prevEl, inDocument);
	      }
	      frag.reused = frag.fresh = false;
	    }
	  },
	
	  /**
	   * Create a new fragment instance.
	   *
	   * @param {*} value
	   * @param {String} alias
	   * @param {Number} index
	   * @param {String} [key]
	   * @return {Fragment}
	   */
	
	  create: function create(value, alias, index, key) {
	    var host = this._host;
	    // create iteration scope
	    var parentScope = this._scope || this.vm;
	    var scope = Object.create(parentScope);
	    // ref holder for the scope
	    scope.$refs = Object.create(parentScope.$refs);
	    scope.$els = Object.create(parentScope.$els);
	    // make sure point $parent to parent scope
	    scope.$parent = parentScope;
	    // for two-way binding on alias
	    scope.$forContext = this;
	    // define scope properties
	    defineReactive(scope, alias, value);
	    defineReactive(scope, '$index', index);
	    if (key) {
	      defineReactive(scope, '$key', key);
	    } else if (scope.$key) {
	      // avoid accidental fallback
	      def(scope, '$key', null);
	    }
	    if (this.iterator) {
	      defineReactive(scope, this.iterator, key !== null ? key : index);
	    }
	    var frag = this.factory.create(host, scope, this._frag);
	    frag.forId = this.id;
	    this.cacheFrag(value, frag, index, key);
	    return frag;
	  },
	
	  /**
	   * Update the v-ref on owner vm.
	   */
	
	  updateRef: function updateRef() {
	    var ref = this.descriptor.ref;
	    if (!ref) return;
	    var hash = (this._scope || this.vm).$refs;
	    var refs;
	    if (!this.fromObject) {
	      refs = this.frags.map(findVmFromFrag);
	    } else {
	      refs = {};
	      this.frags.forEach(function (frag) {
	        refs[frag.scope.$key] = findVmFromFrag(frag);
	      });
	    }
	    hash[ref] = refs;
	  },
	
	  /**
	   * For option lists, update the containing v-model on
	   * parent <select>.
	   */
	
	  updateModel: function updateModel() {
	    if (this.isOption) {
	      var parent = this.start.parentNode;
	      var model = parent && parent.__v_model;
	      if (model) {
	        model.forceUpdate();
	      }
	    }
	  },
	
	  /**
	   * Insert a fragment. Handles staggering.
	   *
	   * @param {Fragment} frag
	   * @param {Number} index
	   * @param {Node} prevEl
	   * @param {Boolean} inDocument
	   */
	
	  insert: function insert(frag, index, prevEl, inDocument) {
	    if (frag.staggerCb) {
	      frag.staggerCb.cancel();
	      frag.staggerCb = null;
	    }
	    var staggerAmount = this.getStagger(frag, index, null, 'enter');
	    if (inDocument && staggerAmount) {
	      // create an anchor and insert it synchronously,
	      // so that we can resolve the correct order without
	      // worrying about some elements not inserted yet
	      var anchor = frag.staggerAnchor;
	      if (!anchor) {
	        anchor = frag.staggerAnchor = createAnchor('stagger-anchor');
	        anchor.__vfrag__ = frag;
	      }
	      after(anchor, prevEl);
	      var op = frag.staggerCb = cancellable(function () {
	        frag.staggerCb = null;
	        frag.before(anchor);
	        remove(anchor);
	      });
	      setTimeout(op, staggerAmount);
	    } else {
	      frag.before(prevEl.nextSibling);
	    }
	  },
	
	  /**
	   * Remove a fragment. Handles staggering.
	   *
	   * @param {Fragment} frag
	   * @param {Number} index
	   * @param {Number} total
	   * @param {Boolean} inDocument
	   */
	
	  remove: function remove(frag, index, total, inDocument) {
	    if (frag.staggerCb) {
	      frag.staggerCb.cancel();
	      frag.staggerCb = null;
	      // it's not possible for the same frag to be removed
	      // twice, so if we have a pending stagger callback,
	      // it means this frag is queued for enter but removed
	      // before its transition started. Since it is already
	      // destroyed, we can just leave it in detached state.
	      return;
	    }
	    var staggerAmount = this.getStagger(frag, index, total, 'leave');
	    if (inDocument && staggerAmount) {
	      var op = frag.staggerCb = cancellable(function () {
	        frag.staggerCb = null;
	        frag.remove();
	      });
	      setTimeout(op, staggerAmount);
	    } else {
	      frag.remove();
	    }
	  },
	
	  /**
	   * Move a fragment to a new position.
	   * Force no transition.
	   *
	   * @param {Fragment} frag
	   * @param {Node} prevEl
	   */
	
	  move: function move(frag, prevEl) {
	    // fix a common issue with Sortable:
	    // if prevEl doesn't have nextSibling, this means it's
	    // been dragged after the end anchor. Just re-position
	    // the end anchor to the end of the container.
	    /* istanbul ignore if */
	    if (!prevEl.nextSibling) {
	      this.end.parentNode.appendChild(this.end);
	    }
	    frag.before(prevEl.nextSibling, false);
	  },
	
	  /**
	   * Cache a fragment using track-by or the object key.
	   *
	   * @param {*} value
	   * @param {Fragment} frag
	   * @param {Number} index
	   * @param {String} [key]
	   */
	
	  cacheFrag: function cacheFrag(value, frag, index, key) {
	    var trackByKey = this.params.trackBy;
	    var cache = this.cache;
	    var primitive = !isObject(value);
	    var id;
	    if (key || trackByKey || primitive) {
	      id = trackByKey ? trackByKey === '$index' ? index : value[trackByKey] : key || value;
	      if (!cache[id]) {
	        cache[id] = frag;
	      } else if (trackByKey !== '$index') {
	        process.env.NODE_ENV !== 'production' && this.warnDuplicate(value);
	      }
	    } else {
	      id = this.id;
	      if (hasOwn(value, id)) {
	        if (value[id] === null) {
	          value[id] = frag;
	        } else {
	          process.env.NODE_ENV !== 'production' && this.warnDuplicate(value);
	        }
	      } else {
	        def(value, id, frag);
	      }
	    }
	    frag.raw = value;
	  },
	
	  /**
	   * Get a cached fragment from the value/index/key
	   *
	   * @param {*} value
	   * @param {Number} index
	   * @param {String} key
	   * @return {Fragment}
	   */
	
	  getCachedFrag: function getCachedFrag(value, index, key) {
	    var trackByKey = this.params.trackBy;
	    var primitive = !isObject(value);
	    var frag;
	    if (key || trackByKey || primitive) {
	      var id = trackByKey ? trackByKey === '$index' ? index : value[trackByKey] : key || value;
	      frag = this.cache[id];
	    } else {
	      frag = value[this.id];
	    }
	    if (frag && (frag.reused || frag.fresh)) {
	      process.env.NODE_ENV !== 'production' && this.warnDuplicate(value);
	    }
	    return frag;
	  },
	
	  /**
	   * Delete a fragment from cache.
	   *
	   * @param {Fragment} frag
	   */
	
	  deleteCachedFrag: function deleteCachedFrag(frag) {
	    var value = frag.raw;
	    var trackByKey = this.params.trackBy;
	    var scope = frag.scope;
	    var index = scope.$index;
	    // fix #948: avoid accidentally fall through to
	    // a parent repeater which happens to have $key.
	    var key = hasOwn(scope, '$key') && scope.$key;
	    var primitive = !isObject(value);
	    if (trackByKey || key || primitive) {
	      var id = trackByKey ? trackByKey === '$index' ? index : value[trackByKey] : key || value;
	      this.cache[id] = null;
	    } else {
	      value[this.id] = null;
	      frag.raw = null;
	    }
	  },
	
	  /**
	   * Get the stagger amount for an insertion/removal.
	   *
	   * @param {Fragment} frag
	   * @param {Number} index
	   * @param {Number} total
	   * @param {String} type
	   */
	
	  getStagger: function getStagger(frag, index, total, type) {
	    type = type + 'Stagger';
	    var trans = frag.node.__v_trans;
	    var hooks = trans && trans.hooks;
	    var hook = hooks && (hooks[type] || hooks.stagger);
	    return hook ? hook.call(frag, index, total) : index * parseInt(this.params[type] || this.params.stagger, 10);
	  },
	
	  /**
	   * Pre-process the value before piping it through the
	   * filters. This is passed to and called by the watcher.
	   */
	
	  _preProcess: function _preProcess(value) {
	    // regardless of type, store the un-filtered raw value.
	    this.rawValue = value;
	    return value;
	  },
	
	  /**
	   * Post-process the value after it has been piped through
	   * the filters. This is passed to and called by the watcher.
	   *
	   * It is necessary for this to be called during the
	   * wathcer's dependency collection phase because we want
	   * the v-for to update when the source Object is mutated.
	   */
	
	  _postProcess: function _postProcess(value) {
	    if (isArray(value)) {
	      return value;
	    } else if (isPlainObject(value)) {
	      // convert plain object to array.
	      var keys = Object.keys(value);
	      var i = keys.length;
	      var res = new Array(i);
	      var key;
	      while (i--) {
	        key = keys[i];
	        res[i] = {
	          $key: key,
	          $value: value[key]
	        };
	      }
	      return res;
	    } else {
	      if (typeof value === 'number') {
	        value = range(value);
	      }
	      return value || [];
	    }
	  },
	
	  unbind: function unbind() {
	    if (this.descriptor.ref) {
	      (this._scope || this.vm).$refs[this.descriptor.ref] = null;
	    }
	    if (this.frags) {
	      var i = this.frags.length;
	      var frag;
	      while (i--) {
	        frag = this.frags[i];
	        this.deleteCachedFrag(frag);
	        frag.destroy();
	      }
	    }
	  }
	};
	
	/**
	 * Helper to find the previous element that is a fragment
	 * anchor. This is necessary because a destroyed frag's
	 * element could still be lingering in the DOM before its
	 * leaving transition finishes, but its inserted flag
	 * should have been set to false so we can skip them.
	 *
	 * If this is a block repeat, we want to make sure we only
	 * return frag that is bound to this v-for. (see #929)
	 *
	 * @param {Fragment} frag
	 * @param {Comment|Text} anchor
	 * @param {String} id
	 * @return {Fragment}
	 */
	
	function findPrevFrag(frag, anchor, id) {
	  var el = frag.node.previousSibling;
	  /* istanbul ignore if */
	  if (!el) return;
	  frag = el.__vfrag__;
	  while ((!frag || frag.forId !== id || !frag.inserted) && el !== anchor) {
	    el = el.previousSibling;
	    /* istanbul ignore if */
	    if (!el) return;
	    frag = el.__vfrag__;
	  }
	  return frag;
	}
	
	/**
	 * Find a vm from a fragment.
	 *
	 * @param {Fragment} frag
	 * @return {Vue|undefined}
	 */
	
	function findVmFromFrag(frag) {
	  var node = frag.node;
	  // handle multi-node frag
	  if (frag.end) {
	    while (!node.__vue__ && node !== frag.end && node.nextSibling) {
	      node = node.nextSibling;
	    }
	  }
	  return node.__vue__;
	}
	
	/**
	 * Create a range array from given number.
	 *
	 * @param {Number} n
	 * @return {Array}
	 */
	
	function range(n) {
	  var i = -1;
	  var ret = new Array(n);
	  while (++i < n) {
	    ret[i] = i;
	  }
	  return ret;
	}
	
	if (process.env.NODE_ENV !== 'production') {
	  vFor.warnDuplicate = function (value) {
	    warn('Duplicate value found in v-for="' + this.descriptor.raw + '": ' + JSON.stringify(value) + '. Use track-by="$index" if ' + 'you are expecting duplicate values.');
	  };
	}
	
	var html = {
	
	  bind: function bind() {
	    // a comment node means this is a binding for
	    // {{{ inline unescaped html }}}
	    if (this.el.nodeType === 8) {
	      // hold nodes
	      this.nodes = [];
	      // replace the placeholder with proper anchor
	      this.anchor = createAnchor('v-html');
	      replace(this.el, this.anchor);
	    }
	  },
	
	  update: function update(value) {
	    value = _toString(value);
	    if (this.nodes) {
	      this.swap(value);
	    } else {
	      this.el.innerHTML = value;
	    }
	  },
	
	  swap: function swap(value) {
	    // remove old nodes
	    var i = this.nodes.length;
	    while (i--) {
	      remove(this.nodes[i]);
	    }
	    // convert new value to a fragment
	    // do not attempt to retrieve from id selector
	    var frag = parseTemplate(value, true, true);
	    // save a reference to these nodes so we can remove later
	    this.nodes = toArray(frag.childNodes);
	    before(frag, this.anchor);
	  }
	};
	
	var text = {
	
	  bind: function bind() {
	    this.attr = this.el.nodeType === 3 ? 'data' : 'textContent';
	  },
	
	  update: function update(value) {
	    this.el[this.attr] = _toString(value);
	  }
	};
	
	// must export plain object
	var publicDirectives = {
	  text: text,
	  html: html,
	  'for': vFor,
	  'if': vIf,
	  show: show,
	  model: model,
	  on: on,
	  bind: bind,
	  el: el,
	  ref: ref,
	  cloak: cloak
	};
	
	var queue$1 = [];
	var queued = false;
	
	/**
	 * Push a job into the queue.
	 *
	 * @param {Function} job
	 */
	
	function pushJob(job) {
	  queue$1.push(job);
	  if (!queued) {
	    queued = true;
	    nextTick(flush);
	  }
	}
	
	/**
	 * Flush the queue, and do one forced reflow before
	 * triggering transitions.
	 */
	
	function flush() {
	  // Force layout
	  var f = document.documentElement.offsetHeight;
	  for (var i = 0; i < queue$1.length; i++) {
	    queue$1[i]();
	  }
	  queue$1 = [];
	  queued = false;
	  // dummy return, so js linters don't complain about
	  // unused variable f
	  return f;
	}
	
	var TYPE_TRANSITION = 'transition';
	var TYPE_ANIMATION = 'animation';
	var transDurationProp = transitionProp + 'Duration';
	var animDurationProp = animationProp + 'Duration';
	
	/**
	 * A Transition object that encapsulates the state and logic
	 * of the transition.
	 *
	 * @param {Element} el
	 * @param {String} id
	 * @param {Object} hooks
	 * @param {Vue} vm
	 */
	function Transition(el, id, hooks, vm) {
	  this.id = id;
	  this.el = el;
	  this.enterClass = hooks && hooks.enterClass || id + '-enter';
	  this.leaveClass = hooks && hooks.leaveClass || id + '-leave';
	  this.hooks = hooks;
	  this.vm = vm;
	  // async state
	  this.pendingCssEvent = this.pendingCssCb = this.cancel = this.pendingJsCb = this.op = this.cb = null;
	  this.justEntered = false;
	  this.entered = this.left = false;
	  this.typeCache = {};
	  // check css transition type
	  this.type = hooks && hooks.type;
	  /* istanbul ignore if */
	  if (process.env.NODE_ENV !== 'production') {
	    if (this.type && this.type !== TYPE_TRANSITION && this.type !== TYPE_ANIMATION) {
	      warn('invalid CSS transition type for transition="' + this.id + '": ' + this.type);
	    }
	  }
	  // bind
	  var self = this;['enterNextTick', 'enterDone', 'leaveNextTick', 'leaveDone'].forEach(function (m) {
	    self[m] = bind$1(self[m], self);
	  });
	}
	
	var p$1 = Transition.prototype;
	
	/**
	 * Start an entering transition.
	 *
	 * 1. enter transition triggered
	 * 2. call beforeEnter hook
	 * 3. add enter class
	 * 4. insert/show element
	 * 5. call enter hook (with possible explicit js callback)
	 * 6. reflow
	 * 7. based on transition type:
	 *    - transition:
	 *        remove class now, wait for transitionend,
	 *        then done if there's no explicit js callback.
	 *    - animation:
	 *        wait for animationend, remove class,
	 *        then done if there's no explicit js callback.
	 *    - no css transition:
	 *        done now if there's no explicit js callback.
	 * 8. wait for either done or js callback, then call
	 *    afterEnter hook.
	 *
	 * @param {Function} op - insert/show the element
	 * @param {Function} [cb]
	 */
	
	p$1.enter = function (op, cb) {
	  this.cancelPending();
	  this.callHook('beforeEnter');
	  this.cb = cb;
	  addClass(this.el, this.enterClass);
	  op();
	  this.entered = false;
	  this.callHookWithCb('enter');
	  if (this.entered) {
	    return; // user called done synchronously.
	  }
	  this.cancel = this.hooks && this.hooks.enterCancelled;
	  pushJob(this.enterNextTick);
	};
	
	/**
	 * The "nextTick" phase of an entering transition, which is
	 * to be pushed into a queue and executed after a reflow so
	 * that removing the class can trigger a CSS transition.
	 */
	
	p$1.enterNextTick = function () {
	
	  // Important hack:
	  // in Chrome, if a just-entered element is applied the
	  // leave class while its interpolated property still has
	  // a very small value (within one frame), Chrome will
	  // skip the leave transition entirely and not firing the
	  // transtionend event. Therefore we need to protected
	  // against such cases using a one-frame timeout.
	  this.justEntered = true;
	  var self = this;
	  setTimeout(function () {
	    self.justEntered = false;
	  }, 17);
	
	  var enterDone = this.enterDone;
	  var type = this.getCssTransitionType(this.enterClass);
	  if (!this.pendingJsCb) {
	    if (type === TYPE_TRANSITION) {
	      // trigger transition by removing enter class now
	      removeClass(this.el, this.enterClass);
	      this.setupCssCb(transitionEndEvent, enterDone);
	    } else if (type === TYPE_ANIMATION) {
	      this.setupCssCb(animationEndEvent, enterDone);
	    } else {
	      enterDone();
	    }
	  } else if (type === TYPE_TRANSITION) {
	    removeClass(this.el, this.enterClass);
	  }
	};
	
	/**
	 * The "cleanup" phase of an entering transition.
	 */
	
	p$1.enterDone = function () {
	  this.entered = true;
	  this.cancel = this.pendingJsCb = null;
	  removeClass(this.el, this.enterClass);
	  this.callHook('afterEnter');
	  if (this.cb) this.cb();
	};
	
	/**
	 * Start a leaving transition.
	 *
	 * 1. leave transition triggered.
	 * 2. call beforeLeave hook
	 * 3. add leave class (trigger css transition)
	 * 4. call leave hook (with possible explicit js callback)
	 * 5. reflow if no explicit js callback is provided
	 * 6. based on transition type:
	 *    - transition or animation:
	 *        wait for end event, remove class, then done if
	 *        there's no explicit js callback.
	 *    - no css transition:
	 *        done if there's no explicit js callback.
	 * 7. wait for either done or js callback, then call
	 *    afterLeave hook.
	 *
	 * @param {Function} op - remove/hide the element
	 * @param {Function} [cb]
	 */
	
	p$1.leave = function (op, cb) {
	  this.cancelPending();
	  this.callHook('beforeLeave');
	  this.op = op;
	  this.cb = cb;
	  addClass(this.el, this.leaveClass);
	  this.left = false;
	  this.callHookWithCb('leave');
	  if (this.left) {
	    return; // user called done synchronously.
	  }
	  this.cancel = this.hooks && this.hooks.leaveCancelled;
	  // only need to handle leaveDone if
	  // 1. the transition is already done (synchronously called
	  //    by the user, which causes this.op set to null)
	  // 2. there's no explicit js callback
	  if (this.op && !this.pendingJsCb) {
	    // if a CSS transition leaves immediately after enter,
	    // the transitionend event never fires. therefore we
	    // detect such cases and end the leave immediately.
	    if (this.justEntered) {
	      this.leaveDone();
	    } else {
	      pushJob(this.leaveNextTick);
	    }
	  }
	};
	
	/**
	 * The "nextTick" phase of a leaving transition.
	 */
	
	p$1.leaveNextTick = function () {
	  var type = this.getCssTransitionType(this.leaveClass);
	  if (type) {
	    var event = type === TYPE_TRANSITION ? transitionEndEvent : animationEndEvent;
	    this.setupCssCb(event, this.leaveDone);
	  } else {
	    this.leaveDone();
	  }
	};
	
	/**
	 * The "cleanup" phase of a leaving transition.
	 */
	
	p$1.leaveDone = function () {
	  this.left = true;
	  this.cancel = this.pendingJsCb = null;
	  this.op();
	  removeClass(this.el, this.leaveClass);
	  this.callHook('afterLeave');
	  if (this.cb) this.cb();
	  this.op = null;
	};
	
	/**
	 * Cancel any pending callbacks from a previously running
	 * but not finished transition.
	 */
	
	p$1.cancelPending = function () {
	  this.op = this.cb = null;
	  var hasPending = false;
	  if (this.pendingCssCb) {
	    hasPending = true;
	    off(this.el, this.pendingCssEvent, this.pendingCssCb);
	    this.pendingCssEvent = this.pendingCssCb = null;
	  }
	  if (this.pendingJsCb) {
	    hasPending = true;
	    this.pendingJsCb.cancel();
	    this.pendingJsCb = null;
	  }
	  if (hasPending) {
	    removeClass(this.el, this.enterClass);
	    removeClass(this.el, this.leaveClass);
	  }
	  if (this.cancel) {
	    this.cancel.call(this.vm, this.el);
	    this.cancel = null;
	  }
	};
	
	/**
	 * Call a user-provided synchronous hook function.
	 *
	 * @param {String} type
	 */
	
	p$1.callHook = function (type) {
	  if (this.hooks && this.hooks[type]) {
	    this.hooks[type].call(this.vm, this.el);
	  }
	};
	
	/**
	 * Call a user-provided, potentially-async hook function.
	 * We check for the length of arguments to see if the hook
	 * expects a `done` callback. If true, the transition's end
	 * will be determined by when the user calls that callback;
	 * otherwise, the end is determined by the CSS transition or
	 * animation.
	 *
	 * @param {String} type
	 */
	
	p$1.callHookWithCb = function (type) {
	  var hook = this.hooks && this.hooks[type];
	  if (hook) {
	    if (hook.length > 1) {
	      this.pendingJsCb = cancellable(this[type + 'Done']);
	    }
	    hook.call(this.vm, this.el, this.pendingJsCb);
	  }
	};
	
	/**
	 * Get an element's transition type based on the
	 * calculated styles.
	 *
	 * @param {String} className
	 * @return {Number}
	 */
	
	p$1.getCssTransitionType = function (className) {
	  /* istanbul ignore if */
	  if (!transitionEndEvent ||
	  // skip CSS transitions if page is not visible -
	  // this solves the issue of transitionend events not
	  // firing until the page is visible again.
	  // pageVisibility API is supported in IE10+, same as
	  // CSS transitions.
	  document.hidden ||
	  // explicit js-only transition
	  this.hooks && this.hooks.css === false ||
	  // element is hidden
	  isHidden(this.el)) {
	    return;
	  }
	  var type = this.type || this.typeCache[className];
	  if (type) return type;
	  var inlineStyles = this.el.style;
	  var computedStyles = window.getComputedStyle(this.el);
	  var transDuration = inlineStyles[transDurationProp] || computedStyles[transDurationProp];
	  if (transDuration && transDuration !== '0s') {
	    type = TYPE_TRANSITION;
	  } else {
	    var animDuration = inlineStyles[animDurationProp] || computedStyles[animDurationProp];
	    if (animDuration && animDuration !== '0s') {
	      type = TYPE_ANIMATION;
	    }
	  }
	  if (type) {
	    this.typeCache[className] = type;
	  }
	  return type;
	};
	
	/**
	 * Setup a CSS transitionend/animationend callback.
	 *
	 * @param {String} event
	 * @param {Function} cb
	 */
	
	p$1.setupCssCb = function (event, cb) {
	  this.pendingCssEvent = event;
	  var self = this;
	  var el = this.el;
	  var onEnd = this.pendingCssCb = function (e) {
	    if (e.target === el) {
	      off(el, event, onEnd);
	      self.pendingCssEvent = self.pendingCssCb = null;
	      if (!self.pendingJsCb && cb) {
	        cb();
	      }
	    }
	  };
	  on$1(el, event, onEnd);
	};
	
	/**
	 * Check if an element is hidden - in that case we can just
	 * skip the transition alltogether.
	 *
	 * @param {Element} el
	 * @return {Boolean}
	 */
	
	function isHidden(el) {
	  return !(el.offsetWidth || el.offsetHeight || el.getClientRects().length);
	}
	
	var transition = {
	
	  priority: TRANSITION,
	
	  update: function update(id, oldId) {
	    var el = this.el;
	    // resolve on owner vm
	    var hooks = resolveAsset(this.vm.$options, 'transitions', id);
	    id = id || 'v';
	    // apply on closest vm
	    el.__v_trans = new Transition(el, id, hooks, this.el.__vue__ || this.vm);
	    if (oldId) {
	      removeClass(el, oldId + '-transition');
	    }
	    addClass(el, id + '-transition');
	  }
	};
	
	var bindingModes = config._propBindingModes;
	
	var propDef = {
	
	  bind: function bind() {
	
	    var child = this.vm;
	    var parent = child._context;
	    // passed in from compiler directly
	    var prop = this.descriptor.prop;
	    var childKey = prop.path;
	    var parentKey = prop.parentPath;
	    var twoWay = prop.mode === bindingModes.TWO_WAY;
	
	    var parentWatcher = this.parentWatcher = new Watcher(parent, parentKey, function (val) {
	      val = coerceProp(prop, val);
	      if (assertProp(prop, val)) {
	        child[childKey] = val;
	      }
	    }, {
	      twoWay: twoWay,
	      filters: prop.filters,
	      // important: props need to be observed on the
	      // v-for scope if present
	      scope: this._scope
	    });
	
	    // set the child initial value.
	    initProp(child, prop, parentWatcher.value);
	
	    // setup two-way binding
	    if (twoWay) {
	      // important: defer the child watcher creation until
	      // the created hook (after data observation)
	      var self = this;
	      child.$once('pre-hook:created', function () {
	        self.childWatcher = new Watcher(child, childKey, function (val) {
	          parentWatcher.set(val);
	        }, {
	          // ensure sync upward before parent sync down.
	          // this is necessary in cases e.g. the child
	          // mutates a prop array, then replaces it. (#1683)
	          sync: true
	        });
	      });
	    }
	  },
	
	  unbind: function unbind() {
	    this.parentWatcher.teardown();
	    if (this.childWatcher) {
	      this.childWatcher.teardown();
	    }
	  }
	};
	
	var component = {
	
	  priority: COMPONENT,
	
	  params: ['keep-alive', 'transition-mode', 'inline-template'],
	
	  /**
	   * Setup. Two possible usages:
	   *
	   * - static:
	   *   <comp> or <div v-component="comp">
	   *
	   * - dynamic:
	   *   <component :is="view">
	   */
	
	  bind: function bind() {
	    if (!this.el.__vue__) {
	      // keep-alive cache
	      this.keepAlive = this.params.keepAlive;
	      if (this.keepAlive) {
	        this.cache = {};
	      }
	      // check inline-template
	      if (this.params.inlineTemplate) {
	        // extract inline template as a DocumentFragment
	        this.inlineTemplate = extractContent(this.el, true);
	      }
	      // component resolution related state
	      this.pendingComponentCb = this.Component = null;
	      // transition related state
	      this.pendingRemovals = 0;
	      this.pendingRemovalCb = null;
	      // create a ref anchor
	      this.anchor = createAnchor('v-component');
	      replace(this.el, this.anchor);
	      // remove is attribute.
	      // this is removed during compilation, but because compilation is
	      // cached, when the component is used elsewhere this attribute
	      // will remain at link time.
	      this.el.removeAttribute('is');
	      // remove ref, same as above
	      if (this.descriptor.ref) {
	        this.el.removeAttribute('v-ref:' + hyphenate(this.descriptor.ref));
	      }
	      // if static, build right now.
	      if (this.literal) {
	        this.setComponent(this.expression);
	      }
	    } else {
	      process.env.NODE_ENV !== 'production' && warn('cannot mount component "' + this.expression + '" ' + 'on already mounted element: ' + this.el);
	    }
	  },
	
	  /**
	   * Public update, called by the watcher in the dynamic
	   * literal scenario, e.g. <component :is="view">
	   */
	
	  update: function update(value) {
	    if (!this.literal) {
	      this.setComponent(value);
	    }
	  },
	
	  /**
	   * Switch dynamic components. May resolve the component
	   * asynchronously, and perform transition based on
	   * specified transition mode. Accepts a few additional
	   * arguments specifically for vue-router.
	   *
	   * The callback is called when the full transition is
	   * finished.
	   *
	   * @param {String} value
	   * @param {Function} [cb]
	   */
	
	  setComponent: function setComponent(value, cb) {
	    this.invalidatePending();
	    if (!value) {
	      // just remove current
	      this.unbuild(true);
	      this.remove(this.childVM, cb);
	      this.childVM = null;
	    } else {
	      var self = this;
	      this.resolveComponent(value, function () {
	        self.mountComponent(cb);
	      });
	    }
	  },
	
	  /**
	   * Resolve the component constructor to use when creating
	   * the child vm.
	   */
	
	  resolveComponent: function resolveComponent(id, cb) {
	    var self = this;
	    this.pendingComponentCb = cancellable(function (Component) {
	      self.ComponentName = Component.options.name || id;
	      self.Component = Component;
	      cb();
	    });
	    this.vm._resolveComponent(id, this.pendingComponentCb);
	  },
	
	  /**
	   * Create a new instance using the current constructor and
	   * replace the existing instance. This method doesn't care
	   * whether the new component and the old one are actually
	   * the same.
	   *
	   * @param {Function} [cb]
	   */
	
	  mountComponent: function mountComponent(cb) {
	    // actual mount
	    this.unbuild(true);
	    var self = this;
	    var activateHook = this.Component.options.activate;
	    var cached = this.getCached();
	    var newComponent = this.build();
	    if (activateHook && !cached) {
	      this.waitingFor = newComponent;
	      activateHook.call(newComponent, function () {
	        if (self.waitingFor !== newComponent) {
	          return;
	        }
	        self.waitingFor = null;
	        self.transition(newComponent, cb);
	      });
	    } else {
	      // update ref for kept-alive component
	      if (cached) {
	        newComponent._updateRef();
	      }
	      this.transition(newComponent, cb);
	    }
	  },
	
	  /**
	   * When the component changes or unbinds before an async
	   * constructor is resolved, we need to invalidate its
	   * pending callback.
	   */
	
	  invalidatePending: function invalidatePending() {
	    if (this.pendingComponentCb) {
	      this.pendingComponentCb.cancel();
	      this.pendingComponentCb = null;
	    }
	  },
	
	  /**
	   * Instantiate/insert a new child vm.
	   * If keep alive and has cached instance, insert that
	   * instance; otherwise build a new one and cache it.
	   *
	   * @param {Object} [extraOptions]
	   * @return {Vue} - the created instance
	   */
	
	  build: function build(extraOptions) {
	    var cached = this.getCached();
	    if (cached) {
	      return cached;
	    }
	    if (this.Component) {
	      // default options
	      var options = {
	        name: this.ComponentName,
	        el: cloneNode(this.el),
	        template: this.inlineTemplate,
	        // make sure to add the child with correct parent
	        // if this is a transcluded component, its parent
	        // should be the transclusion host.
	        parent: this._host || this.vm,
	        // if no inline-template, then the compiled
	        // linker can be cached for better performance.
	        _linkerCachable: !this.inlineTemplate,
	        _ref: this.descriptor.ref,
	        _asComponent: true,
	        _isRouterView: this._isRouterView,
	        // if this is a transcluded component, context
	        // will be the common parent vm of this instance
	        // and its host.
	        _context: this.vm,
	        // if this is inside an inline v-for, the scope
	        // will be the intermediate scope created for this
	        // repeat fragment. this is used for linking props
	        // and container directives.
	        _scope: this._scope,
	        // pass in the owner fragment of this component.
	        // this is necessary so that the fragment can keep
	        // track of its contained components in order to
	        // call attach/detach hooks for them.
	        _frag: this._frag
	      };
	      // extra options
	      // in 1.0.0 this is used by vue-router only
	      /* istanbul ignore if */
	      if (extraOptions) {
	        extend(options, extraOptions);
	      }
	      var child = new this.Component(options);
	      if (this.keepAlive) {
	        this.cache[this.Component.cid] = child;
	      }
	      /* istanbul ignore if */
	      if (process.env.NODE_ENV !== 'production' && this.el.hasAttribute('transition') && child._isFragment) {
	        warn('Transitions will not work on a fragment instance. ' + 'Template: ' + child.$options.template);
	      }
	      return child;
	    }
	  },
	
	  /**
	   * Try to get a cached instance of the current component.
	   *
	   * @return {Vue|undefined}
	   */
	
	  getCached: function getCached() {
	    return this.keepAlive && this.cache[this.Component.cid];
	  },
	
	  /**
	   * Teardown the current child, but defers cleanup so
	   * that we can separate the destroy and removal steps.
	   *
	   * @param {Boolean} defer
	   */
	
	  unbuild: function unbuild(defer) {
	    if (this.waitingFor) {
	      this.waitingFor.$destroy();
	      this.waitingFor = null;
	    }
	    var child = this.childVM;
	    if (!child || this.keepAlive) {
	      if (child) {
	        // remove ref
	        child._updateRef(true);
	      }
	      return;
	    }
	    // the sole purpose of `deferCleanup` is so that we can
	    // "deactivate" the vm right now and perform DOM removal
	    // later.
	    child.$destroy(false, defer);
	  },
	
	  /**
	   * Remove current destroyed child and manually do
	   * the cleanup after removal.
	   *
	   * @param {Function} cb
	   */
	
	  remove: function remove(child, cb) {
	    var keepAlive = this.keepAlive;
	    if (child) {
	      // we may have a component switch when a previous
	      // component is still being transitioned out.
	      // we want to trigger only one lastest insertion cb
	      // when the existing transition finishes. (#1119)
	      this.pendingRemovals++;
	      this.pendingRemovalCb = cb;
	      var self = this;
	      child.$remove(function () {
	        self.pendingRemovals--;
	        if (!keepAlive) child._cleanup();
	        if (!self.pendingRemovals && self.pendingRemovalCb) {
	          self.pendingRemovalCb();
	          self.pendingRemovalCb = null;
	        }
	      });
	    } else if (cb) {
	      cb();
	    }
	  },
	
	  /**
	   * Actually swap the components, depending on the
	   * transition mode. Defaults to simultaneous.
	   *
	   * @param {Vue} target
	   * @param {Function} [cb]
	   */
	
	  transition: function transition(target, cb) {
	    var self = this;
	    var current = this.childVM;
	    // for devtool inspection
	    if (process.env.NODE_ENV !== 'production') {
	      if (current) current._inactive = true;
	      target._inactive = false;
	    }
	    this.childVM = target;
	    switch (self.params.transitionMode) {
	      case 'in-out':
	        target.$before(self.anchor, function () {
	          self.remove(current, cb);
	        });
	        break;
	      case 'out-in':
	        self.remove(current, function () {
	          target.$before(self.anchor, cb);
	        });
	        break;
	      default:
	        self.remove(current);
	        target.$before(self.anchor, cb);
	    }
	  },
	
	  /**
	   * Unbind.
	   */
	
	  unbind: function unbind() {
	    this.invalidatePending();
	    // Do not defer cleanup when unbinding
	    this.unbuild();
	    // destroy all keep-alive cached instances
	    if (this.cache) {
	      for (var key in this.cache) {
	        this.cache[key].$destroy();
	      }
	      this.cache = null;
	    }
	  }
	};
	
	var vClass = {
	
	  deep: true,
	
	  update: function update(value) {
	    if (value && typeof value === 'string') {
	      this.handleObject(stringToObject(value));
	    } else if (isPlainObject(value)) {
	      this.handleObject(value);
	    } else if (isArray(value)) {
	      this.handleArray(value);
	    } else {
	      this.cleanup();
	    }
	  },
	
	  handleObject: function handleObject(value) {
	    this.cleanup(value);
	    var keys = this.prevKeys = Object.keys(value);
	    for (var i = 0, l = keys.length; i < l; i++) {
	      var key = keys[i];
	      if (value[key]) {
	        addClass(this.el, key);
	      } else {
	        removeClass(this.el, key);
	      }
	    }
	  },
	
	  handleArray: function handleArray(value) {
	    this.cleanup(value);
	    for (var i = 0, l = value.length; i < l; i++) {
	      if (value[i]) {
	        addClass(this.el, value[i]);
	      }
	    }
	    this.prevKeys = value.slice();
	  },
	
	  cleanup: function cleanup(value) {
	    if (this.prevKeys) {
	      var i = this.prevKeys.length;
	      while (i--) {
	        var key = this.prevKeys[i];
	        if (key && (!value || !contains$1(value, key))) {
	          removeClass(this.el, key);
	        }
	      }
	    }
	  }
	};
	
	function stringToObject(value) {
	  var res = {};
	  var keys = value.trim().split(/\s+/);
	  var i = keys.length;
	  while (i--) {
	    res[keys[i]] = true;
	  }
	  return res;
	}
	
	function contains$1(value, key) {
	  return isArray(value) ? value.indexOf(key) > -1 : hasOwn(value, key);
	}
	
	var internalDirectives = {
	  style: style,
	  'class': vClass,
	  component: component,
	  prop: propDef,
	  transition: transition
	};
	
	var propBindingModes = config._propBindingModes;
	var empty = {};
	
	// regexes
	var identRE$1 = /^[$_a-zA-Z]+[\w$]*$/;
	var settablePathRE = /^[A-Za-z_$][\w$]*(\.[A-Za-z_$][\w$]*|\[[^\[\]]+\])*$/;
	
	/**
	 * Compile props on a root element and return
	 * a props link function.
	 *
	 * @param {Element|DocumentFragment} el
	 * @param {Array} propOptions
	 * @return {Function} propsLinkFn
	 */
	
	function compileProps(el, propOptions) {
	  var props = [];
	  var names = Object.keys(propOptions);
	  var i = names.length;
	  var options, name, attr, value, path, parsed, prop;
	  while (i--) {
	    name = names[i];
	    options = propOptions[name] || empty;
	
	    if (process.env.NODE_ENV !== 'production' && name === '$data') {
	      warn('Do not use $data as prop.');
	      continue;
	    }
	
	    // props could contain dashes, which will be
	    // interpreted as minus calculations by the parser
	    // so we need to camelize the path here
	    path = camelize(name);
	    if (!identRE$1.test(path)) {
	      process.env.NODE_ENV !== 'production' && warn('Invalid prop key: "' + name + '". Prop keys ' + 'must be valid identifiers.');
	      continue;
	    }
	
	    prop = {
	      name: name,
	      path: path,
	      options: options,
	      mode: propBindingModes.ONE_WAY,
	      raw: null
	    };
	
	    attr = hyphenate(name);
	    // first check dynamic version
	    if ((value = getBindAttr(el, attr)) === null) {
	      if ((value = getBindAttr(el, attr + '.sync')) !== null) {
	        prop.mode = propBindingModes.TWO_WAY;
	      } else if ((value = getBindAttr(el, attr + '.once')) !== null) {
	        prop.mode = propBindingModes.ONE_TIME;
	      }
	    }
	    if (value !== null) {
	      // has dynamic binding!
	      prop.raw = value;
	      parsed = parseDirective(value);
	      value = parsed.expression;
	      prop.filters = parsed.filters;
	      // check binding type
	      if (isLiteral(value) && !parsed.filters) {
	        // for expressions containing literal numbers and
	        // booleans, there's no need to setup a prop binding,
	        // so we can optimize them as a one-time set.
	        prop.optimizedLiteral = true;
	      } else {
	        prop.dynamic = true;
	        // check non-settable path for two-way bindings
	        if (process.env.NODE_ENV !== 'production' && prop.mode === propBindingModes.TWO_WAY && !settablePathRE.test(value)) {
	          prop.mode = propBindingModes.ONE_WAY;
	          warn('Cannot bind two-way prop with non-settable ' + 'parent path: ' + value);
	        }
	      }
	      prop.parentPath = value;
	
	      // warn required two-way
	      if (process.env.NODE_ENV !== 'production' && options.twoWay && prop.mode !== propBindingModes.TWO_WAY) {
	        warn('Prop "' + name + '" expects a two-way binding type.');
	      }
	    } else if ((value = getAttr(el, attr)) !== null) {
	      // has literal binding!
	      prop.raw = value;
	    } else if (options.required) {
	      // warn missing required
	      process.env.NODE_ENV !== 'production' && warn('Missing required prop: ' + name);
	    }
	    // push prop
	    props.push(prop);
	  }
	  return makePropsLinkFn(props);
	}
	
	/**
	 * Build a function that applies props to a vm.
	 *
	 * @param {Array} props
	 * @return {Function} propsLinkFn
	 */
	
	function makePropsLinkFn(props) {
	  return function propsLinkFn(vm, scope) {
	    // store resolved props info
	    vm._props = {};
	    var i = props.length;
	    var prop, path, options, value, raw;
	    while (i--) {
	      prop = props[i];
	      raw = prop.raw;
	      path = prop.path;
	      options = prop.options;
	      vm._props[path] = prop;
	      if (raw === null) {
	        // initialize absent prop
	        initProp(vm, prop, getDefault(vm, options));
	      } else if (prop.dynamic) {
	        // dynamic prop
	        if (vm._context) {
	          if (prop.mode === propBindingModes.ONE_TIME) {
	            // one time binding
	            value = (scope || vm._context).$get(prop.parentPath);
	            initProp(vm, prop, value);
	          } else {
	            // dynamic binding
	            vm._bindDir({
	              name: 'prop',
	              def: propDef,
	              prop: prop
	            }, null, null, scope); // el, host, scope
	          }
	        } else {
	            process.env.NODE_ENV !== 'production' && warn('Cannot bind dynamic prop on a root instance' + ' with no parent: ' + prop.name + '="' + raw + '"');
	          }
	      } else if (prop.optimizedLiteral) {
	        // optimized literal, cast it and just set once
	        var stripped = stripQuotes(raw);
	        value = stripped === raw ? toBoolean(toNumber(raw)) : stripped;
	        initProp(vm, prop, value);
	      } else {
	        // string literal, but we need to cater for
	        // Boolean props with no value
	        value = options.type === Boolean && raw === '' ? true : raw;
	        initProp(vm, prop, value);
	      }
	    }
	  };
	}
	
	/**
	 * Get the default value of a prop.
	 *
	 * @param {Vue} vm
	 * @param {Object} options
	 * @return {*}
	 */
	
	function getDefault(vm, options) {
	  // no default, return undefined
	  if (!hasOwn(options, 'default')) {
	    // absent boolean value defaults to false
	    return options.type === Boolean ? false : undefined;
	  }
	  var def = options['default'];
	  // warn against non-factory defaults for Object & Array
	  if (isObject(def)) {
	    process.env.NODE_ENV !== 'production' && warn('Object/Array as default prop values will be shared ' + 'across multiple instances. Use a factory function ' + 'to return the default value instead.');
	  }
	  // call factory function for non-Function types
	  return typeof def === 'function' && options.type !== Function ? def.call(vm) : def;
	}
	
	// special binding prefixes
	var bindRE = /^v-bind:|^:/;
	var onRE = /^v-on:|^@/;
	var argRE = /:(.*)$/;
	var modifierRE = /\.[^\.]+/g;
	var transitionRE = /^(v-bind:|:)?transition$/;
	
	// terminal directives
	var terminalDirectives = ['for', 'if'];
	
	// default directive priority
	var DEFAULT_PRIORITY = 1000;
	
	/**
	 * Compile a template and return a reusable composite link
	 * function, which recursively contains more link functions
	 * inside. This top level compile function would normally
	 * be called on instance root nodes, but can also be used
	 * for partial compilation if the partial argument is true.
	 *
	 * The returned composite link function, when called, will
	 * return an unlink function that tearsdown all directives
	 * created during the linking phase.
	 *
	 * @param {Element|DocumentFragment} el
	 * @param {Object} options
	 * @param {Boolean} partial
	 * @return {Function}
	 */
	
	function compile(el, options, partial) {
	  // link function for the node itself.
	  var nodeLinkFn = partial || !options._asComponent ? compileNode(el, options) : null;
	  // link function for the childNodes
	  var childLinkFn = !(nodeLinkFn && nodeLinkFn.terminal) && el.tagName !== 'SCRIPT' && el.hasChildNodes() ? compileNodeList(el.childNodes, options) : null;
	
	  /**
	   * A composite linker function to be called on a already
	   * compiled piece of DOM, which instantiates all directive
	   * instances.
	   *
	   * @param {Vue} vm
	   * @param {Element|DocumentFragment} el
	   * @param {Vue} [host] - host vm of transcluded content
	   * @param {Object} [scope] - v-for scope
	   * @param {Fragment} [frag] - link context fragment
	   * @return {Function|undefined}
	   */
	
	  return function compositeLinkFn(vm, el, host, scope, frag) {
	    // cache childNodes before linking parent, fix #657
	    var childNodes = toArray(el.childNodes);
	    // link
	    var dirs = linkAndCapture(function compositeLinkCapturer() {
	      if (nodeLinkFn) nodeLinkFn(vm, el, host, scope, frag);
	      if (childLinkFn) childLinkFn(vm, childNodes, host, scope, frag);
	    }, vm);
	    return makeUnlinkFn(vm, dirs);
	  };
	}
	
	/**
	 * Apply a linker to a vm/element pair and capture the
	 * directives created during the process.
	 *
	 * @param {Function} linker
	 * @param {Vue} vm
	 */
	
	function linkAndCapture(linker, vm) {
	  var originalDirCount = vm._directives.length;
	  linker();
	  var dirs = vm._directives.slice(originalDirCount);
	  dirs.sort(directiveComparator);
	  for (var i = 0, l = dirs.length; i < l; i++) {
	    dirs[i]._bind();
	  }
	  return dirs;
	}
	
	/**
	 * Directive priority sort comparator
	 *
	 * @param {Object} a
	 * @param {Object} b
	 */
	
	function directiveComparator(a, b) {
	  a = a.descriptor.def.priority || DEFAULT_PRIORITY;
	  b = b.descriptor.def.priority || DEFAULT_PRIORITY;
	  return a > b ? -1 : a === b ? 0 : 1;
	}
	
	/**
	 * Linker functions return an unlink function that
	 * tearsdown all directives instances generated during
	 * the process.
	 *
	 * We create unlink functions with only the necessary
	 * information to avoid retaining additional closures.
	 *
	 * @param {Vue} vm
	 * @param {Array} dirs
	 * @param {Vue} [context]
	 * @param {Array} [contextDirs]
	 * @return {Function}
	 */
	
	function makeUnlinkFn(vm, dirs, context, contextDirs) {
	  function unlink(destroying) {
	    teardownDirs(vm, dirs, destroying);
	    if (context && contextDirs) {
	      teardownDirs(context, contextDirs);
	    }
	  }
	  // expose linked directives
	  unlink.dirs = dirs;
	  return unlink;
	}
	
	/**
	 * Teardown partial linked directives.
	 *
	 * @param {Vue} vm
	 * @param {Array} dirs
	 * @param {Boolean} destroying
	 */
	
	function teardownDirs(vm, dirs, destroying) {
	  var i = dirs.length;
	  while (i--) {
	    dirs[i]._teardown();
	    if (!destroying) {
	      vm._directives.$remove(dirs[i]);
	    }
	  }
	}
	
	/**
	 * Compile link props on an instance.
	 *
	 * @param {Vue} vm
	 * @param {Element} el
	 * @param {Object} props
	 * @param {Object} [scope]
	 * @return {Function}
	 */
	
	function compileAndLinkProps(vm, el, props, scope) {
	  var propsLinkFn = compileProps(el, props);
	  var propDirs = linkAndCapture(function () {
	    propsLinkFn(vm, scope);
	  }, vm);
	  return makeUnlinkFn(vm, propDirs);
	}
	
	/**
	 * Compile the root element of an instance.
	 *
	 * 1. attrs on context container (context scope)
	 * 2. attrs on the component template root node, if
	 *    replace:true (child scope)
	 *
	 * If this is a fragment instance, we only need to compile 1.
	 *
	 * @param {Vue} vm
	 * @param {Element} el
	 * @param {Object} options
	 * @param {Object} contextOptions
	 * @return {Function}
	 */
	
	function compileRoot(el, options, contextOptions) {
	  var containerAttrs = options._containerAttrs;
	  var replacerAttrs = options._replacerAttrs;
	  var contextLinkFn, replacerLinkFn;
	
	  // only need to compile other attributes for
	  // non-fragment instances
	  if (el.nodeType !== 11) {
	    // for components, container and replacer need to be
	    // compiled separately and linked in different scopes.
	    if (options._asComponent) {
	      // 2. container attributes
	      if (containerAttrs && contextOptions) {
	        contextLinkFn = compileDirectives(containerAttrs, contextOptions);
	      }
	      if (replacerAttrs) {
	        // 3. replacer attributes
	        replacerLinkFn = compileDirectives(replacerAttrs, options);
	      }
	    } else {
	      // non-component, just compile as a normal element.
	      replacerLinkFn = compileDirectives(el.attributes, options);
	    }
	  } else if (process.env.NODE_ENV !== 'production' && containerAttrs) {
	    // warn container directives for fragment instances
	    var names = containerAttrs.filter(function (attr) {
	      // allow vue-loader/vueify scoped css attributes
	      return attr.name.indexOf('_v-') < 0 &&
	      // allow event listeners
	      !onRE.test(attr.name) &&
	      // allow slots
	      attr.name !== 'slot';
	    }).map(function (attr) {
	      return '"' + attr.name + '"';
	    });
	    if (names.length) {
	      var plural = names.length > 1;
	      warn('Attribute' + (plural ? 's ' : ' ') + names.join(', ') + (plural ? ' are' : ' is') + ' ignored on component ' + '<' + options.el.tagName.toLowerCase() + '> because ' + 'the component is a fragment instance: ' + 'http://vuejs.org/guide/components.html#Fragment_Instance');
	    }
	  }
	
	  options._containerAttrs = options._replacerAttrs = null;
	  return function rootLinkFn(vm, el, scope) {
	    // link context scope dirs
	    var context = vm._context;
	    var contextDirs;
	    if (context && contextLinkFn) {
	      contextDirs = linkAndCapture(function () {
	        contextLinkFn(context, el, null, scope);
	      }, context);
	    }
	
	    // link self
	    var selfDirs = linkAndCapture(function () {
	      if (replacerLinkFn) replacerLinkFn(vm, el);
	    }, vm);
	
	    // return the unlink function that tearsdown context
	    // container directives.
	    return makeUnlinkFn(vm, selfDirs, context, contextDirs);
	  };
	}
	
	/**
	 * Compile a node and return a nodeLinkFn based on the
	 * node type.
	 *
	 * @param {Node} node
	 * @param {Object} options
	 * @return {Function|null}
	 */
	
	function compileNode(node, options) {
	  var type = node.nodeType;
	  if (type === 1 && node.tagName !== 'SCRIPT') {
	    return compileElement(node, options);
	  } else if (type === 3 && node.data.trim()) {
	    return compileTextNode(node, options);
	  } else {
	    return null;
	  }
	}
	
	/**
	 * Compile an element and return a nodeLinkFn.
	 *
	 * @param {Element} el
	 * @param {Object} options
	 * @return {Function|null}
	 */
	
	function compileElement(el, options) {
	  // preprocess textareas.
	  // textarea treats its text content as the initial value.
	  // just bind it as an attr directive for value.
	  if (el.tagName === 'TEXTAREA') {
	    var tokens = parseText(el.value);
	    if (tokens) {
	      el.setAttribute(':value', tokensToExp(tokens));
	      el.value = '';
	    }
	  }
	  var linkFn;
	  var hasAttrs = el.hasAttributes();
	  // check terminal directives (for & if)
	  if (hasAttrs) {
	    linkFn = checkTerminalDirectives(el, options);
	  }
	  // check element directives
	  if (!linkFn) {
	    linkFn = checkElementDirectives(el, options);
	  }
	  // check component
	  if (!linkFn) {
	    linkFn = checkComponent(el, options);
	  }
	  // normal directives
	  if (!linkFn && hasAttrs) {
	    linkFn = compileDirectives(el.attributes, options);
	  }
	  return linkFn;
	}
	
	/**
	 * Compile a textNode and return a nodeLinkFn.
	 *
	 * @param {TextNode} node
	 * @param {Object} options
	 * @return {Function|null} textNodeLinkFn
	 */
	
	function compileTextNode(node, options) {
	  // skip marked text nodes
	  if (node._skip) {
	    return removeText;
	  }
	
	  var tokens = parseText(node.wholeText);
	  if (!tokens) {
	    return null;
	  }
	
	  // mark adjacent text nodes as skipped,
	  // because we are using node.wholeText to compile
	  // all adjacent text nodes together. This fixes
	  // issues in IE where sometimes it splits up a single
	  // text node into multiple ones.
	  var next = node.nextSibling;
	  while (next && next.nodeType === 3) {
	    next._skip = true;
	    next = next.nextSibling;
	  }
	
	  var frag = document.createDocumentFragment();
	  var el, token;
	  for (var i = 0, l = tokens.length; i < l; i++) {
	    token = tokens[i];
	    el = token.tag ? processTextToken(token, options) : document.createTextNode(token.value);
	    frag.appendChild(el);
	  }
	  return makeTextNodeLinkFn(tokens, frag, options);
	}
	
	/**
	 * Linker for an skipped text node.
	 *
	 * @param {Vue} vm
	 * @param {Text} node
	 */
	
	function removeText(vm, node) {
	  remove(node);
	}
	
	/**
	 * Process a single text token.
	 *
	 * @param {Object} token
	 * @param {Object} options
	 * @return {Node}
	 */
	
	function processTextToken(token, options) {
	  var el;
	  if (token.oneTime) {
	    el = document.createTextNode(token.value);
	  } else {
	    if (token.html) {
	      el = document.createComment('v-html');
	      setTokenType('html');
	    } else {
	      // IE will clean up empty textNodes during
	      // frag.cloneNode(true), so we have to give it
	      // something here...
	      el = document.createTextNode(' ');
	      setTokenType('text');
	    }
	  }
	  function setTokenType(type) {
	    if (token.descriptor) return;
	    var parsed = parseDirective(token.value);
	    token.descriptor = {
	      name: type,
	      def: publicDirectives[type],
	      expression: parsed.expression,
	      filters: parsed.filters
	    };
	  }
	  return el;
	}
	
	/**
	 * Build a function that processes a textNode.
	 *
	 * @param {Array<Object>} tokens
	 * @param {DocumentFragment} frag
	 */
	
	function makeTextNodeLinkFn(tokens, frag) {
	  return function textNodeLinkFn(vm, el, host, scope) {
	    var fragClone = frag.cloneNode(true);
	    var childNodes = toArray(fragClone.childNodes);
	    var token, value, node;
	    for (var i = 0, l = tokens.length; i < l; i++) {
	      token = tokens[i];
	      value = token.value;
	      if (token.tag) {
	        node = childNodes[i];
	        if (token.oneTime) {
	          value = (scope || vm).$eval(value);
	          if (token.html) {
	            replace(node, parseTemplate(value, true));
	          } else {
	            node.data = value;
	          }
	        } else {
	          vm._bindDir(token.descriptor, node, host, scope);
	        }
	      }
	    }
	    replace(el, fragClone);
	  };
	}
	
	/**
	 * Compile a node list and return a childLinkFn.
	 *
	 * @param {NodeList} nodeList
	 * @param {Object} options
	 * @return {Function|undefined}
	 */
	
	function compileNodeList(nodeList, options) {
	  var linkFns = [];
	  var nodeLinkFn, childLinkFn, node;
	  for (var i = 0, l = nodeList.length; i < l; i++) {
	    node = nodeList[i];
	    nodeLinkFn = compileNode(node, options);
	    childLinkFn = !(nodeLinkFn && nodeLinkFn.terminal) && node.tagName !== 'SCRIPT' && node.hasChildNodes() ? compileNodeList(node.childNodes, options) : null;
	    linkFns.push(nodeLinkFn, childLinkFn);
	  }
	  return linkFns.length ? makeChildLinkFn(linkFns) : null;
	}
	
	/**
	 * Make a child link function for a node's childNodes.
	 *
	 * @param {Array<Function>} linkFns
	 * @return {Function} childLinkFn
	 */
	
	function makeChildLinkFn(linkFns) {
	  return function childLinkFn(vm, nodes, host, scope, frag) {
	    var node, nodeLinkFn, childrenLinkFn;
	    for (var i = 0, n = 0, l = linkFns.length; i < l; n++) {
	      node = nodes[n];
	      nodeLinkFn = linkFns[i++];
	      childrenLinkFn = linkFns[i++];
	      // cache childNodes before linking parent, fix #657
	      var childNodes = toArray(node.childNodes);
	      if (nodeLinkFn) {
	        nodeLinkFn(vm, node, host, scope, frag);
	      }
	      if (childrenLinkFn) {
	        childrenLinkFn(vm, childNodes, host, scope, frag);
	      }
	    }
	  };
	}
	
	/**
	 * Check for element directives (custom elements that should
	 * be resovled as terminal directives).
	 *
	 * @param {Element} el
	 * @param {Object} options
	 */
	
	function checkElementDirectives(el, options) {
	  var tag = el.tagName.toLowerCase();
	  if (commonTagRE.test(tag)) return;
	  // special case: give named slot a higher priority
	  // than unnamed slots
	  if (tag === 'slot' && hasBindAttr(el, 'name')) {
	    tag = '_namedSlot';
	  }
	  var def = resolveAsset(options, 'elementDirectives', tag);
	  if (def) {
	    return makeTerminalNodeLinkFn(el, tag, '', options, def);
	  }
	}
	
	/**
	 * Check if an element is a component. If yes, return
	 * a component link function.
	 *
	 * @param {Element} el
	 * @param {Object} options
	 * @return {Function|undefined}
	 */
	
	function checkComponent(el, options) {
	  var component = checkComponentAttr(el, options);
	  if (component) {
	    var ref = findRef(el);
	    var descriptor = {
	      name: 'component',
	      ref: ref,
	      expression: component.id,
	      def: internalDirectives.component,
	      modifiers: {
	        literal: !component.dynamic
	      }
	    };
	    var componentLinkFn = function componentLinkFn(vm, el, host, scope, frag) {
	      if (ref) {
	        defineReactive((scope || vm).$refs, ref, null);
	      }
	      vm._bindDir(descriptor, el, host, scope, frag);
	    };
	    componentLinkFn.terminal = true;
	    return componentLinkFn;
	  }
	}
	
	/**
	 * Check an element for terminal directives in fixed order.
	 * If it finds one, return a terminal link function.
	 *
	 * @param {Element} el
	 * @param {Object} options
	 * @return {Function} terminalLinkFn
	 */
	
	function checkTerminalDirectives(el, options) {
	  // skip v-pre
	  if (getAttr(el, 'v-pre') !== null) {
	    return skip;
	  }
	  // skip v-else block, but only if following v-if
	  if (el.hasAttribute('v-else')) {
	    var prev = el.previousElementSibling;
	    if (prev && prev.hasAttribute('v-if')) {
	      return skip;
	    }
	  }
	  var value, dirName;
	  for (var i = 0, l = terminalDirectives.length; i < l; i++) {
	    dirName = terminalDirectives[i];
	    value = el.getAttribute('v-' + dirName);
	    if (value != null) {
	      return makeTerminalNodeLinkFn(el, dirName, value, options);
	    }
	  }
	}
	
	function skip() {}
	skip.terminal = true;
	
	/**
	 * Build a node link function for a terminal directive.
	 * A terminal link function terminates the current
	 * compilation recursion and handles compilation of the
	 * subtree in the directive.
	 *
	 * @param {Element} el
	 * @param {String} dirName
	 * @param {String} value
	 * @param {Object} options
	 * @param {Object} [def]
	 * @return {Function} terminalLinkFn
	 */
	
	function makeTerminalNodeLinkFn(el, dirName, value, options, def) {
	  var parsed = parseDirective(value);
	  var descriptor = {
	    name: dirName,
	    expression: parsed.expression,
	    filters: parsed.filters,
	    raw: value,
	    // either an element directive, or if/for
	    def: def || publicDirectives[dirName]
	  };
	  // check ref for v-for and router-view
	  if (dirName === 'for' || dirName === 'router-view') {
	    descriptor.ref = findRef(el);
	  }
	  var fn = function terminalNodeLinkFn(vm, el, host, scope, frag) {
	    if (descriptor.ref) {
	      defineReactive((scope || vm).$refs, descriptor.ref, null);
	    }
	    vm._bindDir(descriptor, el, host, scope, frag);
	  };
	  fn.terminal = true;
	  return fn;
	}
	
	/**
	 * Compile the directives on an element and return a linker.
	 *
	 * @param {Array|NamedNodeMap} attrs
	 * @param {Object} options
	 * @return {Function}
	 */
	
	function compileDirectives(attrs, options) {
	  var i = attrs.length;
	  var dirs = [];
	  var attr, name, value, rawName, rawValue, dirName, arg, modifiers, dirDef, tokens;
	  while (i--) {
	    attr = attrs[i];
	    name = rawName = attr.name;
	    value = rawValue = attr.value;
	    tokens = parseText(value);
	    // reset arg
	    arg = null;
	    // check modifiers
	    modifiers = parseModifiers(name);
	    name = name.replace(modifierRE, '');
	
	    // attribute interpolations
	    if (tokens) {
	      value = tokensToExp(tokens);
	      arg = name;
	      pushDir('bind', publicDirectives.bind, tokens);
	      // warn against mixing mustaches with v-bind
	      if (process.env.NODE_ENV !== 'production') {
	        if (name === 'class' && Array.prototype.some.call(attrs, function (attr) {
	          return attr.name === ':class' || attr.name === 'v-bind:class';
	        })) {
	          warn('class="' + rawValue + '": Do not mix mustache interpolation ' + 'and v-bind for "class" on the same element. Use one or the other.');
	        }
	      }
	    } else
	
	      // special attribute: transition
	      if (transitionRE.test(name)) {
	        modifiers.literal = !bindRE.test(name);
	        pushDir('transition', internalDirectives.transition);
	      } else
	
	        // event handlers
	        if (onRE.test(name)) {
	          arg = name.replace(onRE, '');
	          pushDir('on', publicDirectives.on);
	        } else
	
	          // attribute bindings
	          if (bindRE.test(name)) {
	            dirName = name.replace(bindRE, '');
	            if (dirName === 'style' || dirName === 'class') {
	              pushDir(dirName, internalDirectives[dirName]);
	            } else {
	              arg = dirName;
	              pushDir('bind', publicDirectives.bind);
	            }
	          } else
	
	            // normal directives
	            if (name.indexOf('v-') === 0) {
	              // check arg
	              arg = (arg = name.match(argRE)) && arg[1];
	              if (arg) {
	                name = name.replace(argRE, '');
	              }
	              // extract directive name
	              dirName = name.slice(2);
	
	              // skip v-else (when used with v-show)
	              if (dirName === 'else') {
	                continue;
	              }
	
	              dirDef = resolveAsset(options, 'directives', dirName);
	
	              if (process.env.NODE_ENV !== 'production') {
	                assertAsset(dirDef, 'directive', dirName);
	              }
	
	              if (dirDef) {
	                pushDir(dirName, dirDef);
	              }
	            }
	  }
	
	  /**
	   * Push a directive.
	   *
	   * @param {String} dirName
	   * @param {Object|Function} def
	   * @param {Array} [interpTokens]
	   */
	
	  function pushDir(dirName, def, interpTokens) {
	    var hasOneTimeToken = interpTokens && hasOneTime(interpTokens);
	    var parsed = !hasOneTimeToken && parseDirective(value);
	    dirs.push({
	      name: dirName,
	      attr: rawName,
	      raw: rawValue,
	      def: def,
	      arg: arg,
	      modifiers: modifiers,
	      // conversion from interpolation strings with one-time token
	      // to expression is differed until directive bind time so that we
	      // have access to the actual vm context for one-time bindings.
	      expression: parsed && parsed.expression,
	      filters: parsed && parsed.filters,
	      interp: interpTokens,
	      hasOneTime: hasOneTimeToken
	    });
	  }
	
	  if (dirs.length) {
	    return makeNodeLinkFn(dirs);
	  }
	}
	
	/**
	 * Parse modifiers from directive attribute name.
	 *
	 * @param {String} name
	 * @return {Object}
	 */
	
	function parseModifiers(name) {
	  var res = Object.create(null);
	  var match = name.match(modifierRE);
	  if (match) {
	    var i = match.length;
	    while (i--) {
	      res[match[i].slice(1)] = true;
	    }
	  }
	  return res;
	}
	
	/**
	 * Build a link function for all directives on a single node.
	 *
	 * @param {Array} directives
	 * @return {Function} directivesLinkFn
	 */
	
	function makeNodeLinkFn(directives) {
	  return function nodeLinkFn(vm, el, host, scope, frag) {
	    // reverse apply because it's sorted low to high
	    var i = directives.length;
	    while (i--) {
	      vm._bindDir(directives[i], el, host, scope, frag);
	    }
	  };
	}
	
	/**
	 * Check if an interpolation string contains one-time tokens.
	 *
	 * @param {Array} tokens
	 * @return {Boolean}
	 */
	
	function hasOneTime(tokens) {
	  var i = tokens.length;
	  while (i--) {
	    if (tokens[i].oneTime) return true;
	  }
	}
	
	var specialCharRE = /[^\w\-:\.]/;
	
	/**
	 * Process an element or a DocumentFragment based on a
	 * instance option object. This allows us to transclude
	 * a template node/fragment before the instance is created,
	 * so the processed fragment can then be cloned and reused
	 * in v-for.
	 *
	 * @param {Element} el
	 * @param {Object} options
	 * @return {Element|DocumentFragment}
	 */
	
	function transclude(el, options) {
	  // extract container attributes to pass them down
	  // to compiler, because they need to be compiled in
	  // parent scope. we are mutating the options object here
	  // assuming the same object will be used for compile
	  // right after this.
	  if (options) {
	    options._containerAttrs = extractAttrs(el);
	  }
	  // for template tags, what we want is its content as
	  // a documentFragment (for fragment instances)
	  if (isTemplate(el)) {
	    el = parseTemplate(el);
	  }
	  if (options) {
	    if (options._asComponent && !options.template) {
	      options.template = '<slot></slot>';
	    }
	    if (options.template) {
	      options._content = extractContent(el);
	      el = transcludeTemplate(el, options);
	    }
	  }
	  if (el instanceof DocumentFragment) {
	    // anchors for fragment instance
	    // passing in `persist: true` to avoid them being
	    // discarded by IE during template cloning
	    prepend(createAnchor('v-start', true), el);
	    el.appendChild(createAnchor('v-end', true));
	  }
	  return el;
	}
	
	/**
	 * Process the template option.
	 * If the replace option is true this will swap the $el.
	 *
	 * @param {Element} el
	 * @param {Object} options
	 * @return {Element|DocumentFragment}
	 */
	
	function transcludeTemplate(el, options) {
	  var template = options.template;
	  var frag = parseTemplate(template, true);
	  if (frag) {
	    var replacer = frag.firstChild;
	    var tag = replacer.tagName && replacer.tagName.toLowerCase();
	    if (options.replace) {
	      /* istanbul ignore if */
	      if (el === document.body) {
	        process.env.NODE_ENV !== 'production' && warn('You are mounting an instance with a template to ' + '<body>. This will replace <body> entirely. You ' + 'should probably use `replace: false` here.');
	      }
	      // there are many cases where the instance must
	      // become a fragment instance: basically anything that
	      // can create more than 1 root nodes.
	      if (
	      // multi-children template
	      frag.childNodes.length > 1 ||
	      // non-element template
	      replacer.nodeType !== 1 ||
	      // single nested component
	      tag === 'component' || resolveAsset(options, 'components', tag) || hasBindAttr(replacer, 'is') ||
	      // element directive
	      resolveAsset(options, 'elementDirectives', tag) ||
	      // for block
	      replacer.hasAttribute('v-for') ||
	      // if block
	      replacer.hasAttribute('v-if')) {
	        return frag;
	      } else {
	        options._replacerAttrs = extractAttrs(replacer);
	        mergeAttrs(el, replacer);
	        return replacer;
	      }
	    } else {
	      el.appendChild(frag);
	      return el;
	    }
	  } else {
	    process.env.NODE_ENV !== 'production' && warn('Invalid template option: ' + template);
	  }
	}
	
	/**
	 * Helper to extract a component container's attributes
	 * into a plain object array.
	 *
	 * @param {Element} el
	 * @return {Array}
	 */
	
	function extractAttrs(el) {
	  if (el.nodeType === 1 && el.hasAttributes()) {
	    return toArray(el.attributes);
	  }
	}
	
	/**
	 * Merge the attributes of two elements, and make sure
	 * the class names are merged properly.
	 *
	 * @param {Element} from
	 * @param {Element} to
	 */
	
	function mergeAttrs(from, to) {
	  var attrs = from.attributes;
	  var i = attrs.length;
	  var name, value;
	  while (i--) {
	    name = attrs[i].name;
	    value = attrs[i].value;
	    if (!to.hasAttribute(name) && !specialCharRE.test(name)) {
	      to.setAttribute(name, value);
	    } else if (name === 'class' && !parseText(value)) {
	      value.split(/\s+/).forEach(function (cls) {
	        addClass(to, cls);
	      });
	    }
	  }
	}
	
	var compiler = Object.freeze({
		compile: compile,
		compileAndLinkProps: compileAndLinkProps,
		compileRoot: compileRoot,
		terminalDirectives: terminalDirectives,
		transclude: transclude
	});
	
	function stateMixin (Vue) {
	
	  /**
	   * Accessor for `$data` property, since setting $data
	   * requires observing the new object and updating
	   * proxied properties.
	   */
	
	  Object.defineProperty(Vue.prototype, '$data', {
	    get: function get() {
	      return this._data;
	    },
	    set: function set(newData) {
	      if (newData !== this._data) {
	        this._setData(newData);
	      }
	    }
	  });
	
	  /**
	   * Setup the scope of an instance, which contains:
	   * - observed data
	   * - computed properties
	   * - user methods
	   * - meta properties
	   */
	
	  Vue.prototype._initState = function () {
	    this._initProps();
	    this._initMeta();
	    this._initMethods();
	    this._initData();
	    this._initComputed();
	  };
	
	  /**
	   * Initialize props.
	   */
	
	  Vue.prototype._initProps = function () {
	    var options = this.$options;
	    var el = options.el;
	    var props = options.props;
	    if (props && !el) {
	      process.env.NODE_ENV !== 'production' && warn('Props will not be compiled if no `el` option is ' + 'provided at instantiation.');
	    }
	    // make sure to convert string selectors into element now
	    el = options.el = query(el);
	    this._propsUnlinkFn = el && el.nodeType === 1 && props
	    // props must be linked in proper scope if inside v-for
	    ? compileAndLinkProps(this, el, props, this._scope) : null;
	  };
	
	  /**
	   * Initialize the data.
	   */
	
	  Vue.prototype._initData = function () {
	    var propsData = this._data;
	    var optionsDataFn = this.$options.data;
	    var optionsData = optionsDataFn && optionsDataFn();
	    if (optionsData) {
	      this._data = optionsData;
	      for (var prop in propsData) {
	        if (process.env.NODE_ENV !== 'production' && hasOwn(optionsData, prop)) {
	          warn('Data field "' + prop + '" is already defined ' + 'as a prop. Use prop default value instead.');
	        }
	        if (this._props[prop].raw !== null || !hasOwn(optionsData, prop)) {
	          set(optionsData, prop, propsData[prop]);
	        }
	      }
	    }
	    var data = this._data;
	    // proxy data on instance
	    var keys = Object.keys(data);
	    var i, key;
	    i = keys.length;
	    while (i--) {
	      key = keys[i];
	      this._proxy(key);
	    }
	    // observe data
	    observe(data, this);
	  };
	
	  /**
	   * Swap the instance's $data. Called in $data's setter.
	   *
	   * @param {Object} newData
	   */
	
	  Vue.prototype._setData = function (newData) {
	    newData = newData || {};
	    var oldData = this._data;
	    this._data = newData;
	    var keys, key, i;
	    // unproxy keys not present in new data
	    keys = Object.keys(oldData);
	    i = keys.length;
	    while (i--) {
	      key = keys[i];
	      if (!(key in newData)) {
	        this._unproxy(key);
	      }
	    }
	    // proxy keys not already proxied,
	    // and trigger change for changed values
	    keys = Object.keys(newData);
	    i = keys.length;
	    while (i--) {
	      key = keys[i];
	      if (!hasOwn(this, key)) {
	        // new property
	        this._proxy(key);
	      }
	    }
	    oldData.__ob__.removeVm(this);
	    observe(newData, this);
	    this._digest();
	  };
	
	  /**
	   * Proxy a property, so that
	   * vm.prop === vm._data.prop
	   *
	   * @param {String} key
	   */
	
	  Vue.prototype._proxy = function (key) {
	    if (!isReserved(key)) {
	      // need to store ref to self here
	      // because these getter/setters might
	      // be called by child scopes via
	      // prototype inheritance.
	      var self = this;
	      Object.defineProperty(self, key, {
	        configurable: true,
	        enumerable: true,
	        get: function proxyGetter() {
	          return self._data[key];
	        },
	        set: function proxySetter(val) {
	          self._data[key] = val;
	        }
	      });
	    }
	  };
	
	  /**
	   * Unproxy a property.
	   *
	   * @param {String} key
	   */
	
	  Vue.prototype._unproxy = function (key) {
	    if (!isReserved(key)) {
	      delete this[key];
	    }
	  };
	
	  /**
	   * Force update on every watcher in scope.
	   */
	
	  Vue.prototype._digest = function () {
	    for (var i = 0, l = this._watchers.length; i < l; i++) {
	      this._watchers[i].update(true); // shallow updates
	    }
	  };
	
	  /**
	   * Setup computed properties. They are essentially
	   * special getter/setters
	   */
	
	  function noop() {}
	  Vue.prototype._initComputed = function () {
	    var computed = this.$options.computed;
	    if (computed) {
	      for (var key in computed) {
	        var userDef = computed[key];
	        var def = {
	          enumerable: true,
	          configurable: true
	        };
	        if (typeof userDef === 'function') {
	          def.get = makeComputedGetter(userDef, this);
	          def.set = noop;
	        } else {
	          def.get = userDef.get ? userDef.cache !== false ? makeComputedGetter(userDef.get, this) : bind$1(userDef.get, this) : noop;
	          def.set = userDef.set ? bind$1(userDef.set, this) : noop;
	        }
	        Object.defineProperty(this, key, def);
	      }
	    }
	  };
	
	  function makeComputedGetter(getter, owner) {
	    var watcher = new Watcher(owner, getter, null, {
	      lazy: true
	    });
	    return function computedGetter() {
	      if (watcher.dirty) {
	        watcher.evaluate();
	      }
	      if (Dep.target) {
	        watcher.depend();
	      }
	      return watcher.value;
	    };
	  }
	
	  /**
	   * Setup instance methods. Methods must be bound to the
	   * instance since they might be passed down as a prop to
	   * child components.
	   */
	
	  Vue.prototype._initMethods = function () {
	    var methods = this.$options.methods;
	    if (methods) {
	      for (var key in methods) {
	        this[key] = bind$1(methods[key], this);
	      }
	    }
	  };
	
	  /**
	   * Initialize meta information like $index, $key & $value.
	   */
	
	  Vue.prototype._initMeta = function () {
	    var metas = this.$options._meta;
	    if (metas) {
	      for (var key in metas) {
	        defineReactive(this, key, metas[key]);
	      }
	    }
	  };
	}
	
	var eventRE = /^v-on:|^@/;
	
	function eventsMixin (Vue) {
	
	  /**
	   * Setup the instance's option events & watchers.
	   * If the value is a string, we pull it from the
	   * instance's methods by name.
	   */
	
	  Vue.prototype._initEvents = function () {
	    var options = this.$options;
	    if (options._asComponent) {
	      registerComponentEvents(this, options.el);
	    }
	    registerCallbacks(this, '$on', options.events);
	    registerCallbacks(this, '$watch', options.watch);
	  };
	
	  /**
	   * Register v-on events on a child component
	   *
	   * @param {Vue} vm
	   * @param {Element} el
	   */
	
	  function registerComponentEvents(vm, el) {
	    var attrs = el.attributes;
	    var name, handler;
	    for (var i = 0, l = attrs.length; i < l; i++) {
	      name = attrs[i].name;
	      if (eventRE.test(name)) {
	        name = name.replace(eventRE, '');
	        handler = (vm._scope || vm._context).$eval(attrs[i].value, true);
	        handler._fromParent = true;
	        vm.$on(name.replace(eventRE), handler);
	      }
	    }
	  }
	
	  /**
	   * Register callbacks for option events and watchers.
	   *
	   * @param {Vue} vm
	   * @param {String} action
	   * @param {Object} hash
	   */
	
	  function registerCallbacks(vm, action, hash) {
	    if (!hash) return;
	    var handlers, key, i, j;
	    for (key in hash) {
	      handlers = hash[key];
	      if (isArray(handlers)) {
	        for (i = 0, j = handlers.length; i < j; i++) {
	          register(vm, action, key, handlers[i]);
	        }
	      } else {
	        register(vm, action, key, handlers);
	      }
	    }
	  }
	
	  /**
	   * Helper to register an event/watch callback.
	   *
	   * @param {Vue} vm
	   * @param {String} action
	   * @param {String} key
	   * @param {Function|String|Object} handler
	   * @param {Object} [options]
	   */
	
	  function register(vm, action, key, handler, options) {
	    var type = typeof handler;
	    if (type === 'function') {
	      vm[action](key, handler, options);
	    } else if (type === 'string') {
	      var methods = vm.$options.methods;
	      var method = methods && methods[handler];
	      if (method) {
	        vm[action](key, method, options);
	      } else {
	        process.env.NODE_ENV !== 'production' && warn('Unknown method: "' + handler + '" when ' + 'registering callback for ' + action + ': "' + key + '".');
	      }
	    } else if (handler && type === 'object') {
	      register(vm, action, key, handler.handler, handler);
	    }
	  }
	
	  /**
	   * Setup recursive attached/detached calls
	   */
	
	  Vue.prototype._initDOMHooks = function () {
	    this.$on('hook:attached', onAttached);
	    this.$on('hook:detached', onDetached);
	  };
	
	  /**
	   * Callback to recursively call attached hook on children
	   */
	
	  function onAttached() {
	    if (!this._isAttached) {
	      this._isAttached = true;
	      this.$children.forEach(callAttach);
	    }
	  }
	
	  /**
	   * Iterator to call attached hook
	   *
	   * @param {Vue} child
	   */
	
	  function callAttach(child) {
	    if (!child._isAttached && inDoc(child.$el)) {
	      child._callHook('attached');
	    }
	  }
	
	  /**
	   * Callback to recursively call detached hook on children
	   */
	
	  function onDetached() {
	    if (this._isAttached) {
	      this._isAttached = false;
	      this.$children.forEach(callDetach);
	    }
	  }
	
	  /**
	   * Iterator to call detached hook
	   *
	   * @param {Vue} child
	   */
	
	  function callDetach(child) {
	    if (child._isAttached && !inDoc(child.$el)) {
	      child._callHook('detached');
	    }
	  }
	
	  /**
	   * Trigger all handlers for a hook
	   *
	   * @param {String} hook
	   */
	
	  Vue.prototype._callHook = function (hook) {
	    this.$emit('pre-hook:' + hook);
	    var handlers = this.$options[hook];
	    if (handlers) {
	      for (var i = 0, j = handlers.length; i < j; i++) {
	        handlers[i].call(this);
	      }
	    }
	    this.$emit('hook:' + hook);
	  };
	}
	
	function noop() {}
	
	/**
	 * A directive links a DOM element with a piece of data,
	 * which is the result of evaluating an expression.
	 * It registers a watcher with the expression and calls
	 * the DOM update function when a change is triggered.
	 *
	 * @param {String} name
	 * @param {Node} el
	 * @param {Vue} vm
	 * @param {Object} descriptor
	 *                 - {String} name
	 *                 - {Object} def
	 *                 - {String} expression
	 *                 - {Array<Object>} [filters]
	 *                 - {Boolean} literal
	 *                 - {String} attr
	 *                 - {String} raw
	 * @param {Object} def - directive definition object
	 * @param {Vue} [host] - transclusion host component
	 * @param {Object} [scope] - v-for scope
	 * @param {Fragment} [frag] - owner fragment
	 * @constructor
	 */
	function Directive(descriptor, vm, el, host, scope, frag) {
	  this.vm = vm;
	  this.el = el;
	  // copy descriptor properties
	  this.descriptor = descriptor;
	  this.name = descriptor.name;
	  this.expression = descriptor.expression;
	  this.arg = descriptor.arg;
	  this.modifiers = descriptor.modifiers;
	  this.filters = descriptor.filters;
	  this.literal = this.modifiers && this.modifiers.literal;
	  // private
	  this._locked = false;
	  this._bound = false;
	  this._listeners = null;
	  // link context
	  this._host = host;
	  this._scope = scope;
	  this._frag = frag;
	  // store directives on node in dev mode
	  if (process.env.NODE_ENV !== 'production' && this.el) {
	    this.el._vue_directives = this.el._vue_directives || [];
	    this.el._vue_directives.push(this);
	  }
	}
	
	/**
	 * Initialize the directive, mixin definition properties,
	 * setup the watcher, call definition bind() and update()
	 * if present.
	 *
	 * @param {Object} def
	 */
	
	Directive.prototype._bind = function () {
	  var name = this.name;
	  var descriptor = this.descriptor;
	
	  // remove attribute
	  if ((name !== 'cloak' || this.vm._isCompiled) && this.el && this.el.removeAttribute) {
	    var attr = descriptor.attr || 'v-' + name;
	    this.el.removeAttribute(attr);
	  }
	
	  // copy def properties
	  var def = descriptor.def;
	  if (typeof def === 'function') {
	    this.update = def;
	  } else {
	    extend(this, def);
	  }
	
	  // setup directive params
	  this._setupParams();
	
	  // initial bind
	  if (this.bind) {
	    this.bind();
	  }
	  this._bound = true;
	
	  if (this.literal) {
	    this.update && this.update(descriptor.raw);
	  } else if ((this.expression || this.modifiers) && (this.update || this.twoWay) && !this._checkStatement()) {
	    // wrapped updater for context
	    var dir = this;
	    if (this.update) {
	      this._update = function (val, oldVal) {
	        if (!dir._locked) {
	          dir.update(val, oldVal);
	        }
	      };
	    } else {
	      this._update = noop;
	    }
	    var preProcess = this._preProcess ? bind$1(this._preProcess, this) : null;
	    var postProcess = this._postProcess ? bind$1(this._postProcess, this) : null;
	    var watcher = this._watcher = new Watcher(this.vm, this.expression, this._update, // callback
	    {
	      filters: this.filters,
	      twoWay: this.twoWay,
	      deep: this.deep,
	      preProcess: preProcess,
	      postProcess: postProcess,
	      scope: this._scope
	    });
	    // v-model with inital inline value need to sync back to
	    // model instead of update to DOM on init. They would
	    // set the afterBind hook to indicate that.
	    if (this.afterBind) {
	      this.afterBind();
	    } else if (this.update) {
	      this.update(watcher.value);
	    }
	  }
	};
	
	/**
	 * Setup all param attributes, e.g. track-by,
	 * transition-mode, etc...
	 */
	
	Directive.prototype._setupParams = function () {
	  if (!this.params) {
	    return;
	  }
	  var params = this.params;
	  // swap the params array with a fresh object.
	  this.params = Object.create(null);
	  var i = params.length;
	  var key, val, mappedKey;
	  while (i--) {
	    key = params[i];
	    mappedKey = camelize(key);
	    val = getBindAttr(this.el, key);
	    if (val != null) {
	      // dynamic
	      this._setupParamWatcher(mappedKey, val);
	    } else {
	      // static
	      val = getAttr(this.el, key);
	      if (val != null) {
	        this.params[mappedKey] = val === '' ? true : val;
	      }
	    }
	  }
	};
	
	/**
	 * Setup a watcher for a dynamic param.
	 *
	 * @param {String} key
	 * @param {String} expression
	 */
	
	Directive.prototype._setupParamWatcher = function (key, expression) {
	  var self = this;
	  var called = false;
	  var unwatch = (this._scope || this.vm).$watch(expression, function (val, oldVal) {
	    self.params[key] = val;
	    // since we are in immediate mode,
	    // only call the param change callbacks if this is not the first update.
	    if (called) {
	      var cb = self.paramWatchers && self.paramWatchers[key];
	      if (cb) {
	        cb.call(self, val, oldVal);
	      }
	    } else {
	      called = true;
	    }
	  }, {
	    immediate: true,
	    user: false
	  });(this._paramUnwatchFns || (this._paramUnwatchFns = [])).push(unwatch);
	};
	
	/**
	 * Check if the directive is a function caller
	 * and if the expression is a callable one. If both true,
	 * we wrap up the expression and use it as the event
	 * handler.
	 *
	 * e.g. on-click="a++"
	 *
	 * @return {Boolean}
	 */
	
	Directive.prototype._checkStatement = function () {
	  var expression = this.expression;
	  if (expression && this.acceptStatement && !isSimplePath(expression)) {
	    var fn = parseExpression(expression).get;
	    var scope = this._scope || this.vm;
	    var handler = function handler(e) {
	      scope.$event = e;
	      fn.call(scope, scope);
	      scope.$event = null;
	    };
	    if (this.filters) {
	      handler = scope._applyFilters(handler, null, this.filters);
	    }
	    this.update(handler);
	    return true;
	  }
	};
	
	/**
	 * Set the corresponding value with the setter.
	 * This should only be used in two-way directives
	 * e.g. v-model.
	 *
	 * @param {*} value
	 * @public
	 */
	
	Directive.prototype.set = function (value) {
	  /* istanbul ignore else */
	  if (this.twoWay) {
	    this._withLock(function () {
	      this._watcher.set(value);
	    });
	  } else if (process.env.NODE_ENV !== 'production') {
	    warn('Directive.set() can only be used inside twoWay' + 'directives.');
	  }
	};
	
	/**
	 * Execute a function while preventing that function from
	 * triggering updates on this directive instance.
	 *
	 * @param {Function} fn
	 */
	
	Directive.prototype._withLock = function (fn) {
	  var self = this;
	  self._locked = true;
	  fn.call(self);
	  nextTick(function () {
	    self._locked = false;
	  });
	};
	
	/**
	 * Convenience method that attaches a DOM event listener
	 * to the directive element and autometically tears it down
	 * during unbind.
	 *
	 * @param {String} event
	 * @param {Function} handler
	 */
	
	Directive.prototype.on = function (event, handler) {
	  on$1(this.el, event, handler);(this._listeners || (this._listeners = [])).push([event, handler]);
	};
	
	/**
	 * Teardown the watcher and call unbind.
	 */
	
	Directive.prototype._teardown = function () {
	  if (this._bound) {
	    this._bound = false;
	    if (this.unbind) {
	      this.unbind();
	    }
	    if (this._watcher) {
	      this._watcher.teardown();
	    }
	    var listeners = this._listeners;
	    var i;
	    if (listeners) {
	      i = listeners.length;
	      while (i--) {
	        off(this.el, listeners[i][0], listeners[i][1]);
	      }
	    }
	    var unwatchFns = this._paramUnwatchFns;
	    if (unwatchFns) {
	      i = unwatchFns.length;
	      while (i--) {
	        unwatchFns[i]();
	      }
	    }
	    if (process.env.NODE_ENV !== 'production' && this.el) {
	      this.el._vue_directives.$remove(this);
	    }
	    this.vm = this.el = this._watcher = this._listeners = null;
	  }
	};
	
	function lifecycleMixin (Vue) {
	
	  /**
	   * Update v-ref for component.
	   *
	   * @param {Boolean} remove
	   */
	
	  Vue.prototype._updateRef = function (remove) {
	    var ref = this.$options._ref;
	    if (ref) {
	      var refs = (this._scope || this._context).$refs;
	      if (remove) {
	        if (refs[ref] === this) {
	          refs[ref] = null;
	        }
	      } else {
	        refs[ref] = this;
	      }
	    }
	  };
	
	  /**
	   * Transclude, compile and link element.
	   *
	   * If a pre-compiled linker is available, that means the
	   * passed in element will be pre-transcluded and compiled
	   * as well - all we need to do is to call the linker.
	   *
	   * Otherwise we need to call transclude/compile/link here.
	   *
	   * @param {Element} el
	   * @return {Element}
	   */
	
	  Vue.prototype._compile = function (el) {
	    var options = this.$options;
	
	    // transclude and init element
	    // transclude can potentially replace original
	    // so we need to keep reference; this step also injects
	    // the template and caches the original attributes
	    // on the container node and replacer node.
	    var original = el;
	    el = transclude(el, options);
	    this._initElement(el);
	
	    // handle v-pre on root node (#2026)
	    if (el.nodeType === 1 && getAttr(el, 'v-pre') !== null) {
	      return;
	    }
	
	    // root is always compiled per-instance, because
	    // container attrs and props can be different every time.
	    var contextOptions = this._context && this._context.$options;
	    var rootLinker = compileRoot(el, options, contextOptions);
	
	    // compile and link the rest
	    var contentLinkFn;
	    var ctor = this.constructor;
	    // component compilation can be cached
	    // as long as it's not using inline-template
	    if (options._linkerCachable) {
	      contentLinkFn = ctor.linker;
	      if (!contentLinkFn) {
	        contentLinkFn = ctor.linker = compile(el, options);
	      }
	    }
	
	    // link phase
	    // make sure to link root with prop scope!
	    var rootUnlinkFn = rootLinker(this, el, this._scope);
	    var contentUnlinkFn = contentLinkFn ? contentLinkFn(this, el) : compile(el, options)(this, el);
	
	    // register composite unlink function
	    // to be called during instance destruction
	    this._unlinkFn = function () {
	      rootUnlinkFn();
	      // passing destroying: true to avoid searching and
	      // splicing the directives
	      contentUnlinkFn(true);
	    };
	
	    // finally replace original
	    if (options.replace) {
	      replace(original, el);
	    }
	
	    this._isCompiled = true;
	    this._callHook('compiled');
	    return el;
	  };
	
	  /**
	   * Initialize instance element. Called in the public
	   * $mount() method.
	   *
	   * @param {Element} el
	   */
	
	  Vue.prototype._initElement = function (el) {
	    if (el instanceof DocumentFragment) {
	      this._isFragment = true;
	      this.$el = this._fragmentStart = el.firstChild;
	      this._fragmentEnd = el.lastChild;
	      // set persisted text anchors to empty
	      if (this._fragmentStart.nodeType === 3) {
	        this._fragmentStart.data = this._fragmentEnd.data = '';
	      }
	      this._fragment = el;
	    } else {
	      this.$el = el;
	    }
	    this.$el.__vue__ = this;
	    this._callHook('beforeCompile');
	  };
	
	  /**
	   * Create and bind a directive to an element.
	   *
	   * @param {String} name - directive name
	   * @param {Node} node   - target node
	   * @param {Object} desc - parsed directive descriptor
	   * @param {Object} def  - directive definition object
	   * @param {Vue} [host] - transclusion host component
	   * @param {Object} [scope] - v-for scope
	   * @param {Fragment} [frag] - owner fragment
	   */
	
	  Vue.prototype._bindDir = function (descriptor, node, host, scope, frag) {
	    this._directives.push(new Directive(descriptor, this, node, host, scope, frag));
	  };
	
	  /**
	   * Teardown an instance, unobserves the data, unbind all the
	   * directives, turn off all the event listeners, etc.
	   *
	   * @param {Boolean} remove - whether to remove the DOM node.
	   * @param {Boolean} deferCleanup - if true, defer cleanup to
	   *                                 be called later
	   */
	
	  Vue.prototype._destroy = function (remove, deferCleanup) {
	    if (this._isBeingDestroyed) {
	      if (!deferCleanup) {
	        this._cleanup();
	      }
	      return;
	    }
	
	    var destroyReady;
	    var pendingRemoval;
	
	    var self = this;
	    // Cleanup should be called either synchronously or asynchronoysly as
	    // callback of this.$remove(), or if remove and deferCleanup are false.
	    // In any case it should be called after all other removing, unbinding and
	    // turning of is done
	    var cleanupIfPossible = function cleanupIfPossible() {
	      if (destroyReady && !pendingRemoval && !deferCleanup) {
	        self._cleanup();
	      }
	    };
	
	    // remove DOM element
	    if (remove && this.$el) {
	      pendingRemoval = true;
	      this.$remove(function () {
	        pendingRemoval = false;
	        cleanupIfPossible();
	      });
	    }
	
	    this._callHook('beforeDestroy');
	    this._isBeingDestroyed = true;
	    var i;
	    // remove self from parent. only necessary
	    // if parent is not being destroyed as well.
	    var parent = this.$parent;
	    if (parent && !parent._isBeingDestroyed) {
	      parent.$children.$remove(this);
	      // unregister ref (remove: true)
	      this._updateRef(true);
	    }
	    // destroy all children.
	    i = this.$children.length;
	    while (i--) {
	      this.$children[i].$destroy();
	    }
	    // teardown props
	    if (this._propsUnlinkFn) {
	      this._propsUnlinkFn();
	    }
	    // teardown all directives. this also tearsdown all
	    // directive-owned watchers.
	    if (this._unlinkFn) {
	      this._unlinkFn();
	    }
	    i = this._watchers.length;
	    while (i--) {
	      this._watchers[i].teardown();
	    }
	    // remove reference to self on $el
	    if (this.$el) {
	      this.$el.__vue__ = null;
	    }
	
	    destroyReady = true;
	    cleanupIfPossible();
	  };
	
	  /**
	   * Clean up to ensure garbage collection.
	   * This is called after the leave transition if there
	   * is any.
	   */
	
	  Vue.prototype._cleanup = function () {
	    if (this._isDestroyed) {
	      return;
	    }
	    // remove self from owner fragment
	    // do it in cleanup so that we can call $destroy with
	    // defer right when a fragment is about to be removed.
	    if (this._frag) {
	      this._frag.children.$remove(this);
	    }
	    // remove reference from data ob
	    // frozen object may not have observer.
	    if (this._data.__ob__) {
	      this._data.__ob__.removeVm(this);
	    }
	    // Clean up references to private properties and other
	    // instances. preserve reference to _data so that proxy
	    // accessors still work. The only potential side effect
	    // here is that mutating the instance after it's destroyed
	    // may affect the state of other components that are still
	    // observing the same object, but that seems to be a
	    // reasonable responsibility for the user rather than
	    // always throwing an error on them.
	    this.$el = this.$parent = this.$root = this.$children = this._watchers = this._context = this._scope = this._directives = null;
	    // call the last hook...
	    this._isDestroyed = true;
	    this._callHook('destroyed');
	    // turn off all instance listeners.
	    this.$off();
	  };
	}
	
	function miscMixin (Vue) {
	
	  /**
	   * Apply a list of filter (descriptors) to a value.
	   * Using plain for loops here because this will be called in
	   * the getter of any watcher with filters so it is very
	   * performance sensitive.
	   *
	   * @param {*} value
	   * @param {*} [oldValue]
	   * @param {Array} filters
	   * @param {Boolean} write
	   * @return {*}
	   */
	
	  Vue.prototype._applyFilters = function (value, oldValue, filters, write) {
	    var filter, fn, args, arg, offset, i, l, j, k;
	    for (i = 0, l = filters.length; i < l; i++) {
	      filter = filters[i];
	      fn = resolveAsset(this.$options, 'filters', filter.name);
	      if (process.env.NODE_ENV !== 'production') {
	        assertAsset(fn, 'filter', filter.name);
	      }
	      if (!fn) continue;
	      fn = write ? fn.write : fn.read || fn;
	      if (typeof fn !== 'function') continue;
	      args = write ? [value, oldValue] : [value];
	      offset = write ? 2 : 1;
	      if (filter.args) {
	        for (j = 0, k = filter.args.length; j < k; j++) {
	          arg = filter.args[j];
	          args[j + offset] = arg.dynamic ? this.$get(arg.value) : arg.value;
	        }
	      }
	      value = fn.apply(this, args);
	    }
	    return value;
	  };
	
	  /**
	   * Resolve a component, depending on whether the component
	   * is defined normally or using an async factory function.
	   * Resolves synchronously if already resolved, otherwise
	   * resolves asynchronously and caches the resolved
	   * constructor on the factory.
	   *
	   * @param {String} id
	   * @param {Function} cb
	   */
	
	  Vue.prototype._resolveComponent = function (id, cb) {
	    var factory = resolveAsset(this.$options, 'components', id);
	    if (process.env.NODE_ENV !== 'production') {
	      assertAsset(factory, 'component', id);
	    }
	    if (!factory) {
	      return;
	    }
	    // async component factory
	    if (!factory.options) {
	      if (factory.resolved) {
	        // cached
	        cb(factory.resolved);
	      } else if (factory.requested) {
	        // pool callbacks
	        factory.pendingCallbacks.push(cb);
	      } else {
	        factory.requested = true;
	        var cbs = factory.pendingCallbacks = [cb];
	        factory(function resolve(res) {
	          if (isPlainObject(res)) {
	            res = Vue.extend(res);
	          }
	          // cache resolved
	          factory.resolved = res;
	          // invoke callbacks
	          for (var i = 0, l = cbs.length; i < l; i++) {
	            cbs[i](res);
	          }
	        }, function reject(reason) {
	          process.env.NODE_ENV !== 'production' && warn('Failed to resolve async component: ' + id + '. ' + (reason ? '\nReason: ' + reason : ''));
	        });
	      }
	    } else {
	      // normal component
	      cb(factory);
	    }
	  };
	}
	
	function globalAPI (Vue) {
	
	  /**
	   * Expose useful internals
	   */
	
	  Vue.util = util;
	  Vue.config = config;
	  Vue.set = set;
	  Vue['delete'] = del;
	  Vue.nextTick = nextTick;
	
	  /**
	   * The following are exposed for advanced usage / plugins
	   */
	
	  Vue.compiler = compiler;
	  Vue.FragmentFactory = FragmentFactory;
	  Vue.internalDirectives = internalDirectives;
	  Vue.parsers = {
	    path: path,
	    text: text$1,
	    template: template,
	    directive: directive,
	    expression: expression
	  };
	
	  /**
	   * Each instance constructor, including Vue, has a unique
	   * cid. This enables us to create wrapped "child
	   * constructors" for prototypal inheritance and cache them.
	   */
	
	  Vue.cid = 0;
	  var cid = 1;
	
	  /**
	   * Class inheritance
	   *
	   * @param {Object} extendOptions
	   */
	
	  Vue.extend = function (extendOptions) {
	    extendOptions = extendOptions || {};
	    var Super = this;
	    var isFirstExtend = Super.cid === 0;
	    if (isFirstExtend && extendOptions._Ctor) {
	      return extendOptions._Ctor;
	    }
	    var name = extendOptions.name || Super.options.name;
	    if (process.env.NODE_ENV !== 'production') {
	      if (!/^[a-zA-Z][\w-]+$/.test(name)) {
	        warn('Invalid component name: ' + name);
	        name = null;
	      }
	    }
	    var Sub = createClass(name || 'VueComponent');
	    Sub.prototype = Object.create(Super.prototype);
	    Sub.prototype.constructor = Sub;
	    Sub.cid = cid++;
	    Sub.options = mergeOptions(Super.options, extendOptions);
	    Sub['super'] = Super;
	    // allow further extension
	    Sub.extend = Super.extend;
	    // create asset registers, so extended classes
	    // can have their private assets too.
	    config._assetTypes.forEach(function (type) {
	      Sub[type] = Super[type];
	    });
	    // enable recursive self-lookup
	    if (name) {
	      Sub.options.components[name] = Sub;
	    }
	    // cache constructor
	    if (isFirstExtend) {
	      extendOptions._Ctor = Sub;
	    }
	    return Sub;
	  };
	
	  /**
	   * A function that returns a sub-class constructor with the
	   * given name. This gives us much nicer output when
	   * logging instances in the console.
	   *
	   * @param {String} name
	   * @return {Function}
	   */
	
	  function createClass(name) {
	    return new Function('return function ' + classify(name) + ' (options) { this._init(options) }')();
	  }
	
	  /**
	   * Plugin system
	   *
	   * @param {Object} plugin
	   */
	
	  Vue.use = function (plugin) {
	    /* istanbul ignore if */
	    if (plugin.installed) {
	      return;
	    }
	    // additional parameters
	    var args = toArray(arguments, 1);
	    args.unshift(this);
	    if (typeof plugin.install === 'function') {
	      plugin.install.apply(plugin, args);
	    } else {
	      plugin.apply(null, args);
	    }
	    plugin.installed = true;
	    return this;
	  };
	
	  /**
	   * Apply a global mixin by merging it into the default
	   * options.
	   */
	
	  Vue.mixin = function (mixin) {
	    Vue.options = mergeOptions(Vue.options, mixin);
	  };
	
	  /**
	   * Create asset registration methods with the following
	   * signature:
	   *
	   * @param {String} id
	   * @param {*} definition
	   */
	
	  config._assetTypes.forEach(function (type) {
	    Vue[type] = function (id, definition) {
	      if (!definition) {
	        return this.options[type + 's'][id];
	      } else {
	        /* istanbul ignore if */
	        if (process.env.NODE_ENV !== 'production') {
	          if (type === 'component' && (commonTagRE.test(id) || reservedTagRE.test(id))) {
	            warn('Do not use built-in or reserved HTML elements as component ' + 'id: ' + id);
	          }
	        }
	        if (type === 'component' && isPlainObject(definition)) {
	          definition.name = id;
	          definition = Vue.extend(definition);
	        }
	        this.options[type + 's'][id] = definition;
	        return definition;
	      }
	    };
	  });
	}
	
	var filterRE = /[^|]\|[^|]/;
	
	function dataAPI (Vue) {
	
	  /**
	   * Get the value from an expression on this vm.
	   *
	   * @param {String} exp
	   * @param {Boolean} [asStatement]
	   * @return {*}
	   */
	
	  Vue.prototype.$get = function (exp, asStatement) {
	    var res = parseExpression(exp);
	    if (res) {
	      if (asStatement && !isSimplePath(exp)) {
	        var self = this;
	        return function statementHandler() {
	          self.$arguments = toArray(arguments);
	          var result = res.get.call(self, self);
	          self.$arguments = null;
	          return result;
	        };
	      } else {
	        try {
	          return res.get.call(this, this);
	        } catch (e) {}
	      }
	    }
	  };
	
	  /**
	   * Set the value from an expression on this vm.
	   * The expression must be a valid left-hand
	   * expression in an assignment.
	   *
	   * @param {String} exp
	   * @param {*} val
	   */
	
	  Vue.prototype.$set = function (exp, val) {
	    var res = parseExpression(exp, true);
	    if (res && res.set) {
	      res.set.call(this, this, val);
	    }
	  };
	
	  /**
	   * Delete a property on the VM
	   *
	   * @param {String} key
	   */
	
	  Vue.prototype.$delete = function (key) {
	    del(this._data, key);
	  };
	
	  /**
	   * Watch an expression, trigger callback when its
	   * value changes.
	   *
	   * @param {String|Function} expOrFn
	   * @param {Function} cb
	   * @param {Object} [options]
	   *                 - {Boolean} deep
	   *                 - {Boolean} immediate
	   * @return {Function} - unwatchFn
	   */
	
	  Vue.prototype.$watch = function (expOrFn, cb, options) {
	    var vm = this;
	    var parsed;
	    if (typeof expOrFn === 'string') {
	      parsed = parseDirective(expOrFn);
	      expOrFn = parsed.expression;
	    }
	    var watcher = new Watcher(vm, expOrFn, cb, {
	      deep: options && options.deep,
	      sync: options && options.sync,
	      filters: parsed && parsed.filters,
	      user: !options || options.user !== false
	    });
	    if (options && options.immediate) {
	      cb.call(vm, watcher.value);
	    }
	    return function unwatchFn() {
	      watcher.teardown();
	    };
	  };
	
	  /**
	   * Evaluate a text directive, including filters.
	   *
	   * @param {String} text
	   * @param {Boolean} [asStatement]
	   * @return {String}
	   */
	
	  Vue.prototype.$eval = function (text, asStatement) {
	    // check for filters.
	    if (filterRE.test(text)) {
	      var dir = parseDirective(text);
	      // the filter regex check might give false positive
	      // for pipes inside strings, so it's possible that
	      // we don't get any filters here
	      var val = this.$get(dir.expression, asStatement);
	      return dir.filters ? this._applyFilters(val, null, dir.filters) : val;
	    } else {
	      // no filter
	      return this.$get(text, asStatement);
	    }
	  };
	
	  /**
	   * Interpolate a piece of template text.
	   *
	   * @param {String} text
	   * @return {String}
	   */
	
	  Vue.prototype.$interpolate = function (text) {
	    var tokens = parseText(text);
	    var vm = this;
	    if (tokens) {
	      if (tokens.length === 1) {
	        return vm.$eval(tokens[0].value) + '';
	      } else {
	        return tokens.map(function (token) {
	          return token.tag ? vm.$eval(token.value) : token.value;
	        }).join('');
	      }
	    } else {
	      return text;
	    }
	  };
	
	  /**
	   * Log instance data as a plain JS object
	   * so that it is easier to inspect in console.
	   * This method assumes console is available.
	   *
	   * @param {String} [path]
	   */
	
	  Vue.prototype.$log = function (path) {
	    var data = path ? getPath(this._data, path) : this._data;
	    if (data) {
	      data = clean(data);
	    }
	    // include computed fields
	    if (!path) {
	      for (var key in this.$options.computed) {
	        data[key] = clean(this[key]);
	      }
	    }
	    console.log(data);
	  };
	
	  /**
	   * "clean" a getter/setter converted object into a plain
	   * object copy.
	   *
	   * @param {Object} - obj
	   * @return {Object}
	   */
	
	  function clean(obj) {
	    return JSON.parse(JSON.stringify(obj));
	  }
	}
	
	function domAPI (Vue) {
	
	  /**
	   * Convenience on-instance nextTick. The callback is
	   * auto-bound to the instance, and this avoids component
	   * modules having to rely on the global Vue.
	   *
	   * @param {Function} fn
	   */
	
	  Vue.prototype.$nextTick = function (fn) {
	    nextTick(fn, this);
	  };
	
	  /**
	   * Append instance to target
	   *
	   * @param {Node} target
	   * @param {Function} [cb]
	   * @param {Boolean} [withTransition] - defaults to true
	   */
	
	  Vue.prototype.$appendTo = function (target, cb, withTransition) {
	    return insert(this, target, cb, withTransition, append, appendWithTransition);
	  };
	
	  /**
	   * Prepend instance to target
	   *
	   * @param {Node} target
	   * @param {Function} [cb]
	   * @param {Boolean} [withTransition] - defaults to true
	   */
	
	  Vue.prototype.$prependTo = function (target, cb, withTransition) {
	    target = query(target);
	    if (target.hasChildNodes()) {
	      this.$before(target.firstChild, cb, withTransition);
	    } else {
	      this.$appendTo(target, cb, withTransition);
	    }
	    return this;
	  };
	
	  /**
	   * Insert instance before target
	   *
	   * @param {Node} target
	   * @param {Function} [cb]
	   * @param {Boolean} [withTransition] - defaults to true
	   */
	
	  Vue.prototype.$before = function (target, cb, withTransition) {
	    return insert(this, target, cb, withTransition, beforeWithCb, beforeWithTransition);
	  };
	
	  /**
	   * Insert instance after target
	   *
	   * @param {Node} target
	   * @param {Function} [cb]
	   * @param {Boolean} [withTransition] - defaults to true
	   */
	
	  Vue.prototype.$after = function (target, cb, withTransition) {
	    target = query(target);
	    if (target.nextSibling) {
	      this.$before(target.nextSibling, cb, withTransition);
	    } else {
	      this.$appendTo(target.parentNode, cb, withTransition);
	    }
	    return this;
	  };
	
	  /**
	   * Remove instance from DOM
	   *
	   * @param {Function} [cb]
	   * @param {Boolean} [withTransition] - defaults to true
	   */
	
	  Vue.prototype.$remove = function (cb, withTransition) {
	    if (!this.$el.parentNode) {
	      return cb && cb();
	    }
	    var inDocument = this._isAttached && inDoc(this.$el);
	    // if we are not in document, no need to check
	    // for transitions
	    if (!inDocument) withTransition = false;
	    var self = this;
	    var realCb = function realCb() {
	      if (inDocument) self._callHook('detached');
	      if (cb) cb();
	    };
	    if (this._isFragment) {
	      removeNodeRange(this._fragmentStart, this._fragmentEnd, this, this._fragment, realCb);
	    } else {
	      var op = withTransition === false ? removeWithCb : removeWithTransition;
	      op(this.$el, this, realCb);
	    }
	    return this;
	  };
	
	  /**
	   * Shared DOM insertion function.
	   *
	   * @param {Vue} vm
	   * @param {Element} target
	   * @param {Function} [cb]
	   * @param {Boolean} [withTransition]
	   * @param {Function} op1 - op for non-transition insert
	   * @param {Function} op2 - op for transition insert
	   * @return vm
	   */
	
	  function insert(vm, target, cb, withTransition, op1, op2) {
	    target = query(target);
	    var targetIsDetached = !inDoc(target);
	    var op = withTransition === false || targetIsDetached ? op1 : op2;
	    var shouldCallHook = !targetIsDetached && !vm._isAttached && !inDoc(vm.$el);
	    if (vm._isFragment) {
	      mapNodeRange(vm._fragmentStart, vm._fragmentEnd, function (node) {
	        op(node, target, vm);
	      });
	      cb && cb();
	    } else {
	      op(vm.$el, target, vm, cb);
	    }
	    if (shouldCallHook) {
	      vm._callHook('attached');
	    }
	    return vm;
	  }
	
	  /**
	   * Check for selectors
	   *
	   * @param {String|Element} el
	   */
	
	  function query(el) {
	    return typeof el === 'string' ? document.querySelector(el) : el;
	  }
	
	  /**
	   * Append operation that takes a callback.
	   *
	   * @param {Node} el
	   * @param {Node} target
	   * @param {Vue} vm - unused
	   * @param {Function} [cb]
	   */
	
	  function append(el, target, vm, cb) {
	    target.appendChild(el);
	    if (cb) cb();
	  }
	
	  /**
	   * InsertBefore operation that takes a callback.
	   *
	   * @param {Node} el
	   * @param {Node} target
	   * @param {Vue} vm - unused
	   * @param {Function} [cb]
	   */
	
	  function beforeWithCb(el, target, vm, cb) {
	    before(el, target);
	    if (cb) cb();
	  }
	
	  /**
	   * Remove operation that takes a callback.
	   *
	   * @param {Node} el
	   * @param {Vue} vm - unused
	   * @param {Function} [cb]
	   */
	
	  function removeWithCb(el, vm, cb) {
	    remove(el);
	    if (cb) cb();
	  }
	}
	
	function eventsAPI (Vue) {
	
	  /**
	   * Listen on the given `event` with `fn`.
	   *
	   * @param {String} event
	   * @param {Function} fn
	   */
	
	  Vue.prototype.$on = function (event, fn) {
	    (this._events[event] || (this._events[event] = [])).push(fn);
	    modifyListenerCount(this, event, 1);
	    return this;
	  };
	
	  /**
	   * Adds an `event` listener that will be invoked a single
	   * time then automatically removed.
	   *
	   * @param {String} event
	   * @param {Function} fn
	   */
	
	  Vue.prototype.$once = function (event, fn) {
	    var self = this;
	    function on() {
	      self.$off(event, on);
	      fn.apply(this, arguments);
	    }
	    on.fn = fn;
	    this.$on(event, on);
	    return this;
	  };
	
	  /**
	   * Remove the given callback for `event` or all
	   * registered callbacks.
	   *
	   * @param {String} event
	   * @param {Function} fn
	   */
	
	  Vue.prototype.$off = function (event, fn) {
	    var cbs;
	    // all
	    if (!arguments.length) {
	      if (this.$parent) {
	        for (event in this._events) {
	          cbs = this._events[event];
	          if (cbs) {
	            modifyListenerCount(this, event, -cbs.length);
	          }
	        }
	      }
	      this._events = {};
	      return this;
	    }
	    // specific event
	    cbs = this._events[event];
	    if (!cbs) {
	      return this;
	    }
	    if (arguments.length === 1) {
	      modifyListenerCount(this, event, -cbs.length);
	      this._events[event] = null;
	      return this;
	    }
	    // specific handler
	    var cb;
	    var i = cbs.length;
	    while (i--) {
	      cb = cbs[i];
	      if (cb === fn || cb.fn === fn) {
	        modifyListenerCount(this, event, -1);
	        cbs.splice(i, 1);
	        break;
	      }
	    }
	    return this;
	  };
	
	  /**
	   * Trigger an event on self.
	   *
	   * @param {String|Object} event
	   * @return {Boolean} shouldPropagate
	   */
	
	  Vue.prototype.$emit = function (event) {
	    var isSource = typeof event === 'string';
	    event = isSource ? event : event.name;
	    var cbs = this._events[event];
	    var shouldPropagate = isSource || !cbs;
	    if (cbs) {
	      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
	      // this is a somewhat hacky solution to the question raised
	      // in #2102: for an inline component listener like <comp @test="doThis">,
	      // the propagation handling is somewhat broken. Therefore we
	      // need to treat these inline callbacks differently.
	      var hasParentCbs = isSource && cbs.some(function (cb) {
	        return cb._fromParent;
	      });
	      if (hasParentCbs) {
	        shouldPropagate = false;
	      }
	      var args = toArray(arguments, 1);
	      for (var i = 0, l = cbs.length; i < l; i++) {
	        var cb = cbs[i];
	        var res = cb.apply(this, args);
	        if (res === true && (!hasParentCbs || cb._fromParent)) {
	          shouldPropagate = true;
	        }
	      }
	    }
	    return shouldPropagate;
	  };
	
	  /**
	   * Recursively broadcast an event to all children instances.
	   *
	   * @param {String|Object} event
	   * @param {...*} additional arguments
	   */
	
	  Vue.prototype.$broadcast = function (event) {
	    var isSource = typeof event === 'string';
	    event = isSource ? event : event.name;
	    // if no child has registered for this event,
	    // then there's no need to broadcast.
	    if (!this._eventsCount[event]) return;
	    var children = this.$children;
	    var args = toArray(arguments);
	    if (isSource) {
	      // use object event to indicate non-source emit
	      // on children
	      args[0] = { name: event, source: this };
	    }
	    for (var i = 0, l = children.length; i < l; i++) {
	      var child = children[i];
	      var shouldPropagate = child.$emit.apply(child, args);
	      if (shouldPropagate) {
	        child.$broadcast.apply(child, args);
	      }
	    }
	    return this;
	  };
	
	  /**
	   * Recursively propagate an event up the parent chain.
	   *
	   * @param {String} event
	   * @param {...*} additional arguments
	   */
	
	  Vue.prototype.$dispatch = function (event) {
	    var shouldPropagate = this.$emit.apply(this, arguments);
	    if (!shouldPropagate) return;
	    var parent = this.$parent;
	    var args = toArray(arguments);
	    // use object event to indicate non-source emit
	    // on parents
	    args[0] = { name: event, source: this };
	    while (parent) {
	      shouldPropagate = parent.$emit.apply(parent, args);
	      parent = shouldPropagate ? parent.$parent : null;
	    }
	    return this;
	  };
	
	  /**
	   * Modify the listener counts on all parents.
	   * This bookkeeping allows $broadcast to return early when
	   * no child has listened to a certain event.
	   *
	   * @param {Vue} vm
	   * @param {String} event
	   * @param {Number} count
	   */
	
	  var hookRE = /^hook:/;
	  function modifyListenerCount(vm, event, count) {
	    var parent = vm.$parent;
	    // hooks do not get broadcasted so no need
	    // to do bookkeeping for them
	    if (!parent || !count || hookRE.test(event)) return;
	    while (parent) {
	      parent._eventsCount[event] = (parent._eventsCount[event] || 0) + count;
	      parent = parent.$parent;
	    }
	  }
	}
	
	function lifecycleAPI (Vue) {
	
	  /**
	   * Set instance target element and kick off the compilation
	   * process. The passed in `el` can be a selector string, an
	   * existing Element, or a DocumentFragment (for block
	   * instances).
	   *
	   * @param {Element|DocumentFragment|string} el
	   * @public
	   */
	
	  Vue.prototype.$mount = function (el) {
	    if (this._isCompiled) {
	      process.env.NODE_ENV !== 'production' && warn('$mount() should be called only once.');
	      return;
	    }
	    el = query(el);
	    if (!el) {
	      el = document.createElement('div');
	    }
	    this._compile(el);
	    this._initDOMHooks();
	    if (inDoc(this.$el)) {
	      this._callHook('attached');
	      ready.call(this);
	    } else {
	      this.$once('hook:attached', ready);
	    }
	    return this;
	  };
	
	  /**
	   * Mark an instance as ready.
	   */
	
	  function ready() {
	    this._isAttached = true;
	    this._isReady = true;
	    this._callHook('ready');
	  }
	
	  /**
	   * Teardown the instance, simply delegate to the internal
	   * _destroy.
	   */
	
	  Vue.prototype.$destroy = function (remove, deferCleanup) {
	    this._destroy(remove, deferCleanup);
	  };
	
	  /**
	   * Partially compile a piece of DOM and return a
	   * decompile function.
	   *
	   * @param {Element|DocumentFragment} el
	   * @param {Vue} [host]
	   * @return {Function}
	   */
	
	  Vue.prototype.$compile = function (el, host, scope, frag) {
	    return compile(el, this.$options, true)(this, el, host, scope, frag);
	  };
	}
	
	/**
	 * The exposed Vue constructor.
	 *
	 * API conventions:
	 * - public API methods/properties are prefixed with `$`
	 * - internal methods/properties are prefixed with `_`
	 * - non-prefixed properties are assumed to be proxied user
	 *   data.
	 *
	 * @constructor
	 * @param {Object} [options]
	 * @public
	 */
	
	function Vue(options) {
	  this._init(options);
	}
	
	// install internals
	initMixin(Vue);
	stateMixin(Vue);
	eventsMixin(Vue);
	lifecycleMixin(Vue);
	miscMixin(Vue);
	
	// install APIs
	globalAPI(Vue);
	dataAPI(Vue);
	domAPI(Vue);
	eventsAPI(Vue);
	lifecycleAPI(Vue);
	
	var convertArray = vFor._postProcess;
	
	/**
	 * Limit filter for arrays
	 *
	 * @param {Number} n
	 * @param {Number} offset (Decimal expected)
	 */
	
	function limitBy(arr, n, offset) {
	  offset = offset ? parseInt(offset, 10) : 0;
	  n = toNumber(n);
	  return typeof n === 'number' ? arr.slice(offset, offset + n) : arr;
	}
	
	/**
	 * Filter filter for arrays
	 *
	 * @param {String} search
	 * @param {String} [delimiter]
	 * @param {String} ...dataKeys
	 */
	
	function filterBy(arr, search, delimiter) {
	  arr = convertArray(arr);
	  if (search == null) {
	    return arr;
	  }
	  if (typeof search === 'function') {
	    return arr.filter(search);
	  }
	  // cast to lowercase string
	  search = ('' + search).toLowerCase();
	  // allow optional `in` delimiter
	  // because why not
	  var n = delimiter === 'in' ? 3 : 2;
	  // extract and flatten keys
	  var keys = toArray(arguments, n).reduce(function (prev, cur) {
	    return prev.concat(cur);
	  }, []);
	  var res = [];
	  var item, key, val, j;
	  for (var i = 0, l = arr.length; i < l; i++) {
	    item = arr[i];
	    val = item && item.$value || item;
	    j = keys.length;
	    if (j) {
	      while (j--) {
	        key = keys[j];
	        if (key === '$key' && contains(item.$key, search) || contains(getPath(val, key), search)) {
	          res.push(item);
	          break;
	        }
	      }
	    } else if (contains(item, search)) {
	      res.push(item);
	    }
	  }
	  return res;
	}
	
	/**
	 * Filter filter for arrays
	 *
	 * @param {String} sortKey
	 * @param {String} reverse
	 */
	
	function orderBy(arr, sortKey, reverse) {
	  arr = convertArray(arr);
	  if (!sortKey) {
	    return arr;
	  }
	  var order = reverse && reverse < 0 ? -1 : 1;
	  // sort on a copy to avoid mutating original array
	  return arr.slice().sort(function (a, b) {
	    if (sortKey !== '$key') {
	      if (isObject(a) && '$value' in a) a = a.$value;
	      if (isObject(b) && '$value' in b) b = b.$value;
	    }
	    a = isObject(a) ? getPath(a, sortKey) : a;
	    b = isObject(b) ? getPath(b, sortKey) : b;
	    return a === b ? 0 : a > b ? order : -order;
	  });
	}
	
	/**
	 * String contain helper
	 *
	 * @param {*} val
	 * @param {String} search
	 */
	
	function contains(val, search) {
	  var i;
	  if (isPlainObject(val)) {
	    var keys = Object.keys(val);
	    i = keys.length;
	    while (i--) {
	      if (contains(val[keys[i]], search)) {
	        return true;
	      }
	    }
	  } else if (isArray(val)) {
	    i = val.length;
	    while (i--) {
	      if (contains(val[i], search)) {
	        return true;
	      }
	    }
	  } else if (val != null) {
	    return val.toString().toLowerCase().indexOf(search) > -1;
	  }
	}
	
	var digitsRE = /(\d{3})(?=\d)/g;
	
	// asset collections must be a plain object.
	var filters = {
	
	  orderBy: orderBy,
	  filterBy: filterBy,
	  limitBy: limitBy,
	
	  /**
	   * Stringify value.
	   *
	   * @param {Number} indent
	   */
	
	  json: {
	    read: function read(value, indent) {
	      return typeof value === 'string' ? value : JSON.stringify(value, null, Number(indent) || 2);
	    },
	    write: function write(value) {
	      try {
	        return JSON.parse(value);
	      } catch (e) {
	        return value;
	      }
	    }
	  },
	
	  /**
	   * 'abc' => 'Abc'
	   */
	
	  capitalize: function capitalize(value) {
	    if (!value && value !== 0) return '';
	    value = value.toString();
	    return value.charAt(0).toUpperCase() + value.slice(1);
	  },
	
	  /**
	   * 'abc' => 'ABC'
	   */
	
	  uppercase: function uppercase(value) {
	    return value || value === 0 ? value.toString().toUpperCase() : '';
	  },
	
	  /**
	   * 'AbC' => 'abc'
	   */
	
	  lowercase: function lowercase(value) {
	    return value || value === 0 ? value.toString().toLowerCase() : '';
	  },
	
	  /**
	   * 12345 => $12,345.00
	   *
	   * @param {String} sign
	   */
	
	  currency: function currency(value, _currency) {
	    value = parseFloat(value);
	    if (!isFinite(value) || !value && value !== 0) return '';
	    _currency = _currency != null ? _currency : '$';
	    var stringified = Math.abs(value).toFixed(2);
	    var _int = stringified.slice(0, -3);
	    var i = _int.length % 3;
	    var head = i > 0 ? _int.slice(0, i) + (_int.length > 3 ? ',' : '') : '';
	    var _float = stringified.slice(-3);
	    var sign = value < 0 ? '-' : '';
	    return _currency + sign + head + _int.slice(i).replace(digitsRE, '$1,') + _float;
	  },
	
	  /**
	   * 'item' => 'items'
	   *
	   * @params
	   *  an array of strings corresponding to
	   *  the single, double, triple ... forms of the word to
	   *  be pluralized. When the number to be pluralized
	   *  exceeds the length of the args, it will use the last
	   *  entry in the array.
	   *
	   *  e.g. ['single', 'double', 'triple', 'multiple']
	   */
	
	  pluralize: function pluralize(value) {
	    var args = toArray(arguments, 1);
	    return args.length > 1 ? args[value % 10 - 1] || args[args.length - 1] : args[0] + (value === 1 ? '' : 's');
	  },
	
	  /**
	   * Debounce a handler function.
	   *
	   * @param {Function} handler
	   * @param {Number} delay = 300
	   * @return {Function}
	   */
	
	  debounce: function debounce(handler, delay) {
	    if (!handler) return;
	    if (!delay) {
	      delay = 300;
	    }
	    return _debounce(handler, delay);
	  }
	};
	
	var partial = {
	
	  priority: PARTIAL,
	
	  params: ['name'],
	
	  // watch changes to name for dynamic partials
	  paramWatchers: {
	    name: function name(value) {
	      vIf.remove.call(this);
	      if (value) {
	        this.insert(value);
	      }
	    }
	  },
	
	  bind: function bind() {
	    this.anchor = createAnchor('v-partial');
	    replace(this.el, this.anchor);
	    this.insert(this.params.name);
	  },
	
	  insert: function insert(id) {
	    var partial = resolveAsset(this.vm.$options, 'partials', id);
	    if (process.env.NODE_ENV !== 'production') {
	      assertAsset(partial, 'partial', id);
	    }
	    if (partial) {
	      this.factory = new FragmentFactory(this.vm, partial);
	      vIf.insert.call(this);
	    }
	  },
	
	  unbind: function unbind() {
	    if (this.frag) {
	      this.frag.destroy();
	    }
	  }
	};
	
	// This is the elementDirective that handles <content>
	// transclusions. It relies on the raw content of an
	// instance being stored as `$options._content` during
	// the transclude phase.
	
	// We are exporting two versions, one for named and one
	// for unnamed, because the unnamed slots must be compiled
	// AFTER all named slots have selected their content. So
	// we need to give them different priorities in the compilation
	// process. (See #1965)
	
	var slot = {
	
	  priority: SLOT,
	
	  bind: function bind() {
	    var host = this.vm;
	    var raw = host.$options._content;
	    if (!raw) {
	      this.fallback();
	      return;
	    }
	    var context = host._context;
	    var slotName = this.params && this.params.name;
	    if (!slotName) {
	      // Default slot
	      this.tryCompile(extractFragment(raw.childNodes, raw, true), context, host);
	    } else {
	      // Named slot
	      var selector = '[slot="' + slotName + '"]';
	      var nodes = raw.querySelectorAll(selector);
	      if (nodes.length) {
	        this.tryCompile(extractFragment(nodes, raw), context, host);
	      } else {
	        this.fallback();
	      }
	    }
	  },
	
	  tryCompile: function tryCompile(content, context, host) {
	    if (content.hasChildNodes()) {
	      this.compile(content, context, host);
	    } else {
	      this.fallback();
	    }
	  },
	
	  compile: function compile(content, context, host) {
	    if (content && context) {
	      var scope = host ? host._scope : this._scope;
	      this.unlink = context.$compile(content, host, scope, this._frag);
	    }
	    if (content) {
	      replace(this.el, content);
	    } else {
	      remove(this.el);
	    }
	  },
	
	  fallback: function fallback() {
	    this.compile(extractContent(this.el, true), this.vm);
	  },
	
	  unbind: function unbind() {
	    if (this.unlink) {
	      this.unlink();
	    }
	  }
	};
	
	var namedSlot = extend(extend({}, slot), {
	  priority: slot.priority + 1,
	  params: ['name']
	});
	
	/**
	 * Extract qualified content nodes from a node list.
	 *
	 * @param {NodeList} nodes
	 * @param {Element} parent
	 * @param {Boolean} main
	 * @return {DocumentFragment}
	 */
	
	function extractFragment(nodes, parent, main) {
	  var frag = document.createDocumentFragment();
	  for (var i = 0, l = nodes.length; i < l; i++) {
	    var node = nodes[i];
	    // if this is the main outlet, we want to skip all
	    // previously selected nodes;
	    // otherwise, we want to mark the node as selected.
	    // clone the node so the original raw content remains
	    // intact. this ensures proper re-compilation in cases
	    // where the outlet is inside a conditional block
	    if (main && !node.__v_selected) {
	      append(node);
	    } else if (!main && node.parentNode === parent) {
	      node.__v_selected = true;
	      append(node);
	    }
	  }
	  return frag;
	
	  function append(node) {
	    if (isTemplate(node) && !node.hasAttribute('v-if') && !node.hasAttribute('v-for')) {
	      node = parseTemplate(node);
	    }
	    node = cloneNode(node);
	    frag.appendChild(node);
	  }
	}
	
	var elementDirectives = {
	  slot: slot,
	  _namedSlot: namedSlot, // same as slot but with higher priority
	  partial: partial
	};
	
	Vue.version = '1.0.15';
	
	/**
	 * Vue and every constructor that extends Vue has an
	 * associated options object, which can be accessed during
	 * compilation steps as `this.constructor.options`.
	 *
	 * These can be seen as the default options of every
	 * Vue instance.
	 */
	
	Vue.options = {
	  directives: publicDirectives,
	  elementDirectives: elementDirectives,
	  filters: filters,
	  transitions: {},
	  components: {},
	  partials: {},
	  replace: true
	};
	
	// devtools global hook
	/* istanbul ignore if */
	if (process.env.NODE_ENV !== 'production' && inBrowser) {
	  if (window.__VUE_DEVTOOLS_GLOBAL_HOOK__) {
	    window.__VUE_DEVTOOLS_GLOBAL_HOOK__.emit('init', Vue);
	  } else if (/Chrome\/\d+/.test(navigator.userAgent)) {
	    console.log('Download the Vue Devtools for a better development experience:\n' + 'https://github.com/vuejs/vue-devtools');
	  }
	}
	
	module.exports = Vue;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ },
/* 3 */
/***/ function(module, exports) {

	// shim for using process in browser
	
	var process = module.exports = {};
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;
	
	function cleanUpNextTick() {
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}
	
	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = setTimeout(cleanUpNextTick);
	    draining = true;
	
	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    clearTimeout(timeout);
	}
	
	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        setTimeout(drainQueue, 0);
	    }
	};
	
	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};
	
	function noop() {}
	
	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;
	
	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};
	
	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';
	
	var babelHelpers = {};
	
	babelHelpers.classCallCheck = function (instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	};
	function Target(path, matcher, delegate) {
	  this.path = path;
	  this.matcher = matcher;
	  this.delegate = delegate;
	}
	
	Target.prototype = {
	  to: function to(target, callback) {
	    var delegate = this.delegate;
	
	    if (delegate && delegate.willAddRoute) {
	      target = delegate.willAddRoute(this.matcher.target, target);
	    }
	
	    this.matcher.add(this.path, target);
	
	    if (callback) {
	      if (callback.length === 0) {
	        throw new Error("You must have an argument in the function passed to `to`");
	      }
	      this.matcher.addChild(this.path, target, callback, this.delegate);
	    }
	    return this;
	  }
	};
	
	function Matcher(target) {
	  this.routes = {};
	  this.children = {};
	  this.target = target;
	}
	
	Matcher.prototype = {
	  add: function add(path, handler) {
	    this.routes[path] = handler;
	  },
	
	  addChild: function addChild(path, target, callback, delegate) {
	    var matcher = new Matcher(target);
	    this.children[path] = matcher;
	
	    var match = generateMatch(path, matcher, delegate);
	
	    if (delegate && delegate.contextEntered) {
	      delegate.contextEntered(target, match);
	    }
	
	    callback(match);
	  }
	};
	
	function generateMatch(startingPath, matcher, delegate) {
	  return function (path, nestedCallback) {
	    var fullPath = startingPath + path;
	
	    if (nestedCallback) {
	      nestedCallback(generateMatch(fullPath, matcher, delegate));
	    } else {
	      return new Target(startingPath + path, matcher, delegate);
	    }
	  };
	}
	
	function addRoute(routeArray, path, handler) {
	  var len = 0;
	  for (var i = 0, l = routeArray.length; i < l; i++) {
	    len += routeArray[i].path.length;
	  }
	
	  path = path.substr(len);
	  var route = { path: path, handler: handler };
	  routeArray.push(route);
	}
	
	function eachRoute(baseRoute, matcher, callback, binding) {
	  var routes = matcher.routes;
	
	  for (var path in routes) {
	    if (routes.hasOwnProperty(path)) {
	      var routeArray = baseRoute.slice();
	      addRoute(routeArray, path, routes[path]);
	
	      if (matcher.children[path]) {
	        eachRoute(routeArray, matcher.children[path], callback, binding);
	      } else {
	        callback.call(binding, routeArray);
	      }
	    }
	  }
	}
	
	function map (callback, addRouteCallback) {
	  var matcher = new Matcher();
	
	  callback(generateMatch("", matcher, this.delegate));
	
	  eachRoute([], matcher, function (route) {
	    if (addRouteCallback) {
	      addRouteCallback(this, route);
	    } else {
	      this.add(route);
	    }
	  }, this);
	}
	
	var specials = ['/', '.', '*', '+', '?', '|', '(', ')', '[', ']', '{', '}', '\\'];
	
	var escapeRegex = new RegExp('(\\' + specials.join('|\\') + ')', 'g');
	
	function isArray(test) {
	  return Object.prototype.toString.call(test) === "[object Array]";
	}
	
	// A Segment represents a segment in the original route description.
	// Each Segment type provides an `eachChar` and `regex` method.
	//
	// The `eachChar` method invokes the callback with one or more character
	// specifications. A character specification consumes one or more input
	// characters.
	//
	// The `regex` method returns a regex fragment for the segment. If the
	// segment is a dynamic of star segment, the regex fragment also includes
	// a capture.
	//
	// A character specification contains:
	//
	// * `validChars`: a String with a list of all valid characters, or
	// * `invalidChars`: a String with a list of all invalid characters
	// * `repeat`: true if the character specification can repeat
	
	function StaticSegment(string) {
	  this.string = string;
	}
	StaticSegment.prototype = {
	  eachChar: function eachChar(callback) {
	    var string = this.string,
	        ch;
	
	    for (var i = 0, l = string.length; i < l; i++) {
	      ch = string.charAt(i);
	      callback({ validChars: ch });
	    }
	  },
	
	  regex: function regex() {
	    return this.string.replace(escapeRegex, '\\$1');
	  },
	
	  generate: function generate() {
	    return this.string;
	  }
	};
	
	function DynamicSegment(name) {
	  this.name = name;
	}
	DynamicSegment.prototype = {
	  eachChar: function eachChar(callback) {
	    callback({ invalidChars: "/", repeat: true });
	  },
	
	  regex: function regex() {
	    return "([^/]+)";
	  },
	
	  generate: function generate(params) {
	    return params[this.name];
	  }
	};
	
	function StarSegment(name) {
	  this.name = name;
	}
	StarSegment.prototype = {
	  eachChar: function eachChar(callback) {
	    callback({ invalidChars: "", repeat: true });
	  },
	
	  regex: function regex() {
	    return "(.+)";
	  },
	
	  generate: function generate(params) {
	    return params[this.name];
	  }
	};
	
	function EpsilonSegment() {}
	EpsilonSegment.prototype = {
	  eachChar: function eachChar() {},
	  regex: function regex() {
	    return "";
	  },
	  generate: function generate() {
	    return "";
	  }
	};
	
	function parse(route, names, specificity) {
	  // normalize route as not starting with a "/". Recognition will
	  // also normalize.
	  if (route.charAt(0) === "/") {
	    route = route.substr(1);
	  }
	
	  var segments = route.split("/"),
	      results = [];
	
	  // A routes has specificity determined by the order that its different segments
	  // appear in. This system mirrors how the magnitude of numbers written as strings
	  // works.
	  // Consider a number written as: "abc". An example would be "200". Any other number written
	  // "xyz" will be smaller than "abc" so long as `a > z`. For instance, "199" is smaller
	  // then "200", even though "y" and "z" (which are both 9) are larger than "0" (the value
	  // of (`b` and `c`). This is because the leading symbol, "2", is larger than the other
	  // leading symbol, "1".
	  // The rule is that symbols to the left carry more weight than symbols to the right
	  // when a number is written out as a string. In the above strings, the leading digit
	  // represents how many 100's are in the number, and it carries more weight than the middle
	  // number which represents how many 10's are in the number.
	  // This system of number magnitude works well for route specificity, too. A route written as
	  // `a/b/c` will be more specific than `x/y/z` as long as `a` is more specific than
	  // `x`, irrespective of the other parts.
	  // Because of this similarity, we assign each type of segment a number value written as a
	  // string. We can find the specificity of compound routes by concatenating these strings
	  // together, from left to right. After we have looped through all of the segments,
	  // we convert the string to a number.
	  specificity.val = '';
	
	  for (var i = 0, l = segments.length; i < l; i++) {
	    var segment = segments[i],
	        match;
	
	    if (match = segment.match(/^:([^\/]+)$/)) {
	      results.push(new DynamicSegment(match[1]));
	      names.push(match[1]);
	      specificity.val += '3';
	    } else if (match = segment.match(/^\*([^\/]+)$/)) {
	      results.push(new StarSegment(match[1]));
	      specificity.val += '2';
	      names.push(match[1]);
	    } else if (segment === "") {
	      results.push(new EpsilonSegment());
	      specificity.val += '1';
	    } else {
	      results.push(new StaticSegment(segment));
	      specificity.val += '4';
	    }
	  }
	
	  specificity.val = +specificity.val;
	
	  return results;
	}
	
	// A State has a character specification and (`charSpec`) and a list of possible
	// subsequent states (`nextStates`).
	//
	// If a State is an accepting state, it will also have several additional
	// properties:
	//
	// * `regex`: A regular expression that is used to extract parameters from paths
	//   that reached this accepting state.
	// * `handlers`: Information on how to convert the list of captures into calls
	//   to registered handlers with the specified parameters
	// * `types`: How many static, dynamic or star segments in this route. Used to
	//   decide which route to use if multiple registered routes match a path.
	//
	// Currently, State is implemented naively by looping over `nextStates` and
	// comparing a character specification against a character. A more efficient
	// implementation would use a hash of keys pointing at one or more next states.
	
	function State(charSpec) {
	  this.charSpec = charSpec;
	  this.nextStates = [];
	}
	
	State.prototype = {
	  get: function get(charSpec) {
	    var nextStates = this.nextStates;
	
	    for (var i = 0, l = nextStates.length; i < l; i++) {
	      var child = nextStates[i];
	
	      var isEqual = child.charSpec.validChars === charSpec.validChars;
	      isEqual = isEqual && child.charSpec.invalidChars === charSpec.invalidChars;
	
	      if (isEqual) {
	        return child;
	      }
	    }
	  },
	
	  put: function put(charSpec) {
	    var state;
	
	    // If the character specification already exists in a child of the current
	    // state, just return that state.
	    if (state = this.get(charSpec)) {
	      return state;
	    }
	
	    // Make a new state for the character spec
	    state = new State(charSpec);
	
	    // Insert the new state as a child of the current state
	    this.nextStates.push(state);
	
	    // If this character specification repeats, insert the new state as a child
	    // of itself. Note that this will not trigger an infinite loop because each
	    // transition during recognition consumes a character.
	    if (charSpec.repeat) {
	      state.nextStates.push(state);
	    }
	
	    // Return the new state
	    return state;
	  },
	
	  // Find a list of child states matching the next character
	  match: function match(ch) {
	    // DEBUG "Processing `" + ch + "`:"
	    var nextStates = this.nextStates,
	        child,
	        charSpec,
	        chars;
	
	    // DEBUG "  " + debugState(this)
	    var returned = [];
	
	    for (var i = 0, l = nextStates.length; i < l; i++) {
	      child = nextStates[i];
	
	      charSpec = child.charSpec;
	
	      if (typeof (chars = charSpec.validChars) !== 'undefined') {
	        if (chars.indexOf(ch) !== -1) {
	          returned.push(child);
	        }
	      } else if (typeof (chars = charSpec.invalidChars) !== 'undefined') {
	        if (chars.indexOf(ch) === -1) {
	          returned.push(child);
	        }
	      }
	    }
	
	    return returned;
	  }
	
	  /** IF DEBUG
	  , debug: function() {
	    var charSpec = this.charSpec,
	        debug = "[",
	        chars = charSpec.validChars || charSpec.invalidChars;
	     if (charSpec.invalidChars) { debug += "^"; }
	    debug += chars;
	    debug += "]";
	     if (charSpec.repeat) { debug += "+"; }
	     return debug;
	  }
	  END IF **/
	};
	
	/** IF DEBUG
	function debug(log) {
	  console.log(log);
	}
	
	function debugState(state) {
	  return state.nextStates.map(function(n) {
	    if (n.nextStates.length === 0) { return "( " + n.debug() + " [accepting] )"; }
	    return "( " + n.debug() + " <then> " + n.nextStates.map(function(s) { return s.debug() }).join(" or ") + " )";
	  }).join(", ")
	}
	END IF **/
	
	// Sort the routes by specificity
	function sortSolutions(states) {
	  return states.sort(function (a, b) {
	    return b.specificity.val - a.specificity.val;
	  });
	}
	
	function recognizeChar(states, ch) {
	  var nextStates = [];
	
	  for (var i = 0, l = states.length; i < l; i++) {
	    var state = states[i];
	
	    nextStates = nextStates.concat(state.match(ch));
	  }
	
	  return nextStates;
	}
	
	var oCreate = Object.create || function (proto) {
	  function F() {}
	  F.prototype = proto;
	  return new F();
	};
	
	function RecognizeResults(queryParams) {
	  this.queryParams = queryParams || {};
	}
	RecognizeResults.prototype = oCreate({
	  splice: Array.prototype.splice,
	  slice: Array.prototype.slice,
	  push: Array.prototype.push,
	  length: 0,
	  queryParams: null
	});
	
	function findHandler(state, path, queryParams) {
	  var handlers = state.handlers,
	      regex = state.regex;
	  var captures = path.match(regex),
	      currentCapture = 1;
	  var result = new RecognizeResults(queryParams);
	
	  for (var i = 0, l = handlers.length; i < l; i++) {
	    var handler = handlers[i],
	        names = handler.names,
	        params = {};
	
	    for (var j = 0, m = names.length; j < m; j++) {
	      params[names[j]] = captures[currentCapture++];
	    }
	
	    result.push({ handler: handler.handler, params: params, isDynamic: !!names.length });
	  }
	
	  return result;
	}
	
	function addSegment(currentState, segment) {
	  segment.eachChar(function (ch) {
	    var state;
	
	    currentState = currentState.put(ch);
	  });
	
	  return currentState;
	}
	
	function decodeQueryParamPart(part) {
	  // http://www.w3.org/TR/html401/interact/forms.html#h-17.13.4.1
	  part = part.replace(/\+/gm, '%20');
	  return decodeURIComponent(part);
	}
	
	// The main interface
	
	var RouteRecognizer = function RouteRecognizer() {
	  this.rootState = new State();
	  this.names = {};
	};
	
	RouteRecognizer.prototype = {
	  add: function add(routes, options) {
	    var currentState = this.rootState,
	        regex = "^",
	        specificity = {},
	        handlers = [],
	        allSegments = [],
	        name;
	
	    var isEmpty = true;
	
	    for (var i = 0, l = routes.length; i < l; i++) {
	      var route = routes[i],
	          names = [];
	
	      var segments = parse(route.path, names, specificity);
	
	      allSegments = allSegments.concat(segments);
	
	      for (var j = 0, m = segments.length; j < m; j++) {
	        var segment = segments[j];
	
	        if (segment instanceof EpsilonSegment) {
	          continue;
	        }
	
	        isEmpty = false;
	
	        // Add a "/" for the new segment
	        currentState = currentState.put({ validChars: "/" });
	        regex += "/";
	
	        // Add a representation of the segment to the NFA and regex
	        currentState = addSegment(currentState, segment);
	        regex += segment.regex();
	      }
	
	      var handler = { handler: route.handler, names: names };
	      handlers.push(handler);
	    }
	
	    if (isEmpty) {
	      currentState = currentState.put({ validChars: "/" });
	      regex += "/";
	    }
	
	    currentState.handlers = handlers;
	    currentState.regex = new RegExp(regex + "$");
	    currentState.specificity = specificity;
	
	    if (name = options && options.as) {
	      this.names[name] = {
	        segments: allSegments,
	        handlers: handlers
	      };
	    }
	  },
	
	  handlersFor: function handlersFor(name) {
	    var route = this.names[name],
	        result = [];
	    if (!route) {
	      throw new Error("There is no route named " + name);
	    }
	
	    for (var i = 0, l = route.handlers.length; i < l; i++) {
	      result.push(route.handlers[i]);
	    }
	
	    return result;
	  },
	
	  hasRoute: function hasRoute(name) {
	    return !!this.names[name];
	  },
	
	  generate: function generate(name, params) {
	    var route = this.names[name],
	        output = "";
	    if (!route) {
	      throw new Error("There is no route named " + name);
	    }
	
	    var segments = route.segments;
	
	    for (var i = 0, l = segments.length; i < l; i++) {
	      var segment = segments[i];
	
	      if (segment instanceof EpsilonSegment) {
	        continue;
	      }
	
	      output += "/";
	      output += segment.generate(params);
	    }
	
	    if (output.charAt(0) !== '/') {
	      output = '/' + output;
	    }
	
	    if (params && params.queryParams) {
	      output += this.generateQueryString(params.queryParams);
	    }
	
	    return output;
	  },
	
	  generateQueryString: function generateQueryString(params) {
	    var pairs = [];
	    var keys = [];
	    for (var key in params) {
	      if (params.hasOwnProperty(key)) {
	        keys.push(key);
	      }
	    }
	    keys.sort();
	    for (var i = 0, len = keys.length; i < len; i++) {
	      key = keys[i];
	      var value = params[key];
	      if (value == null) {
	        continue;
	      }
	      var pair = encodeURIComponent(key);
	      if (isArray(value)) {
	        for (var j = 0, l = value.length; j < l; j++) {
	          var arrayPair = key + '[]' + '=' + encodeURIComponent(value[j]);
	          pairs.push(arrayPair);
	        }
	      } else {
	        pair += "=" + encodeURIComponent(value);
	        pairs.push(pair);
	      }
	    }
	
	    if (pairs.length === 0) {
	      return '';
	    }
	
	    return "?" + pairs.join("&");
	  },
	
	  parseQueryString: function parseQueryString(queryString) {
	    var pairs = queryString.split("&"),
	        queryParams = {};
	    for (var i = 0; i < pairs.length; i++) {
	      var pair = pairs[i].split('='),
	          key = decodeQueryParamPart(pair[0]),
	          keyLength = key.length,
	          isArray = false,
	          value;
	      if (pair.length === 1) {
	        value = 'true';
	      } else {
	        //Handle arrays
	        if (keyLength > 2 && key.slice(keyLength - 2) === '[]') {
	          isArray = true;
	          key = key.slice(0, keyLength - 2);
	          if (!queryParams[key]) {
	            queryParams[key] = [];
	          }
	        }
	        value = pair[1] ? decodeQueryParamPart(pair[1]) : '';
	      }
	      if (isArray) {
	        queryParams[key].push(value);
	      } else {
	        queryParams[key] = value;
	      }
	    }
	    return queryParams;
	  },
	
	  recognize: function recognize(path) {
	    var states = [this.rootState],
	        pathLen,
	        i,
	        l,
	        queryStart,
	        queryParams = {},
	        isSlashDropped = false;
	
	    queryStart = path.indexOf('?');
	    if (queryStart !== -1) {
	      var queryString = path.substr(queryStart + 1, path.length);
	      path = path.substr(0, queryStart);
	      queryParams = this.parseQueryString(queryString);
	    }
	
	    path = decodeURI(path);
	
	    // DEBUG GROUP path
	
	    if (path.charAt(0) !== "/") {
	      path = "/" + path;
	    }
	
	    pathLen = path.length;
	    if (pathLen > 1 && path.charAt(pathLen - 1) === "/") {
	      path = path.substr(0, pathLen - 1);
	      isSlashDropped = true;
	    }
	
	    for (i = 0, l = path.length; i < l; i++) {
	      states = recognizeChar(states, path.charAt(i));
	      if (!states.length) {
	        break;
	      }
	    }
	
	    // END DEBUG GROUP
	
	    var solutions = [];
	    for (i = 0, l = states.length; i < l; i++) {
	      if (states[i].handlers) {
	        solutions.push(states[i]);
	      }
	    }
	
	    states = sortSolutions(solutions);
	
	    var state = solutions[0];
	
	    if (state && state.handlers) {
	      // if a trailing slash was dropped and a star segment is the last segment
	      // specified, put the trailing slash back
	      if (isSlashDropped && state.regex.source.slice(-5) === "(.+)$") {
	        path = path + "/";
	      }
	      return findHandler(state, path, queryParams);
	    }
	  }
	};
	
	RouteRecognizer.prototype.map = map;
	
	RouteRecognizer.VERSION = '0.1.9';
	
	var genQuery = RouteRecognizer.prototype.generateQueryString;
	
	// export default for holding the Vue reference
	var exports$1 = {};
	/**
	 * Warn stuff.
	 *
	 * @param {String} msg
	 */
	
	function warn(msg) {
	  /* istanbul ignore next */
	  if (window.console) {
	    console.warn('[vue-router] ' + msg);
	    /* istanbul ignore if */
	    if (!exports$1.Vue || exports$1.Vue.config.debug) {
	      console.warn(new Error('warning stack trace:').stack);
	    }
	  }
	}
	
	/**
	 * Resolve a relative path.
	 *
	 * @param {String} base
	 * @param {String} relative
	 * @param {Boolean} append
	 * @return {String}
	 */
	
	function resolvePath(base, relative, append) {
	  var query = base.match(/(\?.*)$/);
	  if (query) {
	    query = query[1];
	    base = base.slice(0, -query.length);
	  }
	  // a query!
	  if (relative.charAt(0) === '?') {
	    return base + relative;
	  }
	  var stack = base.split('/');
	  // remove trailing segment if:
	  // - not appending
	  // - appending to trailing slash (last segment is empty)
	  if (!append || !stack[stack.length - 1]) {
	    stack.pop();
	  }
	  // resolve relative path
	  var segments = relative.replace(/^\//, '').split('/');
	  for (var i = 0; i < segments.length; i++) {
	    var segment = segments[i];
	    if (segment === '.') {
	      continue;
	    } else if (segment === '..') {
	      stack.pop();
	    } else {
	      stack.push(segment);
	    }
	  }
	  // ensure leading slash
	  if (stack[0] !== '') {
	    stack.unshift('');
	  }
	  return stack.join('/');
	}
	
	/**
	 * Forgiving check for a promise
	 *
	 * @param {Object} p
	 * @return {Boolean}
	 */
	
	function isPromise(p) {
	  return p && typeof p.then === 'function';
	}
	
	/**
	 * Retrive a route config field from a component instance
	 * OR a component contructor.
	 *
	 * @param {Function|Vue} component
	 * @param {String} name
	 * @return {*}
	 */
	
	function getRouteConfig(component, name) {
	  var options = component && (component.$options || component.options);
	  return options && options.route && options.route[name];
	}
	
	/**
	 * Resolve an async component factory. Have to do a dirty
	 * mock here because of Vue core's internal API depends on
	 * an ID check.
	 *
	 * @param {Object} handler
	 * @param {Function} cb
	 */
	
	var resolver = undefined;
	
	function resolveAsyncComponent(handler, cb) {
	  if (!resolver) {
	    resolver = {
	      resolve: exports$1.Vue.prototype._resolveComponent,
	      $options: {
	        components: {
	          _: handler.component
	        }
	      }
	    };
	  } else {
	    resolver.$options.components._ = handler.component;
	  }
	  resolver.resolve('_', function (Component) {
	    handler.component = Component;
	    cb(Component);
	  });
	}
	
	/**
	 * Map the dynamic segments in a path to params.
	 *
	 * @param {String} path
	 * @param {Object} params
	 * @param {Object} query
	 */
	
	function mapParams(path, params, query) {
	  if (params === undefined) params = {};
	
	  path = path.replace(/:([^\/]+)/g, function (_, key) {
	    var val = params[key];
	    if (!val) {
	      warn('param "' + key + '" not found when generating ' + 'path for "' + path + '" with params ' + JSON.stringify(params));
	    }
	    return val || '';
	  });
	  if (query) {
	    path += genQuery(query);
	  }
	  return path;
	}
	
	var hashRE = /#.*$/;
	
	var HTML5History = (function () {
	  function HTML5History(_ref) {
	    var root = _ref.root;
	    var onChange = _ref.onChange;
	    babelHelpers.classCallCheck(this, HTML5History);
	
	    if (root) {
	      // make sure there's the starting slash
	      if (root.charAt(0) !== '/') {
	        root = '/' + root;
	      }
	      // remove trailing slash
	      this.root = root.replace(/\/$/, '');
	      this.rootRE = new RegExp('^\\' + this.root);
	    } else {
	      this.root = null;
	    }
	    this.onChange = onChange;
	    // check base tag
	    var baseEl = document.querySelector('base');
	    this.base = baseEl && baseEl.getAttribute('href');
	  }
	
	  HTML5History.prototype.start = function start() {
	    var _this = this;
	
	    this.listener = function (e) {
	      var url = decodeURI(location.pathname + location.search);
	      if (_this.root) {
	        url = url.replace(_this.rootRE, '');
	      }
	      _this.onChange(url, e && e.state, location.hash);
	    };
	    window.addEventListener('popstate', this.listener);
	    this.listener();
	  };
	
	  HTML5History.prototype.stop = function stop() {
	    window.removeEventListener('popstate', this.listener);
	  };
	
	  HTML5History.prototype.go = function go(path, replace, append) {
	    var url = this.formatPath(path, append);
	    if (replace) {
	      history.replaceState({}, '', url);
	    } else {
	      // record scroll position by replacing current state
	      history.replaceState({
	        pos: {
	          x: window.pageXOffset,
	          y: window.pageYOffset
	        }
	      }, '');
	      // then push new state
	      history.pushState({}, '', url);
	    }
	    var hashMatch = path.match(hashRE);
	    var hash = hashMatch && hashMatch[0];
	    path = url
	    // strip hash so it doesn't mess up params
	    .replace(hashRE, '')
	    // remove root before matching
	    .replace(this.rootRE, '');
	    this.onChange(path, null, hash);
	  };
	
	  HTML5History.prototype.formatPath = function formatPath(path, append) {
	    return path.charAt(0) === '/'
	    // absolute path
	    ? this.root ? this.root + '/' + path.replace(/^\//, '') : path : resolvePath(this.base || location.pathname, path, append);
	  };
	
	  return HTML5History;
	})();
	
	var HashHistory = (function () {
	  function HashHistory(_ref) {
	    var hashbang = _ref.hashbang;
	    var onChange = _ref.onChange;
	    babelHelpers.classCallCheck(this, HashHistory);
	
	    this.hashbang = hashbang;
	    this.onChange = onChange;
	  }
	
	  HashHistory.prototype.start = function start() {
	    var self = this;
	    this.listener = function () {
	      var path = location.hash;
	      var raw = path.replace(/^#!?/, '');
	      // always
	      if (raw.charAt(0) !== '/') {
	        raw = '/' + raw;
	      }
	      var formattedPath = self.formatPath(raw);
	      if (formattedPath !== path) {
	        location.replace(formattedPath);
	        return;
	      }
	      // determine query
	      // note it's possible to have queries in both the actual URL
	      // and the hash fragment itself.
	      var query = location.search && path.indexOf('?') > -1 ? '&' + location.search.slice(1) : location.search;
	      self.onChange(decodeURI(path.replace(/^#!?/, '') + query));
	    };
	    window.addEventListener('hashchange', this.listener);
	    this.listener();
	  };
	
	  HashHistory.prototype.stop = function stop() {
	    window.removeEventListener('hashchange', this.listener);
	  };
	
	  HashHistory.prototype.go = function go(path, replace, append) {
	    path = this.formatPath(path, append);
	    if (replace) {
	      location.replace(path);
	    } else {
	      location.hash = path;
	    }
	  };
	
	  HashHistory.prototype.formatPath = function formatPath(path, append) {
	    var isAbsoloute = path.charAt(0) === '/';
	    var prefix = '#' + (this.hashbang ? '!' : '');
	    return isAbsoloute ? prefix + path : prefix + resolvePath(location.hash.replace(/^#!?/, ''), path, append);
	  };
	
	  return HashHistory;
	})();
	
	var AbstractHistory = (function () {
	  function AbstractHistory(_ref) {
	    var onChange = _ref.onChange;
	    babelHelpers.classCallCheck(this, AbstractHistory);
	
	    this.onChange = onChange;
	    this.currentPath = '/';
	  }
	
	  AbstractHistory.prototype.start = function start() {
	    this.onChange('/');
	  };
	
	  AbstractHistory.prototype.stop = function stop() {
	    // noop
	  };
	
	  AbstractHistory.prototype.go = function go(path, replace, append) {
	    path = this.currentPath = this.formatPath(path, append);
	    this.onChange(path);
	  };
	
	  AbstractHistory.prototype.formatPath = function formatPath(path, append) {
	    return path.charAt(0) === '/' ? path : resolvePath(this.currentPath, path, append);
	  };
	
	  return AbstractHistory;
	})();
	
	/**
	 * Determine the reusability of an existing router view.
	 *
	 * @param {Directive} view
	 * @param {Object} handler
	 * @param {Transition} transition
	 */
	
	function canReuse(view, handler, transition) {
	  var component = view.childVM;
	  if (!component || !handler) {
	    return false;
	  }
	  // important: check view.Component here because it may
	  // have been changed in activate hook
	  if (view.Component !== handler.component) {
	    return false;
	  }
	  var canReuseFn = getRouteConfig(component, 'canReuse');
	  return typeof canReuseFn === 'boolean' ? canReuseFn : canReuseFn ? canReuseFn.call(component, {
	    to: transition.to,
	    from: transition.from
	  }) : true; // defaults to true
	}
	
	/**
	 * Check if a component can deactivate.
	 *
	 * @param {Directive} view
	 * @param {Transition} transition
	 * @param {Function} next
	 */
	
	function canDeactivate(view, transition, next) {
	  var fromComponent = view.childVM;
	  var hook = getRouteConfig(fromComponent, 'canDeactivate');
	  if (!hook) {
	    next();
	  } else {
	    transition.callHook(hook, fromComponent, next, {
	      expectBoolean: true
	    });
	  }
	}
	
	/**
	 * Check if a component can activate.
	 *
	 * @param {Object} handler
	 * @param {Transition} transition
	 * @param {Function} next
	 */
	
	function canActivate(handler, transition, next) {
	  resolveAsyncComponent(handler, function (Component) {
	    // have to check due to async-ness
	    if (transition.aborted) {
	      return;
	    }
	    // determine if this component can be activated
	    var hook = getRouteConfig(Component, 'canActivate');
	    if (!hook) {
	      next();
	    } else {
	      transition.callHook(hook, null, next, {
	        expectBoolean: true
	      });
	    }
	  });
	}
	
	/**
	 * Call deactivate hooks for existing router-views.
	 *
	 * @param {Directive} view
	 * @param {Transition} transition
	 * @param {Function} next
	 */
	
	function deactivate(view, transition, next) {
	  var component = view.childVM;
	  var hook = getRouteConfig(component, 'deactivate');
	  if (!hook) {
	    next();
	  } else {
	    transition.callHooks(hook, component, next);
	  }
	}
	
	/**
	 * Activate / switch component for a router-view.
	 *
	 * @param {Directive} view
	 * @param {Transition} transition
	 * @param {Number} depth
	 * @param {Function} [cb]
	 */
	
	function activate(view, transition, depth, cb, reuse) {
	  var handler = transition.activateQueue[depth];
	  if (!handler) {
	    // fix 1.0.0-alpha.3 compat
	    if (view._bound) {
	      view.setComponent(null);
	    }
	    cb && cb();
	    return;
	  }
	
	  var Component = view.Component = handler.component;
	  var activateHook = getRouteConfig(Component, 'activate');
	  var dataHook = getRouteConfig(Component, 'data');
	  var waitForData = getRouteConfig(Component, 'waitForData');
	
	  view.depth = depth;
	  view.activated = false;
	
	  var component = undefined;
	  var loading = !!(dataHook && !waitForData);
	
	  // "reuse" is a flag passed down when the parent view is
	  // either reused via keep-alive or as a child of a kept-alive view.
	  // of course we can only reuse if the current kept-alive instance
	  // is of the correct type.
	  reuse = reuse && view.childVM && view.childVM.constructor === Component;
	
	  if (reuse) {
	    // just reuse
	    component = view.childVM;
	    component.$loadingRouteData = loading;
	  } else {
	    // unbuild current component. this step also destroys
	    // and removes all nested child views.
	    view.unbuild(true);
	    // handle keep-alive.
	    // if the view has keep-alive, the child vm is not actually
	    // destroyed - its nested views will still be in router's
	    // view list. We need to removed these child views and
	    // cache them on the child vm.
	    if (view.keepAlive) {
	      var views = transition.router._views;
	      var i = views.indexOf(view);
	      if (i > 0) {
	        transition.router._views = views.slice(i);
	        if (view.childVM) {
	          view.childVM._routerViews = views.slice(0, i);
	        }
	      }
	    }
	
	    // build the new component. this will also create the
	    // direct child view of the current one. it will register
	    // itself as view.childView.
	    component = view.build({
	      _meta: {
	        $loadingRouteData: loading
	      }
	    });
	    // handle keep-alive.
	    // when a kept-alive child vm is restored, we need to
	    // add its cached child views into the router's view list,
	    // and also properly update current view's child view.
	    if (view.keepAlive) {
	      component.$loadingRouteData = loading;
	      var cachedViews = component._routerViews;
	      if (cachedViews) {
	        transition.router._views = cachedViews.concat(transition.router._views);
	        view.childView = cachedViews[cachedViews.length - 1];
	        component._routerViews = null;
	      }
	    }
	  }
	
	  // cleanup the component in case the transition is aborted
	  // before the component is ever inserted.
	  var cleanup = function cleanup() {
	    component.$destroy();
	  };
	
	  // actually insert the component and trigger transition
	  var insert = function insert() {
	    if (reuse) {
	      cb && cb();
	      return;
	    }
	    var router = transition.router;
	    if (router._rendered || router._transitionOnLoad) {
	      view.transition(component);
	    } else {
	      // no transition on first render, manual transition
	      /* istanbul ignore if */
	      if (view.setCurrent) {
	        // 0.12 compat
	        view.setCurrent(component);
	      } else {
	        // 1.0
	        view.childVM = component;
	      }
	      component.$before(view.anchor, null, false);
	    }
	    cb && cb();
	  };
	
	  // called after activation hook is resolved
	  var afterActivate = function afterActivate() {
	    view.activated = true;
	    // activate the child view
	    if (view.childView) {
	      activate(view.childView, transition, depth + 1, null, reuse || view.keepAlive);
	    }
	    if (dataHook && waitForData) {
	      // wait until data loaded to insert
	      loadData(component, transition, dataHook, insert, cleanup);
	    } else {
	      // load data and insert at the same time
	      if (dataHook) {
	        loadData(component, transition, dataHook);
	      }
	      insert();
	    }
	  };
	
	  if (activateHook) {
	    transition.callHooks(activateHook, component, afterActivate, {
	      cleanup: cleanup
	    });
	  } else {
	    afterActivate();
	  }
	}
	
	/**
	 * Reuse a view, just reload data if necessary.
	 *
	 * @param {Directive} view
	 * @param {Transition} transition
	 */
	
	function reuse(view, transition) {
	  var component = view.childVM;
	  var dataHook = getRouteConfig(component, 'data');
	  if (dataHook) {
	    loadData(component, transition, dataHook);
	  }
	}
	
	/**
	 * Asynchronously load and apply data to component.
	 *
	 * @param {Vue} component
	 * @param {Transition} transition
	 * @param {Function} hook
	 * @param {Function} cb
	 * @param {Function} cleanup
	 */
	
	function loadData(component, transition, hook, cb, cleanup) {
	  component.$loadingRouteData = true;
	  transition.callHooks(hook, component, function (data, onError) {
	    // merge data from multiple data hooks
	    if (Array.isArray(data) && data._needMerge) {
	      data = data.reduce(function (res, obj) {
	        if (isPlainObject(obj)) {
	          Object.keys(obj).forEach(function (key) {
	            res[key] = obj[key];
	          });
	        }
	        return res;
	      }, Object.create(null));
	    }
	    // handle promise sugar syntax
	    var promises = [];
	    if (isPlainObject(data)) {
	      Object.keys(data).forEach(function (key) {
	        var val = data[key];
	        if (isPromise(val)) {
	          promises.push(val.then(function (resolvedVal) {
	            component.$set(key, resolvedVal);
	          }));
	        } else {
	          component.$set(key, val);
	        }
	      });
	    }
	    if (!promises.length) {
	      component.$loadingRouteData = false;
	      cb && cb();
	    } else {
	      promises[0].constructor.all(promises).then(function (_) {
	        component.$loadingRouteData = false;
	        cb && cb();
	      }, onError);
	    }
	  }, {
	    cleanup: cleanup,
	    expectData: true
	  });
	}
	
	function isPlainObject(obj) {
	  return Object.prototype.toString.call(obj) === '[object Object]';
	}
	
	/**
	 * A RouteTransition object manages the pipeline of a
	 * router-view switching process. This is also the object
	 * passed into user route hooks.
	 *
	 * @param {Router} router
	 * @param {Route} to
	 * @param {Route} from
	 */
	
	var RouteTransition = (function () {
	  function RouteTransition(router, to, from) {
	    babelHelpers.classCallCheck(this, RouteTransition);
	
	    this.router = router;
	    this.to = to;
	    this.from = from;
	    this.next = null;
	    this.aborted = false;
	    this.done = false;
	
	    // start by determine the queues
	
	    // the deactivate queue is an array of router-view
	    // directive instances that need to be deactivated,
	    // deepest first.
	    this.deactivateQueue = router._views;
	
	    // check the default handler of the deepest match
	    var matched = to.matched ? Array.prototype.slice.call(to.matched) : [];
	
	    // the activate queue is an array of route handlers
	    // that need to be activated
	    this.activateQueue = matched.map(function (match) {
	      return match.handler;
	    });
	  }
	
	  /**
	   * Abort current transition and return to previous location.
	   */
	
	  RouteTransition.prototype.abort = function abort() {
	    if (!this.aborted) {
	      this.aborted = true;
	      // if the root path throws an error during validation
	      // on initial load, it gets caught in an infinite loop.
	      var abortingOnLoad = !this.from.path && this.to.path === '/';
	      if (!abortingOnLoad) {
	        this.router.replace(this.from.path || '/');
	      }
	    }
	  };
	
	  /**
	   * Abort current transition and redirect to a new location.
	   *
	   * @param {String} path
	   */
	
	  RouteTransition.prototype.redirect = function redirect(path) {
	    if (!this.aborted) {
	      this.aborted = true;
	      if (typeof path === 'string') {
	        path = mapParams(path, this.to.params, this.to.query);
	      } else {
	        path.params = path.params || this.to.params;
	        path.query = path.query || this.to.query;
	      }
	      this.router.replace(path);
	    }
	  };
	
	  /**
	   * A router view transition's pipeline can be described as
	   * follows, assuming we are transitioning from an existing
	   * <router-view> chain [Component A, Component B] to a new
	   * chain [Component A, Component C]:
	   *
	   *  A    A
	   *  | => |
	   *  B    C
	   *
	   * 1. Reusablity phase:
	   *   -> canReuse(A, A)
	   *   -> canReuse(B, C)
	   *   -> determine new queues:
	   *      - deactivation: [B]
	   *      - activation: [C]
	   *
	   * 2. Validation phase:
	   *   -> canDeactivate(B)
	   *   -> canActivate(C)
	   *
	   * 3. Activation phase:
	   *   -> deactivate(B)
	   *   -> activate(C)
	   *
	   * Each of these steps can be asynchronous, and any
	   * step can potentially abort the transition.
	   *
	   * @param {Function} cb
	   */
	
	  RouteTransition.prototype.start = function start(cb) {
	    var transition = this;
	    var daq = this.deactivateQueue;
	    var aq = this.activateQueue;
	    var rdaq = daq.slice().reverse();
	    var reuseQueue = undefined;
	
	    // 1. Reusability phase
	    var i = undefined;
	    for (i = 0; i < rdaq.length; i++) {
	      if (!canReuse(rdaq[i], aq[i], transition)) {
	        break;
	      }
	    }
	    if (i > 0) {
	      reuseQueue = rdaq.slice(0, i);
	      daq = rdaq.slice(i).reverse();
	      aq = aq.slice(i);
	    }
	
	    // 2. Validation phase
	    transition.runQueue(daq, canDeactivate, function () {
	      transition.runQueue(aq, canActivate, function () {
	        transition.runQueue(daq, deactivate, function () {
	          // 3. Activation phase
	
	          // Update router current route
	          transition.router._onTransitionValidated(transition);
	
	          // trigger reuse for all reused views
	          reuseQueue && reuseQueue.forEach(function (view) {
	            reuse(view, transition);
	          });
	
	          // the root of the chain that needs to be replaced
	          // is the top-most non-reusable view.
	          if (daq.length) {
	            var view = daq[daq.length - 1];
	            var depth = reuseQueue ? reuseQueue.length : 0;
	            activate(view, transition, depth, cb);
	          } else {
	            cb();
	          }
	        });
	      });
	    });
	  };
	
	  /**
	   * Asynchronously and sequentially apply a function to a
	   * queue.
	   *
	   * @param {Array} queue
	   * @param {Function} fn
	   * @param {Function} cb
	   */
	
	  RouteTransition.prototype.runQueue = function runQueue(queue, fn, cb) {
	    var transition = this;
	    step(0);
	    function step(index) {
	      if (index >= queue.length) {
	        cb();
	      } else {
	        fn(queue[index], transition, function () {
	          step(index + 1);
	        });
	      }
	    }
	  };
	
	  /**
	   * Call a user provided route transition hook and handle
	   * the response (e.g. if the user returns a promise).
	   *
	   * If the user neither expects an argument nor returns a
	   * promise, the hook is assumed to be synchronous.
	   *
	   * @param {Function} hook
	   * @param {*} [context]
	   * @param {Function} [cb]
	   * @param {Object} [options]
	   *                 - {Boolean} expectBoolean
	   *                 - {Boolean} expectData
	   *                 - {Function} cleanup
	   */
	
	  RouteTransition.prototype.callHook = function callHook(hook, context, cb) {
	    var _ref = arguments.length <= 3 || arguments[3] === undefined ? {} : arguments[3];
	
	    var _ref$expectBoolean = _ref.expectBoolean;
	    var expectBoolean = _ref$expectBoolean === undefined ? false : _ref$expectBoolean;
	    var _ref$expectData = _ref.expectData;
	    var expectData = _ref$expectData === undefined ? false : _ref$expectData;
	    var cleanup = _ref.cleanup;
	
	    var transition = this;
	    var nextCalled = false;
	
	    // abort the transition
	    var abort = function abort() {
	      cleanup && cleanup();
	      transition.abort();
	    };
	
	    // handle errors
	    var onError = function onError(err) {
	      // cleanup indicates an after-activation hook,
	      // so instead of aborting we just let the transition
	      // finish.
	      cleanup ? next() : abort();
	      if (err && !transition.router._suppress) {
	        warn('Uncaught error during transition: ');
	        throw err instanceof Error ? err : new Error(err);
	      }
	    };
	
	    // advance the transition to the next step
	    var next = function next(data) {
	      if (nextCalled) {
	        warn('transition.next() should be called only once.');
	        return;
	      }
	      nextCalled = true;
	      if (transition.aborted) {
	        cleanup && cleanup();
	        return;
	      }
	      cb && cb(data, onError);
	    };
	
	    // expose a clone of the transition object, so that each
	    // hook gets a clean copy and prevent the user from
	    // messing with the internals.
	    var exposed = {
	      to: transition.to,
	      from: transition.from,
	      abort: abort,
	      next: next,
	      redirect: function redirect() {
	        transition.redirect.apply(transition, arguments);
	      }
	    };
	
	    // actually call the hook
	    var res = undefined;
	    try {
	      res = hook.call(context, exposed);
	    } catch (err) {
	      return onError(err);
	    }
	
	    // handle boolean/promise return values
	    var resIsPromise = isPromise(res);
	    if (expectBoolean) {
	      if (typeof res === 'boolean') {
	        res ? next() : abort();
	      } else if (resIsPromise) {
	        res.then(function (ok) {
	          ok ? next() : abort();
	        }, onError);
	      } else if (!hook.length) {
	        next(res);
	      }
	    } else if (resIsPromise) {
	      res.then(next, onError);
	    } else if (expectData && isPlainOjbect(res) || !hook.length) {
	      next(res);
	    }
	  };
	
	  /**
	   * Call a single hook or an array of async hooks in series.
	   *
	   * @param {Array} hooks
	   * @param {*} context
	   * @param {Function} cb
	   * @param {Object} [options]
	   */
	
	  RouteTransition.prototype.callHooks = function callHooks(hooks, context, cb, options) {
	    var _this = this;
	
	    if (Array.isArray(hooks)) {
	      (function () {
	        var res = [];
	        res._needMerge = true;
	        var onError = undefined;
	        _this.runQueue(hooks, function (hook, _, next) {
	          if (!_this.aborted) {
	            _this.callHook(hook, context, function (r, onError) {
	              if (r) res.push(r);
	              onError = onError;
	              next();
	            }, options);
	          }
	        }, function () {
	          cb(res, onError);
	        });
	      })();
	    } else {
	      this.callHook(hooks, context, cb, options);
	    }
	  };
	
	  return RouteTransition;
	})();
	
	function isPlainOjbect(val) {
	  return Object.prototype.toString.call(val) === '[object Object]';
	}
	
	var internalKeysRE = /^(component|subRoutes)$/;
	
	/**
	 * Route Context Object
	 *
	 * @param {String} path
	 * @param {Router} router
	 */
	
	var Route = function Route(path, router) {
	  var _this = this;
	
	  babelHelpers.classCallCheck(this, Route);
	
	  var matched = router._recognizer.recognize(path);
	  if (matched) {
	    // copy all custom fields from route configs
	    [].forEach.call(matched, function (match) {
	      for (var key in match.handler) {
	        if (!internalKeysRE.test(key)) {
	          _this[key] = match.handler[key];
	        }
	      }
	    });
	    // set query and params
	    this.query = matched.queryParams;
	    this.params = [].reduce.call(matched, function (prev, cur) {
	      if (cur.params) {
	        for (var key in cur.params) {
	          prev[key] = cur.params[key];
	        }
	      }
	      return prev;
	    }, {});
	  }
	  // expose path and router
	  this.path = path;
	  this.router = router;
	  // for internal use
	  this.matched = matched || router._notFoundHandler;
	  // Important: freeze self to prevent observation
	  Object.freeze(this);
	};
	
	function applyOverride (Vue) {
	
	  var _ = Vue.util;
	
	  // override Vue's init and destroy process to keep track of router instances
	  var init = Vue.prototype._init;
	  Vue.prototype._init = function (options) {
	    var root = options._parent || options.parent || this;
	    var route = root.$route;
	    if (route) {
	      route.router._children.push(this);
	      if (!this.$route) {
	        /* istanbul ignore if */
	        if (this._defineMeta) {
	          // 0.12
	          this._defineMeta('$route', route);
	        } else {
	          // 1.0
	          _.defineReactive(this, '$route', route);
	        }
	      }
	    }
	    init.call(this, options);
	  };
	
	  var destroy = Vue.prototype._destroy;
	  Vue.prototype._destroy = function () {
	    if (!this._isBeingDestroyed) {
	      var route = this.$root.$route;
	      if (route) {
	        route.router._children.$remove(this);
	      }
	      destroy.apply(this, arguments);
	    }
	  };
	
	  // 1.0 only: enable route mixins
	  var strats = Vue.config.optionMergeStrategies;
	  var hooksToMergeRE = /^(data|activate|deactivate)$/;
	
	  if (strats) {
	    strats.route = function (parentVal, childVal) {
	      if (!childVal) return parentVal;
	      if (!parentVal) return childVal;
	      var ret = {};
	      _.extend(ret, parentVal);
	      for (var key in childVal) {
	        var a = ret[key];
	        var b = childVal[key];
	        // for data, activate and deactivate, we need to merge them into
	        // arrays similar to lifecycle hooks.
	        if (a && hooksToMergeRE.test(key)) {
	          ret[key] = (_.isArray(a) ? a : [a]).concat(b);
	        } else {
	          ret[key] = b;
	        }
	      }
	      return ret;
	    };
	  }
	}
	
	function View (Vue) {
	
	  var _ = Vue.util;
	  var componentDef =
	  // 0.12
	  Vue.directive('_component') ||
	  // 1.0
	  Vue.internalDirectives.component;
	  // <router-view> extends the internal component directive
	  var viewDef = _.extend({}, componentDef);
	
	  // with some overrides
	  _.extend(viewDef, {
	
	    _isRouterView: true,
	
	    bind: function bind() {
	      var route = this.vm.$route;
	      /* istanbul ignore if */
	      if (!route) {
	        warn('<router-view> can only be used inside a ' + 'router-enabled app.');
	        return;
	      }
	      // force dynamic directive so v-component doesn't
	      // attempt to build right now
	      this._isDynamicLiteral = true;
	      // finally, init by delegating to v-component
	      componentDef.bind.call(this);
	
	      // all we need to do here is registering this view
	      // in the router. actual component switching will be
	      // managed by the pipeline.
	      var router = this.router = route.router;
	      router._views.unshift(this);
	
	      // note the views are in reverse order.
	      var parentView = router._views[1];
	      if (parentView) {
	        // register self as a child of the parent view,
	        // instead of activating now. This is so that the
	        // child's activate hook is called after the
	        // parent's has resolved.
	        parentView.childView = this;
	      }
	
	      // handle late-rendered view
	      // two possibilities:
	      // 1. root view rendered after transition has been
	      //    validated;
	      // 2. child view rendered after parent view has been
	      //    activated.
	      var transition = route.router._currentTransition;
	      if (!parentView && transition.done || parentView && parentView.activated) {
	        var depth = parentView ? parentView.depth + 1 : 0;
	        activate(this, transition, depth);
	      }
	    },
	
	    unbind: function unbind() {
	      this.router._views.$remove(this);
	      componentDef.unbind.call(this);
	    }
	  });
	
	  Vue.elementDirective('router-view', viewDef);
	}
	
	var trailingSlashRE = /\/$/;
	var regexEscapeRE = /[-.*+?^${}()|[\]\/\\]/g;
	var queryStringRE = /\?.*$/;
	
	// install v-link, which provides navigation support for
	// HTML5 history mode
	function Link (Vue) {
	
	  var _ = Vue.util;
	
	  Vue.directive('link', {
	
	    bind: function bind() {
	      var _this = this;
	
	      var vm = this.vm;
	      /* istanbul ignore if */
	      if (!vm.$route) {
	        warn('v-link can only be used inside a ' + 'router-enabled app.');
	        return;
	      }
	      // no need to handle click if link expects to be opened
	      // in a new window/tab.
	      /* istanbul ignore if */
	      if (this.el.tagName === 'A' && this.el.getAttribute('target') === '_blank') {
	        return;
	      }
	      // handle click
	      var router = vm.$route.router;
	      this.handler = function (e) {
	        // don't redirect with control keys
	        if (e.metaKey || e.ctrlKey || e.shiftKey) return;
	        // don't redirect when preventDefault called
	        if (e.defaultPrevented) return;
	        // don't redirect on right click
	        if (e.button !== 0) return;
	
	        var target = _this.target;
	        var go = function go(target) {
	          e.preventDefault();
	          if (target != null) {
	            router.go(target);
	          }
	        };
	
	        if (_this.el.tagName === 'A' || e.target === _this.el) {
	          // v-link on <a v-link="'path'">
	          go(target);
	        } else {
	          // v-link delegate on <div v-link>
	          var el = e.target;
	          while (el && el.tagName !== 'A' && el !== _this.el) {
	            el = el.parentNode;
	          }
	          if (!el) return;
	          if (el.tagName !== 'A' || !el.href) {
	            // allow not anchor
	            go(target);
	          } else if (sameOrigin(el)) {
	            go({
	              path: el.pathname,
	              replace: target && target.replace,
	              append: target && target.append
	            });
	          }
	        }
	      };
	      this.el.addEventListener('click', this.handler);
	      // manage active link class
	      this.unwatch = vm.$watch('$route.path', _.bind(this.updateClasses, this));
	    },
	
	    update: function update(path) {
	      var router = this.vm.$route.router;
	      var append = undefined;
	      this.target = path;
	      if (_.isObject(path)) {
	        append = path.append;
	        this.exact = path.exact;
	        this.prevActiveClass = this.activeClass;
	        this.activeClass = path.activeClass;
	      }
	      path = this.path = router._stringifyPath(path);
	      this.activeRE = path && !this.exact ? new RegExp('^' + path.replace(/\/$/, '').replace(regexEscapeRE, '\\$&') + '(\\/|$)') : null;
	      this.updateClasses(this.vm.$route.path);
	      var isAbsolute = path.charAt(0) === '/';
	      // do not format non-hash relative paths
	      var href = path && (router.mode === 'hash' || isAbsolute) ? router.history.formatPath(path, append) : path;
	      if (this.el.tagName === 'A') {
	        if (href) {
	          this.el.href = href;
	        } else {
	          this.el.removeAttribute('href');
	        }
	      }
	    },
	
	    updateClasses: function updateClasses(path) {
	      var el = this.el;
	      var router = this.vm.$route.router;
	      var activeClass = this.activeClass || router._linkActiveClass;
	      // clear old class
	      if (this.prevActiveClass !== activeClass) {
	        _.removeClass(el, this.prevActiveClass);
	      }
	      // remove query string before matching
	      var dest = this.path.replace(queryStringRE, '');
	      path = path.replace(queryStringRE, '');
	      // add new class
	      if (this.exact) {
	        if (dest === path ||
	        // also allow additional trailing slash
	        dest.charAt(dest.length - 1) !== '/' && dest === path.replace(trailingSlashRE, '')) {
	          _.addClass(el, activeClass);
	        } else {
	          _.removeClass(el, activeClass);
	        }
	      } else {
	        if (this.activeRE && this.activeRE.test(path)) {
	          _.addClass(el, activeClass);
	        } else {
	          _.removeClass(el, activeClass);
	        }
	      }
	    },
	
	    unbind: function unbind() {
	      this.el.removeEventListener('click', this.handler);
	      this.unwatch && this.unwatch();
	    }
	  });
	
	  function sameOrigin(link) {
	    return link.protocol === location.protocol && link.hostname === location.hostname && link.port === location.port;
	  }
	}
	
	var historyBackends = {
	  abstract: AbstractHistory,
	  hash: HashHistory,
	  html5: HTML5History
	};
	
	// late bind during install
	var Vue = undefined;
	
	/**
	 * Router constructor
	 *
	 * @param {Object} [options]
	 */
	
	var Router = (function () {
	  function Router() {
	    var _ref = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	
	    var _ref$hashbang = _ref.hashbang;
	    var hashbang = _ref$hashbang === undefined ? true : _ref$hashbang;
	    var _ref$abstract = _ref.abstract;
	    var abstract = _ref$abstract === undefined ? false : _ref$abstract;
	    var _ref$history = _ref.history;
	    var history = _ref$history === undefined ? false : _ref$history;
	    var _ref$saveScrollPosition = _ref.saveScrollPosition;
	    var saveScrollPosition = _ref$saveScrollPosition === undefined ? false : _ref$saveScrollPosition;
	    var _ref$transitionOnLoad = _ref.transitionOnLoad;
	    var transitionOnLoad = _ref$transitionOnLoad === undefined ? false : _ref$transitionOnLoad;
	    var _ref$suppressTransitionError = _ref.suppressTransitionError;
	    var suppressTransitionError = _ref$suppressTransitionError === undefined ? false : _ref$suppressTransitionError;
	    var _ref$root = _ref.root;
	    var root = _ref$root === undefined ? null : _ref$root;
	    var _ref$linkActiveClass = _ref.linkActiveClass;
	    var linkActiveClass = _ref$linkActiveClass === undefined ? 'v-link-active' : _ref$linkActiveClass;
	    babelHelpers.classCallCheck(this, Router);
	
	    /* istanbul ignore if */
	    if (!Router.installed) {
	      throw new Error('Please install the Router with Vue.use() before ' + 'creating an instance.');
	    }
	
	    // Vue instances
	    this.app = null;
	    this._views = [];
	    this._children = [];
	
	    // route recognizer
	    this._recognizer = new RouteRecognizer();
	    this._guardRecognizer = new RouteRecognizer();
	
	    // state
	    this._started = false;
	    this._startCb = null;
	    this._currentRoute = {};
	    this._currentTransition = null;
	    this._previousTransition = null;
	    this._notFoundHandler = null;
	    this._notFoundRedirect = null;
	    this._beforeEachHooks = [];
	    this._afterEachHooks = [];
	
	    // feature detection
	    this._hasPushState = typeof window !== 'undefined' && window.history && window.history.pushState;
	
	    // trigger transition on initial render?
	    this._rendered = false;
	    this._transitionOnLoad = transitionOnLoad;
	
	    // history mode
	    this._abstract = abstract;
	    this._hashbang = hashbang;
	    this._history = this._hasPushState && history;
	
	    // other options
	    this._saveScrollPosition = saveScrollPosition;
	    this._linkActiveClass = linkActiveClass;
	    this._suppress = suppressTransitionError;
	
	    // create history object
	    var inBrowser = Vue.util.inBrowser;
	    this.mode = !inBrowser || this._abstract ? 'abstract' : this._history ? 'html5' : 'hash';
	
	    var History = historyBackends[this.mode];
	    var self = this;
	    this.history = new History({
	      root: root,
	      hashbang: this._hashbang,
	      onChange: function onChange(path, state, anchor) {
	        self._match(path, state, anchor);
	      }
	    });
	  }
	
	  /**
	   * Allow directly passing components to a route
	   * definition.
	   *
	   * @param {String} path
	   * @param {Object} handler
	   */
	
	  // API ===================================================
	
	  /**
	  * Register a map of top-level paths.
	  *
	  * @param {Object} map
	  */
	
	  Router.prototype.map = function map(_map) {
	    for (var route in _map) {
	      this.on(route, _map[route]);
	    }
	  };
	
	  /**
	   * Register a single root-level path
	   *
	   * @param {String} rootPath
	   * @param {Object} handler
	   *                 - {String} component
	   *                 - {Object} [subRoutes]
	   *                 - {Boolean} [forceRefresh]
	   *                 - {Function} [before]
	   *                 - {Function} [after]
	   */
	
	  Router.prototype.on = function on(rootPath, handler) {
	    if (rootPath === '*') {
	      this._notFound(handler);
	    } else {
	      this._addRoute(rootPath, handler, []);
	    }
	  };
	
	  /**
	   * Set redirects.
	   *
	   * @param {Object} map
	   */
	
	  Router.prototype.redirect = function redirect(map) {
	    for (var path in map) {
	      this._addRedirect(path, map[path]);
	    }
	  };
	
	  /**
	   * Set aliases.
	   *
	   * @param {Object} map
	   */
	
	  Router.prototype.alias = function alias(map) {
	    for (var path in map) {
	      this._addAlias(path, map[path]);
	    }
	  };
	
	  /**
	   * Set global before hook.
	   *
	   * @param {Function} fn
	   */
	
	  Router.prototype.beforeEach = function beforeEach(fn) {
	    this._beforeEachHooks.push(fn);
	  };
	
	  /**
	   * Set global after hook.
	   *
	   * @param {Function} fn
	   */
	
	  Router.prototype.afterEach = function afterEach(fn) {
	    this._afterEachHooks.push(fn);
	  };
	
	  /**
	   * Navigate to a given path.
	   * The path can be an object describing a named path in
	   * the format of { name: '...', params: {}, query: {}}
	   * The path is assumed to be already decoded, and will
	   * be resolved against root (if provided)
	   *
	   * @param {String|Object} path
	   * @param {Boolean} [replace]
	   */
	
	  Router.prototype.go = function go(path) {
	    var replace = false;
	    var append = false;
	    if (Vue.util.isObject(path)) {
	      replace = path.replace;
	      append = path.append;
	    }
	    path = this._stringifyPath(path);
	    if (path) {
	      this.history.go(path, replace, append);
	    }
	  };
	
	  /**
	   * Short hand for replacing current path
	   *
	   * @param {String} path
	   */
	
	  Router.prototype.replace = function replace(path) {
	    if (typeof path === 'string') {
	      path = { path: path };
	    }
	    path.replace = true;
	    this.go(path);
	  };
	
	  /**
	   * Start the router.
	   *
	   * @param {VueConstructor} App
	   * @param {String|Element} container
	   * @param {Function} [cb]
	   */
	
	  Router.prototype.start = function start(App, container, cb) {
	    /* istanbul ignore if */
	    if (this._started) {
	      warn('already started.');
	      return;
	    }
	    this._started = true;
	    this._startCb = cb;
	    if (!this.app) {
	      /* istanbul ignore if */
	      if (!App || !container) {
	        throw new Error('Must start vue-router with a component and a ' + 'root container.');
	      }
	      this._appContainer = container;
	      var Ctor = this._appConstructor = typeof App === 'function' ? App : Vue.extend(App);
	      // give it a name for better debugging
	      Ctor.options.name = Ctor.options.name || 'RouterApp';
	    }
	    this.history.start();
	  };
	
	  /**
	   * Stop listening to route changes.
	   */
	
	  Router.prototype.stop = function stop() {
	    this.history.stop();
	    this._started = false;
	  };
	
	  // Internal methods ======================================
	
	  /**
	  * Add a route containing a list of segments to the internal
	  * route recognizer. Will be called recursively to add all
	  * possible sub-routes.
	  *
	  * @param {String} path
	  * @param {Object} handler
	  * @param {Array} segments
	  */
	
	  Router.prototype._addRoute = function _addRoute(path, handler, segments) {
	    guardComponent(path, handler);
	    handler.path = path;
	    handler.fullPath = (segments.reduce(function (path, segment) {
	      return path + segment.path;
	    }, '') + path).replace('//', '/');
	    segments.push({
	      path: path,
	      handler: handler
	    });
	    this._recognizer.add(segments, {
	      as: handler.name
	    });
	    // add sub routes
	    if (handler.subRoutes) {
	      for (var subPath in handler.subRoutes) {
	        // recursively walk all sub routes
	        this._addRoute(subPath, handler.subRoutes[subPath],
	        // pass a copy in recursion to avoid mutating
	        // across branches
	        segments.slice());
	      }
	    }
	  };
	
	  /**
	   * Set the notFound route handler.
	   *
	   * @param {Object} handler
	   */
	
	  Router.prototype._notFound = function _notFound(handler) {
	    guardComponent('*', handler);
	    this._notFoundHandler = [{ handler: handler }];
	  };
	
	  /**
	   * Add a redirect record.
	   *
	   * @param {String} path
	   * @param {String} redirectPath
	   */
	
	  Router.prototype._addRedirect = function _addRedirect(path, redirectPath) {
	    if (path === '*') {
	      this._notFoundRedirect = redirectPath;
	    } else {
	      this._addGuard(path, redirectPath, this.replace);
	    }
	  };
	
	  /**
	   * Add an alias record.
	   *
	   * @param {String} path
	   * @param {String} aliasPath
	   */
	
	  Router.prototype._addAlias = function _addAlias(path, aliasPath) {
	    this._addGuard(path, aliasPath, this._match);
	  };
	
	  /**
	   * Add a path guard.
	   *
	   * @param {String} path
	   * @param {String} mappedPath
	   * @param {Function} handler
	   */
	
	  Router.prototype._addGuard = function _addGuard(path, mappedPath, _handler) {
	    var _this = this;
	
	    this._guardRecognizer.add([{
	      path: path,
	      handler: function handler(match, query) {
	        var realPath = mapParams(mappedPath, match.params, query);
	        _handler.call(_this, realPath);
	      }
	    }]);
	  };
	
	  /**
	   * Check if a path matches any redirect records.
	   *
	   * @param {String} path
	   * @return {Boolean} - if true, will skip normal match.
	   */
	
	  Router.prototype._checkGuard = function _checkGuard(path) {
	    var matched = this._guardRecognizer.recognize(path);
	    if (matched) {
	      matched[0].handler(matched[0], matched.queryParams);
	      return true;
	    } else if (this._notFoundRedirect) {
	      matched = this._recognizer.recognize(path);
	      if (!matched) {
	        this.replace(this._notFoundRedirect);
	        return true;
	      }
	    }
	  };
	
	  /**
	   * Match a URL path and set the route context on vm,
	   * triggering view updates.
	   *
	   * @param {String} path
	   * @param {Object} [state]
	   * @param {String} [anchor]
	   */
	
	  Router.prototype._match = function _match(path, state, anchor) {
	    var _this2 = this;
	
	    if (this._checkGuard(path)) {
	      return;
	    }
	
	    var currentRoute = this._currentRoute;
	    var currentTransition = this._currentTransition;
	
	    if (currentTransition) {
	      if (currentTransition.to.path === path) {
	        // do nothing if we have an active transition going to the same path
	        return;
	      } else if (currentRoute.path === path) {
	        // We are going to the same path, but we also have an ongoing but
	        // not-yet-validated transition. Abort that transition and reset to
	        // prev transition.
	        currentTransition.aborted = true;
	        this._currentTransition = this._prevTransition;
	        return;
	      } else {
	        // going to a totally different path. abort ongoing transition.
	        currentTransition.aborted = true;
	      }
	    }
	
	    // construct new route and transition context
	    var route = new Route(path, this);
	    var transition = new RouteTransition(this, route, currentRoute);
	
	    // current transition is updated right now.
	    // however, current route will only be updated after the transition has
	    // been validated.
	    this._prevTransition = currentTransition;
	    this._currentTransition = transition;
	
	    if (!this.app) {
	      // initial render
	      this.app = new this._appConstructor({
	        el: this._appContainer,
	        _meta: {
	          $route: route
	        }
	      });
	    }
	
	    // check global before hook
	    var beforeHooks = this._beforeEachHooks;
	    var startTransition = function startTransition() {
	      transition.start(function () {
	        _this2._postTransition(route, state, anchor);
	      });
	    };
	
	    if (beforeHooks.length) {
	      transition.runQueue(beforeHooks, function (hook, _, next) {
	        if (transition === _this2._currentTransition) {
	          transition.callHook(hook, null, next, {
	            expectBoolean: true
	          });
	        }
	      }, startTransition);
	    } else {
	      startTransition();
	    }
	
	    if (!this._rendered && this._startCb) {
	      this._startCb.call(null);
	    }
	
	    // HACK:
	    // set rendered to true after the transition start, so
	    // that components that are acitvated synchronously know
	    // whether it is the initial render.
	    this._rendered = true;
	  };
	
	  /**
	   * Set current to the new transition.
	   * This is called by the transition object when the
	   * validation of a route has succeeded.
	   *
	   * @param {Transition} transition
	   */
	
	  Router.prototype._onTransitionValidated = function _onTransitionValidated(transition) {
	    // set current route
	    var route = this._currentRoute = transition.to;
	    // update route context for all children
	    if (this.app.$route !== route) {
	      this.app.$route = route;
	      this._children.forEach(function (child) {
	        child.$route = route;
	      });
	    }
	    // call global after hook
	    if (this._afterEachHooks.length) {
	      this._afterEachHooks.forEach(function (hook) {
	        return hook.call(null, {
	          to: transition.to,
	          from: transition.from
	        });
	      });
	    }
	    this._currentTransition.done = true;
	  };
	
	  /**
	   * Handle stuff after the transition.
	   *
	   * @param {Route} route
	   * @param {Object} [state]
	   * @param {String} [anchor]
	   */
	
	  Router.prototype._postTransition = function _postTransition(route, state, anchor) {
	    // handle scroll positions
	    // saved scroll positions take priority
	    // then we check if the path has an anchor
	    var pos = state && state.pos;
	    if (pos && this._saveScrollPosition) {
	      Vue.nextTick(function () {
	        window.scrollTo(pos.x, pos.y);
	      });
	    } else if (anchor) {
	      Vue.nextTick(function () {
	        var el = document.getElementById(anchor.slice(1));
	        if (el) {
	          window.scrollTo(window.scrollX, el.offsetTop);
	        }
	      });
	    }
	  };
	
	  /**
	   * Normalize named route object / string paths into
	   * a string.
	   *
	   * @param {Object|String|Number} path
	   * @return {String}
	   */
	
	  Router.prototype._stringifyPath = function _stringifyPath(path) {
	    if (path && typeof path === 'object') {
	      if (path.name) {
	        var params = path.params || {};
	        if (path.query) {
	          params.queryParams = path.query;
	        }
	        return this._recognizer.generate(path.name, params);
	      } else if (path.path) {
	        var fullPath = path.path;
	        if (path.query) {
	          var query = this._recognizer.generateQueryString(path.query);
	          if (fullPath.indexOf('?') > -1) {
	            fullPath += '&' + query.slice(1);
	          } else {
	            fullPath += query;
	          }
	        }
	        return fullPath;
	      } else {
	        return '';
	      }
	    } else {
	      return path ? path + '' : '';
	    }
	  };
	
	  return Router;
	})();
	
	function guardComponent(path, handler) {
	  var comp = handler.component;
	  if (Vue.util.isPlainObject(comp)) {
	    comp = handler.component = Vue.extend(comp);
	  }
	  /* istanbul ignore if */
	  if (typeof comp !== 'function') {
	    handler.component = null;
	    warn('invalid component for route "' + path + '".');
	  }
	}
	
	/* Installation */
	
	Router.installed = false;
	
	/**
	 * Installation interface.
	 * Install the necessary directives.
	 */
	
	Router.install = function (externalVue) {
	  /* istanbul ignore if */
	  if (Router.installed) {
	    warn('already installed.');
	    return;
	  }
	  Vue = externalVue;
	  applyOverride(Vue);
	  View(Vue);
	  Link(Vue);
	  exports$1.Vue = Vue;
	  Router.installed = true;
	};
	
	// auto install
	/* istanbul ignore if */
	if (typeof window !== 'undefined' && window.Vue) {
	  window.Vue.use(Router);
	}
	
	module.exports = Router;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	exports.default = function (router) {
	    router.map({
	        '/': { //首页
	            name: 'home',
	            component: __webpack_require__(6)
	        },
	        '/home': {
	            name: 'home',
	            component: __webpack_require__(6)
	        },
	        '/project': {
	            name: 'project',
	            component: __webpack_require__(54)
	        },
	        '/worklog': {
	            name: 'worklog',
	            component: __webpack_require__(64)
	        },
	        '/userinfo': {
	            name: 'userinfo',
	            component: __webpack_require__(72)
	        },
	        '/workflow': {
	            name: 'workflow',
	            component: __webpack_require__(87)
	        },
	        '/login': {
	            name: 'login',
	            component: __webpack_require__(88)
	        },
	        '/comment': {
	            name: 'comment',
	            component: __webpack_require__(91)
	        },
	
	        /* 404路由 */
	        '*': {
	            component: __webpack_require__(6)
	        }
	
	    });
	};

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__webpack_require__(7)
	__vue_script__ = __webpack_require__(11)
	__vue_template__ = __webpack_require__(53)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) { (typeof module.exports === "function" ? module.exports.options : module.exports).template = __vue_template__ }
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), true)
	  if (!hotAPI.compatible) return
	  var id = "E:\\workspace\\mobile-dev\\src\\views\\Home.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(8);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(10)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js?sourceMap!./../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-ecc3dad2&file=Home.vue&scoped=true!./../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./Home.vue", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js?sourceMap!./../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-ecc3dad2&file=Home.vue&scoped=true!./../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./Home.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(9)();
	// imports
	
	
	// module
	exports.push([module.id, "\n.tab_info[_v-ecc3dad2]{\n\theight: 40px;\n\tpadding: 5px;\n\tdisplay: -webkit-box;\n\tdisplay: -webkit-flex;\n\tdisplay: -ms-flexbox;\n\tdisplay: flex;\n\t-webkit-flex-flow:row nowrap;\n\t    -ms-flex-flow:row nowrap;\n\t        flex-flow:row nowrap;\n\t-webkit-box-pack:justify;\n\t-webkit-justify-content:space-between;\n\t    -ms-flex-pack:justify;\n\t        justify-content:space-between;\n\t-webkit-box-align:center;\n\t-webkit-align-items:center;\n\t    -ms-flex-align:center;\n\t        align-items:center;\n\tbackground-color: white;\n}\n\n\n.tab_info>div[_v-ecc3dad2]:nth-child(2){\n\tmargin-right: 5px;\n\tcolor: #272822;\n}\n\n.left[_v-ecc3dad2]{\n\tdisplay: -webkit-box;\n\tdisplay: -webkit-flex;\n\tdisplay: -ms-flexbox;\n\tdisplay: flex;\n\t-webkit-flex-flow:row nowrap;\n\t    -ms-flex-flow:row nowrap;\n\t        flex-flow:row nowrap;\n\t-webkit-box-pack:start;\n\t-webkit-justify-content:flex-start;\n\t    -ms-flex-pack:start;\n\t        justify-content:flex-start;\n\t-webkit-box-align:center;\n\t-webkit-align-items:center;\n\t    -ms-flex-align:center;\n\t        align-items:center;\n}\n.left>div[_v-ecc3dad2]{\n\tmargin-left: 10px;\n\n}\n\n.contentList[_v-ecc3dad2]{\n\tbackground-color: whitesmoke;\n}\n.contentList>li[_v-ecc3dad2]{\n\tborder-radius: 3px;\n\tlist-style-type: none;\n\tborder:1px solid whitesmoke;\n\tmargin-bottom:5px;\n}\n\n.contentList>li[_v-ecc3dad2]:hover{\n\tborder:1px solid gray;\n}\n\n.content>div[_v-ecc3dad2]:nth-child(1){\n\tfont-size: 12px;\n\tcolor: lightdark;\n\tmargin-bottom: 5px;\n}\n\n.content>div:nth-child(1)>span[_v-ecc3dad2]:nth-child(2){\n\tmargin-left: 10px;\n}\n\n.content>div[_v-ecc3dad2]:nth-child(2){\n\tfont-size: 14px;\n\t\n}\n\nimg[_v-ecc3dad2]{\n\twidth: 40px;\n\theight: 40px;\n\tborder-width: 0px;\n}\n", "", {"version":3,"sources":["/./src/views/Home.vue?78f2bf5c"],"names":[],"mappings":";AA4NA;CACA,aAAA;CACA,aAAA;CACA,qBAAA;CAAA,sBAAA;CAAA,qBAAA;CAAA,cAAA;CACA,6BAAA;KAAA,yBAAA;SAAA,qBAAA;CACA,yBAAA;CAAA,sCAAA;KAAA,sBAAA;SAAA,8BAAA;CACA,yBAAA;CAAA,2BAAA;KAAA,sBAAA;SAAA,mBAAA;CACA,wBAAA;CACA;;;AAGA;CACA,kBAAA;CACA,eAAA;CACA;;AAEA;CACA,qBAAA;CAAA,sBAAA;CAAA,qBAAA;CAAA,cAAA;CACA,6BAAA;KAAA,yBAAA;SAAA,qBAAA;CACA,uBAAA;CAAA,mCAAA;KAAA,oBAAA;SAAA,2BAAA;CACA,yBAAA;CAAA,2BAAA;KAAA,sBAAA;SAAA,mBAAA;CACA;AACA;CACA,kBAAA;;CAEA;;AAEA;CACA,6BAAA;CACA;AACA;CACA,mBAAA;CACA,sBAAA;CACA,4BAAA;CACA,kBAAA;CACA;;AAEA;CACA,sBAAA;CACA;;AAEA;CACA,gBAAA;CACA,iBAAA;CACA,mBAAA;CACA;;AAEA;CACA,kBAAA;CACA;;AAEA;CACA,gBAAA;;CAEA;;AAEA;CACA,YAAA;CACA,aAAA;CACA,kBAAA;CACA","file":"Home.vue","sourcesContent":["<template>\r\n\t<div class=\"page\">\r\n\t\t<toolbar :text=\"title\">\r\n\t\t\t<span class=\"icon-reorder\" slot=\"leftBtn\" @click=\"openMenu\"></span>\r\n            <span class=\"icon-refresh\" slot=\"rightBtn\" @click=\"refresh\"></span>\r\n\t\t</toolbar>\r\n\t\t<div class=\"page-content\">\r\n\t\t\t<tabs :active-index.sync=\"index\" >\r\n\t\t\t\t<tab v-for=\"item in tabItems\" :header=\"item.title\" >\r\n\t\t\t\t\t<pull-list>\r\n\t\t\t\t\t\t<ul class=\"contentList\">\r\n\t\t\t\t\t\t\t<li v-for=\"subItem in item.infoList\" >\r\n\t\t\t\t\t\t\t\t<div class=\"tab_info\">\r\n\t\t\t\t\t\t\t\t\t<div class=\"left\">\r\n\t\t\t\t\t\t\t\t\t\t<img src=\"\" alt=\"\">\r\n\t\t\t\t\t\t\t\t\t\t<div class=\"content\">\r\n\t\t\t\t\t\t\t\t\t\t\t<div>\r\n\t\t\t\t\t\t\t\t\t\t\t\t<span>发布时间:{{subItem.time}}</span>\r\n\t\t\t\t\t\t\t\t\t\t\t\t<span>发布人:{{subItem.subUser}}</span>\r\n\t\t\t\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t\t\t\t<div>\r\n\t\t\t\t\t\t\t\t\t\t\t\t{{subItem.content}}\r\n\t\t\t\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t\t<div>\r\n\t\t\t\t\t\t\t\t\t\t<i class=\"icon-chevron-right\"></i>\r\n\t\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t</li>\r\n\t\t\t\t\t\t</ul>\r\n\t\t\t\t\t</pull-list>\r\n\t\t\t\t</tab>\r\n\t\t\t</tabs>\r\n\t\t</div>\r\n\t</div>\r\n\t\t\r\n\t<sidebar :menu-items=\"menuItems\" :show-menu.sync=\"showMenu\" >\r\n\t\t\r\n\t</sidebar>\r\n\r\n\t<loading :loading=\"isload\"></loading>\r\n\r\n</template>\r\n\r\n<script lang=\"babel\">\r\n\timport ToolBar from 'src/components/ToolBar.vue'\r\n    import SideBar from 'src/components/Sidebar.vue'\r\n    import Tabs from 'src/components/Tabs.vue'\r\n    import Tab from 'src/components/Tab.vue'\r\n    import Loading from 'src/components/Loading.vue'\r\n    import PullList from 'src/components/PullList.vue'\r\n\texport default \t{\r\n\t\tcreated(){\r\n\t\t\tconsole.log(\"home is created\")\r\n\t\t\t//计算tab的长度\r\n\t\t   // var width=\tdocument.body.offsetWidth-20;\r\n\t\t   // this.tabWidth=width/this.tabItems.length;\r\n\t\t},\r\n\t\tcomponents:{\r\n\t    \ttoolbar:ToolBar,\r\n            sidebar:SideBar,\r\n            tabs:Tabs,\r\n            tab:Tab,\r\n            loading:Loading,\r\n            PullList\r\n\t    },\r\n\t    props:{\r\n\t    \t\r\n\t    },\r\n\t\tdata() {\r\n\t\t\treturn {\r\n\t\t\t\ttitle:'首页',\r\n\t\t\t\tmenuItems:[{\r\n\t\t\t\t\ttext:'系统首页',\r\n\t\t\t\t\tlink:'home',\r\n\t\t\t\t\ticon:'icon-home'\r\n\t\t\t\t},{\r\n\t\t\t\t\ttext:'个人信息',\r\n\t\t\t\t\tlink:'userinfo',\r\n\t\t\t\t\ticon:'icon-user'\r\n\t\t\t\t},{\r\n\t\t\t\t\ttext:'我的项目',\r\n\t\t\t\t\tlink:'project',\r\n\t\t\t\t\ticon:'icon-tasks'\r\n\t\t\t\t},{\r\n\t\t\t\t\ttext:'工作日志',\r\n\t\t\t\t\tlink:'worklog',\r\n\t\t\t\t\ticon:'icon-calendar'\r\n\t\t\t\t},{\r\n\t\t\t\t\ttext:'流程信息',\r\n\t\t\t\t\tlink:'worklog',\r\n\t\t\t\t\ticon:'icon-exchange'\r\n\t\t\t\t}],\r\n\t\t\t\tindex:0,\r\n\t\t\t\tisload:false,\r\n\t\t\t\tshowMenu:false,\r\n\t\t\t\ttabItems:[{\r\n\t\t\t\t\ttitle:'通知',infoList:[{\r\n\t\t\t\t\t\timgUrl:'',\r\n\t\t\t\t\t\ttime:'2015-11-20',\r\n\t\t\t\t\t\tsubUser:'张三',\r\n\t\t\t\t\t\tcontent:'我的世界你不懂1'\r\n\t\t\t\t\t},{\r\n\t\t\t\t\t\timgUrl:'',\r\n\t\t\t\t\t\ttime:'2015-11-21',\r\n\t\t\t\t\t\tsubUser:'张三',\r\n\t\t\t\t\t\tcontent:'我的世界你不懂2'\r\n\t\t\t\t\t},{\r\n\t\t\t\t\t\timgUrl:'',\r\n\t\t\t\t\t\ttime:'2015-11-22',\r\n\t\t\t\t\t\tsubUser:'张三',\r\n\t\t\t\t\t\tcontent:'我的世界你不懂3'\r\n\t\t\t\t\t},{\r\n\t\t\t\t\t\timgUrl:'',\r\n\t\t\t\t\t\ttime:'2015-11-23',\r\n\t\t\t\t\t\tsubUser:'张三',\r\n\t\t\t\t\t\tcontent:'我的世界你不懂4'\r\n\t\t\t\t\t},{\r\n\t\t\t\t\t\timgUrl:'',\r\n\t\t\t\t\t\ttime:'2015-11-24',\r\n\t\t\t\t\t\tsubUser:'张三',\r\n\t\t\t\t\t\tcontent:'我的世界你不懂5'\r\n\t\t\t\t\t},{\r\n\t\t\t\t\t\timgUrl:'',\r\n\t\t\t\t\t\ttime:'2015-11-22',\r\n\t\t\t\t\t\tsubUser:'张三',\r\n\t\t\t\t\t\tcontent:'我的世界你不懂3'\r\n\t\t\t\t\t},{\r\n\t\t\t\t\t\timgUrl:'',\r\n\t\t\t\t\t\ttime:'2015-11-23',\r\n\t\t\t\t\t\tsubUser:'张三',\r\n\t\t\t\t\t\tcontent:'我的世界你不懂4'\r\n\t\t\t\t\t},{\r\n\t\t\t\t\t\timgUrl:'',\r\n\t\t\t\t\t\ttime:'2015-11-24',\r\n\t\t\t\t\t\tsubUser:'张三',\r\n\t\t\t\t\t\tcontent:'我的世界你不懂5'\r\n\t\t\t\t\t},{\r\n\t\t\t\t\t\timgUrl:'',\r\n\t\t\t\t\t\ttime:'2015-11-22',\r\n\t\t\t\t\t\tsubUser:'张三',\r\n\t\t\t\t\t\tcontent:'我的世界你不懂3'\r\n\t\t\t\t\t},{\r\n\t\t\t\t\t\timgUrl:'',\r\n\t\t\t\t\t\ttime:'2015-11-23',\r\n\t\t\t\t\t\tsubUser:'张三',\r\n\t\t\t\t\t\tcontent:'我的世界你不懂4'\r\n\t\t\t\t\t},{\r\n\t\t\t\t\t\timgUrl:'',\r\n\t\t\t\t\t\ttime:'2015-11-24',\r\n\t\t\t\t\t\tsubUser:'张三',\r\n\t\t\t\t\t\tcontent:'我的世界你不懂5'\r\n\t\t\t\t\t},{\r\n\t\t\t\t\t\timgUrl:'',\r\n\t\t\t\t\t\ttime:'2015-11-22',\r\n\t\t\t\t\t\tsubUser:'张三',\r\n\t\t\t\t\t\tcontent:'我的世界你不懂3'\r\n\t\t\t\t\t},{\r\n\t\t\t\t\t\timgUrl:'',\r\n\t\t\t\t\t\ttime:'2015-11-23',\r\n\t\t\t\t\t\tsubUser:'张三',\r\n\t\t\t\t\t\tcontent:'我的世界你不懂4'\r\n\t\t\t\t\t},{\r\n\t\t\t\t\t\timgUrl:'',\r\n\t\t\t\t\t\ttime:'2015-11-24',\r\n\t\t\t\t\t\tsubUser:'张三',\r\n\t\t\t\t\t\tcontent:'我的世界你不懂5'\r\n\t\t\t\t\t},{\r\n\t\t\t\t\t\timgUrl:'',\r\n\t\t\t\t\t\ttime:'2015-11-22',\r\n\t\t\t\t\t\tsubUser:'张三',\r\n\t\t\t\t\t\tcontent:'我的世界你不懂3'\r\n\t\t\t\t\t},{\r\n\t\t\t\t\t\timgUrl:'',\r\n\t\t\t\t\t\ttime:'2015-11-23',\r\n\t\t\t\t\t\tsubUser:'张三',\r\n\t\t\t\t\t\tcontent:'我的世界你不懂4'\r\n\t\t\t\t\t},{\r\n\t\t\t\t\t\timgUrl:'',\r\n\t\t\t\t\t\ttime:'2015-11-24',\r\n\t\t\t\t\t\tsubUser:'张三',\r\n\t\t\t\t\t\tcontent:'我的世界你不懂5'\r\n\t\t\t\t\t}]\r\n\t\t\t\t}]\r\n\t\t\t}\r\n\t\t},\r\n\t\troute:{\r\n\t\t\tdata(){\r\n\t\t\t\t//从服务器端加载数据\r\n\t\t\t\tconsole.log(\"home组件切入,加载初始数据\");\r\n\t\t\t\t//加载数据\r\n\t\t\t\tthis.isload=false;\r\n\t\t\t\tthis.$http.get(\"values\").then((response)=>{\r\n\t\t\t\t\tconsole.log(response.data);\r\n\t\t\t\t\tthis.isload=false;\r\n\t\t\t\t});\r\n\r\n\t\t\t},\r\n\t\t\tcanDeactivate(transition){\r\n\t\t\t\t//组件被切除\r\n\t\t\t\tconsole.log(\"组件被切出\")\r\n\t\t\t\tthis.showMenu=false;\r\n\t\t\t\ttransition.next();\r\n\t\t\t}\r\n\t\t},\r\n\t    methods: {\r\n\t        openMenu() {\r\n\t            this.showMenu = !this.showMenu;\r\n\t        },\r\n\t        refresh(){\r\n\t        \t//刷新当前页面\r\n\t        }\r\n\t    }\r\n\t}\r\n\r\n</script>\r\n\r\n<style type=\"text/css\" scoped>\r\n\t.tab_info{\r\n\t\theight: 40px;\r\n\t\tpadding: 5px;\r\n\t\tdisplay: flex;\r\n\t\tflex-flow:row nowrap;\r\n\t\tjustify-content:space-between;\r\n\t\talign-items:center;\r\n\t\tbackground-color: white;\r\n\t}\r\n\r\n\r\n\t.tab_info>div:nth-child(2){\r\n\t\tmargin-right: 5px;\r\n\t\tcolor: #272822;\r\n\t}\r\n\t\r\n\t.left{\r\n\t\tdisplay: flex;\r\n\t\tflex-flow:row nowrap;\r\n\t\tjustify-content:flex-start;\r\n\t\talign-items:center;\r\n\t}\r\n\t.left>div{\r\n\t\tmargin-left: 10px;\r\n\r\n\t}\r\n\r\n\t.contentList{\r\n\t\tbackground-color: whitesmoke;\r\n\t}\r\n\t.contentList>li{\r\n\t\tborder-radius: 3px;\r\n\t\tlist-style-type: none;\r\n\t\tborder:1px solid whitesmoke;\r\n\t\tmargin-bottom:5px;\r\n\t}\r\n\r\n\t.contentList>li:hover{\r\n\t\tborder:1px solid gray;\r\n\t}\r\n\r\n\t.content>div:nth-child(1){\r\n\t\tfont-size: 12px;\r\n\t\tcolor: lightdark;\r\n\t\tmargin-bottom: 5px;\r\n\t}\r\n\r\n\t.content>div:nth-child(1)>span:nth-child(2){\r\n\t\tmargin-left: 10px;\r\n\t}\r\n\r\n\t.content>div:nth-child(2){\r\n\t\tfont-size: 14px;\r\n\t\t\r\n\t}\r\n\r\n\timg{\r\n\t\twidth: 40px;\r\n\t\theight: 40px;\r\n\t\tborder-width: 0px;\r\n\t}\r\n</style>"],"sourceRoot":"webpack://"}]);
	
	// exports


/***/ },
/* 9 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];
	
		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};
	
		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];
	
	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}
	
		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();
	
		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";
	
		var styles = listToStyles(list);
		addStylesToDom(styles, options);
	
		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}
	
	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}
	
	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}
	
	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}
	
	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}
	
	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}
	
	function addStyle(obj, options) {
		var styleElement, update, remove;
	
		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}
	
		update(obj);
	
		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}
	
	var replaceText = (function () {
		var textStore = [];
	
		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();
	
	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;
	
		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}
	
	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;
	
		if (media) {
			styleElement.setAttribute("media", media);
		}
	
		if (sourceMap) {
			// https://developer.chrome.com/devtools/docs/javascript-debugging
			// this makes source maps inside style tags work properly in Chrome
			css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */';
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}
	
		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _ToolBar = __webpack_require__(12);
	
	var _ToolBar2 = _interopRequireDefault(_ToolBar);
	
	var _Sidebar = __webpack_require__(17);
	
	var _Sidebar2 = _interopRequireDefault(_Sidebar);
	
	var _Tabs = __webpack_require__(30);
	
	var _Tabs2 = _interopRequireDefault(_Tabs);
	
	var _Tab = __webpack_require__(35);
	
	var _Tab2 = _interopRequireDefault(_Tab);
	
	var _Loading = __webpack_require__(40);
	
	var _Loading2 = _interopRequireDefault(_Loading);
	
	var _PullList = __webpack_require__(45);
	
	var _PullList2 = _interopRequireDefault(_PullList);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	// <template>
	// 	<div class="page">
	// 		<toolbar :text="title">
	// 			<span class="icon-reorder" slot="leftBtn" @click="openMenu"></span>
	//             <span class="icon-refresh" slot="rightBtn" @click="refresh"></span>
	// 		</toolbar>
	// 		<div class="page-content">
	// 			<tabs :active-index.sync="index" >
	// 				<tab v-for="item in tabItems" :header="item.title" >
	// 					<pull-list>
	// 						<ul class="contentList">
	// 							<li v-for="subItem in item.infoList" >
	// 								<div class="tab_info">
	// 									<div class="left">
	// 										<img src="" alt="">
	// 										<div class="content">
	// 											<div>
	// 												<span>发布时间:{{subItem.time}}</span>
	// 												<span>发布人:{{subItem.subUser}}</span>
	// 											</div>
	// 											<div>
	// 												{{subItem.content}}
	// 											</div>
	// 										</div>
	// 									</div>
	// 									<div>
	// 										<i class="icon-chevron-right"></i>
	// 									</div>
	// 								</div>
	
	// 							</li>
	// 						</ul>
	// 					</pull-list>
	// 				</tab>
	// 			</tabs>
	// 		</div>
	// 	</div>
	
	// 	<sidebar :menu-items="menuItems" :show-menu.sync="showMenu" >
	
	// 	</sidebar>
	
	// 	<loading :loading="isload"></loading>
	
	// </template>
	
	// <script lang="babel">
	exports.default = {
		created: function created() {
			console.log("home is created");
			//计算tab的长度
			// var width=	document.body.offsetWidth-20;
			// this.tabWidth=width/this.tabItems.length;
		},
	
		components: {
			toolbar: _ToolBar2.default,
			sidebar: _Sidebar2.default,
			tabs: _Tabs2.default,
			tab: _Tab2.default,
			loading: _Loading2.default,
			PullList: _PullList2.default
		},
		props: {},
		data: function data() {
			return {
				title: '首页',
				menuItems: [{
					text: '系统首页',
					link: 'home',
					icon: 'icon-home'
				}, {
					text: '个人信息',
					link: 'userinfo',
					icon: 'icon-user'
				}, {
					text: '我的项目',
					link: 'project',
					icon: 'icon-tasks'
				}, {
					text: '工作日志',
					link: 'worklog',
					icon: 'icon-calendar'
				}, {
					text: '流程信息',
					link: 'worklog',
					icon: 'icon-exchange'
				}],
				index: 0,
				isload: false,
				showMenu: false,
				tabItems: [{
					title: '通知', infoList: [{
						imgUrl: '',
						time: '2015-11-20',
						subUser: '张三',
						content: '我的世界你不懂1'
					}, {
						imgUrl: '',
						time: '2015-11-21',
						subUser: '张三',
						content: '我的世界你不懂2'
					}, {
						imgUrl: '',
						time: '2015-11-22',
						subUser: '张三',
						content: '我的世界你不懂3'
					}, {
						imgUrl: '',
						time: '2015-11-23',
						subUser: '张三',
						content: '我的世界你不懂4'
					}, {
						imgUrl: '',
						time: '2015-11-24',
						subUser: '张三',
						content: '我的世界你不懂5'
					}, {
						imgUrl: '',
						time: '2015-11-22',
						subUser: '张三',
						content: '我的世界你不懂3'
					}, {
						imgUrl: '',
						time: '2015-11-23',
						subUser: '张三',
						content: '我的世界你不懂4'
					}, {
						imgUrl: '',
						time: '2015-11-24',
						subUser: '张三',
						content: '我的世界你不懂5'
					}, {
						imgUrl: '',
						time: '2015-11-22',
						subUser: '张三',
						content: '我的世界你不懂3'
					}, {
						imgUrl: '',
						time: '2015-11-23',
						subUser: '张三',
						content: '我的世界你不懂4'
					}, {
						imgUrl: '',
						time: '2015-11-24',
						subUser: '张三',
						content: '我的世界你不懂5'
					}, {
						imgUrl: '',
						time: '2015-11-22',
						subUser: '张三',
						content: '我的世界你不懂3'
					}, {
						imgUrl: '',
						time: '2015-11-23',
						subUser: '张三',
						content: '我的世界你不懂4'
					}, {
						imgUrl: '',
						time: '2015-11-24',
						subUser: '张三',
						content: '我的世界你不懂5'
					}, {
						imgUrl: '',
						time: '2015-11-22',
						subUser: '张三',
						content: '我的世界你不懂3'
					}, {
						imgUrl: '',
						time: '2015-11-23',
						subUser: '张三',
						content: '我的世界你不懂4'
					}, {
						imgUrl: '',
						time: '2015-11-24',
						subUser: '张三',
						content: '我的世界你不懂5'
					}]
				}]
			};
		},
	
		route: {
			data: function data() {
				var _this = this;
	
				//从服务器端加载数据
				console.log("home组件切入,加载初始数据");
				//加载数据
				this.isload = false;
				this.$http.get("values").then(function (response) {
					console.log(response.data);
					_this.isload = false;
				});
			},
			canDeactivate: function canDeactivate(transition) {
				//组件被切除
				console.log("组件被切出");
				this.showMenu = false;
				transition.next();
			}
		},
		methods: {
			openMenu: function openMenu() {
				this.showMenu = !this.showMenu;
			},
			refresh: function refresh() {
				//刷新当前页面
			}
		}
	};
	
	// </script>

	// <style type="text/css" scoped>
	// 	.tab_info{
	// 		height: 40px;
	// 		padding: 5px;
	// 		display: flex;
	// 		flex-flow:row nowrap;
	// 		justify-content:space-between;
	// 		align-items:center;
	// 		background-color: white;
	// 	}

	// 	.tab_info>div:nth-child(2){
	// 		margin-right: 5px;
	// 		color: #272822;
	// 	}

	// 	.left{
	// 		display: flex;
	// 		flex-flow:row nowrap;
	// 		justify-content:flex-start;
	// 		align-items:center;
	// 	}
	// 	.left>div{
	// 		margin-left: 10px;

	// 	}

	// 	.contentList{
	// 		background-color: whitesmoke;
	// 	}
	// 	.contentList>li{
	// 		border-radius: 3px;
	// 		list-style-type: none;
	// 		border:1px solid whitesmoke;
	// 		margin-bottom:5px;
	// 	}

	// 	.contentList>li:hover{
	// 		border:1px solid gray;
	// 	}

	// 	.content>div:nth-child(1){
	// 		font-size: 12px;
	// 		color: lightdark;
	// 		margin-bottom: 5px;
	// 	}

	// 	.content>div:nth-child(1)>span:nth-child(2){
	// 		margin-left: 10px;
	// 	}

	// 	.content>div:nth-child(2){
	// 		font-size: 14px;

	// 	}

	// 	img{
	// 		width: 40px;
	// 		height: 40px;
	// 		border-width: 0px;
	// 	}
	// </style>

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__webpack_require__(13)
	__vue_script__ = __webpack_require__(15)
	__vue_template__ = __webpack_require__(16)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) { (typeof module.exports === "function" ? module.exports.options : module.exports).template = __vue_template__ }
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), true)
	  if (!hotAPI.compatible) return
	  var id = "E:\\workspace\\mobile-dev\\src\\components\\ToolBar.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(14);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(10)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js?sourceMap!./../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-11253f5f&file=ToolBar.vue!./../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./ToolBar.vue", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js?sourceMap!./../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-11253f5f&file=ToolBar.vue!./../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./ToolBar.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(9)();
	// imports
	
	
	// module
	exports.push([module.id, "\n\n.toolbar {\n    display: -ms-flexbox;\n    display: -webkit-box;\n    display: flex;\n    display: -webkit-flex;\n    background-color: rgba(255, 255, 255, 255);\n    height: 44px;\n    min-height: 44px;\n    -webkit-flex-flow: row nowrap;\n    -ms-flex-flow: row nowrap;\n            flex-flow: row nowrap;\n    -webkit-justify-content: space-between;\n    -ms-flex-pack: justify;\n            -webkit-box-pack: justify;\n            justify-content: space-between;\n    -webkit-align-items: center;\n    -ms-flex-align: center;\n            -webkit-box-align: center;\n            align-items: center;\n    border-bottom: 2px solid lightgray;\n    /*box-shadow:0 0 4px rgba(0, 0, 0, 0.25);*/\n    width: 100%;\n}\n\n.toolbar div{\n    font-size: 18px;\n    font-weight: bold;\n    text-align: center;\n    vertical-align: middle;\n}\n\n.toolbar>span{\n    position: relative;\n    font-size: 20px;\n    color: #595959;\n    cursor: pointer;\n}\n\nspan[slot=\"leftBtn\"]{\n    margin-left: 10px;\n}\n\nspan[slot=\"rightBtn\"]{\n   margin-right: 10px;\n}\n\n\n.toolbar span:active{\n    color:darkorange;\n}\n", "", {"version":3,"sources":["/./src/components/ToolBar.vue?fcc6a8dc"],"names":[],"mappings":";;AAwBA;IACA,qBAAA;IACA,qBAAA;IAAA,cAAA;IACA,sBAAA;IACA,2CAAA;IACA,aAAA;IACA,iBAAA;IACA,8BAAA;IACA,0BAAA;YACA,sBAAA;IACA,uCAAA;IACA,uBAAA;YACA,0BAAA;YAAA,+BAAA;IACA,4BAAA;IACA,uBAAA;YACA,0BAAA;YAAA,oBAAA;IACA,mCAAA;IACA,2CAAA;IACA,YAAA;CACA;;AAEA;IACA,gBAAA;IACA,kBAAA;IACA,mBAAA;IACA,uBAAA;CACA;;AAEA;IACA,mBAAA;IACA,gBAAA;IACA,eAAA;IACA,gBAAA;CACA;;AAEA;IACA,kBAAA;CACA;;AAEA;GACA,mBAAA;CACA;;;AAGA;IACA,iBAAA;CACA","file":"ToolBar.vue","sourcesContent":["<template>\r\n     <header class=\"toolbar\" >\r\n        <slot name=\"leftBtn\" ></slot>\r\n        <div class=\"text-title item\">{{text}}</div>\r\n        <slot name=\"rightBtn\" ></slot>\r\n    </header>\r\n</template>\r\n\r\n<script lang=\"babel\">\r\n\texport default {\r\n\t\tcreated(){\r\n\t\t\t// console.log(\"toolbar is created\");\r\n\t\t},\r\n\t\tprops:{\r\n\t\t\ttext:{\r\n\t\t\t\ttype:String,\r\n\t\t\t\tdefault:\"未知列表\"\r\n\t\t\t}\r\n\t\t}\r\n\t}\r\n</script>\r\n\r\n<style type=\"text/css\" >\r\n    \r\n    .toolbar {\r\n        display: -ms-flexbox;\r\n        display: flex;\r\n        display: -webkit-flex;\r\n        background-color: rgba(255, 255, 255, 255);\r\n        height: 44px;\r\n        min-height: 44px;\r\n        -webkit-flex-flow: row nowrap;\r\n        -ms-flex-flow: row nowrap;\r\n                flex-flow: row nowrap;\r\n        -webkit-justify-content: space-between;\r\n        -ms-flex-pack: justify;\r\n                justify-content: space-between;\r\n        -webkit-align-items: center;\r\n        -ms-flex-align: center;\r\n                align-items: center;\r\n        border-bottom: 2px solid lightgray;\r\n        /*box-shadow:0 0 4px rgba(0, 0, 0, 0.25);*/\r\n        width: 100%;\r\n    }\r\n\r\n    .toolbar div{\r\n        font-size: 18px;\r\n        font-weight: bold;\r\n        text-align: center;\r\n        vertical-align: middle;\r\n    }\r\n\r\n    .toolbar>span{\r\n        position: relative;\r\n        font-size: 20px;\r\n        color: #595959;\r\n        cursor: pointer;\r\n    }\r\n\r\n    span[slot=\"leftBtn\"]{\r\n        margin-left: 10px;\r\n    }\r\n\r\n    span[slot=\"rightBtn\"]{\r\n       margin-right: 10px;\r\n    }\r\n   \r\n    \r\n    .toolbar span:active{\r\n        color:darkorange;\r\n    }\r\n</style>"],"sourceRoot":"webpack://"}]);
	
	// exports


/***/ },
/* 15 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	// <template>
	//      <header class="toolbar" >
	//         <slot name="leftBtn" ></slot>
	//         <div class="text-title item">{{text}}</div>
	//         <slot name="rightBtn" ></slot>
	//     </header>
	// </template>
	
	// <script lang="babel">
	exports.default = {
		created: function created() {
			// console.log("toolbar is created");
		},
	
		props: {
			text: {
				type: String,
				default: "未知列表"
			}
		}
	};
	// </script>

	// <style type="text/css" >

	//     .toolbar {
	//         display: -ms-flexbox;
	//         display: flex;
	//         display: -webkit-flex;
	//         background-color: rgba(255, 255, 255, 255);
	//         height: 44px;
	//         min-height: 44px;
	//         -webkit-flex-flow: row nowrap;
	//         -ms-flex-flow: row nowrap;
	//                 flex-flow: row nowrap;
	//         -webkit-justify-content: space-between;
	//         -ms-flex-pack: justify;
	//                 justify-content: space-between;
	//         -webkit-align-items: center;
	//         -ms-flex-align: center;
	//                 align-items: center;
	//         border-bottom: 2px solid lightgray;
	//         /*box-shadow:0 0 4px rgba(0, 0, 0, 0.25);*/
	//         width: 100%;
	//     }

	//     .toolbar div{
	//         font-size: 18px;
	//         font-weight: bold;
	//         text-align: center;
	//         vertical-align: middle;
	//     }

	//     .toolbar>span{
	//         position: relative;
	//         font-size: 20px;
	//         color: #595959;
	//         cursor: pointer;
	//     }

	//     span[slot="leftBtn"]{
	//         margin-left: 10px;
	//     }

	//     span[slot="rightBtn"]{
	//        margin-right: 10px;
	//     }

	//     .toolbar span:active{
	//         color:darkorange;
	//     }
	// </style>

/***/ },
/* 16 */
/***/ function(module, exports) {

	module.exports = "\n <header class=\"toolbar\" >\n    <slot name=\"leftBtn\" ></slot>\n    <div class=\"text-title item\">{{text}}</div>\n    <slot name=\"rightBtn\" ></slot>\n</header>\n";

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__webpack_require__(18)
	__vue_script__ = __webpack_require__(20)
	__vue_template__ = __webpack_require__(29)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) { (typeof module.exports === "function" ? module.exports.options : module.exports).template = __vue_template__ }
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), true)
	  if (!hotAPI.compatible) return
	  var id = "E:\\workspace\\mobile-dev\\src\\components\\Sidebar.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(19);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(10)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js?sourceMap!./../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-29364ee0&file=Sidebar.vue&scoped=true!./../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./Sidebar.vue", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js?sourceMap!./../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-29364ee0&file=Sidebar.vue&scoped=true!./../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./Sidebar.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(9)();
	// imports
	
	
	// module
	exports.push([module.id, "\n\n\n\tul[_v-29364ee0]{\n\t\tpadding: 0px;\n\t\tmargin: 0px;\n\t}\n\t.page-cover[_v-29364ee0] {\n\t  \n\t}\n\t.nav-list[_v-29364ee0]{\n\t\tposition: fixed;\n\t    top: 0;\n\t    bottom: 0;\n\t    left: -200px;\n\t    width: 200px;\n\t    background-color: #fff;\n\t    color: #313131;\n\t    -webkit-transition: all .3s ease;\n\t    transition: all .3s ease;\n\t    z-index: 99;\n\n\t}\n\t.showside[_v-29364ee0] {\n\t   -webkit-transform: translateX(200px);\n\t           transform: translateX(200px);\n\t}\n\t\n\n\n\t/*侧边栏列表*/\n\t.list-ul[_v-29364ee0],.loginout[_v-29364ee0]{\n\t    margin: 0 24px;\n\t    border-top: 1px solid #d4d4d4;\n\t    overflow: hidden;\n\t    padding-top: 9%;\n\t    list-style-type: none;\n\t    \n\t}\n\n\t.list-ul>li[_v-29364ee0],.loginout>li[_v-29364ee0] {\n        font-size: 14px;\n        font-weight: 200;\n        padding: 9% 0;\n        text-align: left;\n        text-indent: 1px;\n        line-height: 15px;\n        color: #7f8c8d;\n        display: block;\n        cursor: pointer;\n    }\n\n    .list-ul>li[_v-29364ee0]:active,.loginout>li[_v-29364ee0]:active {\n       background-color: darkorange;\n       color: red;\n    }\n\n\n\t .list-ul>li[_v-29364ee0]:before,.loginout>li[_v-29364ee0]:before{\n        color: #2c3e50;\n        margin: 0 20px;\n        font-size: 14px;\n    }\n\n    .list-ul>li[_v-29364ee0]:last-child {\n        margin-bottom: 50px;\n    }\n\n    .list-ul>.line[_v-29364ee0]{\n        border-top: 1px solid #d4d4d4;\n    }\n    .list-ul>a[_v-29364ee0] {\n        display: block;\n        color: #313131;\n    }\n", "", {"version":3,"sources":["/./src/components/Sidebar.vue?ffe35228"],"names":[],"mappings":";;;CAqDA;EACA,aAAA;EACA,YAAA;EACA;CACA;;EAEA;CACA;EACA,gBAAA;KACA,OAAA;KACA,UAAA;KACA,aAAA;KACA,aAAA;KACA,uBAAA;KACA,eAAA;KACA,iCAAA;KAAA,yBAAA;KACA,YAAA;;EAEA;CACA;IACA,qCAAA;YAAA,6BAAA;EACA;;;;CAIA,SAAA;CACA;KACA,eAAA;KACA,8BAAA;KACA,iBAAA;KACA,gBAAA;KACA,sBAAA;;EAEA;;CAEA;QACA,gBAAA;QACA,iBAAA;QACA,cAAA;QACA,iBAAA;QACA,iBAAA;QACA,kBAAA;QACA,eAAA;QACA,eAAA;QACA,gBAAA;KACA;;IAEA;OACA,6BAAA;OACA,WAAA;KACA;;;EAGA;QACA,eAAA;QACA,eAAA;QACA,gBAAA;KACA;;IAEA;QACA,oBAAA;KACA;;IAEA;QACA,8BAAA;KACA;IACA;QACA,eAAA;QACA,eAAA;KACA","file":"Sidebar.vue","sourcesContent":["<template>\r\n\t<div class=\"page-cover\" v-if=\"showMenu\" @click=\"showCover\">\r\n\t</div>\r\n\r\n\t <section id=\"sideBar\" class=\"nav-list\" :class=\"{'showside':showMenu}\" >\r\n\t    <userheader></userheader>\r\n        <ul class=\"list-ul\">\r\n        \t<li v-for=\"item in menuItems\"  :class=\"item.icon\" v-link=\"{'name':item.link}\" >{{item.text}}</li>\r\n        </ul>\r\n        <ul class=\"loginout\">\r\n        \t<li   class=\"icon-comments\" v-link=\"{'name':comment}\" >问题反馈</li>\r\n        \t<li   class=\"icon-off\" @click=\"loginOut\">退出系统</li>\r\n        </ul>\r\n    </section>\r\n</template>\r\n\r\n<script type=\"text/javascript\">\r\n\r\n\timport UserHeader from './UserHeader.vue';\r\n\timport EventListener from './utils/EventListener.js'\r\n\texport default {\r\n\t\tcreated(){\r\n\t\t\tconsole.log(\"进入sidebar\");\r\n\r\n\t\t},\r\n\t\treplace:true,\r\n\t\tprops:{\r\n\t\t\tmenuItems:{\r\n\t\t\t\ttype:Array,\r\n\t\t\t\tdefault:[]\r\n\t\t\t},\r\n\t\t\tshowMenu:{\r\n\t\t\t\ttype:Boolean,\r\n\t\t\t\tdefault:false\r\n\t\t\t}\r\n\t\t},\r\n\t\tmethods:{\r\n\t\t\tshowCover(){\r\n\t\t\t\tthis.showMenu=!this.showMenu;\r\n\t\t\t},\r\n\t\t\tloginOut(){\r\n\t\t\t\t//系统退出\r\n\t\t\t}\r\n\t\t},\r\n\t\tcomponents:{\r\n\t\t\tuserheader:UserHeader\r\n\t\t}\r\n\t}\r\n</script>\r\n\r\n<style type=\"text/css\" scoped>\r\n\r\n\r\n\tul{\r\n\t\tpadding: 0px;\r\n\t\tmargin: 0px;\r\n\t}\r\n\t.page-cover {\r\n\t  \r\n\t}\r\n\t.nav-list{\r\n\t\tposition: fixed;\r\n\t    top: 0;\r\n\t    bottom: 0;\r\n\t    left: -200px;\r\n\t    width: 200px;\r\n\t    background-color: #fff;\r\n\t    color: #313131;\r\n\t    transition: all .3s ease;\r\n\t    z-index: 99;\r\n\r\n\t}\r\n\t.showside {\r\n\t   transform: translateX(200px);\r\n\t}\r\n\t\r\n\r\n\r\n\t/*侧边栏列表*/\r\n\t.list-ul,.loginout{\r\n\t    margin: 0 24px;\r\n\t    border-top: 1px solid #d4d4d4;\r\n\t    overflow: hidden;\r\n\t    padding-top: 9%;\r\n\t    list-style-type: none;\r\n\t    \r\n\t}\r\n\r\n\t.list-ul>li,.loginout>li {\r\n        font-size: 14px;\r\n        font-weight: 200;\r\n        padding: 9% 0;\r\n        text-align: left;\r\n        text-indent: 1px;\r\n        line-height: 15px;\r\n        color: #7f8c8d;\r\n        display: block;\r\n        cursor: pointer;\r\n    }\r\n\r\n    .list-ul>li:active,.loginout>li:active {\r\n       background-color: darkorange;\r\n       color: red;\r\n    }\r\n\r\n\r\n\t .list-ul>li:before,.loginout>li:before{\r\n        color: #2c3e50;\r\n        margin: 0 20px;\r\n        font-size: 14px;\r\n    }\r\n\r\n    .list-ul>li:last-child {\r\n        margin-bottom: 50px;\r\n    }\r\n\r\n    .list-ul>.line{\r\n        border-top: 1px solid #d4d4d4;\r\n    }\r\n    .list-ul>a {\r\n        display: block;\r\n        color: #313131;\r\n    }\r\n</style>"],"sourceRoot":"webpack://"}]);
	
	// exports


/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _UserHeader = __webpack_require__(21);
	
	var _UserHeader2 = _interopRequireDefault(_UserHeader);
	
	var _EventListener = __webpack_require__(28);
	
	var _EventListener2 = _interopRequireDefault(_EventListener);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	// <template>
	// 	<div class="page-cover" v-if="showMenu" @click="showCover">
	// 	</div>
	
	// 	 <section id="sideBar" class="nav-list" :class="{'showside':showMenu}" >
	// 	    <userheader></userheader>
	//         <ul class="list-ul">
	//         	<li v-for="item in menuItems"  :class="item.icon" v-link="{'name':item.link}" >{{item.text}}</li>
	//         </ul>
	//         <ul class="loginout">
	//         	<li   class="icon-comments" v-link="{'name':comment}" >问题反馈</li>
	//         	<li   class="icon-off" @click="loginOut">退出系统</li>
	//         </ul>
	//     </section>
	// </template>
	
	// <script type="text/javascript">
	
	exports.default = {
		created: function created() {
			console.log("进入sidebar");
		},
	
		replace: true,
		props: {
			menuItems: {
				type: Array,
				default: []
			},
			showMenu: {
				type: Boolean,
				default: false
			}
		},
		methods: {
			showCover: function showCover() {
				this.showMenu = !this.showMenu;
			},
			loginOut: function loginOut() {
				//系统退出
			}
		},
		components: {
			userheader: _UserHeader2.default
		}
	};
	// </script>

	// <style type="text/css" scoped>

	// 	ul{
	// 		padding: 0px;
	// 		margin: 0px;
	// 	}
	// 	.page-cover {

	// 	}
	// 	.nav-list{
	// 		position: fixed;
	// 	    top: 0;
	// 	    bottom: 0;
	// 	    left: -200px;
	// 	    width: 200px;
	// 	    background-color: #fff;
	// 	    color: #313131;
	// 	    transition: all .3s ease;
	// 	    z-index: 99;

	// 	}
	// 	.showside {
	// 	   transform: translateX(200px);
	// 	}

	// 	/*侧边栏列表*/
	// 	.list-ul,.loginout{
	// 	    margin: 0 24px;
	// 	    border-top: 1px solid #d4d4d4;
	// 	    overflow: hidden;
	// 	    padding-top: 9%;
	// 	    list-style-type: none;

	// 	}

	// 	.list-ul>li,.loginout>li {
	//         font-size: 14px;
	//         font-weight: 200;
	//         padding: 9% 0;
	//         text-align: left;
	//         text-indent: 1px;
	//         line-height: 15px;
	//         color: #7f8c8d;
	//         display: block;
	//         cursor: pointer;
	//     }

	//     .list-ul>li:active,.loginout>li:active {
	//        background-color: darkorange;
	//        color: red;
	//     }

	// 	 .list-ul>li:before,.loginout>li:before{
	//         color: #2c3e50;
	//         margin: 0 20px;
	//         font-size: 14px;
	//     }

	//     .list-ul>li:last-child {
	//         margin-bottom: 50px;
	//     }

	//     .list-ul>.line{
	//         border-top: 1px solid #d4d4d4;
	//     }
	//     .list-ul>a {
	//         display: block;
	//         color: #313131;
	//     }
	// </style>
	/* generated by vue-loader */

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__webpack_require__(22)
	__vue_script__ = __webpack_require__(26)
	__vue_template__ = __webpack_require__(27)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) { (typeof module.exports === "function" ? module.exports.options : module.exports).template = __vue_template__ }
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), true)
	  if (!hotAPI.compatible) return
	  var id = "E:\\workspace\\mobile-dev\\src\\components\\UserHeader.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(23);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(10)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js?sourceMap!./../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-3a023664&file=UserHeader.vue&scoped=true!./../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./UserHeader.vue", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js?sourceMap!./../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-3a023664&file=UserHeader.vue&scoped=true!./../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./UserHeader.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(9)();
	// imports
	
	
	// module
	exports.push([module.id, "\n    /*侧边栏用户信息区域*/\n    .user-info[_v-3a023664] {\n        padding: 10px;\n        font-size: 15px;\n        color: #313131;\n    }\n\n\t.nologin[_v-3a023664]{\n\t\tline-height: 30px;\n        padding-left: 10px;\n        display: -webkit-box;\n        display: -webkit-flex;\n        display: -ms-flexbox;\n        display: flex;\n        display: -webkit-flexbox;\n        -webkit-flex-flow:row nowrap;\n            -ms-flex-flow:row nowrap;\n                flex-flow:row nowrap;\n        -webkit-box-pack:justify;\n        -webkit-justify-content:space-between;\n            -ms-flex-pack:justify;\n                justify-content:space-between;\n        margin: 0px 20px;\n        -webkit-box-align:center;\n        -webkit-align-items:center;\n            -ms-flex-align:center;\n                align-items:center;\n\t}\n\n\t.nologin>span[_v-3a023664]:first-child{\n\t\twidth: 24px;\n        height: 24px;\n        content: '';\n        background: url(" + __webpack_require__(24) + ") no-repeat left center;\n      \tbackground-size: 24px 24px;\n\t}\n\n\n\n    /*//已登录*/\n    .login[_v-3a023664] {\n    \tline-height: 30px;\n        padding-left: 10px;\n        display: -webkit-box;\n        display: -webkit-flex;\n        display: -ms-flexbox;\n        display: flex;\n        display: -webkit-flexbox;\n        -webkit-flex-flow:row nowrap;\n            -ms-flex-flow:row nowrap;\n                flex-flow:row nowrap;\n        -webkit-box-pack:justify;\n        -webkit-justify-content:space-between;\n            -ms-flex-pack:justify;\n                justify-content:space-between;\n        margin: 0px 20px;\n        -webkit-box-align:center;\n        -webkit-align-items:center;\n            -ms-flex-align:center;\n                align-items:center;\n        cursor: pointer;\n    }\n\n \t.login>.avertar[_v-3a023664] {\n        width: 40px;\n        height: 40px;\n        background: url(" + __webpack_require__(25) + ") no-repeat center center;\n        background-size: 40px 40px;\n        border-radius: 20px;\n        overflow: hidden;\n    }\n\n\t.login>.avertar>img[_v-3a023664] {\n        width: 40px;\n        height: 40px;\n    }\n\n    .login>.info[_v-3a023664] {\n        margin-left: 10px;\n        overflow: hidden;\n    }\n    .login>span[_v-3a023664] {\n        width: 85px;\n        overflow: hidden;\n        white-space: nowrap;\n        text-overflow: ellipsis;\n        font-size: 12px;\n        line-height: 12px;\n        line-height: 40px;\n        \n    }\n    \n    .login>span>.lh20[_v-3a023664] {\n        line-height: 20px;\n     }\n    /*.login-yes:after {\n        display: block;\n        background: url(\"../assets/images/components/go_icon.png\") no-repeat center right;\n        background-size: 7px 7px;\n    }*/\n", "", {"version":3,"sources":["/./src/components/UserHeader.vue?8fdb6e68"],"names":[],"mappings":";IA2CA,aAAA;IACA;QACA,cAAA;QACA,gBAAA;QACA,eAAA;KACA;;CAEA;EACA,kBAAA;QACA,mBAAA;QACA,qBAAA;QAAA,sBAAA;QAAA,qBAAA;QAAA,cAAA;QACA,yBAAA;QACA,6BAAA;YAAA,yBAAA;gBAAA,qBAAA;QACA,yBAAA;QAAA,sCAAA;YAAA,sBAAA;gBAAA,8BAAA;QACA,iBAAA;QACA,yBAAA;QAAA,2BAAA;YAAA,sBAAA;gBAAA,mBAAA;EACA;;CAEA;EACA,YAAA;QACA,aAAA;QACA,YAAA;QACA,gEAAA;OACA,2BAAA;EACA;;;;IAIA,SAAA;IACA;KACA,kBAAA;QACA,mBAAA;QACA,qBAAA;QAAA,sBAAA;QAAA,qBAAA;QAAA,cAAA;QACA,yBAAA;QACA,6BAAA;YAAA,yBAAA;gBAAA,qBAAA;QACA,yBAAA;QAAA,sCAAA;YAAA,sBAAA;gBAAA,8BAAA;QACA,iBAAA;QACA,yBAAA;QAAA,2BAAA;YAAA,sBAAA;gBAAA,mBAAA;QACA,gBAAA;KACA;;EAEA;QACA,YAAA;QACA,aAAA;QACA,kEAAA;QACA,2BAAA;QACA,oBAAA;QACA,iBAAA;KACA;;CAEA;QACA,YAAA;QACA,aAAA;KACA;;IAEA;QACA,kBAAA;QACA,iBAAA;KACA;IACA;QACA,YAAA;QACA,iBAAA;QACA,oBAAA;QACA,wBAAA;QACA,gBAAA;QACA,kBAAA;QACA,kBAAA;;KAEA;;IAEA;QACA,kBAAA;MACA;IACA;;;;OAIA","file":"UserHeader.vue","sourcesContent":["<template>\r\n    <div class=\"user-info\">\r\n        <!-- 未登录 -->\r\n        <div class=\"nologin\" v-if=\"!loginname\">\r\n            <span ></span>\r\n            <span  @click=\"goEnter\"><a >登录</a></span>\r\n        </div>\r\n        <!-- 已登录 -->\r\n        <div class=\"login\" v-if=\"loginname\" @click=\"goUser\">\r\n            <div class=\"avertar\">\r\n            \t<img v-if=\"avatar_url\" :src=\"avatar_url\">\r\n            </div>\r\n            <div class=\"info\">\r\n                <span v-if=\"loginname\" v-text=\"loginname\"></span>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</template>\r\n\r\n<script>\r\n    export default {\r\n        replace:true,\r\n        data () {\r\n            return {\r\n                // loginname: localStorage.loginname || \"\",\r\n                // avatar_url: localStorage.avatar_url || \"\"\r\n                loginname:\"张三\",\r\n                avatar_url:''\r\n            }\r\n        },\r\n        methods:{\r\n            goEnter (){\r\n                var link = '/login?redirect='+ encodeURIComponent(this.$route.path);\r\n                this.$route.router.go(link);\r\n            },\r\n            goUser (){\r\n                this.$route.router.go({name:'userinfo',params:{loginname:this.loginname}});\r\n            }\r\n        }\r\n    }\r\n</script>\r\n\r\n<style type=\"text/css\" scoped>\r\n    /*侧边栏用户信息区域*/\r\n    .user-info {\r\n        padding: 10px;\r\n        font-size: 15px;\r\n        color: #313131;\r\n    }\r\n\r\n\t.nologin{\r\n\t\tline-height: 30px;\r\n        padding-left: 10px;\r\n        display: flex;\r\n        display: -webkit-flexbox;\r\n        flex-flow:row nowrap;\r\n        justify-content:space-between;\r\n        margin: 0px 20px;\r\n        align-items:center;\r\n\t}\r\n\r\n\t.nologin>span:first-child{\r\n\t\twidth: 24px;\r\n        height: 24px;\r\n        content: '';\r\n        background: url(\"../assets/images/components/login_icon.png\") no-repeat left center;\r\n      \tbackground-size: 24px 24px;\r\n\t}\r\n\r\n\r\n\r\n    /*//已登录*/\r\n    .login {\r\n    \tline-height: 30px;\r\n        padding-left: 10px;\r\n        display: flex;\r\n        display: -webkit-flexbox;\r\n        flex-flow:row nowrap;\r\n        justify-content:space-between;\r\n        margin: 0px 20px;\r\n        align-items:center;\r\n        cursor: pointer;\r\n    }\r\n\r\n \t.login>.avertar {\r\n        width: 40px;\r\n        height: 40px;\r\n        background: url(\"../assets/images/components/user.png\") no-repeat center center;\r\n        background-size: 40px 40px;\r\n        border-radius: 20px;\r\n        overflow: hidden;\r\n    }\r\n\r\n\t.login>.avertar>img {\r\n        width: 40px;\r\n        height: 40px;\r\n    }\r\n\r\n    .login>.info {\r\n        margin-left: 10px;\r\n        overflow: hidden;\r\n    }\r\n    .login>span {\r\n        width: 85px;\r\n        overflow: hidden;\r\n        white-space: nowrap;\r\n        text-overflow: ellipsis;\r\n        font-size: 12px;\r\n        line-height: 12px;\r\n        line-height: 40px;\r\n        \r\n    }\r\n    \r\n    .login>span>.lh20 {\r\n        line-height: 20px;\r\n     }\r\n    /*.login-yes:after {\r\n        display: block;\r\n        background: url(\"../assets/images/components/go_icon.png\") no-repeat center right;\r\n        background-size: 7px 7px;\r\n    }*/\r\n</style>"],"sourceRoot":"webpack://"}]);
	
	// exports


/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "login_icon.png?76c0f3299044482b9c022de20671e5a5";

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "user.png?f95d81473c5e661b988fb30f31e36621";

/***/ },
/* 26 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	// <template>
	//     <div class="user-info">
	//         <!-- 未登录 -->
	//         <div class="nologin" v-if="!loginname">
	//             <span ></span>
	//             <span  @click="goEnter"><a >登录</a></span>
	//         </div>
	//         <!-- 已登录 -->
	//         <div class="login" v-if="loginname" @click="goUser">
	//             <div class="avertar">
	//             	<img v-if="avatar_url" :src="avatar_url">
	//             </div>
	//             <div class="info">
	//                 <span v-if="loginname" v-text="loginname"></span>
	//             </div>
	//         </div>
	//     </div>
	// </template>
	
	// <script>
	exports.default = {
	    replace: true,
	    data: function data() {
	        return {
	            // loginname: localStorage.loginname || "",
	            // avatar_url: localStorage.avatar_url || ""
	            loginname: "张三",
	            avatar_url: ''
	        };
	    },
	
	    methods: {
	        goEnter: function goEnter() {
	            var link = '/login?redirect=' + encodeURIComponent(this.$route.path);
	            this.$route.router.go(link);
	        },
	        goUser: function goUser() {
	            this.$route.router.go({ name: 'userinfo', params: { loginname: this.loginname } });
	        }
	    }
	};
	// </script>

	// <style type="text/css" scoped>
	//     /*侧边栏用户信息区域*/
	//     .user-info {
	//         padding: 10px;
	//         font-size: 15px;
	//         color: #313131;
	//     }

	// 	.nologin{
	// 		line-height: 30px;
	//         padding-left: 10px;
	//         display: flex;
	//         display: -webkit-flexbox;
	//         flex-flow:row nowrap;
	//         justify-content:space-between;
	//         margin: 0px 20px;
	//         align-items:center;
	// 	}

	// 	.nologin>span:first-child{
	// 		width: 24px;
	//         height: 24px;
	//         content: '';
	//         background: url("../assets/images/components/login_icon.png") no-repeat left center;
	//       	background-size: 24px 24px;
	// 	}

	//     /*//已登录*/
	//     .login {
	//     	line-height: 30px;
	//         padding-left: 10px;
	//         display: flex;
	//         display: -webkit-flexbox;
	//         flex-flow:row nowrap;
	//         justify-content:space-between;
	//         margin: 0px 20px;
	//         align-items:center;
	//         cursor: pointer;
	//     }

	//  	.login>.avertar {
	//         width: 40px;
	//         height: 40px;
	//         background: url("../assets/images/components/user.png") no-repeat center center;
	//         background-size: 40px 40px;
	//         border-radius: 20px;
	//         overflow: hidden;
	//     }

	// 	.login>.avertar>img {
	//         width: 40px;
	//         height: 40px;
	//     }

	//     .login>.info {
	//         margin-left: 10px;
	//         overflow: hidden;
	//     }
	//     .login>span {
	//         width: 85px;
	//         overflow: hidden;
	//         white-space: nowrap;
	//         text-overflow: ellipsis;
	//         font-size: 12px;
	//         line-height: 12px;
	//         line-height: 40px;

	//     }

	//     .login>span>.lh20 {
	//         line-height: 20px;
	//      }
	//     /*.login-yes:after {
	//         display: block;
	//         background: url("../assets/images/components/go_icon.png") no-repeat center right;
	//         background-size: 7px 7px;
	//     }*/
	// </style>
	/* generated by vue-loader */

/***/ },
/* 27 */
/***/ function(module, exports) {

	module.exports = "\n<div class=\"user-info\" _v-3a023664=\"\">\n    <!-- 未登录 -->\n    <div class=\"nologin\" v-if=\"!loginname\" _v-3a023664=\"\">\n        <span _v-3a023664=\"\"></span>\n        <span @click=\"goEnter\" _v-3a023664=\"\"><a _v-3a023664=\"\">登录</a></span>\n    </div>\n    <!-- 已登录 -->\n    <div class=\"login\" v-if=\"loginname\" @click=\"goUser\" _v-3a023664=\"\">\n        <div class=\"avertar\" _v-3a023664=\"\">\n        \t<img v-if=\"avatar_url\" :src=\"avatar_url\" _v-3a023664=\"\">\n        </div>\n        <div class=\"info\" _v-3a023664=\"\">\n            <span v-if=\"loginname\" v-text=\"loginname\" _v-3a023664=\"\"></span>\n        </div>\n    </div>\n</div>\n";

/***/ },
/* 28 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var EventListener = {
	  /**
	   * Listen to DOM events during the bubble phase.
	   *
	   * @param {DOMEventTarget} target DOM element to register listener on.
	   * @param {string} eventType Event type, e.g. 'click' or 'mouseover'.
	   * @param {function} callback Callback function.
	   * @return {object} Object with a `remove` method.
	   */
	
	  listen: function listen(target, eventType, callback) {
	    if (target.addEventListener) {
	      target.addEventListener(eventType, callback, false);
	      return {
	        remove: function remove() {
	          target.removeEventListener(eventType, callback, false);
	        }
	      };
	    } else if (target.attachEvent) {
	      target.attachEvent('on' + eventType, callback);
	      return {
	        remove: function remove() {
	          target.detachEvent('on' + eventType, callback);
	        }
	      };
	    }
	  }
	};
	
	exports.default = EventListener;

/***/ },
/* 29 */
/***/ function(module, exports) {

	module.exports = "\n\t<div class=\"page-cover\" v-if=\"showMenu\" @click=\"showCover\" _v-29364ee0=\"\">\n\t</div>\n\n\t <section id=\"sideBar\" class=\"nav-list\" :class=\"{'showside':showMenu}\" _v-29364ee0=\"\">\n\t    <userheader _v-29364ee0=\"\"></userheader>\n        <ul class=\"list-ul\" _v-29364ee0=\"\">\n        \t<li v-for=\"item in menuItems\" :class=\"item.icon\" v-link=\"{'name':item.link}\" _v-29364ee0=\"\">{{item.text}}</li>\n        </ul>\n        <ul class=\"loginout\" _v-29364ee0=\"\">\n        \t<li class=\"icon-comments\" v-link=\"{'name':comment}\" _v-29364ee0=\"\">问题反馈</li>\n        \t<li class=\"icon-off\" @click=\"loginOut\" _v-29364ee0=\"\">退出系统</li>\n        </ul>\n    </section>\n";

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__webpack_require__(31)
	__vue_script__ = __webpack_require__(33)
	__vue_template__ = __webpack_require__(34)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) { (typeof module.exports === "function" ? module.exports.options : module.exports).template = __vue_template__ }
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), true)
	  if (!hotAPI.compatible) return
	  var id = "E:\\workspace\\mobile-dev\\src\\components\\Tabs.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(32);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(10)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js?sourceMap!./../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-5d2ac0ac&file=Tabs.vue&scoped=true!./../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./Tabs.vue", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js?sourceMap!./../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-5d2ac0ac&file=Tabs.vue&scoped=true!./../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./Tabs.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(9)();
	// imports
	
	
	// module
	exports.push([module.id, "\n\n\n.tabs[_v-5d2ac0ac]{\n    display: -webkit-box;\n    display: -webkit-flex;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-flex-flow:column nowrap;\n        -ms-flex-flow:column nowrap;\n            flex-flow:column nowrap;\n    min-height: 35px;\n    -webkit-box-pack:start;\n    -webkit-justify-content:flex-start;\n        -ms-flex-pack:start;\n            justify-content:flex-start;\n    height: 100%;\n}\n\n.nav-tabs[_v-5d2ac0ac]{\n   display: -webkit-box;\n   display: -webkit-flex;\n   display: -ms-flexbox;\n   display: flex;\n   -webkit-flex-flow:column nowrap;\n       -ms-flex-flow:column nowrap;\n           flex-flow:column nowrap;\n   min-height: 35px;\n   height: 40px;\n   -webkit-box-pack:start;\n   -webkit-justify-content:flex-start;\n       -ms-flex-pack:start;\n           justify-content:flex-start;\n   -webkit-box-flex:0;\n   -webkit-flex:0 1 auto;\n       -ms-flex:0 1 auto;\n           flex:0 1 auto;\n}\n\n.tabs_title[_v-5d2ac0ac] {\n    display: -ms-flexbox;\n    display: -webkit-box;\n    display: flex;\n    display: -webkit-flex;\n    -webkit-flex-flow: row nowrap;\n        -ms-flex-flow: row nowrap;\n            flex-flow: row nowrap;\n    -webkit-align-items: center;\n        -ms-flex-align: center;\n            -webkit-box-align: center;\n            align-items: center;\n    -webkit-align-content: center;\n        -ms-flex-line-pack: center;\n            align-content: center;\n    -ms-flex-pack: distribute;\n        justify-content: space-around;\n\n    -webkit-justify-content: space-around;\n    -webkit-flex-flow: row nowrap;\n    -webkit-align-items: center;\n    -webkit-align-content: center;\n\n    list-style-type: none;\n    line-height: 35px;\n    border-bottom: 1px solid whitesmoke;\n    font-size: 14px;\n    font-weight: bold;\n    width: 100%;\n}\n\n\n.tabs_title>li[_v-5d2ac0ac] {\n  width: 100%;\n  min-width: 100px;\n  text-align: center;\n  vertical-align: middle;\n  cursor: pointer;\n}\n\n.nav_active[_v-5d2ac0ac] {\n  color: darkorange;\n}\n\n\n#tabs_line[_v-5d2ac0ac] {\n  height: 3px;\n  margin: 0px 10px;\n  margin-top: -3px;\n  background-color: darkorange;\n  -webkit-transition: -webkit-transform .3s ease;\n  transition: -webkit-transform .3s ease;\n  transition: transform .3s ease;\n  transition: transform .3s ease, -webkit-transform .3s ease;\n  -moz-transition: transform .3s ease;/* Firefox 4 */\n  -webkit-transition: transform .3s ease; /* Safari 和 Chrome */\n  -o-transition: transform .3s ease; /* Opera */\n  width: 0px;\n}\n\n.tab-content[_v-5d2ac0ac]{\n    overflow: auto;\n    -webkit-overflow-scrolling: touch;\n    display: -webkit-flex;\n    display: -ms-flexbox;\n    display: -webkit-box;\n    display: flex;\n    -webkit-flex: 0 1 auto;\n    -ms-flex: 0 1 auto;\n    -webkit-box-flex: 0;\n            flex: 0 1 auto;\n    margin-bottom: 0px;\n    height: 100%;\n    -webkit-flex-flow:column nowrap;\n        -ms-flex-flow:column nowrap;\n            flex-flow:column nowrap;\n}\n", "", {"version":3,"sources":["/./src/components/Tabs.vue?95e12948"],"names":[],"mappings":";;;AAiFA;IACA,qBAAA;IAAA,sBAAA;IAAA,qBAAA;IAAA,cAAA;IACA,gCAAA;QAAA,4BAAA;YAAA,wBAAA;IACA,iBAAA;IACA,uBAAA;IAAA,mCAAA;QAAA,oBAAA;YAAA,2BAAA;IACA,aAAA;CACA;;AAEA;GACA,qBAAA;GAAA,sBAAA;GAAA,qBAAA;GAAA,cAAA;GACA,gCAAA;OAAA,4BAAA;WAAA,wBAAA;GACA,iBAAA;GACA,aAAA;GACA,uBAAA;GAAA,mCAAA;OAAA,oBAAA;WAAA,2BAAA;GACA,mBAAA;GAAA,sBAAA;OAAA,kBAAA;WAAA,cAAA;CACA;;AAEA;IACA,qBAAA;IACA,qBAAA;IAAA,cAAA;IACA,sBAAA;IACA,8BAAA;QACA,0BAAA;YACA,sBAAA;IACA,4BAAA;QACA,uBAAA;YACA,0BAAA;YAAA,oBAAA;IACA,8BAAA;QACA,2BAAA;YACA,sBAAA;IACA,0BAAA;QACA,8BAAA;;IAEA,sCAAA;IACA,8BAAA;IACA,4BAAA;IACA,8BAAA;;IAEA,sBAAA;IACA,kBAAA;IACA,oCAAA;IACA,gBAAA;IACA,kBAAA;IACA,YAAA;CACA;;;AAGA;EACA,YAAA;EACA,iBAAA;EACA,mBAAA;EACA,uBAAA;EACA,gBAAA;CACA;;AAEA;EACA,kBAAA;CACA;;;AAGA;EACA,YAAA;EACA,iBAAA;EACA,iBAAA;EACA,6BAAA;EACA,+CAAA;EAAA,uCAAA;EAAA,+BAAA;EAAA,2DAAA;EACA,oCAAA,eAAA;EACA,uCAAA,CAAA,qBAAA;EACA,kCAAA,CAAA,WAAA;EACA,WAAA;CACA;;AAEA;IACA,eAAA;IACA,kCAAA;IACA,sBAAA;IACA,qBAAA;IACA,qBAAA;IAAA,cAAA;IACA,uBAAA;IACA,mBAAA;IACA,oBAAA;YAAA,eAAA;IACA,mBAAA;IACA,aAAA;IACA,gCAAA;QAAA,4BAAA;YAAA,wBAAA;CACA","file":"Tabs.vue","sourcesContent":["<template>\r\n \r\n  <section class=\"tabs\" v-touch:swipeleft=\"swipeLeft\" v-touch:swiperight=\"swipeRight\" role=\"tablist\">\r\n    <div class=\"nav-tabs\">\r\n        <ul class=\"tabs_title\">\r\n            <li v-for=\"item in tabItems\"\r\n            :class=\"{'nav_active':activeIndex===$index}\" \r\n            v-touch:tap=\"switchTab($index)\" \r\n             >{{item.header}}</li>\r\n        </ul>\r\n        <div id=\"tabs_line\" v-bind:style=\"{ width:underline+ 'px' }\">\r\n        </div>\r\n    </div>\r\n      <!-- Tab panes -->\r\n    <div class=\"tab-content\">\r\n        <slot></slot>\r\n    </div>\r\n  </section>\r\n</template>\r\n\r\n<script>\r\n  export default {\r\n    ready(){\r\n        var width=  document.body.offsetWidth-20;\r\n        this.underline=width/this.tabItems.length;\r\n        this.switchTab(this.activeIndex);\r\n    },\r\n    props:{\r\n      effect: {\r\n        type: String,\r\n        default: 'fadein'\r\n      },\r\n      activeIndex:{\r\n        type: Number,\r\n        default: 0\r\n      }\r\n    },\r\n    data(){\r\n      return {\r\n        //当前选中的tab页面\r\n        underline:100,\r\n        tabItems:[]\r\n      }\r\n    },\r\n    methods:{\r\n      //点击tabs\r\n      switchTab(index){\r\n\r\n        this.activeIndex=index;\r\n        var leftWidth=index*this.underline;\r\n        document.getElementById('tabs_line').style.transform=\"translateX(\"+leftWidth+\"px)\";\r\n      },\r\n      swipeLeft(){\r\n         \r\n          var tempIndex=this.activeIndex;\r\n          var tabLength=this.tabItems.length-1;\r\n          if(tempIndex==tabLength){\r\n            tempIndex=tabLength;\r\n          }else{\r\n            tempIndex=this.activeIndex+1;\r\n          }\r\n          this.activeIndex=tempIndex;\r\n          this.switchTab(tempIndex);\r\n      },\r\n      swipeRight(){\r\n          var tempIndex=this.activeIndex;\r\n          var tempIndex=this.activeIndex-1;\r\n          if(tempIndex<0){\r\n            tempIndex=0;\r\n          }\r\n          this.activeIndex=tempIndex;\r\n          this.switchTab(tempIndex);\r\n      }\r\n    }\r\n  }\r\n</script>\r\n\r\n\r\n<style type=\"text/css\" scoped>\r\n    \r\n\r\n    .tabs{\r\n        display: flex;\r\n        flex-flow:column nowrap;\r\n        min-height: 35px;\r\n        justify-content:flex-start;\r\n        height: 100%;\r\n    }\r\n\r\n    .nav-tabs{\r\n       display: flex;\r\n       flex-flow:column nowrap;\r\n       min-height: 35px;\r\n       height: 40px;\r\n       justify-content:flex-start;\r\n       flex:0 1 auto;\r\n    }\r\n    \r\n    .tabs_title {\r\n        display: -ms-flexbox;\r\n        display: flex;\r\n        display: -webkit-flex;\r\n        -webkit-flex-flow: row nowrap;\r\n            -ms-flex-flow: row nowrap;\r\n                flex-flow: row nowrap;\r\n        -webkit-align-items: center;\r\n            -ms-flex-align: center;\r\n                align-items: center;\r\n        -webkit-align-content: center;\r\n            -ms-flex-line-pack: center;\r\n                align-content: center;\r\n        -ms-flex-pack: distribute;\r\n            justify-content: space-around;\r\n\r\n        -webkit-justify-content: space-around;\r\n        -webkit-flex-flow: row nowrap;\r\n        -webkit-align-items: center;\r\n        -webkit-align-content: center;\r\n\r\n        list-style-type: none;\r\n        line-height: 35px;\r\n        border-bottom: 1px solid whitesmoke;\r\n        font-size: 14px;\r\n        font-weight: bold;\r\n        width: 100%;\r\n    }\r\n    \r\n    \r\n    .tabs_title>li {\r\n      width: 100%;\r\n      min-width: 100px;\r\n      text-align: center;\r\n      vertical-align: middle;\r\n      cursor: pointer;\r\n    }\r\n    \r\n    .nav_active {\r\n      color: darkorange;\r\n    }\r\n\r\n    \r\n    #tabs_line {\r\n      height: 3px;\r\n      margin: 0px 10px;\r\n      margin-top: -3px;\r\n      background-color: darkorange;\r\n      transition: transform .3s ease;\r\n      -moz-transition: transform .3s ease;/* Firefox 4 */\r\n      -webkit-transition: transform .3s ease; /* Safari 和 Chrome */\r\n      -o-transition: transform .3s ease; /* Opera */\r\n      width: 0px;\r\n    }\r\n\r\n    .tab-content{\r\n        overflow: auto;\r\n        -webkit-overflow-scrolling: touch;\r\n        display: -webkit-flex;\r\n        display: -ms-flexbox;\r\n        display: flex;\r\n        -webkit-flex: 0 1 auto;\r\n        -ms-flex: 0 1 auto;\r\n        flex: 0 1 auto;\r\n        margin-bottom: 0px;\r\n        height: 100%;\r\n        flex-flow:column nowrap;\r\n    }\r\n</style>"],"sourceRoot":"webpack://"}]);
	
	// exports


/***/ },
/* 33 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	// <template>
	
	//   <section class="tabs" v-touch:swipeleft="swipeLeft" v-touch:swiperight="swipeRight" role="tablist">
	//     <div class="nav-tabs">
	//         <ul class="tabs_title">
	//             <li v-for="item in tabItems"
	//             :class="{'nav_active':activeIndex===$index}"
	//             v-touch:tap="switchTab($index)"
	//              >{{item.header}}</li>
	//         </ul>
	//         <div id="tabs_line" v-bind:style="{ width:underline+ 'px' }">
	//         </div>
	//     </div>
	//       <!-- Tab panes -->
	//     <div class="tab-content">
	//         <slot></slot>
	//     </div>
	//   </section>
	// </template>
	
	// <script>
	exports.default = {
	  ready: function ready() {
	    var width = document.body.offsetWidth - 20;
	    this.underline = width / this.tabItems.length;
	    this.switchTab(this.activeIndex);
	  },
	
	  props: {
	    effect: {
	      type: String,
	      default: 'fadein'
	    },
	    activeIndex: {
	      type: Number,
	      default: 0
	    }
	  },
	  data: function data() {
	    return {
	      //当前选中的tab页面
	      underline: 100,
	      tabItems: []
	    };
	  },
	
	  methods: {
	    //点击tabs
	
	    switchTab: function switchTab(index) {
	
	      this.activeIndex = index;
	      var leftWidth = index * this.underline;
	      document.getElementById('tabs_line').style.transform = "translateX(" + leftWidth + "px)";
	    },
	    swipeLeft: function swipeLeft() {
	
	      var tempIndex = this.activeIndex;
	      var tabLength = this.tabItems.length - 1;
	      if (tempIndex == tabLength) {
	        tempIndex = tabLength;
	      } else {
	        tempIndex = this.activeIndex + 1;
	      }
	      this.activeIndex = tempIndex;
	      this.switchTab(tempIndex);
	    },
	    swipeRight: function swipeRight() {
	      var tempIndex = this.activeIndex;
	      var tempIndex = this.activeIndex - 1;
	      if (tempIndex < 0) {
	        tempIndex = 0;
	      }
	      this.activeIndex = tempIndex;
	      this.switchTab(tempIndex);
	    }
	  }
	};
	// </script>

	// <style type="text/css" scoped>

	//     .tabs{
	//         display: flex;
	//         flex-flow:column nowrap;
	//         min-height: 35px;
	//         justify-content:flex-start;
	//         height: 100%;
	//     }

	//     .nav-tabs{
	//        display: flex;
	//        flex-flow:column nowrap;
	//        min-height: 35px;
	//        height: 40px;
	//        justify-content:flex-start;
	//        flex:0 1 auto;
	//     }

	//     .tabs_title {
	//         display: -ms-flexbox;
	//         display: flex;
	//         display: -webkit-flex;
	//         -webkit-flex-flow: row nowrap;
	//             -ms-flex-flow: row nowrap;
	//                 flex-flow: row nowrap;
	//         -webkit-align-items: center;
	//             -ms-flex-align: center;
	//                 align-items: center;
	//         -webkit-align-content: center;
	//             -ms-flex-line-pack: center;
	//                 align-content: center;
	//         -ms-flex-pack: distribute;
	//             justify-content: space-around;

	//         -webkit-justify-content: space-around;
	//         -webkit-flex-flow: row nowrap;
	//         -webkit-align-items: center;
	//         -webkit-align-content: center;

	//         list-style-type: none;
	//         line-height: 35px;
	//         border-bottom: 1px solid whitesmoke;
	//         font-size: 14px;
	//         font-weight: bold;
	//         width: 100%;
	//     }

	//     .tabs_title>li {
	//       width: 100%;
	//       min-width: 100px;
	//       text-align: center;
	//       vertical-align: middle;
	//       cursor: pointer;
	//     }

	//     .nav_active {
	//       color: darkorange;
	//     }

	//     #tabs_line {
	//       height: 3px;
	//       margin: 0px 10px;
	//       margin-top: -3px;
	//       background-color: darkorange;
	//       transition: transform .3s ease;
	//       -moz-transition: transform .3s ease;/* Firefox 4 */
	//       -webkit-transition: transform .3s ease; /* Safari 和 Chrome */
	//       -o-transition: transform .3s ease; /* Opera */
	//       width: 0px;
	//     }

	//     .tab-content{
	//         overflow: auto;
	//         -webkit-overflow-scrolling: touch;
	//         display: -webkit-flex;
	//         display: -ms-flexbox;
	//         display: flex;
	//         -webkit-flex: 0 1 auto;
	//         -ms-flex: 0 1 auto;
	//         flex: 0 1 auto;
	//         margin-bottom: 0px;
	//         height: 100%;
	//         flex-flow:column nowrap;
	//     }
	// </style>
	/* generated by vue-loader */

/***/ },
/* 34 */
/***/ function(module, exports) {

	module.exports = "\n\n<section class=\"tabs\" v-touch:swipeleft=\"swipeLeft\" v-touch:swiperight=\"swipeRight\" role=\"tablist\" _v-5d2ac0ac=\"\">\n  <div class=\"nav-tabs\" _v-5d2ac0ac=\"\">\n      <ul class=\"tabs_title\" _v-5d2ac0ac=\"\">\n          <li v-for=\"item in tabItems\" :class=\"{'nav_active':activeIndex===$index}\" v-touch:tap=\"switchTab($index)\" _v-5d2ac0ac=\"\">{{item.header}}</li>\n      </ul>\n      <div id=\"tabs_line\" v-bind:style=\"{ width:underline+ 'px' }\" _v-5d2ac0ac=\"\">\n      </div>\n  </div>\n    <!-- Tab panes -->\n  <div class=\"tab-content\" _v-5d2ac0ac=\"\">\n      <slot _v-5d2ac0ac=\"\"></slot>\n  </div>\n</section>\n";

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__webpack_require__(36)
	__vue_script__ = __webpack_require__(38)
	__vue_template__ = __webpack_require__(39)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) { (typeof module.exports === "function" ? module.exports.options : module.exports).template = __vue_template__ }
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), true)
	  if (!hotAPI.compatible) return
	  var id = "E:\\workspace\\mobile-dev\\src\\components\\Tab.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(37);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(10)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js?sourceMap!./../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-48b39499&file=Tab.vue&scoped=true!./../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./Tab.vue", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js?sourceMap!./../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-48b39499&file=Tab.vue&scoped=true!./../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./Tab.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(9)();
	// imports
	
	
	// module
	exports.push([module.id, "\n.tab-content > .tab-pane[_v-48b39499] {\n   overflow: auto;\n  -webkit-overflow-scrolling: touch;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: -webkit-box;\n  display: flex;\n  -webkit-flex: 0 1 auto;\n  -ms-flex: 0 1 auto;\n  -webkit-box-flex: 0;\n          flex: 0 1 auto;\n  width: 100%;\n  \n  height: 100%;\n  -webkit-flex-flow:column nowrap;\n      -ms-flex-flow:column nowrap;\n          flex-flow:column nowrap;\n}\n", "", {"version":3,"sources":["/./src/components/Tab.vue?6e963178"],"names":[],"mappings":";AA0DA;GACA,eAAA;EACA,kCAAA;EACA,sBAAA;EACA,qBAAA;EACA,qBAAA;EAAA,cAAA;EACA,uBAAA;EACA,mBAAA;EACA,oBAAA;UAAA,eAAA;EACA,YAAA;;EAEA,aAAA;EACA,gCAAA;MAAA,4BAAA;UAAA,wBAAA;CACA","file":"Tab.vue","sourcesContent":["<template>\r\n    <div role=\"tabpanel\" class=\"tab-pane\"\r\n        v-bind:class=\"{hide:!show}\"\r\n        v-show=\"show\"\r\n        :transition=\"transition\"\r\n    >\r\n    <slot></slot>\r\n  </div>\r\n</template>\r\n\r\n<script>\r\n  export default {\r\n    props: {\r\n      header: {\r\n        type: String\r\n      },\r\n      disabled: {\r\n        type: Boolean,\r\n        default: false\r\n      }\r\n    },\r\n    data() {\r\n      return {\r\n        index: 0,\r\n        show: false\r\n      }\r\n    },\r\n    computed: {\r\n      show() {\r\n        return (this.$parent.activeIndex == this.index);\r\n      },\r\n      transition() {\r\n        return this.$parent.effect\r\n      }\r\n    },\r\n    created() {\r\n       console.log(\"进入tabItem created\")\r\n      \r\n        this.$parent.tabItems.push({\r\n          header: this.header,\r\n          disabled: this.disabled\r\n        })\r\n    },\r\n    ready() {\r\n       console.log(\"进入tabItem ready\")\r\n        for (var c in this.$parent.$children)\r\n        {\r\n            if (this.$parent.$children[c].$el == this.$el)\r\n            {\r\n                this.index= c;\r\n                break;\r\n            }\r\n        }\r\n    }\r\n  }\r\n</script>\r\n\r\n<style scoped>\r\n  .tab-content > .tab-pane {\r\n     overflow: auto;\r\n    -webkit-overflow-scrolling: touch;\r\n    display: -webkit-flex;\r\n    display: -ms-flexbox;\r\n    display: flex;\r\n    -webkit-flex: 0 1 auto;\r\n    -ms-flex: 0 1 auto;\r\n    flex: 0 1 auto;\r\n    width: 100%;\r\n    \r\n    height: 100%;\r\n    flex-flow:column nowrap;\r\n  }\r\n</style>\r\n"],"sourceRoot":"webpack://"}]);
	
	// exports


/***/ },
/* 38 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	// <template>
	//     <div role="tabpanel" class="tab-pane"
	//         v-bind:class="{hide:!show}"
	//         v-show="show"
	//         :transition="transition"
	//     >
	//     <slot></slot>
	//   </div>
	// </template>
	
	// <script>
	exports.default = {
	  props: {
	    header: {
	      type: String
	    },
	    disabled: {
	      type: Boolean,
	      default: false
	    }
	  },
	  data: function data() {
	    return {
	      index: 0,
	      show: false
	    };
	  },
	
	  computed: {
	    show: function show() {
	      return this.$parent.activeIndex == this.index;
	    },
	    transition: function transition() {
	      return this.$parent.effect;
	    }
	  },
	  created: function created() {
	    console.log("进入tabItem created");
	
	    this.$parent.tabItems.push({
	      header: this.header,
	      disabled: this.disabled
	    });
	  },
	  ready: function ready() {
	    console.log("进入tabItem ready");
	    for (var c in this.$parent.$children) {
	      if (this.$parent.$children[c].$el == this.$el) {
	        this.index = c;
	        break;
	      }
	    }
	  }
	};
	// </script>

	// <style scoped>
	//   .tab-content > .tab-pane {
	//      overflow: auto;
	//     -webkit-overflow-scrolling: touch;
	//     display: -webkit-flex;
	//     display: -ms-flexbox;
	//     display: flex;
	//     -webkit-flex: 0 1 auto;
	//     -ms-flex: 0 1 auto;
	//     flex: 0 1 auto;
	//     width: 100%;

	//     height: 100%;
	//     flex-flow:column nowrap;
	//   }
	// </style>

	/* generated by vue-loader */

/***/ },
/* 39 */
/***/ function(module, exports) {

	module.exports = "\n  <div role=\"tabpanel\" class=\"tab-pane\" v-bind:class=\"{hide:!show}\" v-show=\"show\" :transition=\"transition\" _v-48b39499=\"\">\n  <slot _v-48b39499=\"\"></slot>\n</div>\n";

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__webpack_require__(41)
	__vue_script__ = __webpack_require__(43)
	__vue_template__ = __webpack_require__(44)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) { (typeof module.exports === "function" ? module.exports.options : module.exports).template = __vue_template__ }
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), true)
	  if (!hotAPI.compatible) return
	  var id = "E:\\workspace\\mobile-dev\\src\\components\\Loading.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(42);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(10)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js?sourceMap!./../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-33df34c0&file=Loading.vue&scoped=true!./../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./Loading.vue", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js?sourceMap!./../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-33df34c0&file=Loading.vue&scoped=true!./../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./Loading.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(9)();
	// imports
	
	
	// module
	exports.push([module.id, "\n\t\n\t.modal[_v-33df34c0]{\n\t\tdisplay: -webkit-box;\n\t\tdisplay: -webkit-flex;\n\t\tdisplay: -ms-flexbox;\n\t\tdisplay: flex;\n        -webkit-flex-flow: row nowrap;\n            -ms-flex-flow: row nowrap;\n                flex-flow: row nowrap;\n        -webkit-box-pack: center;\n        -webkit-justify-content: center;\n            -ms-flex-pack: center;\n                justify-content: center;\n        height:100%;\n        width: 100%;\n        -webkit-box-align:  center;\n        -webkit-align-items:  center;\n            -ms-flex-align:  center;\n                align-items:  center;\n        position: absolute;\n        /*visibility: hidden;*/\n        left: 0;\n        top: 0;\n        z-index: 100;\n        background-color: rgba(153,153,153,0.5);/* IE9、标准浏览器、IE6和部分IE7内核的浏览器(如QQ浏览器)会读懂 */\n\t}\n\n\n\n\t   .spinner[_v-33df34c0] {\n            width: 100px;\n            height: 60px;\n            font-size: 10px;\n        }\n        \n        .spinner > div[_v-33df34c0] {\n            background-color: limegreen;\n            height: 100%;\n            width: 6px;\n            display: inline-block;\n            -webkit-animation: stretchdelay 1.2s infinite ease-in-out;\n            animation: stretchdelay 1.2s infinite ease-in-out;\n        }\n        \n        .spinner .spinnerBar2[_v-33df34c0] {\n            -webkit-animation-delay: -1.1s;\n            animation-delay: -1.1s;\n        }\n        \n        .spinner .spinnerBar3[_v-33df34c0] {\n            -webkit-animation-delay: -1.0s;\n            animation-delay: -1.0s;\n        }\n        \n        .spinner .spinnerBar4[_v-33df34c0] {\n            -webkit-animation-delay: -0.9s;\n            animation-delay: -0.9s;\n        }\n        \n        .spinner .spinnerBar5[_v-33df34c0] {\n            -webkit-animation-delay: -0.8s;\n            animation-delay: -0.8s;\n        }\n        \n        @-webkit-keyframes stretchdelay {\n            0%,\n            40%,\n            100% {\n                -webkit-transform: scaleY(0.4)\n            }\n            20% {\n                -webkit-transform: scaleY(1.0)\n            }\n        }\n        \n        @keyframes stretchdelay {\n            0%,\n            40%,\n            100% {\n                transform: scaleY(0.4);\n                -webkit-transform: scaleY(0.4);\n            }\n            20% {\n                transform: scaleY(1.0);\n                -webkit-transform: scaleY(1.0);\n            }\n        }\n\n", "", {"version":3,"sources":["/./src/components/Loading.vue?68dc5e32"],"names":[],"mappings":";;CAiCA;EACA,qBAAA;EAAA,sBAAA;EAAA,qBAAA;EAAA,cAAA;QACA,8BAAA;YAAA,0BAAA;gBAAA,sBAAA;QACA,yBAAA;QAAA,gCAAA;YAAA,sBAAA;gBAAA,wBAAA;QACA,YAAA;QACA,YAAA;QACA,2BAAA;QAAA,6BAAA;YAAA,wBAAA;gBAAA,qBAAA;QACA,mBAAA;QACA,uBAAA;QACA,QAAA;QACA,OAAA;QACA,aAAA;QACA,wCAAA,0CAAA;EACA;;;;IAIA;YACA,aAAA;YACA,aAAA;YACA,gBAAA;SACA;;QAEA;YACA,4BAAA;YACA,aAAA;YACA,WAAA;YACA,sBAAA;YACA,0DAAA;YACA,kDAAA;SACA;;QAEA;YACA,+BAAA;YACA,uBAAA;SACA;;QAEA;YACA,+BAAA;YACA,uBAAA;SACA;;QAEA;YACA,+BAAA;YACA,uBAAA;SACA;;QAEA;YACA,+BAAA;YACA,uBAAA;SACA;;QAEA;YACA;;;gBAGA,8BAAA;aACA;YACA;gBACA,8BAAA;aACA;SACA;;QAEA;YACA;;;gBAGA,uBAAA;gBACA,+BAAA;aACA;YACA;gBACA,uBAAA;gBACA,+BAAA;aACA;SACA","file":"Loading.vue","sourcesContent":["<template>\r\n\t<div class=\"modal\" v-if=\"loading\">\r\n        <div class=\"spinner\">\r\n            <div class=\"spinnerBar1\"></div>\r\n            <div class=\"spinnerBar2\"></div>\r\n            <div class=\"spinnerBar3\"></div>\r\n            <div class=\"spinnerBar4\"></div>\r\n            <div class=\"spinnerBar5\"></div>\r\n        </div>\r\n    </div>\r\n</template>\r\n\r\n\r\n<script lang=\"babel\">\r\n\t\r\n\texport default {\r\n        created(){\r\n            console.log(\"loading is created\")\r\n            console.log(this.loading);\r\n        },\r\n\t\tprops:{\r\n\t\t\tloading:{\r\n\t\t\t\ttype:Boolean,\r\n\t\t\t\tdefault:false\r\n\t\t\t}\r\n\t\t}\r\n\t}\r\n\r\n</script>\r\n\r\n\r\n<style type=\"text/css\" scoped>\r\n\t\r\n\t.modal{\r\n\t\tdisplay: flex;\r\n        flex-flow: row nowrap;\r\n        justify-content: center;\r\n        height:100%;\r\n        width: 100%;\r\n        align-items:  center;\r\n        position: absolute;\r\n        /*visibility: hidden;*/\r\n        left: 0;\r\n        top: 0;\r\n        z-index: 100;\r\n        background-color: rgba(153,153,153,0.5);/* IE9、标准浏览器、IE6和部分IE7内核的浏览器(如QQ浏览器)会读懂 */\r\n\t}\r\n\r\n\r\n\r\n\t   .spinner {\r\n            width: 100px;\r\n            height: 60px;\r\n            font-size: 10px;\r\n        }\r\n        \r\n        .spinner > div {\r\n            background-color: limegreen;\r\n            height: 100%;\r\n            width: 6px;\r\n            display: inline-block;\r\n            -webkit-animation: stretchdelay 1.2s infinite ease-in-out;\r\n            animation: stretchdelay 1.2s infinite ease-in-out;\r\n        }\r\n        \r\n        .spinner .spinnerBar2 {\r\n            -webkit-animation-delay: -1.1s;\r\n            animation-delay: -1.1s;\r\n        }\r\n        \r\n        .spinner .spinnerBar3 {\r\n            -webkit-animation-delay: -1.0s;\r\n            animation-delay: -1.0s;\r\n        }\r\n        \r\n        .spinner .spinnerBar4 {\r\n            -webkit-animation-delay: -0.9s;\r\n            animation-delay: -0.9s;\r\n        }\r\n        \r\n        .spinner .spinnerBar5 {\r\n            -webkit-animation-delay: -0.8s;\r\n            animation-delay: -0.8s;\r\n        }\r\n        \r\n        @-webkit-keyframes stretchdelay {\r\n            0%,\r\n            40%,\r\n            100% {\r\n                -webkit-transform: scaleY(0.4)\r\n            }\r\n            20% {\r\n                -webkit-transform: scaleY(1.0)\r\n            }\r\n        }\r\n        \r\n        @keyframes stretchdelay {\r\n            0%,\r\n            40%,\r\n            100% {\r\n                transform: scaleY(0.4);\r\n                -webkit-transform: scaleY(0.4);\r\n            }\r\n            20% {\r\n                transform: scaleY(1.0);\r\n                -webkit-transform: scaleY(1.0);\r\n            }\r\n        }\r\n\r\n</style>"],"sourceRoot":"webpack://"}]);
	
	// exports


/***/ },
/* 43 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	        value: true
	});
	// <template>
	// 	<div class="modal" v-if="loading">
	//         <div class="spinner">
	//             <div class="spinnerBar1"></div>
	//             <div class="spinnerBar2"></div>
	//             <div class="spinnerBar3"></div>
	//             <div class="spinnerBar4"></div>
	//             <div class="spinnerBar5"></div>
	//         </div>
	//     </div>
	// </template>
	
	// <script lang="babel">
	
	exports.default = {
	        created: function created() {
	                console.log("loading is created");
	                console.log(this.loading);
	        },
	
	        props: {
	                loading: {
	                        type: Boolean,
	                        default: false
	                }
	        }
	};
	
	// </script>

	// <style type="text/css" scoped>

	// 	.modal{
	// 		display: flex;
	//         flex-flow: row nowrap;
	//         justify-content: center;
	//         height:100%;
	//         width: 100%;
	//         align-items:  center;
	//         position: absolute;
	//         /*visibility: hidden;*/
	//         left: 0;
	//         top: 0;
	//         z-index: 100;
	//         background-color: rgba(153,153,153,0.5);/* IE9、标准浏览器、IE6和部分IE7内核的浏览器(如QQ浏览器)会读懂 */
	// 	}

	// 	   .spinner {
	//             width: 100px;
	//             height: 60px;
	//             font-size: 10px;
	//         }

	//         .spinner > div {
	//             background-color: limegreen;
	//             height: 100%;
	//             width: 6px;
	//             display: inline-block;
	//             -webkit-animation: stretchdelay 1.2s infinite ease-in-out;
	//             animation: stretchdelay 1.2s infinite ease-in-out;
	//         }

	//         .spinner .spinnerBar2 {
	//             -webkit-animation-delay: -1.1s;
	//             animation-delay: -1.1s;
	//         }

	//         .spinner .spinnerBar3 {
	//             -webkit-animation-delay: -1.0s;
	//             animation-delay: -1.0s;
	//         }

	//         .spinner .spinnerBar4 {
	//             -webkit-animation-delay: -0.9s;
	//             animation-delay: -0.9s;
	//         }

	//         .spinner .spinnerBar5 {
	//             -webkit-animation-delay: -0.8s;
	//             animation-delay: -0.8s;
	//         }

	//         @-webkit-keyframes stretchdelay {
	//             0%,
	//             40%,
	//             100% {
	//                 -webkit-transform: scaleY(0.4)
	//             }
	//             20% {
	//                 -webkit-transform: scaleY(1.0)
	//             }
	//         }

	//         @keyframes stretchdelay {
	//             0%,
	//             40%,
	//             100% {
	//                 transform: scaleY(0.4);
	//                 -webkit-transform: scaleY(0.4);
	//             }
	//             20% {
	//                 transform: scaleY(1.0);
	//                 -webkit-transform: scaleY(1.0);
	//             }
	//         }

	// </style>

/***/ },
/* 44 */
/***/ function(module, exports) {

	module.exports = "\n\t<div class=\"modal\" v-if=\"loading\" _v-33df34c0=\"\">\n        <div class=\"spinner\" _v-33df34c0=\"\">\n            <div class=\"spinnerBar1\" _v-33df34c0=\"\"></div>\n            <div class=\"spinnerBar2\" _v-33df34c0=\"\"></div>\n            <div class=\"spinnerBar3\" _v-33df34c0=\"\"></div>\n            <div class=\"spinnerBar4\" _v-33df34c0=\"\"></div>\n            <div class=\"spinnerBar5\" _v-33df34c0=\"\"></div>\n        </div>\n    </div>\n";

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__webpack_require__(46)
	__vue_script__ = __webpack_require__(48)
	__vue_template__ = __webpack_require__(50)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) { (typeof module.exports === "function" ? module.exports.options : module.exports).template = __vue_template__ }
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), true)
	  if (!hotAPI.compatible) return
	  var id = "E:\\workspace\\mobile-dev\\src\\components\\PullList.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(47);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(10)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js?sourceMap!./../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-50a8202f&file=PullList.vue!./../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./PullList.vue", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js?sourceMap!./../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-50a8202f&file=PullList.vue!./../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./PullList.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(9)();
	// imports
	
	
	// module
	exports.push([module.id, "\n\n\t/*list集合*/\n\t.pull-list{\n\t\tdisplay: -webkit-box;\n\t\tdisplay: -webkit-flex;\n\t\tdisplay: -ms-flexbox;\n\t\tdisplay: flex;\n\t   \t-webkit-flex-flow:column nowrap;\n\t   \t    -ms-flex-flow:column nowrap;\n\t   \t        flex-flow:column nowrap;\n\t  \tmin-height: 120px;\n\t  \t-webkit-box-pack:start;\n\t  \t-webkit-justify-content:flex-start;\n\t  \t    -ms-flex-pack:start;\n\t  \t        justify-content:flex-start;\n\t  \t-webkit-box-flex:0;\n\t  \t-webkit-flex:0 1 auto;\n\t  \t    -ms-flex:0 1 auto;\n\t  \t        flex:0 1 auto;\n\t   \theight: 100%;\n\t}\n\n\t\n\t.pull-header,.pull-footer{\n\t     display: -webkit-box;\n\t     display: -webkit-flex;\n\t     display: -ms-flexbox;\n\t     display: flex;\n     \t -webkit-flex-flow:row nowrap;\n     \t     -ms-flex-flow:row nowrap;\n     \t         flex-flow:row nowrap;\n\t     min-height: 60px;\n\t     height: 60px;\n\t     -webkit-box-pack:center;\n\t     -webkit-justify-content:center;\n\t         -ms-flex-pack:center;\n\t             justify-content:center;\n\t     -webkit-box-flex:0;\n\t     -webkit-flex:0 1 auto;\n\t         -ms-flex:0 1 auto;\n\t             flex:0 1 auto;\n\t     -webkit-box-align:center;\n\t     -webkit-align-items:center;\n\t         -ms-flex-align:center;\n\t             align-items:center;\n\t     aiign-content:center;\n\t}\n\n\t.pull-header{\n\t    \n\t\tmargin-top: -60px;\n\t\tborder-bottom: 1px solid whitesmoke;\n\n\t}\n\t.pull-footer{\n\t\tmargin-bottom: -60px;\n\t\tborder-top: 1px solid whitesmoke;\n\t}\n\n\t.pull-header>img,.pull-footer>img{\n\t\t -webkit-transition: -webkit-transform .3s ease;\n\t\t transition: -webkit-transform .3s ease;\n\t\t transition: transform .3s ease;\n\t\t transition: transform .3s ease, -webkit-transform .3s ease;\n\t      -moz-transition: transform .3s ease;/* Firefox 4 */\n\t      -webkit-transition: transform .3s ease; /* Safari 和 Chrome */\n\t      -o-transition: transform .3s ease; /* Opera */\n\t}\n\n\n\t.pull-header>div,.pull-footer>div{\n\t\tfont-size: 12px;\n\t\tmargin-left: 12px;\n\t}\n\t\n\n\t.pull-content{\n\t\toverflow: auto;\n\t    -webkit-overflow-scrolling: touch;\n\t    display: -webkit-flex;\n\t    display: -ms-flexbox;\n\t    display: -webkit-box;\n\t    display: flex;\n\t    -webkit-flex: 0 1 auto;\n\t    -ms-flex: 0 1 auto;\n\t    -webkit-box-flex: 0;\n\t            flex: 0 1 auto;\n\t    margin-bottom: 10px;\n\t    margin: 0px;\n\t    -webkit-flex-flow:column nowrap;\n\t        -ms-flex-flow:column nowrap;\n\t            flex-flow:column nowrap;\n\t    padding: 0px;\n\t}\n", "", {"version":3,"sources":["/./src/components/PullList.vue?43b1ca1c"],"names":[],"mappings":";;CAyJA,UAAA;CACA;EACA,qBAAA;EAAA,sBAAA;EAAA,qBAAA;EAAA,cAAA;KACA,gCAAA;SAAA,4BAAA;aAAA,wBAAA;IACA,kBAAA;IACA,uBAAA;IAAA,mCAAA;QAAA,oBAAA;YAAA,2BAAA;IACA,mBAAA;IAAA,sBAAA;QAAA,kBAAA;YAAA,cAAA;KACA,aAAA;EACA;;;CAGA;MACA,qBAAA;MAAA,sBAAA;MAAA,qBAAA;MAAA,cAAA;OACA,6BAAA;WAAA,yBAAA;eAAA,qBAAA;MACA,iBAAA;MACA,aAAA;MACA,wBAAA;MAAA,+BAAA;UAAA,qBAAA;cAAA,uBAAA;MACA,mBAAA;MAAA,sBAAA;UAAA,kBAAA;cAAA,cAAA;MACA,yBAAA;MAAA,2BAAA;UAAA,sBAAA;cAAA,mBAAA;MACA,qBAAA;EACA;;CAEA;;EAEA,kBAAA;EACA,oCAAA;;EAEA;CACA;EACA,qBAAA;EACA,iCAAA;EACA;;CAEA;GACA,+CAAA;GAAA,uCAAA;GAAA,+BAAA;GAAA,2DAAA;OACA,oCAAA,eAAA;OACA,uCAAA,CAAA,qBAAA;OACA,kCAAA,CAAA,WAAA;EACA;;;CAGA;EACA,gBAAA;EACA,kBAAA;EACA;;;CAGA;EACA,eAAA;KACA,kCAAA;KACA,sBAAA;KACA,qBAAA;KACA,qBAAA;KAAA,cAAA;KACA,uBAAA;KACA,mBAAA;KACA,oBAAA;aAAA,eAAA;KACA,oBAAA;KACA,YAAA;KACA,gCAAA;SAAA,4BAAA;aAAA,wBAAA;KACA,aAAA;EACA","file":"PullList.vue","sourcesContent":["<!-- 下拉刷新组件 -->\r\n\r\n<template>\r\n\t<section class=\"pull-list\" v-touch:pandown=\"pullToRefresh\" v-touch:panup=\"loadMore\" v-touch:panend=\"panleave\"   >\r\n\t\t<header class=\"pull-header\">\r\n\t\t\t<div>\r\n\t\t\t\t<img class=\"downImg\" src=\"../assets/images/components/icon-down.png\" alt=\"下拉\">\r\n\t\t\t</div>\r\n\t\t\t<div>\r\n\t\t\t\t<p>{{refreshText}}</p>\r\n\t\t\t\t<p>最后更新:{{rlastTime}}</p>\r\n\t\t\t</div>\r\n\t\t</header>\r\n\t\t<div class=\"pull-content\" v-on:scroll=\"scroll($event)\" v-el:listContent>\r\n\t\t\t<slot ></slot>\r\n\t\t</div>\r\n\t\t<footer class=\"pull-footer\" v-show=\"showfooter\">\r\n\t\t\t<div>\r\n\t\t\t\t<img class=\"upImg\" src=\"../assets/images/components/icon-up.png\" alt=\"上拉\">\r\n\t\t\t</div>\r\n\t\t\t<div>\r\n\t\t\t\t<p>{{moreText}}</p>\r\n\t\t\t\t<p>最后更新:{{mlastTime}}</p>\r\n\t\t\t</div>\r\n\t\t</footer>\r\n\t</section>\r\n\t\r\n</template>\r\n\r\n<script lang=\"babel\">\r\n\r\n\timport dateHelper from './utils/DateHelper.js'\r\n\r\n\texport default {\r\n\t\tdata(){\r\n\t\t\treturn {\r\n\t\t\t\trlastTime:'',\r\n\t\t\t\tmlastTime:'',\r\n\t\t\t\trefreshText:'下拉刷新',\r\n\t\t\t\tmoreText:'加载更多',\r\n\t\t\t\t//是否触发事件\r\n\t\t\t\tisRefresh:false,\r\n\t\t\t\t//是否显示底部加载更多\r\n\t\t\t\tshowfooter:false,\r\n\t\t\t\t//下拉和上拉的标识\r\n\t\t\t\tarrow:'down',\r\n\t\t\t\t//滚动条是否在顶部\r\n\t\t\t\ttop:0,\r\n\t\t\t\t//滚动条是否在底部\r\n\t\t\t\tisBottom:false,\r\n\t\t\t\t//屏幕的高度\r\n\t\t\t\tregionHeight:100,\r\n\t\t\t\t//内容的高度\r\n\t\t\t\twinHeight:100\r\n\t\t\t}\r\n\t\t},\r\n\t\tready(){\r\n\t\t\t//得到对应的高度\r\n\t\t\tthis.regionHeight=this.$el.offsetHeight;\r\n\t\t\tvar listObj=this.$el.getElementsByTagName('ul')[0];\r\n\t\t\tthis.winHeight=listObj.offsetHeight;\r\n\t\t\tconsole.log(\"可见区域的高度：\"+this.regionHeight+\"-内容总高度:\"+this.winHeight);\r\n\r\n\t\t},\r\n\t\tmethods:{\r\n\r\n\t\t\tmove(height){\r\n\t\t\t\tvar list=this.$el;\r\n\t\t\t\t//获取角度\r\n\t\t\t\tvar rotateHeight=height<90?height*2:180;\r\n\t\t\t\tif(this.arrow==\"down\"){\r\n\t\t\t\t\tlist.style.transform=\"translateY(\"+height+\"px)\";\r\n\t\t\t\t\tvar img=list.getElementsByTagName('header')[0].getElementsByTagName('img')[0];\r\n\t\t\t\t\timg.style.transform=\"rotate(\"+rotateHeight+\"deg)\"\r\n\t\t\t\t}else{\r\n\t\t\t\t\tlist.style.transform=\"translateY(-\"+height+\"px)\";\r\n\t\t\t\t\t//先检查底部的div是否显示出来,如果显示出来了,那么在找到对应的图标\r\n\t\t\t\t\tif(list.getElementsByTagName('footer')[0]){\r\n\t\t\t\t\t\tvar img=list.getElementsByTagName('footer')[0].getElementsByTagName('img')[0];\r\n\t\t\t\t\t\timg.style.transform=\"rotate(\"+rotateHeight+\"deg)\"\r\n\t\t\t\t\t}\r\n\t\t\t\t}\r\n\t\t\t},\r\n\t\t\t//检查是否滚动到底部,滚动到底部触发上拉加载更多的事件\r\n\t\t\tscroll(e){\r\n\t\t\t\tthis.top=e.target.scrollTop;\r\n\t\t\t\tif(this.top+this.regionHeight>this.winHeight){\r\n\t\t\t\t\tthis.isBottom=true;\r\n\t\t\t\t}else{\r\n\t\t\t\t\tthis.isBottom=false;\r\n\t\t\t\t}\r\n\t\t\t},\r\n\t\t\tgetCurTime(){\r\n\t\t\t\t var date=new Date();\r\n\t\t\t\t// return date.getFullYear()+\"\"\r\n\t\t\t},\r\n\t\t\tpanleave(e){\r\n\t\t\t\t\r\n\t\t\t\tif(this.arrow==\"down\"){\r\n\t\t\t\t\tthis.move(0)\r\n\t\t\t\t\tthis.refreshText=\"下拉刷新\";\r\n\t\t\t\t\t//得到当前的时间\r\n\t\t\t\t\tif(this.isRefresh){\r\n\t\t\t\t\t\tthis.isRefresh=false;\r\n\t\t\t\t\t\tthis.rlastTime=dateHelper.getNowDate(\"yyyy-MM-dd HH:mm:ss\");\r\n\t\t\t\t\t\tthis.$emit('reload');\r\n\t\t\t\t\t}\r\n\t\t\t\t\t// this.$broadcast('list-reload');\r\n\t\t\t\t}else if(this.arrow==\"up\"){\r\n\t\t\t\t\tthis.showfooter=false;\r\n\t\t\t\t\tthis.moreText=\"加载更多\";\r\n\t\t\t\t\tthis.move(0)\r\n\t\t\t\t\tif(this.isRefresh){\r\n\t\t\t\t\t\tthis.isRefresh=false;\r\n\t\t\t\t\t\tthis.mlastTime=dateHelper.getNowDate(\"yyyy-MM-dd HH:mm:ss\");\r\n\t\t\t\t\t\tthis.$emit('loadmore');\r\n\t\t\t\t\t}\r\n\t\t\t\t}\r\n\t\t\t},\r\n\t\t\t// 下拉刷新事件\r\n\t\t\tpullToRefresh(e){\r\n\t\t\t\tif(this.top==0){\r\n\t\t\t\t \tvar distance=e.distance;\r\n\t\t\t\t \tthis.arrow='down';\r\n\t\t\t\t \tthis.move(distance);\r\n\t\t\t\t \tif(distance>90){\r\n\t\t\t\t\t\tthis.refreshText=\"松开后刷新\";\r\n\t\t\t\t \t\tthis.isRefresh=true;\r\n\t\t\t\t \t}\r\n\t\t\t\t}\r\n\t\t\t},\r\n\t\t\t//加载更多\r\n\t\t\tloadMore(e){\r\n\t\t\t\t//判断滚动的距离+当前窗口的宽度是否\r\n\t\t\t\tif(this.isBottom){\r\n\t\t\t\t\tthis.showfooter=true;\r\n\t\t\t\t\tthis.arrow='up';\r\n\t\t\t\t\tvar distance=e.distance;\r\n\t\t\t\t \t// console.log(\"拉动的距离\"+distance)\r\n\t\t\t\t \tthis.move(distance);\r\n\t\t\t\t \tif(distance>90){\r\n\t\t\t\t\t\tthis.moreText=\"松开后刷新\";\r\n\t\t\t\t \t\tthis.isRefresh=true;\r\n\t\t\t\t \t}\r\n\t\t\t\t}\r\n\t\t\t}\r\n\t\t}\r\n\t}\r\n</script>\r\n\r\n\r\n<style >\r\n\r\n\t/*list集合*/\r\n\t.pull-list{\r\n\t\tdisplay: flex;\r\n\t   \tflex-flow:column nowrap;\r\n\t  \tmin-height: 120px;\r\n\t  \tjustify-content:flex-start;\r\n\t  \tflex:0 1 auto;\r\n\t   \theight: 100%;\r\n\t}\r\n\r\n\t\r\n\t.pull-header,.pull-footer{\r\n\t     display: flex;\r\n     \t flex-flow:row nowrap;\r\n\t     min-height: 60px;\r\n\t     height: 60px;\r\n\t     justify-content:center;\r\n\t     flex:0 1 auto;\r\n\t     align-items:center;\r\n\t     aiign-content:center;\r\n\t}\r\n\r\n\t.pull-header{\r\n\t    \r\n\t\tmargin-top: -60px;\r\n\t\tborder-bottom: 1px solid whitesmoke;\r\n\r\n\t}\r\n\t.pull-footer{\r\n\t\tmargin-bottom: -60px;\r\n\t\tborder-top: 1px solid whitesmoke;\r\n\t}\r\n\r\n\t.pull-header>img,.pull-footer>img{\r\n\t\t transition: transform .3s ease;\r\n\t      -moz-transition: transform .3s ease;/* Firefox 4 */\r\n\t      -webkit-transition: transform .3s ease; /* Safari 和 Chrome */\r\n\t      -o-transition: transform .3s ease; /* Opera */\r\n\t}\r\n\r\n\r\n\t.pull-header>div,.pull-footer>div{\r\n\t\tfont-size: 12px;\r\n\t\tmargin-left: 12px;\r\n\t}\r\n\t\r\n\r\n\t.pull-content{\r\n\t\toverflow: auto;\r\n\t    -webkit-overflow-scrolling: touch;\r\n\t    display: -webkit-flex;\r\n\t    display: -ms-flexbox;\r\n\t    display: flex;\r\n\t    -webkit-flex: 0 1 auto;\r\n\t    -ms-flex: 0 1 auto;\r\n\t    flex: 0 1 auto;\r\n\t    margin-bottom: 10px;\r\n\t    margin: 0px;\r\n\t    flex-flow:column nowrap;\r\n\t    padding: 0px;\r\n\t}\r\n</style>"],"sourceRoot":"webpack://"}]);
	
	// exports


/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _DateHelper = __webpack_require__(49);
	
	var _DateHelper2 = _interopRequireDefault(_DateHelper);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = {
		data: function data() {
			return {
				rlastTime: '',
				mlastTime: '',
				refreshText: '下拉刷新',
				moreText: '加载更多',
				//是否触发事件
				isRefresh: false,
				//是否显示底部加载更多
				showfooter: false,
				//下拉和上拉的标识
				arrow: 'down',
				//滚动条是否在顶部
				top: 0,
				//滚动条是否在底部
				isBottom: false,
				//屏幕的高度
				regionHeight: 100,
				//内容的高度
				winHeight: 100
			};
		},
		ready: function ready() {
			//得到对应的高度
			this.regionHeight = this.$el.offsetHeight;
			var listObj = this.$el.getElementsByTagName('ul')[0];
			this.winHeight = listObj.offsetHeight;
			console.log("可见区域的高度：" + this.regionHeight + "-内容总高度:" + this.winHeight);
		},
	
		methods: {
			move: function move(height) {
				var list = this.$el;
				//获取角度
				var rotateHeight = height < 90 ? height * 2 : 180;
				if (this.arrow == "down") {
					list.style.transform = "translateY(" + height + "px)";
					var img = list.getElementsByTagName('header')[0].getElementsByTagName('img')[0];
					img.style.transform = "rotate(" + rotateHeight + "deg)";
				} else {
					list.style.transform = "translateY(-" + height + "px)";
					//先检查底部的div是否显示出来,如果显示出来了,那么在找到对应的图标
					if (list.getElementsByTagName('footer')[0]) {
						var img = list.getElementsByTagName('footer')[0].getElementsByTagName('img')[0];
						img.style.transform = "rotate(" + rotateHeight + "deg)";
					}
				}
			},
	
			//检查是否滚动到底部,滚动到底部触发上拉加载更多的事件
			scroll: function scroll(e) {
				this.top = e.target.scrollTop;
				if (this.top + this.regionHeight > this.winHeight) {
					this.isBottom = true;
				} else {
					this.isBottom = false;
				}
			},
			getCurTime: function getCurTime() {
				var date = new Date();
				// return date.getFullYear()+""
			},
			panleave: function panleave(e) {
	
				if (this.arrow == "down") {
					this.move(0);
					this.refreshText = "下拉刷新";
					//得到当前的时间
					if (this.isRefresh) {
						this.isRefresh = false;
						this.rlastTime = _DateHelper2.default.getNowDate("yyyy-MM-dd HH:mm:ss");
						this.$emit('reload');
					}
					// this.$broadcast('list-reload');
				} else if (this.arrow == "up") {
						this.showfooter = false;
						this.moreText = "加载更多";
						this.move(0);
						if (this.isRefresh) {
							this.isRefresh = false;
							this.mlastTime = _DateHelper2.default.getNowDate("yyyy-MM-dd HH:mm:ss");
							this.$emit('loadmore');
						}
					}
			},
	
			// 下拉刷新事件
			pullToRefresh: function pullToRefresh(e) {
				if (this.top == 0) {
					var distance = e.distance;
					this.arrow = 'down';
					this.move(distance);
					if (distance > 90) {
						this.refreshText = "松开后刷新";
						this.isRefresh = true;
					}
				}
			},
	
			//加载更多
			loadMore: function loadMore(e) {
				//判断滚动的距离+当前窗口的宽度是否
				if (this.isBottom) {
					this.showfooter = true;
					this.arrow = 'up';
					var distance = e.distance;
					// console.log("拉动的距离"+distance)
					this.move(distance);
					if (distance > 90) {
						this.moreText = "松开后刷新";
						this.isRefresh = true;
					}
				}
			}
		}
	};
	// </script>

	// <style >

	// 	/*list集合*/
	// 	.pull-list{
	// 		display: flex;
	// 	   	flex-flow:column nowrap;
	// 	  	min-height: 120px;
	// 	  	justify-content:flex-start;
	// 	  	flex:0 1 auto;
	// 	   	height: 100%;
	// 	}

	// 	.pull-header,.pull-footer{
	// 	     display: flex;
	//      	 flex-flow:row nowrap;
	// 	     min-height: 60px;
	// 	     height: 60px;
	// 	     justify-content:center;
	// 	     flex:0 1 auto;
	// 	     align-items:center;
	// 	     aiign-content:center;
	// 	}

	// 	.pull-header{

	// 		margin-top: -60px;
	// 		border-bottom: 1px solid whitesmoke;

	// 	}
	// 	.pull-footer{
	// 		margin-bottom: -60px;
	// 		border-top: 1px solid whitesmoke;
	// 	}

	// 	.pull-header>img,.pull-footer>img{
	// 		 transition: transform .3s ease;
	// 	      -moz-transition: transform .3s ease;/* Firefox 4 */
	// 	      -webkit-transition: transform .3s ease; /* Safari 和 Chrome */
	// 	      -o-transition: transform .3s ease; /* Opera */
	// 	}

	// 	.pull-header>div,.pull-footer>div{
	// 		font-size: 12px;
	// 		margin-left: 12px;
	// 	}

	// 	.pull-content{
	// 		overflow: auto;
	// 	    -webkit-overflow-scrolling: touch;
	// 	    display: -webkit-flex;
	// 	    display: -ms-flexbox;
	// 	    display: flex;
	// 	    -webkit-flex: 0 1 auto;
	// 	    -ms-flex: 0 1 auto;
	// 	    flex: 0 1 auto;
	// 	    margin-bottom: 10px;
	// 	    margin: 0px;
	// 	    flex-flow:column nowrap;
	// 	    padding: 0px;
	// 	}
	// </style>
	// <!-- 下拉刷新组件 -->

	// <template>
	// 	<section class="pull-list" v-touch:pandown="pullToRefresh" v-touch:panup="loadMore" v-touch:panend="panleave"   >
	// 		<header class="pull-header">
	// 			<div>
	// 				<img class="downImg" src="../assets/images/components/icon-down.png" alt="下拉">
	// 			</div>
	// 			<div>
	// 				<p>{{refreshText}}</p>
	// 				<p>最后更新:{{rlastTime}}</p>
	// 			</div>
	// 		</header>
	// 		<div class="pull-content" v-on:scroll="scroll($event)" v-el:listContent>
	// 			<slot ></slot>
	// 		</div>
	// 		<footer class="pull-footer" v-show="showfooter">
	// 			<div>
	// 				<img class="upImg" src="../assets/images/components/icon-up.png" alt="上拉">
	// 			</div>
	// 			<div>
	// 				<p>{{moreText}}</p>
	// 				<p>最后更新:{{mlastTime}}</p>
	// 			</div>
	// 		</footer>
	// 	</section>

	// </template>

	// <script lang="babel">

/***/ },
/* 49 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	var DateHelper = {
		//获取档期的日期
	
		getNowDate: function getNowDate(formate) {
			var date = new Date();
			var year = date.getFullYear();
			var month = parseInt(date.getMonth() + 1) < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
			var day = date.getDate();
			var hour = date.getHours();
			var min = date.getMinutes();
			var sec = date.getSeconds();
			var result = "";
			if (formate.indexOf("yyyy") >= 0) {
				result = year;
			}
			if (formate.indexOf("MM") >= 0) {
				result += "-" + month;
			}
			if (formate.indexOf("dd") >= 0) {
				result += "-" + day;
			}
			if (formate.indexOf("HH") >= 0) {
				result += " " + hour;
			}
	
			if (formate.indexOf("mm") >= 0) {
				result += ":" + min;
			}
			if (formate.indexOf("ss") >= 0) {
				result += ":" + sec;
			}
			return result;
		}
	};
	
	exports.default = DateHelper;

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = "\n<section class=\"pull-list\" v-touch:pandown=\"pullToRefresh\" v-touch:panup=\"loadMore\" v-touch:panend=\"panleave\"   >\n\t<header class=\"pull-header\">\n\t\t<div>\n\t\t\t<img class=\"downImg\" src=\"" + __webpack_require__(51) + "\" alt=\"下拉\">\n\t\t</div>\n\t\t<div>\n\t\t\t<p>{{refreshText}}</p>\n\t\t\t<p>最后更新:{{rlastTime}}</p>\n\t\t</div>\n\t</header>\n\t<div class=\"pull-content\" v-on:scroll=\"scroll($event)\" v-el:listContent>\n\t\t<slot ></slot>\n\t</div>\n\t<footer class=\"pull-footer\" v-show=\"showfooter\">\n\t\t<div>\n\t\t\t<img class=\"upImg\" src=\"" + __webpack_require__(52) + "\" alt=\"上拉\">\n\t\t</div>\n\t\t<div>\n\t\t\t<p>{{moreText}}</p>\n\t\t\t<p>最后更新:{{mlastTime}}</p>\n\t\t</div>\n\t</footer>\n</section>\n\n";

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "icon-down.png?02ed8a17fc4b37001e3f4ed24ea2d91e";

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "icon-up.png?ce68cee9db0a441272f0bffa50364385";

/***/ },
/* 53 */
/***/ function(module, exports) {

	module.exports = "\n\t<div class=\"page\" _v-ecc3dad2=\"\">\n\t\t<toolbar :text=\"title\" _v-ecc3dad2=\"\">\n\t\t\t<span class=\"icon-reorder\" slot=\"leftBtn\" @click=\"openMenu\" _v-ecc3dad2=\"\"></span>\n            <span class=\"icon-refresh\" slot=\"rightBtn\" @click=\"refresh\" _v-ecc3dad2=\"\"></span>\n\t\t</toolbar>\n\t\t<div class=\"page-content\" _v-ecc3dad2=\"\">\n\t\t\t<tabs :active-index.sync=\"index\" _v-ecc3dad2=\"\">\n\t\t\t\t<tab v-for=\"item in tabItems\" :header=\"item.title\" _v-ecc3dad2=\"\">\n\t\t\t\t\t<pull-list _v-ecc3dad2=\"\">\n\t\t\t\t\t\t<ul class=\"contentList\" _v-ecc3dad2=\"\">\n\t\t\t\t\t\t\t<li v-for=\"subItem in item.infoList\" _v-ecc3dad2=\"\">\n\t\t\t\t\t\t\t\t<div class=\"tab_info\" _v-ecc3dad2=\"\">\n\t\t\t\t\t\t\t\t\t<div class=\"left\" _v-ecc3dad2=\"\">\n\t\t\t\t\t\t\t\t\t\t<img src=\"xxxHTMLLINKxxx0.140121794072911140.5722007197327912xxx\" alt=\"\" _v-ecc3dad2=\"\">\n\t\t\t\t\t\t\t\t\t\t<div class=\"content\" _v-ecc3dad2=\"\">\n\t\t\t\t\t\t\t\t\t\t\t<div _v-ecc3dad2=\"\">\n\t\t\t\t\t\t\t\t\t\t\t\t<span _v-ecc3dad2=\"\">发布时间:{{subItem.time}}</span>\n\t\t\t\t\t\t\t\t\t\t\t\t<span _v-ecc3dad2=\"\">发布人:{{subItem.subUser}}</span>\n\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t<div _v-ecc3dad2=\"\">\n\t\t\t\t\t\t\t\t\t\t\t\t{{subItem.content}}\n\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t<div _v-ecc3dad2=\"\">\n\t\t\t\t\t\t\t\t\t\t<i class=\"icon-chevron-right\" _v-ecc3dad2=\"\"></i>\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t</li>\n\t\t\t\t\t\t</ul>\n\t\t\t\t\t</pull-list>\n\t\t\t\t</tab>\n\t\t\t</tabs>\n\t\t</div>\n\t</div>\n\t\t\n\t<sidebar :menu-items=\"menuItems\" :show-menu.sync=\"showMenu\" _v-ecc3dad2=\"\">\n\t\t\n\t</sidebar>\n\n\t<loading :loading=\"isload\" _v-ecc3dad2=\"\"></loading>\n\n";

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__webpack_require__(55)
	__vue_script__ = __webpack_require__(57)
	__vue_template__ = __webpack_require__(63)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) { (typeof module.exports === "function" ? module.exports.options : module.exports).template = __vue_template__ }
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), true)
	  if (!hotAPI.compatible) return
	  var id = "E:\\workspace\\mobile-dev\\src\\views\\Project.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(56);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(10)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js?sourceMap!./../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-ba295ade&file=Project.vue&scoped=true!./../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./Project.vue", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js?sourceMap!./../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-ba295ade&file=Project.vue&scoped=true!./../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./Project.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(9)();
	// imports
	
	
	// module
	exports.push([module.id, "\n\n", "", {"version":3,"sources":[],"names":[],"mappings":"","file":"Project.vue","sourceRoot":"webpack://"}]);
	
	// exports


/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _ToolBar = __webpack_require__(12);
	
	var _ToolBar2 = _interopRequireDefault(_ToolBar);
	
	var _PullList = __webpack_require__(45);
	
	var _PullList2 = _interopRequireDefault(_PullList);
	
	var _ActionSheet = __webpack_require__(58);
	
	var _ActionSheet2 = _interopRequireDefault(_ActionSheet);
	
	var _Toast = __webpack_require__(131);
	
	var _Toast2 = _interopRequireDefault(_Toast);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	// <template>
	// 	<div class="page">
	// 		<toolbar text="我的项目">
	// 			<span class="icon-chevron-left" slot="leftBtn" v-touch:tap="back"></span>
	// 	        <span class="icon-refresh" slot="rightBtn" v-touch:tap="showSheet"></span>
	// 		</toolbar>
	// 		<div class="page-content" >
	// 			<pull-list v-on:reload="getInitData" v-on:loadmore="getMoreData">
	// 				<ul >
	// 					<li>asdffdddd;</li>
	// 					<li>asdfffffffffffffffffffffffffffffff;a</li>
	// 					<li>asdfffffffffffffffffffffffffffffff;</li>
	// 					<li>asdfffffffffffffffffffffffffffffff;</li>
	// 					<li>asdfffffffffffffffffffffffffffffff</li>
	// 					<li>asdfffffffffffffffffffffffffffffff</li>
	// 					<li>asdfffffffffffffffffffffffffffffff;</li>
	// 					<li>asdfffffffffffffffffffffffffffffff;</li>
	// 					<li>asdfffffffffffffffffffffffffffffff;</li>
	// 					<li>asdfffffffffffffffffffffffffffffff;a</li>
	// 					<li>asdfffffffffffffffffffffffffffffff;</li>
	// 					<li>asdfffffffffffffffffffffffffffffff;</li>
	// 					<li>asdfffffffffffffffffffffffffffffff</li>
	// 					<li>asdfffffffffffffffffffffffffffffff</li>
	// 					<li>asdfffffffffffffffffffffffffffffff;</li>
	// 					<li>asdfffffffffffffffffffffffffffffff;</li>
	// 					<li>asdfffffffffffffffffffffffffffffff;</li>
	// 					<li>asdfffffffffffffffffffffffffffffff;a</li>
	// 					<li>asdfffffffffffffffffffffffffffffff;</li>
	// 					<li>asdfffffffffffffffffffffffffffffff;</li>
	// 					<li>asdfffffffffffffffffffffffffffffff</li>
	// 					<li>asdfffffffffffffffffffffffffffffff</li>
	// 					<li>asdfffffffffffffffffffffffffffffff;</li>
	// 					<li>asdfffffffffffffffffffffffffffffff;</li>
	// 					<li>asdfffffffffffffffffffffffffffffff;</li>
	// 					<li>asdfffffffffffffffffffffffffffffff;a</li>
	// 					<li>asdfffffffffffffffffffffffffffffff;</li>
	// 					<li>asdfffffffffffffffffffffffffffffff;</li>
	// 					<li>asdfffffffffffffffffffffffffffffff</li>
	// 					<li>asdfffffffffffffffffffffffffffffff</li>
	// 					<li>asdfffffffffffffffffffffffffffffff;</li>
	// 					<li>顶顶顶 阿斯蒂芬;</li>
	
	// 					<li>asdfffffffffffffffffffffffffffffff;</li>
	// 					<li>asdfffffffffffffffffffffffffffffff;</li>
	// 					<li>asdfffffffffffffffffffffffffffffff</li>
	// 					<li>asdfffffffffffffffffffffffffffffff</li>
	// 					<li>asdfffffffffffffffffffffffffffffff;</li>
	// 					<li>顶顶顶 阿斯蒂芬;</li>
	
	// 					<li>顶顶顶 阿斯蒂芬;</li>
	
	// 					<li>asdfffffffffffffffffffffffffffffff;</li>
	// 					<li>asdfffffffffffffffffffffffffffffff;</li>
	// 					<li>asdfffffffffffffffffffffffffffffff</li>
	// 					<li>asdfffffffffffffffffffffffffffffff</li>
	// 					<li>asdfffffffffffffffffffffffffffffff;</li>
	// 					<li>顶顶顶 阿斯蒂芬;</li>
	// 				</ul>
	// 			</pull-list>
	// 		</div>
	// 	</div>
	
	// 	<toast :show="showToast"></toast>
	// 	<action-sheet :showsheet.sync="showsheet"  :btn-items="btnItems" v-on:action-click="actionClick"></action-sheet>
	// </template>
	
	// <script lang="babel">
	exports.default = {
		data: function data() {
			return {
				showsheet: false,
				btnItems: ['手机拍照', '选择照片'],
				showToast: true
			};
		},
	
		methods: {
			back: function back() {
				history.back();
			},
			showSheet: function showSheet() {
				this.showsheet = !this.showsheet;
			},
			actionClick: function actionClick(index) {
				alert(index);
			},
			getInitData: function getInitData() {
				alert('集合刷新');
			},
			getMoreData: function getMoreData() {
				alert("集合加载更多");
			}
		},
		components: {
			toolbar: _ToolBar2.default,
			PullList: _PullList2.default,
			ActionSheet: _ActionSheet2.default,
			Toast: _Toast2.default
		}
	};
	// </script>

	// <style scoped>

	// </style>

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__webpack_require__(59)
	__vue_script__ = __webpack_require__(61)
	__vue_template__ = __webpack_require__(62)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) { (typeof module.exports === "function" ? module.exports.options : module.exports).template = __vue_template__ }
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), true)
	  if (!hotAPI.compatible) return
	  var id = "E:\\workspace\\mobile-dev\\src\\components\\ActionSheet.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(60);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(10)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js?sourceMap!./../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-4e6fcfcd&file=ActionSheet.vue!./../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./ActionSheet.vue", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js?sourceMap!./../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-4e6fcfcd&file=ActionSheet.vue!./../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./ActionSheet.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(9)();
	// imports
	
	
	// module
	exports.push([module.id, "\n.actionsheet_wrap{\n\twidth: 100%;\n\tpadding: 0px;\n\tmargin: 0px;\n\theight: 100%;\n}\n\n.mask_transition{\n\tbackground: rgba(0, 0, 0, 0.6);\n\tposition:fixed;\n\tleft: 0;\n\ttop: 0;\n\theight: 100%;\n\twidth: 100%;\n\tz-index: 10;\n\t-webkit-transition: background .3s;\n\ttransition:background .3s;\n}\n\n.actionsheet{\n\t\t/*background-color:#EFEFF4;*/\n\tbackground-color:#D9D9D9;\n}\n\n.expand-transition{\n\n\t-webkit-transition: -webkit-transform .3s;\n\n\ttransition: -webkit-transform .3s;\n\n\ttransition: transform .3s;\n\n\ttransition:transform .3s, -webkit-transform .3s;\n\tposition: fixed;\n\tleft: 0;\n\tbottom: 0;\n\twidth: 100%;\n\t\n\tz-index: 20;\n\t-webkit-backface-visibility:hidden;\n\t        backface-visibility:hidden;\n}\n\n.expand-enter, .expand-leave {\n \t-webkit-transform:translate(0,100%);\n \t        transform:translate(0,100%);\n}\n\n.actionsheet_cell{\n\tposition: relative;\n    padding: 10px 0;\n    text-align: center;\n    font-size: 18px;\n    background-color: #fff;\n}\n\n.actionsheet_cell:before{\n\tcontent:'';\n\tborder-top:1px solid #D9D9D9;\n\tcolor:#D9D9D9;\n\tposition: absolute;\n\tleft: 0;\n\ttop: 0;\n\twidth: 100%;\n\theight: 1px;\n\t-webkit-transform:scaleY(0.5);\n\t        transform:scaleY(0.5);\n}\n\n.actionsheet_action{\n\tmargin-top:6px;\n\tbackground-color: #fff;\n\n}\n\n", "", {"version":3,"sources":["/./src/components/ActionSheet.vue?0dfccc3c"],"names":[],"mappings":";AAmDA;CACA,YAAA;CACA,aAAA;CACA,YAAA;CACA,aAAA;CACA;;AAEA;CACA,+BAAA;CACA,eAAA;CACA,QAAA;CACA,OAAA;CACA,aAAA;CACA,YAAA;CACA,YAAA;CACA,mCAAA;CAAA,0BAAA;CACA;;AAEA;EACA,6BAAA;CACA,yBAAA;CACA;;AAEA;;CAEA,0CAAA;;CAAA,kCAAA;;CAAA,0BAAA;;CAAA,gDAAA;CACA,gBAAA;CACA,QAAA;CACA,UAAA;CACA,YAAA;;CAEA,YAAA;CACA,mCAAA;SAAA,2BAAA;CACA;;AAEA;EACA,oCAAA;UAAA,4BAAA;CACA;;AAEA;CACA,mBAAA;IACA,gBAAA;IACA,mBAAA;IACA,gBAAA;IACA,uBAAA;CACA;;AAEA;CACA,WAAA;CACA,6BAAA;CACA,cAAA;CACA,mBAAA;CACA,QAAA;CACA,OAAA;CACA,YAAA;CACA,YAAA;CACA,8BAAA;SAAA,sBAAA;CACA;;AAEA;CACA,eAAA;CACA,uBAAA;;CAEA","file":"ActionSheet.vue","sourcesContent":["<template>\r\n\t<!--  -->\r\n    <section id=\"actionsheet_wrap\" >\r\n    \t<!--遮罩  -->\r\n    \t<div class=\"mask_transition\" v-show=\"showsheet\" v-touch:tap=\"close\"></div>\r\n    \t<!-- 按钮组 -->\r\n        <div class=\"actionsheet\" v-show=\"showsheet\" transition=\"expand\">\r\n        \t<ul class=\"actionsheet_menu\">\r\n        \t\t<li v-for=\"item in btnItems\" class=\"actionsheet_cell\" v-touch:tap=\"actionClick($index)\">\r\n        \t\t\t{{item}}\r\n        \t\t</li>\r\n        \t</ul>\r\n            <div class=\"actionsheet_action\">\r\n                <div class=\"actionsheet_cell\" v-touch:tap=\"close\">取消</div>\r\n            </div>\r\n        </div>\r\n    </section>\r\n    <!--END actionSheet-->\r\n</template>\r\n\r\n\r\n<script>\r\n\texport default {\r\n\t\tprops:{\r\n\t\t\t//按钮组\r\n\t\t\tbtnItems:{\r\n\t\t\t\ttype:Array,\r\n\t\t\t\tdefault:[]\r\n\t\t\t},\r\n\t\t\tshowsheet:{\r\n\t\t\t\ttype:Boolean,\r\n\t\t\t\tdefault:false\r\n\t\t\t}\r\n\t\t},\r\n\t\tcreated(){\r\n\t\t\tconsole.log(\"进入actionSheet:\"+this.showsheet);\r\n\t\t},\r\n\t\tmethods:{\r\n\t\t\tactionClick(index){\r\n\t\t\t\tthis.$dispatch('action-click',index);\r\n\t\t\t},\r\n\t\t\tclose(){\r\n\t\t\t\tthis.showsheet=!this.showsheet;\r\n\t\t\t\tconsole.log(this.showsheet);\r\n\t\t\t}\r\n\t\t}\r\n\t}\r\n</script>\r\n\r\n\r\n<style>\r\n\t.actionsheet_wrap{\r\n\t\twidth: 100%;\r\n\t\tpadding: 0px;\r\n\t\tmargin: 0px;\r\n\t\theight: 100%;\r\n\t}\r\n\r\n\t.mask_transition{\r\n\t\tbackground: rgba(0, 0, 0, 0.6);\r\n\t\tposition:fixed;\r\n\t\tleft: 0;\r\n\t\ttop: 0;\r\n\t\theight: 100%;\r\n\t\twidth: 100%;\r\n\t\tz-index: 10;\r\n\t\ttransition:background .3s;\r\n\t}\r\n\t\r\n\t.actionsheet{\r\n\t\t\t/*background-color:#EFEFF4;*/\r\n\t\tbackground-color:#D9D9D9;\r\n\t}\r\n\r\n\t.expand-transition{\r\n\t\r\n\t\ttransition:transform .3s;\r\n\t\tposition: fixed;\r\n\t\tleft: 0;\r\n\t\tbottom: 0;\r\n\t\twidth: 100%;\r\n\t\t\r\n\t\tz-index: 20;\r\n\t\tbackface-visibility:hidden;\r\n\t}\r\n\r\n\t.expand-enter, .expand-leave {\r\n\t \ttransform:translate(0,100%);\r\n\t}\r\n\r\n\t.actionsheet_cell{\r\n\t\tposition: relative;\r\n\t    padding: 10px 0;\r\n\t    text-align: center;\r\n\t    font-size: 18px;\r\n\t    background-color: #fff;\r\n\t}\r\n\r\n\t.actionsheet_cell:before{\r\n\t\tcontent:'';\r\n\t\tborder-top:1px solid #D9D9D9;\r\n\t\tcolor:#D9D9D9;\r\n\t\tposition: absolute;\r\n\t\tleft: 0;\r\n\t\ttop: 0;\r\n\t\twidth: 100%;\r\n\t\theight: 1px;\r\n\t\ttransform:scaleY(0.5);\r\n\t}\r\n\r\n\t.actionsheet_action{\r\n\t\tmargin-top:6px;\r\n\t\tbackground-color: #fff;\r\n\r\n\t}\r\n\r\n</style>"],"sourceRoot":"webpack://"}]);
	
	// exports


/***/ },
/* 61 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	// <template>
	// 	<!--  -->
	//     <section id="actionsheet_wrap" >
	//     	<!--遮罩  -->
	//     	<div class="mask_transition" v-show="showsheet" v-touch:tap="close"></div>
	//     	<!-- 按钮组 -->
	//         <div class="actionsheet" v-show="showsheet" transition="expand">
	//         	<ul class="actionsheet_menu">
	//         		<li v-for="item in btnItems" class="actionsheet_cell" v-touch:tap="actionClick($index)">
	//         			{{item}}
	//         		</li>
	//         	</ul>
	//             <div class="actionsheet_action">
	//                 <div class="actionsheet_cell" v-touch:tap="close">取消</div>
	//             </div>
	//         </div>
	//     </section>
	//     <!--END actionSheet-->
	// </template>
	
	// <script>
	exports.default = {
		props: {
			//按钮组
			btnItems: {
				type: Array,
				default: []
			},
			showsheet: {
				type: Boolean,
				default: false
			}
		},
		created: function created() {
			console.log("进入actionSheet:" + this.showsheet);
		},
	
		methods: {
			actionClick: function actionClick(index) {
				this.$dispatch('action-click', index);
			},
			close: function close() {
				this.showsheet = !this.showsheet;
				console.log(this.showsheet);
			}
		}
	};
	// </script>

	// <style>
	// 	.actionsheet_wrap{
	// 		width: 100%;
	// 		padding: 0px;
	// 		margin: 0px;
	// 		height: 100%;
	// 	}

	// 	.mask_transition{
	// 		background: rgba(0, 0, 0, 0.6);
	// 		position:fixed;
	// 		left: 0;
	// 		top: 0;
	// 		height: 100%;
	// 		width: 100%;
	// 		z-index: 10;
	// 		transition:background .3s;
	// 	}

	// 	.actionsheet{
	// 			/*background-color:#EFEFF4;*/
	// 		background-color:#D9D9D9;
	// 	}

	// 	.expand-transition{

	// 		transition:transform .3s;
	// 		position: fixed;
	// 		left: 0;
	// 		bottom: 0;
	// 		width: 100%;

	// 		z-index: 20;
	// 		backface-visibility:hidden;
	// 	}

	// 	.expand-enter, .expand-leave {
	// 	 	transform:translate(0,100%);
	// 	}

	// 	.actionsheet_cell{
	// 		position: relative;
	// 	    padding: 10px 0;
	// 	    text-align: center;
	// 	    font-size: 18px;
	// 	    background-color: #fff;
	// 	}

	// 	.actionsheet_cell:before{
	// 		content:'';
	// 		border-top:1px solid #D9D9D9;
	// 		color:#D9D9D9;
	// 		position: absolute;
	// 		left: 0;
	// 		top: 0;
	// 		width: 100%;
	// 		height: 1px;
	// 		transform:scaleY(0.5);
	// 	}

	// 	.actionsheet_action{
	// 		margin-top:6px;
	// 		background-color: #fff;

	// 	}

	// </style>
	/* generated by vue-loader */

/***/ },
/* 62 */
/***/ function(module, exports) {

	module.exports = "\n\t<!--  -->\n    <section id=\"actionsheet_wrap\" >\n    \t<!--遮罩  -->\n    \t<div class=\"mask_transition\" v-show=\"showsheet\" v-touch:tap=\"close\"></div>\n    \t<!-- 按钮组 -->\n        <div class=\"actionsheet\" v-show=\"showsheet\" transition=\"expand\">\n        \t<ul class=\"actionsheet_menu\">\n        \t\t<li v-for=\"item in btnItems\" class=\"actionsheet_cell\" v-touch:tap=\"actionClick($index)\">\n        \t\t\t{{item}}\n        \t\t</li>\n        \t</ul>\n            <div class=\"actionsheet_action\">\n                <div class=\"actionsheet_cell\" v-touch:tap=\"close\">取消</div>\n            </div>\n        </div>\n    </section>\n    <!--END actionSheet-->\n";

/***/ },
/* 63 */
/***/ function(module, exports) {

	module.exports = "\n<div class=\"page\" _v-ba295ade=\"\">\n\t<toolbar text=\"我的项目\" _v-ba295ade=\"\">\n\t\t<span class=\"icon-chevron-left\" slot=\"leftBtn\" v-touch:tap=\"back\" _v-ba295ade=\"\"></span>\n        <span class=\"icon-refresh\" slot=\"rightBtn\" v-touch:tap=\"showSheet\" _v-ba295ade=\"\"></span>\n\t</toolbar>\n\t<div class=\"page-content\" _v-ba295ade=\"\">\n\t\t<pull-list v-on:reload=\"getInitData\" v-on:loadmore=\"getMoreData\" _v-ba295ade=\"\">\n\t\t\t<ul _v-ba295ade=\"\">\n\t\t\t\t<li _v-ba295ade=\"\">asdffdddd;</li>\n\t\t\t\t<li _v-ba295ade=\"\">asdfffffffffffffffffffffffffffffff;a</li>\n\t\t\t\t<li _v-ba295ade=\"\">asdfffffffffffffffffffffffffffffff;</li>\n\t\t\t\t<li _v-ba295ade=\"\">asdfffffffffffffffffffffffffffffff;</li>\n\t\t\t\t<li _v-ba295ade=\"\">asdfffffffffffffffffffffffffffffff</li>\n\t\t\t\t<li _v-ba295ade=\"\">asdfffffffffffffffffffffffffffffff</li>\n\t\t\t\t<li _v-ba295ade=\"\">asdfffffffffffffffffffffffffffffff;</li>\n\t\t\t\t<li _v-ba295ade=\"\">asdfffffffffffffffffffffffffffffff;</li>\n\t\t\t\t<li _v-ba295ade=\"\">asdfffffffffffffffffffffffffffffff;</li>\n\t\t\t\t<li _v-ba295ade=\"\">asdfffffffffffffffffffffffffffffff;a</li>\n\t\t\t\t<li _v-ba295ade=\"\">asdfffffffffffffffffffffffffffffff;</li>\n\t\t\t\t<li _v-ba295ade=\"\">asdfffffffffffffffffffffffffffffff;</li>\n\t\t\t\t<li _v-ba295ade=\"\">asdfffffffffffffffffffffffffffffff</li>\n\t\t\t\t<li _v-ba295ade=\"\">asdfffffffffffffffffffffffffffffff</li>\n\t\t\t\t<li _v-ba295ade=\"\">asdfffffffffffffffffffffffffffffff;</li>\n\t\t\t\t<li _v-ba295ade=\"\">asdfffffffffffffffffffffffffffffff;</li>\n\t\t\t\t<li _v-ba295ade=\"\">asdfffffffffffffffffffffffffffffff;</li>\n\t\t\t\t<li _v-ba295ade=\"\">asdfffffffffffffffffffffffffffffff;a</li>\n\t\t\t\t<li _v-ba295ade=\"\">asdfffffffffffffffffffffffffffffff;</li>\n\t\t\t\t<li _v-ba295ade=\"\">asdfffffffffffffffffffffffffffffff;</li>\n\t\t\t\t<li _v-ba295ade=\"\">asdfffffffffffffffffffffffffffffff</li>\n\t\t\t\t<li _v-ba295ade=\"\">asdfffffffffffffffffffffffffffffff</li>\n\t\t\t\t<li _v-ba295ade=\"\">asdfffffffffffffffffffffffffffffff;</li>\n\t\t\t\t<li _v-ba295ade=\"\">asdfffffffffffffffffffffffffffffff;</li>\n\t\t\t\t<li _v-ba295ade=\"\">asdfffffffffffffffffffffffffffffff;</li>\n\t\t\t\t<li _v-ba295ade=\"\">asdfffffffffffffffffffffffffffffff;a</li>\n\t\t\t\t<li _v-ba295ade=\"\">asdfffffffffffffffffffffffffffffff;</li>\n\t\t\t\t<li _v-ba295ade=\"\">asdfffffffffffffffffffffffffffffff;</li>\n\t\t\t\t<li _v-ba295ade=\"\">asdfffffffffffffffffffffffffffffff</li>\n\t\t\t\t<li _v-ba295ade=\"\">asdfffffffffffffffffffffffffffffff</li>\n\t\t\t\t<li _v-ba295ade=\"\">asdfffffffffffffffffffffffffffffff;</li>\n\t\t\t\t<li _v-ba295ade=\"\">顶顶顶 阿斯蒂芬;</li>\n\n\t\t\t\t<li _v-ba295ade=\"\">asdfffffffffffffffffffffffffffffff;</li>\n\t\t\t\t<li _v-ba295ade=\"\">asdfffffffffffffffffffffffffffffff;</li>\n\t\t\t\t<li _v-ba295ade=\"\">asdfffffffffffffffffffffffffffffff</li>\n\t\t\t\t<li _v-ba295ade=\"\">asdfffffffffffffffffffffffffffffff</li>\n\t\t\t\t<li _v-ba295ade=\"\">asdfffffffffffffffffffffffffffffff;</li>\n\t\t\t\t<li _v-ba295ade=\"\">顶顶顶 阿斯蒂芬;</li>\n\n\t\t\t\t<li _v-ba295ade=\"\">顶顶顶 阿斯蒂芬;</li>\n\n\t\t\t\t<li _v-ba295ade=\"\">asdfffffffffffffffffffffffffffffff;</li>\n\t\t\t\t<li _v-ba295ade=\"\">asdfffffffffffffffffffffffffffffff;</li>\n\t\t\t\t<li _v-ba295ade=\"\">asdfffffffffffffffffffffffffffffff</li>\n\t\t\t\t<li _v-ba295ade=\"\">asdfffffffffffffffffffffffffffffff</li>\n\t\t\t\t<li _v-ba295ade=\"\">asdfffffffffffffffffffffffffffffff;</li>\n\t\t\t\t<li _v-ba295ade=\"\">顶顶顶 阿斯蒂芬;</li>\n\t\t\t</ul>\n\t\t</pull-list>\n\t</div>\n</div>\n\n<toast :show=\"showToast\" _v-ba295ade=\"\"></toast>\n<action-sheet :showsheet.sync=\"showsheet\" :btn-items=\"btnItems\" v-on:action-click=\"actionClick\" _v-ba295ade=\"\"></action-sheet>\n";

/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__vue_script__ = __webpack_require__(65)
	__vue_template__ = __webpack_require__(71)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) { (typeof module.exports === "function" ? module.exports.options : module.exports).template = __vue_template__ }
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), true)
	  if (!hotAPI.compatible) return
	  var id = "E:\\workspace\\mobile-dev\\src\\views\\WorkLog.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _ToolBar = __webpack_require__(12);
	
	var _ToolBar2 = _interopRequireDefault(_ToolBar);
	
	var _Calendar = __webpack_require__(66);
	
	var _Calendar2 = _interopRequireDefault(_Calendar);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	// <template>
	// 	<toolbar :text="title">
	// 		<span class="icon-chevron-left" slot="leftBtn" @click="back()"></span>
	// 		<span slot="rightBtn"></span>
	// 	</toolbar>
	// 	<calendar v-on:item-click="selectDay"></calendar>
	// </template>
	
	// <script>
	exports.default = {
		data: function data() {
			return {
				title: '工作日志'
			};
		},
	
		methods: {
			back: function back() {
				history.back();
			},
	
			//子控件触发事件后执行的方法
			selectDay: function selectDay(day) {
				alert(day);
			}
		},
		components: {
			toolbar: _ToolBar2.default,
			calendar: _Calendar2.default
		}
	};
	// </script>
	/* generated by vue-loader */

/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__webpack_require__(67)
	__vue_script__ = __webpack_require__(69)
	__vue_template__ = __webpack_require__(70)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) { (typeof module.exports === "function" ? module.exports.options : module.exports).template = __vue_template__ }
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), true)
	  if (!hotAPI.compatible) return
	  var id = "E:\\workspace\\mobile-dev\\src\\components\\Calendar.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(68);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(10)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js?sourceMap!./../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-3d09c52c&file=Calendar.vue&scoped=true!./../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./Calendar.vue", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js?sourceMap!./../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-3d09c52c&file=Calendar.vue&scoped=true!./../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./Calendar.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(9)();
	// imports
	
	
	// module
	exports.push([module.id, "\n.calendar[_v-3d09c52c] {\n    width: 100%;\n    height: auto;\n    display: -ms-flexbox;\n    display: -webkit-box;\n    display: flex;\n    display: -webkit-flex;\n    -webkit-flex-flow: column nowrap;\n        -ms-flex-flow: column nowrap;\n            flex-flow: column nowrap;\n    -webkit-justify-content: flex-start;\n        -ms-flex-pack: start;\n            -webkit-box-pack: start;\n            justify-content: flex-start;\n    box-shadow: 4px 4px 5px gray;\n    border: 0px solid whitesmoke;\n    color: #666;\n    font-size: 14px;\n\n}\n\n.calendar span[_v-3d09c52c] {\n    cursor: pointer;\n}\n\n.calendar-header[_v-3d09c52c] {\n    height: auto;\n    display: -webkit-flex;\n    display: -ms-flexbox;\n    display: -webkit-box;\n    display: flex;\n    -webkit-flex-flow: column nowrap;\n        -ms-flex-flow: column nowrap;\n            flex-flow: column nowrap;\n    -webkit-justify-content: center;\n        -ms-flex-pack: center;\n            -webkit-box-pack: center;\n            justify-content: center;\n    border-bottom: 1px solid lightgrey;\n\n\n}\n\n.calendar-title[_v-3d09c52c] {\n    height: 30px;\n    display: -webkit-flex;\n    display: -ms-flexbox;\n    display: -webkit-box;\n    display: flex;\n    padding: 5px 15px;\n    -webkit-flex-flow: row nowrap;\n        -ms-flex-flow: row nowrap;\n            flex-flow: row nowrap;\n    -webkit-justify-content: space-between;\n        -ms-flex-pack: justify;\n            -webkit-box-pack: justify;\n            justify-content: space-between;\n    -webkit-align-items: center;\n        -ms-flex-align: center;\n            -webkit-box-align: center;\n            align-items: center;\n    border-bottom: 1px solid lightgrey;\n    font-weight: bold;\n}\n\n.calendarDay-title>span[_v-3d09c52c]:active {\n    color: #2db7f5;\n}\n\n.calendarDay-week[_v-3d09c52c]{\n     background-color: whitesmoke;\n}\n\n.calendarDay-week>ul[_v-3d09c52c] {\n    display: -webkit-flex;\n    display: -ms-flexbox;\n    display: -webkit-box;\n    display: flex;\n    -webkit-flex-flow: row nowrap;\n        -ms-flex-flow: row nowrap;\n            flex-flow: row nowrap;\n    -webkit-justify-content: space-around;\n        -ms-flex-pack: distribute;\n            justify-content: space-around;\n    height: 30px;\n     padding: 5px 0px;\n    list-style-type: none;\n    -webkit-align-items: center;\n        -ms-flex-align: center;\n            -webkit-box-align: center;\n            align-items: center;\n    margin: 0px;\n}\n\n\n.calendarDay-week>ul>li[_v-3d09c52c] {\n    -webkit-flex-basis: 14.28%;\n        -ms-flex-preferred-size: 14.28%;\n            flex-basis: 14.28%;\n    text-align: center;\n}\n\n\n.calendar-range[_v-3d09c52c] {\n    height: 260px;\n}\n\n\n\n.calendar-range>ul[_v-3d09c52c] {\n    display: -webkit-flex;\n    display: -ms-flexbox;\n    display: -webkit-box;\n    display: flex;\n    -webkit-flex-flow: row wrap;\n        -ms-flex-flow: row wrap;\n            flex-flow: row wrap;\n    -webkit-justify-content: flex-start;\n        -ms-flex-pack: start;\n            -webkit-box-pack: start;\n            justify-content: flex-start;\n   \n    list-style-type: none;\n    -webkit-align-items: center;\n        -ms-flex-align: center;\n            -webkit-box-align: center;\n            align-items: center;\n    margin: 0px;\n    font-size: 16px;\n}\n\n .calendar-range>ul>li>span[_v-3d09c52c]:hover{\n    border:2px solid darkorange;\n    color: darkorange;\n    border-radius: 4px;\n    padding: 5px;\n }\n\n .calendar-range>ul>li>span[_v-3d09c52c]:active{\n    border:2px solid darkorange;\n    color: #2db7f5;\n    border-radius: 4px;\n    padding: 5px;\n }\n\n\n.calendarDay[_v-3d09c52c] {\n    -webkit-flex-basis: 14.28%;\n        -ms-flex-preferred-size: 14.28%;\n            flex-basis: 14.28%;\n    height: 40px;\n    line-height: 40px;\n    text-align: center;\n    cursor: pointer;\n}\n\n.calendarMonth[_v-3d09c52c]{\n    -webkit-flex-basis: 30%;\n        -ms-flex-preferred-size: 30%;\n            flex-basis: 30%;\n    height: 60px;\n    line-height: 40px;\n    text-align: center;\n    cursor: pointer;\n}\n\n.itemSelect[_v-3d09c52c] {\n    padding: 5px;\n    border:2px solid #2db7f5;\n    color: #2db7f5;\n    border-radius: 4px;\n}\n.restDay[_v-3d09c52c]{\n    color: #e02d2d;\n}\n\n\n.curMonth[_v-3d09c52c]{\n    font-weight: bold;\n}\n\n.calendarDay-footer[_v-3d09c52c] {\n    height: 30px;\n    padding: 5px 15px;\n    -webkit-flex-flow: row nowrap;\n        -ms-flex-flow: row nowrap;\n            flex-flow: row nowrap;\n    border-top: 1px solid lightgray;\n    display: -webkit-flex;\n    display: -ms-flexbox;\n    display: -webkit-box;\n    display: flex;\n    -webkit-flex-flow: row nowrap;\n        -ms-flex-flow: row nowrap;\n            flex-flow: row nowrap;\n    -webkit-justify-content: center;\n        -ms-flex-pack: center;\n            -webkit-box-pack: center;\n            justify-content: center;\n    -webkit-align-items: center;\n        -ms-flex-align: center;\n            -webkit-box-align: center;\n            align-items: center;\n    font-weight: bold;\n     background-color: whitesmoke;\n}\n", "", {"version":3,"sources":["/./src/components/Calendar.vue?47beed68"],"names":[],"mappings":";AAmVA;IACA,YAAA;IACA,aAAA;IACA,qBAAA;IACA,qBAAA;IAAA,cAAA;IACA,sBAAA;IACA,iCAAA;QACA,6BAAA;YACA,yBAAA;IACA,oCAAA;QACA,qBAAA;YACA,wBAAA;YAAA,4BAAA;IACA,6BAAA;IACA,6BAAA;IACA,YAAA;IACA,gBAAA;;CAEA;;AAEA;IACA,gBAAA;CACA;;AAEA;IACA,aAAA;IACA,sBAAA;IACA,qBAAA;IACA,qBAAA;IAAA,cAAA;IACA,iCAAA;QACA,6BAAA;YACA,yBAAA;IACA,gCAAA;QACA,sBAAA;YACA,yBAAA;YAAA,wBAAA;IACA,mCAAA;;;CAGA;;AAEA;IACA,aAAA;IACA,sBAAA;IACA,qBAAA;IACA,qBAAA;IAAA,cAAA;IACA,kBAAA;IACA,8BAAA;QACA,0BAAA;YACA,sBAAA;IACA,uCAAA;QACA,uBAAA;YACA,0BAAA;YAAA,+BAAA;IACA,4BAAA;QACA,uBAAA;YACA,0BAAA;YAAA,oBAAA;IACA,mCAAA;IACA,kBAAA;CACA;;AAEA;IACA,eAAA;CACA;;AAEA;KACA,6BAAA;CACA;;AAEA;IACA,sBAAA;IACA,qBAAA;IACA,qBAAA;IAAA,cAAA;IACA,8BAAA;QACA,0BAAA;YACA,sBAAA;IACA,sCAAA;QACA,0BAAA;YACA,8BAAA;IACA,aAAA;KACA,iBAAA;IACA,sBAAA;IACA,4BAAA;QACA,uBAAA;YACA,0BAAA;YAAA,oBAAA;IACA,YAAA;CACA;;;AAGA;IACA,2BAAA;QACA,gCAAA;YACA,mBAAA;IACA,mBAAA;CACA;;;AAGA;IACA,cAAA;CACA;;;;AAIA;IACA,sBAAA;IACA,qBAAA;IACA,qBAAA;IAAA,cAAA;IACA,4BAAA;QACA,wBAAA;YACA,oBAAA;IACA,oCAAA;QACA,qBAAA;YACA,wBAAA;YAAA,4BAAA;;IAEA,sBAAA;IACA,4BAAA;QACA,uBAAA;YACA,0BAAA;YAAA,oBAAA;IACA,YAAA;IACA,gBAAA;CACA;;CAEA;IACA,4BAAA;IACA,kBAAA;IACA,mBAAA;IACA,aAAA;EACA;;CAEA;IACA,4BAAA;IACA,eAAA;IACA,mBAAA;IACA,aAAA;EACA;;;AAGA;IACA,2BAAA;QACA,gCAAA;YACA,mBAAA;IACA,aAAA;IACA,kBAAA;IACA,mBAAA;IACA,gBAAA;CACA;;AAEA;IACA,wBAAA;QACA,6BAAA;YACA,gBAAA;IACA,aAAA;IACA,kBAAA;IACA,mBAAA;IACA,gBAAA;CACA;;AAEA;IACA,aAAA;IACA,yBAAA;IACA,eAAA;IACA,mBAAA;CACA;AACA;IACA,eAAA;CACA;;;AAGA;IACA,kBAAA;CACA;;AAEA;IACA,aAAA;IACA,kBAAA;IACA,8BAAA;QACA,0BAAA;YACA,sBAAA;IACA,gCAAA;IACA,sBAAA;IACA,qBAAA;IACA,qBAAA;IAAA,cAAA;IACA,8BAAA;QACA,0BAAA;YACA,sBAAA;IACA,gCAAA;QACA,sBAAA;YACA,yBAAA;YAAA,wBAAA;IACA,4BAAA;QACA,uBAAA;YACA,0BAAA;YAAA,oBAAA;IACA,kBAAA;KACA,6BAAA;CACA","file":"Calendar.vue","sourcesContent":["<template>\r\n    <div class=\"calendar\">\r\n        <div class=\"calenarDayView\" v-show=\"showDay\">\r\n            <div class=\"calendar-header\">\r\n                <div class=\"calendar-title\">\r\n                    <div>\r\n                        <span class=\"icon-double-angle-left\" @click=\"yearClick(0)\"></span>\r\n                        <span class=\"icon-angle-left\" style='margin-left:20px;width:50px;' @click=\"monthClick(0)\"></span>\r\n                    </div>\r\n                    <p>\r\n                        <span @click=\"showYearView\">{{curYear}}年</span>\r\n                        <span @click=\"showMonthView\">{{curMonth}}月</span>\r\n                    </p>\r\n                    <div>\r\n                         <span class=\"icon-angle-right\" style='margin-right:20px;' @click=\"monthClick(1)\"></span>\r\n                         <span class=\"icon-double-angle-right\" @click=\"yearClick(1)\"></span>\r\n                    </div>\r\n                </div>\r\n                <div class=\"calendarDay-week\">\r\n                    <ul>\r\n                        <li v-for=\"(index,item) in weekRange\" :class=\"{'restDay':index==5||index==6}\">{{item}}</li>\r\n                    </ul>\r\n                </div>\r\n            </div>\r\n            <div class=\"calendar-range\" v-touch:swipe=\"swipeMonth\">\r\n                <ul>\r\n                    <li v-for=\"item in dateRange\" class=\"calendarDay\"   v-on:click=\"selectDay(item.day)\">\r\n                        <span v-bind:class=\"{'itemSelect':isCurSelect('D',item.day),'restDay':item.isRestDay,'curMonth':item.isCur}\">{{item.day}}</span>\r\n                    </li>\r\n                </ul>\r\n            </div>\r\n            <div class=\"calendarDay-footer\">\r\n                <span @click=\"today\">今天</span>\r\n            </div>\r\n        </div>\r\n        <div class=\"calendarMonthView\" v-show=\"showMonth\">\r\n            <div class=\"calendar-header\">\r\n                <div class=\"calendar-title\">\r\n                    <div>\r\n                        <span class=\"icon-double-angle-left\" @click=\"yearClick(0)\"></span>\r\n                    </div>\r\n                    <p>\r\n                        <span @click=\"showYearView\">{{curYear}}年</span>\r\n                    </p>\r\n                    <div>\r\n                         <span class=\"icon-double-angle-right\" @click=\"yearClick(1)\"></span>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n            <div class=\"calendar-range\">\r\n                <ul>\r\n                    <li v-for=\"item in monthRange\" class=\"calendarMonth\"   v-on:click=\"selectMonth(item.id)\">\r\n                        <span v-bind:class=\"{'itemSelect':isCurSelect('M',item.id)}\">{{item.text}}</span>\r\n                    </li>\r\n                </ul>\r\n            </div>\r\n        </div>\r\n        <div class=\"calendarYearView\" v-show=\"showYear\">\r\n            <div class=\"calendar-header\">\r\n                <div class=\"calendar-title\">\r\n                    <div>\r\n                        <span class=\"icon-double-angle-left\" @click=\"yearClick(0)\"></span>\r\n                    </div>\r\n                    <p>\r\n                        <span @click=\"showYearView\">{{yearTitle}}</span>\r\n                    </p>\r\n                    <div>\r\n                         <span class=\"icon-double-angle-right\" @click=\"yearClick(1)\"></span>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n            <div class=\"calendar-range\">\r\n                <ul>\r\n                    <li v-for=\"item in yearRange\" class=\"calendarMonth\"   v-on:click=\"selectYear(item)\">\r\n                        <span v-bind:class=\"{'itemSelect':isCurSelect('Y',item)}\">{{item}}</span>\r\n                    </li>\r\n                </ul>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</template>\r\n\r\n<script lang=\"babel\">\r\n    \r\n    export default {\r\n        data:function(){\r\n            return {\r\n               curYear:0,\r\n               curMonth:0,\r\n               curDay:0,\r\n               showDay:true,\r\n               showYear:false,\r\n               showMonth:false,\r\n               weekRange:['一','二','三','四','五','六','日'],\r\n               monthRange:[\r\n                           {id:1,text:'一月'},{id:2,text:'二月'},{id:3,text:'三月'},{id:4,text:'四月'},\r\n                           {id:5,text:'五月'},{id:6,text:'六月'},{id:7,text:'七月'},{id:8,text:'八月'},\r\n                           {id:9,text:'九月'},{id:10,text:'十月'},{id:11,text:'十一月'},{id:12,text:'十二月'}\r\n                          ],\r\n               dateRange:[],\r\n               yearRange:[],\r\n               yearTitle:''\r\n            }\r\n        },\r\n        props:{\r\n            width:{\r\n\r\n            },\r\n            //格式\r\n            format:{\r\n                type:String,\r\n                default:\"DD\"//YYYY,MM,DD,H,M,S\r\n            },\r\n            curdate:{\r\n                type:String,\r\n                default:''\r\n            }\r\n        },\r\n        created:function(){\r\n            var date='';\r\n            if(this.curdate.length>0){\r\n                date=new Date(this.curdate);\r\n            }else{\r\n                date=new Date();\r\n            }\r\n            //初始化当前的年和月,并加载当前年月的数据\r\n            this.curYear=date.getFullYear();\r\n            this.curMonth=date.getMonth()+1;\r\n            this.curDay=date.getDate();\r\n\r\n            this.dateRange=this.getDateRange(this.curYear,this.curMonth);\r\n            this.yearRange=this.getYearRange(this.curYear);\r\n            this.yearTitle=this.yearRange[0]+\"~\"+this.yearRange[11];\r\n            //通过格式化显示页面\r\n            this.initShowView();\r\n        },\r\n        methods:{\r\n            initShowView(){\r\n                switch(this.format){\r\n                    case \"YYYY\":\r\n                        this.showYear=true;\r\n                        this.showMonth=false;\r\n                        this.showDay=false;\r\n                        break;\r\n                    case \"MM\":\r\n                        this.showYear=false;\r\n                        this.showMonth=true;\r\n                        this.showDay=false;\r\n                        break;\r\n                    case \"DD\":\r\n                        this.showYear=false;\r\n                        this.showMonth=false;\r\n                        this.showDay=true;\r\n                        break;\r\n                }\r\n            },\r\n            isCurSelect(flag,item){\r\n                var date=new Date();\r\n                const tempY=date.getFullYear();\r\n                const tempM=date.getMonth()+1;\r\n                if(flag==\"D\"){\r\n                    return this.curYear==tempY&&this.curMonth==tempM&&this.curDay==item;\r\n                }else if(flag==\"M\"){\r\n                    return tempM==item;\r\n                }else{\r\n                    return tempY==item;\r\n                }\r\n            },\r\n            showYearView(){\r\n                this.showYear=true\r\n                this.showMonth=false;\r\n                this.showDay=false;\r\n            },\r\n            showMonthView(){\r\n                this.showYear=false\r\n                this.showMonth=true;\r\n                this.showDay=false;\r\n            },\r\n            selectYear:function(year){\r\n                this.curYear=year;\r\n                this.showYear=false\r\n                this.showMonth=true;\r\n                this.showDay=false;\r\n                if(this.format==\"YYYY\"){\r\n                    this.$dispatch('itemClick',year);\r\n                }\r\n            },\r\n            selectMonth(month){\r\n                this.showYear=false\r\n                this.showMonth=false;\r\n                this.showDay=true;\r\n                this.curMonth=month;\r\n                this.dateRange=this.getDateRange(this.curYear,this.curMonth);\r\n                if(this.format==\"MM\"){\r\n                    this.$dispatch('itemClick',this.curYear+\"-\"+month);\r\n                }\r\n            },\r\n            //选择天的时候\r\n            selectDay:function(day){\r\n                const tempD=this.curYear+\"-\"+this.curMonth+\"-\"+day;\r\n                console.log(\"触发派发事件：\"+tempD);\r\n                this.$dispatch('item-click',tempD);\r\n            },\r\n            today:function(){\r\n                var newDate=new Date();\r\n                this.curYear=newDate.getFullYear();\r\n                this.curMonth=newDate.getMonth()+1;\r\n                this.dateRange=this.getDateRange(this.curYear,this.curMonth);\r\n            },\r\n            //下一年或下一个月\r\n            yearClick(flag){\r\n                if(this.showYear){\r\n                    //如果是年的视图的情况\r\n                    const year=flag==0?this.curYear-10:this.curYear+10;\r\n                    this.yearRange=this.getYearRange(year);\r\n                    this.yearTitle=this.yearRange[0]+\"~\"+this.yearRange[11];    \r\n                }else{\r\n                     const year=flag==0?this.curYear-1:this.curYear+1;\r\n                     this.curYear=year;\r\n                     this.dateRange=this.getDateRange(year,this.curMonth);\r\n                }\r\n              \r\n            },\r\n            monthClick(flag){\r\n                var tempM=this.curMonth;\r\n                var tempY=this.curYear;\r\n                //上一月\r\n                if(flag==0){//\r\n                    if(tempM==1){\r\n                        tempM=12;\r\n                        tempY=this.curYear-1;\r\n                    }else{\r\n                        tempM=tempM-1;\r\n                    }\r\n                }else{//下个月\r\n                    if(tempM==12){\r\n                        tempY=this.curYear+1;\r\n                        tempM=1;\r\n                    }else{\r\n                        tempM=tempM+1;\r\n                    }\r\n                }\r\n                this.curYear=tempY;\r\n                this.curMonth=tempM;\r\n                 this.dateRange=this.getDateRange(tempY,tempM);\r\n            },\r\n            swipeMonth(e){\r\n\r\n            \tvar deltaX=e.deltaX;\r\n\t\t\t\tvar tempIndex=this.activeIndex;\r\n\t\t\t\tif(deltaX>0){\r\n\t\t\t\t\tthis.monthClick(0);\r\n\t\t\t\t}else{\r\n\t\t\t\t\tthis.monthClick(1);\r\n\t\t\t\t}\r\n            },\r\n            //通过日期来获取当期星期几\r\n            dayOfWeek:function(date){\r\n              var week=new Date(date).getDay();\r\n              if(week==0){\r\n                  return 7;\r\n              }  \r\n              else{\r\n                  return week;\r\n              }\r\n            },\r\n            //通过年月来获取月份的天数\r\n            dayNumOfMonth:function(year,month){\r\n                var d = new Date(year,month,0);\r\n                return d.getDate();\r\n            },\r\n            //加载\r\n            getDateRange:function(year,month){\r\n                var datearray=[];\r\n                var firstDateDay=0;\r\n                //1:得到当前月的第一天是星期几\r\n                var firstDay=year+\"-\"+month+\"-01\";\r\n                \r\n                var firstWeek=this.dayOfWeek(firstDay);\r\n                //2:通过星期得到日历的第一天\r\n                if(firstWeek==1){\r\n                    firstDateDay=1;\r\n                }else{\r\n                    //获取上个月的天数\r\n                    var preMonth=0;\r\n                    if(month==1){\r\n                        preMonth=this.dayNumOfMonth(year-1,12);\r\n                    }\r\n                     preMonth=this.dayNumOfMonth(year,month-1);\r\n                     \r\n                     for(var pi=preMonth-firstWeek+2;pi<=preMonth;pi++){\r\n                            var week=new Date(this.curYear+\"/\"+(this.curMonth-1)+\"/\"+pi).getDay();\r\n                            var restDay=(week==6||week==0);\r\n                            datearray.push({\r\n                                isCur:false,\r\n                                day:pi,\r\n                                isRestDay:restDay\r\n                            });\r\n                     }\r\n                }\r\n                //3:得到这个月的总天数\r\n                var curDays=this.dayNumOfMonth(year,month);\r\n                for(var i=1;i<=curDays;i++){\r\n                    var week=new Date(this.curYear+\"/\"+this.curMonth+\"/\"+i).getDay();\r\n                    var restDay=(week==6||week==0);\r\n                    datearray.push({\r\n                        isCur:true,\r\n                        day:i,\r\n                        isRestDay:restDay\r\n                    });\r\n                }\r\n                //2:检查该对象里面是否包含42个值,如果不包含,那么久生成\r\n                if(datearray.length<42){\r\n                    var nextValue=42-datearray.length;\r\n                     for(var ni=1;ni<=nextValue;ni++){\r\n                        var week=new Date(this.curYear+\"/\"+(this.curMonth+1)+\"/\"+ni).getDay();\r\n                        var restDay=(week==6||week==0);\r\n                        datearray.push({\r\n                                isCur:false,\r\n                                day:ni,\r\n                                isRestDay:restDay\r\n                        });\r\n                     }\r\n                }\r\n                return datearray;\r\n            },\r\n            getYearRange:function(year){\r\n                var tempYRange=[];\r\n                for (var i = year - 6; i <=year+5; i++) {\r\n                   tempYRange.push(i);   \r\n                };\r\n                return tempYRange;\r\n            }\r\n        }\r\n    }\r\n\r\n</script>\r\n\r\n<style type=\"text/css\" scoped>\r\n        .calendar {\r\n            width: 100%;\r\n            height: auto;\r\n            display: -ms-flexbox;\r\n            display: flex;\r\n            display: -webkit-flex;\r\n            -webkit-flex-flow: column nowrap;\r\n                -ms-flex-flow: column nowrap;\r\n                    flex-flow: column nowrap;\r\n            -webkit-justify-content: flex-start;\r\n                -ms-flex-pack: start;\r\n                    justify-content: flex-start;\r\n            box-shadow: 4px 4px 5px gray;\r\n            border: 0px solid whitesmoke;\r\n            color: #666;\r\n            font-size: 14px;\r\n\r\n        }\r\n        \r\n        .calendar span {\r\n            cursor: pointer;\r\n        }\r\n        \r\n        .calendar-header {\r\n            height: auto;\r\n            display: -webkit-flex;\r\n            display: -ms-flexbox;\r\n            display: flex;\r\n            -webkit-flex-flow: column nowrap;\r\n                -ms-flex-flow: column nowrap;\r\n                    flex-flow: column nowrap;\r\n            -webkit-justify-content: center;\r\n                -ms-flex-pack: center;\r\n                    justify-content: center;\r\n            border-bottom: 1px solid lightgrey;\r\n\r\n\r\n        }\r\n        \r\n        .calendar-title {\r\n            height: 30px;\r\n            display: -webkit-flex;\r\n            display: -ms-flexbox;\r\n            display: flex;\r\n            padding: 5px 15px;\r\n            -webkit-flex-flow: row nowrap;\r\n                -ms-flex-flow: row nowrap;\r\n                    flex-flow: row nowrap;\r\n            -webkit-justify-content: space-between;\r\n                -ms-flex-pack: justify;\r\n                    justify-content: space-between;\r\n            -webkit-align-items: center;\r\n                -ms-flex-align: center;\r\n                    align-items: center;\r\n            border-bottom: 1px solid lightgrey;\r\n            font-weight: bold;\r\n        }\r\n        \r\n        .calendarDay-title>span:active {\r\n            color: #2db7f5;\r\n        }\r\n        \r\n        .calendarDay-week{\r\n             background-color: whitesmoke;\r\n        }\r\n        \r\n        .calendarDay-week>ul {\r\n            display: -webkit-flex;\r\n            display: -ms-flexbox;\r\n            display: flex;\r\n            -webkit-flex-flow: row nowrap;\r\n                -ms-flex-flow: row nowrap;\r\n                    flex-flow: row nowrap;\r\n            -webkit-justify-content: space-around;\r\n                -ms-flex-pack: distribute;\r\n                    justify-content: space-around;\r\n            height: 30px;\r\n             padding: 5px 0px;\r\n            list-style-type: none;\r\n            -webkit-align-items: center;\r\n                -ms-flex-align: center;\r\n                    align-items: center;\r\n            margin: 0px;\r\n        }\r\n        \r\n\r\n        .calendarDay-week>ul>li {\r\n            -webkit-flex-basis: 14.28%;\r\n                -ms-flex-preferred-size: 14.28%;\r\n                    flex-basis: 14.28%;\r\n            text-align: center;\r\n        }\r\n       \r\n\r\n        .calendar-range {\r\n            height: 260px;\r\n        }\r\n\r\n\r\n        \r\n        .calendar-range>ul {\r\n            display: -webkit-flex;\r\n            display: -ms-flexbox;\r\n            display: flex;\r\n            -webkit-flex-flow: row wrap;\r\n                -ms-flex-flow: row wrap;\r\n                    flex-flow: row wrap;\r\n            -webkit-justify-content: flex-start;\r\n                -ms-flex-pack: start;\r\n                    justify-content: flex-start;\r\n           \r\n            list-style-type: none;\r\n            -webkit-align-items: center;\r\n                -ms-flex-align: center;\r\n                    align-items: center;\r\n            margin: 0px;\r\n            font-size: 16px;\r\n        }\r\n\r\n         .calendar-range>ul>li>span:hover{\r\n            border:2px solid darkorange;\r\n            color: darkorange;\r\n            border-radius: 4px;\r\n            padding: 5px;\r\n         }\r\n\r\n         .calendar-range>ul>li>span:active{\r\n            border:2px solid darkorange;\r\n            color: #2db7f5;\r\n            border-radius: 4px;\r\n            padding: 5px;\r\n         }\r\n\r\n        \r\n        .calendarDay {\r\n            -webkit-flex-basis: 14.28%;\r\n                -ms-flex-preferred-size: 14.28%;\r\n                    flex-basis: 14.28%;\r\n            height: 40px;\r\n            line-height: 40px;\r\n            text-align: center;\r\n            cursor: pointer;\r\n        }\r\n\r\n        .calendarMonth{\r\n            -webkit-flex-basis: 30%;\r\n                -ms-flex-preferred-size: 30%;\r\n                    flex-basis: 30%;\r\n            height: 60px;\r\n            line-height: 40px;\r\n            text-align: center;\r\n            cursor: pointer;\r\n        }\r\n       \r\n        .itemSelect {\r\n            padding: 5px;\r\n            border:2px solid #2db7f5;\r\n            color: #2db7f5;\r\n            border-radius: 4px;\r\n        }\r\n        .restDay{\r\n            color: #e02d2d;\r\n        }\r\n       \r\n\r\n        .curMonth{\r\n            font-weight: bold;\r\n        }\r\n        \r\n        .calendarDay-footer {\r\n            height: 30px;\r\n            padding: 5px 15px;\r\n            -webkit-flex-flow: row nowrap;\r\n                -ms-flex-flow: row nowrap;\r\n                    flex-flow: row nowrap;\r\n            border-top: 1px solid lightgray;\r\n            display: -webkit-flex;\r\n            display: -ms-flexbox;\r\n            display: flex;\r\n            -webkit-flex-flow: row nowrap;\r\n                -ms-flex-flow: row nowrap;\r\n                    flex-flow: row nowrap;\r\n            -webkit-justify-content: center;\r\n                -ms-flex-pack: center;\r\n                    justify-content: center;\r\n            -webkit-align-items: center;\r\n                -ms-flex-align: center;\r\n                    align-items: center;\r\n            font-weight: bold;\r\n             background-color: whitesmoke;\r\n        }\r\n</style>\r\n   \r\n"],"sourceRoot":"webpack://"}]);
	
	// exports


/***/ },
/* 69 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	// <template>
	//     <div class="calendar">
	//         <div class="calenarDayView" v-show="showDay">
	//             <div class="calendar-header">
	//                 <div class="calendar-title">
	//                     <div>
	//                         <span class="icon-double-angle-left" @click="yearClick(0)"></span>
	//                         <span class="icon-angle-left" style='margin-left:20px;width:50px;' @click="monthClick(0)"></span>
	//                     </div>
	//                     <p>
	//                         <span @click="showYearView">{{curYear}}年</span>
	//                         <span @click="showMonthView">{{curMonth}}月</span>
	//                     </p>
	//                     <div>
	//                          <span class="icon-angle-right" style='margin-right:20px;' @click="monthClick(1)"></span>
	//                          <span class="icon-double-angle-right" @click="yearClick(1)"></span>
	//                     </div>
	//                 </div>
	//                 <div class="calendarDay-week">
	//                     <ul>
	//                         <li v-for="(index,item) in weekRange" :class="{'restDay':index==5||index==6}">{{item}}</li>
	//                     </ul>
	//                 </div>
	//             </div>
	//             <div class="calendar-range" v-touch:swipe="swipeMonth">
	//                 <ul>
	//                     <li v-for="item in dateRange" class="calendarDay"   v-on:click="selectDay(item.day)">
	//                         <span v-bind:class="{'itemSelect':isCurSelect('D',item.day),'restDay':item.isRestDay,'curMonth':item.isCur}">{{item.day}}</span>
	//                     </li>
	//                 </ul>
	//             </div>
	//             <div class="calendarDay-footer">
	//                 <span @click="today">今天</span>
	//             </div>
	//         </div>
	//         <div class="calendarMonthView" v-show="showMonth">
	//             <div class="calendar-header">
	//                 <div class="calendar-title">
	//                     <div>
	//                         <span class="icon-double-angle-left" @click="yearClick(0)"></span>
	//                     </div>
	//                     <p>
	//                         <span @click="showYearView">{{curYear}}年</span>
	//                     </p>
	//                     <div>
	//                          <span class="icon-double-angle-right" @click="yearClick(1)"></span>
	//                     </div>
	//                 </div>
	//             </div>
	//             <div class="calendar-range">
	//                 <ul>
	//                     <li v-for="item in monthRange" class="calendarMonth"   v-on:click="selectMonth(item.id)">
	//                         <span v-bind:class="{'itemSelect':isCurSelect('M',item.id)}">{{item.text}}</span>
	//                     </li>
	//                 </ul>
	//             </div>
	//         </div>
	//         <div class="calendarYearView" v-show="showYear">
	//             <div class="calendar-header">
	//                 <div class="calendar-title">
	//                     <div>
	//                         <span class="icon-double-angle-left" @click="yearClick(0)"></span>
	//                     </div>
	//                     <p>
	//                         <span @click="showYearView">{{yearTitle}}</span>
	//                     </p>
	//                     <div>
	//                          <span class="icon-double-angle-right" @click="yearClick(1)"></span>
	//                     </div>
	//                 </div>
	//             </div>
	//             <div class="calendar-range">
	//                 <ul>
	//                     <li v-for="item in yearRange" class="calendarMonth"   v-on:click="selectYear(item)">
	//                         <span v-bind:class="{'itemSelect':isCurSelect('Y',item)}">{{item}}</span>
	//                     </li>
	//                 </ul>
	//             </div>
	//         </div>
	//     </div>
	// </template>
	
	// <script lang="babel">
	
	exports.default = {
	    data: function data() {
	        return {
	            curYear: 0,
	            curMonth: 0,
	            curDay: 0,
	            showDay: true,
	            showYear: false,
	            showMonth: false,
	            weekRange: ['一', '二', '三', '四', '五', '六', '日'],
	            monthRange: [{ id: 1, text: '一月' }, { id: 2, text: '二月' }, { id: 3, text: '三月' }, { id: 4, text: '四月' }, { id: 5, text: '五月' }, { id: 6, text: '六月' }, { id: 7, text: '七月' }, { id: 8, text: '八月' }, { id: 9, text: '九月' }, { id: 10, text: '十月' }, { id: 11, text: '十一月' }, { id: 12, text: '十二月' }],
	            dateRange: [],
	            yearRange: [],
	            yearTitle: ''
	        };
	    },
	    props: {
	        width: {},
	        //格式
	        format: {
	            type: String,
	            default: "DD" //YYYY,MM,DD,H,M,S
	        },
	        curdate: {
	            type: String,
	            default: ''
	        }
	    },
	    created: function created() {
	        var date = '';
	        if (this.curdate.length > 0) {
	            date = new Date(this.curdate);
	        } else {
	            date = new Date();
	        }
	        //初始化当前的年和月,并加载当前年月的数据
	        this.curYear = date.getFullYear();
	        this.curMonth = date.getMonth() + 1;
	        this.curDay = date.getDate();
	
	        this.dateRange = this.getDateRange(this.curYear, this.curMonth);
	        this.yearRange = this.getYearRange(this.curYear);
	        this.yearTitle = this.yearRange[0] + "~" + this.yearRange[11];
	        //通过格式化显示页面
	        this.initShowView();
	    },
	    methods: {
	        initShowView: function initShowView() {
	            switch (this.format) {
	                case "YYYY":
	                    this.showYear = true;
	                    this.showMonth = false;
	                    this.showDay = false;
	                    break;
	                case "MM":
	                    this.showYear = false;
	                    this.showMonth = true;
	                    this.showDay = false;
	                    break;
	                case "DD":
	                    this.showYear = false;
	                    this.showMonth = false;
	                    this.showDay = true;
	                    break;
	            }
	        },
	        isCurSelect: function isCurSelect(flag, item) {
	            var date = new Date();
	            var tempY = date.getFullYear();
	            var tempM = date.getMonth() + 1;
	            if (flag == "D") {
	                return this.curYear == tempY && this.curMonth == tempM && this.curDay == item;
	            } else if (flag == "M") {
	                return tempM == item;
	            } else {
	                return tempY == item;
	            }
	        },
	        showYearView: function showYearView() {
	            this.showYear = true;
	            this.showMonth = false;
	            this.showDay = false;
	        },
	        showMonthView: function showMonthView() {
	            this.showYear = false;
	            this.showMonth = true;
	            this.showDay = false;
	        },
	
	        selectYear: function selectYear(year) {
	            this.curYear = year;
	            this.showYear = false;
	            this.showMonth = true;
	            this.showDay = false;
	            if (this.format == "YYYY") {
	                this.$dispatch('itemClick', year);
	            }
	        },
	        selectMonth: function selectMonth(month) {
	            this.showYear = false;
	            this.showMonth = false;
	            this.showDay = true;
	            this.curMonth = month;
	            this.dateRange = this.getDateRange(this.curYear, this.curMonth);
	            if (this.format == "MM") {
	                this.$dispatch('itemClick', this.curYear + "-" + month);
	            }
	        },
	
	        //选择天的时候
	        selectDay: function selectDay(day) {
	            var tempD = this.curYear + "-" + this.curMonth + "-" + day;
	            console.log("触发派发事件：" + tempD);
	            this.$dispatch('item-click', tempD);
	        },
	        today: function today() {
	            var newDate = new Date();
	            this.curYear = newDate.getFullYear();
	            this.curMonth = newDate.getMonth() + 1;
	            this.dateRange = this.getDateRange(this.curYear, this.curMonth);
	        },
	        //下一年或下一个月
	        yearClick: function yearClick(flag) {
	            if (this.showYear) {
	                //如果是年的视图的情况
	                var year = flag == 0 ? this.curYear - 10 : this.curYear + 10;
	                this.yearRange = this.getYearRange(year);
	                this.yearTitle = this.yearRange[0] + "~" + this.yearRange[11];
	            } else {
	                var year = flag == 0 ? this.curYear - 1 : this.curYear + 1;
	                this.curYear = year;
	                this.dateRange = this.getDateRange(year, this.curMonth);
	            }
	        },
	        monthClick: function monthClick(flag) {
	            var tempM = this.curMonth;
	            var tempY = this.curYear;
	            //上一月
	            if (flag == 0) {
	                //
	                if (tempM == 1) {
	                    tempM = 12;
	                    tempY = this.curYear - 1;
	                } else {
	                    tempM = tempM - 1;
	                }
	            } else {
	                //下个月
	                if (tempM == 12) {
	                    tempY = this.curYear + 1;
	                    tempM = 1;
	                } else {
	                    tempM = tempM + 1;
	                }
	            }
	            this.curYear = tempY;
	            this.curMonth = tempM;
	            this.dateRange = this.getDateRange(tempY, tempM);
	        },
	        swipeMonth: function swipeMonth(e) {
	
	            var deltaX = e.deltaX;
	            var tempIndex = this.activeIndex;
	            if (deltaX > 0) {
	                this.monthClick(0);
	            } else {
	                this.monthClick(1);
	            }
	        },
	
	        //通过日期来获取当期星期几
	        dayOfWeek: function dayOfWeek(date) {
	            var week = new Date(date).getDay();
	            if (week == 0) {
	                return 7;
	            } else {
	                return week;
	            }
	        },
	        //通过年月来获取月份的天数
	        dayNumOfMonth: function dayNumOfMonth(year, month) {
	            var d = new Date(year, month, 0);
	            return d.getDate();
	        },
	        //加载
	        getDateRange: function getDateRange(year, month) {
	            var datearray = [];
	            var firstDateDay = 0;
	            //1:得到当前月的第一天是星期几
	            var firstDay = year + "-" + month + "-01";
	
	            var firstWeek = this.dayOfWeek(firstDay);
	            //2:通过星期得到日历的第一天
	            if (firstWeek == 1) {
	                firstDateDay = 1;
	            } else {
	                //获取上个月的天数
	                var preMonth = 0;
	                if (month == 1) {
	                    preMonth = this.dayNumOfMonth(year - 1, 12);
	                }
	                preMonth = this.dayNumOfMonth(year, month - 1);
	
	                for (var pi = preMonth - firstWeek + 2; pi <= preMonth; pi++) {
	                    var week = new Date(this.curYear + "/" + (this.curMonth - 1) + "/" + pi).getDay();
	                    var restDay = week == 6 || week == 0;
	                    datearray.push({
	                        isCur: false,
	                        day: pi,
	                        isRestDay: restDay
	                    });
	                }
	            }
	            //3:得到这个月的总天数
	            var curDays = this.dayNumOfMonth(year, month);
	            for (var i = 1; i <= curDays; i++) {
	                var week = new Date(this.curYear + "/" + this.curMonth + "/" + i).getDay();
	                var restDay = week == 6 || week == 0;
	                datearray.push({
	                    isCur: true,
	                    day: i,
	                    isRestDay: restDay
	                });
	            }
	            //2:检查该对象里面是否包含42个值,如果不包含,那么久生成
	            if (datearray.length < 42) {
	                var nextValue = 42 - datearray.length;
	                for (var ni = 1; ni <= nextValue; ni++) {
	                    var week = new Date(this.curYear + "/" + (this.curMonth + 1) + "/" + ni).getDay();
	                    var restDay = week == 6 || week == 0;
	                    datearray.push({
	                        isCur: false,
	                        day: ni,
	                        isRestDay: restDay
	                    });
	                }
	            }
	            return datearray;
	        },
	        getYearRange: function getYearRange(year) {
	            var tempYRange = [];
	            for (var i = year - 6; i <= year + 5; i++) {
	                tempYRange.push(i);
	            };
	            return tempYRange;
	        }
	    }
	};
	
	// </script>

	// <style type="text/css" scoped>
	//         .calendar {
	//             width: 100%;
	//             height: auto;
	//             display: -ms-flexbox;
	//             display: flex;
	//             display: -webkit-flex;
	//             -webkit-flex-flow: column nowrap;
	//                 -ms-flex-flow: column nowrap;
	//                     flex-flow: column nowrap;
	//             -webkit-justify-content: flex-start;
	//                 -ms-flex-pack: start;
	//                     justify-content: flex-start;
	//             box-shadow: 4px 4px 5px gray;
	//             border: 0px solid whitesmoke;
	//             color: #666;
	//             font-size: 14px;

	//         }

	//         .calendar span {
	//             cursor: pointer;
	//         }

	//         .calendar-header {
	//             height: auto;
	//             display: -webkit-flex;
	//             display: -ms-flexbox;
	//             display: flex;
	//             -webkit-flex-flow: column nowrap;
	//                 -ms-flex-flow: column nowrap;
	//                     flex-flow: column nowrap;
	//             -webkit-justify-content: center;
	//                 -ms-flex-pack: center;
	//                     justify-content: center;
	//             border-bottom: 1px solid lightgrey;

	//         }

	//         .calendar-title {
	//             height: 30px;
	//             display: -webkit-flex;
	//             display: -ms-flexbox;
	//             display: flex;
	//             padding: 5px 15px;
	//             -webkit-flex-flow: row nowrap;
	//                 -ms-flex-flow: row nowrap;
	//                     flex-flow: row nowrap;
	//             -webkit-justify-content: space-between;
	//                 -ms-flex-pack: justify;
	//                     justify-content: space-between;
	//             -webkit-align-items: center;
	//                 -ms-flex-align: center;
	//                     align-items: center;
	//             border-bottom: 1px solid lightgrey;
	//             font-weight: bold;
	//         }

	//         .calendarDay-title>span:active {
	//             color: #2db7f5;
	//         }

	//         .calendarDay-week{
	//              background-color: whitesmoke;
	//         }

	//         .calendarDay-week>ul {
	//             display: -webkit-flex;
	//             display: -ms-flexbox;
	//             display: flex;
	//             -webkit-flex-flow: row nowrap;
	//                 -ms-flex-flow: row nowrap;
	//                     flex-flow: row nowrap;
	//             -webkit-justify-content: space-around;
	//                 -ms-flex-pack: distribute;
	//                     justify-content: space-around;
	//             height: 30px;
	//              padding: 5px 0px;
	//             list-style-type: none;
	//             -webkit-align-items: center;
	//                 -ms-flex-align: center;
	//                     align-items: center;
	//             margin: 0px;
	//         }

	//         .calendarDay-week>ul>li {
	//             -webkit-flex-basis: 14.28%;
	//                 -ms-flex-preferred-size: 14.28%;
	//                     flex-basis: 14.28%;
	//             text-align: center;
	//         }

	//         .calendar-range {
	//             height: 260px;
	//         }

	//         .calendar-range>ul {
	//             display: -webkit-flex;
	//             display: -ms-flexbox;
	//             display: flex;
	//             -webkit-flex-flow: row wrap;
	//                 -ms-flex-flow: row wrap;
	//                     flex-flow: row wrap;
	//             -webkit-justify-content: flex-start;
	//                 -ms-flex-pack: start;
	//                     justify-content: flex-start;

	//             list-style-type: none;
	//             -webkit-align-items: center;
	//                 -ms-flex-align: center;
	//                     align-items: center;
	//             margin: 0px;
	//             font-size: 16px;
	//         }

	//          .calendar-range>ul>li>span:hover{
	//             border:2px solid darkorange;
	//             color: darkorange;
	//             border-radius: 4px;
	//             padding: 5px;
	//          }

	//          .calendar-range>ul>li>span:active{
	//             border:2px solid darkorange;
	//             color: #2db7f5;
	//             border-radius: 4px;
	//             padding: 5px;
	//          }

	//         .calendarDay {
	//             -webkit-flex-basis: 14.28%;
	//                 -ms-flex-preferred-size: 14.28%;
	//                     flex-basis: 14.28%;
	//             height: 40px;
	//             line-height: 40px;
	//             text-align: center;
	//             cursor: pointer;
	//         }

	//         .calendarMonth{
	//             -webkit-flex-basis: 30%;
	//                 -ms-flex-preferred-size: 30%;
	//                     flex-basis: 30%;
	//             height: 60px;
	//             line-height: 40px;
	//             text-align: center;
	//             cursor: pointer;
	//         }

	//         .itemSelect {
	//             padding: 5px;
	//             border:2px solid #2db7f5;
	//             color: #2db7f5;
	//             border-radius: 4px;
	//         }
	//         .restDay{
	//             color: #e02d2d;
	//         }

	//         .curMonth{
	//             font-weight: bold;
	//         }

	//         .calendarDay-footer {
	//             height: 30px;
	//             padding: 5px 15px;
	//             -webkit-flex-flow: row nowrap;
	//                 -ms-flex-flow: row nowrap;
	//                     flex-flow: row nowrap;
	//             border-top: 1px solid lightgray;
	//             display: -webkit-flex;
	//             display: -ms-flexbox;
	//             display: flex;
	//             -webkit-flex-flow: row nowrap;
	//                 -ms-flex-flow: row nowrap;
	//                     flex-flow: row nowrap;
	//             -webkit-justify-content: center;
	//                 -ms-flex-pack: center;
	//                     justify-content: center;
	//             -webkit-align-items: center;
	//                 -ms-flex-align: center;
	//                     align-items: center;
	//             font-weight: bold;
	//              background-color: whitesmoke;
	//         }
	// </style>

/***/ },
/* 70 */
/***/ function(module, exports) {

	module.exports = "\n<div class=\"calendar\" _v-3d09c52c=\"\">\n    <div class=\"calenarDayView\" v-show=\"showDay\" _v-3d09c52c=\"\">\n        <div class=\"calendar-header\" _v-3d09c52c=\"\">\n            <div class=\"calendar-title\" _v-3d09c52c=\"\">\n                <div _v-3d09c52c=\"\">\n                    <span class=\"icon-double-angle-left\" @click=\"yearClick(0)\" _v-3d09c52c=\"\"></span>\n                    <span class=\"icon-angle-left\" style=\"margin-left:20px;width:50px;\" @click=\"monthClick(0)\" _v-3d09c52c=\"\"></span>\n                </div>\n                <p _v-3d09c52c=\"\">\n                    <span @click=\"showYearView\" _v-3d09c52c=\"\">{{curYear}}年</span>\n                    <span @click=\"showMonthView\" _v-3d09c52c=\"\">{{curMonth}}月</span>\n                </p>\n                <div _v-3d09c52c=\"\">\n                     <span class=\"icon-angle-right\" style=\"margin-right:20px;\" @click=\"monthClick(1)\" _v-3d09c52c=\"\"></span>\n                     <span class=\"icon-double-angle-right\" @click=\"yearClick(1)\" _v-3d09c52c=\"\"></span>\n                </div>\n            </div>\n            <div class=\"calendarDay-week\" _v-3d09c52c=\"\">\n                <ul _v-3d09c52c=\"\">\n                    <li v-for=\"(index,item) in weekRange\" :class=\"{'restDay':index==5||index==6}\" _v-3d09c52c=\"\">{{item}}</li>\n                </ul>\n            </div>\n        </div>\n        <div class=\"calendar-range\" v-touch:swipe=\"swipeMonth\" _v-3d09c52c=\"\">\n            <ul _v-3d09c52c=\"\">\n                <li v-for=\"item in dateRange\" class=\"calendarDay\" v-on:click=\"selectDay(item.day)\" _v-3d09c52c=\"\">\n                    <span v-bind:class=\"{'itemSelect':isCurSelect('D',item.day),'restDay':item.isRestDay,'curMonth':item.isCur}\" _v-3d09c52c=\"\">{{item.day}}</span>\n                </li>\n            </ul>\n        </div>\n        <div class=\"calendarDay-footer\" _v-3d09c52c=\"\">\n            <span @click=\"today\" _v-3d09c52c=\"\">今天</span>\n        </div>\n    </div>\n    <div class=\"calendarMonthView\" v-show=\"showMonth\" _v-3d09c52c=\"\">\n        <div class=\"calendar-header\" _v-3d09c52c=\"\">\n            <div class=\"calendar-title\" _v-3d09c52c=\"\">\n                <div _v-3d09c52c=\"\">\n                    <span class=\"icon-double-angle-left\" @click=\"yearClick(0)\" _v-3d09c52c=\"\"></span>\n                </div>\n                <p _v-3d09c52c=\"\">\n                    <span @click=\"showYearView\" _v-3d09c52c=\"\">{{curYear}}年</span>\n                </p>\n                <div _v-3d09c52c=\"\">\n                     <span class=\"icon-double-angle-right\" @click=\"yearClick(1)\" _v-3d09c52c=\"\"></span>\n                </div>\n            </div>\n        </div>\n        <div class=\"calendar-range\" _v-3d09c52c=\"\">\n            <ul _v-3d09c52c=\"\">\n                <li v-for=\"item in monthRange\" class=\"calendarMonth\" v-on:click=\"selectMonth(item.id)\" _v-3d09c52c=\"\">\n                    <span v-bind:class=\"{'itemSelect':isCurSelect('M',item.id)}\" _v-3d09c52c=\"\">{{item.text}}</span>\n                </li>\n            </ul>\n        </div>\n    </div>\n    <div class=\"calendarYearView\" v-show=\"showYear\" _v-3d09c52c=\"\">\n        <div class=\"calendar-header\" _v-3d09c52c=\"\">\n            <div class=\"calendar-title\" _v-3d09c52c=\"\">\n                <div _v-3d09c52c=\"\">\n                    <span class=\"icon-double-angle-left\" @click=\"yearClick(0)\" _v-3d09c52c=\"\"></span>\n                </div>\n                <p _v-3d09c52c=\"\">\n                    <span @click=\"showYearView\" _v-3d09c52c=\"\">{{yearTitle}}</span>\n                </p>\n                <div _v-3d09c52c=\"\">\n                     <span class=\"icon-double-angle-right\" @click=\"yearClick(1)\" _v-3d09c52c=\"\"></span>\n                </div>\n            </div>\n        </div>\n        <div class=\"calendar-range\" _v-3d09c52c=\"\">\n            <ul _v-3d09c52c=\"\">\n                <li v-for=\"item in yearRange\" class=\"calendarMonth\" v-on:click=\"selectYear(item)\" _v-3d09c52c=\"\">\n                    <span v-bind:class=\"{'itemSelect':isCurSelect('Y',item)}\" _v-3d09c52c=\"\">{{item}}</span>\n                </li>\n            </ul>\n        </div>\n    </div>\n</div>\n";

/***/ },
/* 71 */
/***/ function(module, exports) {

	module.exports = "\n<toolbar :text=\"title\">\n\t<span class=\"icon-chevron-left\" slot=\"leftBtn\" @click=\"back()\"></span>\n\t<span slot=\"rightBtn\"></span>\n</toolbar>\n<calendar v-on:item-click=\"selectDay\"></calendar>\n";

/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__webpack_require__(73)
	__vue_script__ = __webpack_require__(75)
	__vue_template__ = __webpack_require__(86)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) { (typeof module.exports === "function" ? module.exports.options : module.exports).template = __vue_template__ }
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), true)
	  if (!hotAPI.compatible) return
	  var id = "E:\\workspace\\mobile-dev\\src\\views\\UserInfo.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(74);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(10)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js?sourceMap!./../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-61f407d1&file=UserInfo.vue&scoped=true!./../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./UserInfo.vue", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js?sourceMap!./../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-61f407d1&file=UserInfo.vue&scoped=true!./../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./UserInfo.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(9)();
	// imports
	
	
	// module
	exports.push([module.id, "\n\n", "", {"version":3,"sources":[],"names":[],"mappings":"","file":"UserInfo.vue","sourceRoot":"webpack://"}]);
	
	// exports


/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _ToolBar = __webpack_require__(12);
	
	var _ToolBar2 = _interopRequireDefault(_ToolBar);
	
	var _Loading = __webpack_require__(40);
	
	var _Loading2 = _interopRequireDefault(_Loading);
	
	var _Dialog = __webpack_require__(76);
	
	var _Dialog2 = _interopRequireDefault(_Dialog);
	
	var _DatePicker = __webpack_require__(81);
	
	var _DatePicker2 = _interopRequireDefault(_DatePicker);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	// <template>
	// 	<toolbar text="个人主页">
	// 		<span class="icon-chevron-left" slot="leftBtn" @click="back">返回</span>
	// 		<span class="icon-refresh" slot="rightBtn" @click="loadUserInfo"></span>
	// 	</toolbar>
	// 	<section >
	// 		<input type="button" @click="showDialog" value="显示dialog">
	// 		<datepicker></datepicker>
	// 	</section>
	
	// 	<loading :loading="isload"></loading>
	// 	<dialog :show.sync="isShowDialog" :title="dialogTitle" :is-alert="isAlert" v-on:child-confirm="confirm">
	// 		<div slot="dialog-bd">我的世界你不懂</div>
	// 	</dialog>
	// </template>
	
	// <script lang="babel">
	
	exports.default = {
		created: function created() {
			var _this = this;
	
			//加载远程数据
			//1:显示加载动画
			setTimeout(function () {
				_this.isload = false;
			}, 1000);
		},
	
		props: {},
		methods: {
			back: function back() {
				history.back();
			},
	
			//加载用户信息
			loadUserInfo: function loadUserInfo() {
				var _this2 = this;
	
				this.isload = true;
				setTimeout(function () {
					_this2.isload = false;
				}, 1000);
			},
			showDialog: function showDialog() {
				this.isShowDialog = !this.isShowDialog;
			},
			confirm: function confirm() {
				alert("子组件触发了事件");
			}
		},
		data: function data() {
			return {
				isload: true,
				isShowDialog: false,
				dialogTitle: '测试',
				isAlert: true
			};
		},
	
		components: {
			toolbar: _ToolBar2.default,
			loading: _Loading2.default,
			dialog: _Dialog2.default,
			datepicker: _DatePicker2.default
		}
	
	};
	
	// </script>

	// <style type="text/css" scoped>

	// </style>

/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__webpack_require__(77)
	__vue_script__ = __webpack_require__(79)
	__vue_template__ = __webpack_require__(80)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) { (typeof module.exports === "function" ? module.exports.options : module.exports).template = __vue_template__ }
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), true)
	  if (!hotAPI.compatible) return
	  var id = "E:\\workspace\\mobile-dev\\src\\components\\Dialog.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 77 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(78);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(10)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js?sourceMap!./../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-12989f74&file=Dialog.vue&scoped=true!./../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./Dialog.vue", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js?sourceMap!./../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-12989f74&file=Dialog.vue&scoped=true!./../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./Dialog.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 78 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(9)();
	// imports
	
	
	// module
	exports.push([module.id, "\n\n.dialog[_v-12989f74]{\n    padding: 0px;\n    margin: 0px;\n}\n\n/*遮罩层*/\n.dialog-mask[_v-12989f74]{\n    position: fixed;\n    left: 0;\n    top: 0;\n    width: 100%;\n    height: 100%;\n    background-color: rgba(0, 0, 0, 0.6);\n    z-index: 10;\n}\n\n.dialog-content[_v-12989f74]{\n    position: fixed;\n    z-index: 20;\n    width: 85%;\n    top: 50%;\n    left: 50%;\n    max-width: 400px;\n    -webkit-transform: translate(-50%, -50%);\n            transform: translate(-50%, -50%);\n    background-color: #fff;\n    text-align: center;\n    border-radius: 3px;\n}\n\n.dialog-content>.dialog-hd[_v-12989f74]{\n    padding: 1.2em 20px .5em;\n    font-weight: 400;\n    font-size: 17px;\n}\n\n.dialog-content>.dialog-bd[_v-12989f74]{\n    text-align: left;\n     padding: 0 20px;\n    font-size: 15px;\n    color: #888;\n}\n\n.dialog-content>.dialog-ft[_v-12989f74]{\n    position: relative;\n    line-height: 42px;\n    margin-top: 20px;\n    font-size: 17px;\n    display: -webkit-box;\n    display: -webkit-flex;\n    display: -ms-flexbox;\n    display: flex;\n    display: flexbox;\n}\n\n.dialog-ft[_v-12989f74]:before{\n    content:\" \";\n    position: absolute;\n    width: 8.14px;\n    height: 1.08px;\n    background: rgb(209, 209, 213);\n    box-shadow: rgba(0, 0, 0, 0.0980392) 0px 0px 1px;\n    border-radius: 1px;\n    -webkit-transform-origin: left 50% 0px;\n            transform-origin: left 50% 0px;\n    width: 100%;\n}\n\n.dialog-ft>a[_v-12989f74]{\n    -webkit-flex:1;\n        -ms-flex:1;\n            flex:1;\n    -webkit-box-flex:1;\n}\n\n\n\n\n", "", {"version":3,"sources":["/./src/components/Dialog.vue?6f807018"],"names":[],"mappings":";;AA4DA;IACA,aAAA;IACA,YAAA;CACA;;AAEA,OAAA;AACA;IACA,gBAAA;IACA,QAAA;IACA,OAAA;IACA,YAAA;IACA,aAAA;IACA,qCAAA;IACA,YAAA;CACA;;AAEA;IACA,gBAAA;IACA,YAAA;IACA,WAAA;IACA,SAAA;IACA,UAAA;IACA,iBAAA;IACA,yCAAA;YAAA,iCAAA;IACA,uBAAA;IACA,mBAAA;IACA,mBAAA;CACA;;AAEA;IACA,yBAAA;IACA,iBAAA;IACA,gBAAA;CACA;;AAEA;IACA,iBAAA;KACA,gBAAA;IACA,gBAAA;IACA,YAAA;CACA;;AAEA;IACA,mBAAA;IACA,kBAAA;IACA,iBAAA;IACA,gBAAA;IACA,qBAAA;IAAA,sBAAA;IAAA,qBAAA;IAAA,cAAA;IACA,iBAAA;CACA;;AAEA;IACA,YAAA;IACA,mBAAA;IACA,cAAA;IACA,eAAA;IACA,+BAAA;IACA,iDAAA;IACA,mBAAA;IACA,uCAAA;YAAA,+BAAA;IACA,YAAA;CACA;;AAEA;IACA,eAAA;QAAA,WAAA;YAAA,OAAA;IACA,mBAAA;CACA","file":"Dialog.vue","sourcesContent":["<template>\r\n    <section class=\"dialog\"  v-show=\"show\">\r\n        <section class=\"dialog-mask\"></section>\r\n        <section class=\"dialog-content\">\r\n            <section class=\"dialog-hd\">{{title}}</section>\r\n            <section class=\"dialog-bd\">\r\n                <slot name=\"dialog-bd\"></slot>\r\n            </section>\r\n            <section class=\"dialog-ft\" v-if=\"isAlert\">\r\n            <!-- 判断类别,如果是 -->\r\n                <a href=\"javascript:;\" class=\"weui_btn_dialog primary\" v-touch:tap=\"close\">确定</a>\r\n            </section>\r\n            <section class=\"dialog-ft\" v-else>\r\n            <!-- 判断类别,如果是 -->\r\n                <a href=\"javascript:;\" class=\"weui_btn_dialog default\" v-touch:tap=\"close\">取消</a>\r\n                <a href=\"javascript:;\" class=\"weui_btn_dialog primary\" v-touch:tap=\"confirm\">确定</a>\r\n            </section>\r\n        </section>\r\n    </section>\r\n\r\n</template>\r\n\r\n<script lang=\"babel\">\r\n\t\r\n\texport default {\r\n\t\tmethods:{\r\n\t\t\t// 关闭dialog\r\n\t\t\tclose(){\r\n\t\t\t\tthis.show=!this.show;\r\n\t\t\t},\r\n\t\t\tconfirm(){\r\n\t\t\t\t//将事件派发到父组件中,在通过父组件进行监听该事件\r\n\t\t\t\tthis.$dispatch('child-confirm');\r\n\t\t\t}\r\n\t\t},\r\n\t\tprops:{\r\n\t\t\tshow:{\r\n\t\t\t\ttype:Boolean,\r\n\t\t\t\tdefault:false,\r\n\t\t\t\trequire:true\r\n\t\t\t},\r\n            isAlert:{\r\n                type:Boolean,\r\n                default:false\r\n            },\r\n\t\t\t//显示效果\r\n\t\t\teffect:{\r\n\t\t\t\ttype:String,\r\n\t\t\t\tdefault:'fade'\r\n\t\t\t},\r\n\t\t\ttitle:{\r\n\t\t\t\ttype:String,\r\n\t\t\t\tdefault:''\r\n\t\t\t}\r\n\t\t}\r\n\t}\r\n</script>\r\n\r\n<style  type=\"text/css\" scoped>\r\n\t\r\n    .dialog{\r\n        padding: 0px;\r\n        margin: 0px;\r\n    }\r\n\r\n    /*遮罩层*/\r\n    .dialog-mask{\r\n        position: fixed;\r\n        left: 0;\r\n        top: 0;\r\n        width: 100%;\r\n        height: 100%;\r\n        background-color: rgba(0, 0, 0, 0.6);\r\n        z-index: 10;\r\n    }\r\n    \r\n    .dialog-content{\r\n        position: fixed;\r\n        z-index: 20;\r\n        width: 85%;\r\n        top: 50%;\r\n        left: 50%;\r\n        max-width: 400px;\r\n        transform: translate(-50%, -50%);\r\n        background-color: #fff;\r\n        text-align: center;\r\n        border-radius: 3px;\r\n    }\r\n\r\n    .dialog-content>.dialog-hd{\r\n        padding: 1.2em 20px .5em;\r\n        font-weight: 400;\r\n        font-size: 17px;\r\n    }\r\n\r\n    .dialog-content>.dialog-bd{\r\n        text-align: left;\r\n         padding: 0 20px;\r\n        font-size: 15px;\r\n        color: #888;\r\n    }\r\n\r\n    .dialog-content>.dialog-ft{\r\n        position: relative;\r\n        line-height: 42px;\r\n        margin-top: 20px;\r\n        font-size: 17px;\r\n        display: flex;\r\n        display: flexbox;\r\n    }\r\n\r\n    .dialog-ft:before{\r\n        content:\" \";\r\n        position: absolute;\r\n        width: 8.14px;\r\n        height: 1.08px;\r\n        background: rgb(209, 209, 213);\r\n        box-shadow: rgba(0, 0, 0, 0.0980392) 0px 0px 1px;\r\n        border-radius: 1px;\r\n        transform-origin: left 50% 0px;\r\n        width: 100%;\r\n    }\r\n\r\n    .dialog-ft>a{\r\n        flex:1;\r\n        -webkit-box-flex:1;\r\n    }\r\n\r\n\r\n\r\n\t  \r\n</style>"],"sourceRoot":"webpack://"}]);
	
	// exports


/***/ },
/* 79 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	// <template>
	//     <section class="dialog"  v-show="show">
	//         <section class="dialog-mask"></section>
	//         <section class="dialog-content">
	//             <section class="dialog-hd">{{title}}</section>
	//             <section class="dialog-bd">
	//                 <slot name="dialog-bd"></slot>
	//             </section>
	//             <section class="dialog-ft" v-if="isAlert">
	//             <!-- 判断类别,如果是 -->
	//                 <a href="javascript:;" class="weui_btn_dialog primary" v-touch:tap="close">确定</a>
	//             </section>
	//             <section class="dialog-ft" v-else>
	//             <!-- 判断类别,如果是 -->
	//                 <a href="javascript:;" class="weui_btn_dialog default" v-touch:tap="close">取消</a>
	//                 <a href="javascript:;" class="weui_btn_dialog primary" v-touch:tap="confirm">确定</a>
	//             </section>
	//         </section>
	//     </section>
	
	// </template>
	
	// <script lang="babel">
	
	exports.default = {
		methods: {
			// 关闭dialog
	
			close: function close() {
				this.show = !this.show;
			},
			confirm: function confirm() {
				//将事件派发到父组件中,在通过父组件进行监听该事件
				this.$dispatch('child-confirm');
			}
		},
		props: {
			show: {
				type: Boolean,
				default: false,
				require: true
			},
			isAlert: {
				type: Boolean,
				default: false
			},
			//显示效果
			effect: {
				type: String,
				default: 'fade'
			},
			title: {
				type: String,
				default: ''
			}
		}
	};
	// </script>

	// <style  type="text/css" scoped>

	//     .dialog{
	//         padding: 0px;
	//         margin: 0px;
	//     }

	//     /*遮罩层*/
	//     .dialog-mask{
	//         position: fixed;
	//         left: 0;
	//         top: 0;
	//         width: 100%;
	//         height: 100%;
	//         background-color: rgba(0, 0, 0, 0.6);
	//         z-index: 10;
	//     }

	//     .dialog-content{
	//         position: fixed;
	//         z-index: 20;
	//         width: 85%;
	//         top: 50%;
	//         left: 50%;
	//         max-width: 400px;
	//         transform: translate(-50%, -50%);
	//         background-color: #fff;
	//         text-align: center;
	//         border-radius: 3px;
	//     }

	//     .dialog-content>.dialog-hd{
	//         padding: 1.2em 20px .5em;
	//         font-weight: 400;
	//         font-size: 17px;
	//     }

	//     .dialog-content>.dialog-bd{
	//         text-align: left;
	//          padding: 0 20px;
	//         font-size: 15px;
	//         color: #888;
	//     }

	//     .dialog-content>.dialog-ft{
	//         position: relative;
	//         line-height: 42px;
	//         margin-top: 20px;
	//         font-size: 17px;
	//         display: flex;
	//         display: flexbox;
	//     }

	//     .dialog-ft:before{
	//         content:" ";
	//         position: absolute;
	//         width: 8.14px;
	//         height: 1.08px;
	//         background: rgb(209, 209, 213);
	//         box-shadow: rgba(0, 0, 0, 0.0980392) 0px 0px 1px;
	//         border-radius: 1px;
	//         transform-origin: left 50% 0px;
	//         width: 100%;
	//     }

	//     .dialog-ft>a{
	//         flex:1;
	//         -webkit-box-flex:1;
	//     }

	// </style>

/***/ },
/* 80 */
/***/ function(module, exports) {

	module.exports = "\n<section class=\"dialog\" v-show=\"show\" _v-12989f74=\"\">\n    <section class=\"dialog-mask\" _v-12989f74=\"\"></section>\n    <section class=\"dialog-content\" _v-12989f74=\"\">\n        <section class=\"dialog-hd\" _v-12989f74=\"\">{{title}}</section>\n        <section class=\"dialog-bd\" _v-12989f74=\"\">\n            <slot name=\"dialog-bd\" _v-12989f74=\"\"></slot>\n        </section>\n        <section class=\"dialog-ft\" v-if=\"isAlert\" _v-12989f74=\"\">\n        <!-- 判断类别,如果是 -->\n            <a href=\"javascript:;\" class=\"weui_btn_dialog primary\" v-touch:tap=\"close\" _v-12989f74=\"\">确定</a>\n        </section>\n        <section class=\"dialog-ft\" v-else=\"\" _v-12989f74=\"\">\n        <!-- 判断类别,如果是 -->\n            <a href=\"javascript:;\" class=\"weui_btn_dialog default\" v-touch:tap=\"close\" _v-12989f74=\"\">取消</a>\n            <a href=\"javascript:;\" class=\"weui_btn_dialog primary\" v-touch:tap=\"confirm\" _v-12989f74=\"\">确定</a>\n        </section>\n    </section>\n</section>\n\n";

/***/ },
/* 81 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__webpack_require__(82)
	__vue_script__ = __webpack_require__(84)
	__vue_template__ = __webpack_require__(85)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) { (typeof module.exports === "function" ? module.exports.options : module.exports).template = __vue_template__ }
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), true)
	  if (!hotAPI.compatible) return
	  var id = "E:\\workspace\\mobile-dev\\src\\components\\DatePicker.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 82 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(83);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(10)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js?sourceMap!./../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-e36f8ff0&file=DatePicker.vue&scoped=true!./../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./DatePicker.vue", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js?sourceMap!./../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-e36f8ff0&file=DatePicker.vue&scoped=true!./../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./DatePicker.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(9)();
	// imports
	
	
	// module
	exports.push([module.id, "\n\n    .datepicker[_v-e36f8ff0]{\n        display: -webkit-box;\n        display: -webkit-flex;\n        display: -ms-flexbox;\n        display: flex;\n        -webkit-flex-flow:column nowrap;\n            -ms-flex-flow:column nowrap;\n                flex-flow:column nowrap;\n    }\n\n  .datepicker-header[_v-e36f8ff0]{\n      background-color: whitesmoke;\n      display: -webkit-flex;\n      display: -ms-flexbox;\n      display: -webkit-box;\n      display: flex;\n      -webkit-flex-flow:row nowrap;\n          -ms-flex-flow:row nowrap;\n              flex-flow:row nowrap;\n      -webkit-justify-content: space-around;\n          -ms-flex-pack: distribute;\n              justify-content: space-around;\n      height: 30px;\n      width: 300px;\n      font-size: 20px;\n      padding: 5px 20px 0px 20px;\n      -webkit-box-align:center;\n      -webkit-align-items:center;\n          -ms-flex-align:center;\n              align-items:center;\n      border-radius: 5px;\n      font-weight: bold;\n  }\n\n  .datepicker-body[_v-e36f8ff0]{\n      background-color: whitesmoke;\n      display: -webkit-flex;\n      display: -ms-flexbox;\n      display: -webkit-box;\n      display: flex;\n      -webkit-flex-flow:row nowrap;\n          -ms-flex-flow:row nowrap;\n              flex-flow:row nowrap;\n      -webkit-justify-content: space-around;\n          -ms-flex-pack: distribute;\n              justify-content: space-around;\n      height: 200px;\n      width: 300px;\n      font-size: 20px;\n      padding: 5px 20px;\n      overflow: hidden;\n      -webkit-box-align:center;\n      -webkit-align-items:center;\n          -ms-flex-align:center;\n              align-items:center;\n      border-radius: 5px;\n  }\n\n\n  .datepicker-body>.column[_v-e36f8ff0]{\n      display: -webkit-flex;\n      display: -ms-flexbox;\n      display: -webkit-box;\n      display: flex;\n      -webkit-flex-flow:column nowrap;\n      -ms-flex-flow:column nowrap;\n              flex-flow:column nowrap;\n      -webkit-justify-content:center;\n      -ms-flex-pack:center;\n              -webkit-box-pack:center;\n              justify-content:center;\n      -webkit-align-items:space-around;\n      -ms-flex-align:space-around;\n              -webkit-box-align:space-around;\n              align-items:space-around;\n              padding: 5px;\n\n  }\n\n  .column>span[_v-e36f8ff0]{\n    padding: 10px;\n    width: 60px;\n    text-align: center;\n    vertical-align: middle;\n    background-color: white;    \n  }\n\n\n  .column>span[_v-e36f8ff0]:active{\n         background-color: darkorange;\n  }\n\n  .column>span[_v-e36f8ff0]:nth-child(1){\n     border-radius: 5px 5px 0px 0px;\n     box-shadow: 0px 0px 3px gray;\n  }\n\n  .column>span[_v-e36f8ff0]:nth-child(3){\n     border-radius: 0px 0px 5px 5px;\n     box-shadow: 0px 0px 3px gray;\n  }\n\n .datepicker-icon[_v-e36f8ff0]{\n      border: 2px solid gray;\n      height: 30px;\n      line-height: 30px;\n      font-size: 24px;\n }\n\n\n.datepicker-value[_v-e36f8ff0]{\n    height: 50px;\n    border-left: 2px solid gray;\n    border-right: 2px solid gray;\n    line-height: 50px;\n       font-size: 30px;\n    font-weight: bold;\n}\n\n\n", "", {"version":3,"sources":["/./src/components/DatePicker.vue?3b0c11c3"],"names":[],"mappings":";;IA4LA;QACA,qBAAA;QAAA,sBAAA;QAAA,qBAAA;QAAA,cAAA;QACA,gCAAA;YAAA,4BAAA;gBAAA,wBAAA;KACA;;EAEA;MACA,6BAAA;MACA,sBAAA;MACA,qBAAA;MACA,qBAAA;MAAA,cAAA;MACA,6BAAA;UACA,yBAAA;cACA,qBAAA;MACA,sCAAA;UAAA,0BAAA;cAAA,8BAAA;MACA,aAAA;MACA,aAAA;MACA,gBAAA;MACA,2BAAA;MACA,yBAAA;MAAA,2BAAA;UAAA,sBAAA;cAAA,mBAAA;MACA,mBAAA;MACA,kBAAA;GACA;;EAEA;MACA,6BAAA;MACA,sBAAA;MACA,qBAAA;MACA,qBAAA;MAAA,cAAA;MACA,6BAAA;UACA,yBAAA;cACA,qBAAA;MACA,sCAAA;UAAA,0BAAA;cAAA,8BAAA;MACA,cAAA;MACA,aAAA;MACA,gBAAA;MACA,kBAAA;MACA,iBAAA;MACA,yBAAA;MAAA,2BAAA;UAAA,sBAAA;cAAA,mBAAA;MACA,mBAAA;GACA;;;EAGA;MACA,sBAAA;MACA,qBAAA;MACA,qBAAA;MAAA,cAAA;MACA,gCAAA;MACA,4BAAA;cACA,wBAAA;MACA,+BAAA;MACA,qBAAA;cACA,wBAAA;cAAA,uBAAA;MACA,iCAAA;MACA,4BAAA;cACA,+BAAA;cAAA,yBAAA;cACA,aAAA;;GAEA;;EAEA;IACA,cAAA;IACA,YAAA;IACA,mBAAA;IACA,uBAAA;IACA,wBAAA;GACA;;;EAGA;SACA,6BAAA;GACA;;EAEA;KACA,+BAAA;KACA,6BAAA;GACA;;EAEA;KACA,+BAAA;KACA,6BAAA;GACA;;CAEA;MACA,uBAAA;MACA,aAAA;MACA,kBAAA;MACA,gBAAA;EACA;;;AAGA;IACA,aAAA;IACA,4BAAA;IACA,6BAAA;IACA,kBAAA;OACA,gBAAA;IACA,kBAAA;CACA","file":"DatePicker.vue","sourcesContent":["<template>\r\n\r\n  <div class=\"datepicker\">\r\n      <section class=\"datepicker-header\">\r\n        <div>年</div>\r\n        <div>月</div>\r\n        <div>日</div>\r\n      </section>\r\n      <section class=\"datepicker-body\">\r\n          <div class=\"column datepicker-year\">\r\n              <span class=\"datepicker-icon\" @click=\"add('Y')\"><i class=\"icon-plus\"></i></span>\r\n              <span class=\"datepicker-value\">{{curYear}}</span>\r\n              <span class=\"datepicker-icon\" @click=\"minus('Y')\"><i class=\"icon-minus\"></i></span>\r\n          </div>\r\n          <div class=\"column datepicker-month\">\r\n              <span  class=\"datepicker-icon\" @click=\"add('M')\"><i class=\"icon-plus\"></i></span>\r\n              <span class=\"datepicker-value\">{{curMonth<10?(\"0\"+curMonth):curMonth}}</span>\r\n              <span  class=\"datepicker-icon\" @click=\"minus('M')\"><i class=\"icon-minus\"></i></span>\r\n          </div>\r\n          <div class=\"column datepicker-day\">\r\n              <span  class=\"datepicker-icon\" @click=\"add('D')\"><i class=\"icon-plus\"></i></span>\r\n              <span class=\"datepicker-value\">{{curDay<10?(\"0\"+curDay):curDay}}</span>\r\n              <span  class=\"datepicker-icon\" @click=\"minus('D')\"><i class=\"icon-minus\"></i></span>\r\n          </div>\r\n      </section> \r\n  </div>\r\n    \r\n\r\n    <!--   <ul class=\"datepicker-hour\">\r\n          <li v-for=\"item in hourRange\">{{item}}</li>\r\n      </ul>\r\n      <ul class=\"datepicker-min\">\r\n          <li v-for=\"item in minRange\">{{item}}</li>\r\n      </ul>\r\n      <ul class=\"datepicker-sec\">\r\n          <li v-for=\"item in secRange\">{{item}}</li>\r\n      </ul> -->\r\n    \r\n</template>\r\n\r\n<script lang=\"babel\">\r\n    export default {\r\n        created(){\r\n            //初始化数据\r\n            var date='';\r\n            if(this.curdate.length>0){\r\n              date=new Date(this.curdate);\r\n            }else{\r\n              date=new Date();\r\n            }\r\n            this.curYear=date.getFullYear();\r\n            this.curMonth=date.getMonth()+1;\r\n            this.curDay=date.getDate();\r\n            //初始化年份\r\n            this.yearRange=this.getYearRange(this.curYear);\r\n            //初始化天数\r\n            this.dayRange=this.getDayRange(this.curYear,this.curMonth);\r\n\r\n            this.yHeight=40*this.yearRange.length;\r\n            this.mHeight=40*this.monthRange.length;\r\n            this.dHeight=40*this.dayRange.length;\r\n            \r\n\r\n            //初始化显示的数据\r\n            this.showDays=this.getShowRange(this.curDay,'D');\r\n            this.showYears=this.getShowRange(this.curYear,'Y');\r\n            this.showMonths=this.getShowRange(this.curMonth,'M');\r\n            console.log(this.showYears);\r\n            console.log(this.showMonths);\r\n            console.log(this.showDays);\r\n\r\n\r\n        },\r\n        props:{\r\n          curdate:{\r\n            type:String,\r\n            default:''\r\n          }\r\n        },\r\n        data(){\r\n            return {\r\n              yearRange:[],\r\n              monthRange:[ \r\n                           1,2,3,4,5,6,7,8,9,10,11,12\r\n                         ],\r\n              dayRange:[],\r\n              hourRange:[],\r\n              minRange:[],\r\n              secRange:[],\r\n              curYear:0,\r\n              curMonth:0,\r\n              curDay:0,\r\n              curHour:0,\r\n              curMin:0,\r\n              curSec:0\r\n            }\r\n        },\r\n        methods:{\r\n            add(flag){\r\n             //通过年月来获取月份的天数\r\n                switch(flag){\r\n                  case \"Y\":\r\n                    this.curYear=this.curYear+1;\r\n                    break;\r\n                  case \"M\":\r\n                    //1:判断月份所在的index\r\n                      var index=this.curMonth==12?0:this.curMonth;\r\n                      this.curMonth=this.monthRange[index];\r\n                      this.dayRange=this.getDayRange(this.curYear,this.curMonth);\r\n                    break;\r\n                  case \"D\":\r\n                      var length=this.dayRange.length;\r\n                      var dayIndex=this.curDay==length?0:this.curDay;\r\n                      this.curDay=this.dayRange[dayIndex];\r\n                    break;\r\n                }\r\n            },\r\n            minus(flag){\r\n                 switch(flag){\r\n                    case \"Y\":\r\n                      this.curYear=this.curYear-1;\r\n                      break;\r\n                    case \"M\":\r\n                      var index=this.curMonth==1?11:this.curMonth-2;\r\n                      this.curMonth=this.monthRange[index];\r\n                      this.dayRange=this.getDayRange(this.curYear,this.curMonth);\r\n                      break;\r\n                    case \"D\":\r\n                        var length=this.dayRange.length;\r\n                        var dayIndex=this.curDay==1?length-1:this.curDay-2;\r\n                        this.curDay=this.dayRange[dayIndex];\r\n                      break;\r\n                  }\r\n            },\r\n            dayNumOfMonth:function(year,month){\r\n                var d = new Date(year,month,0);\r\n                return d.getDate();\r\n            },\r\n            //通过年份来获取年份的区间\r\n            getYearRange:function(year){\r\n              var tempYR=[];\r\n              for (var i = year- 10; i <=year+5; i++) {\r\n                  tempYR.push(i);\r\n              }          \r\n              return tempYR;\r\n            },\r\n            getDayRange:function(year,month){\r\n               var tempDR=[];\r\n               var length=this.dayNumOfMonth(year,month);\r\n               for (var i = 1; i <=length; i++) {\r\n                  tempDR.push(i);\r\n               };\r\n               return tempDR;\r\n            },\r\n            //获取显示的数据\r\n            getShowRange(val,flag){\r\n              var tempSR=[];\r\n              var start=1,end=0;\r\n              start=val-2;\r\n              end=val+2;\r\n              for (var i = start; i <=end; i++) {\r\n                 switch(flag){\r\n                  case \"Y\":\r\n                    if(this.yearRange.indexOf(i)>=0){\r\n                        tempSR.push(i);\r\n                    }\r\n                    break;\r\n                  case \"M\":\r\n                    if(this.monthRange.indexOf(i)>=0){\r\n                       tempSR.push(i);\r\n                    }\r\n                    break;\r\n\r\n                  case \"D\":\r\n                    if(this.dayRange.indexOf(i)>=0){\r\n                       tempSR.push(i);\r\n                    }\r\n                    break;\r\n                  }\r\n              };\r\n              return tempSR;\r\n            }\r\n        }\r\n    }\r\n</script>\r\n\r\n<style type=\"text/css\" scoped>\r\n\r\n        .datepicker{\r\n            display: flex;\r\n            flex-flow:column nowrap;\r\n        }\r\n\r\n      .datepicker-header{\r\n          background-color: whitesmoke;\r\n          display: -webkit-flex;\r\n          display: -ms-flexbox;\r\n          display: flex;\r\n          -webkit-flex-flow:row nowrap;\r\n              -ms-flex-flow:row nowrap;\r\n                  flex-flow:row nowrap;\r\n          justify-content: space-around;\r\n          height: 30px;\r\n          width: 300px;\r\n          font-size: 20px;\r\n          padding: 5px 20px 0px 20px;\r\n          align-items:center;\r\n          border-radius: 5px;\r\n          font-weight: bold;\r\n      }\r\n\r\n      .datepicker-body{\r\n          background-color: whitesmoke;\r\n          display: -webkit-flex;\r\n          display: -ms-flexbox;\r\n          display: flex;\r\n          -webkit-flex-flow:row nowrap;\r\n              -ms-flex-flow:row nowrap;\r\n                  flex-flow:row nowrap;\r\n          justify-content: space-around;\r\n          height: 200px;\r\n          width: 300px;\r\n          font-size: 20px;\r\n          padding: 5px 20px;\r\n          overflow: hidden;\r\n          align-items:center;\r\n          border-radius: 5px;\r\n      }\r\n\r\n\r\n      .datepicker-body>.column{\r\n          display: -webkit-flex;\r\n          display: -ms-flexbox;\r\n          display: flex;\r\n          -webkit-flex-flow:column nowrap;\r\n          -ms-flex-flow:column nowrap;\r\n                  flex-flow:column nowrap;\r\n          -webkit-justify-content:center;\r\n          -ms-flex-pack:center;\r\n                  justify-content:center;\r\n          -webkit-align-items:space-around;\r\n          -ms-flex-align:space-around;\r\n                  align-items:space-around;\r\n                  padding: 5px;\r\n\r\n      }\r\n\r\n      .column>span{\r\n        padding: 10px;\r\n        width: 60px;\r\n        text-align: center;\r\n        vertical-align: middle;\r\n        background-color: white;    \r\n      }\r\n  \r\n\r\n      .column>span:active{\r\n             background-color: darkorange;\r\n      }\r\n\r\n      .column>span:nth-child(1){\r\n         border-radius: 5px 5px 0px 0px;\r\n         box-shadow: 0px 0px 3px gray;\r\n      }\r\n\r\n      .column>span:nth-child(3){\r\n         border-radius: 0px 0px 5px 5px;\r\n         box-shadow: 0px 0px 3px gray;\r\n      }\r\n\r\n     .datepicker-icon{\r\n          border: 2px solid gray;\r\n          height: 30px;\r\n          line-height: 30px;\r\n          font-size: 24px;\r\n     }\r\n\r\n    \r\n    .datepicker-value{\r\n        height: 50px;\r\n        border-left: 2px solid gray;\r\n        border-right: 2px solid gray;\r\n        line-height: 50px;\r\n           font-size: 30px;\r\n        font-weight: bold;\r\n    }\r\n    \r\n    \r\n</style>"],"sourceRoot":"webpack://"}]);
	
	// exports


/***/ },
/* 84 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	// <template>
	
	//   <div class="datepicker">
	//       <section class="datepicker-header">
	//         <div>年</div>
	//         <div>月</div>
	//         <div>日</div>
	//       </section>
	//       <section class="datepicker-body">
	//           <div class="column datepicker-year">
	//               <span class="datepicker-icon" @click="add('Y')"><i class="icon-plus"></i></span>
	//               <span class="datepicker-value">{{curYear}}</span>
	//               <span class="datepicker-icon" @click="minus('Y')"><i class="icon-minus"></i></span>
	//           </div>
	//           <div class="column datepicker-month">
	//               <span  class="datepicker-icon" @click="add('M')"><i class="icon-plus"></i></span>
	//               <span class="datepicker-value">{{curMonth<10?("0"+curMonth):curMonth}}</span>
	//               <span  class="datepicker-icon" @click="minus('M')"><i class="icon-minus"></i></span>
	//           </div>
	//           <div class="column datepicker-day">
	//               <span  class="datepicker-icon" @click="add('D')"><i class="icon-plus"></i></span>
	//               <span class="datepicker-value">{{curDay<10?("0"+curDay):curDay}}</span>
	//               <span  class="datepicker-icon" @click="minus('D')"><i class="icon-minus"></i></span>
	//           </div>
	//       </section>
	//   </div>
	
	//     <!--   <ul class="datepicker-hour">
	//           <li v-for="item in hourRange">{{item}}</li>
	//       </ul>
	//       <ul class="datepicker-min">
	//           <li v-for="item in minRange">{{item}}</li>
	//       </ul>
	//       <ul class="datepicker-sec">
	//           <li v-for="item in secRange">{{item}}</li>
	//       </ul> -->
	
	// </template>
	
	// <script lang="babel">
	exports.default = {
	  created: function created() {
	    //初始化数据
	    var date = '';
	    if (this.curdate.length > 0) {
	      date = new Date(this.curdate);
	    } else {
	      date = new Date();
	    }
	    this.curYear = date.getFullYear();
	    this.curMonth = date.getMonth() + 1;
	    this.curDay = date.getDate();
	    //初始化年份
	    this.yearRange = this.getYearRange(this.curYear);
	    //初始化天数
	    this.dayRange = this.getDayRange(this.curYear, this.curMonth);
	
	    this.yHeight = 40 * this.yearRange.length;
	    this.mHeight = 40 * this.monthRange.length;
	    this.dHeight = 40 * this.dayRange.length;
	
	    //初始化显示的数据
	    this.showDays = this.getShowRange(this.curDay, 'D');
	    this.showYears = this.getShowRange(this.curYear, 'Y');
	    this.showMonths = this.getShowRange(this.curMonth, 'M');
	    console.log(this.showYears);
	    console.log(this.showMonths);
	    console.log(this.showDays);
	  },
	
	  props: {
	    curdate: {
	      type: String,
	      default: ''
	    }
	  },
	  data: function data() {
	    return {
	      yearRange: [],
	      monthRange: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
	      dayRange: [],
	      hourRange: [],
	      minRange: [],
	      secRange: [],
	      curYear: 0,
	      curMonth: 0,
	      curDay: 0,
	      curHour: 0,
	      curMin: 0,
	      curSec: 0
	    };
	  },
	
	  methods: {
	    add: function add(flag) {
	      //通过年月来获取月份的天数
	      switch (flag) {
	        case "Y":
	          this.curYear = this.curYear + 1;
	          break;
	        case "M":
	          //1:判断月份所在的index
	          var index = this.curMonth == 12 ? 0 : this.curMonth;
	          this.curMonth = this.monthRange[index];
	          this.dayRange = this.getDayRange(this.curYear, this.curMonth);
	          break;
	        case "D":
	          var length = this.dayRange.length;
	          var dayIndex = this.curDay == length ? 0 : this.curDay;
	          this.curDay = this.dayRange[dayIndex];
	          break;
	      }
	    },
	    minus: function minus(flag) {
	      switch (flag) {
	        case "Y":
	          this.curYear = this.curYear - 1;
	          break;
	        case "M":
	          var index = this.curMonth == 1 ? 11 : this.curMonth - 2;
	          this.curMonth = this.monthRange[index];
	          this.dayRange = this.getDayRange(this.curYear, this.curMonth);
	          break;
	        case "D":
	          var length = this.dayRange.length;
	          var dayIndex = this.curDay == 1 ? length - 1 : this.curDay - 2;
	          this.curDay = this.dayRange[dayIndex];
	          break;
	      }
	    },
	
	    dayNumOfMonth: function dayNumOfMonth(year, month) {
	      var d = new Date(year, month, 0);
	      return d.getDate();
	    },
	    //通过年份来获取年份的区间
	    getYearRange: function getYearRange(year) {
	      var tempYR = [];
	      for (var i = year - 10; i <= year + 5; i++) {
	        tempYR.push(i);
	      }
	      return tempYR;
	    },
	    getDayRange: function getDayRange(year, month) {
	      var tempDR = [];
	      var length = this.dayNumOfMonth(year, month);
	      for (var i = 1; i <= length; i++) {
	        tempDR.push(i);
	      };
	      return tempDR;
	    },
	    //获取显示的数据
	    getShowRange: function getShowRange(val, flag) {
	      var tempSR = [];
	      var start = 1,
	          end = 0;
	      start = val - 2;
	      end = val + 2;
	      for (var i = start; i <= end; i++) {
	        switch (flag) {
	          case "Y":
	            if (this.yearRange.indexOf(i) >= 0) {
	              tempSR.push(i);
	            }
	            break;
	          case "M":
	            if (this.monthRange.indexOf(i) >= 0) {
	              tempSR.push(i);
	            }
	            break;
	
	          case "D":
	            if (this.dayRange.indexOf(i) >= 0) {
	              tempSR.push(i);
	            }
	            break;
	        }
	      };
	      return tempSR;
	    }
	  }
	};
	// </script>

	// <style type="text/css" scoped>

	//         .datepicker{
	//             display: flex;
	//             flex-flow:column nowrap;
	//         }

	//       .datepicker-header{
	//           background-color: whitesmoke;
	//           display: -webkit-flex;
	//           display: -ms-flexbox;
	//           display: flex;
	//           -webkit-flex-flow:row nowrap;
	//               -ms-flex-flow:row nowrap;
	//                   flex-flow:row nowrap;
	//           justify-content: space-around;
	//           height: 30px;
	//           width: 300px;
	//           font-size: 20px;
	//           padding: 5px 20px 0px 20px;
	//           align-items:center;
	//           border-radius: 5px;
	//           font-weight: bold;
	//       }

	//       .datepicker-body{
	//           background-color: whitesmoke;
	//           display: -webkit-flex;
	//           display: -ms-flexbox;
	//           display: flex;
	//           -webkit-flex-flow:row nowrap;
	//               -ms-flex-flow:row nowrap;
	//                   flex-flow:row nowrap;
	//           justify-content: space-around;
	//           height: 200px;
	//           width: 300px;
	//           font-size: 20px;
	//           padding: 5px 20px;
	//           overflow: hidden;
	//           align-items:center;
	//           border-radius: 5px;
	//       }

	//       .datepicker-body>.column{
	//           display: -webkit-flex;
	//           display: -ms-flexbox;
	//           display: flex;
	//           -webkit-flex-flow:column nowrap;
	//           -ms-flex-flow:column nowrap;
	//                   flex-flow:column nowrap;
	//           -webkit-justify-content:center;
	//           -ms-flex-pack:center;
	//                   justify-content:center;
	//           -webkit-align-items:space-around;
	//           -ms-flex-align:space-around;
	//                   align-items:space-around;
	//                   padding: 5px;

	//       }

	//       .column>span{
	//         padding: 10px;
	//         width: 60px;
	//         text-align: center;
	//         vertical-align: middle;
	//         background-color: white;   
	//       }

	//       .column>span:active{
	//              background-color: darkorange;
	//       }

	//       .column>span:nth-child(1){
	//          border-radius: 5px 5px 0px 0px;
	//          box-shadow: 0px 0px 3px gray;
	//       }

	//       .column>span:nth-child(3){
	//          border-radius: 0px 0px 5px 5px;
	//          box-shadow: 0px 0px 3px gray;
	//       }

	//      .datepicker-icon{
	//           border: 2px solid gray;
	//           height: 30px;
	//           line-height: 30px;
	//           font-size: 24px;
	//      }

	//     .datepicker-value{
	//         height: 50px;
	//         border-left: 2px solid gray;
	//         border-right: 2px solid gray;
	//         line-height: 50px;
	//            font-size: 30px;
	//         font-weight: bold;
	//     }

	// </style>

/***/ },
/* 85 */
/***/ function(module, exports) {

	module.exports = "\n\n<div class=\"datepicker\" _v-e36f8ff0=\"\">\n    <section class=\"datepicker-header\" _v-e36f8ff0=\"\">\n      <div _v-e36f8ff0=\"\">年</div>\n      <div _v-e36f8ff0=\"\">月</div>\n      <div _v-e36f8ff0=\"\">日</div>\n    </section>\n    <section class=\"datepicker-body\" _v-e36f8ff0=\"\">\n        <div class=\"column datepicker-year\" _v-e36f8ff0=\"\">\n            <span class=\"datepicker-icon\" @click=\"add('Y')\" _v-e36f8ff0=\"\"><i class=\"icon-plus\" _v-e36f8ff0=\"\"></i></span>\n            <span class=\"datepicker-value\" _v-e36f8ff0=\"\">{{curYear}}</span>\n            <span class=\"datepicker-icon\" @click=\"minus('Y')\" _v-e36f8ff0=\"\"><i class=\"icon-minus\" _v-e36f8ff0=\"\"></i></span>\n        </div>\n        <div class=\"column datepicker-month\" _v-e36f8ff0=\"\">\n            <span class=\"datepicker-icon\" @click=\"add('M')\" _v-e36f8ff0=\"\"><i class=\"icon-plus\" _v-e36f8ff0=\"\"></i></span>\n            <span class=\"datepicker-value\" _v-e36f8ff0=\"\">{{curMonth&lt;10?(\"0\"+curMonth):curMonth}}</span>\n            <span class=\"datepicker-icon\" @click=\"minus('M')\" _v-e36f8ff0=\"\"><i class=\"icon-minus\" _v-e36f8ff0=\"\"></i></span>\n        </div>\n        <div class=\"column datepicker-day\" _v-e36f8ff0=\"\">\n            <span class=\"datepicker-icon\" @click=\"add('D')\" _v-e36f8ff0=\"\"><i class=\"icon-plus\" _v-e36f8ff0=\"\"></i></span>\n            <span class=\"datepicker-value\" _v-e36f8ff0=\"\">{{curDay&lt;10?(\"0\"+curDay):curDay}}</span>\n            <span class=\"datepicker-icon\" @click=\"minus('D')\" _v-e36f8ff0=\"\"><i class=\"icon-minus\" _v-e36f8ff0=\"\"></i></span>\n        </div>\n    </section> \n</div>\n  \n\n  <!--   <ul class=\"datepicker-hour\">\n        <li v-for=\"item in hourRange\">{{item}}</li>\n    </ul>\n    <ul class=\"datepicker-min\">\n        <li v-for=\"item in minRange\">{{item}}</li>\n    </ul>\n    <ul class=\"datepicker-sec\">\n        <li v-for=\"item in secRange\">{{item}}</li>\n    </ul> -->\n  \n";

/***/ },
/* 86 */
/***/ function(module, exports) {

	module.exports = "\n<toolbar text=\"个人主页\" _v-61f407d1=\"\">\n\t<span class=\"icon-chevron-left\" slot=\"leftBtn\" @click=\"back\" _v-61f407d1=\"\">返回</span>\n\t<span class=\"icon-refresh\" slot=\"rightBtn\" @click=\"loadUserInfo\" _v-61f407d1=\"\"></span>\n</toolbar>\n<section _v-61f407d1=\"\">\n\t<input type=\"button\" @click=\"showDialog\" value=\"显示dialog\" _v-61f407d1=\"\">\n\t<datepicker _v-61f407d1=\"\"></datepicker>\n</section>\n\n<loading :loading=\"isload\" _v-61f407d1=\"\"></loading>\n<dialog :show.sync=\"isShowDialog\" :title=\"dialogTitle\" :is-alert=\"isAlert\" v-on:child-confirm=\"confirm\" _v-61f407d1=\"\">\n\t<div slot=\"dialog-bd\" _v-61f407d1=\"\">我的世界你不懂</div>\n</dialog>\n";

/***/ },
/* 87 */
/***/ function(module, exports) {

	var __vue_script__, __vue_template__
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) { (typeof module.exports === "function" ? module.exports.options : module.exports).template = __vue_template__ }


/***/ },
/* 88 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__vue_script__ = __webpack_require__(89)
	__vue_template__ = __webpack_require__(90)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) { (typeof module.exports === "function" ? module.exports.options : module.exports).template = __vue_template__ }
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), true)
	  if (!hotAPI.compatible) return
	  var id = "E:\\workspace\\mobile-dev\\src\\views\\Login.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 89 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	// <template>
	
	// 	<div class="container">
	// 		<div >
	// 			<input type="text" name="">
	// 		</div>
	// 	</div>
	// </template>
	
	// <script>
	exports.default = {
		data: function data() {
			return {
				gongHao: '',
				pwd: ''
			};
		},
	
		methods: {
			login: function login() {
				//向服务器发起请登录请求
	
			}
		}
	};
	// </script>
	/* generated by vue-loader */

/***/ },
/* 90 */
/***/ function(module, exports) {

	module.exports = "\n\n<div class=\"container\">\n\t<div >\n\t\t<input type=\"text\" name=\"\">\n\t</div>\n</div>\n";

/***/ },
/* 91 */
/***/ function(module, exports) {

	var __vue_script__, __vue_template__
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) { (typeof module.exports === "function" ? module.exports.options : module.exports).template = __vue_template__ }


/***/ },
/* 92 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;;(function () {
		'use strict';
	
		/**
		 * @preserve FastClick: polyfill to remove click delays on browsers with touch UIs.
		 *
		 * @codingstandard ftlabs-jsv2
		 * @copyright The Financial Times Limited [All Rights Reserved]
		 * @license MIT License (see LICENSE.txt)
		 */
	
		/*jslint browser:true, node:true*/
		/*global define, Event, Node*/
	
	
		/**
		 * Instantiate fast-clicking listeners on the specified layer.
		 *
		 * @constructor
		 * @param {Element} layer The layer to listen on
		 * @param {Object} [options={}] The options to override the defaults
		 */
		function FastClick(layer, options) {
			var oldOnClick;
	
			options = options || {};
	
			/**
			 * Whether a click is currently being tracked.
			 *
			 * @type boolean
			 */
			this.trackingClick = false;
	
	
			/**
			 * Timestamp for when click tracking started.
			 *
			 * @type number
			 */
			this.trackingClickStart = 0;
	
	
			/**
			 * The element being tracked for a click.
			 *
			 * @type EventTarget
			 */
			this.targetElement = null;
	
	
			/**
			 * X-coordinate of touch start event.
			 *
			 * @type number
			 */
			this.touchStartX = 0;
	
	
			/**
			 * Y-coordinate of touch start event.
			 *
			 * @type number
			 */
			this.touchStartY = 0;
	
	
			/**
			 * ID of the last touch, retrieved from Touch.identifier.
			 *
			 * @type number
			 */
			this.lastTouchIdentifier = 0;
	
	
			/**
			 * Touchmove boundary, beyond which a click will be cancelled.
			 *
			 * @type number
			 */
			this.touchBoundary = options.touchBoundary || 10;
	
	
			/**
			 * The FastClick layer.
			 *
			 * @type Element
			 */
			this.layer = layer;
	
			/**
			 * The minimum time between tap(touchstart and touchend) events
			 *
			 * @type number
			 */
			this.tapDelay = options.tapDelay || 200;
	
			/**
			 * The maximum time for a tap
			 *
			 * @type number
			 */
			this.tapTimeout = options.tapTimeout || 700;
	
			if (FastClick.notNeeded(layer)) {
				return;
			}
	
			// Some old versions of Android don't have Function.prototype.bind
			function bind(method, context) {
				return function() { return method.apply(context, arguments); };
			}
	
	
			var methods = ['onMouse', 'onClick', 'onTouchStart', 'onTouchMove', 'onTouchEnd', 'onTouchCancel'];
			var context = this;
			for (var i = 0, l = methods.length; i < l; i++) {
				context[methods[i]] = bind(context[methods[i]], context);
			}
	
			// Set up event handlers as required
			if (deviceIsAndroid) {
				layer.addEventListener('mouseover', this.onMouse, true);
				layer.addEventListener('mousedown', this.onMouse, true);
				layer.addEventListener('mouseup', this.onMouse, true);
			}
	
			layer.addEventListener('click', this.onClick, true);
			layer.addEventListener('touchstart', this.onTouchStart, false);
			layer.addEventListener('touchmove', this.onTouchMove, false);
			layer.addEventListener('touchend', this.onTouchEnd, false);
			layer.addEventListener('touchcancel', this.onTouchCancel, false);
	
			// Hack is required for browsers that don't support Event#stopImmediatePropagation (e.g. Android 2)
			// which is how FastClick normally stops click events bubbling to callbacks registered on the FastClick
			// layer when they are cancelled.
			if (!Event.prototype.stopImmediatePropagation) {
				layer.removeEventListener = function(type, callback, capture) {
					var rmv = Node.prototype.removeEventListener;
					if (type === 'click') {
						rmv.call(layer, type, callback.hijacked || callback, capture);
					} else {
						rmv.call(layer, type, callback, capture);
					}
				};
	
				layer.addEventListener = function(type, callback, capture) {
					var adv = Node.prototype.addEventListener;
					if (type === 'click') {
						adv.call(layer, type, callback.hijacked || (callback.hijacked = function(event) {
							if (!event.propagationStopped) {
								callback(event);
							}
						}), capture);
					} else {
						adv.call(layer, type, callback, capture);
					}
				};
			}
	
			// If a handler is already declared in the element's onclick attribute, it will be fired before
			// FastClick's onClick handler. Fix this by pulling out the user-defined handler function and
			// adding it as listener.
			if (typeof layer.onclick === 'function') {
	
				// Android browser on at least 3.2 requires a new reference to the function in layer.onclick
				// - the old one won't work if passed to addEventListener directly.
				oldOnClick = layer.onclick;
				layer.addEventListener('click', function(event) {
					oldOnClick(event);
				}, false);
				layer.onclick = null;
			}
		}
	
		/**
		* Windows Phone 8.1 fakes user agent string to look like Android and iPhone.
		*
		* @type boolean
		*/
		var deviceIsWindowsPhone = navigator.userAgent.indexOf("Windows Phone") >= 0;
	
		/**
		 * Android requires exceptions.
		 *
		 * @type boolean
		 */
		var deviceIsAndroid = navigator.userAgent.indexOf('Android') > 0 && !deviceIsWindowsPhone;
	
	
		/**
		 * iOS requires exceptions.
		 *
		 * @type boolean
		 */
		var deviceIsIOS = /iP(ad|hone|od)/.test(navigator.userAgent) && !deviceIsWindowsPhone;
	
	
		/**
		 * iOS 4 requires an exception for select elements.
		 *
		 * @type boolean
		 */
		var deviceIsIOS4 = deviceIsIOS && (/OS 4_\d(_\d)?/).test(navigator.userAgent);
	
	
		/**
		 * iOS 6.0-7.* requires the target element to be manually derived
		 *
		 * @type boolean
		 */
		var deviceIsIOSWithBadTarget = deviceIsIOS && (/OS [6-7]_\d/).test(navigator.userAgent);
	
		/**
		 * BlackBerry requires exceptions.
		 *
		 * @type boolean
		 */
		var deviceIsBlackBerry10 = navigator.userAgent.indexOf('BB10') > 0;
	
		/**
		 * Determine whether a given element requires a native click.
		 *
		 * @param {EventTarget|Element} target Target DOM element
		 * @returns {boolean} Returns true if the element needs a native click
		 */
		FastClick.prototype.needsClick = function(target) {
			switch (target.nodeName.toLowerCase()) {
	
			// Don't send a synthetic click to disabled inputs (issue #62)
			case 'button':
			case 'select':
			case 'textarea':
				if (target.disabled) {
					return true;
				}
	
				break;
			case 'input':
	
				// File inputs need real clicks on iOS 6 due to a browser bug (issue #68)
				if ((deviceIsIOS && target.type === 'file') || target.disabled) {
					return true;
				}
	
				break;
			case 'label':
			case 'iframe': // iOS8 homescreen apps can prevent events bubbling into frames
			case 'video':
				return true;
			}
	
			return (/\bneedsclick\b/).test(target.className);
		};
	
	
		/**
		 * Determine whether a given element requires a call to focus to simulate click into element.
		 *
		 * @param {EventTarget|Element} target Target DOM element
		 * @returns {boolean} Returns true if the element requires a call to focus to simulate native click.
		 */
		FastClick.prototype.needsFocus = function(target) {
			switch (target.nodeName.toLowerCase()) {
			case 'textarea':
				return true;
			case 'select':
				return !deviceIsAndroid;
			case 'input':
				switch (target.type) {
				case 'button':
				case 'checkbox':
				case 'file':
				case 'image':
				case 'radio':
				case 'submit':
					return false;
				}
	
				// No point in attempting to focus disabled inputs
				return !target.disabled && !target.readOnly;
			default:
				return (/\bneedsfocus\b/).test(target.className);
			}
		};
	
	
		/**
		 * Send a click event to the specified element.
		 *
		 * @param {EventTarget|Element} targetElement
		 * @param {Event} event
		 */
		FastClick.prototype.sendClick = function(targetElement, event) {
			var clickEvent, touch;
	
			// On some Android devices activeElement needs to be blurred otherwise the synthetic click will have no effect (#24)
			if (document.activeElement && document.activeElement !== targetElement) {
				document.activeElement.blur();
			}
	
			touch = event.changedTouches[0];
	
			// Synthesise a click event, with an extra attribute so it can be tracked
			clickEvent = document.createEvent('MouseEvents');
			clickEvent.initMouseEvent(this.determineEventType(targetElement), true, true, window, 1, touch.screenX, touch.screenY, touch.clientX, touch.clientY, false, false, false, false, 0, null);
			clickEvent.forwardedTouchEvent = true;
			targetElement.dispatchEvent(clickEvent);
		};
	
		FastClick.prototype.determineEventType = function(targetElement) {
	
			//Issue #159: Android Chrome Select Box does not open with a synthetic click event
			if (deviceIsAndroid && targetElement.tagName.toLowerCase() === 'select') {
				return 'mousedown';
			}
	
			return 'click';
		};
	
	
		/**
		 * @param {EventTarget|Element} targetElement
		 */
		FastClick.prototype.focus = function(targetElement) {
			var length;
	
			// Issue #160: on iOS 7, some input elements (e.g. date datetime month) throw a vague TypeError on setSelectionRange. These elements don't have an integer value for the selectionStart and selectionEnd properties, but unfortunately that can't be used for detection because accessing the properties also throws a TypeError. Just check the type instead. Filed as Apple bug #15122724.
			if (deviceIsIOS && targetElement.setSelectionRange && targetElement.type.indexOf('date') !== 0 && targetElement.type !== 'time' && targetElement.type !== 'month') {
				length = targetElement.value.length;
				targetElement.setSelectionRange(length, length);
			} else {
				targetElement.focus();
			}
		};
	
	
		/**
		 * Check whether the given target element is a child of a scrollable layer and if so, set a flag on it.
		 *
		 * @param {EventTarget|Element} targetElement
		 */
		FastClick.prototype.updateScrollParent = function(targetElement) {
			var scrollParent, parentElement;
	
			scrollParent = targetElement.fastClickScrollParent;
	
			// Attempt to discover whether the target element is contained within a scrollable layer. Re-check if the
			// target element was moved to another parent.
			if (!scrollParent || !scrollParent.contains(targetElement)) {
				parentElement = targetElement;
				do {
					if (parentElement.scrollHeight > parentElement.offsetHeight) {
						scrollParent = parentElement;
						targetElement.fastClickScrollParent = parentElement;
						break;
					}
	
					parentElement = parentElement.parentElement;
				} while (parentElement);
			}
	
			// Always update the scroll top tracker if possible.
			if (scrollParent) {
				scrollParent.fastClickLastScrollTop = scrollParent.scrollTop;
			}
		};
	
	
		/**
		 * @param {EventTarget} targetElement
		 * @returns {Element|EventTarget}
		 */
		FastClick.prototype.getTargetElementFromEventTarget = function(eventTarget) {
	
			// On some older browsers (notably Safari on iOS 4.1 - see issue #56) the event target may be a text node.
			if (eventTarget.nodeType === Node.TEXT_NODE) {
				return eventTarget.parentNode;
			}
	
			return eventTarget;
		};
	
	
		/**
		 * On touch start, record the position and scroll offset.
		 *
		 * @param {Event} event
		 * @returns {boolean}
		 */
		FastClick.prototype.onTouchStart = function(event) {
			var targetElement, touch, selection;
	
			// Ignore multiple touches, otherwise pinch-to-zoom is prevented if both fingers are on the FastClick element (issue #111).
			if (event.targetTouches.length > 1) {
				return true;
			}
	
			targetElement = this.getTargetElementFromEventTarget(event.target);
			touch = event.targetTouches[0];
	
			if (deviceIsIOS) {
	
				// Only trusted events will deselect text on iOS (issue #49)
				selection = window.getSelection();
				if (selection.rangeCount && !selection.isCollapsed) {
					return true;
				}
	
				if (!deviceIsIOS4) {
	
					// Weird things happen on iOS when an alert or confirm dialog is opened from a click event callback (issue #23):
					// when the user next taps anywhere else on the page, new touchstart and touchend events are dispatched
					// with the same identifier as the touch event that previously triggered the click that triggered the alert.
					// Sadly, there is an issue on iOS 4 that causes some normal touch events to have the same identifier as an
					// immediately preceeding touch event (issue #52), so this fix is unavailable on that platform.
					// Issue 120: touch.identifier is 0 when Chrome dev tools 'Emulate touch events' is set with an iOS device UA string,
					// which causes all touch events to be ignored. As this block only applies to iOS, and iOS identifiers are always long,
					// random integers, it's safe to to continue if the identifier is 0 here.
					if (touch.identifier && touch.identifier === this.lastTouchIdentifier) {
						event.preventDefault();
						return false;
					}
	
					this.lastTouchIdentifier = touch.identifier;
	
					// If the target element is a child of a scrollable layer (using -webkit-overflow-scrolling: touch) and:
					// 1) the user does a fling scroll on the scrollable layer
					// 2) the user stops the fling scroll with another tap
					// then the event.target of the last 'touchend' event will be the element that was under the user's finger
					// when the fling scroll was started, causing FastClick to send a click event to that layer - unless a check
					// is made to ensure that a parent layer was not scrolled before sending a synthetic click (issue #42).
					this.updateScrollParent(targetElement);
				}
			}
	
			this.trackingClick = true;
			this.trackingClickStart = event.timeStamp;
			this.targetElement = targetElement;
	
			this.touchStartX = touch.pageX;
			this.touchStartY = touch.pageY;
	
			// Prevent phantom clicks on fast double-tap (issue #36)
			if ((event.timeStamp - this.lastClickTime) < this.tapDelay) {
				event.preventDefault();
			}
	
			return true;
		};
	
	
		/**
		 * Based on a touchmove event object, check whether the touch has moved past a boundary since it started.
		 *
		 * @param {Event} event
		 * @returns {boolean}
		 */
		FastClick.prototype.touchHasMoved = function(event) {
			var touch = event.changedTouches[0], boundary = this.touchBoundary;
	
			if (Math.abs(touch.pageX - this.touchStartX) > boundary || Math.abs(touch.pageY - this.touchStartY) > boundary) {
				return true;
			}
	
			return false;
		};
	
	
		/**
		 * Update the last position.
		 *
		 * @param {Event} event
		 * @returns {boolean}
		 */
		FastClick.prototype.onTouchMove = function(event) {
			if (!this.trackingClick) {
				return true;
			}
	
			// If the touch has moved, cancel the click tracking
			if (this.targetElement !== this.getTargetElementFromEventTarget(event.target) || this.touchHasMoved(event)) {
				this.trackingClick = false;
				this.targetElement = null;
			}
	
			return true;
		};
	
	
		/**
		 * Attempt to find the labelled control for the given label element.
		 *
		 * @param {EventTarget|HTMLLabelElement} labelElement
		 * @returns {Element|null}
		 */
		FastClick.prototype.findControl = function(labelElement) {
	
			// Fast path for newer browsers supporting the HTML5 control attribute
			if (labelElement.control !== undefined) {
				return labelElement.control;
			}
	
			// All browsers under test that support touch events also support the HTML5 htmlFor attribute
			if (labelElement.htmlFor) {
				return document.getElementById(labelElement.htmlFor);
			}
	
			// If no for attribute exists, attempt to retrieve the first labellable descendant element
			// the list of which is defined here: http://www.w3.org/TR/html5/forms.html#category-label
			return labelElement.querySelector('button, input:not([type=hidden]), keygen, meter, output, progress, select, textarea');
		};
	
	
		/**
		 * On touch end, determine whether to send a click event at once.
		 *
		 * @param {Event} event
		 * @returns {boolean}
		 */
		FastClick.prototype.onTouchEnd = function(event) {
			var forElement, trackingClickStart, targetTagName, scrollParent, touch, targetElement = this.targetElement;
	
			if (!this.trackingClick) {
				return true;
			}
	
			// Prevent phantom clicks on fast double-tap (issue #36)
			if ((event.timeStamp - this.lastClickTime) < this.tapDelay) {
				this.cancelNextClick = true;
				return true;
			}
	
			if ((event.timeStamp - this.trackingClickStart) > this.tapTimeout) {
				return true;
			}
	
			// Reset to prevent wrong click cancel on input (issue #156).
			this.cancelNextClick = false;
	
			this.lastClickTime = event.timeStamp;
	
			trackingClickStart = this.trackingClickStart;
			this.trackingClick = false;
			this.trackingClickStart = 0;
	
			// On some iOS devices, the targetElement supplied with the event is invalid if the layer
			// is performing a transition or scroll, and has to be re-detected manually. Note that
			// for this to function correctly, it must be called *after* the event target is checked!
			// See issue #57; also filed as rdar://13048589 .
			if (deviceIsIOSWithBadTarget) {
				touch = event.changedTouches[0];
	
				// In certain cases arguments of elementFromPoint can be negative, so prevent setting targetElement to null
				targetElement = document.elementFromPoint(touch.pageX - window.pageXOffset, touch.pageY - window.pageYOffset) || targetElement;
				targetElement.fastClickScrollParent = this.targetElement.fastClickScrollParent;
			}
	
			targetTagName = targetElement.tagName.toLowerCase();
			if (targetTagName === 'label') {
				forElement = this.findControl(targetElement);
				if (forElement) {
					this.focus(targetElement);
					if (deviceIsAndroid) {
						return false;
					}
	
					targetElement = forElement;
				}
			} else if (this.needsFocus(targetElement)) {
	
				// Case 1: If the touch started a while ago (best guess is 100ms based on tests for issue #36) then focus will be triggered anyway. Return early and unset the target element reference so that the subsequent click will be allowed through.
				// Case 2: Without this exception for input elements tapped when the document is contained in an iframe, then any inputted text won't be visible even though the value attribute is updated as the user types (issue #37).
				if ((event.timeStamp - trackingClickStart) > 100 || (deviceIsIOS && window.top !== window && targetTagName === 'input')) {
					this.targetElement = null;
					return false;
				}
	
				this.focus(targetElement);
				this.sendClick(targetElement, event);
	
				// Select elements need the event to go through on iOS 4, otherwise the selector menu won't open.
				// Also this breaks opening selects when VoiceOver is active on iOS6, iOS7 (and possibly others)
				if (!deviceIsIOS || targetTagName !== 'select') {
					this.targetElement = null;
					event.preventDefault();
				}
	
				return false;
			}
	
			if (deviceIsIOS && !deviceIsIOS4) {
	
				// Don't send a synthetic click event if the target element is contained within a parent layer that was scrolled
				// and this tap is being used to stop the scrolling (usually initiated by a fling - issue #42).
				scrollParent = targetElement.fastClickScrollParent;
				if (scrollParent && scrollParent.fastClickLastScrollTop !== scrollParent.scrollTop) {
					return true;
				}
			}
	
			// Prevent the actual click from going though - unless the target node is marked as requiring
			// real clicks or if it is in the whitelist in which case only non-programmatic clicks are permitted.
			if (!this.needsClick(targetElement)) {
				event.preventDefault();
				this.sendClick(targetElement, event);
			}
	
			return false;
		};
	
	
		/**
		 * On touch cancel, stop tracking the click.
		 *
		 * @returns {void}
		 */
		FastClick.prototype.onTouchCancel = function() {
			this.trackingClick = false;
			this.targetElement = null;
		};
	
	
		/**
		 * Determine mouse events which should be permitted.
		 *
		 * @param {Event} event
		 * @returns {boolean}
		 */
		FastClick.prototype.onMouse = function(event) {
	
			// If a target element was never set (because a touch event was never fired) allow the event
			if (!this.targetElement) {
				return true;
			}
	
			if (event.forwardedTouchEvent) {
				return true;
			}
	
			// Programmatically generated events targeting a specific element should be permitted
			if (!event.cancelable) {
				return true;
			}
	
			// Derive and check the target element to see whether the mouse event needs to be permitted;
			// unless explicitly enabled, prevent non-touch click events from triggering actions,
			// to prevent ghost/doubleclicks.
			if (!this.needsClick(this.targetElement) || this.cancelNextClick) {
	
				// Prevent any user-added listeners declared on FastClick element from being fired.
				if (event.stopImmediatePropagation) {
					event.stopImmediatePropagation();
				} else {
	
					// Part of the hack for browsers that don't support Event#stopImmediatePropagation (e.g. Android 2)
					event.propagationStopped = true;
				}
	
				// Cancel the event
				event.stopPropagation();
				event.preventDefault();
	
				return false;
			}
	
			// If the mouse event is permitted, return true for the action to go through.
			return true;
		};
	
	
		/**
		 * On actual clicks, determine whether this is a touch-generated click, a click action occurring
		 * naturally after a delay after a touch (which needs to be cancelled to avoid duplication), or
		 * an actual click which should be permitted.
		 *
		 * @param {Event} event
		 * @returns {boolean}
		 */
		FastClick.prototype.onClick = function(event) {
			var permitted;
	
			// It's possible for another FastClick-like library delivered with third-party code to fire a click event before FastClick does (issue #44). In that case, set the click-tracking flag back to false and return early. This will cause onTouchEnd to return early.
			if (this.trackingClick) {
				this.targetElement = null;
				this.trackingClick = false;
				return true;
			}
	
			// Very odd behaviour on iOS (issue #18): if a submit element is present inside a form and the user hits enter in the iOS simulator or clicks the Go button on the pop-up OS keyboard the a kind of 'fake' click event will be triggered with the submit-type input element as the target.
			if (event.target.type === 'submit' && event.detail === 0) {
				return true;
			}
	
			permitted = this.onMouse(event);
	
			// Only unset targetElement if the click is not permitted. This will ensure that the check for !targetElement in onMouse fails and the browser's click doesn't go through.
			if (!permitted) {
				this.targetElement = null;
			}
	
			// If clicks are permitted, return true for the action to go through.
			return permitted;
		};
	
	
		/**
		 * Remove all FastClick's event listeners.
		 *
		 * @returns {void}
		 */
		FastClick.prototype.destroy = function() {
			var layer = this.layer;
	
			if (deviceIsAndroid) {
				layer.removeEventListener('mouseover', this.onMouse, true);
				layer.removeEventListener('mousedown', this.onMouse, true);
				layer.removeEventListener('mouseup', this.onMouse, true);
			}
	
			layer.removeEventListener('click', this.onClick, true);
			layer.removeEventListener('touchstart', this.onTouchStart, false);
			layer.removeEventListener('touchmove', this.onTouchMove, false);
			layer.removeEventListener('touchend', this.onTouchEnd, false);
			layer.removeEventListener('touchcancel', this.onTouchCancel, false);
		};
	
	
		/**
		 * Check whether FastClick is needed.
		 *
		 * @param {Element} layer The layer to listen on
		 */
		FastClick.notNeeded = function(layer) {
			var metaViewport;
			var chromeVersion;
			var blackberryVersion;
			var firefoxVersion;
	
			// Devices that don't support touch don't need FastClick
			if (typeof window.ontouchstart === 'undefined') {
				return true;
			}
	
			// Chrome version - zero for other browsers
			chromeVersion = +(/Chrome\/([0-9]+)/.exec(navigator.userAgent) || [,0])[1];
	
			if (chromeVersion) {
	
				if (deviceIsAndroid) {
					metaViewport = document.querySelector('meta[name=viewport]');
	
					if (metaViewport) {
						// Chrome on Android with user-scalable="no" doesn't need FastClick (issue #89)
						if (metaViewport.content.indexOf('user-scalable=no') !== -1) {
							return true;
						}
						// Chrome 32 and above with width=device-width or less don't need FastClick
						if (chromeVersion > 31 && document.documentElement.scrollWidth <= window.outerWidth) {
							return true;
						}
					}
	
				// Chrome desktop doesn't need FastClick (issue #15)
				} else {
					return true;
				}
			}
	
			if (deviceIsBlackBerry10) {
				blackberryVersion = navigator.userAgent.match(/Version\/([0-9]*)\.([0-9]*)/);
	
				// BlackBerry 10.3+ does not require Fastclick library.
				// https://github.com/ftlabs/fastclick/issues/251
				if (blackberryVersion[1] >= 10 && blackberryVersion[2] >= 3) {
					metaViewport = document.querySelector('meta[name=viewport]');
	
					if (metaViewport) {
						// user-scalable=no eliminates click delay.
						if (metaViewport.content.indexOf('user-scalable=no') !== -1) {
							return true;
						}
						// width=device-width (or less than device-width) eliminates click delay.
						if (document.documentElement.scrollWidth <= window.outerWidth) {
							return true;
						}
					}
				}
			}
	
			// IE10 with -ms-touch-action: none or manipulation, which disables double-tap-to-zoom (issue #97)
			if (layer.style.msTouchAction === 'none' || layer.style.touchAction === 'manipulation') {
				return true;
			}
	
			// Firefox version - zero for other browsers
			firefoxVersion = +(/Firefox\/([0-9]+)/.exec(navigator.userAgent) || [,0])[1];
	
			if (firefoxVersion >= 27) {
				// Firefox 27+ does not have tap delay if the content is not zoomable - https://bugzilla.mozilla.org/show_bug.cgi?id=922896
	
				metaViewport = document.querySelector('meta[name=viewport]');
				if (metaViewport && (metaViewport.content.indexOf('user-scalable=no') !== -1 || document.documentElement.scrollWidth <= window.outerWidth)) {
					return true;
				}
			}
	
			// IE11: prefixed -ms-touch-action is no longer supported and it's recomended to use non-prefixed version
			// http://msdn.microsoft.com/en-us/library/windows/apps/Hh767313.aspx
			if (layer.style.touchAction === 'none' || layer.style.touchAction === 'manipulation') {
				return true;
			}
	
			return false;
		};
	
	
		/**
		 * Factory method for creating a FastClick object
		 *
		 * @param {Element} layer The layer to listen on
		 * @param {Object} [options={}] The options to override the defaults
		 */
		FastClick.attach = function(layer, options) {
			return new FastClick(layer, options);
		};
	
	
		if (true) {
	
			// AMD. Register as an anonymous module.
			!(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
				return FastClick;
			}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		} else if (typeof module !== 'undefined' && module.exports) {
			module.exports = FastClick.attach;
			module.exports.FastClick = FastClick;
		} else {
			window.FastClick = FastClick;
		}
	}());


/***/ },
/* 93 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _keys = __webpack_require__(94);
	
	var _keys2 = _interopRequireDefault(_keys);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var vueTouch = {};
	var Hammer =  true ? __webpack_require__(106) : window.Hammer;
	var gestures = ['tap', 'pan', 'pandown', 'panend', 'pinch', 'press', 'pressup', 'rotate', 'swipe', 'swipeleft', 'swiperight', 'swipeup', 'swipedown'];
	var customeEvents = {};
	
	vueTouch.install = function (Vue) {
	
	  Vue.directive('touch', {
	
	    isFn: true,
	    acceptStatement: true,
	
	    bind: function bind() {
	      if (!this.el.hammer) {
	        this.el.hammer = new Hammer.Manager(this.el);
	      }
	      var mc = this.mc = this.el.hammer;
	      // determine event type
	      var event = this.arg;
	      var recognizerType, recognizer;
	
	      if (customeEvents[event]) {
	        // custom event
	        var custom = customeEvents[event];
	        recognizerType = custom.type;
	        recognizer = new Hammer[capitalize(recognizerType)](custom);
	        recognizer.recognizeWith(mc.recognizers);
	        mc.add(recognizer);
	      } else {
	        // built-in event
	
	        for (var i = 0; i < gestures.length; i++) {
	          if (event.indexOf(gestures[i]) === 0) {
	            recognizerType = gestures[i];
	            break;
	          }
	        }
	        if (!recognizerType) {
	          console.warn('Invalid v-touch event: ' + event);
	          return;
	        }
	        recognizer = mc.get(recognizerType);
	        if (!recognizer) {
	          // add recognizer
	          recognizer = new Hammer[capitalize(recognizerType)]();
	          // make sure multiple recognizers work together...
	          recognizer.recognizeWith(mc.recognizers);
	          mc.add(recognizer);
	        }
	      }
	    },
	
	    update: function update(fn) {
	      var mc = this.mc;
	      var vm = this.vm;
	      var event = this.arg;
	      // teardown old handler
	      if (this.handler) {
	        mc.off(event, this.handler);
	      }
	      // define new handler
	      this.handler = function (e) {
	        e.targetVM = vm;
	        fn.call(vm, e);
	      };
	      mc.on(event, this.handler);
	    },
	
	    unbind: function unbind() {
	      this.mc.off(this.arg, this.handler);
	      if (!(0, _keys2.default)(this.mc.handlers).length) {
	        this.mc.destroy();
	        this.el.hammer = null;
	      }
	    }
	
	  });
	};
	
	/**
	 * Register a custom event.
	 *
	 * @param {String} event
	 * @param {Object} options - a Hammer.js recognizer option object.
	 *                           required fields:
	 *                           - type: the base recognizer to use for this event
	 */
	
	vueTouch.registerCustomEvent = function (event, options) {
	  options.event = event;
	  customeEvents[event] = options;
	};
	
	function capitalize(str) {
	  return str.charAt(0).toUpperCase() + str.slice(1);
	}
	
	module.exports = vueTouch;

/***/ },
/* 94 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(95), __esModule: true };

/***/ },
/* 95 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(96);
	module.exports = __webpack_require__(102).Object.keys;

/***/ },
/* 96 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.14 Object.keys(O)
	var toObject = __webpack_require__(97);
	
	__webpack_require__(99)('keys', function($keys){
	  return function keys(it){
	    return $keys(toObject(it));
	  };
	});

/***/ },
/* 97 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.13 ToObject(argument)
	var defined = __webpack_require__(98);
	module.exports = function(it){
	  return Object(defined(it));
	};

/***/ },
/* 98 */
/***/ function(module, exports) {

	// 7.2.1 RequireObjectCoercible(argument)
	module.exports = function(it){
	  if(it == undefined)throw TypeError("Can't call method on  " + it);
	  return it;
	};

/***/ },
/* 99 */
/***/ function(module, exports, __webpack_require__) {

	// most Object methods by ES6 should accept primitives
	var $export = __webpack_require__(100)
	  , core    = __webpack_require__(102)
	  , fails   = __webpack_require__(105);
	module.exports = function(KEY, exec){
	  var fn  = (core.Object || {})[KEY] || Object[KEY]
	    , exp = {};
	  exp[KEY] = exec(fn);
	  $export($export.S + $export.F * fails(function(){ fn(1); }), 'Object', exp);
	};

/***/ },
/* 100 */
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(101)
	  , core      = __webpack_require__(102)
	  , ctx       = __webpack_require__(103)
	  , PROTOTYPE = 'prototype';
	
	var $export = function(type, name, source){
	  var IS_FORCED = type & $export.F
	    , IS_GLOBAL = type & $export.G
	    , IS_STATIC = type & $export.S
	    , IS_PROTO  = type & $export.P
	    , IS_BIND   = type & $export.B
	    , IS_WRAP   = type & $export.W
	    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
	    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE]
	    , key, own, out;
	  if(IS_GLOBAL)source = name;
	  for(key in source){
	    // contains in native
	    own = !IS_FORCED && target && key in target;
	    if(own && key in exports)continue;
	    // export native or passed
	    out = own ? target[key] : source[key];
	    // prevent global pollution for namespaces
	    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
	    // bind timers to global for call from export context
	    : IS_BIND && own ? ctx(out, global)
	    // wrap global constructors for prevent change them in library
	    : IS_WRAP && target[key] == out ? (function(C){
	      var F = function(param){
	        return this instanceof C ? new C(param) : C(param);
	      };
	      F[PROTOTYPE] = C[PROTOTYPE];
	      return F;
	    // make static versions for prototype methods
	    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
	    if(IS_PROTO)(exports[PROTOTYPE] || (exports[PROTOTYPE] = {}))[key] = out;
	  }
	};
	// type bitmap
	$export.F = 1;  // forced
	$export.G = 2;  // global
	$export.S = 4;  // static
	$export.P = 8;  // proto
	$export.B = 16; // bind
	$export.W = 32; // wrap
	module.exports = $export;

/***/ },
/* 101 */
/***/ function(module, exports) {

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
	if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ },
/* 102 */
/***/ function(module, exports) {

	var core = module.exports = {version: '1.2.6'};
	if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ },
/* 103 */
/***/ function(module, exports, __webpack_require__) {

	// optional / simple context binding
	var aFunction = __webpack_require__(104);
	module.exports = function(fn, that, length){
	  aFunction(fn);
	  if(that === undefined)return fn;
	  switch(length){
	    case 1: return function(a){
	      return fn.call(that, a);
	    };
	    case 2: return function(a, b){
	      return fn.call(that, a, b);
	    };
	    case 3: return function(a, b, c){
	      return fn.call(that, a, b, c);
	    };
	  }
	  return function(/* ...args */){
	    return fn.apply(that, arguments);
	  };
	};

/***/ },
/* 104 */
/***/ function(module, exports) {

	module.exports = function(it){
	  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
	  return it;
	};

/***/ },
/* 105 */
/***/ function(module, exports) {

	module.exports = function(exec){
	  try {
	    return !!exec();
	  } catch(e){
	    return true;
	  }
	};

/***/ },
/* 106 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/*! Hammer.JS - v2.0.6 - 2015-12-23
	 * http://hammerjs.github.io/
	 *
	 * Copyright (c) 2015 Jorik Tangelder;
	 * Licensed under the  license */
	(function(window, document, exportName, undefined) {
	  'use strict';
	
	var VENDOR_PREFIXES = ['', 'webkit', 'Moz', 'MS', 'ms', 'o'];
	var TEST_ELEMENT = document.createElement('div');
	
	var TYPE_FUNCTION = 'function';
	
	var round = Math.round;
	var abs = Math.abs;
	var now = Date.now;
	
	/**
	 * set a timeout with a given scope
	 * @param {Function} fn
	 * @param {Number} timeout
	 * @param {Object} context
	 * @returns {number}
	 */
	function setTimeoutContext(fn, timeout, context) {
	    return setTimeout(bindFn(fn, context), timeout);
	}
	
	/**
	 * if the argument is an array, we want to execute the fn on each entry
	 * if it aint an array we don't want to do a thing.
	 * this is used by all the methods that accept a single and array argument.
	 * @param {*|Array} arg
	 * @param {String} fn
	 * @param {Object} [context]
	 * @returns {Boolean}
	 */
	function invokeArrayArg(arg, fn, context) {
	    if (Array.isArray(arg)) {
	        each(arg, context[fn], context);
	        return true;
	    }
	    return false;
	}
	
	/**
	 * walk objects and arrays
	 * @param {Object} obj
	 * @param {Function} iterator
	 * @param {Object} context
	 */
	function each(obj, iterator, context) {
	    var i;
	
	    if (!obj) {
	        return;
	    }
	
	    if (obj.forEach) {
	        obj.forEach(iterator, context);
	    } else if (obj.length !== undefined) {
	        i = 0;
	        while (i < obj.length) {
	            iterator.call(context, obj[i], i, obj);
	            i++;
	        }
	    } else {
	        for (i in obj) {
	            obj.hasOwnProperty(i) && iterator.call(context, obj[i], i, obj);
	        }
	    }
	}
	
	/**
	 * wrap a method with a deprecation warning and stack trace
	 * @param {Function} method
	 * @param {String} name
	 * @param {String} message
	 * @returns {Function} A new function wrapping the supplied method.
	 */
	function deprecate(method, name, message) {
	    var deprecationMessage = 'DEPRECATED METHOD: ' + name + '\n' + message + ' AT \n';
	    return function() {
	        var e = new Error('get-stack-trace');
	        var stack = e && e.stack ? e.stack.replace(/^[^\(]+?[\n$]/gm, '')
	            .replace(/^\s+at\s+/gm, '')
	            .replace(/^Object.<anonymous>\s*\(/gm, '{anonymous}()@') : 'Unknown Stack Trace';
	
	        var log = window.console && (window.console.warn || window.console.log);
	        if (log) {
	            log.call(window.console, deprecationMessage, stack);
	        }
	        return method.apply(this, arguments);
	    };
	}
	
	/**
	 * extend object.
	 * means that properties in dest will be overwritten by the ones in src.
	 * @param {Object} target
	 * @param {...Object} objects_to_assign
	 * @returns {Object} target
	 */
	var assign;
	if (typeof Object.assign !== 'function') {
	    assign = function assign(target) {
	        if (target === undefined || target === null) {
	            throw new TypeError('Cannot convert undefined or null to object');
	        }
	
	        var output = Object(target);
	        for (var index = 1; index < arguments.length; index++) {
	            var source = arguments[index];
	            if (source !== undefined && source !== null) {
	                for (var nextKey in source) {
	                    if (source.hasOwnProperty(nextKey)) {
	                        output[nextKey] = source[nextKey];
	                    }
	                }
	            }
	        }
	        return output;
	    };
	} else {
	    assign = Object.assign;
	}
	
	/**
	 * extend object.
	 * means that properties in dest will be overwritten by the ones in src.
	 * @param {Object} dest
	 * @param {Object} src
	 * @param {Boolean=false} [merge]
	 * @returns {Object} dest
	 */
	var extend = deprecate(function extend(dest, src, merge) {
	    var keys = Object.keys(src);
	    var i = 0;
	    while (i < keys.length) {
	        if (!merge || (merge && dest[keys[i]] === undefined)) {
	            dest[keys[i]] = src[keys[i]];
	        }
	        i++;
	    }
	    return dest;
	}, 'extend', 'Use `assign`.');
	
	/**
	 * merge the values from src in the dest.
	 * means that properties that exist in dest will not be overwritten by src
	 * @param {Object} dest
	 * @param {Object} src
	 * @returns {Object} dest
	 */
	var merge = deprecate(function merge(dest, src) {
	    return extend(dest, src, true);
	}, 'merge', 'Use `assign`.');
	
	/**
	 * simple class inheritance
	 * @param {Function} child
	 * @param {Function} base
	 * @param {Object} [properties]
	 */
	function inherit(child, base, properties) {
	    var baseP = base.prototype,
	        childP;
	
	    childP = child.prototype = Object.create(baseP);
	    childP.constructor = child;
	    childP._super = baseP;
	
	    if (properties) {
	        assign(childP, properties);
	    }
	}
	
	/**
	 * simple function bind
	 * @param {Function} fn
	 * @param {Object} context
	 * @returns {Function}
	 */
	function bindFn(fn, context) {
	    return function boundFn() {
	        return fn.apply(context, arguments);
	    };
	}
	
	/**
	 * let a boolean value also be a function that must return a boolean
	 * this first item in args will be used as the context
	 * @param {Boolean|Function} val
	 * @param {Array} [args]
	 * @returns {Boolean}
	 */
	function boolOrFn(val, args) {
	    if (typeof val == TYPE_FUNCTION) {
	        return val.apply(args ? args[0] || undefined : undefined, args);
	    }
	    return val;
	}
	
	/**
	 * use the val2 when val1 is undefined
	 * @param {*} val1
	 * @param {*} val2
	 * @returns {*}
	 */
	function ifUndefined(val1, val2) {
	    return (val1 === undefined) ? val2 : val1;
	}
	
	/**
	 * addEventListener with multiple events at once
	 * @param {EventTarget} target
	 * @param {String} types
	 * @param {Function} handler
	 */
	function addEventListeners(target, types, handler) {
	    each(splitStr(types), function(type) {
	        target.addEventListener(type, handler, false);
	    });
	}
	
	/**
	 * removeEventListener with multiple events at once
	 * @param {EventTarget} target
	 * @param {String} types
	 * @param {Function} handler
	 */
	function removeEventListeners(target, types, handler) {
	    each(splitStr(types), function(type) {
	        target.removeEventListener(type, handler, false);
	    });
	}
	
	/**
	 * find if a node is in the given parent
	 * @method hasParent
	 * @param {HTMLElement} node
	 * @param {HTMLElement} parent
	 * @return {Boolean} found
	 */
	function hasParent(node, parent) {
	    while (node) {
	        if (node == parent) {
	            return true;
	        }
	        node = node.parentNode;
	    }
	    return false;
	}
	
	/**
	 * small indexOf wrapper
	 * @param {String} str
	 * @param {String} find
	 * @returns {Boolean} found
	 */
	function inStr(str, find) {
	    return str.indexOf(find) > -1;
	}
	
	/**
	 * split string on whitespace
	 * @param {String} str
	 * @returns {Array} words
	 */
	function splitStr(str) {
	    return str.trim().split(/\s+/g);
	}
	
	/**
	 * find if a array contains the object using indexOf or a simple polyFill
	 * @param {Array} src
	 * @param {String} find
	 * @param {String} [findByKey]
	 * @return {Boolean|Number} false when not found, or the index
	 */
	function inArray(src, find, findByKey) {
	    if (src.indexOf && !findByKey) {
	        return src.indexOf(find);
	    } else {
	        var i = 0;
	        while (i < src.length) {
	            if ((findByKey && src[i][findByKey] == find) || (!findByKey && src[i] === find)) {
	                return i;
	            }
	            i++;
	        }
	        return -1;
	    }
	}
	
	/**
	 * convert array-like objects to real arrays
	 * @param {Object} obj
	 * @returns {Array}
	 */
	function toArray(obj) {
	    return Array.prototype.slice.call(obj, 0);
	}
	
	/**
	 * unique array with objects based on a key (like 'id') or just by the array's value
	 * @param {Array} src [{id:1},{id:2},{id:1}]
	 * @param {String} [key]
	 * @param {Boolean} [sort=False]
	 * @returns {Array} [{id:1},{id:2}]
	 */
	function uniqueArray(src, key, sort) {
	    var results = [];
	    var values = [];
	    var i = 0;
	
	    while (i < src.length) {
	        var val = key ? src[i][key] : src[i];
	        if (inArray(values, val) < 0) {
	            results.push(src[i]);
	        }
	        values[i] = val;
	        i++;
	    }
	
	    if (sort) {
	        if (!key) {
	            results = results.sort();
	        } else {
	            results = results.sort(function sortUniqueArray(a, b) {
	                return a[key] > b[key];
	            });
	        }
	    }
	
	    return results;
	}
	
	/**
	 * get the prefixed property
	 * @param {Object} obj
	 * @param {String} property
	 * @returns {String|Undefined} prefixed
	 */
	function prefixed(obj, property) {
	    var prefix, prop;
	    var camelProp = property[0].toUpperCase() + property.slice(1);
	
	    var i = 0;
	    while (i < VENDOR_PREFIXES.length) {
	        prefix = VENDOR_PREFIXES[i];
	        prop = (prefix) ? prefix + camelProp : property;
	
	        if (prop in obj) {
	            return prop;
	        }
	        i++;
	    }
	    return undefined;
	}
	
	/**
	 * get a unique id
	 * @returns {number} uniqueId
	 */
	var _uniqueId = 1;
	function uniqueId() {
	    return _uniqueId++;
	}
	
	/**
	 * get the window object of an element
	 * @param {HTMLElement} element
	 * @returns {DocumentView|Window}
	 */
	function getWindowForElement(element) {
	    var doc = element.ownerDocument || element;
	    return (doc.defaultView || doc.parentWindow || window);
	}
	
	var MOBILE_REGEX = /mobile|tablet|ip(ad|hone|od)|android/i;
	
	var SUPPORT_TOUCH = ('ontouchstart' in window);
	var SUPPORT_POINTER_EVENTS = prefixed(window, 'PointerEvent') !== undefined;
	var SUPPORT_ONLY_TOUCH = SUPPORT_TOUCH && MOBILE_REGEX.test(navigator.userAgent);
	
	var INPUT_TYPE_TOUCH = 'touch';
	var INPUT_TYPE_PEN = 'pen';
	var INPUT_TYPE_MOUSE = 'mouse';
	var INPUT_TYPE_KINECT = 'kinect';
	
	var COMPUTE_INTERVAL = 25;
	
	var INPUT_START = 1;
	var INPUT_MOVE = 2;
	var INPUT_END = 4;
	var INPUT_CANCEL = 8;
	
	var DIRECTION_NONE = 1;
	var DIRECTION_LEFT = 2;
	var DIRECTION_RIGHT = 4;
	var DIRECTION_UP = 8;
	var DIRECTION_DOWN = 16;
	
	var DIRECTION_HORIZONTAL = DIRECTION_LEFT | DIRECTION_RIGHT;
	var DIRECTION_VERTICAL = DIRECTION_UP | DIRECTION_DOWN;
	var DIRECTION_ALL = DIRECTION_HORIZONTAL | DIRECTION_VERTICAL;
	
	var PROPS_XY = ['x', 'y'];
	var PROPS_CLIENT_XY = ['clientX', 'clientY'];
	
	/**
	 * create new input type manager
	 * @param {Manager} manager
	 * @param {Function} callback
	 * @returns {Input}
	 * @constructor
	 */
	function Input(manager, callback) {
	    var self = this;
	    this.manager = manager;
	    this.callback = callback;
	    this.element = manager.element;
	    this.target = manager.options.inputTarget;
	
	    // smaller wrapper around the handler, for the scope and the enabled state of the manager,
	    // so when disabled the input events are completely bypassed.
	    this.domHandler = function(ev) {
	        if (boolOrFn(manager.options.enable, [manager])) {
	            self.handler(ev);
	        }
	    };
	
	    this.init();
	
	}
	
	Input.prototype = {
	    /**
	     * should handle the inputEvent data and trigger the callback
	     * @virtual
	     */
	    handler: function() { },
	
	    /**
	     * bind the events
	     */
	    init: function() {
	        this.evEl && addEventListeners(this.element, this.evEl, this.domHandler);
	        this.evTarget && addEventListeners(this.target, this.evTarget, this.domHandler);
	        this.evWin && addEventListeners(getWindowForElement(this.element), this.evWin, this.domHandler);
	    },
	
	    /**
	     * unbind the events
	     */
	    destroy: function() {
	        this.evEl && removeEventListeners(this.element, this.evEl, this.domHandler);
	        this.evTarget && removeEventListeners(this.target, this.evTarget, this.domHandler);
	        this.evWin && removeEventListeners(getWindowForElement(this.element), this.evWin, this.domHandler);
	    }
	};
	
	/**
	 * create new input type manager
	 * called by the Manager constructor
	 * @param {Hammer} manager
	 * @returns {Input}
	 */
	function createInputInstance(manager) {
	    var Type;
	    var inputClass = manager.options.inputClass;
	
	    if (inputClass) {
	        Type = inputClass;
	    } else if (SUPPORT_POINTER_EVENTS) {
	        Type = PointerEventInput;
	    } else if (SUPPORT_ONLY_TOUCH) {
	        Type = TouchInput;
	    } else if (!SUPPORT_TOUCH) {
	        Type = MouseInput;
	    } else {
	        Type = TouchMouseInput;
	    }
	    return new (Type)(manager, inputHandler);
	}
	
	/**
	 * handle input events
	 * @param {Manager} manager
	 * @param {String} eventType
	 * @param {Object} input
	 */
	function inputHandler(manager, eventType, input) {
	    var pointersLen = input.pointers.length;
	    var changedPointersLen = input.changedPointers.length;
	    var isFirst = (eventType & INPUT_START && (pointersLen - changedPointersLen === 0));
	    var isFinal = (eventType & (INPUT_END | INPUT_CANCEL) && (pointersLen - changedPointersLen === 0));
	
	    input.isFirst = !!isFirst;
	    input.isFinal = !!isFinal;
	
	    if (isFirst) {
	        manager.session = {};
	    }
	
	    // source event is the normalized value of the domEvents
	    // like 'touchstart, mouseup, pointerdown'
	    input.eventType = eventType;
	
	    // compute scale, rotation etc
	    computeInputData(manager, input);
	
	    // emit secret event
	    manager.emit('hammer.input', input);
	
	    manager.recognize(input);
	    manager.session.prevInput = input;
	}
	
	/**
	 * extend the data with some usable properties like scale, rotate, velocity etc
	 * @param {Object} manager
	 * @param {Object} input
	 */
	function computeInputData(manager, input) {
	    var session = manager.session;
	    var pointers = input.pointers;
	    var pointersLength = pointers.length;
	
	    // store the first input to calculate the distance and direction
	    if (!session.firstInput) {
	        session.firstInput = simpleCloneInputData(input);
	    }
	
	    // to compute scale and rotation we need to store the multiple touches
	    if (pointersLength > 1 && !session.firstMultiple) {
	        session.firstMultiple = simpleCloneInputData(input);
	    } else if (pointersLength === 1) {
	        session.firstMultiple = false;
	    }
	
	    var firstInput = session.firstInput;
	    var firstMultiple = session.firstMultiple;
	    var offsetCenter = firstMultiple ? firstMultiple.center : firstInput.center;
	
	    var center = input.center = getCenter(pointers);
	    input.timeStamp = now();
	    input.deltaTime = input.timeStamp - firstInput.timeStamp;
	
	    input.angle = getAngle(offsetCenter, center);
	    input.distance = getDistance(offsetCenter, center);
	
	    computeDeltaXY(session, input);
	    input.offsetDirection = getDirection(input.deltaX, input.deltaY);
	
	    var overallVelocity = getVelocity(input.deltaTime, input.deltaX, input.deltaY);
	    input.overallVelocityX = overallVelocity.x;
	    input.overallVelocityY = overallVelocity.y;
	    input.overallVelocity = (abs(overallVelocity.x) > abs(overallVelocity.y)) ? overallVelocity.x : overallVelocity.y;
	
	    input.scale = firstMultiple ? getScale(firstMultiple.pointers, pointers) : 1;
	    input.rotation = firstMultiple ? getRotation(firstMultiple.pointers, pointers) : 0;
	
	    input.maxPointers = !session.prevInput ? input.pointers.length : ((input.pointers.length >
	        session.prevInput.maxPointers) ? input.pointers.length : session.prevInput.maxPointers);
	
	    computeIntervalInputData(session, input);
	
	    // find the correct target
	    var target = manager.element;
	    if (hasParent(input.srcEvent.target, target)) {
	        target = input.srcEvent.target;
	    }
	    input.target = target;
	}
	
	function computeDeltaXY(session, input) {
	    var center = input.center;
	    var offset = session.offsetDelta || {};
	    var prevDelta = session.prevDelta || {};
	    var prevInput = session.prevInput || {};
	
	    if (input.eventType === INPUT_START || prevInput.eventType === INPUT_END) {
	        prevDelta = session.prevDelta = {
	            x: prevInput.deltaX || 0,
	            y: prevInput.deltaY || 0
	        };
	
	        offset = session.offsetDelta = {
	            x: center.x,
	            y: center.y
	        };
	    }
	
	    input.deltaX = prevDelta.x + (center.x - offset.x);
	    input.deltaY = prevDelta.y + (center.y - offset.y);
	}
	
	/**
	 * velocity is calculated every x ms
	 * @param {Object} session
	 * @param {Object} input
	 */
	function computeIntervalInputData(session, input) {
	    var last = session.lastInterval || input,
	        deltaTime = input.timeStamp - last.timeStamp,
	        velocity, velocityX, velocityY, direction;
	
	    if (input.eventType != INPUT_CANCEL && (deltaTime > COMPUTE_INTERVAL || last.velocity === undefined)) {
	        var deltaX = input.deltaX - last.deltaX;
	        var deltaY = input.deltaY - last.deltaY;
	
	        var v = getVelocity(deltaTime, deltaX, deltaY);
	        velocityX = v.x;
	        velocityY = v.y;
	        velocity = (abs(v.x) > abs(v.y)) ? v.x : v.y;
	        direction = getDirection(deltaX, deltaY);
	
	        session.lastInterval = input;
	    } else {
	        // use latest velocity info if it doesn't overtake a minimum period
	        velocity = last.velocity;
	        velocityX = last.velocityX;
	        velocityY = last.velocityY;
	        direction = last.direction;
	    }
	
	    input.velocity = velocity;
	    input.velocityX = velocityX;
	    input.velocityY = velocityY;
	    input.direction = direction;
	}
	
	/**
	 * create a simple clone from the input used for storage of firstInput and firstMultiple
	 * @param {Object} input
	 * @returns {Object} clonedInputData
	 */
	function simpleCloneInputData(input) {
	    // make a simple copy of the pointers because we will get a reference if we don't
	    // we only need clientXY for the calculations
	    var pointers = [];
	    var i = 0;
	    while (i < input.pointers.length) {
	        pointers[i] = {
	            clientX: round(input.pointers[i].clientX),
	            clientY: round(input.pointers[i].clientY)
	        };
	        i++;
	    }
	
	    return {
	        timeStamp: now(),
	        pointers: pointers,
	        center: getCenter(pointers),
	        deltaX: input.deltaX,
	        deltaY: input.deltaY
	    };
	}
	
	/**
	 * get the center of all the pointers
	 * @param {Array} pointers
	 * @return {Object} center contains `x` and `y` properties
	 */
	function getCenter(pointers) {
	    var pointersLength = pointers.length;
	
	    // no need to loop when only one touch
	    if (pointersLength === 1) {
	        return {
	            x: round(pointers[0].clientX),
	            y: round(pointers[0].clientY)
	        };
	    }
	
	    var x = 0, y = 0, i = 0;
	    while (i < pointersLength) {
	        x += pointers[i].clientX;
	        y += pointers[i].clientY;
	        i++;
	    }
	
	    return {
	        x: round(x / pointersLength),
	        y: round(y / pointersLength)
	    };
	}
	
	/**
	 * calculate the velocity between two points. unit is in px per ms.
	 * @param {Number} deltaTime
	 * @param {Number} x
	 * @param {Number} y
	 * @return {Object} velocity `x` and `y`
	 */
	function getVelocity(deltaTime, x, y) {
	    return {
	        x: x / deltaTime || 0,
	        y: y / deltaTime || 0
	    };
	}
	
	/**
	 * get the direction between two points
	 * @param {Number} x
	 * @param {Number} y
	 * @return {Number} direction
	 */
	function getDirection(x, y) {
	    if (x === y) {
	        return DIRECTION_NONE;
	    }
	
	    if (abs(x) >= abs(y)) {
	        return x < 0 ? DIRECTION_LEFT : DIRECTION_RIGHT;
	    }
	    return y < 0 ? DIRECTION_UP : DIRECTION_DOWN;
	}
	
	/**
	 * calculate the absolute distance between two points
	 * @param {Object} p1 {x, y}
	 * @param {Object} p2 {x, y}
	 * @param {Array} [props] containing x and y keys
	 * @return {Number} distance
	 */
	function getDistance(p1, p2, props) {
	    if (!props) {
	        props = PROPS_XY;
	    }
	    var x = p2[props[0]] - p1[props[0]],
	        y = p2[props[1]] - p1[props[1]];
	
	    return Math.sqrt((x * x) + (y * y));
	}
	
	/**
	 * calculate the angle between two coordinates
	 * @param {Object} p1
	 * @param {Object} p2
	 * @param {Array} [props] containing x and y keys
	 * @return {Number} angle
	 */
	function getAngle(p1, p2, props) {
	    if (!props) {
	        props = PROPS_XY;
	    }
	    var x = p2[props[0]] - p1[props[0]],
	        y = p2[props[1]] - p1[props[1]];
	    return Math.atan2(y, x) * 180 / Math.PI;
	}
	
	/**
	 * calculate the rotation degrees between two pointersets
	 * @param {Array} start array of pointers
	 * @param {Array} end array of pointers
	 * @return {Number} rotation
	 */
	function getRotation(start, end) {
	    return getAngle(end[1], end[0], PROPS_CLIENT_XY) + getAngle(start[1], start[0], PROPS_CLIENT_XY);
	}
	
	/**
	 * calculate the scale factor between two pointersets
	 * no scale is 1, and goes down to 0 when pinched together, and bigger when pinched out
	 * @param {Array} start array of pointers
	 * @param {Array} end array of pointers
	 * @return {Number} scale
	 */
	function getScale(start, end) {
	    return getDistance(end[0], end[1], PROPS_CLIENT_XY) / getDistance(start[0], start[1], PROPS_CLIENT_XY);
	}
	
	var MOUSE_INPUT_MAP = {
	    mousedown: INPUT_START,
	    mousemove: INPUT_MOVE,
	    mouseup: INPUT_END
	};
	
	var MOUSE_ELEMENT_EVENTS = 'mousedown';
	var MOUSE_WINDOW_EVENTS = 'mousemove mouseup';
	
	/**
	 * Mouse events input
	 * @constructor
	 * @extends Input
	 */
	function MouseInput() {
	    this.evEl = MOUSE_ELEMENT_EVENTS;
	    this.evWin = MOUSE_WINDOW_EVENTS;
	
	    this.allow = true; // used by Input.TouchMouse to disable mouse events
	    this.pressed = false; // mousedown state
	
	    Input.apply(this, arguments);
	}
	
	inherit(MouseInput, Input, {
	    /**
	     * handle mouse events
	     * @param {Object} ev
	     */
	    handler: function MEhandler(ev) {
	        var eventType = MOUSE_INPUT_MAP[ev.type];
	
	        // on start we want to have the left mouse button down
	        if (eventType & INPUT_START && ev.button === 0) {
	            this.pressed = true;
	        }
	
	        if (eventType & INPUT_MOVE && ev.which !== 1) {
	            eventType = INPUT_END;
	        }
	
	        // mouse must be down, and mouse events are allowed (see the TouchMouse input)
	        if (!this.pressed || !this.allow) {
	            return;
	        }
	
	        if (eventType & INPUT_END) {
	            this.pressed = false;
	        }
	
	        this.callback(this.manager, eventType, {
	            pointers: [ev],
	            changedPointers: [ev],
	            pointerType: INPUT_TYPE_MOUSE,
	            srcEvent: ev
	        });
	    }
	});
	
	var POINTER_INPUT_MAP = {
	    pointerdown: INPUT_START,
	    pointermove: INPUT_MOVE,
	    pointerup: INPUT_END,
	    pointercancel: INPUT_CANCEL,
	    pointerout: INPUT_CANCEL
	};
	
	// in IE10 the pointer types is defined as an enum
	var IE10_POINTER_TYPE_ENUM = {
	    2: INPUT_TYPE_TOUCH,
	    3: INPUT_TYPE_PEN,
	    4: INPUT_TYPE_MOUSE,
	    5: INPUT_TYPE_KINECT // see https://twitter.com/jacobrossi/status/480596438489890816
	};
	
	var POINTER_ELEMENT_EVENTS = 'pointerdown';
	var POINTER_WINDOW_EVENTS = 'pointermove pointerup pointercancel';
	
	// IE10 has prefixed support, and case-sensitive
	if (window.MSPointerEvent && !window.PointerEvent) {
	    POINTER_ELEMENT_EVENTS = 'MSPointerDown';
	    POINTER_WINDOW_EVENTS = 'MSPointerMove MSPointerUp MSPointerCancel';
	}
	
	/**
	 * Pointer events input
	 * @constructor
	 * @extends Input
	 */
	function PointerEventInput() {
	    this.evEl = POINTER_ELEMENT_EVENTS;
	    this.evWin = POINTER_WINDOW_EVENTS;
	
	    Input.apply(this, arguments);
	
	    this.store = (this.manager.session.pointerEvents = []);
	}
	
	inherit(PointerEventInput, Input, {
	    /**
	     * handle mouse events
	     * @param {Object} ev
	     */
	    handler: function PEhandler(ev) {
	        var store = this.store;
	        var removePointer = false;
	
	        var eventTypeNormalized = ev.type.toLowerCase().replace('ms', '');
	        var eventType = POINTER_INPUT_MAP[eventTypeNormalized];
	        var pointerType = IE10_POINTER_TYPE_ENUM[ev.pointerType] || ev.pointerType;
	
	        var isTouch = (pointerType == INPUT_TYPE_TOUCH);
	
	        // get index of the event in the store
	        var storeIndex = inArray(store, ev.pointerId, 'pointerId');
	
	        // start and mouse must be down
	        if (eventType & INPUT_START && (ev.button === 0 || isTouch)) {
	            if (storeIndex < 0) {
	                store.push(ev);
	                storeIndex = store.length - 1;
	            }
	        } else if (eventType & (INPUT_END | INPUT_CANCEL)) {
	            removePointer = true;
	        }
	
	        // it not found, so the pointer hasn't been down (so it's probably a hover)
	        if (storeIndex < 0) {
	            return;
	        }
	
	        // update the event in the store
	        store[storeIndex] = ev;
	
	        this.callback(this.manager, eventType, {
	            pointers: store,
	            changedPointers: [ev],
	            pointerType: pointerType,
	            srcEvent: ev
	        });
	
	        if (removePointer) {
	            // remove from the store
	            store.splice(storeIndex, 1);
	        }
	    }
	});
	
	var SINGLE_TOUCH_INPUT_MAP = {
	    touchstart: INPUT_START,
	    touchmove: INPUT_MOVE,
	    touchend: INPUT_END,
	    touchcancel: INPUT_CANCEL
	};
	
	var SINGLE_TOUCH_TARGET_EVENTS = 'touchstart';
	var SINGLE_TOUCH_WINDOW_EVENTS = 'touchstart touchmove touchend touchcancel';
	
	/**
	 * Touch events input
	 * @constructor
	 * @extends Input
	 */
	function SingleTouchInput() {
	    this.evTarget = SINGLE_TOUCH_TARGET_EVENTS;
	    this.evWin = SINGLE_TOUCH_WINDOW_EVENTS;
	    this.started = false;
	
	    Input.apply(this, arguments);
	}
	
	inherit(SingleTouchInput, Input, {
	    handler: function TEhandler(ev) {
	        var type = SINGLE_TOUCH_INPUT_MAP[ev.type];
	
	        // should we handle the touch events?
	        if (type === INPUT_START) {
	            this.started = true;
	        }
	
	        if (!this.started) {
	            return;
	        }
	
	        var touches = normalizeSingleTouches.call(this, ev, type);
	
	        // when done, reset the started state
	        if (type & (INPUT_END | INPUT_CANCEL) && touches[0].length - touches[1].length === 0) {
	            this.started = false;
	        }
	
	        this.callback(this.manager, type, {
	            pointers: touches[0],
	            changedPointers: touches[1],
	            pointerType: INPUT_TYPE_TOUCH,
	            srcEvent: ev
	        });
	    }
	});
	
	/**
	 * @this {TouchInput}
	 * @param {Object} ev
	 * @param {Number} type flag
	 * @returns {undefined|Array} [all, changed]
	 */
	function normalizeSingleTouches(ev, type) {
	    var all = toArray(ev.touches);
	    var changed = toArray(ev.changedTouches);
	
	    if (type & (INPUT_END | INPUT_CANCEL)) {
	        all = uniqueArray(all.concat(changed), 'identifier', true);
	    }
	
	    return [all, changed];
	}
	
	var TOUCH_INPUT_MAP = {
	    touchstart: INPUT_START,
	    touchmove: INPUT_MOVE,
	    touchend: INPUT_END,
	    touchcancel: INPUT_CANCEL
	};
	
	var TOUCH_TARGET_EVENTS = 'touchstart touchmove touchend touchcancel';
	
	/**
	 * Multi-user touch events input
	 * @constructor
	 * @extends Input
	 */
	function TouchInput() {
	    this.evTarget = TOUCH_TARGET_EVENTS;
	    this.targetIds = {};
	
	    Input.apply(this, arguments);
	}
	
	inherit(TouchInput, Input, {
	    handler: function MTEhandler(ev) {
	        var type = TOUCH_INPUT_MAP[ev.type];
	        var touches = getTouches.call(this, ev, type);
	        if (!touches) {
	            return;
	        }
	
	        this.callback(this.manager, type, {
	            pointers: touches[0],
	            changedPointers: touches[1],
	            pointerType: INPUT_TYPE_TOUCH,
	            srcEvent: ev
	        });
	    }
	});
	
	/**
	 * @this {TouchInput}
	 * @param {Object} ev
	 * @param {Number} type flag
	 * @returns {undefined|Array} [all, changed]
	 */
	function getTouches(ev, type) {
	    var allTouches = toArray(ev.touches);
	    var targetIds = this.targetIds;
	
	    // when there is only one touch, the process can be simplified
	    if (type & (INPUT_START | INPUT_MOVE) && allTouches.length === 1) {
	        targetIds[allTouches[0].identifier] = true;
	        return [allTouches, allTouches];
	    }
	
	    var i,
	        targetTouches,
	        changedTouches = toArray(ev.changedTouches),
	        changedTargetTouches = [],
	        target = this.target;
	
	    // get target touches from touches
	    targetTouches = allTouches.filter(function(touch) {
	        return hasParent(touch.target, target);
	    });
	
	    // collect touches
	    if (type === INPUT_START) {
	        i = 0;
	        while (i < targetTouches.length) {
	            targetIds[targetTouches[i].identifier] = true;
	            i++;
	        }
	    }
	
	    // filter changed touches to only contain touches that exist in the collected target ids
	    i = 0;
	    while (i < changedTouches.length) {
	        if (targetIds[changedTouches[i].identifier]) {
	            changedTargetTouches.push(changedTouches[i]);
	        }
	
	        // cleanup removed touches
	        if (type & (INPUT_END | INPUT_CANCEL)) {
	            delete targetIds[changedTouches[i].identifier];
	        }
	        i++;
	    }
	
	    if (!changedTargetTouches.length) {
	        return;
	    }
	
	    return [
	        // merge targetTouches with changedTargetTouches so it contains ALL touches, including 'end' and 'cancel'
	        uniqueArray(targetTouches.concat(changedTargetTouches), 'identifier', true),
	        changedTargetTouches
	    ];
	}
	
	/**
	 * Combined touch and mouse input
	 *
	 * Touch has a higher priority then mouse, and while touching no mouse events are allowed.
	 * This because touch devices also emit mouse events while doing a touch.
	 *
	 * @constructor
	 * @extends Input
	 */
	function TouchMouseInput() {
	    Input.apply(this, arguments);
	
	    var handler = bindFn(this.handler, this);
	    this.touch = new TouchInput(this.manager, handler);
	    this.mouse = new MouseInput(this.manager, handler);
	}
	
	inherit(TouchMouseInput, Input, {
	    /**
	     * handle mouse and touch events
	     * @param {Hammer} manager
	     * @param {String} inputEvent
	     * @param {Object} inputData
	     */
	    handler: function TMEhandler(manager, inputEvent, inputData) {
	        var isTouch = (inputData.pointerType == INPUT_TYPE_TOUCH),
	            isMouse = (inputData.pointerType == INPUT_TYPE_MOUSE);
	
	        // when we're in a touch event, so  block all upcoming mouse events
	        // most mobile browser also emit mouseevents, right after touchstart
	        if (isTouch) {
	            this.mouse.allow = false;
	        } else if (isMouse && !this.mouse.allow) {
	            return;
	        }
	
	        // reset the allowMouse when we're done
	        if (inputEvent & (INPUT_END | INPUT_CANCEL)) {
	            this.mouse.allow = true;
	        }
	
	        this.callback(manager, inputEvent, inputData);
	    },
	
	    /**
	     * remove the event listeners
	     */
	    destroy: function destroy() {
	        this.touch.destroy();
	        this.mouse.destroy();
	    }
	});
	
	var PREFIXED_TOUCH_ACTION = prefixed(TEST_ELEMENT.style, 'touchAction');
	var NATIVE_TOUCH_ACTION = PREFIXED_TOUCH_ACTION !== undefined;
	
	// magical touchAction value
	var TOUCH_ACTION_COMPUTE = 'compute';
	var TOUCH_ACTION_AUTO = 'auto';
	var TOUCH_ACTION_MANIPULATION = 'manipulation'; // not implemented
	var TOUCH_ACTION_NONE = 'none';
	var TOUCH_ACTION_PAN_X = 'pan-x';
	var TOUCH_ACTION_PAN_Y = 'pan-y';
	
	/**
	 * Touch Action
	 * sets the touchAction property or uses the js alternative
	 * @param {Manager} manager
	 * @param {String} value
	 * @constructor
	 */
	function TouchAction(manager, value) {
	    this.manager = manager;
	    this.set(value);
	}
	
	TouchAction.prototype = {
	    /**
	     * set the touchAction value on the element or enable the polyfill
	     * @param {String} value
	     */
	    set: function(value) {
	        // find out the touch-action by the event handlers
	        if (value == TOUCH_ACTION_COMPUTE) {
	            value = this.compute();
	        }
	
	        if (NATIVE_TOUCH_ACTION && this.manager.element.style) {
	            this.manager.element.style[PREFIXED_TOUCH_ACTION] = value;
	        }
	        this.actions = value.toLowerCase().trim();
	    },
	
	    /**
	     * just re-set the touchAction value
	     */
	    update: function() {
	        this.set(this.manager.options.touchAction);
	    },
	
	    /**
	     * compute the value for the touchAction property based on the recognizer's settings
	     * @returns {String} value
	     */
	    compute: function() {
	        var actions = [];
	        each(this.manager.recognizers, function(recognizer) {
	            if (boolOrFn(recognizer.options.enable, [recognizer])) {
	                actions = actions.concat(recognizer.getTouchAction());
	            }
	        });
	        return cleanTouchActions(actions.join(' '));
	    },
	
	    /**
	     * this method is called on each input cycle and provides the preventing of the browser behavior
	     * @param {Object} input
	     */
	    preventDefaults: function(input) {
	        // not needed with native support for the touchAction property
	        if (NATIVE_TOUCH_ACTION) {
	            return;
	        }
	
	        var srcEvent = input.srcEvent;
	        var direction = input.offsetDirection;
	
	        // if the touch action did prevented once this session
	        if (this.manager.session.prevented) {
	            srcEvent.preventDefault();
	            return;
	        }
	
	        var actions = this.actions;
	        var hasNone = inStr(actions, TOUCH_ACTION_NONE);
	        var hasPanY = inStr(actions, TOUCH_ACTION_PAN_Y);
	        var hasPanX = inStr(actions, TOUCH_ACTION_PAN_X);
	
	        if (hasNone) {
	            //do not prevent defaults if this is a tap gesture
	
	            var isTapPointer = input.pointers.length === 1;
	            var isTapMovement = input.distance < 2;
	            var isTapTouchTime = input.deltaTime < 250;
	
	            if (isTapPointer && isTapMovement && isTapTouchTime) {
	                return;
	            }
	        }
	
	        if (hasPanX && hasPanY) {
	            // `pan-x pan-y` means browser handles all scrolling/panning, do not prevent
	            return;
	        }
	
	        if (hasNone ||
	            (hasPanY && direction & DIRECTION_HORIZONTAL) ||
	            (hasPanX && direction & DIRECTION_VERTICAL)) {
	            return this.preventSrc(srcEvent);
	        }
	    },
	
	    /**
	     * call preventDefault to prevent the browser's default behavior (scrolling in most cases)
	     * @param {Object} srcEvent
	     */
	    preventSrc: function(srcEvent) {
	        this.manager.session.prevented = true;
	        srcEvent.preventDefault();
	    }
	};
	
	/**
	 * when the touchActions are collected they are not a valid value, so we need to clean things up. *
	 * @param {String} actions
	 * @returns {*}
	 */
	function cleanTouchActions(actions) {
	    // none
	    if (inStr(actions, TOUCH_ACTION_NONE)) {
	        return TOUCH_ACTION_NONE;
	    }
	
	    var hasPanX = inStr(actions, TOUCH_ACTION_PAN_X);
	    var hasPanY = inStr(actions, TOUCH_ACTION_PAN_Y);
	
	    // if both pan-x and pan-y are set (different recognizers
	    // for different directions, e.g. horizontal pan but vertical swipe?)
	    // we need none (as otherwise with pan-x pan-y combined none of these
	    // recognizers will work, since the browser would handle all panning
	    if (hasPanX && hasPanY) {
	        return TOUCH_ACTION_NONE;
	    }
	
	    // pan-x OR pan-y
	    if (hasPanX || hasPanY) {
	        return hasPanX ? TOUCH_ACTION_PAN_X : TOUCH_ACTION_PAN_Y;
	    }
	
	    // manipulation
	    if (inStr(actions, TOUCH_ACTION_MANIPULATION)) {
	        return TOUCH_ACTION_MANIPULATION;
	    }
	
	    return TOUCH_ACTION_AUTO;
	}
	
	/**
	 * Recognizer flow explained; *
	 * All recognizers have the initial state of POSSIBLE when a input session starts.
	 * The definition of a input session is from the first input until the last input, with all it's movement in it. *
	 * Example session for mouse-input: mousedown -> mousemove -> mouseup
	 *
	 * On each recognizing cycle (see Manager.recognize) the .recognize() method is executed
	 * which determines with state it should be.
	 *
	 * If the recognizer has the state FAILED, CANCELLED or RECOGNIZED (equals ENDED), it is reset to
	 * POSSIBLE to give it another change on the next cycle.
	 *
	 *               Possible
	 *                  |
	 *            +-----+---------------+
	 *            |                     |
	 *      +-----+-----+               |
	 *      |           |               |
	 *   Failed      Cancelled          |
	 *                          +-------+------+
	 *                          |              |
	 *                      Recognized       Began
	 *                                         |
	 *                                      Changed
	 *                                         |
	 *                                  Ended/Recognized
	 */
	var STATE_POSSIBLE = 1;
	var STATE_BEGAN = 2;
	var STATE_CHANGED = 4;
	var STATE_ENDED = 8;
	var STATE_RECOGNIZED = STATE_ENDED;
	var STATE_CANCELLED = 16;
	var STATE_FAILED = 32;
	
	/**
	 * Recognizer
	 * Every recognizer needs to extend from this class.
	 * @constructor
	 * @param {Object} options
	 */
	function Recognizer(options) {
	    this.options = assign({}, this.defaults, options || {});
	
	    this.id = uniqueId();
	
	    this.manager = null;
	
	    // default is enable true
	    this.options.enable = ifUndefined(this.options.enable, true);
	
	    this.state = STATE_POSSIBLE;
	
	    this.simultaneous = {};
	    this.requireFail = [];
	}
	
	Recognizer.prototype = {
	    /**
	     * @virtual
	     * @type {Object}
	     */
	    defaults: {},
	
	    /**
	     * set options
	     * @param {Object} options
	     * @return {Recognizer}
	     */
	    set: function(options) {
	        assign(this.options, options);
	
	        // also update the touchAction, in case something changed about the directions/enabled state
	        this.manager && this.manager.touchAction.update();
	        return this;
	    },
	
	    /**
	     * recognize simultaneous with an other recognizer.
	     * @param {Recognizer} otherRecognizer
	     * @returns {Recognizer} this
	     */
	    recognizeWith: function(otherRecognizer) {
	        if (invokeArrayArg(otherRecognizer, 'recognizeWith', this)) {
	            return this;
	        }
	
	        var simultaneous = this.simultaneous;
	        otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);
	        if (!simultaneous[otherRecognizer.id]) {
	            simultaneous[otherRecognizer.id] = otherRecognizer;
	            otherRecognizer.recognizeWith(this);
	        }
	        return this;
	    },
	
	    /**
	     * drop the simultaneous link. it doesnt remove the link on the other recognizer.
	     * @param {Recognizer} otherRecognizer
	     * @returns {Recognizer} this
	     */
	    dropRecognizeWith: function(otherRecognizer) {
	        if (invokeArrayArg(otherRecognizer, 'dropRecognizeWith', this)) {
	            return this;
	        }
	
	        otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);
	        delete this.simultaneous[otherRecognizer.id];
	        return this;
	    },
	
	    /**
	     * recognizer can only run when an other is failing
	     * @param {Recognizer} otherRecognizer
	     * @returns {Recognizer} this
	     */
	    requireFailure: function(otherRecognizer) {
	        if (invokeArrayArg(otherRecognizer, 'requireFailure', this)) {
	            return this;
	        }
	
	        var requireFail = this.requireFail;
	        otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);
	        if (inArray(requireFail, otherRecognizer) === -1) {
	            requireFail.push(otherRecognizer);
	            otherRecognizer.requireFailure(this);
	        }
	        return this;
	    },
	
	    /**
	     * drop the requireFailure link. it does not remove the link on the other recognizer.
	     * @param {Recognizer} otherRecognizer
	     * @returns {Recognizer} this
	     */
	    dropRequireFailure: function(otherRecognizer) {
	        if (invokeArrayArg(otherRecognizer, 'dropRequireFailure', this)) {
	            return this;
	        }
	
	        otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);
	        var index = inArray(this.requireFail, otherRecognizer);
	        if (index > -1) {
	            this.requireFail.splice(index, 1);
	        }
	        return this;
	    },
	
	    /**
	     * has require failures boolean
	     * @returns {boolean}
	     */
	    hasRequireFailures: function() {
	        return this.requireFail.length > 0;
	    },
	
	    /**
	     * if the recognizer can recognize simultaneous with an other recognizer
	     * @param {Recognizer} otherRecognizer
	     * @returns {Boolean}
	     */
	    canRecognizeWith: function(otherRecognizer) {
	        return !!this.simultaneous[otherRecognizer.id];
	    },
	
	    /**
	     * You should use `tryEmit` instead of `emit` directly to check
	     * that all the needed recognizers has failed before emitting.
	     * @param {Object} input
	     */
	    emit: function(input) {
	        var self = this;
	        var state = this.state;
	
	        function emit(event) {
	            self.manager.emit(event, input);
	        }
	
	        // 'panstart' and 'panmove'
	        if (state < STATE_ENDED) {
	            emit(self.options.event + stateStr(state));
	        }
	
	        emit(self.options.event); // simple 'eventName' events
	
	        if (input.additionalEvent) { // additional event(panleft, panright, pinchin, pinchout...)
	            emit(input.additionalEvent);
	        }
	
	        // panend and pancancel
	        if (state >= STATE_ENDED) {
	            emit(self.options.event + stateStr(state));
	        }
	    },
	
	    /**
	     * Check that all the require failure recognizers has failed,
	     * if true, it emits a gesture event,
	     * otherwise, setup the state to FAILED.
	     * @param {Object} input
	     */
	    tryEmit: function(input) {
	        if (this.canEmit()) {
	            return this.emit(input);
	        }
	        // it's failing anyway
	        this.state = STATE_FAILED;
	    },
	
	    /**
	     * can we emit?
	     * @returns {boolean}
	     */
	    canEmit: function() {
	        var i = 0;
	        while (i < this.requireFail.length) {
	            if (!(this.requireFail[i].state & (STATE_FAILED | STATE_POSSIBLE))) {
	                return false;
	            }
	            i++;
	        }
	        return true;
	    },
	
	    /**
	     * update the recognizer
	     * @param {Object} inputData
	     */
	    recognize: function(inputData) {
	        // make a new copy of the inputData
	        // so we can change the inputData without messing up the other recognizers
	        var inputDataClone = assign({}, inputData);
	
	        // is is enabled and allow recognizing?
	        if (!boolOrFn(this.options.enable, [this, inputDataClone])) {
	            this.reset();
	            this.state = STATE_FAILED;
	            return;
	        }
	
	        // reset when we've reached the end
	        if (this.state & (STATE_RECOGNIZED | STATE_CANCELLED | STATE_FAILED)) {
	            this.state = STATE_POSSIBLE;
	        }
	
	        this.state = this.process(inputDataClone);
	
	        // the recognizer has recognized a gesture
	        // so trigger an event
	        if (this.state & (STATE_BEGAN | STATE_CHANGED | STATE_ENDED | STATE_CANCELLED)) {
	            this.tryEmit(inputDataClone);
	        }
	    },
	
	    /**
	     * return the state of the recognizer
	     * the actual recognizing happens in this method
	     * @virtual
	     * @param {Object} inputData
	     * @returns {Const} STATE
	     */
	    process: function(inputData) { }, // jshint ignore:line
	
	    /**
	     * return the preferred touch-action
	     * @virtual
	     * @returns {Array}
	     */
	    getTouchAction: function() { },
	
	    /**
	     * called when the gesture isn't allowed to recognize
	     * like when another is being recognized or it is disabled
	     * @virtual
	     */
	    reset: function() { }
	};
	
	/**
	 * get a usable string, used as event postfix
	 * @param {Const} state
	 * @returns {String} state
	 */
	function stateStr(state) {
	    if (state & STATE_CANCELLED) {
	        return 'cancel';
	    } else if (state & STATE_ENDED) {
	        return 'end';
	    } else if (state & STATE_CHANGED) {
	        return 'move';
	    } else if (state & STATE_BEGAN) {
	        return 'start';
	    }
	    return '';
	}
	
	/**
	 * direction cons to string
	 * @param {Const} direction
	 * @returns {String}
	 */
	function directionStr(direction) {
	    if (direction == DIRECTION_DOWN) {
	        return 'down';
	    } else if (direction == DIRECTION_UP) {
	        return 'up';
	    } else if (direction == DIRECTION_LEFT) {
	        return 'left';
	    } else if (direction == DIRECTION_RIGHT) {
	        return 'right';
	    }
	    return '';
	}
	
	/**
	 * get a recognizer by name if it is bound to a manager
	 * @param {Recognizer|String} otherRecognizer
	 * @param {Recognizer} recognizer
	 * @returns {Recognizer}
	 */
	function getRecognizerByNameIfManager(otherRecognizer, recognizer) {
	    var manager = recognizer.manager;
	    if (manager) {
	        return manager.get(otherRecognizer);
	    }
	    return otherRecognizer;
	}
	
	/**
	 * This recognizer is just used as a base for the simple attribute recognizers.
	 * @constructor
	 * @extends Recognizer
	 */
	function AttrRecognizer() {
	    Recognizer.apply(this, arguments);
	}
	
	inherit(AttrRecognizer, Recognizer, {
	    /**
	     * @namespace
	     * @memberof AttrRecognizer
	     */
	    defaults: {
	        /**
	         * @type {Number}
	         * @default 1
	         */
	        pointers: 1
	    },
	
	    /**
	     * Used to check if it the recognizer receives valid input, like input.distance > 10.
	     * @memberof AttrRecognizer
	     * @param {Object} input
	     * @returns {Boolean} recognized
	     */
	    attrTest: function(input) {
	        var optionPointers = this.options.pointers;
	        return optionPointers === 0 || input.pointers.length === optionPointers;
	    },
	
	    /**
	     * Process the input and return the state for the recognizer
	     * @memberof AttrRecognizer
	     * @param {Object} input
	     * @returns {*} State
	     */
	    process: function(input) {
	        var state = this.state;
	        var eventType = input.eventType;
	
	        var isRecognized = state & (STATE_BEGAN | STATE_CHANGED);
	        var isValid = this.attrTest(input);
	
	        // on cancel input and we've recognized before, return STATE_CANCELLED
	        if (isRecognized && (eventType & INPUT_CANCEL || !isValid)) {
	            return state | STATE_CANCELLED;
	        } else if (isRecognized || isValid) {
	            if (eventType & INPUT_END) {
	                return state | STATE_ENDED;
	            } else if (!(state & STATE_BEGAN)) {
	                return STATE_BEGAN;
	            }
	            return state | STATE_CHANGED;
	        }
	        return STATE_FAILED;
	    }
	});
	
	/**
	 * Pan
	 * Recognized when the pointer is down and moved in the allowed direction.
	 * @constructor
	 * @extends AttrRecognizer
	 */
	function PanRecognizer() {
	    AttrRecognizer.apply(this, arguments);
	
	    this.pX = null;
	    this.pY = null;
	}
	
	inherit(PanRecognizer, AttrRecognizer, {
	    /**
	     * @namespace
	     * @memberof PanRecognizer
	     */
	    defaults: {
	        event: 'pan',
	        threshold: 10,
	        pointers: 1,
	        direction: DIRECTION_ALL
	    },
	
	    getTouchAction: function() {
	        var direction = this.options.direction;
	        var actions = [];
	        if (direction & DIRECTION_HORIZONTAL) {
	            actions.push(TOUCH_ACTION_PAN_Y);
	        }
	        if (direction & DIRECTION_VERTICAL) {
	            actions.push(TOUCH_ACTION_PAN_X);
	        }
	        return actions;
	    },
	
	    directionTest: function(input) {
	        var options = this.options;
	        var hasMoved = true;
	        var distance = input.distance;
	        var direction = input.direction;
	        var x = input.deltaX;
	        var y = input.deltaY;
	
	        // lock to axis?
	        if (!(direction & options.direction)) {
	            if (options.direction & DIRECTION_HORIZONTAL) {
	                direction = (x === 0) ? DIRECTION_NONE : (x < 0) ? DIRECTION_LEFT : DIRECTION_RIGHT;
	                hasMoved = x != this.pX;
	                distance = Math.abs(input.deltaX);
	            } else {
	                direction = (y === 0) ? DIRECTION_NONE : (y < 0) ? DIRECTION_UP : DIRECTION_DOWN;
	                hasMoved = y != this.pY;
	                distance = Math.abs(input.deltaY);
	            }
	        }
	        input.direction = direction;
	        return hasMoved && distance > options.threshold && direction & options.direction;
	    },
	
	    attrTest: function(input) {
	        return AttrRecognizer.prototype.attrTest.call(this, input) &&
	            (this.state & STATE_BEGAN || (!(this.state & STATE_BEGAN) && this.directionTest(input)));
	    },
	
	    emit: function(input) {
	
	        this.pX = input.deltaX;
	        this.pY = input.deltaY;
	
	        var direction = directionStr(input.direction);
	
	        if (direction) {
	            input.additionalEvent = this.options.event + direction;
	        }
	        this._super.emit.call(this, input);
	    }
	});
	
	/**
	 * Pinch
	 * Recognized when two or more pointers are moving toward (zoom-in) or away from each other (zoom-out).
	 * @constructor
	 * @extends AttrRecognizer
	 */
	function PinchRecognizer() {
	    AttrRecognizer.apply(this, arguments);
	}
	
	inherit(PinchRecognizer, AttrRecognizer, {
	    /**
	     * @namespace
	     * @memberof PinchRecognizer
	     */
	    defaults: {
	        event: 'pinch',
	        threshold: 0,
	        pointers: 2
	    },
	
	    getTouchAction: function() {
	        return [TOUCH_ACTION_NONE];
	    },
	
	    attrTest: function(input) {
	        return this._super.attrTest.call(this, input) &&
	            (Math.abs(input.scale - 1) > this.options.threshold || this.state & STATE_BEGAN);
	    },
	
	    emit: function(input) {
	        if (input.scale !== 1) {
	            var inOut = input.scale < 1 ? 'in' : 'out';
	            input.additionalEvent = this.options.event + inOut;
	        }
	        this._super.emit.call(this, input);
	    }
	});
	
	/**
	 * Press
	 * Recognized when the pointer is down for x ms without any movement.
	 * @constructor
	 * @extends Recognizer
	 */
	function PressRecognizer() {
	    Recognizer.apply(this, arguments);
	
	    this._timer = null;
	    this._input = null;
	}
	
	inherit(PressRecognizer, Recognizer, {
	    /**
	     * @namespace
	     * @memberof PressRecognizer
	     */
	    defaults: {
	        event: 'press',
	        pointers: 1,
	        time: 251, // minimal time of the pointer to be pressed
	        threshold: 9 // a minimal movement is ok, but keep it low
	    },
	
	    getTouchAction: function() {
	        return [TOUCH_ACTION_AUTO];
	    },
	
	    process: function(input) {
	        var options = this.options;
	        var validPointers = input.pointers.length === options.pointers;
	        var validMovement = input.distance < options.threshold;
	        var validTime = input.deltaTime > options.time;
	
	        this._input = input;
	
	        // we only allow little movement
	        // and we've reached an end event, so a tap is possible
	        if (!validMovement || !validPointers || (input.eventType & (INPUT_END | INPUT_CANCEL) && !validTime)) {
	            this.reset();
	        } else if (input.eventType & INPUT_START) {
	            this.reset();
	            this._timer = setTimeoutContext(function() {
	                this.state = STATE_RECOGNIZED;
	                this.tryEmit();
	            }, options.time, this);
	        } else if (input.eventType & INPUT_END) {
	            return STATE_RECOGNIZED;
	        }
	        return STATE_FAILED;
	    },
	
	    reset: function() {
	        clearTimeout(this._timer);
	    },
	
	    emit: function(input) {
	        if (this.state !== STATE_RECOGNIZED) {
	            return;
	        }
	
	        if (input && (input.eventType & INPUT_END)) {
	            this.manager.emit(this.options.event + 'up', input);
	        } else {
	            this._input.timeStamp = now();
	            this.manager.emit(this.options.event, this._input);
	        }
	    }
	});
	
	/**
	 * Rotate
	 * Recognized when two or more pointer are moving in a circular motion.
	 * @constructor
	 * @extends AttrRecognizer
	 */
	function RotateRecognizer() {
	    AttrRecognizer.apply(this, arguments);
	}
	
	inherit(RotateRecognizer, AttrRecognizer, {
	    /**
	     * @namespace
	     * @memberof RotateRecognizer
	     */
	    defaults: {
	        event: 'rotate',
	        threshold: 0,
	        pointers: 2
	    },
	
	    getTouchAction: function() {
	        return [TOUCH_ACTION_NONE];
	    },
	
	    attrTest: function(input) {
	        return this._super.attrTest.call(this, input) &&
	            (Math.abs(input.rotation) > this.options.threshold || this.state & STATE_BEGAN);
	    }
	});
	
	/**
	 * Swipe
	 * Recognized when the pointer is moving fast (velocity), with enough distance in the allowed direction.
	 * @constructor
	 * @extends AttrRecognizer
	 */
	function SwipeRecognizer() {
	    AttrRecognizer.apply(this, arguments);
	}
	
	inherit(SwipeRecognizer, AttrRecognizer, {
	    /**
	     * @namespace
	     * @memberof SwipeRecognizer
	     */
	    defaults: {
	        event: 'swipe',
	        threshold: 10,
	        velocity: 0.3,
	        direction: DIRECTION_HORIZONTAL | DIRECTION_VERTICAL,
	        pointers: 1
	    },
	
	    getTouchAction: function() {
	        return PanRecognizer.prototype.getTouchAction.call(this);
	    },
	
	    attrTest: function(input) {
	        var direction = this.options.direction;
	        var velocity;
	
	        if (direction & (DIRECTION_HORIZONTAL | DIRECTION_VERTICAL)) {
	            velocity = input.overallVelocity;
	        } else if (direction & DIRECTION_HORIZONTAL) {
	            velocity = input.overallVelocityX;
	        } else if (direction & DIRECTION_VERTICAL) {
	            velocity = input.overallVelocityY;
	        }
	
	        return this._super.attrTest.call(this, input) &&
	            direction & input.offsetDirection &&
	            input.distance > this.options.threshold &&
	            input.maxPointers == this.options.pointers &&
	            abs(velocity) > this.options.velocity && input.eventType & INPUT_END;
	    },
	
	    emit: function(input) {
	        var direction = directionStr(input.offsetDirection);
	        if (direction) {
	            this.manager.emit(this.options.event + direction, input);
	        }
	
	        this.manager.emit(this.options.event, input);
	    }
	});
	
	/**
	 * A tap is ecognized when the pointer is doing a small tap/click. Multiple taps are recognized if they occur
	 * between the given interval and position. The delay option can be used to recognize multi-taps without firing
	 * a single tap.
	 *
	 * The eventData from the emitted event contains the property `tapCount`, which contains the amount of
	 * multi-taps being recognized.
	 * @constructor
	 * @extends Recognizer
	 */
	function TapRecognizer() {
	    Recognizer.apply(this, arguments);
	
	    // previous time and center,
	    // used for tap counting
	    this.pTime = false;
	    this.pCenter = false;
	
	    this._timer = null;
	    this._input = null;
	    this.count = 0;
	}
	
	inherit(TapRecognizer, Recognizer, {
	    /**
	     * @namespace
	     * @memberof PinchRecognizer
	     */
	    defaults: {
	        event: 'tap',
	        pointers: 1,
	        taps: 1,
	        interval: 300, // max time between the multi-tap taps
	        time: 250, // max time of the pointer to be down (like finger on the screen)
	        threshold: 9, // a minimal movement is ok, but keep it low
	        posThreshold: 10 // a multi-tap can be a bit off the initial position
	    },
	
	    getTouchAction: function() {
	        return [TOUCH_ACTION_MANIPULATION];
	    },
	
	    process: function(input) {
	        var options = this.options;
	
	        var validPointers = input.pointers.length === options.pointers;
	        var validMovement = input.distance < options.threshold;
	        var validTouchTime = input.deltaTime < options.time;
	
	        this.reset();
	
	        if ((input.eventType & INPUT_START) && (this.count === 0)) {
	            return this.failTimeout();
	        }
	
	        // we only allow little movement
	        // and we've reached an end event, so a tap is possible
	        if (validMovement && validTouchTime && validPointers) {
	            if (input.eventType != INPUT_END) {
	                return this.failTimeout();
	            }
	
	            var validInterval = this.pTime ? (input.timeStamp - this.pTime < options.interval) : true;
	            var validMultiTap = !this.pCenter || getDistance(this.pCenter, input.center) < options.posThreshold;
	
	            this.pTime = input.timeStamp;
	            this.pCenter = input.center;
	
	            if (!validMultiTap || !validInterval) {
	                this.count = 1;
	            } else {
	                this.count += 1;
	            }
	
	            this._input = input;
	
	            // if tap count matches we have recognized it,
	            // else it has began recognizing...
	            var tapCount = this.count % options.taps;
	            if (tapCount === 0) {
	                // no failing requirements, immediately trigger the tap event
	                // or wait as long as the multitap interval to trigger
	                if (!this.hasRequireFailures()) {
	                    return STATE_RECOGNIZED;
	                } else {
	                    this._timer = setTimeoutContext(function() {
	                        this.state = STATE_RECOGNIZED;
	                        this.tryEmit();
	                    }, options.interval, this);
	                    return STATE_BEGAN;
	                }
	            }
	        }
	        return STATE_FAILED;
	    },
	
	    failTimeout: function() {
	        this._timer = setTimeoutContext(function() {
	            this.state = STATE_FAILED;
	        }, this.options.interval, this);
	        return STATE_FAILED;
	    },
	
	    reset: function() {
	        clearTimeout(this._timer);
	    },
	
	    emit: function() {
	        if (this.state == STATE_RECOGNIZED) {
	            this._input.tapCount = this.count;
	            this.manager.emit(this.options.event, this._input);
	        }
	    }
	});
	
	/**
	 * Simple way to create a manager with a default set of recognizers.
	 * @param {HTMLElement} element
	 * @param {Object} [options]
	 * @constructor
	 */
	function Hammer(element, options) {
	    options = options || {};
	    options.recognizers = ifUndefined(options.recognizers, Hammer.defaults.preset);
	    return new Manager(element, options);
	}
	
	/**
	 * @const {string}
	 */
	Hammer.VERSION = '2.0.6';
	
	/**
	 * default settings
	 * @namespace
	 */
	Hammer.defaults = {
	    /**
	     * set if DOM events are being triggered.
	     * But this is slower and unused by simple implementations, so disabled by default.
	     * @type {Boolean}
	     * @default false
	     */
	    domEvents: false,
	
	    /**
	     * The value for the touchAction property/fallback.
	     * When set to `compute` it will magically set the correct value based on the added recognizers.
	     * @type {String}
	     * @default compute
	     */
	    touchAction: TOUCH_ACTION_COMPUTE,
	
	    /**
	     * @type {Boolean}
	     * @default true
	     */
	    enable: true,
	
	    /**
	     * EXPERIMENTAL FEATURE -- can be removed/changed
	     * Change the parent input target element.
	     * If Null, then it is being set the to main element.
	     * @type {Null|EventTarget}
	     * @default null
	     */
	    inputTarget: null,
	
	    /**
	     * force an input class
	     * @type {Null|Function}
	     * @default null
	     */
	    inputClass: null,
	
	    /**
	     * Default recognizer setup when calling `Hammer()`
	     * When creating a new Manager these will be skipped.
	     * @type {Array}
	     */
	    preset: [
	        // RecognizerClass, options, [recognizeWith, ...], [requireFailure, ...]
	        [RotateRecognizer, {enable: false}],
	        [PinchRecognizer, {enable: false}, ['rotate']],
	        [SwipeRecognizer, {direction: DIRECTION_HORIZONTAL}],
	        [PanRecognizer, {direction: DIRECTION_HORIZONTAL}, ['swipe']],
	        [TapRecognizer],
	        [TapRecognizer, {event: 'doubletap', taps: 2}, ['tap']],
	        [PressRecognizer]
	    ],
	
	    /**
	     * Some CSS properties can be used to improve the working of Hammer.
	     * Add them to this method and they will be set when creating a new Manager.
	     * @namespace
	     */
	    cssProps: {
	        /**
	         * Disables text selection to improve the dragging gesture. Mainly for desktop browsers.
	         * @type {String}
	         * @default 'none'
	         */
	        userSelect: 'none',
	
	        /**
	         * Disable the Windows Phone grippers when pressing an element.
	         * @type {String}
	         * @default 'none'
	         */
	        touchSelect: 'none',
	
	        /**
	         * Disables the default callout shown when you touch and hold a touch target.
	         * On iOS, when you touch and hold a touch target such as a link, Safari displays
	         * a callout containing information about the link. This property allows you to disable that callout.
	         * @type {String}
	         * @default 'none'
	         */
	        touchCallout: 'none',
	
	        /**
	         * Specifies whether zooming is enabled. Used by IE10>
	         * @type {String}
	         * @default 'none'
	         */
	        contentZooming: 'none',
	
	        /**
	         * Specifies that an entire element should be draggable instead of its contents. Mainly for desktop browsers.
	         * @type {String}
	         * @default 'none'
	         */
	        userDrag: 'none',
	
	        /**
	         * Overrides the highlight color shown when the user taps a link or a JavaScript
	         * clickable element in iOS. This property obeys the alpha value, if specified.
	         * @type {String}
	         * @default 'rgba(0,0,0,0)'
	         */
	        tapHighlightColor: 'rgba(0,0,0,0)'
	    }
	};
	
	var STOP = 1;
	var FORCED_STOP = 2;
	
	/**
	 * Manager
	 * @param {HTMLElement} element
	 * @param {Object} [options]
	 * @constructor
	 */
	function Manager(element, options) {
	    this.options = assign({}, Hammer.defaults, options || {});
	
	    this.options.inputTarget = this.options.inputTarget || element;
	
	    this.handlers = {};
	    this.session = {};
	    this.recognizers = [];
	
	    this.element = element;
	    this.input = createInputInstance(this);
	    this.touchAction = new TouchAction(this, this.options.touchAction);
	
	    toggleCssProps(this, true);
	
	    each(this.options.recognizers, function(item) {
	        var recognizer = this.add(new (item[0])(item[1]));
	        item[2] && recognizer.recognizeWith(item[2]);
	        item[3] && recognizer.requireFailure(item[3]);
	    }, this);
	}
	
	Manager.prototype = {
	    /**
	     * set options
	     * @param {Object} options
	     * @returns {Manager}
	     */
	    set: function(options) {
	        assign(this.options, options);
	
	        // Options that need a little more setup
	        if (options.touchAction) {
	            this.touchAction.update();
	        }
	        if (options.inputTarget) {
	            // Clean up existing event listeners and reinitialize
	            this.input.destroy();
	            this.input.target = options.inputTarget;
	            this.input.init();
	        }
	        return this;
	    },
	
	    /**
	     * stop recognizing for this session.
	     * This session will be discarded, when a new [input]start event is fired.
	     * When forced, the recognizer cycle is stopped immediately.
	     * @param {Boolean} [force]
	     */
	    stop: function(force) {
	        this.session.stopped = force ? FORCED_STOP : STOP;
	    },
	
	    /**
	     * run the recognizers!
	     * called by the inputHandler function on every movement of the pointers (touches)
	     * it walks through all the recognizers and tries to detect the gesture that is being made
	     * @param {Object} inputData
	     */
	    recognize: function(inputData) {
	        var session = this.session;
	        if (session.stopped) {
	            return;
	        }
	
	        // run the touch-action polyfill
	        this.touchAction.preventDefaults(inputData);
	
	        var recognizer;
	        var recognizers = this.recognizers;
	
	        // this holds the recognizer that is being recognized.
	        // so the recognizer's state needs to be BEGAN, CHANGED, ENDED or RECOGNIZED
	        // if no recognizer is detecting a thing, it is set to `null`
	        var curRecognizer = session.curRecognizer;
	
	        // reset when the last recognizer is recognized
	        // or when we're in a new session
	        if (!curRecognizer || (curRecognizer && curRecognizer.state & STATE_RECOGNIZED)) {
	            curRecognizer = session.curRecognizer = null;
	        }
	
	        var i = 0;
	        while (i < recognizers.length) {
	            recognizer = recognizers[i];
	
	            // find out if we are allowed try to recognize the input for this one.
	            // 1.   allow if the session is NOT forced stopped (see the .stop() method)
	            // 2.   allow if we still haven't recognized a gesture in this session, or the this recognizer is the one
	            //      that is being recognized.
	            // 3.   allow if the recognizer is allowed to run simultaneous with the current recognized recognizer.
	            //      this can be setup with the `recognizeWith()` method on the recognizer.
	            if (session.stopped !== FORCED_STOP && ( // 1
	                    !curRecognizer || recognizer == curRecognizer || // 2
	                    recognizer.canRecognizeWith(curRecognizer))) { // 3
	                recognizer.recognize(inputData);
	            } else {
	                recognizer.reset();
	            }
	
	            // if the recognizer has been recognizing the input as a valid gesture, we want to store this one as the
	            // current active recognizer. but only if we don't already have an active recognizer
	            if (!curRecognizer && recognizer.state & (STATE_BEGAN | STATE_CHANGED | STATE_ENDED)) {
	                curRecognizer = session.curRecognizer = recognizer;
	            }
	            i++;
	        }
	    },
	
	    /**
	     * get a recognizer by its event name.
	     * @param {Recognizer|String} recognizer
	     * @returns {Recognizer|Null}
	     */
	    get: function(recognizer) {
	        if (recognizer instanceof Recognizer) {
	            return recognizer;
	        }
	
	        var recognizers = this.recognizers;
	        for (var i = 0; i < recognizers.length; i++) {
	            if (recognizers[i].options.event == recognizer) {
	                return recognizers[i];
	            }
	        }
	        return null;
	    },
	
	    /**
	     * add a recognizer to the manager
	     * existing recognizers with the same event name will be removed
	     * @param {Recognizer} recognizer
	     * @returns {Recognizer|Manager}
	     */
	    add: function(recognizer) {
	        if (invokeArrayArg(recognizer, 'add', this)) {
	            return this;
	        }
	
	        // remove existing
	        var existing = this.get(recognizer.options.event);
	        if (existing) {
	            this.remove(existing);
	        }
	
	        this.recognizers.push(recognizer);
	        recognizer.manager = this;
	
	        this.touchAction.update();
	        return recognizer;
	    },
	
	    /**
	     * remove a recognizer by name or instance
	     * @param {Recognizer|String} recognizer
	     * @returns {Manager}
	     */
	    remove: function(recognizer) {
	        if (invokeArrayArg(recognizer, 'remove', this)) {
	            return this;
	        }
	
	        recognizer = this.get(recognizer);
	
	        // let's make sure this recognizer exists
	        if (recognizer) {
	            var recognizers = this.recognizers;
	            var index = inArray(recognizers, recognizer);
	
	            if (index !== -1) {
	                recognizers.splice(index, 1);
	                this.touchAction.update();
	            }
	        }
	
	        return this;
	    },
	
	    /**
	     * bind event
	     * @param {String} events
	     * @param {Function} handler
	     * @returns {EventEmitter} this
	     */
	    on: function(events, handler) {
	        var handlers = this.handlers;
	        each(splitStr(events), function(event) {
	            handlers[event] = handlers[event] || [];
	            handlers[event].push(handler);
	        });
	        return this;
	    },
	
	    /**
	     * unbind event, leave emit blank to remove all handlers
	     * @param {String} events
	     * @param {Function} [handler]
	     * @returns {EventEmitter} this
	     */
	    off: function(events, handler) {
	        var handlers = this.handlers;
	        each(splitStr(events), function(event) {
	            if (!handler) {
	                delete handlers[event];
	            } else {
	                handlers[event] && handlers[event].splice(inArray(handlers[event], handler), 1);
	            }
	        });
	        return this;
	    },
	
	    /**
	     * emit event to the listeners
	     * @param {String} event
	     * @param {Object} data
	     */
	    emit: function(event, data) {
	        // we also want to trigger dom events
	        if (this.options.domEvents) {
	            triggerDomEvent(event, data);
	        }
	
	        // no handlers, so skip it all
	        var handlers = this.handlers[event] && this.handlers[event].slice();
	        if (!handlers || !handlers.length) {
	            return;
	        }
	
	        data.type = event;
	        data.preventDefault = function() {
	            data.srcEvent.preventDefault();
	        };
	
	        var i = 0;
	        while (i < handlers.length) {
	            handlers[i](data);
	            i++;
	        }
	    },
	
	    /**
	     * destroy the manager and unbinds all events
	     * it doesn't unbind dom events, that is the user own responsibility
	     */
	    destroy: function() {
	        this.element && toggleCssProps(this, false);
	
	        this.handlers = {};
	        this.session = {};
	        this.input.destroy();
	        this.element = null;
	    }
	};
	
	/**
	 * add/remove the css properties as defined in manager.options.cssProps
	 * @param {Manager} manager
	 * @param {Boolean} add
	 */
	function toggleCssProps(manager, add) {
	    var element = manager.element;
	    if (!element.style) {
	        return;
	    }
	    each(manager.options.cssProps, function(value, name) {
	        element.style[prefixed(element.style, name)] = add ? value : '';
	    });
	}
	
	/**
	 * trigger dom event
	 * @param {String} event
	 * @param {Object} data
	 */
	function triggerDomEvent(event, data) {
	    var gestureEvent = document.createEvent('Event');
	    gestureEvent.initEvent(event, true, true);
	    gestureEvent.gesture = data;
	    data.target.dispatchEvent(gestureEvent);
	}
	
	assign(Hammer, {
	    INPUT_START: INPUT_START,
	    INPUT_MOVE: INPUT_MOVE,
	    INPUT_END: INPUT_END,
	    INPUT_CANCEL: INPUT_CANCEL,
	
	    STATE_POSSIBLE: STATE_POSSIBLE,
	    STATE_BEGAN: STATE_BEGAN,
	    STATE_CHANGED: STATE_CHANGED,
	    STATE_ENDED: STATE_ENDED,
	    STATE_RECOGNIZED: STATE_RECOGNIZED,
	    STATE_CANCELLED: STATE_CANCELLED,
	    STATE_FAILED: STATE_FAILED,
	
	    DIRECTION_NONE: DIRECTION_NONE,
	    DIRECTION_LEFT: DIRECTION_LEFT,
	    DIRECTION_RIGHT: DIRECTION_RIGHT,
	    DIRECTION_UP: DIRECTION_UP,
	    DIRECTION_DOWN: DIRECTION_DOWN,
	    DIRECTION_HORIZONTAL: DIRECTION_HORIZONTAL,
	    DIRECTION_VERTICAL: DIRECTION_VERTICAL,
	    DIRECTION_ALL: DIRECTION_ALL,
	
	    Manager: Manager,
	    Input: Input,
	    TouchAction: TouchAction,
	
	    TouchInput: TouchInput,
	    MouseInput: MouseInput,
	    PointerEventInput: PointerEventInput,
	    TouchMouseInput: TouchMouseInput,
	    SingleTouchInput: SingleTouchInput,
	
	    Recognizer: Recognizer,
	    AttrRecognizer: AttrRecognizer,
	    Tap: TapRecognizer,
	    Pan: PanRecognizer,
	    Swipe: SwipeRecognizer,
	    Pinch: PinchRecognizer,
	    Rotate: RotateRecognizer,
	    Press: PressRecognizer,
	
	    on: addEventListeners,
	    off: removeEventListeners,
	    each: each,
	    merge: merge,
	    extend: extend,
	    assign: assign,
	    inherit: inherit,
	    bindFn: bindFn,
	    prefixed: prefixed
	});
	
	// this prevents errors when Hammer is loaded in the presence of an AMD
	//  style loader but by script tag, not by the loader.
	var freeGlobal = (typeof window !== 'undefined' ? window : (typeof self !== 'undefined' ? self : {})); // jshint ignore:line
	freeGlobal.Hammer = Hammer;
	
	if (true) {
	    !(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
	        return Hammer;
	    }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else if (typeof module != 'undefined' && module.exports) {
	    module.exports = Hammer;
	} else {
	    window[exportName] = Hammer;
	}
	
	})(window, document, 'Hammer');


/***/ },
/* 107 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Install plugin.
	 */
	
	function install(Vue) {
	
	    var _ = __webpack_require__(108);
	
	    _.config = Vue.config;
	    _.warning = Vue.util.warn;
	    _.nextTick = Vue.util.nextTick;
	
	    Vue.url = __webpack_require__(109);
	    Vue.http = __webpack_require__(115);
	    Vue.resource = __webpack_require__(130);
	    Vue.Promise = __webpack_require__(117);
	
	    Object.defineProperties(Vue.prototype, {
	
	        $url: {
	            get: function () {
	                return _.options(Vue.url, this, this.$options.url);
	            }
	        },
	
	        $http: {
	            get: function () {
	                return _.options(Vue.http, this, this.$options.http);
	            }
	        },
	
	        $resource: {
	            get: function () {
	                return Vue.resource.bind(this);
	            }
	        },
	
	        $promise: {
	            get: function () {
	                return function (executor) {
	                    return new Vue.Promise(executor, this);
	                }.bind(this);
	            }
	        }
	
	    });
	}
	
	if (window.Vue) {
	    Vue.use(install);
	}
	
	module.exports = install;


/***/ },
/* 108 */
/***/ function(module, exports) {

	/**
	 * Utility functions.
	 */
	
	var _ = exports, array = [], console = window.console;
	
	_.warn = function (msg) {
	    if (console && _.warning && (!_.config.silent || _.config.debug)) {
	        console.warn('[VueResource warn]: ' + msg);
	    }
	};
	
	_.error = function (msg) {
	    if (console) {
	        console.error(msg);
	    }
	};
	
	_.trim = function (str) {
	    return str.replace(/^\s*|\s*$/g, '');
	};
	
	_.toLower = function (str) {
	    return str ? str.toLowerCase() : '';
	};
	
	_.isArray = Array.isArray;
	
	_.isString = function (val) {
	    return typeof val === 'string';
	};
	
	_.isFunction = function (val) {
	    return typeof val === 'function';
	};
	
	_.isObject = function (obj) {
	    return obj !== null && typeof obj === 'object';
	};
	
	_.isPlainObject = function (obj) {
	    return _.isObject(obj) && Object.getPrototypeOf(obj) == Object.prototype;
	};
	
	_.options = function (fn, obj, options) {
	
	    options = options || {};
	
	    if (_.isFunction(options)) {
	        options = options.call(obj);
	    }
	
	    return _.merge(fn.bind({$vm: obj, $options: options}), fn, {$options: options});
	};
	
	_.each = function (obj, iterator) {
	
	    var i, key;
	
	    if (typeof obj.length == 'number') {
	        for (i = 0; i < obj.length; i++) {
	            iterator.call(obj[i], obj[i], i);
	        }
	    } else if (_.isObject(obj)) {
	        for (key in obj) {
	            if (obj.hasOwnProperty(key)) {
	                iterator.call(obj[key], obj[key], key);
	            }
	        }
	    }
	
	    return obj;
	};
	
	_.defaults = function (target, source) {
	
	    for (var key in source) {
	        if (target[key] === undefined) {
	            target[key] = source[key];
	        }
	    }
	
	    return target;
	};
	
	_.extend = function (target) {
	
	    var args = array.slice.call(arguments, 1);
	
	    args.forEach(function (arg) {
	        merge(target, arg);
	    });
	
	    return target;
	};
	
	_.merge = function (target) {
	
	    var args = array.slice.call(arguments, 1);
	
	    args.forEach(function (arg) {
	        merge(target, arg, true);
	    });
	
	    return target;
	};
	
	function merge(target, source, deep) {
	    for (var key in source) {
	        if (deep && (_.isPlainObject(source[key]) || _.isArray(source[key]))) {
	            if (_.isPlainObject(source[key]) && !_.isPlainObject(target[key])) {
	                target[key] = {};
	            }
	            if (_.isArray(source[key]) && !_.isArray(target[key])) {
	                target[key] = [];
	            }
	            merge(target[key], source[key], deep);
	        } else if (source[key] !== undefined) {
	            target[key] = source[key];
	        }
	    }
	}


/***/ },
/* 109 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Service for URL templating.
	 */
	
	var _ = __webpack_require__(108);
	var ie = document.documentMode;
	var el = document.createElement('a');
	
	function Url(url, params) {
	
	    var options = url, transform;
	
	    if (_.isString(url)) {
	        options = {url: url, params: params};
	    }
	
	    options = _.merge({}, Url.options, this.$options, options);
	
	    Url.transforms.forEach(function (handler) {
	        transform = factory(handler, transform, this.$vm);
	    }, this);
	
	    return transform(options);
	};
	
	/**
	 * Url options.
	 */
	
	Url.options = {
	    url: '',
	    root: null,
	    params: {}
	};
	
	/**
	 * Url transforms.
	 */
	
	Url.transforms = [
	    __webpack_require__(110),
	    __webpack_require__(112),
	    __webpack_require__(113),
	    __webpack_require__(114)
	];
	
	/**
	 * Encodes a Url parameter string.
	 *
	 * @param {Object} obj
	 */
	
	Url.params = function (obj) {
	
	    var params = [], escape = encodeURIComponent;
	
	    params.add = function (key, value) {
	
	        if (_.isFunction(value)) {
	            value = value();
	        }
	
	        if (value === null) {
	            value = '';
	        }
	
	        this.push(escape(key) + '=' + escape(value));
	    };
	
	    serialize(params, obj);
	
	    return params.join('&').replace(/%20/g, '+');
	};
	
	/**
	 * Parse a URL and return its components.
	 *
	 * @param {String} url
	 */
	
	Url.parse = function (url) {
	
	    if (ie) {
	        el.href = url;
	        url = el.href;
	    }
	
	    el.href = url;
	
	    return {
	        href: el.href,
	        protocol: el.protocol ? el.protocol.replace(/:$/, '') : '',
	        port: el.port,
	        host: el.host,
	        hostname: el.hostname,
	        pathname: el.pathname.charAt(0) === '/' ? el.pathname : '/' + el.pathname,
	        search: el.search ? el.search.replace(/^\?/, '') : '',
	        hash: el.hash ? el.hash.replace(/^#/, '') : ''
	    };
	};
	
	function factory(handler, next, vm) {
	    return function (options) {
	        return handler.call(vm, options, next);
	    };
	}
	
	function serialize(params, obj, scope) {
	
	    var array = _.isArray(obj), plain = _.isPlainObject(obj), hash;
	
	    _.each(obj, function (value, key) {
	
	        hash = _.isObject(value) || _.isArray(value);
	
	        if (scope) {
	            key = scope + '[' + (plain || hash ? key : '') + ']';
	        }
	
	        if (!scope && array) {
	            params.add(value.name, value.value);
	        } else if (hash) {
	            serialize(params, value, key);
	        } else {
	            params.add(key, value);
	        }
	    });
	}
	
	module.exports = _.url = Url;


/***/ },
/* 110 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * URL Template (RFC 6570) Transform.
	 */
	
	var UrlTemplate = __webpack_require__(111);
	
	module.exports = function (options) {
	
	    var variables = [], url = UrlTemplate.expand(options.url, options.params, variables);
	
	    variables.forEach(function (key) {
	        delete options.params[key];
	    });
	
	    return url;
	};


/***/ },
/* 111 */
/***/ function(module, exports) {

	/**
	 * URL Template v2.0.6 (https://github.com/bramstein/url-template)
	 */
	
	exports.expand = function (url, params, variables) {
	
	    var tmpl = this.parse(url), expanded = tmpl.expand(params);
	
	    if (variables) {
	        variables.push.apply(variables, tmpl.vars);
	    }
	
	    return expanded;
	};
	
	exports.parse = function (template) {
	
	    var operators = ['+', '#', '.', '/', ';', '?', '&'], variables = [];
	
	    return {
	        vars: variables,
	        expand: function (context) {
	            return template.replace(/\{([^\{\}]+)\}|([^\{\}]+)/g, function (_, expression, literal) {
	                if (expression) {
	
	                    var operator = null, values = [];
	
	                    if (operators.indexOf(expression.charAt(0)) !== -1) {
	                        operator = expression.charAt(0);
	                        expression = expression.substr(1);
	                    }
	
	                    expression.split(/,/g).forEach(function (variable) {
	                        var tmp = /([^:\*]*)(?::(\d+)|(\*))?/.exec(variable);
	                        values.push.apply(values, exports.getValues(context, operator, tmp[1], tmp[2] || tmp[3]));
	                        variables.push(tmp[1]);
	                    });
	
	                    if (operator && operator !== '+') {
	
	                        var separator = ',';
	
	                        if (operator === '?') {
	                            separator = '&';
	                        } else if (operator !== '#') {
	                            separator = operator;
	                        }
	
	                        return (values.length !== 0 ? operator : '') + values.join(separator);
	                    } else {
	                        return values.join(',');
	                    }
	
	                } else {
	                    return exports.encodeReserved(literal);
	                }
	            });
	        }
	    };
	};
	
	exports.getValues = function (context, operator, key, modifier) {
	
	    var value = context[key], result = [];
	
	    if (this.isDefined(value) && value !== '') {
	        if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
	            value = value.toString();
	
	            if (modifier && modifier !== '*') {
	                value = value.substring(0, parseInt(modifier, 10));
	            }
	
	            result.push(this.encodeValue(operator, value, this.isKeyOperator(operator) ? key : null));
	        } else {
	            if (modifier === '*') {
	                if (Array.isArray(value)) {
	                    value.filter(this.isDefined).forEach(function (value) {
	                        result.push(this.encodeValue(operator, value, this.isKeyOperator(operator) ? key : null));
	                    }, this);
	                } else {
	                    Object.keys(value).forEach(function (k) {
	                        if (this.isDefined(value[k])) {
	                            result.push(this.encodeValue(operator, value[k], k));
	                        }
	                    }, this);
	                }
	            } else {
	                var tmp = [];
	
	                if (Array.isArray(value)) {
	                    value.filter(this.isDefined).forEach(function (value) {
	                        tmp.push(this.encodeValue(operator, value));
	                    }, this);
	                } else {
	                    Object.keys(value).forEach(function (k) {
	                        if (this.isDefined(value[k])) {
	                            tmp.push(encodeURIComponent(k));
	                            tmp.push(this.encodeValue(operator, value[k].toString()));
	                        }
	                    }, this);
	                }
	
	                if (this.isKeyOperator(operator)) {
	                    result.push(encodeURIComponent(key) + '=' + tmp.join(','));
	                } else if (tmp.length !== 0) {
	                    result.push(tmp.join(','));
	                }
	            }
	        }
	    } else {
	        if (operator === ';') {
	            result.push(encodeURIComponent(key));
	        } else if (value === '' && (operator === '&' || operator === '?')) {
	            result.push(encodeURIComponent(key) + '=');
	        } else if (value === '') {
	            result.push('');
	        }
	    }
	
	    return result;
	};
	
	exports.isDefined = function (value) {
	    return value !== undefined && value !== null;
	};
	
	exports.isKeyOperator = function (operator) {
	    return operator === ';' || operator === '&' || operator === '?';
	};
	
	exports.encodeValue = function (operator, value, key) {
	
	    value = (operator === '+' || operator === '#') ? this.encodeReserved(value) : encodeURIComponent(value);
	
	    if (key) {
	        return encodeURIComponent(key) + '=' + value;
	    } else {
	        return value;
	    }
	};
	
	exports.encodeReserved = function (str) {
	    return str.split(/(%[0-9A-Fa-f]{2})/g).map(function (part) {
	        if (!/%[0-9A-Fa-f]/.test(part)) {
	            part = encodeURI(part);
	        }
	        return part;
	    }).join('');
	};


/***/ },
/* 112 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Legacy Transform.
	 */
	
	var _ = __webpack_require__(108);
	
	module.exports = function (options, next) {
	
	    var variables = [], url = next(options);
	
	    url = url.replace(/(\/?):([a-z]\w*)/gi, function (match, slash, name) {
	
	        _.warn('The `:' + name + '` parameter syntax has been deprecated. Use the `{' + name + '}` syntax instead.');
	
	        if (options.params[name]) {
	            variables.push(name);
	            return slash + encodeUriSegment(options.params[name]);
	        }
	
	        return '';
	    });
	
	    variables.forEach(function (key) {
	        delete options.params[key];
	    });
	
	    return url;
	};
	
	function encodeUriSegment(value) {
	
	    return encodeUriQuery(value, true).
	        replace(/%26/gi, '&').
	        replace(/%3D/gi, '=').
	        replace(/%2B/gi, '+');
	}
	
	function encodeUriQuery(value, spaces) {
	
	    return encodeURIComponent(value).
	        replace(/%40/gi, '@').
	        replace(/%3A/gi, ':').
	        replace(/%24/g, '$').
	        replace(/%2C/gi, ',').
	        replace(/%20/g, (spaces ? '%20' : '+'));
	}


/***/ },
/* 113 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Query Parameter Transform.
	 */
	
	var _ = __webpack_require__(108);
	
	module.exports = function (options, next) {
	
	    var urlParams = Object.keys(_.url.options.params), query = {}, url = next(options);
	
	   _.each(options.params, function (value, key) {
	        if (urlParams.indexOf(key) === -1) {
	            query[key] = value;
	        }
	    });
	
	    query = _.url.params(query);
	
	    if (query) {
	        url += (url.indexOf('?') == -1 ? '?' : '&') + query;
	    }
	
	    return url;
	};


/***/ },
/* 114 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Root Prefix Transform.
	 */
	
	var _ = __webpack_require__(108);
	
	module.exports = function (options, next) {
	
	    var url = next(options);
	
	    if (_.isString(options.root) && !url.match(/^(https?:)?\//)) {
	        url = options.root + '/' + url;
	    }
	
	    return url;
	};


/***/ },
/* 115 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Service for sending network requests.
	 */
	
	var _ = __webpack_require__(108);
	var Client = __webpack_require__(116);
	var Promise = __webpack_require__(117);
	var interceptor = __webpack_require__(120);
	var jsonType = {'Content-Type': 'application/json'};
	
	function Http(url, options) {
	
	    var client = Client, request, promise;
	
	    Http.interceptors.forEach(function (handler) {
	        client = interceptor(handler, this.$vm)(client);
	    }, this);
	
	    options = _.isObject(url) ? url : _.extend({url: url}, options);
	    request = _.merge({}, Http.options, this.$options, options);
	    promise = client(request).bind(this.$vm).then(function (response) {
	
	        return response.ok ? response : Promise.reject(response);
	
	    }, function (response) {
	
	        if (response instanceof Error) {
	            _.error(response);
	        }
	
	        return Promise.reject(response);
	    });
	
	    if (request.success) {
	        promise.success(request.success);
	    }
	
	    if (request.error) {
	        promise.error(request.error);
	    }
	
	    return promise;
	}
	
	Http.options = {
	    method: 'get',
	    data: '',
	    params: {},
	    headers: {},
	    xhr: null,
	    jsonp: 'callback',
	    beforeSend: null,
	    crossOrigin: null,
	    emulateHTTP: false,
	    emulateJSON: false,
	    timeout: 0
	};
	
	Http.interceptors = [
	    __webpack_require__(121),
	    __webpack_require__(122),
	    __webpack_require__(123),
	    __webpack_require__(125),
	    __webpack_require__(126),
	    __webpack_require__(127),
	    __webpack_require__(128)
	];
	
	Http.headers = {
	    put: jsonType,
	    post: jsonType,
	    patch: jsonType,
	    delete: jsonType,
	    common: {'Accept': 'application/json, text/plain, */*'},
	    custom: {'X-Requested-With': 'XMLHttpRequest'}
	};
	
	['get', 'put', 'post', 'patch', 'delete', 'jsonp'].forEach(function (method) {
	
	    Http[method] = function (url, data, success, options) {
	
	        if (_.isFunction(data)) {
	            options = success;
	            success = data;
	            data = undefined;
	        }
	
	        if (_.isObject(success)) {
	            options = success;
	            success = undefined;
	        }
	
	        return this(url, _.extend({method: method, data: data, success: success}, options));
	    };
	});
	
	module.exports = _.http = Http;


/***/ },
/* 116 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Base client.
	 */
	
	var _ = __webpack_require__(108);
	var Promise = __webpack_require__(117);
	var xhrClient = __webpack_require__(119);
	
	module.exports = function (request) {
	
	    var response = (request.client || xhrClient)(request);
	
	    return Promise.resolve(response).then(function (response) {
	
	        if (response.headers) {
	
	            var headers = parseHeaders(response.headers);
	
	            response.headers = function (name) {
	
	                if (name) {
	                    return headers[_.toLower(name)];
	                }
	
	                return headers;
	            };
	
	        }
	
	        response.ok = response.status >= 200 && response.status < 300;
	
	        return response;
	    });
	
	};
	
	function parseHeaders(str) {
	
	    var headers = {}, value, name, i;
	
	    if (_.isString(str)) {
	        _.each(str.split('\n'), function (row) {
	
	            i = row.indexOf(':');
	            name = _.trim(_.toLower(row.slice(0, i)));
	            value = _.trim(row.slice(i + 1));
	
	            if (headers[name]) {
	
	                if (_.isArray(headers[name])) {
	                    headers[name].push(value);
	                } else {
	                    headers[name] = [headers[name], value];
	                }
	
	            } else {
	
	                headers[name] = value;
	            }
	
	        });
	    }
	
	    return headers;
	}


/***/ },
/* 117 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Promise adapter.
	 */
	
	var _ = __webpack_require__(108);
	var PromiseObj = window.Promise || __webpack_require__(118);
	
	function Promise(executor, context) {
	
	    if (executor instanceof PromiseObj) {
	        this.promise = executor;
	    } else {
	        this.promise = new PromiseObj(executor.bind(context));
	    }
	
	    this.context = context;
	}
	
	Promise.all = function (iterable, context) {
	    return new Promise(PromiseObj.all(iterable), context);
	};
	
	Promise.resolve = function (value, context) {
	    return new Promise(PromiseObj.resolve(value), context);
	};
	
	Promise.reject = function (reason, context) {
	    return new Promise(PromiseObj.reject(reason), context);
	};
	
	Promise.race = function (iterable, context) {
	    return new Promise(PromiseObj.race(iterable), context);
	};
	
	var p = Promise.prototype;
	
	p.bind = function (context) {
	    this.context = context;
	    return this;
	};
	
	p.then = function (fulfilled, rejected) {
	
	    if (fulfilled && fulfilled.bind && this.context) {
	        fulfilled = fulfilled.bind(this.context);
	    }
	
	    if (rejected && rejected.bind && this.context) {
	        rejected = rejected.bind(this.context);
	    }
	
	    this.promise = this.promise.then(fulfilled, rejected);
	
	    return this;
	};
	
	p.catch = function (rejected) {
	
	    if (rejected && rejected.bind && this.context) {
	        rejected = rejected.bind(this.context);
	    }
	
	    this.promise = this.promise.catch(rejected);
	
	    return this;
	};
	
	p.finally = function (callback) {
	
	    return this.then(function (value) {
	            callback.call(this);
	            return value;
	        }, function (reason) {
	            callback.call(this);
	            return PromiseObj.reject(reason);
	        }
	    );
	};
	
	p.success = function (callback) {
	
	    _.warn('The `success` method has been deprecated. Use the `then` method instead.');
	
	    return this.then(function (response) {
	        return callback.call(this, response.data, response.status, response) || response;
	    });
	};
	
	p.error = function (callback) {
	
	    _.warn('The `error` method has been deprecated. Use the `catch` method instead.');
	
	    return this.catch(function (response) {
	        return callback.call(this, response.data, response.status, response) || response;
	    });
	};
	
	p.always = function (callback) {
	
	    _.warn('The `always` method has been deprecated. Use the `finally` method instead.');
	
	    var cb = function (response) {
	        return callback.call(this, response.data, response.status, response) || response;
	    };
	
	    return this.then(cb, cb);
	};
	
	module.exports = Promise;


/***/ },
/* 118 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Promises/A+ polyfill v1.1.4 (https://github.com/bramstein/promis)
	 */
	
	var _ = __webpack_require__(108);
	
	var RESOLVED = 0;
	var REJECTED = 1;
	var PENDING  = 2;
	
	function Promise(executor) {
	
	    this.state = PENDING;
	    this.value = undefined;
	    this.deferred = [];
	
	    var promise = this;
	
	    try {
	        executor(function (x) {
	            promise.resolve(x);
	        }, function (r) {
	            promise.reject(r);
	        });
	    } catch (e) {
	        promise.reject(e);
	    }
	}
	
	Promise.reject = function (r) {
	    return new Promise(function (resolve, reject) {
	        reject(r);
	    });
	};
	
	Promise.resolve = function (x) {
	    return new Promise(function (resolve, reject) {
	        resolve(x);
	    });
	};
	
	Promise.all = function all(iterable) {
	    return new Promise(function (resolve, reject) {
	        var count = 0, result = [];
	
	        if (iterable.length === 0) {
	            resolve(result);
	        }
	
	        function resolver(i) {
	            return function (x) {
	                result[i] = x;
	                count += 1;
	
	                if (count === iterable.length) {
	                    resolve(result);
	                }
	            };
	        }
	
	        for (var i = 0; i < iterable.length; i += 1) {
	            Promise.resolve(iterable[i]).then(resolver(i), reject);
	        }
	    });
	};
	
	Promise.race = function race(iterable) {
	    return new Promise(function (resolve, reject) {
	        for (var i = 0; i < iterable.length; i += 1) {
	            Promise.resolve(iterable[i]).then(resolve, reject);
	        }
	    });
	};
	
	var p = Promise.prototype;
	
	p.resolve = function resolve(x) {
	    var promise = this;
	
	    if (promise.state === PENDING) {
	        if (x === promise) {
	            throw new TypeError('Promise settled with itself.');
	        }
	
	        var called = false;
	
	        try {
	            var then = x && x['then'];
	
	            if (x !== null && typeof x === 'object' && typeof then === 'function') {
	                then.call(x, function (x) {
	                    if (!called) {
	                        promise.resolve(x);
	                    }
	                    called = true;
	
	                }, function (r) {
	                    if (!called) {
	                        promise.reject(r);
	                    }
	                    called = true;
	                });
	                return;
	            }
	        } catch (e) {
	            if (!called) {
	                promise.reject(e);
	            }
	            return;
	        }
	
	        promise.state = RESOLVED;
	        promise.value = x;
	        promise.notify();
	    }
	};
	
	p.reject = function reject(reason) {
	    var promise = this;
	
	    if (promise.state === PENDING) {
	        if (reason === promise) {
	            throw new TypeError('Promise settled with itself.');
	        }
	
	        promise.state = REJECTED;
	        promise.value = reason;
	        promise.notify();
	    }
	};
	
	p.notify = function notify() {
	    var promise = this;
	
	    _.nextTick(function () {
	        if (promise.state !== PENDING) {
	            while (promise.deferred.length) {
	                var deferred = promise.deferred.shift(),
	                    onResolved = deferred[0],
	                    onRejected = deferred[1],
	                    resolve = deferred[2],
	                    reject = deferred[3];
	
	                try {
	                    if (promise.state === RESOLVED) {
	                        if (typeof onResolved === 'function') {
	                            resolve(onResolved.call(undefined, promise.value));
	                        } else {
	                            resolve(promise.value);
	                        }
	                    } else if (promise.state === REJECTED) {
	                        if (typeof onRejected === 'function') {
	                            resolve(onRejected.call(undefined, promise.value));
	                        } else {
	                            reject(promise.value);
	                        }
	                    }
	                } catch (e) {
	                    reject(e);
	                }
	            }
	        }
	    });
	};
	
	p.then = function then(onResolved, onRejected) {
	    var promise = this;
	
	    return new Promise(function (resolve, reject) {
	        promise.deferred.push([onResolved, onRejected, resolve, reject]);
	        promise.notify();
	    });
	};
	
	p.catch = function (onRejected) {
	    return this.then(undefined, onRejected);
	};
	
	module.exports = Promise;


/***/ },
/* 119 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * XMLHttp client.
	 */
	
	var _ = __webpack_require__(108);
	var Promise = __webpack_require__(117);
	
	module.exports = function (request) {
	    return new Promise(function (resolve) {
	
	        var xhr = new XMLHttpRequest(), response = {request: request}, handler;
	
	        request.cancel = function () {
	            xhr.abort();
	        };
	
	        xhr.open(request.method, _.url(request), true);
	
	        if (_.isPlainObject(request.xhr)) {
	            _.extend(xhr, request.xhr);
	        }
	
	        _.each(request.headers || {}, function (value, header) {
	            xhr.setRequestHeader(header, value);
	        });
	
	        handler = function (event) {
	
	            response.data = xhr.responseText;
	            response.status = xhr.status;
	            response.statusText = xhr.statusText;
	            response.headers = xhr.getAllResponseHeaders();
	
	            resolve(response);
	        };
	
	        xhr.onload = handler;
	        xhr.onabort = handler;
	        xhr.onerror = handler;
	
	        xhr.send(request.data);
	    });
	};


/***/ },
/* 120 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Interceptor factory.
	 */
	
	var _ = __webpack_require__(108);
	var Promise = __webpack_require__(117);
	
	module.exports = function (handler, vm) {
	
	    return function (client) {
	
	        if (_.isFunction(handler)) {
	            handler = handler.call(vm, Promise);
	        }
	
	        return function (request) {
	
	            if (_.isFunction(handler.request)) {
	                request = handler.request.call(vm, request);
	            }
	
	            return when(request, function (request) {
	                return when(client(request), function (response) {
	
	                    if (_.isFunction(handler.response)) {
	                        response = handler.response.call(vm, response);
	                    }
	
	                    return response;
	                });
	            });
	        };
	    };
	};
	
	function when(value, fulfilled, rejected) {
	
	    var promise = Promise.resolve(value);
	
	    if (arguments.length < 2) {
	        return promise;
	    }
	
	    return promise.then(fulfilled, rejected);
	}


/***/ },
/* 121 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Before Interceptor.
	 */
	
	var _ = __webpack_require__(108);
	
	module.exports = {
	
	    request: function (request) {
	
	        if (_.isFunction(request.beforeSend)) {
	            request.beforeSend.call(this, request);
	        }
	
	        return request;
	    }
	
	};


/***/ },
/* 122 */
/***/ function(module, exports) {

	/**
	 * Timeout Interceptor.
	 */
	
	module.exports = function () {
	
	    var timeout;
	
	    return {
	
	        request: function (request) {
	
	            if (request.timeout) {
	                timeout = setTimeout(function () {
	                    request.cancel();
	                }, request.timeout);
	            }
	
	            return request;
	        },
	
	        response: function (response) {
	
	            clearTimeout(timeout);
	
	            return response;
	        }
	
	    };
	};


/***/ },
/* 123 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * JSONP Interceptor.
	 */
	
	var jsonpClient = __webpack_require__(124);
	
	module.exports = {
	
	    request: function (request) {
	
	        if (request.method == 'JSONP') {
	            request.client = jsonpClient;
	        }
	
	        return request;
	    }
	
	};


/***/ },
/* 124 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * JSONP client.
	 */
	
	var _ = __webpack_require__(108);
	var Promise = __webpack_require__(117);
	
	module.exports = function (request) {
	    return new Promise(function (resolve) {
	
	        var callback = '_jsonp' + Math.random().toString(36).substr(2), response = {request: request, data: null}, handler, script;
	
	        request.params[request.jsonp] = callback;
	        request.cancel = function () {
	            handler({type: 'cancel'});
	        };
	
	        script = document.createElement('script');
	        script.src = _.url(request);
	        script.type = 'text/javascript';
	        script.async = true;
	
	        window[callback] = function (data) {
	            response.data = data;
	        };
	
	        handler = function (event) {
	
	            if (event.type === 'load' && response.data !== null) {
	                response.status = 200;
	            } else if (event.type === 'error') {
	                response.status = 404;
	            } else {
	                response.status = 0;
	            }
	
	            resolve(response);
	
	            delete window[callback];
	            document.body.removeChild(script);
	        };
	
	        script.onload = handler;
	        script.onerror = handler;
	
	        document.body.appendChild(script);
	    });
	};


/***/ },
/* 125 */
/***/ function(module, exports) {

	/**
	 * HTTP method override Interceptor.
	 */
	
	module.exports = {
	
	    request: function (request) {
	
	        if (request.emulateHTTP && /^(PUT|PATCH|DELETE)$/i.test(request.method)) {
	            request.headers['X-HTTP-Method-Override'] = request.method;
	            request.method = 'POST';
	        }
	
	        return request;
	    }
	
	};


/***/ },
/* 126 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Mime Interceptor.
	 */
	
	var _ = __webpack_require__(108);
	
	module.exports = {
	
	    request: function (request) {
	
	        if (request.emulateJSON && _.isPlainObject(request.data)) {
	            request.headers['Content-Type'] = 'application/x-www-form-urlencoded';
	            request.data = _.url.params(request.data);
	        }
	
	        if (_.isObject(request.data) && /FormData/i.test(request.data.toString())) {
	            delete request.headers['Content-Type'];
	        }
	
	        if (_.isPlainObject(request.data)) {
	            request.data = JSON.stringify(request.data);
	        }
	
	        return request;
	    },
	
	    response: function (response) {
	
	        try {
	            response.data = JSON.parse(response.data);
	        } catch (e) {}
	
	        return response;
	    }
	
	};


/***/ },
/* 127 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Header Interceptor.
	 */
	
	var _ = __webpack_require__(108);
	
	module.exports = {
	
	    request: function (request) {
	
	        request.method = request.method.toUpperCase();
	        request.headers = _.extend({}, _.http.headers.common,
	            !request.crossOrigin ? _.http.headers.custom : {},
	            _.http.headers[request.method.toLowerCase()],
	            request.headers
	        );
	
	        if (_.isPlainObject(request.data) && /^(GET|JSONP)$/i.test(request.method)) {
	            _.extend(request.params, request.data);
	            delete request.data;
	        }
	
	        return request;
	    }
	
	};


/***/ },
/* 128 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * CORS Interceptor.
	 */
	
	var _ = __webpack_require__(108);
	var xdrClient = __webpack_require__(129);
	var xhrCors = 'withCredentials' in new XMLHttpRequest();
	var originUrl = _.url.parse(location.href);
	
	module.exports = {
	
	    request: function (request) {
	
	        if (request.crossOrigin === null) {
	            request.crossOrigin = crossOrigin(request);
	        }
	
	        if (request.crossOrigin) {
	
	            if (!xhrCors) {
	                request.client = xdrClient;
	            }
	
	            request.emulateHTTP = false;
	        }
	
	        return request;
	    }
	
	};
	
	function crossOrigin(request) {
	
	    var requestUrl = _.url.parse(_.url(request));
	
	    return (requestUrl.protocol !== originUrl.protocol || requestUrl.host !== originUrl.host);
	}


/***/ },
/* 129 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * XDomain client (Internet Explorer).
	 */
	
	var _ = __webpack_require__(108);
	var Promise = __webpack_require__(117);
	
	module.exports = function (request) {
	    return new Promise(function (resolve) {
	
	        var xdr = new XDomainRequest(), response = {request: request}, handler;
	
	        request.cancel = function () {
	            xdr.abort();
	        };
	
	        xdr.open(request.method, _.url(request), true);
	
	        handler = function (event) {
	
	            response.data = xdr.responseText;
	            response.status = xdr.status;
	            response.statusText = xdr.statusText;
	
	            resolve(response);
	        };
	
	        xdr.timeout = 0;
	        xdr.onload = handler;
	        xdr.onabort = handler;
	        xdr.onerror = handler;
	        xdr.ontimeout = function () {};
	        xdr.onprogress = function () {};
	
	        xdr.send(request.data);
	    });
	};


/***/ },
/* 130 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Service for interacting with RESTful services.
	 */
	
	var _ = __webpack_require__(108);
	
	function Resource(url, params, actions, options) {
	
	    var self = this, resource = {};
	
	    actions = _.extend({},
	        Resource.actions,
	        actions
	    );
	
	    _.each(actions, function (action, name) {
	
	        action = _.merge({url: url, params: params || {}}, options, action);
	
	        resource[name] = function () {
	            return (self.$http || _.http)(opts(action, arguments));
	        };
	    });
	
	    return resource;
	}
	
	function opts(action, args) {
	
	    var options = _.extend({}, action), params = {}, data, success, error;
	
	    switch (args.length) {
	
	        case 4:
	
	            error = args[3];
	            success = args[2];
	
	        case 3:
	        case 2:
	
	            if (_.isFunction(args[1])) {
	
	                if (_.isFunction(args[0])) {
	
	                    success = args[0];
	                    error = args[1];
	
	                    break;
	                }
	
	                success = args[1];
	                error = args[2];
	
	            } else {
	
	                params = args[0];
	                data = args[1];
	                success = args[2];
	
	                break;
	            }
	
	        case 1:
	
	            if (_.isFunction(args[0])) {
	                success = args[0];
	            } else if (/^(POST|PUT|PATCH)$/i.test(options.method)) {
	                data = args[0];
	            } else {
	                params = args[0];
	            }
	
	            break;
	
	        case 0:
	
	            break;
	
	        default:
	
	            throw 'Expected up to 4 arguments [params, data, success, error], got ' + args.length + ' arguments';
	    }
	
	    options.data = data;
	    options.params = _.extend({}, options.params, params);
	
	    if (success) {
	        options.success = success;
	    }
	
	    if (error) {
	        options.error = error;
	    }
	
	    return options;
	}
	
	Resource.actions = {
	
	    get: {method: 'GET'},
	    save: {method: 'POST'},
	    query: {method: 'GET'},
	    update: {method: 'PUT'},
	    remove: {method: 'DELETE'},
	    delete: {method: 'DELETE'}
	
	};
	
	module.exports = _.resource = Resource;


/***/ },
/* 131 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__webpack_require__(132)
	__vue_script__ = __webpack_require__(134)
	__vue_template__ = __webpack_require__(135)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) { (typeof module.exports === "function" ? module.exports.options : module.exports).template = __vue_template__ }
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), true)
	  if (!hotAPI.compatible) return
	  var id = "E:\\workspace\\mobile-dev\\src\\components\\Toast.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 132 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(133);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(10)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js?sourceMap!./../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-4de571aa&file=Toast.vue&scoped=true!./../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./Toast.vue", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js?sourceMap!./../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-4de571aa&file=Toast.vue&scoped=true!./../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./Toast.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 133 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(9)();
	// imports
	
	
	// module
	exports.push([module.id, " \n\t\n\t.toast[_v-4de571aa]{\n\t\tposition: fixed;\n\t    z-index: 3;\n\t    width: 7.6em;\n\t    min-height: 7.6em;\n\t    top: 180px;\n\t    left: 50%;\n\t    margin-left: -3.8em;\n\t    background: rgba(40, 40, 40, 0.75);\n\t    text-align: center;\n\t    border-radius: 5px;\n\t    color: #FFFFFF;\n\t}\n\n\t/*遮罩*/\n\t.toast-mask[_v-4de571aa]{\n\t\tposition: fixed;\n\t\ttop: 0;\n\t\tleft: 0;\n\t\tz-index: 10px;\n\t\theight: 100%;\n\t\twidth: 100%;\n\t}\n\n\t.toast-bd>.loading[_v-4de571aa]{\n\t\tposition: absolute;\n\t    width: 0px;\n\t    z-index: 20;\n\t    left: 50%;\n\t    top: 38%;\n\t}\n\n\t.toast-content[_v-4de571aa]{\n\t\tmargin: 0 0 15px;\n\t\tmargin-top:10%;\n      \tfont-size:14px;\n\t}\n\n\t.loading_leaf[_v-4de571aa]{\n\t\tposition: absolute;\n\t    top: -1px;\n\t    opacity: 0.25;\n\t}\n\n\t.loading_leaf[_v-4de571aa]:before{\n\t\tcontent:\" \";\n        position: absolute;\n        width: 8.14px;\n        height: 3.08px;\n        background: rgb(209, 209, 213);\n        box-shadow: rgba(0, 0, 0, 0.0980392) 0px 0px 1px;\n        border-radius: 1px;\n        -webkit-transform-origin: left 50% 0px;\n                transform-origin: left 50% 0px;\n\t}\n\n\t.loading_leaf_0[_v-4de571aa]{\n\t\t-webkit-animation: opacity-60-25-0-12 1.25s linear infinite;\n\t\t        animation: opacity-60-25-0-12 1.25s linear infinite;\n\t}\n\t.loading_leaf_0[_v-4de571aa]:before{\n\t\t-webkit-transform: rotate(0deg) translate(7.92px, 0px);\n\t\t        transform: rotate(0deg) translate(7.92px, 0px);\n\t}\n\n\t.loading_leaf_1[_v-4de571aa]{\n\t\t-webkit-animation: opacity-60-25-1-12 1.25s linear infinite;\n\t\t        animation: opacity-60-25-1-12 1.25s linear infinite;\n\t}\n\t.loading_leaf_1[_v-4de571aa]:before{\n\t\t-webkit-transform: rotate(30deg) translate(7.92px, 0px);\n\t\t        transform: rotate(30deg) translate(7.92px, 0px);\n\t}\n\n\n\t.loading_leaf_2[_v-4de571aa]{\n\t\t-webkit-animation: opacity-60-25-2-12 1.25s linear infinite;\n\t\t        animation: opacity-60-25-2-12 1.25s linear infinite;\n\t}\n\t.loading_leaf_2[_v-4de571aa]:before{\n\t\t-webkit-transform: rotate(60deg) translate(7.92px, 0px);\n\t\t        transform: rotate(60deg) translate(7.92px, 0px);\n\t}\n\n\n\t.loading_leaf_3[_v-4de571aa]{\n\t\t-webkit-animation: opacity-60-25-3-12 1.25s linear infinite;\n\t\t        animation: opacity-60-25-3-12 1.25s linear infinite;\n\t}\n\t.loading_leaf_3[_v-4de571aa]:before{\n\t\t-webkit-transform: rotate(90deg) translate(7.92px, 0px);\n\t\t        transform: rotate(90deg) translate(7.92px, 0px);\n\t}\n\n\t.loading_leaf_4[_v-4de571aa]{\n\t\t-webkit-animation: opacity-60-25-4-12 1.25s linear infinite;\n\t\t        animation: opacity-60-25-4-12 1.25s linear infinite;\n\t}\n\t.loading_leaf_4[_v-4de571aa]:before{\n\t\t-webkit-transform: rotate(120deg) translate(7.92px, 0px);\n\t\t        transform: rotate(120deg) translate(7.92px, 0px);\n\t}\n\n\t.loading_leaf_5[_v-4de571aa]{\n\t\t-webkit-animation: opacity-60-25-5-12 1.25s linear infinite;\n\t\t        animation: opacity-60-25-5-12 1.25s linear infinite;\n\t}\n\t.loading_leaf_5[_v-4de571aa]:before{\n\t\t-webkit-transform: rotate(150deg) translate(7.92px, 0px);\n\t\t        transform: rotate(150deg) translate(7.92px, 0px);\n\t}\n\n\t.loading_leaf_6[_v-4de571aa]{\n\t\t-webkit-animation: opacity-60-25-6-12 1.25s linear infinite;\n\t\t        animation: opacity-60-25-6-12 1.25s linear infinite;\n\t}\n\t.loading_leaf_6[_v-4de571aa]:before{\n\t\t-webkit-transform: rotate(180deg) translate(7.92px, 0px);\n\t\t        transform: rotate(180deg) translate(7.92px, 0px);\n\t}\n\n\t.loading_leaf_7[_v-4de571aa]{\n\t\t-webkit-animation: opacity-60-25-7-12 1.25s linear infinite;\n\t\t        animation: opacity-60-25-7-12 1.25s linear infinite;\n\t}\n\t.loading_leaf_7[_v-4de571aa]:before{\n\t\t-webkit-transform: rotate(210deg) translate(7.92px, 0px);\n\t\t        transform: rotate(210deg) translate(7.92px, 0px);\n\t}\n\n\t.loading_leaf_8[_v-4de571aa]{\n\t\t-webkit-animation: opacity-60-25-8-12 1.25s linear infinite;\n\t\t        animation: opacity-60-25-8-12 1.25s linear infinite;\n\t}\n\t.loading_leaf_8[_v-4de571aa]:before{\n\t\t-webkit-transform: rotate(240deg) translate(7.92px, 0px);\n\t\t        transform: rotate(240deg) translate(7.92px, 0px);\n\t}\n\n\t.loading_leaf_9[_v-4de571aa]{\n\t\t-webkit-animation: opacity-60-25-9-12 1.25s linear infinite;\n\t\t        animation: opacity-60-25-9-12 1.25s linear infinite;\n\t}\n\t.loading_leaf_9[_v-4de571aa]:before{\n\t\t-webkit-transform: rotate(270deg) translate(7.92px, 0px);\n\t\t        transform: rotate(270deg) translate(7.92px, 0px);\n\t}\n\n\t.loading_leaf_10[_v-4de571aa]{\n\t\t-webkit-animation: opacity-60-25-10-12 1.25s linear infinite;\n\t\t        animation: opacity-60-25-10-12 1.25s linear infinite;\n\t}\n\t.loading_leaf_10[_v-4de571aa]:before{\n\t\t-webkit-transform: rotate(300deg) translate(7.92px, 0px);\n\t\t        transform: rotate(300deg) translate(7.92px, 0px);\n\t}\n\n\t.loading_leaf_11[_v-4de571aa]{\n\t\t-webkit-animation: opacity-60-25-11-12 1.25s linear infinite;\n\t\t        animation: opacity-60-25-11-12 1.25s linear infinite;\n\t}\n\t.loading_leaf_11[_v-4de571aa]:before{\n\t\t-webkit-transform: rotate(330deg) translate(7.92px, 0px);\n\t\t        transform: rotate(330deg) translate(7.92px, 0px);\n\t}\n\n\t.loading_leaf_12[_v-4de571aa]{\n\t\t-webkit-animation: opacity-60-25-12-12 1.25s linear infinite;\n\t\t        animation: opacity-60-25-12-12 1.25s linear infinite;\n\t}\n\t.loading_leaf_12[_v-4de571aa]:before{\n\t\t-webkit-transform: rotate(360deg) translate(7.92px, 0px);\n\t\t        transform: rotate(360deg) translate(7.92px, 0px);\n\t}\n\n\n\t@-webkit-keyframes opacity-60-25-0-12 {\n\t  0% { opacity: 0.25; }\n\t  0.01% { opacity: 0.25; }\n\t  0.02% { opacity: 1; }\n\t  60.01% { opacity: 0.25; }\n\t  100% { opacity: 0.25; }\n\t}@-webkit-keyframes opacity-60-25-1-12 {\n\t  0% { opacity: 0.25; }\n\t  8.34333% { opacity: 0.25; }\n\t  8.35333% { opacity: 1; }\n\t  68.3433% { opacity: 0.25; }\n\t  100% { opacity: 0.25; }\n\t}@-webkit-keyframes opacity-60-25-2-12 {\n\t  0% { opacity: 0.25; }\n\t  16.6767% { opacity: 0.25; }\n\t  16.6867% { opacity: 1; }\n\t  76.6767% { opacity: 0.25; }\n\t  100% { opacity: 0.25; }\n\t}@-webkit-keyframes opacity-60-25-3-12 {\n\t  0% { opacity: 0.25; }\n\t  25.01% { opacity: 0.25; }\n\t  25.02% { opacity: 1; }\n\t  85.01% { opacity: 0.25; }\n\t  100% { opacity: 0.25; }\n\t}@-webkit-keyframes opacity-60-25-4-12 {\n\t  0% { opacity: 0.25; }\n\t  33.3433% { opacity: 0.25; }\n\t  33.3533% { opacity: 1; }\n\t  93.3433% { opacity: 0.25; }\n\t  100% { opacity: 0.25; }\n\t}@-webkit-keyframes opacity-60-25-5-12 {\n\t  0% { opacity: 0.270958333333333; }\n\t  41.6767% { opacity: 0.25; }\n\t  41.6867% { opacity: 1; }\n\t  1.67667% { opacity: 0.25; }\n\t  100% { opacity: 0.270958333333333; }\n\t}@-webkit-keyframes opacity-60-25-6-12 {\n\t  0% { opacity: 0.375125; }\n\t  50.01% { opacity: 0.25; }\n\t  50.02% { opacity: 1; }\n\t  10.01% { opacity: 0.25; }\n\t  100% { opacity: 0.375125; }\n\t}@-webkit-keyframes opacity-60-25-7-12 {\n\t  0% { opacity: 0.479291666666667; }\n\t  58.3433% { opacity: 0.25; }\n\t  58.3533% { opacity: 1; }\n\t  18.3433% { opacity: 0.25; }\n\t  100% { opacity: 0.479291666666667; }\n\t}@-webkit-keyframes opacity-60-25-8-12 {\n\t  0% { opacity: 0.583458333333333; }\n\t  66.6767% { opacity: 0.25; }\n\t  66.6867% { opacity: 1; }\n\t  26.6767% { opacity: 0.25; }\n\t  100% { opacity: 0.583458333333333; }\n\t}@-webkit-keyframes opacity-60-25-9-12 {\n\t  0% { opacity: 0.687625; }\n\t  75.01% { opacity: 0.25; }\n\t  75.02% { opacity: 1; }\n\t  35.01% { opacity: 0.25; }\n\t  100% { opacity: 0.687625; }\n\t}@-webkit-keyframes opacity-60-25-10-12 {\n\t  0% { opacity: 0.791791666666667; }\n\t  83.3433% { opacity: 0.25; }\n\t  83.3533% { opacity: 1; }\n\t  43.3433% { opacity: 0.25; }\n\t  100% { opacity: 0.791791666666667; }\n\t}@-webkit-keyframes opacity-60-25-11-12 {\n\t  0% { opacity: 0.895958333333333; }\n\t  91.6767% { opacity: 0.25; }\n\t  91.6867% { opacity: 1; }\n\t  51.6767% { opacity: 0.25; }\n\t  100% { opacity: 0.895958333333333; }\n\t}\n\n", "", {"version":3,"sources":["/./src/components/Toast.vue?58bc00e3"],"names":[],"mappings":";;CAwEA;EACA,gBAAA;KACA,WAAA;KACA,aAAA;KACA,kBAAA;KACA,WAAA;KACA,UAAA;KACA,oBAAA;KACA,mCAAA;KACA,mBAAA;KACA,mBAAA;KACA,eAAA;EACA;;CAEA,MAAA;CACA;EACA,gBAAA;EACA,OAAA;EACA,QAAA;EACA,cAAA;EACA,aAAA;EACA,YAAA;EACA;;CAEA;EACA,mBAAA;KACA,WAAA;KACA,YAAA;KACA,UAAA;KACA,SAAA;EACA;;CAEA;EACA,iBAAA;EACA,eAAA;OACA,eAAA;EACA;;CAEA;EACA,mBAAA;KACA,UAAA;KACA,cAAA;EACA;;CAEA;EACA,YAAA;QACA,mBAAA;QACA,cAAA;QACA,eAAA;QACA,+BAAA;QACA,iDAAA;QACA,mBAAA;QACA,uCAAA;gBAAA,+BAAA;EACA;;CAEA;EACA,4DAAA;UAAA,oDAAA;EACA;CACA;EACA,uDAAA;UAAA,+CAAA;EACA;;CAEA;EACA,4DAAA;UAAA,oDAAA;EACA;CACA;EACA,wDAAA;UAAA,gDAAA;EACA;;;CAGA;EACA,4DAAA;UAAA,oDAAA;EACA;CACA;EACA,wDAAA;UAAA,gDAAA;EACA;;;CAGA;EACA,4DAAA;UAAA,oDAAA;EACA;CACA;EACA,wDAAA;UAAA,gDAAA;EACA;;CAEA;EACA,4DAAA;UAAA,oDAAA;EACA;CACA;EACA,yDAAA;UAAA,iDAAA;EACA;;CAEA;EACA,4DAAA;UAAA,oDAAA;EACA;CACA;EACA,yDAAA;UAAA,iDAAA;EACA;;CAEA;EACA,4DAAA;UAAA,oDAAA;EACA;CACA;EACA,yDAAA;UAAA,iDAAA;EACA;;CAEA;EACA,4DAAA;UAAA,oDAAA;EACA;CACA;EACA,yDAAA;UAAA,iDAAA;EACA;;CAEA;EACA,4DAAA;UAAA,oDAAA;EACA;CACA;EACA,yDAAA;UAAA,iDAAA;EACA;;CAEA;EACA,4DAAA;UAAA,oDAAA;EACA;CACA;EACA,yDAAA;UAAA,iDAAA;EACA;;CAEA;EACA,6DAAA;UAAA,qDAAA;EACA;CACA;EACA,yDAAA;UAAA,iDAAA;EACA;;CAEA;EACA,6DAAA;UAAA,qDAAA;EACA;CACA;EACA,yDAAA;UAAA,iDAAA;EACA;;CAEA;EACA,6DAAA;UAAA,qDAAA;EACA;CACA;EACA,yDAAA;UAAA,iDAAA;EACA;;;CAGA;GACA,KAAA,cAAA,EAAA;GACA,QAAA,cAAA,EAAA;GACA,QAAA,WAAA,EAAA;GACA,SAAA,cAAA,EAAA;GACA,OAAA,cAAA,EAAA;EACA;GACA,KAAA,cAAA,EAAA;GACA,WAAA,cAAA,EAAA;GACA,WAAA,WAAA,EAAA;GACA,WAAA,cAAA,EAAA;GACA,OAAA,cAAA,EAAA;EACA;GACA,KAAA,cAAA,EAAA;GACA,WAAA,cAAA,EAAA;GACA,WAAA,WAAA,EAAA;GACA,WAAA,cAAA,EAAA;GACA,OAAA,cAAA,EAAA;EACA;GACA,KAAA,cAAA,EAAA;GACA,SAAA,cAAA,EAAA;GACA,SAAA,WAAA,EAAA;GACA,SAAA,cAAA,EAAA;GACA,OAAA,cAAA,EAAA;EACA;GACA,KAAA,cAAA,EAAA;GACA,WAAA,cAAA,EAAA;GACA,WAAA,WAAA,EAAA;GACA,WAAA,cAAA,EAAA;GACA,OAAA,cAAA,EAAA;EACA;GACA,KAAA,2BAAA,EAAA;GACA,WAAA,cAAA,EAAA;GACA,WAAA,WAAA,EAAA;GACA,WAAA,cAAA,EAAA;GACA,OAAA,2BAAA,EAAA;EACA;GACA,KAAA,kBAAA,EAAA;GACA,SAAA,cAAA,EAAA;GACA,SAAA,WAAA,EAAA;GACA,SAAA,cAAA,EAAA;GACA,OAAA,kBAAA,EAAA;EACA;GACA,KAAA,2BAAA,EAAA;GACA,WAAA,cAAA,EAAA;GACA,WAAA,WAAA,EAAA;GACA,WAAA,cAAA,EAAA;GACA,OAAA,2BAAA,EAAA;EACA;GACA,KAAA,2BAAA,EAAA;GACA,WAAA,cAAA,EAAA;GACA,WAAA,WAAA,EAAA;GACA,WAAA,cAAA,EAAA;GACA,OAAA,2BAAA,EAAA;EACA;GACA,KAAA,kBAAA,EAAA;GACA,SAAA,cAAA,EAAA;GACA,SAAA,WAAA,EAAA;GACA,SAAA,cAAA,EAAA;GACA,OAAA,kBAAA,EAAA;EACA;GACA,KAAA,2BAAA,EAAA;GACA,WAAA,cAAA,EAAA;GACA,WAAA,WAAA,EAAA;GACA,WAAA,cAAA,EAAA;GACA,OAAA,2BAAA,EAAA;EACA;GACA,KAAA,2BAAA,EAAA;GACA,WAAA,cAAA,EAAA;GACA,WAAA,WAAA,EAAA;GACA,WAAA,cAAA,EAAA;GACA,OAAA,2BAAA,EAAA;EACA","file":"Toast.vue","sourcesContent":["<template>\r\n\t<section class=\"toast\" v-show=\"show\">\r\n\t\t<section class=\"toast-mask\"></section>\r\n\t\t<section class=\"toast-bd\">\r\n\t\t\t<section class=\"loading\" v-if=\"isload\">\r\n\t\t\t\t<div class=\"loading_leaf loading_leaf_0\"></div>\r\n\t\t\t\t<div class=\"loading_leaf loading_leaf_1\"></div>\r\n\t\t\t\t<div class=\"loading_leaf loading_leaf_2\"></div>\r\n\t\t\t\t<div class=\"loading_leaf loading_leaf_3\"></div>\r\n\t\t\t\t<div class=\"loading_leaf loading_leaf_4\"></div>\r\n\t\t\t\t<div class=\"loading_leaf loading_leaf_5\"></div>\r\n\t\t\t\t<div class=\"loading_leaf loading_leaf_6\"></div>\r\n\t\t\t\t<div class=\"loading_leaf loading_leaf_7\"></div>\r\n\t\t\t\t<div class=\"loading_leaf loading_leaf_8\"></div>\r\n\t\t\t\t<div class=\"loading_leaf loading_leaf_9\"></div>\r\n\t\t\t\t<div class=\"loading_leaf loading_leaf_10\"></div>\r\n\t\t\t\t<div class=\"loading_leaf loading_leaf_11\"></div>\r\n\t\t\t</section>\r\n\t\t\t<section class=\"prompt\" v-else>\r\n\t\t\t\t<i class=\"weui_icon_toast\"></i>\r\n\t\t\t</section>\r\n\t\t\t<p class=\"toast-content\" >{{prompt}}</p>\r\n\t\t</section>\r\n\t</section>\r\n</template>\r\n\r\n<script lang=\"babel\">\r\n\t\r\n\texport default {\r\n\t\tprops:{\r\n\t\t\tshow:{\r\n\t\t\t\ttype:Boolean,\r\n\t\t\t\tdefault:false\r\n\t\t\t},\r\n\t\t\t//显示的时常\r\n\t\t\tseconds:{\r\n\t\t\t\ttype:Number,\r\n\t\t\t\tdefault:5\r\n\t\t\t},\r\n\t\t\tisload:{\r\n\t\t\t\ttype:Boolean,\r\n\t\t\t\tdefault:false\r\n\t\t\t},\r\n\t\t\tprompt:{\r\n\t\t\t\ttype:String,\r\n\t\t\t\tdefault:'已经完成'\r\n\t\t\t}\r\n\t\t},\r\n\t\tdata(){\r\n\t\t\treturn {\r\n\t\t\t\tsec:0\r\n\t\t\t}\r\n\t\t},\r\n\t\tready(){\r\n\t\t\tif(!this.isload){\r\n\t\t\t\tsetTimeout(()=>{\r\n\t\t\t\t\tthis.show=false;\r\n\t\t\t\t},this.seconds*1000);\r\n\t\t\t}\r\n\t\t},\r\n\t\tcreated(){\r\n\t\t\tif(this.isload){\r\n\t\t\t\tthis.prompt=\"正在加载中..\";\r\n\t\t\t}\r\n\t\t}\r\n\t}\r\n\r\n</script>\r\n\r\n\r\n<style type=\"text/css\" scoped> \r\n\t\r\n\t.toast{\r\n\t\tposition: fixed;\r\n\t    z-index: 3;\r\n\t    width: 7.6em;\r\n\t    min-height: 7.6em;\r\n\t    top: 180px;\r\n\t    left: 50%;\r\n\t    margin-left: -3.8em;\r\n\t    background: rgba(40, 40, 40, 0.75);\r\n\t    text-align: center;\r\n\t    border-radius: 5px;\r\n\t    color: #FFFFFF;\r\n\t}\r\n\r\n\t/*遮罩*/\r\n\t.toast-mask{\r\n\t\tposition: fixed;\r\n\t\ttop: 0;\r\n\t\tleft: 0;\r\n\t\tz-index: 10px;\r\n\t\theight: 100%;\r\n\t\twidth: 100%;\r\n\t}\r\n\r\n\t.toast-bd>.loading{\r\n\t\tposition: absolute;\r\n\t    width: 0px;\r\n\t    z-index: 20;\r\n\t    left: 50%;\r\n\t    top: 38%;\r\n\t}\r\n\r\n\t.toast-content{\r\n\t\tmargin: 0 0 15px;\r\n\t\tmargin-top:10%;\r\n      \tfont-size:14px;\r\n\t}\r\n\r\n\t.loading_leaf{\r\n\t\tposition: absolute;\r\n\t    top: -1px;\r\n\t    opacity: 0.25;\r\n\t}\r\n\r\n\t.loading_leaf:before{\r\n\t\tcontent:\" \";\r\n        position: absolute;\r\n        width: 8.14px;\r\n        height: 3.08px;\r\n        background: rgb(209, 209, 213);\r\n        box-shadow: rgba(0, 0, 0, 0.0980392) 0px 0px 1px;\r\n        border-radius: 1px;\r\n        transform-origin: left 50% 0px;\r\n\t}\r\n\r\n\t.loading_leaf_0{\r\n\t\tanimation: opacity-60-25-0-12 1.25s linear infinite;\r\n\t}\r\n\t.loading_leaf_0:before{\r\n\t\ttransform: rotate(0deg) translate(7.92px, 0px);\r\n\t}\r\n\r\n\t.loading_leaf_1{\r\n\t\tanimation: opacity-60-25-1-12 1.25s linear infinite;\r\n\t}\r\n\t.loading_leaf_1:before{\r\n\t\ttransform: rotate(30deg) translate(7.92px, 0px);\r\n\t}\r\n\r\n\r\n\t.loading_leaf_2{\r\n\t\tanimation: opacity-60-25-2-12 1.25s linear infinite;\r\n\t}\r\n\t.loading_leaf_2:before{\r\n\t\ttransform: rotate(60deg) translate(7.92px, 0px);\r\n\t}\r\n\r\n\r\n\t.loading_leaf_3{\r\n\t\tanimation: opacity-60-25-3-12 1.25s linear infinite;\r\n\t}\r\n\t.loading_leaf_3:before{\r\n\t\ttransform: rotate(90deg) translate(7.92px, 0px);\r\n\t}\r\n\r\n\t.loading_leaf_4{\r\n\t\tanimation: opacity-60-25-4-12 1.25s linear infinite;\r\n\t}\r\n\t.loading_leaf_4:before{\r\n\t\ttransform: rotate(120deg) translate(7.92px, 0px);\r\n\t}\r\n\r\n\t.loading_leaf_5{\r\n\t\tanimation: opacity-60-25-5-12 1.25s linear infinite;\r\n\t}\r\n\t.loading_leaf_5:before{\r\n\t\ttransform: rotate(150deg) translate(7.92px, 0px);\r\n\t}\r\n\r\n\t.loading_leaf_6{\r\n\t\tanimation: opacity-60-25-6-12 1.25s linear infinite;\r\n\t}\r\n\t.loading_leaf_6:before{\r\n\t\ttransform: rotate(180deg) translate(7.92px, 0px);\r\n\t}\r\n\r\n\t.loading_leaf_7{\r\n\t\tanimation: opacity-60-25-7-12 1.25s linear infinite;\r\n\t}\r\n\t.loading_leaf_7:before{\r\n\t\ttransform: rotate(210deg) translate(7.92px, 0px);\r\n\t}\r\n\r\n\t.loading_leaf_8{\r\n\t\tanimation: opacity-60-25-8-12 1.25s linear infinite;\r\n\t}\r\n\t.loading_leaf_8:before{\r\n\t\ttransform: rotate(240deg) translate(7.92px, 0px);\r\n\t}\r\n\r\n\t.loading_leaf_9{\r\n\t\tanimation: opacity-60-25-9-12 1.25s linear infinite;\r\n\t}\r\n\t.loading_leaf_9:before{\r\n\t\ttransform: rotate(270deg) translate(7.92px, 0px);\r\n\t}\r\n\r\n\t.loading_leaf_10{\r\n\t\tanimation: opacity-60-25-10-12 1.25s linear infinite;\r\n\t}\r\n\t.loading_leaf_10:before{\r\n\t\ttransform: rotate(300deg) translate(7.92px, 0px);\r\n\t}\r\n\r\n\t.loading_leaf_11{\r\n\t\tanimation: opacity-60-25-11-12 1.25s linear infinite;\r\n\t}\r\n\t.loading_leaf_11:before{\r\n\t\ttransform: rotate(330deg) translate(7.92px, 0px);\r\n\t}\r\n\r\n\t.loading_leaf_12{\r\n\t\tanimation: opacity-60-25-12-12 1.25s linear infinite;\r\n\t}\r\n\t.loading_leaf_12:before{\r\n\t\ttransform: rotate(360deg) translate(7.92px, 0px);\r\n\t}\r\n\r\n\r\n\t@-webkit-keyframes opacity-60-25-0-12 {\r\n\t  0% { opacity: 0.25; }\r\n\t  0.01% { opacity: 0.25; }\r\n\t  0.02% { opacity: 1; }\r\n\t  60.01% { opacity: 0.25; }\r\n\t  100% { opacity: 0.25; }\r\n\t}@-webkit-keyframes opacity-60-25-1-12 {\r\n\t  0% { opacity: 0.25; }\r\n\t  8.34333% { opacity: 0.25; }\r\n\t  8.35333% { opacity: 1; }\r\n\t  68.3433% { opacity: 0.25; }\r\n\t  100% { opacity: 0.25; }\r\n\t}@-webkit-keyframes opacity-60-25-2-12 {\r\n\t  0% { opacity: 0.25; }\r\n\t  16.6767% { opacity: 0.25; }\r\n\t  16.6867% { opacity: 1; }\r\n\t  76.6767% { opacity: 0.25; }\r\n\t  100% { opacity: 0.25; }\r\n\t}@-webkit-keyframes opacity-60-25-3-12 {\r\n\t  0% { opacity: 0.25; }\r\n\t  25.01% { opacity: 0.25; }\r\n\t  25.02% { opacity: 1; }\r\n\t  85.01% { opacity: 0.25; }\r\n\t  100% { opacity: 0.25; }\r\n\t}@-webkit-keyframes opacity-60-25-4-12 {\r\n\t  0% { opacity: 0.25; }\r\n\t  33.3433% { opacity: 0.25; }\r\n\t  33.3533% { opacity: 1; }\r\n\t  93.3433% { opacity: 0.25; }\r\n\t  100% { opacity: 0.25; }\r\n\t}@-webkit-keyframes opacity-60-25-5-12 {\r\n\t  0% { opacity: 0.270958333333333; }\r\n\t  41.6767% { opacity: 0.25; }\r\n\t  41.6867% { opacity: 1; }\r\n\t  1.67667% { opacity: 0.25; }\r\n\t  100% { opacity: 0.270958333333333; }\r\n\t}@-webkit-keyframes opacity-60-25-6-12 {\r\n\t  0% { opacity: 0.375125; }\r\n\t  50.01% { opacity: 0.25; }\r\n\t  50.02% { opacity: 1; }\r\n\t  10.01% { opacity: 0.25; }\r\n\t  100% { opacity: 0.375125; }\r\n\t}@-webkit-keyframes opacity-60-25-7-12 {\r\n\t  0% { opacity: 0.479291666666667; }\r\n\t  58.3433% { opacity: 0.25; }\r\n\t  58.3533% { opacity: 1; }\r\n\t  18.3433% { opacity: 0.25; }\r\n\t  100% { opacity: 0.479291666666667; }\r\n\t}@-webkit-keyframes opacity-60-25-8-12 {\r\n\t  0% { opacity: 0.583458333333333; }\r\n\t  66.6767% { opacity: 0.25; }\r\n\t  66.6867% { opacity: 1; }\r\n\t  26.6767% { opacity: 0.25; }\r\n\t  100% { opacity: 0.583458333333333; }\r\n\t}@-webkit-keyframes opacity-60-25-9-12 {\r\n\t  0% { opacity: 0.687625; }\r\n\t  75.01% { opacity: 0.25; }\r\n\t  75.02% { opacity: 1; }\r\n\t  35.01% { opacity: 0.25; }\r\n\t  100% { opacity: 0.687625; }\r\n\t}@-webkit-keyframes opacity-60-25-10-12 {\r\n\t  0% { opacity: 0.791791666666667; }\r\n\t  83.3433% { opacity: 0.25; }\r\n\t  83.3533% { opacity: 1; }\r\n\t  43.3433% { opacity: 0.25; }\r\n\t  100% { opacity: 0.791791666666667; }\r\n\t}@-webkit-keyframes opacity-60-25-11-12 {\r\n\t  0% { opacity: 0.895958333333333; }\r\n\t  91.6767% { opacity: 0.25; }\r\n\t  91.6867% { opacity: 1; }\r\n\t  51.6767% { opacity: 0.25; }\r\n\t  100% { opacity: 0.895958333333333; }\r\n\t}\r\n\r\n</style>\r\n\r\n\r\n"],"sourceRoot":"webpack://"}]);
	
	// exports


/***/ },
/* 134 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	// <template>
	// 	<section class="toast" v-show="show">
	// 		<section class="toast-mask"></section>
	// 		<section class="toast-bd">
	// 			<section class="loading" v-if="isload">
	// 				<div class="loading_leaf loading_leaf_0"></div>
	// 				<div class="loading_leaf loading_leaf_1"></div>
	// 				<div class="loading_leaf loading_leaf_2"></div>
	// 				<div class="loading_leaf loading_leaf_3"></div>
	// 				<div class="loading_leaf loading_leaf_4"></div>
	// 				<div class="loading_leaf loading_leaf_5"></div>
	// 				<div class="loading_leaf loading_leaf_6"></div>
	// 				<div class="loading_leaf loading_leaf_7"></div>
	// 				<div class="loading_leaf loading_leaf_8"></div>
	// 				<div class="loading_leaf loading_leaf_9"></div>
	// 				<div class="loading_leaf loading_leaf_10"></div>
	// 				<div class="loading_leaf loading_leaf_11"></div>
	// 			</section>
	// 			<section class="prompt" v-else>
	// 				<i class="weui_icon_toast"></i>
	// 			</section>
	// 			<p class="toast-content" >{{prompt}}</p>
	// 		</section>
	// 	</section>
	// </template>
	
	// <script lang="babel">
	
	exports.default = {
		props: {
			show: {
				type: Boolean,
				default: false
			},
			//显示的时常
			seconds: {
				type: Number,
				default: 5
			},
			isload: {
				type: Boolean,
				default: false
			},
			prompt: {
				type: String,
				default: '已经完成'
			}
		},
		data: function data() {
			return {
				sec: 0
			};
		},
		ready: function ready() {
			var _this = this;
	
			if (!this.isload) {
				setTimeout(function () {
					_this.show = false;
				}, this.seconds * 1000);
			}
		},
		created: function created() {
			if (this.isload) {
				this.prompt = "正在加载中..";
			}
		}
	};
	
	// </script>

	// <style type="text/css" scoped>

	// 	.toast{
	// 		position: fixed;
	// 	    z-index: 3;
	// 	    width: 7.6em;
	// 	    min-height: 7.6em;
	// 	    top: 180px;
	// 	    left: 50%;
	// 	    margin-left: -3.8em;
	// 	    background: rgba(40, 40, 40, 0.75);
	// 	    text-align: center;
	// 	    border-radius: 5px;
	// 	    color: #FFFFFF;
	// 	}

	// 	/*遮罩*/
	// 	.toast-mask{
	// 		position: fixed;
	// 		top: 0;
	// 		left: 0;
	// 		z-index: 10px;
	// 		height: 100%;
	// 		width: 100%;
	// 	}

	// 	.toast-bd>.loading{
	// 		position: absolute;
	// 	    width: 0px;
	// 	    z-index: 20;
	// 	    left: 50%;
	// 	    top: 38%;
	// 	}

	// 	.toast-content{
	// 		margin: 0 0 15px;
	// 		margin-top:10%;
	//       	font-size:14px;
	// 	}

	// 	.loading_leaf{
	// 		position: absolute;
	// 	    top: -1px;
	// 	    opacity: 0.25;
	// 	}

	// 	.loading_leaf:before{
	// 		content:" ";
	//         position: absolute;
	//         width: 8.14px;
	//         height: 3.08px;
	//         background: rgb(209, 209, 213);
	//         box-shadow: rgba(0, 0, 0, 0.0980392) 0px 0px 1px;
	//         border-radius: 1px;
	//         transform-origin: left 50% 0px;
	// 	}

	// 	.loading_leaf_0{
	// 		animation: opacity-60-25-0-12 1.25s linear infinite;
	// 	}
	// 	.loading_leaf_0:before{
	// 		transform: rotate(0deg) translate(7.92px, 0px);
	// 	}

	// 	.loading_leaf_1{
	// 		animation: opacity-60-25-1-12 1.25s linear infinite;
	// 	}
	// 	.loading_leaf_1:before{
	// 		transform: rotate(30deg) translate(7.92px, 0px);
	// 	}

	// 	.loading_leaf_2{
	// 		animation: opacity-60-25-2-12 1.25s linear infinite;
	// 	}
	// 	.loading_leaf_2:before{
	// 		transform: rotate(60deg) translate(7.92px, 0px);
	// 	}

	// 	.loading_leaf_3{
	// 		animation: opacity-60-25-3-12 1.25s linear infinite;
	// 	}
	// 	.loading_leaf_3:before{
	// 		transform: rotate(90deg) translate(7.92px, 0px);
	// 	}

	// 	.loading_leaf_4{
	// 		animation: opacity-60-25-4-12 1.25s linear infinite;
	// 	}
	// 	.loading_leaf_4:before{
	// 		transform: rotate(120deg) translate(7.92px, 0px);
	// 	}

	// 	.loading_leaf_5{
	// 		animation: opacity-60-25-5-12 1.25s linear infinite;
	// 	}
	// 	.loading_leaf_5:before{
	// 		transform: rotate(150deg) translate(7.92px, 0px);
	// 	}

	// 	.loading_leaf_6{
	// 		animation: opacity-60-25-6-12 1.25s linear infinite;
	// 	}
	// 	.loading_leaf_6:before{
	// 		transform: rotate(180deg) translate(7.92px, 0px);
	// 	}

	// 	.loading_leaf_7{
	// 		animation: opacity-60-25-7-12 1.25s linear infinite;
	// 	}
	// 	.loading_leaf_7:before{
	// 		transform: rotate(210deg) translate(7.92px, 0px);
	// 	}

	// 	.loading_leaf_8{
	// 		animation: opacity-60-25-8-12 1.25s linear infinite;
	// 	}
	// 	.loading_leaf_8:before{
	// 		transform: rotate(240deg) translate(7.92px, 0px);
	// 	}

	// 	.loading_leaf_9{
	// 		animation: opacity-60-25-9-12 1.25s linear infinite;
	// 	}
	// 	.loading_leaf_9:before{
	// 		transform: rotate(270deg) translate(7.92px, 0px);
	// 	}

	// 	.loading_leaf_10{
	// 		animation: opacity-60-25-10-12 1.25s linear infinite;
	// 	}
	// 	.loading_leaf_10:before{
	// 		transform: rotate(300deg) translate(7.92px, 0px);
	// 	}

	// 	.loading_leaf_11{
	// 		animation: opacity-60-25-11-12 1.25s linear infinite;
	// 	}
	// 	.loading_leaf_11:before{
	// 		transform: rotate(330deg) translate(7.92px, 0px);
	// 	}

	// 	.loading_leaf_12{
	// 		animation: opacity-60-25-12-12 1.25s linear infinite;
	// 	}
	// 	.loading_leaf_12:before{
	// 		transform: rotate(360deg) translate(7.92px, 0px);
	// 	}

	// 	@-webkit-keyframes opacity-60-25-0-12 {
	// 	  0% { opacity: 0.25; }
	// 	  0.01% { opacity: 0.25; }
	// 	  0.02% { opacity: 1; }
	// 	  60.01% { opacity: 0.25; }
	// 	  100% { opacity: 0.25; }
	// 	}@-webkit-keyframes opacity-60-25-1-12 {
	// 	  0% { opacity: 0.25; }
	// 	  8.34333% { opacity: 0.25; }
	// 	  8.35333% { opacity: 1; }
	// 	  68.3433% { opacity: 0.25; }
	// 	  100% { opacity: 0.25; }
	// 	}@-webkit-keyframes opacity-60-25-2-12 {
	// 	  0% { opacity: 0.25; }
	// 	  16.6767% { opacity: 0.25; }
	// 	  16.6867% { opacity: 1; }
	// 	  76.6767% { opacity: 0.25; }
	// 	  100% { opacity: 0.25; }
	// 	}@-webkit-keyframes opacity-60-25-3-12 {
	// 	  0% { opacity: 0.25; }
	// 	  25.01% { opacity: 0.25; }
	// 	  25.02% { opacity: 1; }
	// 	  85.01% { opacity: 0.25; }
	// 	  100% { opacity: 0.25; }
	// 	}@-webkit-keyframes opacity-60-25-4-12 {
	// 	  0% { opacity: 0.25; }
	// 	  33.3433% { opacity: 0.25; }
	// 	  33.3533% { opacity: 1; }
	// 	  93.3433% { opacity: 0.25; }
	// 	  100% { opacity: 0.25; }
	// 	}@-webkit-keyframes opacity-60-25-5-12 {
	// 	  0% { opacity: 0.270958333333333; }
	// 	  41.6767% { opacity: 0.25; }
	// 	  41.6867% { opacity: 1; }
	// 	  1.67667% { opacity: 0.25; }
	// 	  100% { opacity: 0.270958333333333; }
	// 	}@-webkit-keyframes opacity-60-25-6-12 {
	// 	  0% { opacity: 0.375125; }
	// 	  50.01% { opacity: 0.25; }
	// 	  50.02% { opacity: 1; }
	// 	  10.01% { opacity: 0.25; }
	// 	  100% { opacity: 0.375125; }
	// 	}@-webkit-keyframes opacity-60-25-7-12 {
	// 	  0% { opacity: 0.479291666666667; }
	// 	  58.3433% { opacity: 0.25; }
	// 	  58.3533% { opacity: 1; }
	// 	  18.3433% { opacity: 0.25; }
	// 	  100% { opacity: 0.479291666666667; }
	// 	}@-webkit-keyframes opacity-60-25-8-12 {
	// 	  0% { opacity: 0.583458333333333; }
	// 	  66.6767% { opacity: 0.25; }
	// 	  66.6867% { opacity: 1; }
	// 	  26.6767% { opacity: 0.25; }
	// 	  100% { opacity: 0.583458333333333; }
	// 	}@-webkit-keyframes opacity-60-25-9-12 {
	// 	  0% { opacity: 0.687625; }
	// 	  75.01% { opacity: 0.25; }
	// 	  75.02% { opacity: 1; }
	// 	  35.01% { opacity: 0.25; }
	// 	  100% { opacity: 0.687625; }
	// 	}@-webkit-keyframes opacity-60-25-10-12 {
	// 	  0% { opacity: 0.791791666666667; }
	// 	  83.3433% { opacity: 0.25; }
	// 	  83.3533% { opacity: 1; }
	// 	  43.3433% { opacity: 0.25; }
	// 	  100% { opacity: 0.791791666666667; }
	// 	}@-webkit-keyframes opacity-60-25-11-12 {
	// 	  0% { opacity: 0.895958333333333; }
	// 	  91.6767% { opacity: 0.25; }
	// 	  91.6867% { opacity: 1; }
	// 	  51.6767% { opacity: 0.25; }
	// 	  100% { opacity: 0.895958333333333; }
	// 	}

	// </style>

/***/ },
/* 135 */
/***/ function(module, exports) {

	module.exports = "\n<section class=\"toast\" v-show=\"show\" _v-4de571aa=\"\">\n\t<section class=\"toast-mask\" _v-4de571aa=\"\"></section>\n\t<section class=\"toast-bd\" _v-4de571aa=\"\">\n\t\t<section class=\"loading\" v-if=\"isload\" _v-4de571aa=\"\">\n\t\t\t<div class=\"loading_leaf loading_leaf_0\" _v-4de571aa=\"\"></div>\n\t\t\t<div class=\"loading_leaf loading_leaf_1\" _v-4de571aa=\"\"></div>\n\t\t\t<div class=\"loading_leaf loading_leaf_2\" _v-4de571aa=\"\"></div>\n\t\t\t<div class=\"loading_leaf loading_leaf_3\" _v-4de571aa=\"\"></div>\n\t\t\t<div class=\"loading_leaf loading_leaf_4\" _v-4de571aa=\"\"></div>\n\t\t\t<div class=\"loading_leaf loading_leaf_5\" _v-4de571aa=\"\"></div>\n\t\t\t<div class=\"loading_leaf loading_leaf_6\" _v-4de571aa=\"\"></div>\n\t\t\t<div class=\"loading_leaf loading_leaf_7\" _v-4de571aa=\"\"></div>\n\t\t\t<div class=\"loading_leaf loading_leaf_8\" _v-4de571aa=\"\"></div>\n\t\t\t<div class=\"loading_leaf loading_leaf_9\" _v-4de571aa=\"\"></div>\n\t\t\t<div class=\"loading_leaf loading_leaf_10\" _v-4de571aa=\"\"></div>\n\t\t\t<div class=\"loading_leaf loading_leaf_11\" _v-4de571aa=\"\"></div>\n\t\t</section>\n\t\t<section class=\"prompt\" v-else=\"\" _v-4de571aa=\"\">\n\t\t\t<i class=\"weui_icon_toast\" _v-4de571aa=\"\"></i>\n\t\t</section>\n\t\t<p class=\"toast-content\" _v-4de571aa=\"\">{{prompt}}</p>\n\t</section>\n</section>\n";

/***/ }
/******/ ]);
//# sourceMappingURL=dist.js.map