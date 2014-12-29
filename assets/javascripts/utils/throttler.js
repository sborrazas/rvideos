module.exports = function (fn, throttleMs) {
  var handler;

  throttleMs = throttleMs || 500;

  return function () {
    var args = arguments;

    if (handler) {
      clearTimeout(handler);
    }

    handler = setTimeout(function () {
      fn.apply(null, args);
    }, throttleMs);
  };
};
