import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

import HeaderBar from '../dash/HeaderBar';
import NavigationBar from '../dash/NavegationBar';


import PubSub from 'pubsub-js';

class About extends Component
{
    constructor(){
        super();
        this.state = {
            provider: JSON.parse(localStorage.getItem('provider'))
        }
    }
    componentDidMount()
    {
        PubSub.publish('header-label',"Sobre");
        console.log("to aqui no no sobre " + this.state.provider.email);
    }
    style = {
        paddingAbout :{
            paddingLeft: "200px",
            marginLeft: "92px",
            marginRight: "92px"
        }
    }
    render()
    {
        return (
            <div>            
                <HeaderBar />
                <NavigationBar />
                <div style={this.style.paddingAbout}>
                    <TextField
                        id="email"
                        value={this.state.provider.email}
                        disabled={true}
                        hintText="Email"
                        floatingLabelText="Email"
                        fullWidth={true}
                    />
                    <TextField
                        id="name"
                        value={this.state.provider.name}
                        hintText="Nome"
                        floatingLabelText="Nome"
                        fullWidth={true}
                        onChange={ (event, value) =>  this.setData(event, value, 'name')}
                        ref={(input) => { this.name = input; }}
                    />
                    <TextField
                        id="password0"
                        value={this.state.provider.password}
                        hintText="Senha"
                        floatingLabelText="Senha"
                        type="password"
                        fullWidth={true}
                        onChange={ (event, value) =>  this.setData(event, value, 'password')}
                        ref={(input) => { this.password = input; }}
                    />
                    <TextField
                        id="password1"
                        hintText="Confirmar senha"
                        floatingLabelText="Confirmar senha"
                        type="password"
                        fullWidth={true}
                        onChange={(event, value) =>  this.setData(event, value, 'confirmPassword')}
                        ref={(input) => { this.confirmPassword = input; }}
                    />
                    <RaisedButton
                        label="salvar"
                        backgroundColor="#0ac752"
                        labelStyle={{color: 'white'}}
                        keyboardFocused={true}
                        onTouchTap={this.fncHandleSave}
                        style={{float: 'right', margin: '20px 0 20px 20px'}}/>

                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                

                    <RaisedButton
                        label="salvar"
                        backgroundColor="#0ac752"
                        labelStyle={{color: 'white'}}
                        keyboardFocused={true}
                        onTouchTap={this.uploadFile}
                        style={{float: 'right', margin: '20px 0 20px 20px'}}/>
                </div>
            </div>
        )
    }
}

export default About;