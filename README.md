# react-contexts

context is component

## Usage

```js
import React, {Fragment} from "react";
import {createContext} from "react-contexts";

class ThemeComponent {
  state = {
    theme: 'light'
  };

  toggleTheme() {
    this.setState(state => ({
      theme: state.theme === 'light' ? 'dark' : 'light'
    }));
  }
}

const ThemeContext = createContext(ThemeComponent);
const ThemeContext2 = createContext(ThemeComponent);

export default class extends React.Component {
  render() {
    return (
      <ThemeContext.Provider>
        <ThemeContext2.Provider>
          <React.Fragment>
            <ThemeContext.Consumer>
              <ThemeContext2.Consumer>
                {
                  (themeContext, themeContext2) => {
                    return (
                      <React.Fragment>
                        <h1 style={{ color: themeContext.state.theme === 'light' ? '#000' : '#ccc' }}>
                          theme: {themeContext.state.theme}
                        </h1>
                        <button onClick={
                      ()=>{
                        themeContext.toggleTheme();
                      }}
                        >Toggle theme</button>

                        <h1 style={{ color: themeContext2.state.theme === 'light' ? '#000' : '#ccc' }}>
                          theme2: {themeContext2.state.theme}
                        </h1>
                        <button onClick={
                      ()=>{
                        themeContext2.toggleTheme();
                      }}
                        >Toggle theme2</button>
                      </React.Fragment>
                    )
                  }
                }
              </ThemeContext2.Consumer>
            </ThemeContext.Consumer>
          </React.Fragment>
          <React.Fragment>
            <ThemeContext2.Consumer>
              {
                (themeContext2) => {
                  return (
                    <React.Fragment>
                      <h1 style={{ color: themeContext2.state.theme === 'light' ? '#000' : '#ccc' }}>
                        theme2: {themeContext2.state.theme}
                      </h1>
                      <button onClick={
                      ()=>{
                        themeContext2.toggleTheme();
                      }}
                      >Toggle theme2</button>
                    </React.Fragment>
                  )
                }
              }
            </ThemeContext2.Consumer>
          </React.Fragment>
        </ThemeContext2.Provider>
      </ThemeContext.Provider>
    );
  }
}

```
