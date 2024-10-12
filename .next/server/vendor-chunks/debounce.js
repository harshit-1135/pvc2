/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/debounce";
exports.ids = ["vendor-chunks/debounce"];
exports.modules = {

/***/ "(ssr)/./node_modules/debounce/index.js":
/*!****************************************!*\
  !*** ./node_modules/debounce/index.js ***!
  \****************************************/
/***/ ((module) => {

eval("function debounce(function_, wait = 100, options = {}) {\n\tif (typeof function_ !== 'function') {\n\t\tthrow new TypeError(`Expected the first parameter to be a function, got \\`${typeof function_}\\`.`);\n\t}\n\n\tif (wait < 0) {\n\t\tthrow new RangeError('`wait` must not be negative.');\n\t}\n\n\t// TODO: Deprecate the boolean parameter at some point.\n\tconst {immediate} = typeof options === 'boolean' ? {immediate: options} : options;\n\n\tlet storedContext;\n\tlet storedArguments;\n\tlet timeoutId;\n\tlet timestamp;\n\tlet result;\n\n\tfunction run() {\n\t\tconst callContext = storedContext;\n\t\tconst callArguments = storedArguments;\n\t\tstoredContext = undefined;\n\t\tstoredArguments = undefined;\n\t\tresult = function_.apply(callContext, callArguments);\n\t\treturn result;\n\t}\n\n\tfunction later() {\n\t\tconst last = Date.now() - timestamp;\n\n\t\tif (last < wait && last >= 0) {\n\t\t\ttimeoutId = setTimeout(later, wait - last);\n\t\t} else {\n\t\t\ttimeoutId = undefined;\n\n\t\t\tif (!immediate) {\n\t\t\t\tresult = run();\n\t\t\t}\n\t\t}\n\t}\n\n\tconst debounced = function (...arguments_) {\n\t\tif (storedContext && this !== storedContext) {\n\t\t\tthrow new Error('Debounced method called with different contexts.');\n\t\t}\n\n\t\tstoredContext = this; // eslint-disable-line unicorn/no-this-assignment\n\t\tstoredArguments = arguments_;\n\t\ttimestamp = Date.now();\n\n\t\tconst callNow = immediate && !timeoutId;\n\n\t\tif (!timeoutId) {\n\t\t\ttimeoutId = setTimeout(later, wait);\n\t\t}\n\n\t\tif (callNow) {\n\t\t\tresult = run();\n\t\t}\n\n\t\treturn result;\n\t};\n\n\tdebounced.clear = () => {\n\t\tif (!timeoutId) {\n\t\t\treturn;\n\t\t}\n\n\t\tclearTimeout(timeoutId);\n\t\ttimeoutId = undefined;\n\t};\n\n\tdebounced.flush = () => {\n\t\tif (!timeoutId) {\n\t\t\treturn;\n\t\t}\n\n\t\tdebounced.trigger();\n\t};\n\n\tdebounced.trigger = () => {\n\t\tresult = run();\n\n\t\tdebounced.clear();\n\t};\n\n\treturn debounced;\n}\n\n// Adds compatibility for ES modules\nmodule.exports.debounce = debounce;\n\nmodule.exports = debounce;\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvZGVib3VuY2UvaW5kZXguanMiLCJtYXBwaW5ncyI6IkFBQUEscURBQXFEO0FBQ3JEO0FBQ0EsOEVBQThFLGlCQUFpQjtBQUMvRjs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxRQUFRLFdBQVcsa0NBQWtDLG9CQUFvQjs7QUFFekU7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLElBQUk7QUFDSjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHdCQUF3QjtBQUN4QjtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLHVCQUF1Qjs7QUFFdkIiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9wdmMvLi9ub2RlX21vZHVsZXMvZGVib3VuY2UvaW5kZXguanM/MjNmNyJdLCJzb3VyY2VzQ29udGVudCI6WyJmdW5jdGlvbiBkZWJvdW5jZShmdW5jdGlvbl8sIHdhaXQgPSAxMDAsIG9wdGlvbnMgPSB7fSkge1xuXHRpZiAodHlwZW9mIGZ1bmN0aW9uXyAhPT0gJ2Z1bmN0aW9uJykge1xuXHRcdHRocm93IG5ldyBUeXBlRXJyb3IoYEV4cGVjdGVkIHRoZSBmaXJzdCBwYXJhbWV0ZXIgdG8gYmUgYSBmdW5jdGlvbiwgZ290IFxcYCR7dHlwZW9mIGZ1bmN0aW9uX31cXGAuYCk7XG5cdH1cblxuXHRpZiAod2FpdCA8IDApIHtcblx0XHR0aHJvdyBuZXcgUmFuZ2VFcnJvcignYHdhaXRgIG11c3Qgbm90IGJlIG5lZ2F0aXZlLicpO1xuXHR9XG5cblx0Ly8gVE9ETzogRGVwcmVjYXRlIHRoZSBib29sZWFuIHBhcmFtZXRlciBhdCBzb21lIHBvaW50LlxuXHRjb25zdCB7aW1tZWRpYXRlfSA9IHR5cGVvZiBvcHRpb25zID09PSAnYm9vbGVhbicgPyB7aW1tZWRpYXRlOiBvcHRpb25zfSA6IG9wdGlvbnM7XG5cblx0bGV0IHN0b3JlZENvbnRleHQ7XG5cdGxldCBzdG9yZWRBcmd1bWVudHM7XG5cdGxldCB0aW1lb3V0SWQ7XG5cdGxldCB0aW1lc3RhbXA7XG5cdGxldCByZXN1bHQ7XG5cblx0ZnVuY3Rpb24gcnVuKCkge1xuXHRcdGNvbnN0IGNhbGxDb250ZXh0ID0gc3RvcmVkQ29udGV4dDtcblx0XHRjb25zdCBjYWxsQXJndW1lbnRzID0gc3RvcmVkQXJndW1lbnRzO1xuXHRcdHN0b3JlZENvbnRleHQgPSB1bmRlZmluZWQ7XG5cdFx0c3RvcmVkQXJndW1lbnRzID0gdW5kZWZpbmVkO1xuXHRcdHJlc3VsdCA9IGZ1bmN0aW9uXy5hcHBseShjYWxsQ29udGV4dCwgY2FsbEFyZ3VtZW50cyk7XG5cdFx0cmV0dXJuIHJlc3VsdDtcblx0fVxuXG5cdGZ1bmN0aW9uIGxhdGVyKCkge1xuXHRcdGNvbnN0IGxhc3QgPSBEYXRlLm5vdygpIC0gdGltZXN0YW1wO1xuXG5cdFx0aWYgKGxhc3QgPCB3YWl0ICYmIGxhc3QgPj0gMCkge1xuXHRcdFx0dGltZW91dElkID0gc2V0VGltZW91dChsYXRlciwgd2FpdCAtIGxhc3QpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR0aW1lb3V0SWQgPSB1bmRlZmluZWQ7XG5cblx0XHRcdGlmICghaW1tZWRpYXRlKSB7XG5cdFx0XHRcdHJlc3VsdCA9IHJ1bigpO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdGNvbnN0IGRlYm91bmNlZCA9IGZ1bmN0aW9uICguLi5hcmd1bWVudHNfKSB7XG5cdFx0aWYgKHN0b3JlZENvbnRleHQgJiYgdGhpcyAhPT0gc3RvcmVkQ29udGV4dCkge1xuXHRcdFx0dGhyb3cgbmV3IEVycm9yKCdEZWJvdW5jZWQgbWV0aG9kIGNhbGxlZCB3aXRoIGRpZmZlcmVudCBjb250ZXh0cy4nKTtcblx0XHR9XG5cblx0XHRzdG9yZWRDb250ZXh0ID0gdGhpczsgLy8gZXNsaW50LWRpc2FibGUtbGluZSB1bmljb3JuL25vLXRoaXMtYXNzaWdubWVudFxuXHRcdHN0b3JlZEFyZ3VtZW50cyA9IGFyZ3VtZW50c187XG5cdFx0dGltZXN0YW1wID0gRGF0ZS5ub3coKTtcblxuXHRcdGNvbnN0IGNhbGxOb3cgPSBpbW1lZGlhdGUgJiYgIXRpbWVvdXRJZDtcblxuXHRcdGlmICghdGltZW91dElkKSB7XG5cdFx0XHR0aW1lb3V0SWQgPSBzZXRUaW1lb3V0KGxhdGVyLCB3YWl0KTtcblx0XHR9XG5cblx0XHRpZiAoY2FsbE5vdykge1xuXHRcdFx0cmVzdWx0ID0gcnVuKCk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHJlc3VsdDtcblx0fTtcblxuXHRkZWJvdW5jZWQuY2xlYXIgPSAoKSA9PiB7XG5cdFx0aWYgKCF0aW1lb3V0SWQpIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHRjbGVhclRpbWVvdXQodGltZW91dElkKTtcblx0XHR0aW1lb3V0SWQgPSB1bmRlZmluZWQ7XG5cdH07XG5cblx0ZGVib3VuY2VkLmZsdXNoID0gKCkgPT4ge1xuXHRcdGlmICghdGltZW91dElkKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0ZGVib3VuY2VkLnRyaWdnZXIoKTtcblx0fTtcblxuXHRkZWJvdW5jZWQudHJpZ2dlciA9ICgpID0+IHtcblx0XHRyZXN1bHQgPSBydW4oKTtcblxuXHRcdGRlYm91bmNlZC5jbGVhcigpO1xuXHR9O1xuXG5cdHJldHVybiBkZWJvdW5jZWQ7XG59XG5cbi8vIEFkZHMgY29tcGF0aWJpbGl0eSBmb3IgRVMgbW9kdWxlc1xubW9kdWxlLmV4cG9ydHMuZGVib3VuY2UgPSBkZWJvdW5jZTtcblxubW9kdWxlLmV4cG9ydHMgPSBkZWJvdW5jZTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/debounce/index.js\n");

/***/ })

};
;