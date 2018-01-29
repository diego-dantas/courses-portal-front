import React, { Component } from 'react';


import HeaderBar from '../dash/HeaderBar';
import NavigationBar from '../dash/NavegationBar';

class Courses extends Component {
    render(){
        return(
            <div>
                <HeaderBar />
                <NavigationBar />
            </div>
        );
    }
}

export default Courses;