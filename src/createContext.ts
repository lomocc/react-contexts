import * as React from 'react';

export default function<T extends (props: any) => any>(fun: T) {
  const Context = React.createContext<ReturnType<T>>(null as any);
  type ProviderProps = T extends (props: infer P) => any ? P : never;
  const Provider: React.FC<ProviderProps> = function({ children, ...props }) {
    const value: ReturnType<T> = fun(props);
    return React.createElement(Context.Provider, { value }, children);
  };
  return {
    Provider,
    Context,
    Consumer: Context.Consumer,
  };
}
