import React, { Component } from 'react';
//import HttpServe            from './../../../../service/http/HttpService';
import axios                from 'axios';
import CustomLoad from './../../../component/CustomLoad';

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
            student: JSON.parse(localStorage.getItem('student')),
            open: true,
            stepIndex: 2,
            //dados pessoais 
            _id:      '',
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
            //endereço
            cep:    '',
            rua:    '',
            numero: '',
            bairro: '',
            comple: '',
            estado: '',
            cidade: '',
            
            //mgs error
            errorName:     '',
            errorEmail:    '',
            errorPassword: '',
            
            progress: false
        }
    }

    componentDidMount(){

    }

    //busca o cep via api do viacep
    getCepAPI = () => {
        axios.get('https://viacep.com.br/ws/'+this.cep.input.value+'/json')
            .then(res => {
                console.log(res.data);
                if(res.data.erro === true){
                    alert('CEP não encontrado, por favor preencher os campos');
                    this.setState({'estado': ''});
                    this.setState({'cidade': ''});
                    this.setState({'rua':    ''});
                    this.setState({'bairro': ''});
                }else{
                    this.setState({'estado': res.data.uf});
                    this.setState({'cidade': res.data.localidade});
                    this.setState({'rua':    res.data.logradouro});
                    this.setState({'bairro': res.data.bairro});
                    
                }               
                
            })
            .catch(error => {
                alert('CEP não encontrado, por favor preencher os campos');
                this.setState({'estado': ''});
                this.setState({'cidade': ''});
                this.setState({'rua':    ''});
                this.setState({'bairro': ''});
            })
    }

    saveStudentsProfile = () => {
        this.setState({progress: true});
        console.log(this.makeDataForStudentProfile());
    }

    makeDataForStudentProfile = () => {
        return{
            _id:      this.state.student._id,
            name:     this.state.name,
            email:    this.state.email,
            password: this.state.password,
            phone:     this.state.fone,
            cellPhone:  this.state.celular,
            sexo:     this.state.sexo,
            noticia:  this.state.noticia,
            rg:       this.state.rg,
            cpf:      this.state.cpf,
            perfil:   this.state.perfil,
            outro:    this.state.outro,
            zipCode:  this.state.cep,
            street:      this.state.rua,
            number:   this.state.numero,
            neighborhood:   this.state.bairro,
            comple:   this.state.comple,
            estado:   this.state.estado,
            cidade:   this.state.cidade 
        }
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
        if(this.name.input.value === ''){
            this.setState({errorName: 'Campo Obrigatório'});
            valid = false;
        }
       
        return valid;
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
                { this.state.progress ? <CustomLoad /> : '' }
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
                                    value={this.state.student.name}
                                    errorText={this.state.errorName}
                                    fullWidth={true}
                                    ref={(input) => this.name = input}
                                    onChange={(e, value) => this.setState({name: value})}
                                />
                                <TextField 
                                    hintText="Email"
                                    floatingLabelText="Email"
                                    type="text"
                                    value={this.state.student.email}
                                    errorText={this.state.errorEmail}
                                    fullWidth={true}
                                    ref={(input) => this.email = input}
                                    onChange={(e, value) => this.setState({email: value})}
                                />
                                <TextField 
                                    hintText="Senha"
                                    floatingLabelText="Senha"
                                    type="password"
                                    value={this.state.student.password}
                                    errorText={this.state.errorPassword}
                                    fullWidth={true}
                                    ref={(input) => this.password = input}
                                    onChange={(e, value) => this.setState({password: value})}
                                />
                                <div className="row">
                                    <div className="col-md-12 col-lg-6">
                                        <TextField 
                                            hintText="Ex 1833334444"
                                            floatingLabelText="Fone"
                                            type="number"
                                            value={this.state.fone}
                                            fullWidth={true}
                                            ref={(input) => this.fone = input}
                                            onChange={(e, value) => this.setState({fone: value})}
                                        />
                                    </div>
                                    <div className="col-md-12 col-lg-6">
                                        <TextField 
                                            hintText="Ex 18999998888"
                                            floatingLabelText="Celular"
                                            type="number"
                                            value={this.state.celular}
                                            fullWidth={true}
                                            ref={(input) => this.celular = input}
                                            onChange={(e, value) => this.setState({celular: value})}
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
                                            value={this.state.cpf}
                                            fullWidth={true}
                                            ref={(input) => this.cpf = input}
                                            onChange={(e, value) => this.setState({cpf: value})}
                                        />
                                    </div>
                                    <div className="col-md-12 col-lg-6">
                                        <TextField 
                                            hintText="RG"
                                            floatingLabelText="RG"
                                            type="text"
                                            value={this.state.rg}
                                            fullWidth={true}
                                            ref={(input) => this.rg = input}
                                            onChange={(e, value) => this.setState({rg: value})}
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
                                            value={this.state.outro}
                                            fullWidth={true}
                                            ref={(input) => this.outro = input}
                                            onChange={(e, value) => this.setState({outro: value})}
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
                                            value={'16050660'}
                                            fullWidth={true}
                                            ref={(input) => this.cep = input}
                                            onChange={(e, value) => this.setState({cep: value})}
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
                                        <TextField 
                                            hintText="Estado"
                                            floatingLabelText="Estado"
                                            type="text"
                                            value={this.state.estado}
                                            fullWidth={true}
                                            ref={(input) => this.estado = input}
                                            onChange={(e, value) => this.setState({estado: value})}
                                        />
                                    </div>
                                    <div className="col-md-12 col-lg-6">
                                        <TextField 
                                            hintText="Cidade"
                                            floatingLabelText="Cidade"
                                            type="text"
                                            value={this.state.cidade}
                                            fullWidth={true}
                                            ref={(input) => this.cidade = input}
                                            onChange={(e, value) => this.setState({cidade: value})}
                                        />
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
                                            value={this.state.numero}
                                            fullWidth={true}
                                            ref={(input) => this.numero = input}
                                            onChange={(e, value) => this.setState({numero: value})}
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
                                            value={this.state.comple}
                                            fullWidth={true}
                                            ref={(input) => this.comple = input}
                                            onChange={(e, value) => this.setState({comple: value})}
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
                                            onClick={() => this.saveStudentsProfile()}
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