import * as React from 'react';
import {FormattedMessage} from 'react-intl';

class App extends React.PureComponent {
    public render(): React.ReactNode {
        return (
            <section>
                <header>
                    <h1>
                        <FormattedMessage id="app.welcome" />
                    </h1>
                </header>
                <p>
                    <FormattedMessage id="app.welcomeText" />
                </p>
            </section>
        );
    }
}

export {App};
