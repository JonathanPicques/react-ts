import * as React from 'react';
import * as ReactDOM from 'react-dom';
import registerServiceWorker from './offline';

import {App} from './containers/App/App';
import {Provider} from 'react-redux';
import {store} from './containers/App/AppRedux';
import {LocaleProvider} from './containers/Locale/LocaleProvider';

ReactDOM.render(
    <Provider store={store}>
        <LocaleProvider>
            <App />
        </LocaleProvider>
    </Provider>,
    document.getElementById('root') as HTMLElement,
);
registerServiceWorker();
