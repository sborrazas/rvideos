var React = require("react")
  , document = require("./document.js")
  , collection = require("../collection.js");

module.exports = function (componentName, ComponentClass) {
  var elements = document.querySelectorAll(".js-" + componentName);

  collection.each(elements, function (_, el) {
    React.render(React.createElement(ComponentClass, {}), el);
  });
};
