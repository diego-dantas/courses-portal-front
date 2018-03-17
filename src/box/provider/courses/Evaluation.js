import React, { Component } from 'react';
import HttpService          from '../../../service/http/HttpService';

import TextField    from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton   from 'material-ui/FlatButton';
import SelectField  from 'material-ui/SelectField';
import MenuItem     from 'material-ui/MenuItem';
import Toggle       from 'material-ui/Toggle';
import Dialog       from 'material-ui/Dialog';
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';

//Icons
import NewIco   from 'material-ui/svg-icons/content/add';
import CancelIo from 'material-ui/svg-icons/content/block';
import Delete   from 'material-ui/svg-icons/action/delete';


class Evaluation extends Component {

    constructor(){
        super();
        this.state = {
            courses:     JSON.parse(localStorage.getItem('course')),
            steps:       JSON.parse(localStorage.getItem('steps')),
            questions:   JSON.parse(localStorage.getItem('questions')),
            evaluations: JSON.parse(localStorage.getItem('evaluations')),
            evalQuestio: JSON.parse(localStorage.getItem('evalQuestio')),
            //IDs
            idCourse:     0,
            idSteps:      0,
            idEvaluation: 0,

            name:        '',
            errorName:   '',
            labelStatus: '',

            //status
            open:         false,
            status:       false,
            enable:       true,
            enableDelete: true,
            openQuestion: false,

            arrayQuestion:    [],
            arrayNewQuestion: []

        }
    }

    componentDidMount() {
        this.getEvaluations();
        this.getEvaluationQuestion();
    }

    handleToggle = (event, toggled, col) => {
        
        this.setState({
          [event.target.name]: toggled,
        });

        if(toggled){
            
            var find = false;
            this.state.arrayNewQuestion.map((row, index) =>(
                row === this.state.questions[col]._id ? find = true : ''
            ))

            if(!find)
                this.state.arrayNewQuestion.push(this.state.questions[col]._id);

        }else{

            var i = -1;        
            this.state.arrayNewQuestion.map((row, index) =>(
                row === this.state.questions[col]._id ? 
                    i = index: ''
            ))
            if(i >= 0)
                this.state.arrayNewQuestion.splice(i, 1);
        }
        console.log(this.state.arrayNewQuestion);
    }
    openDialog = (source) => {

        if(source === 'update'){

            this.setState({enable:       false});
            this.setState({enableDelete: false});
        }else{
            this.setState({enable:       true});
            this.setState({enableDelete: true});
            this.setState({status:       false});
            
            this.setState({idCourse:     0});
            this.setState({idSteps:      0});
            this.setState({idEvaluation: 0});
            this.setState({name: ''});  

        }

        this.state.status ? this.setState({labelStatus: 'Ativo'}) : this.setState({labelStatus: 'Inativo'});
        this.setState({open: true});
    }

    closeDialog = () => {
        this.setState({open: false});
    }

    validationOfField = () => {
        var valid = true;
        if(this.name.input.value === '') {
            valid = false;
            this.setState({errorName: 'Campo obrigatório'});
        }
        return valid;
    }

    //Change of component
    changeField = () => {
        if(this.name.input.value !== '') this.setState({errorName: ''});
    }

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

    changeStatus = (event, isInputChecked) => {
        this.setState({status: isInputChecked});
        isInputChecked ? this.setState({labelStatus: 'Ativo'}) : this.setState({labelStatus: 'Inativo'});
    }

    makeDataForEvaluation = () => {
        return {
            _id:    this.state.idEvaluation,
            name:   this.name.input.value,
            status: this.state.status,
            steps: {
                _id: this.state.idSteps
            }
        }
    }

    createUpdateEvaluation = () => {
        if(this.validationOfField()){
            HttpService.make().post('/createUpdateEvaluation', this.makeDataForEvaluation())
                              .then(success => {
                                    this.getEvaluations();
                                    alert('Dados salvo com sucesso');
                                    this.closeDialog();
                              })
                              .catch(error => {
                                    console.log('Erro ao salvar a avaliação');
                              })
        }
    }

    deleteEvaluation = () => { 
        this.setState({enable: true});
        HttpService.make().post('/deleteEvaluation', this.makeDataForEvaluation())
                          .then(success => {
                                this.getEvaluations();
                                alert('Dados excluido com sucesso');
                                this.closeDialog();
                          })
                          .catch(error => {
                                console.log('Erro ao excluir a avaliação');
                          })
    }


