import React, { Component } from 'react';
import HttpService from '../../../service/http/HttpService';
import Dropzone from '../../../service/Dropzone';
import PubSub from 'pubsub-js';

import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField'
import Dialog from 'material-ui/Dialog';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';

import Toggle from 'material-ui/Toggle';

//Icons
import NewIco from 'material-ui/svg-icons/content/add';
import CancelIo from 'material-ui/svg-icons/content/block'
import Delete from 'material-ui/svg-icons/action/delete';

class Question extends Component {

    constructor(){
        super();
        this.state = {
            courses:   JSON.parse(localStorage.getItem('course')),
            steps:     JSON.parse(localStorage.getItem('steps')),
            questions: JSON.parse(localStorage.getItem('questions')),
            
            //IDs
            idCourse:   0,
            idSteps:    0,
            idQuestion: 0,
            idAlter:    0,
            
            //status
            open:         false,
            status:       false,
            enable:       true,
            enableDelete: true,            

            //labels
            labelStatus: '',
            description: '',
            alterA:      '',
            alterB:      '',
            alterC:      '',
            alterD:      '',
            alterE:      '',   
            wayImage:    '',    
            
            showDropzone: false,
        }
    }

    componentDidMount() {
        this.getQuestions();
        PubSub.subscribe('close-home-model', this.closeAll);
    }

    closeAll = (key, value) =>{
        this.setState({'showDropzone':false});
        this.getQuestions();
    };

    openDialogImg = (id) => {
        this.setState({idQuestion: id});
        this.showModal('showDropzone')
    }

    showModal = (type)=>{
        let modal = {[type]:true};
        this.setState(modal);
    };

    openDialog = (source) => {
        this.getQuestions();
        this.setState({steps: JSON.parse(localStorage.getItem('steps'))});
        this.setState({courses: JSON.parse(localStorage.getItem('course'))});
        if(source === 'update'){
            
            this.setState({enableDelete: false});
            this.setState({enable:       false});
        }else{
            this.setState({enableDelete: true});
            this.setState({enable:       true});
            this.setState({status:       false});

            this.setState({idAlter:    0});
            this.setState({idCourse:   0});
            this.setState({idSteps:    0});
            this.setState({idQuestion: 0});

            this.setState({description: ''});
            this.setState({alterA:      ''});
            this.setState({alterB:      ''});
            this.setState({alterC:      ''});
            this.setState({alterD:      ''});
            this.setState({alterE:      ''});
            this.setState({wayImage:    ''});
        }

        this.state.status ? this.setState({labelStatus: 'Ativo'}) : this.setState({labelStatus: 'Inativo'});

        this.setState({open: true});
    }

    closeDialog = () => {
        this.setState({open: false});
    }

    //Change od component
    changeCourse = (event, index, idCourse) => {
        this.setState({idCourse});
        this.setState({steps: JSON.parse(localStorage.getItem('steps'))});
        if(idCourse !== 0 && this.state.idSteps !== 0) this.setState({enable: false});
        if(idCourse === 0) this.setState({enable: true});
    }

    changeSteps = (event, index, idSteps) => {
        this.setState({idSteps});
        if(idSteps !== 0 && this.state.idCourse !== 0) this.setState({enable: false});
        if(idSteps === 0) this.setState({enable: true});
    }

    changeAlternative = (event, index, idAlter) => {
        this.setState({idAlter});
    }

    changeStatus = (event, isInputChecked) => {
        this.setState({status: isInputChecked});
        isInputChecked ? this.setState({labelStatus: 'Ativo'}) : this.setState({labelStatus: 'Inativo'});
    }

    makeDataForQuestion = () => {
        return {
            _id         : this.state.idQuestion,
            description : this.description.input.refs.input.value,
            status      : this.state.status,
            correct     : this.state.idAlter,
            wayImage    : this.state.wayImage,
            alterA      : this.alterA.input.refs.input.value,     
            alterB      : this.alterB.input.refs.input.value,     
            alterC      : this.alterC.input.refs.input.value,     
            alterD      : this.alterD.input.refs.input.value,     
            alterE      : this.alterE.input.refs.input.value, 
            steps: {
                _id: this.state.idSteps
            }    
        }
    }
    //Crud Question
    createUpdateQuestion = () => { 
        this.setState({enable: true});
        HttpService.make().post('/createUpdateQuestion', this.makeDataForQuestion())
                          .then(success => {
                                this.getQuestions();
                                this.closeDialog();
                          })
                          .catch(error => {
                                console.log('Erro ao salvar a questão');
                          })
    }

    deleteQuestion = () => { 
        this.setState({enable: true});
        HttpService.make().post('/deleteQuestion', this.makeDataForQuestion())
                          .then(success => {
                                this.getQuestions();
                                alert('Dados excluido com sucesso');
                                this.closeDialog();
                          })
                          .catch(error => {
                                console.log('Erro ao excluir a questão');
                          })
    }


