import * as React from 'react';
import { useContext, useMemo, useState } from 'react';
import 'react-app-polyfill/ie11';
import * as ReactDOM from 'react-dom';
import { createContext } from '../.';

function AppContext(props: { initial: number }) {
  const [value, setState] = useState(props.initial);
  return useMemo(
    () => ({
      value,
      increase() {
        setState(value => value + 1);
      },
      decrease() {
        setState(value => value - 1);
      },
    }),
    [value]
  );
}

const { Context, Provider } = createContext(AppContext);

function Child() {
  const context = useContext(Context);
  return (
    <>
      <div>{context.value}</div>
      <button onClick={context.increase}>+</button>
      <button onClick={context.decrease}>-</button>
    </>
  );
}

function Parent() {
  return (
    <Provider initial={133}>
      <Child />
    </Provider>
  );
}

const App = () => {
  return (
    <div>
      <Parent />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
