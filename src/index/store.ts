import {
    createStore,
    combineReducers,
    applyMiddleware
} from 'redux';

import reducers from './reducers';
import { initDataType } from './actions';
import thunk, { ThunkMiddleware } from 'redux-thunk';
import { createLogger } from 'redux-logger'

const middleware = [ thunk as ThunkMiddleware ]

if (process.env.NODE_ENV !== 'production') {
    middleware.push(createLogger())
}

const initData: initDataType = {
    from: '北京',
    to: '上海',

    isCitySelectorVisible: false,
    currentSelectingLeftCity: false,
    cityData: null,
    isLoadingCityData: false,
    isDateSelectorVisible: false,
    departDate: Date.now(),
    highSpeed: false,
}

export default createStore(
    combineReducers(reducers),
    initData,
    applyMiddleware(...middleware)
);
