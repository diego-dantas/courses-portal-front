import React, { Component } from 'react';
import HttpService from '../../../../service/http/HttpService';
import _ from 'lodash';
import NavBar from './../../bar/NavBar';

import { Step, Stepper, StepButton, StepContent,} from 'material-ui/Stepper';


export default class InformationCourse extends Component {
    constructor(props){
        super(props);
        this.state ={
            courses:    JSON.parse(localStorage.getItem('course')),
            course: [],
            stepsCouse: [],
            stepIndex: 0,
            steps: []
        }
        
    }

    componentDidMount(){
        this.buildInformation();
    }

    buildInformation = () => {
        HttpService.make()
                   .get('/getCourseID?id=' + this.props.match.params.id)
                   .then(success => {
                        console.log(success.data);
                        this.setState({stepsCouse: success.data});
                        this.setState({course: success.data[0].course});
                        this.mountSteps(success.data);
                   })
                   .catch(error => {
                       console.log('Erro ao buscar o curso por id ' + error);
                   })
    }

    mountSteps = (newSteps) =>
    {
        let steps = _.sortBy(newSteps, ['stepsOrder']).map((step, index) =>
            <Step key={index}>
                <StepButton onClick={() => this.setState({stepIndex: index})}>
                    <div style={{color:'rgba(255, 255, 255, 1)'}}>{step.name}</div>
                </StepButton>
                <StepContent>
                    <p>
                        {step.description}
                    </p>

                </StepContent>
            </Step>
        );

        this.setState({'steps': steps});
    };
    
    render(){
        return(
            <div>
                <NavBar/>
                <br/>
                <br/>              
                <div className="curse-home">
                    <div style={{backgroundColor: "rgba(0,0,0,0.5)", color: "#fff", padding: '5% 0 5% 0'}}>
                        <div className="container">
                            <div className="row">
                                <div className="col-md-6">
                                    <h2 className="title">{this.state.course.name}</h2>
                                    {/*ABOUT*/}
                                    <div>
                                        <h4 className="headerInfoCurse">Descritivo do curso</h4>
                                        <div className="pagraf">
                                            {' ' +this.state.course.description}
                                        </div>

                                    </div>
                                    <div>
                                        <h4 className="headerInfoCurse">Objetivo do curso</h4>
                                        <div className="pagraf">
                                            {this.state.course.objective}
                                        </div>

                                    </div>
                                    <div>
                                        <h4 className="headerInfoCurse">Carga horária</h4>
                                        <div className="pagraf">
                                            {this.state.course.hours + ' horas'}
                                        </div>                                      
                                    </div>
                                    <div>
                                        <h4 className="headerInfoCurse">Valor do Curso</h4>
                                        <div className="pagraf">
                                            {'R$ ' + this.state.course.price}
                                        </div>                                      
                                    </div>
                                    {/*STEPS*/}
                                    <h4 className="headerInfoCurse">Confira a grade do curso</h4>
                                    <div style={{width: '100%', margin: 'auto'}}>
                                        <Stepper
                                            activeStep={this.state.stepIndex}
                                            linear={false}
                                            orientation="vertical">
                                            {this.state.steps}
                                        </Stepper>
                                    </div>
                                </div>
                                <div className="col-md-6 text-center">
                                    <img 
                                        alt={this.state.course.name}
                                        src={'http://localhost:8080/api/getFile?name='+this.state.course.wayImage} 
                                        style={{width: '300px', height: '200px'}}/>
                                </div>
                            </div>
                            
                        </div>
                        
                    </div>
                </div> 
            </div>
        )
    }
}