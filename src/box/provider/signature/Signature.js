import React, { Component } from 'react';

import NavigationBar from '../dash/NavegationBar';
import ListStudents from './ListStudents';

import PubSub from 'pubsub-js';

class Signature extends Component {

    componentDidMount()
    {
        PubSub.publish('header-label',"Matriculas")
    };

    render(){
        return(
            <div>
                <NavigationBar />
                <ListStudents />
            </div>
        );
    }
}

export default Signature;