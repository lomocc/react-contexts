import React from "react";

module.exports = function Consumers({children}){
  let elements = children.slice();
  let lastChild = elements.pop();
  let contexts = [];
  return elements.reduceRight((lastElement, element) => React.cloneElement(element, {
    children(context) {
      contexts.push(context);
      if (lastElement)
        return lastElement;

      let children = lastChild.apply(null, contexts);
      contexts.length = 0;
      return children;
    }
  }), null);
}
