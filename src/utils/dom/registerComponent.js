var React = require("react")
  , ReactDOM = require("react-dom")
  , document = require("./document.js")
  , collection = require("../collection.js");

module.exports = function (componentName, ComponentClass) {
  var elements = document.querySelectorAll(".js-" + componentName);

  collection.each(elements, function (_, el) {
    ReactDOM.render(React.createElement(ComponentClass, {}), el);
  });
};
