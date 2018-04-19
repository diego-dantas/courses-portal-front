import React, { Component } from 'react';
import HttpService from '../../../service/http/HttpService';

//components material-ui
import RaisedButton from 'material-ui/RaisedButton';
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

//icones
import NewIco from 'material-ui/svg-icons/content/add';
import CancelIo from 'material-ui/svg-icons/content/block'
import Delete from 'material-ui/svg-icons/action/delete';

class Steps extends Component {
    constructor(props) {
        super(props);
        this.state = {
            courses: JSON.parse(localStorage.getItem('course')),
            steps: JSON.parse(localStorage.getItem('steps')),
            open: false,
            enable:true,
            enableDelete: true,
            idCourse: 0,
            idSteps: 0,
            stepsOrder: '',
            name: '',
            description: '',

            //state de validação 
            errorName: '',
            erroDescription: '',
            errorOrder: ''
        }

    }

    componentDidMount() {
        this.getSteps();
    }
    

    openDialog = (source) => {
        this.setState({courses: JSON.parse(localStorage.getItem('course'))});
        this.setState({open: true});
        this.setState({errorName: ''});
        this.setState({errorDescription: ''});
        this.setState({errorOrder: ''});

       
       
        if(source === 'update'){
            this.setState({enable: false});
            this.setState({enableDelete: false});
        }else{
            this.setState({enable: true});
            this.setState({enableDelete: true});
            this.setState({idCourse: ''});
            this.setState({idSteps: ''});
            this.setState({name: ''});
            this.setState({description: ''});
            this.setState({stepsOrder: ''})
        }
    }

    closeDialog = () => {
        this.setState({open: false});
    }

    changeCourse = (event, index, idCourse) => {
        this.setState({idCourse});
        if(idCourse !== 0) this.setState({enable: false});
        if(idCourse === 0) this.setState({enable: true});
    }
    handleCellClick(col){   
            
        //populo os valores para os states
        this.setState({idCourse: this.state.steps[col].course._id});
        this.setState({idSteps: this.state.steps[col]._id});
        this.setState({name: this.state.steps[col].name});
        this.setState({description: this.state.steps[col].description});
        this.setState({stepsOrder: this.state.steps[col].stepsOrder})
        
        this.openDialog('update');   
    }
    
    getSteps = () => {
        HttpService.make()
                   .get('/getSteps')
                   .then(success => {
                        localStorage.setItem('steps', JSON.stringify(success.data));
                        this.setState({steps: JSON.parse(localStorage.getItem('steps'))});
                   })
                   .catch(error => {
                        console.log('Erro ao buscar os passos do curso');
                   })
    }

    createUpdateSteps = () => {
        if(this.validateField() === true){
            HttpService.make()
                       .post('/createUpdateSteps', this.makeForDataSteps())
                       .then(success => {
                           this.getSteps();
                           this.closeDialog();
                       })
                       .catch(error => {
                           console.log('Erro ao salvar o steps');
                       })
        }
    }
    deleteSteps = () => {
        if(this.validateField() === true){
            HttpService.make()
                       .post('/deleteSteps', this.makeForDataSteps())
                       .then(success => {
                           alert('Steps excluido com sucesso');
                           this.getSteps();
                           this.closeDialog();
                       })
                       .catch(error => {
                           console.log('Erro ao excluir o steps');
                       })
        }
    }

    makeForDataSteps = () => {
        return{
            _id: this.state.idSteps,
            name: this.name.input.value,
            description: this.description.input.refs.input.value,
            stepsOrder: this.stepsOrder.input.value,
            course: {
                _id: this.state.idCourse
            }
        }
    }

    validateField = () => {
        var valid = true;
        if(this.name.input.value === '') {
            this.setState({errorName: 'O Nome do steps é Obrigatório'}); 
            valid = false;
        }
            
        if(this.description.input.refs.input.value === '') {
            this.setState({errorDescription: 'A Descrição do steps é Obrigatório'}); 
            valid = false;    
        }

        if(this.stepsOrder.input.value === ''){
            this.setState({errorOrder: 'O número da ordem é Obrigatório'}); 
            valid = false;    
        }

        return valid;
    }


