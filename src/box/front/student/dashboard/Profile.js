import React, { Component } from 'react';
import axios                from 'axios';

import TextField    from 'material-ui/TextField';
import SelectField  from 'material-ui/SelectField';
import MenuItem     from 'material-ui/MenuItem';
import FlatButton   from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import {
    Step,
    Stepper,
    StepButton,
    StepContent,
  } from 'material-ui/Stepper';

import Search from 'material-ui/svg-icons/action/search';

export default class Profile extends Component{
    
    constructor(props){
        super(props);
        this.state ={
            open: true,
            stepIndex: 2,
            dadosPessoais:{
                name:     '',
                email:    '',
                password: '',
                fone:     '',
                celular:  '',
                cpf:      '',
                rg:       '',
                outro:    '',
                sexo:     0,
                noticia:  0, 
                perfil:   0,
            },
            cep:    '',
            rua:    '',
            numero: '',
            bairro: '',
            comple: '',
            estado: 0,
            cidade: 0,
            errorMsg:{
                errorName:     '',
                errorEmail:    '',
                errorPassword: '',
            }
        }
    }

    componentDidMount(){

    }

    getCepAPI = () => {
        axios.get('https://viacep.com.br/ws/'+this.cep.input.value+'/json')
            .then(res => {
                console.log(res.data);
                if(res.data.erro === true){
                    this.setState({'bairro':   ''});
                    this.setState({'rua': ''});
                }else{
                    this.setState({'rua':    res.data.logradouro});
                    this.setState({'bairro': res.data.bairro});
                }               
                
            })
            .catch(error => {
                alert('CEP não encontrado, por favor preencher os campos');
                this.setState({'bairro':   ''});
                this.setState({'rua': ''});
            })
    }

    bluindEndereco = (endereco) => {
        this.setState({'endereco': endereco});
    }
    
    handleChangeSexo    = (event, index, sexo)    => this.setState({sexo});
    handleChangeNoticia = (event, index, noticia) => this.setState({noticia});
    handleChangePerfil  = (event, index, perfil)  => this.setState({perfil});

    handleNext = () => {
        const {stepIndex} = this.state;
        if (stepIndex < 2) {
          this.setState({stepIndex: stepIndex + 1});
        }
    };
    
    handlePrev = () => {
        const {stepIndex} = this.state;
        if (stepIndex > 0) {
          this.setState({stepIndex: stepIndex - 1});
        }
    };

    renderStepActions(step) {
        let grpBtns = [];
        if(step === 0){
            grpBtns = [
                <div key={0} style={{margin: '12px 0'}}>
                    <RaisedButton
                        label="Próximo"
                        disableTouchRipple={true}
                        disableFocusRipple={true}
                        primary={true}
                        onClick={this.handleNext}
                    />
                </div>
            ]
        }else if(step === 2){
            grpBtns = [
                <div key={0} style={{margin: '12px 0'}}>
                    <FlatButton
                        label="Voltar"
                        disableTouchRipple={true}
                        disableFocusRipple={true}
                        onClick={this.handlePrev}
                    />
                </div>
            ]
        }else {
            grpBtns = [
                <div key={0} style={{margin: '12px 0'}}>
                    <FlatButton
                        label="Voltar"
                        disableTouchRipple={true}
                        disableFocusRipple={true}
                        onClick={this.handlePrev}
                        style={{marginRight: 12}}
                    />
                    <RaisedButton
                        label="Próximo"
                        disableTouchRipple={true}
                        disableFocusRipple={true}
                        primary={true}
                        onClick={this.handleNext}
                    />
                </div>
            ]
        }
        return grpBtns;
    }

