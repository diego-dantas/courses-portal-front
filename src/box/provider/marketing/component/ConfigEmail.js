import React, {Component} from 'react';
import HttpService from '../../../../service/http/HttpService';


import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import GearIco from 'material-ui/svg-icons/action/gavel';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import PubSub from 'pubsub-js';


class ConfigEmail extends Component {
    constructor(props)
    {
        super(props);
        this.state =
        {
            configEmail: JSON.parse(localStorage.getItem('configEmail')),
            open: false,
            _id: 1, 
            email:'',
            password:'',
            port:'', 
            hostName:'',


            errorEmail:'',
            errorPassword:'',
            errorPort:'', 
            errorHostName:''
            
        };
    };

    fncHandleOpen = () =>
    {   
        this.setState({email    : this.state.configEmail.email});
        this.setState({password : this.state.configEmail.password});
        this.setState({port     : this.state.configEmail.port});
        this.setState({hostName : this.state.configEmail.hostName});
        this.setState({open: true});
    }

    fncHandleClose = () =>
    {
        this.setState({open: false})
    };

    changeField = () => {
        if(this.email.input.value    !== '') this.setState({errorEmail:    ''});
        if(this.password.input.value !== '') this.setState({errorPassword: ''});
        if(this.port.input.value     !== '') this.setState({errorPort:     ''});
        if(this.hostName.input.value !== '') this.setState({errorHostName: ''});
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
        if(this.port.input.value === ''){
            this.setState({errorPort: 'Campo Obrigatório'});
            valid = false;
        } 
        if(this.hostName.input.value === ''){
            this.setState({errorHostName: 'Campo Obrigatório'});
            valid = false;
        } 
       
        return valid;
    }

    makeDataForConfigEmail = () => {
        return{
            _id: this.state._id,
            email: this.email.input.value,
            password: this.password.input.value,
            port: this.port.input.value,
            hostName: this.hostName.input.value
        }
    }

    saveConfigEmail = () => {
        if(this.validField()){
            HttpService.make().post('/saveConfigEmail', this.makeDataForConfigEmail())
                              .then(success => { 
                                    this.getConfigEmail();
                                    this.fncHandleClose();
                                    alert('Dados Salvo com suceeso');    
                              })
                              .catch(error => {
                                    console.log('Erro ao savar as configurações de email');
                              })
        }
        
    }

    getConfigEmail = () => {
        HttpService.make().get('/getConfigEmail')
                          .then(success => {
                                localStorage.setItem('configEmail', JSON.stringify(success.data));
                                this.setState({configEmail: JSON.parse(localStorage.getItem('configEmail'))});
                          })
                          .catch(error => {

                          })
    }

    render() {
        const actions = [
            <FlatButton
                label={'Cancelar'}
                primary={true}
                onTouchTap={this.fncHandleClose}
                style={{marginRight: '10px'}}
            />,
            <RaisedButton
                backgroundColor="#0ac752"
                labelStyle={{color: 'white'}}
                label={'Salvar'}
                primary={true}
                onTouchTap={this.saveConfigEmail}
                style={{float: 'right', marginRight: '10px'}}/>
            ,
        ];

        return (
            <div>
                <RaisedButton
                    label={'Configuração email'}
                    backgroundColor={'#f2862d'}
                    icon={<GearIco color='#FFF'/>}
                    onTouchTap={() => this.fncHandleOpen()}
                    style={{width:'19%', float:'right', marginTop:'20px'}}
                    labelStyle={{color: 'white'}}
                />

                <Dialog
                    title="Configurando email"
                    autoScrollBodyContent={true}
                    actions={actions}
                    modal={true}
                    style={{margin:'0',minHeight: '450px', maxHeight: '450px'}}
                    titleStyle={{padding:'30px', marginTop:'-40px'}}
                    contentStyle={{width: '80%', maxWidth: 'none',minHeight: '450px', maxHeight: '450px'}}
                    bodyStyle={{minHeight: 'auto', maxHeight: '400px'}}
                    open={this.state.open}
                >

                    <TextField
                        hintText="Informe o email remetente"
                        floatingLabelText="Email"
                        type="text"
                        fullWidth={true}
                        onChange={this.changeField}
                        defaultValue={this.state.email}
                        errorText={this.state.errorEmail}
                        ref={ (input) => {this.email = input;} }
                    />
                    <TextField
                        hintText="Informe a senha do email"
                        floatingLabelText="Senha"
                        type="text"
                        fullWidth={true}
                        onChange={this.changeField}
                        defaultValue={this.state.password}
                        errorText={this.state.errorPassword}
                        ref={ (input) => {this.password = input;} }
                    />
                    <TextField
                        hintText="Informe a porta"
                        floatingLabelText="Porta"
                        type="number"
                        fullWidth={true}
                        onChange={this.changeField}
                        defaultValue={this.state.port}
                        errorText={this.state.errorPort}
                        ref={ (input) => {this.port = input;} }
                    />
                    <TextField
                        hintText="Informe o servidor"
                        floatingLabelText="Servidor"
                        type="text"
                        fullWidth={true}
                        onChange={this.changeField}
                        defaultValue={this.state.hostName}
                        errorText={this.state.errorHostName}
                        ref={ (input) => {this.hostName = input;} }
                    />
                </Dialog>
            </div>
        );
    };

}
export default ConfigEmail;