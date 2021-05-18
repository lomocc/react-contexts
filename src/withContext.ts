import hoistNonReactStatic from 'hoist-non-react-statics';
import React, {
  ComponentClass,
  ComponentProps,
  Context,
  ContextType,
  ForwardedRef,
} from 'react';

/**
 * 为组件注入 Context 的装饰器
 *
 * @withContext({ codeSpecs: CodeSpecsContext, ... })
 * class SpecsListApp {
 *   render() {
 *     let { codeSpecs } = this.props;
 *   }
 * }
 */
export default function withContext<T extends { [x: string]: Context<any> }>(
  contextMap: T
) {
  type Props = {
    [P in keyof T]: ContextType<T[P]>;
  };
  for (const name in contextMap) {
    if (contextMap.hasOwnProperty(name)) {
      const contextType = contextMap[name];
      if (!contextType || !contextType.Consumer || !contextType.Provider) {
        // error
        console.error('TypeError', 'please use ContextType', contextType);
      }
    }
  }
  return function<C extends ComponentClass<Props>>(WrappedComponent: C): C {
    const Enhance = React.forwardRef(
      (props: ComponentProps<C>, ref: ForwardedRef<C>) => {
        const contextProps = {} as Props;
        for (const key in contextMap) {
          if (contextMap.hasOwnProperty(key)) {
            const Context = contextMap[key];
            contextProps[key] = React.useContext(Context); // eslint-disable-line react-hooks/rules-of-hooks
          }
        }
        return React.createElement(WrappedComponent, {
          ref,
          ...props,
          ...contextProps,
        });
      }
    );
    Enhance.displayName = `withContext(${Object.keys(contextMap).join(',')})`;
    hoistNonReactStatic(Enhance, WrappedComponent);
    return (React.memo(Enhance) as any) as C;
  };
}
