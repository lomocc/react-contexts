import React from "react";

module.exports = function ({children, ...consumers}){
  let contexts = {};
  let consumerElement;
  for(let name in consumers){
    let Consumer = consumers[name];
    let lastElement = consumerElement;
    consumerElement = React.createElement(Consumer, {
      children: function(context) {
        contexts = {...contexts, [name]: context};
        return lastElement || React.cloneElement(children, {...contexts});
      }
    });
  }
  return consumerElement;
}
