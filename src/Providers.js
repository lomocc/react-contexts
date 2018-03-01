import React from "react";

module.exports = function Providers({children}){
  let elements = children.slice();
  let lastChild = elements.pop();
  return elements.reduceRight((lastElement, element) => React.cloneElement(element, {children: lastElement}), lastChild);
}