    getQuestions = () => {
        HttpService.make().get('/getQuestions')
                          .then(success => {
                                localStorage.setItem('questions', JSON.stringify(success.data));
                                this.setState({questions: JSON.parse(localStorage.getItem('questions'))});
                          })
                          .catch(error => {
                              console.log('Erro ao buscar as questões ' + error);
                          })
    }

    deleteFile = (path, id) => {
        let url = '/deleteFile?name='+path;
        console.log(url);
        HttpService.make().get(url)
                          .then(res => {
                                this.setState({wayImage: ''});
                                this.createUpdateQuestion();
                          })
                          .catch(error => {
                             console.log(error);
                          })
    }

    handleCellClick(col)
    {   
        //populo os valores para os states
        this.setState({idQuestion:  this.state.questions[col]._id});
        this.setState({idAlter:     this.state.questions[col].correct});
        this.setState({idCourse:    this.state.questions[col].steps.course._id});
        this.setState({idSteps:     this.state.questions[col].steps._id});
        this.setState({description: this.state.questions[col].description});
        this.setState({wayImage:    this.state.questions[col].wayImage});
        this.setState({alterA:      this.state.questions[col].alterA});
        this.setState({alterB:      this.state.questions[col].alterB});
        this.setState({alterC:      this.state.questions[col].alterC});
        this.setState({alterD:      this.state.questions[col].alterD});
        this.setState({alterE:      this.state.questions[col].alterE});

        
        this.openDialog('update');          
    }

