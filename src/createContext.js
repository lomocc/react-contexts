import React from "react";

module.exports = function createContext(ContextComponent){
  if(typeof ContextComponent !== 'function'){
    let defaultState = ContextComponent || {};
    ContextComponent = function() {
      this.state = defaultState;
    };
  }

  const Context = React.createContext();

  if(!ContextComponent.prototype.setState) {
    ContextComponent.prototype.setState = function(partialState, callback) {
      this.__element.setState(partialState, callback);
    }
  }
  if(!ContextComponent.prototype.forceUpdate) {
    ContextComponent.prototype.forceUpdate = function (callback) {
      this.__element.forceUpdate(callback);
    }
  }

  class Provider extends React.Component {
    constructor(props){
      super();

      const context = new ContextComponent(props);
      const initialState = context.state || {};
      context.__element = this;
      Object.defineProperty(context, 'state', {
        get: function(){
          return this.__element.state;
        }
      });

      this.state = initialState;

      this.__context = context;
    }
    shouldComponentUpdate(nextProps, nextState){
      if(this.__context.shouldComponentUpdate){
        return this.__context.shouldComponentUpdate(nextProps, nextState);
      }
      return true;
    }
    componentWillReceiveProps(nextProps){
      if(this.__context.componentWillReceiveProps){
        this.__context.componentWillReceiveProps(nextProps);
      }
    }
    render(){
      // value = {state, context}
      return (
        <Context.Provider value={{state: this.state, context: this.__context}}>
          { this.props.children }
        </Context.Provider>
      );
    }
  }

  // class Consumer extends React.Component {
  //   static defaultProps = {
  //     __contexts: []
  //   };
  //   render(){
  //     let { children, __contexts } = this.props;
  //     let consumerRender;
  //     if(React.isValidElement(children)){
  //       consumerRender = function(context) {
  //         return React.cloneElement(children, {__contexts: __contexts.concat([context])});
  //       };
  //     }else{
  //       consumerRender = function(context) {
  //         return children.apply(null, __contexts.concat([context]));
  //       };
  //     }
  //     return (
  //       <Context.Consumer>{consumerRender}</Context.Consumer>
  //     );
  //   }
  // }

  return {
    Provider,
    // ComposedConsumer,
    Consumer: Context.Consumer
  };
};