    getEvaluations = () => {
        HttpService.make().get('/getEvaluations')
                          .then(success => {
                              console.log(success.data);
                                localStorage.setItem('evaluations', JSON.stringify(success.data));
                                this.setState({evaluations: JSON.parse(localStorage.getItem('evaluations'))});
                          })
                          .catch(error => {
                              console.log('Erro ao buscar as avaliações ' + error);
                          })
    }



    openLinkQuestion = (col) => {       
        console.log('open')
        this.setState({arrayQuestion : []});
        this.setState({arrayNewQuestion : []});
        
        this.setState({questions : JSON.parse(localStorage.getItem('questions'))});
        this.setState({idEvaluation: this.state.evaluations[col]._id});
        this.setState({name:         this.state.evaluations[col].name});
        this.setState({idSteps:      this.state.evaluations[col].steps._id});
        this.setState({openQuestion: true});
    }

    closeLinkQuestion = () => {
        this.setState({openQuestion: false});
    }

    updateEvaluation = (col) => {

       //populo os valores para os states
       this.setState({idEvaluation: this.state.evaluations[col]._id});
       this.setState({idCourse:     this.state.evaluations[col].steps.course._id});
       this.setState({idSteps:      this.state.evaluations[col].steps._id});
       this.setState({name:         this.state.evaluations[col].name});
          
        this.openDialog('update');  
    }

    saveEvaluationQuestion = () => {
        HttpService.make().post('/saveEvaluationQuestion', this.makeDataForQuestion())
                          .then(success => {
                                this.getEvaluationQuestion();
                                alert('Questões atualizadas com sucesso');
                                this.closeLinkQuestion();
                          })
                          .catch(error => {
                              console.log('deu merda kkkkk');
                          })
    }

    makeDataForQuestion = () => {
        
        let valor = [];
        this.state.arrayNewQuestion.map((row, index) => (
               valor.push({
                            _id: "",
                            question : { 
                                _id : row 
                            }, 
                            evaluation : { 
                                _id :  this.state.idEvaluation  
                            } 
                        }
                    )
            
        ))
        return valor;
    }

    //valida se a questão está salva no banco
    validStatus = (id, i) => {
        
        this.state.evalQuestio.map((row1, index) => (
            
            row1.evaluation._id === this.state.idEvaluation ?
                this.validID(row1.question._id) : ''
        ))            

        var status = false;
        this.state.arrayQuestion.map((row, i) => (
             id === row ? status = true : ''
        ))

        return status;
    }

    validID = (id) => {
        var find = false;

        this.state.arrayQuestion.map((row2, index) =>(
            row2 === id ? find = true : ''
        ))

        if(!find){
            this.state.arrayQuestion.push(id);
            this.state.arrayNewQuestion.push(id);
        }
    }

    getEvaluationQuestion = () => {
        HttpService.make().get('/getEvaluationQuestion')
                          .then(success => {
                                localStorage.setItem('evalQuestio', JSON.stringify(success.data));
                                this.setState({evalQuestio: JSON.parse(localStorage.getItem('evalQuestio'))});
                          })
                          .catch(error => {
                              console.log('Erro ao buscar as questões da avaliação');
                          })
    }
       
