import React, { Component } from 'react';
import HttpService from '../../../../service/http/HttpService';

import NavBar from './../../bar/NavBar';

import { Step, Stepper, StepButton, StepContent,} from 'material-ui/Stepper';


export default class InformationCourse extends Component {
    constructor(props){
        super(props);
        this.state ={
            stepsCouse: []
        }
        this.buildInformation();
    }

    buildInformation = () => {
        HttpService.make()
                   .get('/getCourseID?id=' + this.props.match.params.id)
                   .then(success => {
                       this.setState({stepsCouse: success.data});
                       console.log(this.state.stepsCouse[0].course.name)
                   })
                   .catch(error => {
                       console.log('Erro ao buscar o curso por id ' + error);
                   })
    }
    
    render(){
        return(
            <div>
                <NavBar/>
                <br/>
                <br/>
                <br/>                  
                <br/>   
            </div>
        )
    }
}