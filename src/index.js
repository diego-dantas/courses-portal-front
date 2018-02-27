import React from 'react';
import ReactDOM from 'react-dom';

//import HttpService from './service/http/HttpService';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { BrowserRouter, Router, Route } from 'react-router-dom'

//import of components
import App from './App';
import Dash from './box/provider/dash/Dash';
import About from './box/provider/about/About';
import Customization from './box/provider/customization/customization'
import Login from './box/provider/dash/Login';
import Marketing from './box/provider/marketing/Marketing';
import Courses from './box/provider/courses/Courses';
import Signature from './box/provider/signature/Signature';
import Financial from './box/provider/financial/Financial';
import Analytical from './box/provider/analytical/Analytical';
import TabsCourses from './box/provider/courses/TabsCourses';

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
                    <Route exact path='/provider/login' component={Login}/>
                    <Route exact path='/provider/marketing' component={Marketing}/>
                    <Route exact path='/provider/course' component={TabsCourses}/>
                    <Route exact path='/provider/signature' component={Signature}/>
                    <Route exact path='/provider/financial' component={Financial}/>
                    <Route exact path='/provider/analytical' component={Analytical}/>
                </div>
            </Router>
        </BrowserRouter>
    </MuiThemeProvider>
);

ReactDOM.render(<Main />, document.getElementById('root'));

registerServiceWorker();

