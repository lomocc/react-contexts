import React from "react";

module.exports = function ({children, ...consumers}){
  let contexts = {};
  let element;
  for(let name in consumers){
    let Consumer = consumers[name];
    let lastElement = element;
    element = React.createElement(Consumer, {
      children: function(context) {
        contexts = {...contexts, [name]: context};
        return lastElement?React.cloneElement(lastElement):React.cloneElement(children, {...contexts});
      }
    });
  }
  return element;
}
