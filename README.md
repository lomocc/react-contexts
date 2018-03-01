# react-contexts

react-contexts 组合工具

## Usage

```js
import {createContext, Providers, Consumers} from 'react-contexts';

const { Provider: ThemeProvider, Consumer: ThemeConsumer } = createReactContext({theme: 'light'});
const { Provider: LangProvider, Consumer: LangConsumer } = createReactContext({lang: 'en'});

// (ThemeProvider -> (LangProvider -> (Fragment)))
class App extends React.Component {
  render() {
    return (
      <Providers>
        <ThemeProvider/>
        <LangProvider/>
        <Fragment>
          <Consumers>
            <ThemeConsumer/>
            <LangConsumer/>
            {
              (themeContext, langContext) => {
                return (
                  <Fragment>
                    <h1 style={{ color: themeContext.state.theme === 'light' ? '#000' : '#ccc' }}>
                      lang: {langContext.state.lang}
                    </h1>
                    <button onClick={
                      ()=>{
                        themeContext.setState(state => ({
                          theme: state.theme === 'light' ? 'dark' : 'light'
                        }));
                      }}
                    >Toggle theme</button>
                    <button onClick={
                      ()=>{
                        langContext.setState(state => ({
                          lang: state.lang === 'en' ? 'cn' : 'en'
                        }));
                      }}
                    >
                      Toggle lang
                    </button>
                  </Fragment>
                )
              }
            }
          </Consumers>
        </Fragment>
      </Providers>
    );
  }
}
```
