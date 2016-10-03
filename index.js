'use strict';

var redux = require('redux');
var thunk = require('redux-thunk').default;

function reducer(state=0,action) {
  switch (action.type) {
  case 'INCREMENT':
    return state + 1
  case 'DECREMENT':
    return state - 1
  default:
    return state
  }
}

var store = redux.createStore(reducer,redux.applyMiddleware(thunk));

function actionCreator(status) {
  return {type:status};
}

function asyncInc() {
  return function (dispatch) {
    setTimeout(function() {
      dispatch(actionCreator('INCREMENT'));
    },200);
  }
}

function asyncDec() {
  return function (dispatch) {
    setTimeout(function() {
      dispatch(actionCreator('DECREMENT'));
    },200);
  }
}

function asyncDoubleInc() {
  return function (dispatch) {
    dispatch(asyncInc());
    dispatch(asyncInc());
  }
}

module.exports = {
  store,
  reducer,
  actions:{asyncInc,asyncDec,asyncDoubleInc}
};
