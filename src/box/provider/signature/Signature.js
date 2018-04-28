import React, { Component } from 'react';
import ListStudents from './ListStudents';

import PubSub from 'pubsub-js';

class Signature extends Component {

    componentDidMount()
    {
        PubSub.publish('header-label',"Assinaturas")
    };

    render(){
        return(
            <div>
                <ListStudents />
            </div>
        );
    }
}

export default Signature;