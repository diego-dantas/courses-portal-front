import React, { Component } from 'react';
import PubSub               from 'pubsub-js';
class Analytical extends Component {

    componentDidMount() {
        PubSub.publish('header-label',"Analítico");
    }
    render(){
        return(
            <div>
            </div>
        );
    }
}

export default Analytical;