    changedField = () => {
        if(this.stepsOrder.input.value !== '') this.setState({errorOrder: ''});
        if(this.name.input.value !== '') this.setState({errorName: ''});
        if(this.description.input.refs.input.value !== '') this.setState({errorDescription: ''});
    }
    render (){

        const actions = [
            <RaisedButton
                label="salvar"
                backgroundColor="#0ac752"
                icon={<NewIco color="#FFF"/>}
                labelStyle={{color: 'white'}}
                style={{marginRight:'20px'}}
                onClick={this.createUpdateSteps}
                disabled={this.state.enable}

            />,
            <RaisedButton
                label="Excluir"
                backgroundColor="#DD2C00"
                icon={<Delete color="#FFF"/>}
                labelStyle={{color: 'white'}}
                style={{marginRight:'20px'}}
                disabled={this.state.enableDelete}
                onClick={this.deleteSteps}
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
            this.state.steps !== null ?
                this.state.steps.map((row, i) =>(
                    <TableRow key={i}>
                        <TableRowColumn>{row._id}</TableRowColumn>
                        <TableRowColumn>{row.name}</TableRowColumn>
                        <TableRowColumn>{row.description}</TableRowColumn>
                        <TableRowColumn>{row.stepsOrder}</TableRowColumn>
                        <TableRowColumn>{row.course.name}</TableRowColumn>
                    </TableRow>
                )): ''
        ]
        return(
            <div>
                 <RaisedButton
                    label="adicionar Steps"
                    backgroundColor="#0ac752"
                    fullWidth={true}
                    icon={<NewIco color="#FFF"/>}
                    labelStyle={{color: 'white'}}
                    style={{float: 'right', margin:'20px'}}
                    onClick={this.openDialog}
                /> 
                <br/><br/><br/><br/>
                <Table
                    height='300px'
                    fixedHeader={true}
                    selectable={true}
                    multiSelectable={false}
                    onCellClick={(col) => this.handleCellClick(col)}                    
                >
                    <TableHeader
                        displaySelectAll={false}
                        adjustForCheckbox={false}
                        enableSelectAll={false}
                    >
                        <TableRow>
                            <TableHeaderColumn tooltip="ID">ID</TableHeaderColumn>
                            <TableHeaderColumn tooltip="Descrição">Nome</TableHeaderColumn>
                            <TableHeaderColumn tooltip="Status">Descrição</TableHeaderColumn>
                            <TableHeaderColumn tooltip="Status">Ordem</TableHeaderColumn>
                            <TableHeaderColumn tooltip="Status">Curso</TableHeaderColumn>
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
                    title="Steps / Curso"
                    actions={actions}
                    modal={true}
                    open={this.state.open}
                    autoScrollBodyContent={true}
                >   
                    <div className="row">
                        <div className="col-md-6 col-sm-6">
                            <SelectField
                                floatingLabelText="Cursos"
                                value={this.state.idCourse}
                                onChange={this.changeCourse}
                            >  
                                <MenuItem value={0} primaryText="Curso"/>
                                {   
                                    this.state.courses !== null ?
                                        this.state.courses.map( (row, index) => (
                                            <MenuItem 
                                                key={index}    
                                                value={row._id} primaryText={row.name}
                                            />
                                        ))
                                    :''
                                }
                        
                            </SelectField>
                        </div>         
            
                        <div className="col-md-6 col-sm-6">
                            <TextField
                                floatingLabelText="Ordem da etapa"
                                type="number"
                                disabled={this.state.enable}
                                defaultValue={this.state.stepsOrder}
                                errorText={this.state.errorOrder}
                                onChange={this.changedField}
                                ref={(input) => {this.stepsOrder = input;} }
                            />  
                        </div>
                    </div>
                    <TextField
                        floatingLabelText="Nome da etapa"
                        type="text"
                        fullWidth={true}
                        disabled={this.state.enable}
                        defaultValue={this.state.name}
                        errorText={this.state.errorName}
                        onChange={this.changedField}
                        ref={(input) => {this.name = input;} }
                    />  
                           
                    <TextField
                        floatingLabelText="Descrição da etapa"
                        type="text"
                        fullWidth={true}
                        multiLine={true}
                        rows={2}
                        rowsMax={4}
                        disabled={this.state.enable}
                        defaultValue={this.state.description}
                        errorText={this.state.errorDescription}
                        onChange={this.changedField}
                        ref={(input) => {this.description = input;} }
                    />  
                </ Dialog>
            </div>
        )
    }
}

export default Steps;