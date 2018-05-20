import React, { Component } from 'react';

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
            sexo:      0,
            noticia:   0, 
            perfil:    0,
            stepIndex: 2,
            name:     '',
            email:    '',
            password: '',


            errorName:     '',
            errorEmail:    '',
            errorPassword: '',
        }
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
                <div style={{margin: '12px 0'}}>
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
                <div style={{margin: '12px 0'}}>
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
                <div style={{margin: '12px 0'}}>
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
                                <div className="row">
                                    <div className="col-md-12 col-lg-6">
                                        <TextField 
                                            hintText="Ex 1833334444"
                                            floatingLabelText="Fone"
                                            type="number"
                                            errorText={this.state.errorPassword}
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
                                            errorText={this.state.errorPassword}
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
                                            value={this.state.sexo}
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
                                            value={this.state.noticia}
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
                                            value={this.state.perfil}
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
                                            fullWidth={true}
                                            ref={(input) => this.rua = input}
                                            onChange={this.changeField}
                                        />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12 col-lg-6">
                                        <TextField 
                                            hintText="Número"
                                            floatingLabelText="Número"
                                            type="text"
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
                                            ref={(input) => this.bairro = input}
                                            onChange={this.changeField}
                                        />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12">
                                        <TextField 
                                            hintText="Complemento"
                                            floatingLabelText="Complemento"
                                            type="text"
                                            fullWidth={true}
                                            ref={(input) => this.numero = input}
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
                <div style={style.formStyle}>
                   
                    
                </div>
               
            
            </div>
        );
    }
}