import React, {Component} from "react";
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
            open: false,
            configEmail:{
                _id:'', 
                email:'',
                password:'',
                port:'', 
                hostname:''
            }
        };
    };

    fncHandleOpen = () =>
    {
        this.setState({open: true});
    };

    fncHandleClose = () =>
    {
        this.setState({open: false})
    };



    render()
    {
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
                onTouchTap={this.fncSave}
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
                        onChange={(event, value) => this.fncSetData(event, value, 'email')}
                        value={this.state.configEmail.email}/>
                    <TextField
                        hintText="Informe a senha do email"
                        floatingLabelText="Senha"
                        type="text"
                        fullWidth={true}
                        onChange={(event, value) => this.fncSetData(event, value, 'password')}
                        value={this.state.configEmail.password}/>
                    <TextField
                        hintText="Informe a porta"
                        floatingLabelText="Porta"
                        type="number"
                        fullWidth={true}
                        onChange={(event, value) => this.fncSetData(event, value, 'port')}
                        value={this.state.configEmail.port}/>
                    <TextField
                        hintText="Informe o servidor"
                        floatingLabelText="Servidor"
                        type="text"
                        fullWidth={true}
                        onChange={(event, value) => this.fncSetData(event, value, 'hostname')}
                        value={this.state.configEmail.hostname}/>

                </Dialog>
            </div>
        );
    };

}
export default ConfigEmail;