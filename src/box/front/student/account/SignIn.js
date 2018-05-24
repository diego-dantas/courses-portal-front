import React, { Component } from 'react';
import HttpService from '../../../../service/http/HttpService';
import history from  './../../../../service/router/history'


import Dialog         from 'material-ui/Dialog';
import TextField      from 'material-ui/TextField';
import FlatButton     from 'material-ui/FlatButton';
import RaisedButton   from 'material-ui/RaisedButton';
import LinearProgress from 'material-ui/LinearProgress';


import PubSub from 'pubsub-js';


class SignIn extends  Component {

    constructor(props){
        super(props);
        this.state ={
            open: true,

            name: '',
            email: '',
            password: '',


            errorName: '',
            errorEmail: '',
            errorPassword: '',
            enable: false
        }
    }
    componentDidMount() {
    }

    openDialog = () =>{
        this.setState({open: true});
    }

    closeDialog = () => {
        PubSub.publish('close-home-model', false);
        this.setState({open: false});
    }

    changeField = () => {
        if(this.email.input.value    !== '') this.setState({errorEmail:    ''});
        if(this.password.input.value !== '') this.setState({errorPassword: ''});
        if(this.name.input.value     !== '') this.setState({errorName:     ''});
    }

    validField = () => {
        
        let valid = true;
        if(this.email.input.value === ''){
            this.setState({errorEmail: 'Campo Obrigatório'});
            valid = false;
        } 
        if(this.password.input.value === ''){
            this.setState({errorPassword: 'Campo Obrigatório'});
            valid = false;
        } 
        if(this.name.input.value === ''){
            this.setState({errorName: 'Campo Obrigatório'});
            valid = false;
        }
       
        return valid;
    }

    createStudent = () => {
        if(this.validField()){
            this.setState({enable: true});
            HttpService.make().post('/createStudent', this.makeDataForStudent())
                              .then(success => {
                                    this.setState({enable: false});    
                                    localStorage.setItem('student', JSON.stringify(success.data));
                                    history.push('/student/profile', success);
                                    this.closeDialog();
                              })
                              .catch(error => {
                                  console.log('Erro ao criar o usuario');
                              })
        }
    }

    makeDataForStudent = () => {
        return{
            name: this.name.input.value,
            email: this.email.input.value,
            password: this.password.input.value,
            status: false,
        }
    }

    render(){

        const actions = [
            <FlatButton
                label={'Cancelar'}
                primary={true}
                onTouchTap={this.closeDialog}
                style={{marginRight: '10px'}}
                disabled={this.state.enable}
            />,
            <RaisedButton
                backgroundColor="#0ac752"
                labelStyle={{color: 'white'}}
                label={'Criar Conta'}
                primary={true}
                onTouchTap={this.createStudent}
                style={{float: 'right', marginRight: '10px'}}
                disabled={this.state.enable}    
            />
            ,
        ];

        return(
            <div>
                <Dialog
                    title="Cadastro"
                    autoScrollBodyContent={true}
                    actions={actions}
                    open={this.state.open}
                    onRequestClose={this.closeDialog}
                    style={{textAlign: 'center'}}
                >
                    { this.state.enable ? <LinearProgress mode="indeterminate" style={{marginTop: '15px'}} /> : ''}   
                    <TextField 
                        hintText="Nome"
                        floatingLabelText="Nome"
                        type="text"
                        errorText={this.state.errorName}
                        fullWidth={true}
                        disabled={this.state.enable}
                        ref={(input) => this.name = input}
                        onChange={this.changeField}
                    />
                    <TextField 
                        hintText="Email"
                        floatingLabelText="Email"
                        type="text"
                        errorText={this.state.errorEmail}
                        fullWidth={true}
                        disabled={this.state.enable}
                        ref={(input) => this.email = input}
                        onChange={this.changeField}
                    />
                    <TextField 
                        hintText="Senha"
                        floatingLabelText="Senha"
                        type="password"
                        errorText={this.state.errorPassword}
                        fullWidth={true}
                        disabled={this.state.enable}
                        ref={(input) => this.password = input}
                        onChange={this.changeField}
                    />
                    <div style={{textAlign:'center'}}>
                        <h4 className="title">ou</h4>
                        <FlatButton
                            label="Facebook"
                            labelPosition="after"
                            primary={true}
                            disabled={this.state.enable}
                            style={{fontSize: '18px',marginRight:'5%',color:"#4267b2"}}
                            icon={<i className="fa fa-facebook"/>}
                        />
                        <FlatButton
                            label="Google"
                            labelPosition="after"
                            primary={true}
                            style={{fontSize: '18px', color:"#ea4335"}}
                            icon={<i className="fa fa-google"/>}
                            disabled={this.state.enable}
                        />
                    </div>
                </Dialog>
            </div>
        )
    }
}

export default SignIn;