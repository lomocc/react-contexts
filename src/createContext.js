import React, {createContext} from "react";

module.exports = function(defaultValue, calculateChangedBits){
  const Context = createContext(defaultValue, calculateChangedBits);
  class Provider extends React.Component {
    state = defaultValue;
    __context = {setState: this::this.setState, forceUpdate: this::this.setState};
    render() {
      return (
        <Context.Provider value={{...this.__context, state: this.state}}>
          {this.props.children}
        </Context.Provider>
      );
    }
  }
  Provider.Provider = Provider;
  Provider.Consumer = Context.Consumer;
  return Provider;
}
