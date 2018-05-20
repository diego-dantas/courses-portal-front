import React, { Component } from 'react';
import HttpService from '../../../../service/http/HttpService';

import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';


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
        }
    }

    openDialog = () =>{
        this.setState({open: true});
    }

    closeDialog = () => {
        this.setState({open: false});
        PubSub.publish('close-home-model', false);
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
            HttpService.make().post('/createUpdateStudent', this.makeDataForStudent())
                              .then(success => {
                                    alert('usuario criado com sucesso');
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
        }
    }

    render(){

        const actions = [
            <FlatButton
                label={'Cancelar'}
                primary={true}
                onTouchTap={this.closeDialog}
                style={{marginRight: '10px'}}
            />,
            <RaisedButton
                backgroundColor="#0ac752"
                labelStyle={{color: 'white'}}
                label={'Criar Conta'}
                primary={true}
                onTouchTap={this.createStudent}
                style={{float: 'right', marginRight: '10px'}}/>
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
                    <TextField 
                        hintText="Nome"
                        floatingLabelText="Nome"
                        type="text"
                        errorText={this.state.errorName}
                        fullWidth={true}
                        ref={(input) => this.name = input}
                        onChange={this.changeField}
                    />
                    <TextField 
                        hintText="Email"
                        floatingLabelText="Email"
                        type="text"
                        errorText={this.state.errorEmail}
                        fullWidth={true}
                        ref={(input) => this.email = input}
                        onChange={this.changeField}
                    />
                    <TextField 
                        hintText="Senha"
                        floatingLabelText="Senha"
                        type="password"
                        errorText={this.state.errorPassword}
                        fullWidth={true}
                        ref={(input) => this.password = input}
                        onChange={this.changeField}
                    />
                    <div style={{textAlign:'center'}}>
                        <h4 className="title">ou</h4>
                        <FlatButton
                            label="Facebook"
                            labelPosition="after"
                            primary={true}
                            style={{fontSize: '18px',marginRight:'5%',color:"#4267b2"}}
                            icon={<i className="fa fa-facebook"/>}
                        />
                        <FlatButton
                            label="Google"
                            labelPosition="after"
                            primary={true}
                            style={{fontSize: '18px', color:"#ea4335"}}
                            icon={<i className="fa fa-google"/>}
                        />
                    </div>
                </Dialog>

            </div>
        )
    }
}

export default SignIn;