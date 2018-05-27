import React, { Component } from 'react';
import HttpService from '../../../../service/http/HttpService';
import history from  './../../../../service/router/history'
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';


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
            imagePath: 'getFile?name=students/profile/sf.jpeg',
            source: 'site',

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

    changeField = (value, type) => {

        if(type === 'name'){
            this.setState({name: value});
            this.setState({errorName: ''});
        }

        if(type === 'email'){
            this.setState({email: value});
            this.setState({errorEmail: ''});
        }

        if(type === 'password'){
            this.setState({password: value});
            this.setState({errorPassword: ''});
        }

    }

    validField = () => {
        
        let valid = true;
        if(this.state.email === ''){
            this.setState({errorEmail: 'Campo Obrigatório'});
            valid = false;
        } 
        if(this.state.password === ''){
            this.setState({errorPassword: 'Campo Obrigatório'});
            valid = false;
        } 
        if(this.state.name === ''){
            this.setState({errorName: 'Campo Obrigatório'});
            valid = false;
        }
        
        return valid;
    }

    createStudent = (source) => {
        if(source === 'site'){
            if(this.validField()) {
                this.sendStudentData();
            }
        }else{
            this.sendStudentData();
        }   
    }

    sendStudentData = () => {
        this.setState({enable: true});
            HttpService.make()
                       .post('/createStudent', this.makeDataForStudent())
                       .then(success => {
                             this.setState({enable: false});
                             console.log(success.data);
                             localStorage.setItem('student', JSON.stringify(success.data));
                             history.push('/student/profile', success);
                             this.closeDialog();
                       })
                       .catch(error => {
                           console.log('Erro ao criar o usuario');
                       })
    }

    makeDataForStudent = () => {
        return{
            name:      this.state.name,
            email:     this.state.email,
            password:  this.state.password,
            source:    this.state.source,
            imagePath: this.state.imagePath,
            status: false,
        }
    }

    render(){

        const responseFacebook = (response) => {
            console.log(response);
            this.setState({name:      response.name});
            this.setState({email:     response.email});
            this.setState({password:  response.id});
            this.setState({imagePath: response.picture.data.url});
            this.setState({source:    'facebook'});
            this.createStudent('');
        }

        const responseGoogle = (response) => {
            console.log(response);
            this.setState({name:      response.profileObj.name});
            this.setState({email:     response.profileObj.email});
            this.setState({password:  response.profileObj.googleId});
            this.setState({imagePath: response.profileObj.imageUrl});
            this.setState({source:    'google'});
            this.createStudent('');
        }

        const responseGoogleFail = (response) => {
            console.log(response);
        }

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
                onTouchTap={() => this.createStudent('site')}
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
                        onChange={(e, value) => this.changeField(value, 'name')}
                    />
                    <TextField 
                        hintText="Email"
                        floatingLabelText="Email"
                        type="text"
                        errorText={this.state.errorEmail}
                        fullWidth={true}
                        disabled={this.state.enable}
                        onChange={(e, value) => this.changeField(value, 'email')}
                    />
                    <TextField 
                        hintText="Senha"
                        floatingLabelText="Senha"
                        type="password"
                        errorText={this.state.errorPassword}
                        fullWidth={true}
                        disabled={this.state.enable}
                        onChange={(e, value) => this.changeField(value, 'password')}
                    />
                    <div style={{textAlign:'center'}}>
                        <h4 className="title">ou</h4>
                        <FacebookLogin
                            appId="1697885623632235"
                            autoLoad={true}
                            textButton=" Facebook"
                            fields="name,email,picture"
                            callback={responseFacebook}
                            cssClass="btn btn-outline-primary"
                            icon="fa-facebook"
                        />
                        <GoogleLogin
                            //4m9AAG4U0kVtTOOzbq3cgxDR chave secreta do cliente
                            clientId="353901230787-qh2fruapucrpt9tabnqnkpc894vqrf9l.apps.googleusercontent.com"
                            onSuccess={responseGoogle}
                            onFailure={responseGoogleFail}
                            className="btn btn-outline-danger"
                            style={{marginLeft: '10px'}}
                        >
                            <i className="fa fa-google"/>
                            <span> Google</span>
                        </GoogleLogin>
                        
                    </div>
                </Dialog>
            </div>
        )
    }
}

export default SignIn;