import { Meta, Story } from '@storybook/react';
import * as React from 'react';
import { useContext, useMemo, useState } from 'react';
import { createContext } from '../src';

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

const meta: Meta = {
  title: 'Welcome',
  component: Parent,
  argTypes: {
    children: {
      control: {
        type: 'text',
      },
    },
  },
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

const Template: Story = () => <Parent />;

// By passing using the Args format for exported stories, you can control the props for a component for reuse in a test
// https://storybook.js.org/docs/react/workflows/unit-testing
export const Default = Template.bind({});

Default.args = {};
