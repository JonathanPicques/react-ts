import {Action} from 'redux';

interface LocaleChangeAction extends Action {
    payload: {
        locale: string;
    };
}

const localeChangeAction = '@@locale/CHANGE';

const localeChangeActionCreator = (locale: string): LocaleChangeAction => {
    return {type: localeChangeAction, payload: {locale}};
};

export {LocaleChangeAction};
export {localeChangeAction};
export {localeChangeActionCreator};
