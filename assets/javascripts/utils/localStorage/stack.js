var localStorage = require("../localStorage.js")
  , JSON = require("../json.js");

module.exports = {
  push: function (stackName, val) {
    var stack = localStorage[stackName]
      , index = null
      , key = null;

    if (stack) {
      stack = JSON.parse(stack);
    }
    else {
      stack = {};
    }

    index = (stack.index || 0) + 1;
    key = [stackName, index].join("_");

    localStorage[key] = JSON.stringify({ val: val, previous: stack.top });
    localStorage[stackName] = JSON.stringify({ top: key, index: index });
  },
  pop: function (stackName) {
    var stack = localStorage[stackName]
      , key = null
      , topKey = null
      , obj = null;

    if (!stack) {
      return;
    }

    stack = JSON.parse(stack);
    topKey = stack.top;

    if (topKey) {
      obj = JSON.parse(localStorage[topKey]);
      localStorage[stackName] = JSON.stringify({
        top: obj.previous,
        index: stack.index
      });
    }
    else {
      localStorage[stackName] = "";
    }

    return obj && obj.val;
  },
  top: function (stackName) {
    var stack = localStorage[stackName]
      , topKey = null;

    if (!stack) {
      return;
    }

    topKey = JSON.parse(stack).top;

    if (topKey) {
      return JSON.parse(localStorage[topKey]).val;
    }
  }
};
