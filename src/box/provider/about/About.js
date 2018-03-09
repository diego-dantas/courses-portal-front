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
        this.getCategory();
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

    makeDataForProvider = () => {
        return{
            _id: "1",
            name: this.name.input.value,
            email: this.email.input.value,
            password: this.password.input.value
        }
    }

    updateProvider = () => {
        HttpService.make().post('/updateProvider', this.makeDataForProvider())
                   .then(success => {
                        console.log("Dados alterado com sucesso");
                   })
                   .catch(error =>{
                        console.log('Erro ao alterar os dados do Provider');
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
                        defaultValue={this.state.provider.email}
                        hintText="Email"
                        floatingLabelText="Email"
                        fullWidth={true}
                        ref={(input) => { this.email = input; }}
                    />
                    <TextField
                        id="name"
                        defaultValue={this.state.provider.name}
                        hintText="Nome"
                        floatingLabelText="Nome"
                        fullWidth={true}
                        ref={(input) => { this.name = input; }}
                    />
                    <TextField
                        id="password0"
                        defaultValue={this.state.provider.password}
                        hintText="Senha"
                        floatingLabelText="Senha"
                        type="password"
                        fullWidth={true}
                        ref={(input) => { this.password = input; }}
                    />
                    <RaisedButton
                        label="salvar"
                        backgroundColor="#0ac752"
                        labelStyle={{color: 'white'}}
                        keyboardFocused={true}
                        onTouchTap={this.fncHandleSave}
                        style={{float: 'right', margin: '20px 0 20px 20px'}}
                        onClick={this.updateProvider}
                    /> 
                               
                </div>
            </div>
        )
    }
}

export default About;