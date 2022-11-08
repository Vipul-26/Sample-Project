import { combineReducers, createStore, applyMiddleware } from 'redux';
import { memberReducer } from '../reducers';
import createSagaMiddleware from "redux-saga";
import rootSaga from "../sagas/index";
import { composeWithDevTools } from 'redux-devtools-extension';

const sagaMiddleware = createSagaMiddleware();

const reducer = combineReducers({ members: memberReducer });

const store = createStore(reducer, composeWithDevTools(applyMiddleware(sagaMiddleware)));

sagaMiddleware.run(rootSaga);

export default store;
