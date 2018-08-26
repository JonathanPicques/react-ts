import {Action} from 'redux';

import {LocaleReduxState} from './reducers';
import {LocaleChangeAction, localeChangeAction} from '../actions/change';

const localeChangeReducer = (state: LocaleReduxState, action: Action) => {
    switch (action.type) {
        case localeChangeAction: {
            return {...state, ...{locale: (action as LocaleChangeAction).payload.locale}};
        }
        default:
            return state;
    }
};

export {localeChangeReducer};
