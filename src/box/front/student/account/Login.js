import React, { Component } from 'react';
import PubSub from 'pubsub-js';
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';

import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';


export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: true
        };
        
    }

    handleClose = (value) => {
        this.setState({'open': false});
        PubSub.publish('close-home-model', value);
    };

    render(){
        const responseFacebook = (response) => {
            console.log(response);
            this.setState({email:     response.email});
            this.setState({password:  response.id});
            this.setState({source:    'facebook'});
            //this.createStudent('');
        }

        const responseGoogle = (response) => {
            console.log(response);
            this.setState({email:     response.profileObj.email});
            this.setState({password:  response.profileObj.googleId});
            this.setState({source:    'google'});
            //this.createStudent('');
        }

        const responseGoogleFail = (response) => {
            console.log(response);
        }

        const style = {title:{fontFamily: 'Roboto',fontWeight: 300, textAlign:'center'}};

        const actions = [
            <FlatButton
                label="Cancelar"
                primary={false}
                style={{color:"#767676"}}
                onClick={() => this.handleClose(false)}
            />,
            <FlatButton
                label="Esqueci a senha"
                primary={true}
                onClick={() => this.handleClose(true)}
            />,
            <RaisedButton 
                label="Fazer login"
                primary={true}
            //    onClick={this.makeLogin.bind(this)}
            />,
        ];

        return(
            <div>
                <Dialog
                    titleStyle={style.title}
                    title="Olha quem voltou :D"
                    actions={actions}
                    bodyStyle={{minHeight: '180px'}}
                    modal={true}
                    autoScrollBodyContent={false}
                    open={this.state.open}
                    onRequestClose={() => this.handleClose(false)}>

                    <TextField
                        hintText="Email"
                        floatingLabelText="Email"
                        type="email"
                        fullWidth={true}
                        ref={(input) => { this.email = input; }}
                    />
                    <TextField
                        hintText="Senha"
                        floatingLabelText="Senha"
                        type="password"
                        fullWidth={true}
                        ref={(input) => { this.password = input; }}
                    />
                    <br/>
                    <br/>
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