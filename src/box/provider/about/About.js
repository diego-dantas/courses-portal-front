import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

import HeaderBar from '../dash/HeaderBar';
import NavigationBar from '../dash/NavegationBar';
import HttpService from '../../../service/http/HttpService';

import PubSub from 'pubsub-js';

class About extends Component
{
    constructor(){
        super();
        this.state = {
            provider: JSON.parse(localStorage.getItem('provider')),
            category: JSON.parse(localStorage.getItem('category')),
            subCategory: JSON.parse(localStorage.getItem('subCategory')),
            promotion: JSON.parse(localStorage.getItem('promotion')),
            plan: JSON.parse(localStorage.getItem('plan'))
        }
    }
    componentDidMount()
    {
        PubSub.publish('header-label',"Sobre");
        this.getPlan()
        this. getCategory();
        this.getSubCategory();
        this.getPromotion();
        console.log('Carreguei os dados iniciais');
    }
    style = {
        paddingAbout :{
            paddingLeft: "200px",
            marginLeft: "92px",
            marginRight: "92px"
        }
    }

    getPlan = () => {
        console.log('vamos la buscar os planos');
        HttpService.make().get('/getPlan')
                    .then(success =>{
                        localStorage.setItem('plan', JSON.stringify(success.data));

                        console.log(JSON.parse(localStorage.getItem('plan')));
                    })
                    .catch(error => {
                        console.log('Erro ao buscar as promoçoes');
                    })
    }
    getSubCategory = () =>{
        HttpService.make().get('/getSubGrid')
                   .then(success => {
                        localStorage.setItem('subCategory', JSON.stringify(success.data));
                   })
                   .catch(error => {
                       console.log('Erro ao carregar as categorias que estão salvas no banco');
                   })
    }
    getCategory = () =>{
        HttpService.make().get('/getGrid')
                   .then(success => {
                        localStorage.setItem('category', JSON.stringify(success.data));
                   })
                   .catch(error => {
                       console.log('Erro ao carregar as categorias que estão salvas no banco');
                   })
    }
    getPromotion = () => {
        HttpService.make().get('/getPromotion')
                    .then(success =>{
                        localStorage.setItem('promotion', JSON.stringify(success));
                    })
                    .catch(error => {
                        console.log('Erro ao buscar as promoçoes');
                    })
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