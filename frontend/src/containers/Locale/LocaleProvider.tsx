import * as React from 'react';
import * as reactIntlFr from 'react-intl/locale-data/fr';
import * as reactIntlEn from 'react-intl/locale-data/en';
import {connect} from 'react-redux';
import {addLocaleData, IntlProvider} from 'react-intl';
import {bindActionCreators, Dispatch} from 'redux';

import fr from './data/services/translations/fr';
import en from './data/services/translations/en';
import {AppReduxState} from '../App/data/AppState';
import {LocaleReduxState} from './data/reducers/reducers';
import {localeChangeActionCreator} from './data/actions/change';

const locales = {fr, en};
addLocaleData([...reactIntlFr, ...reactIntlEn]);

interface LocaleProviderProps {}

interface LocaleProviderStateProps {
    locale: LocaleReduxState;
}

interface LocaleProviderDispatchProps {
    changeLocale: (locale: string) => void;
}

interface LocaleProviderCombinedProps extends LocaleProviderProps, LocaleProviderStateProps, LocaleProviderDispatchProps {}

class LocaleProvider extends React.Component<LocaleProviderCombinedProps> {
    public render(): React.ReactNode {
        return (
            <IntlProvider key={this.props.locale.locale} locale={this.props.locale.locale} messages={locales[this.props.locale.locale]}>
                {this.props.children}
            </IntlProvider>
        );
    }
}

function mapStateToProps(state: AppReduxState): LocaleProviderStateProps {
    return {
        locale: state.locale,
    };
}

function mapDispatchToProps(dispatch: Dispatch): LocaleProviderDispatchProps {
    return {
        changeLocale: bindActionCreators(localeChangeActionCreator, dispatch),
    };
}

const Component = connect(
    mapStateToProps,
    mapDispatchToProps,
)(LocaleProvider);

export {Component as LocaleProvider};
