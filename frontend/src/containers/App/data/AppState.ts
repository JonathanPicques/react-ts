import {composeWithDevTools} from 'redux-devtools-extension';
import {createStore, combineReducers} from 'redux';

import {LocaleReduxState, localeReducer} from '../../Locale/data/reducers/reducers';

interface AppReduxState {
    locale: LocaleReduxState;
}

const store = createStore(
    combineReducers({
        locale: localeReducer,
    }),
    composeWithDevTools(),
);

export {store};
export {AppReduxState};
