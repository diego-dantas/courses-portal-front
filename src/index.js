import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Store } from './box/front/store';


//import HttpService from './service/http/HttpService';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { BrowserRouter, Router, Route } from 'react-router-dom'
// import { BrowserRouter, Router, Route, Redirect } from 'react-router-dom'

//import of components
import App from './App';

//import of home
//import Courses from './box/home/course/Courses';
import ListCourses from './box/front/course/ListCourses';
import InformationCourse from './box/front/course/component/InformationCourse'
import Search from './box/front/bar/Search';

//import of dash provider
import Dash from './box/provider/dash/Dash';

//import of student profile
import StudentDashboard from './box/front/student/dashboard/StudentDashboard'

//import of shopping cart
import ShoppingCart from './box/front/shoppingCart/ShoppingCart'
import Checkout from './box/front/shoppingCart/Checkout'

import history from './service/router/history'

import registerServiceWorker from './registerServiceWorker';
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render = {props => (
        (<Component {...props}/>)
        // localStorage.getItem('auth-token') !== null ?
        // (<Component {...props}/>) : (<Redirect to={{pathname: '/login/provider'}}/>)
    )}/>
);

const Main = () => (
    <Provider store={Store}>
        <MuiThemeProvider>
            <BrowserRouter>
                <Router history={history}>
                    <div>
                        <Route exact path='/' component={App} />
                        <Route exact path='/courses/:cat/:subCat/:pag' component={ListCourses} />
                        <Route exact path='/courses/:cat/:subCat' component={ListCourses} />
                        <Route exact path='/course/:course/:id' component={InformationCourse} />
                        <Route exact path='/search/:search' component={Search} />
                        <Route exact path='/shopping-cart' component={ShoppingCart} />
                        <Route exact path='/checkout' component={Checkout} />
                        <PrivateRoute path='/provider/:way' component={Dash} />
                        <PrivateRoute path='/student/:way' component={StudentDashboard}/>
                        {/* <Route exact path='/provider/about' component={About} />
                        <Route exact path='/provider/customization' component={Customization} />
                        <Route exact path='/provider/login' component={Login}/>
                        <Route exact path='/provider/marketing' component={Marketing}/>
                        <Route exact path='/provider/course' component={TabsCourses}/>
                        <Route exact path='/provider/signature' component={Signature}/>
                        <Route exact path='/provider/financial' component={Financial}/>
                        <Route exact path='/provider/analytical' component={Analytical}/> */}
                    </div>
                </Router>
            </BrowserRouter>
        </MuiThemeProvider>
    </Provider>
);

ReactDOM.render(<Main />, document.getElementById('root'));

registerServiceWorker();

