import React from 'react';
import ReactDOM from 'react-dom';

//import HttpService from './service/http/HttpService';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { BrowserRouter, Router, Route } from 'react-router-dom'

//import of components
import App from './App';
import NavegationBar from './box/provider/dash/NavegationBar';
import Dash from './box/provider/dash/Dash';
import About from './box/provider/about/About';
import Customization from './box/provider/customization/customization'

import history from './service/router/history'

import registerServiceWorker from './registerServiceWorker';
import injectTapEventPlugin from 'react-tap-event-plugin';


injectTapEventPlugin();
const Main = () => (
    <MuiThemeProvider>
        <BrowserRouter>
            <Router history={history}>
                <div>
                    <Route exact path='/' component={App} />
                    <Route exact path='/provider' component={Dash} />
                    <Route exact path='/provider/about' component={About} />
                    <Route exact path='/provider/customization' component={Customization} />
                </div>
            </Router>
        </BrowserRouter>
    </MuiThemeProvider>
);

ReactDOM.render(<Main />, document.getElementById('root'));

registerServiceWorker();