    render(){

        const style = {
            fontStyle:{
                fontFamily: 'Roboto sans-serif',
                textAlign: 'auto'
            },
            formStyle: {
                marginLeft: '5%', marginRight: '5%'
            }
            
        }
        return(
            <div>
                <div className="col-lg-12 text-center">
                    <h3 style={style.fontStyle}>Perfil</h3>  
                </div>
                <hr />
                <div>
                    <Stepper
                        activeStep={this.state.stepIndex}
                        linear={false}
                        orientation="vertical"
                    >
                        <Step>
                            <StepButton onClick={() => this.setState({stepIndex: 0})}>
                                Dados Pessoais
                            </StepButton>
                            <StepContent>
                                <TextField 
                                    hintText="Nome"
                                    floatingLabelText="Nome"
                                    type="text"
                                    defaultValue={this.state.dadosPessoais.name}
                                    errorText={this.state.errorMsg.errorName}
                                    fullWidth={true}
                                    ref={(input) => this.name = input}
                                    onChange={this.changeField}
                                />
                                <TextField 
                                    hintText="Email"
                                    floatingLabelText="Email"
                                    type="text"
                                    defaultValue={this.state.dadosPessoais.email}
                                    errorText={this.state.errorMsg.errorEmail}
                                    fullWidth={true}
                                    ref={(input) => this.email = input}
                                    onChange={this.changeField}
                                />
                                <TextField 
                                    hintText="Senha"
                                    floatingLabelText="Senha"
                                    type="password"
                                    defaultValue={this.state.dadosPessoais.password}
                                    errorText={this.state.errorMsg.errorPassword}
                                    fullWidth={true}
                                    ref={(input) => this.password = input}
                                    onChange={this.changeField}
                                />
                                <div className="row">
                                    <div className="col-md-12 col-lg-6">
                                        <TextField 
                                            hintText="Ex 1833334444"
                                            floatingLabelText="Fone"
                                            type="number"
                                            defaultValue={this.state.dadosPessoais.fone}
                                            fullWidth={true}
                                            ref={(input) => this.fone = input}
                                            onChange={this.changeField}
                                        />
                                    </div>
                                    <div className="col-md-12 col-lg-6">
                                        <TextField 
                                            hintText="Ex 18999998888"
                                            floatingLabelText="Celular"
                                            type="number"
                                            defaultValue={this.state.dadosPessoais.celular}
                                            fullWidth={true}
                                            ref={(input) => this.celular = input}
                                            onChange={this.changeField}
                                        />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12 col-lg-6">
                                        <SelectField
                                            floatingLabelText="Sexo"
                                            value={this.state.dadosPessoais.sexo}
                                            onChange={this.handleChangeSexo}
                                            fullWidth={true}
                                        >
                                            <MenuItem value={0} primaryText="Sexo" />
                                            <MenuItem value={1} primaryText="Masculino" />
                                            <MenuItem value={2} primaryText="Feminino" />
                                        </SelectField>
                                    </div>
                                    <div className="col-md-12 col-lg-6">
                                        <SelectField
                                            floatingLabelText="Deseja receber notícia ?"
                                            value={this.state.dadosPessoais.noticia}
                                            onChange={this.handleChangeNoticia}
                                            fullWidth={true}
                                        >
                                            <MenuItem value={0} primaryText="Deseja receber notícia ?" />
                                            <MenuItem value={1} primaryText="SIM" />
                                            <MenuItem value={2} primaryText="NÃO" />
                                        </SelectField>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12 col-lg-6">
                                        <TextField 
                                            hintText="CPF"
                                            floatingLabelText="CPF"
                                            type="text"
                                            defaultValue={this.state.dadosPessoais.cpf}
                                            fullWidth={true}
                                            ref={(input) => this.cpf = input}
                                            onChange={this.changeField}
                                        />
                                    </div>
                                    <div className="col-md-12 col-lg-6">
                                        <TextField 
                                            hintText="RG"
                                            floatingLabelText="RG"
                                            type="text"
                                            defaultValue={this.state.dadosPessoais.rg}
                                            fullWidth={true}
                                            ref={(input) => this.rg = input}
                                            onChange={this.changeField}
                                        />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12 col-lg-6">
                                        <SelectField
                                            floatingLabelText="Perfil"
                                            value={this.state.dadosPessoais.perfil}
                                            onChange={this.handleChangePerfil}
                                            fullWidth={true}
                                        >
                                            <MenuItem value={0} primaryText="Perfil" />
                                            <MenuItem value={1} primaryText="Estudante" />
                                            <MenuItem value={2} primaryText="Profissional Clínica" />
                                            <MenuItem value={3} primaryText="Profissional Acadêmico" />
                                            <MenuItem value={4} primaryText="Outro(especificar)" />
                                        </SelectField>
                                    </div>
                                    <div className="col-md-12 col-lg-6">
                                        <TextField 
                                            hintText="Outro"
                                            floatingLabelText="Outro"
                                            type="text"
                                            defaultValue={this.state.dadosPessoais.outro}
                                            fullWidth={true}
                                            ref={(input) => this.outro = input}
                                            onChange={this.changeField}
                                        />
                                    </div>
                                </div>
                                {this.renderStepActions(0)}
                            </StepContent>
                        </Step>
                        <Step>
                            <StepButton onClick={() => this.setState({stepIndex: 1})}>
                                Endereço
                            </StepButton>
                            <StepContent>
                                <div className="row">
                                    <div className="col-md-12 col-lg-6">
                                        <TextField 
                                            hintText="Ex 16050660"
                                            floatingLabelText="CEP"
                                            type="number"
                                            defaultValue={'16050660'}
                                            fullWidth={true}
                                            ref={(input) => this.cep = input}
                                            onChange={this.changeField}
                                        />
                                    </div>
                                    <div className="col-md-12 col-lg-6">
                                        <FlatButton 
                                            label="Buscar" 
                                            fullWidth={true}
                                            secondary={true}
                                            icon={<Search />}
                                            style={{marginTop: '5%'}}
                                            onClick={() => this.getCepAPI()}
                                        />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12 col-lg-6">
                                        <SelectField
                                            floatingLabelText="Estado"
                                            value={this.state.estado}
                                            onChange={this.handleChangeEstado}
                                            fullWidth={true}
                                        >
                                            <MenuItem value={0} primaryText="Estado" />
                                            <MenuItem value={1} primaryText="Masculino" />
                                            <MenuItem value={2} primaryText="Feminino" />
                                        </SelectField>
                                    </div>
                                    <div className="col-md-12 col-lg-6">
                                        <SelectField
                                            floatingLabelText="Cidade"
                                            value={this.state.cidade}
                                            onChange={this.handleChangeCidade}
                                            fullWidth={true}
                                        >
                                            <MenuItem value={0} primaryText="Cidade" />
                                            <MenuItem value={1} primaryText="SIM" />
                                            <MenuItem value={2} primaryText="NÃO" />
                                        </SelectField>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12">
                                        <TextField 
                                            hintText="Rua"
                                            floatingLabelText="Rua"
                                            type="text"
                                            value={this.state.rua}
                                            fullWidth={true}
                                            ref={(input) => this.rua = input}
                                            onChange={(e, value) => this.setState({ rua: value})}
                                        />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12 col-lg-6">
                                        <TextField 
                                            hintText="Número"
                                            floatingLabelText="Número"
                                            type="text"
                                            defaultValue={this.state.numero}
                                            fullWidth={true}
                                            ref={(input) => this.numero = input}
                                            onChange={this.changeField}
                                        />
                                    </div>
                                    <div className="col-md-12 col-lg-6">
                                        <TextField 
                                            hintText="Bairro"
                                            floatingLabelText="Bairro"
                                            type="text"
                                            fullWidth={true}
                                            value={this.state.bairro}
                                            ref={(input) => this.bairro = input}
                                            onChange={(e, value) => this.setState({bairro: value})}
                                        />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12">
                                        <TextField 
                                            hintText="Complemento"
                                            floatingLabelText="Complemento"
                                            type="text"
                                            defaultValue={this.state.comple}
                                            fullWidth={true}
                                            ref={(input) => this.comple = input}
                                            onChange={this.changeField}
                                        />
                                    </div>
                                </div>
                                {this.renderStepActions(1)}
                            </StepContent>
                        </Step>
                        <Step>
                            <StepButton onClick={() => this.setState({stepIndex: 2})}>
                                Concluir
                            </StepButton>
                            <StepContent>
                                {this.renderStepActions(2)}
                                <div className="row">
                                    <div className="col-md-12">
                                        <RaisedButton 
                                            label="Salvar" 
                                            primary={true} 
                                            fullWidth={true}
                                            style={{marginTop: '5%', marginBottom: '10%'}}
                                        />
                                    </div>
                                </div>
                            </StepContent>
                        </Step>
                    </Stepper>
                </div>
            </div>
        );
    }
}