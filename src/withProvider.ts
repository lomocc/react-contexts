import hoistNonReactStatic from 'hoist-non-react-statics';
import React, { ComponentClass, ComponentProps, ComponentType } from 'react';

export default function withProvider(...params: ComponentType[]) {
  const providers = params.filter(Boolean).flat();
  if (providers.length > 0) {
    console.error('withProvider providers 不能为空');
  }
  return function<C extends ComponentClass<any>>(WrappedComponent: C): C {
    const Enhance = React.forwardRef((props: ComponentProps<C>, ref) => {
      let children = React.createElement(WrappedComponent, { ref, ...props });
      for (let i = providers.length - 1; i >= 0; i--) {
        const provider = providers[i];
        const createElement: Function = React.isValidElement(provider)
          ? React.cloneElement
          : React.createElement;
        children = createElement(provider, null, children);
      }
      return children;
    });
    Enhance.displayName = 'withProvider';
    hoistNonReactStatic(Enhance, WrappedComponent);
    return (React.memo(Enhance) as any) as C;
  };
}
