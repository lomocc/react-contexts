var React = require('react');
var Consumers = require('./lib/Consumers');
var Providers = require('./lib/Providers');
var createContext = require('./lib/createContext');

createContext.Providers = Providers;
createContext.Consumers = Consumers;
createContext.createContext = createContext;
createContext.React = React;

module.exports = createContext;
