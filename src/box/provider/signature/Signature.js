import React, { Component } from 'react';


import HeaderBar from '../dash/HeaderBar';
import NavigationBar from '../dash/NavegationBar';

class Signature extends Component {
    render(){
        return(
            <div>
                <HeaderBar />
                <NavigationBar />
            </div>
        );
    }
}

export default Signature;