    render(){

        //Botões para o Modal
        const actions = [

            <RaisedButton
                label="salvar"
                backgroundColor="#0ac752"
                icon={<NewIco color="#FFF"/>}
                labelStyle={{color: 'white'}}
                style={{marginRight:'20px'}}
                disabled={this.state.enable}
                onClick={this.createUpdateQuestion}

            />,
           <RaisedButton
                label="Excluir"
                backgroundColor="#DD2C00"
                icon={<Delete color="#FFF"/>}
                labelStyle={{color: 'white'}}
                style={{marginRight:'20px'}}
                disabled={this.state.enableDelete}
                onClick={this.deleteQuestion}
            />,
            <RaisedButton
                label="cancelar"
                backgroundColor="#FF9800"
                icon={<CancelIo color="#FFF"/>}
                labelStyle={{color: 'white'}}
                onClick={this.closeDialog}
            />
        ]
        const bodyTable = [
            this.state.questions !== null ?
                this.state.questions.map( (row, index) => (
                    <TableRow key={index}>
                        <TableRowColumn>{row._id}</TableRowColumn>
                        <TableRowColumn>{row.description}</TableRowColumn>
                        <TableRowColumn>{row.status ? 'ATIVO': 'INATIVO'}</TableRowColumn>
                        <TableRowColumn>{row.steps.course.name}</TableRowColumn>
                        <TableRowColumn>{row.steps.name}</TableRowColumn>
                        <TableRowColumn>
                            <FlatButton
                                label={'Alterar'}
                                primary={true}
                                onTouchTap={() => this.handleCellClick(index)}                
                                
                            />
                        </TableRowColumn>
                        <TableRowColumn>
                            <FlatButton
                                label={'Imagem'}
                                primary={true}
                                onClick={() => this.openDialogImg(row._id)}                
                            />
                        </TableRowColumn>
                    </TableRow>
                ))
            :''
        ]
        return(
            <div>
                <RaisedButton
                    label="adicionar Questão"
                    fullWidth={true}
                    backgroundColor="#0ac752"
                    icon={<NewIco color="#FFF"/>}
                    labelStyle={{color: 'white'}}
                    style={{float: 'right', marginTop:'20px'}}
                    onClick={this.openDialog}
                />
                <br/><br/><br/>
                <Table
                    height='300px'
                    fixedHeader={true}
                    selectable={true}
                    multiSelectable={false}               
                >
                    <TableHeader
                        displaySelectAll={false}
                        adjustForCheckbox={false}
                        enableSelectAll={false}
                    >
                        <TableRow>
                            <TableHeaderColumn tooltip="ID">ID</TableHeaderColumn>
                            <TableHeaderColumn tooltip="Descrição">Descrição</TableHeaderColumn>
                            <TableHeaderColumn tooltip="Código">Status</TableHeaderColumn>
                            <TableHeaderColumn tooltip="%">Curso</TableHeaderColumn>
                            <TableHeaderColumn tooltip="%">Steps</TableHeaderColumn>
                            <TableHeaderColumn>Alterar</TableHeaderColumn>
                            <TableHeaderColumn>Imagem</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody
                        displayRowCheckbox={false}
                        deselectOnClickaway={this.state.deselectOnClickaway}
                        showRowHover={this.state.showRowHover}
                        stripedRows={this.state.stripedRows}
                    >   
                        {bodyTable}

                    </TableBody>
                </Table>
                <Dialog
                    title="Questão"
                    actions={actions}
                    modal={true}
                    open={this.state.open}
                    autoScrollBodyContent={true}
                >   
                    <div className="row">
                        <div className="col-md-6 col-sm-6">
                            <br/>
                            <Toggle 
                                label={'Status: ' + this.state.labelStatus}
                                labelPosition="right"
                                defaultToggled={this.state.statusCourse}
                                onToggle={(event, isInputChecked) => this.changeStatus(event, isInputChecked)}
                            />
                        </div>
                        <div className="col-md-6 col-sm-6">
                            <SelectField
                                    floatingLabelText="Alternativa correta"
                                    value={this.state.idAlter}
                                    onChange={this.changeAlternative}
                                    fullWidth={true}
                                >  
                                    <MenuItem value={0} primaryText="Alternativa correta"/>
                                    <MenuItem value={1} primaryText="A"/>
                                    <MenuItem value={2} primaryText="B"/>
                                    <MenuItem value={3} primaryText="C"/>
                                    <MenuItem value={4} primaryText="D"/>
                                    <MenuItem value={5} primaryText="E"/>
                            </SelectField>
                        </div>  
                    </div>       
                    <div className="row">
                        <div className="col-md-6 col-sm-6">
                            <SelectField
                                floatingLabelText="Cursos"
                                value={this.state.idCourse}
                                onChange={this.changeCourse}
                                fullWidth={true}
                            >  
                                <MenuItem value={0} primaryText="Curso"/>
                                {
                                    this.state.courses === null ? '' :
                                        this.state.courses.map( (row, index) => (
                                            <MenuItem 
                                                key={index}
                                                value={row._id} primaryText={row.name}
                                            />
                                        ))
                                
                                }
                        
                            </SelectField>
                        </div>         
            
                        <div className="col-md-6 col-sm-6">
                            <SelectField
                                floatingLabelText="Steps"
                                value={this.state.idSteps}
                                onChange={this.changeSteps}
                                fullWidth={true}
                            >  
                                <MenuItem value={0} primaryText="Steps"/>
                                {   this.state.steps !== null ?
                                        this.state.steps.map( (row, index) => (
                                            row.course._id === this.state.idCourse ?
                                                <MenuItem 
                                                    key={index}
                                                    value={row._id} primaryText={row.name}
                                                />: ''
                                        )): ''
                                }
                            </SelectField>
                        </div>
                    </div>
                    <TextField
                        floatingLabelText="Descrição"
                        type="text"
                        fullWidth={true}
                        multiLine={true}
                        rows={2}
                        rowsMax={6}
                        defaultValue={this.state.description}
                        ref={(input) => {this.description = input;} }
                    />
                    <br/><br/>
                    <label> Alternativas:</label>
                    <TextField
                        floatingLabelText='Alternativa A'
                        type="text"
                        fullWidth={true}
                        multiLine={true}
                        rows={2}
                        rowsMax={6}
                        defaultValue={this.state.alterA}
                        ref={(input) => {this.alterA = input;} }
                    />  

                    <TextField
                        floatingLabelText='Alternativa B'
                        type="text"
                        fullWidth={true}
                        multiLine={true}
                        rows={2}
                        rowsMax={6}
                        defaultValue={this.state.alterB}
                        ref={(input) => {this.alterB = input;} }
                    />  
                    <TextField
                        floatingLabelText='Alternativa C'
                        type="text"
                        fullWidth={true}
                        multiLine={true}
                        rows={2}
                        rowsMax={6}
                        defaultValue={this.state.alterC}
                        ref={(input) => {this.alterC = input;} }
                    />  
                    <TextField
                        floatingLabelText='Alternativa D'
                        type="text"
                        fullWidth={true}
                        multiLine={true}
                        rows={2}
                        rowsMax={6}
                        defaultValue={this.state.alterD}
                        ref={(input) => {this.alterD = input;} }
                    />  
                    <TextField
                        floatingLabelText='Alternativa E'
                        type="text"
                        fullWidth={true}
                        multiLine={true}
                        rows={2}
                        rowsMax={6}
                        defaultValue={this.state.alterE}
                        ref={(input) => {this.alterE = input;} }
                    />  
                    <div className="row">
                        <div className="col-md-6 col-sm-6">
                            { 
                                this.state.wayImage !== '' ?
                                    <figure>
                                        <img 
                                            alt={this.state.description}
                                            src={'http://localhost:8080/api/getFile?name='+this.state.wayImage} 
                                            style={{width: '50%', height: '50%', border: 'solid 2px', marginTop: '20px'}}
                                        />
                                    </figure> :''
                            }
                        </div>
                        <div className="col-md-6 col-sm-6">
                            { 
                                this.state.wayImage !== '' ?
                                    <FlatButton
                                        label={'Excluir'}
                                        primary={true}
                                        onClick={() => this.deleteFile(this.state.wayImage, this.state.idCourse)}                
                                    />
                                : ''
                            }
                        </div>
                     </div>    
                </Dialog>

                {
                    this.state.showDropzone ?
                        <Dropzone 
                            limitFile={true}
                            local={'question'}
                            id={this.state.idQuestion}
                        />: null
                }
            </div>
        )
    }
}

export default Question;