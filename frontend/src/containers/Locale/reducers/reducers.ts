import {chainReducers} from '../../../utils/redux/chainReducers';
import {localeChangeReducer} from './change';

interface LocaleReduxState {
    locale: string;
}

const initialState: LocaleReduxState = {
    locale: 'en',
};

const localeReducer = chainReducers(initialState, [localeChangeReducer]);

export {localeReducer};
export {LocaleReduxState};