    render() {

         //Botões para o Modal
         const actions = [
            
            <RaisedButton
                label="salvar"
                backgroundColor="#0ac752"
                icon={<NewIco color="#FFF"/>}
                labelStyle={{color: 'white'}}
                style={{marginRight:'20px'}}
                disabled={this.state.enable}
                onClick={this.createUpdateEvaluation}
            />,
            <RaisedButton
                 label="Excluir"
                 backgroundColor="#DD2C00"
                 icon={<Delete color="#FFF"/>}
                 labelStyle={{color: 'white'}}
                 style={{marginRight:'20px'}}
                 disabled={this.state.enableDelete}
                 onClick={this.deleteEvaluation}
            />,
            <RaisedButton
                label="cancelar"
                backgroundColor="#FF9800"
                icon={<CancelIo color="#FFF"/>}
                labelStyle={{color: 'white'}}
                onClick={this.closeDialog}
            />
        ]

        const actQuestion = [
            
            <RaisedButton
                label="salvar"
                backgroundColor="#0ac752"
                icon={<NewIco color="#FFF"/>}
                labelStyle={{color: 'white'}}
                style={{marginRight:'20px'}}
                onClick={this.saveEvaluationQuestion}
            />,
            <RaisedButton
                label="cancelar"
                backgroundColor="#FF9800"
                icon={<CancelIo color="#FFF"/>}
                labelStyle={{color: 'white'}}
                onClick={this.closeLinkQuestion}
            />
        ]
        const bodyTable = [
            this.state.evaluations !== null ?
                this.state.evaluations.map( (row, index) => (
                    <TableRow key={index}>
                        <TableRowColumn>{row._id}</TableRowColumn>
                        <TableRowColumn>{row.name}</TableRowColumn>
                        <TableRowColumn>{row.status ? 'ATIVO': 'INATIVO'}</TableRowColumn>
                        <TableRowColumn>{row.steps.course.name}</TableRowColumn>
                        <TableRowColumn>{row.steps.name}</TableRowColumn>
                        <TableRowColumn>
                            <FlatButton
                                label="Alterar"
                                primary={true}
                                onClick={() => this.updateEvaluation(index)}
                            />
                        </TableRowColumn>
                        <TableRowColumn>
                            <FlatButton
                                label="Questões"
                                primary={true}
                                onClick={() => this.openLinkQuestion(index)}
                            />
                        </TableRowColumn>
                    </TableRow>
                ))
            :''
        ]


        return (
            <div>
                 <RaisedButton
                    label="adicinar Avaliação"
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
                    multiSelectable={true}         
                >
                    <TableHeader
                        displaySelectAll={false}
                        adjustForCheckbox={false}
                        enableSelectAll={false}
                    >
                        <TableRow>
                            <TableHeaderColumn tooltip="ID">ID</TableHeaderColumn>
                            <TableHeaderColumn tooltip="Descrição">Nome</TableHeaderColumn>
                            <TableHeaderColumn tooltip="Código">Status</TableHeaderColumn>
                            <TableHeaderColumn tooltip="%">Curso</TableHeaderColumn>
                            <TableHeaderColumn tooltip="%">Steps</TableHeaderColumn>
                            <TableHeaderColumn >Alterar</TableHeaderColumn>
                            <TableHeaderColumn >Cursos</TableHeaderColumn>
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
                    title="Avaliação"
                    actions={actions}
                    modal={true}
                    open={this.state.open}
                    autoScrollBodyContent={true}
                >   
                    <Toggle 
                        label={'Status: ' + this.state.labelStatus}
                        labelPosition="right"
                        defaultToggled={this.state.statusCourse}
                        onToggle={(event, isInputChecked) => this.changeStatus(event, isInputChecked)}
                    />
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
                        floatingLabelText='Nome da avaliação'
                        type="text"
                        fullWidth={true}
                        onChange={this.changeField}
                        disabled={this.state.enable}
                        errorText={this.state.errorName}
                        defaultValue={this.state.name}
                        ref={(input) => {this.name = input;} }
                    />  
                </Dialog>
                <Dialog
                    title={"Questões para Avaliação " + this.state.name}
                    actions={actQuestion}
                    modal={true}
                    open={this.state.openQuestion}
                    autoScrollBodyContent={true}
                >   
                    <Table              
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
                            <TableHeaderColumn >ID</TableHeaderColumn>
                            <TableHeaderColumn >Descrição</TableHeaderColumn>
                            </TableRow>
                        </TableHeader>
                        <TableBody
                            displayRowCheckbox={false}
                            deselectOnClickaway={false}
                            showRowHover={false}
                            stripedRows={false}
                        >   
                            {
                                this.state.questions !== null ?
                                    this.state.questions.map( (row, index) => (
                                        row.steps._id === this.state.idSteps ?
                                            <TableRow key={index}>
                                                <TableRowColumn style={{width:'50px'}}>
                                                    {row._id}
                                                </TableRowColumn>
                                                <TableRowColumn>
                                                    {row.description}
                                                </TableRowColumn>
                                                <TableRowColumn style={{width:'70px'}}>
                                                    <Toggle
                                                        name={'name' + row._id}
                                                        label=""
                                                        onToggle={(event, toggled) => this.handleToggle(event, toggled, index)}
                                                        defaultToggled={this.validStatus(row._id, index)}
                                                    />
                                                </TableRowColumn>
                                            </TableRow>
                                        : ''
                                    ))
                                :''
                            }
                        </TableBody>
                    </Table>
                </Dialog>
            </div>
        )
    }
}

export default Evaluation;