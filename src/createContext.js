import React from "react";

module.exports = function createContext(Context){
  const {Provider, Consumer} = React.createContext();

  if(!Context.prototype.setState) {
    Context.prototype.setState = function(partialState, callback) {
      this.__element.setState(partialState, callback);
    }
  }
  if(!Context.prototype.forceUpdate) {
    Context.prototype.forceUpdate = function (callback) {
      this.__element.forceUpdate(callback);
    }
  }

  class ContextProvider extends React.Component {
    constructor(props){
      super();

      const context = new Context(props);
      const defaultState = context.state || {};
      context.__element = this;
      Object.defineProperty(context, 'state', {
        get: function(){
          return this.__element.state;
        }
      });

      this.state = defaultState;

      this.__context = context;
      this.__contextCopy = Object.create(context);
      this.__value = null;
    }
    render(){
      this.__value = this.__value==this.__context?this.__contextCopy:this.__context; // value forceUpdate
      return (
        <Provider value={ this.__value }>
          { this.props.children }
        </Provider>
      );
    }
  }

  Consumer.Provider = ContextProvider;
  ContextProvider.context = Consumer;
  return Consumer;
};
