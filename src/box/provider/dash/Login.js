import React, { Component } from 'react';
import { Route, Redirect } from 'react-router';


//import of component material-ui
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

import HttpService from '../../../service/http/HttpService';
import history from '../../../service/router/history';

class Login extends Component {

    state = {
        open: true,
        msg: ''

    }
    style =  {
        divStyle:{
            position: 'absolut'
        },
        dialogStyle:{
            position: 'relative',
            width: '750px',
            textAlign: 'center',
            margin: '5px auto'
        }
        
    };

    
    makeLogin = () => {
        console.log('iniciando requisição para API');
        console.log('email = ' + this.email.input.value + ' password = ' + this.password.input.value);
        

        HttpService.make().post('/login', this.makeDataForlogin())
                   .then(success => {
                       console.log(success.data);
                       history.push('/provider/about', success);
                   })
                   .catch(error => {
                        this.setState({'msg': 'Usuário ou senha incorreto'});
                   });
        

    }

    makeDataForlogin = () => {
        return {
            email: this.email.input.value,
            password: this.password.input.value
        }
    }

    render(){

        const actions = [
            <TextField 
                hintText="E-mail"
                floatingLabelText="E-mail"
                type="email"
                fullWidth={true}
                ref={(input) => { this.email = input; }}
            />,
            <TextField id="password"
                hintText="Password"
                floatingLabelText="Password"            
                type="password"
                fullWidth={true}
                ref={(input) => { this.password = input; }}
            />,
            <br/>,<br/>,<br/>,

            <RaisedButton
              label="Entrar"
              primary={true}
              fullWidth={true}
              onClick={this.makeLogin}
            />,
            <br/>,<br/>,
            <p>{this.state.msg}</p>
          ];
      
        return(
            <div style={this.style.divStyle}>
                <Dialog
                    style={this.style.dialogStyle}
                    actions={actions}
                    modal={false}
                    open={this.state.open}
                >
                    PORTAL DASH BOARD
                </Dialog>
          </div>
        );
    }
}

export default Login;
