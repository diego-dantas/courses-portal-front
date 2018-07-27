import React, { Component } from 'react';
import HttpService from '../../../../service/http/HttpService';
import _ from 'lodash';
import NavBar from './../../bar/NavBar';

import { addShoppingCart } from './../../actions/shoppingCart/shoppingCartAction';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';



import { Step, Stepper, StepButton, StepContent,} from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';


//incos
import AddShopping from 'material-ui/svg-icons/action/add-shopping-cart';
import ShoppingCart from 'material-ui/svg-icons/maps/local-grocery-store';


class InformationCourse extends Component {
    constructor(props){
        super(props);
        this.state ={
            courses:    JSON.parse(localStorage.getItem('course')),
            coursePlan:  JSON.parse(localStorage.getItem('coursePlan')),
            student:     JSON.parse(localStorage.getItem('student')),
            course: [],
            stepsCouse: [],
            stepIndex: 0,
            steps: []
        }
        
    }

    componentDidMount(){
        this.buildInformation();
    }
    getValuePlan = (idCourse) => {
        var value = 0;

        this.state.coursePlan.map((row, i) => (
            row.plan._id === this.state.student.plan._id && row.course._id === idCourse ?
                value = row.price : ''
        ));
        return parseFloat(value).toFixed(2);
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
                                <div className="col-md-6 text-center">
                                    <div className="col-md-12">
                                        <img 
                                           alt={this.state.course.name}
                                           src={'http://localhost:8080/api/getFile?name='+this.state.course.wayImage} 
                                           style={{width: '300px', height: '200px'}}/>
                                    </div>
                                    <div className="col-md-12">
                                        <RaisedButton
                                            label="Adicionar ao Carrinho"
                                            labelPosition="before"
                                            secondary={true}
                                            icon={<AddShopping />}
                                            style={{marginTop: '5%', width: '300px'}}
                                            onClick={() => this.props.addShoppingCart(this.state.course)}
                                        />
                                        <RaisedButton
                                            label="Comprar"
                                            labelPosition="before"
                                            primary={true}
                                            icon={<ShoppingCart />}
                                            style={{marginTop: '5%', marginBottom: '5%' , width: '300px'}}
                                        />
                                    </div>
                                </div>
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
                                            R$ {
                                                this.state.student === null ?
                                                    parseFloat(this.state.course.price).toFixed(2) :
                                                    this.getValuePlan(this.state.course._id)
                                            }
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
                            </div>
                            
                        </div>
                        
                    </div>
                </div> 
            </div>
        )
    }
}


const mapStateToProps = store => ({
    store
})


const mapDispatchToProps = dispatch => bindActionCreators({ addShoppingCart }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(InformationCourse);

