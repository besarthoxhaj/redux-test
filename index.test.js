'use strict';

var test = require('tape');
var redux = require('redux');
var thunk = require('redux-thunk').default;
var syncFlow = require('sync-flow');
var app = require('./index.js');

test(`the app should start correctly`, t => {

  var store = redux.createStore(app.reducer,redux.applyMiddleware(thunk));

  const exec = [
    () => {
      t.equal(store.getState(),0,'correct inital state');
      store.dispatch(app.actions.asyncInc());
    },
    () => {
      t.equal(store.getState(),1,'correct state');
      store.dispatch(app.actions.asyncDoubleInc());
    },
    () => {
      t.equal(store.getState(),3,'correct state');
    },
    () => {
      t.end();
    }
  ];

  syncFlow(exec,t.end,500);
});
