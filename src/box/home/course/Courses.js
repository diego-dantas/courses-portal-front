import React, { Component } from 'react';

import HeaderBar from '../bar/HeaderBar';

class Courses extends Component {

    constructor(props) {
        super(props);
        this.state = {course: {name: '-'}, stepIndex: 0,steps: []};
        this.fncGetInformation();
    };

    fncGetInformation = () => {
        console.log(this.props.match.params.option);
        /*
        HttpService.make().get('/course/information/' + this.props.match.params.id)
                   .then(success =>
                    {
                        this.setState({course: success});
                        this.mountSteps(success.steps);
                    })
                    .catch(error =>
                    {
                        history.push('/not-found/course');
                    });
        
        */
    };
    
    render(){
        return(
            <div>
                <HeaderBar />
                <h1>
                    to aqui
                </h1>
            </div>
        );
    }
}

export default Courses;