var createContext = require('./lib/createContext');
var Proxy = require('./lib/Proxy');
createContext.createContext = createContext;
createContext.Proxy = Proxy;
module.exports = createContext;
