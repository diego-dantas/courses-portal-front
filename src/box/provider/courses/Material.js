import React, { Component } from 'react';
import HttpService from '../../../service/http/HttpService';


//componentes 
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField'
import Dialog from 'material-ui/Dialog';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Toggle from 'material-ui/Toggle';
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


class Material extends Component{

    constructor(props) {
        super(props);
        this.state = {
            courses: JSON.parse(localStorage.getItem('course')),
            steps: JSON.parse(localStorage.getItem('steps')),
            material: JSON.parse(localStorage.getItem('material')),
            open: false,
            enable:true,
            enableDelete: true,
            idCourse: 0,
            idSteps: 0,
            idMaterial: 0,
            type: '',
            name: '',
            order: '',
            url: '',
            statusMaterial: false,
            labelMaterial: 'Inativo',
            statusDownload: false,
            labelDownload: 'Não',


            //state error 
            errorName: '',
            errorOrder: '',
        }

    }
    
    componentDidMount() {
        this.getMaterial();
    }

    openDialog = (source) => {
        this.setState({steps: JSON.parse(localStorage.getItem('steps'))});
        this.setState({courses: JSON.parse(localStorage.getItem('course'))});

        this.setState({open: true});
        this.setState({errorName: ''});
        this.setState({errorOrder: ''});
       
        if(source === 'update'){
            this.setState({enable: false});
            this.setState({enableDelete: false});
        }else{
            this.setState({enable: true});
            this.setState({enableDelete: true});
            this.setState({idMaterial: ''});
            this.setState({idCourse: 0});
            this.setState({idSteps: 0});
            this.setState({order: ''});
            this.setState({name: ''});
            this.setState({statusMaterial: false});
            this.setState({labelMaterial: 'Inativo'});
            this.setState({statusDownload: false});
            this.setState({labelDownload: 'Não'});
        }
    }

    closeDialog = () => {
        this.setState({open: false});
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

    //Metodo para tratamento da mudança do status
    changeStatus(event, isInputChecked){
        this.setState({statusMaterial: isInputChecked})
        
        if(!this.state.statusMaterial){
            this.setState({labelMaterial: 'Ativo'})
        }else{
            this.setState({labelMaterial: 'Inativo'})
        }
                
    }

    changeDownload(event, isInputChecked){
        this.setState({statusDownload: isInputChecked})
        
        if(!this.state.statusDownload){
            this.setState({labelDownload: 'Sim'})
        }else{
            this.setState({labelDownload: 'Não'})
        }     
    }
    handleCellClick(col){   
               
        //populo os valores para os states
        this.setState({idCourse: this.state.material[col].steps.course._id});
        this.setState({idSteps: this.state.material[col].steps._id});
        this.setState({idMaterial: this.state.material[col]._id});
        this.setState({order: this.state.material[col].materialOrder});
        this.setState({name: this.state.material[col].name});
        this.setState({statusMaterial: this.state.material[col].status});
        this.state.material[col].status === true ? this.setState({labelMaterial: 'Ativo'}) : this.setState({labelMaterial: 'Inativo'});
        this.setState({statusDownload: this.state.material[col].download});
        this.state.material[col].download === true ? this.setState({labelDownload: 'Sim'}) : this.setState({labelDownload: 'Não'});
        
        this.openDialog('update');   
    }

    getMaterial = () => {
        HttpService.make().get('/getMaterial')
                          .then(success => {
                              localStorage.setItem('material', JSON.stringify(success.data));
                              this.setState({material: JSON.parse(localStorage.getItem('material'))});
                          })
                          .catch(Error =>{
                              console.log('Erro ao buscar os cursos/planos');
                          })
    }
    validateField = () => {
        var valid = true;
        if(this.order.input.value === '') {
            this.setState({errorOrder: 'Order é Obrigatório'}); 
            valid = false;
        }
            
        if(this.name.input.value === '') {
            this.setState({errorName: 'O nome é Obrigatório'}); 
            valid = false;    
        }

        return valid;
    }
    changedField = () => {
        if(this.order.input.value !== '') this.setState({errorOrder: ''});
        if(this.name.input.value  !== '') this.setState({errorName: ''});
    }
    createUpdateMaterial = () =>{
        if(this.validateField()){
            console.log(this.makeForDataMaterial());
            HttpService.make().post('/createUpdateMaterial', this.makeForDataMaterial())
                              .then(success => {
                                  this.getMaterial();
                                  this.closeDialog();
                              })
                              .catch(error => {
                                  console.log('Erro ao salvar o material');
                              })
        }
        
        
    }

    deleteMaterial = () => {
        HttpService.make().post('/deleteMaterial', this.makeForDataMaterial())
                   .then(success => {
                        alert('Dados excluido com sucesso');
                        this.getMaterial();
                        this.closeDialog();
                   })
                   .catch(error => {
                        console.log('Erro ao excluir o curso/plano');
                   })
    }

    makeForDataMaterial = () =>{
        return{
            _id: this.state.idMaterial,
            materialOrder: this.order.input.value,
            name: this.name.input.value,
            type: '',
            url: '',
            download: this.state.statusDownload,
            status: this.state.statusMaterial,
            steps: {
                _id: this.state.idSteps
            }
        }
    }
    render(){

        const actions = [
            <RaisedButton
                label="salvar"
                backgroundColor="#0ac752"
                icon={<NewIco color="#FFF"/>}
                labelStyle={{color: 'white'}}
                style={{marginRight:'20px'}}
                onClick={this.createUpdateMaterial}
                disabled={this.state.enable}

            />,
            <RaisedButton
                label="Excluir"
                backgroundColor="#DD2C00"
                icon={<Delete color="#FFF"/>}
                labelStyle={{color: 'white'}}
                style={{marginRight:'20px'}}
                disabled={this.state.enableDelete}
                onClick={this.deleteMaterial}
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
            this.state.material !== null ?
                this.state.material.map((row, i) =>(          
                    <TableRow key={i}>
                        <TableRowColumn>{row._id}</TableRowColumn>
                        <TableRowColumn>{row.name}</TableRowColumn>
                        <TableRowColumn>{row.status === true ? 'ATIVO' : 'INATIVO'}</TableRowColumn>
                        <TableRowColumn>{row.download === true ? 'SIM' : 'Não'}</TableRowColumn>
                        <TableRowColumn>{row.steps.name}</TableRowColumn>
                    </TableRow>
                )) :''         
        ]

        
        return(
            <div>
                <RaisedButton
                    label="Adcionar Material"
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
                            <TableHeaderColumn tooltip="Status">Status</TableHeaderColumn>
                            <TableHeaderColumn tooltip="Status">Download</TableHeaderColumn>
                            <TableHeaderColumn tooltip="Status">Steps</TableHeaderColumn>
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
                    title="Material"
                    actions={actions}
                    modal={true}
                    open={this.state.open}
                    autoScrollBodyContent={true}
                >   
                    <div className="row">
                        <div className="col-md-6 col-sm-6">
                            <Toggle 
                                label={'Status: ' + this.state.labelMaterial}
                                labelPosition="right"
                                defaultToggled={this.state.statusMaterial}
                                onToggle={(event, isInputChecked) => this.changeStatus(event, isInputChecked)}
                            />
                        </div>
                        <div className="col-md-6 col-sm-6">
                            <Toggle 
                                label={'Download: ' + this.state.labelDownload}
                                labelPosition="right"
                                defaultToggled={this.state.statusDownload}
                                onToggle={(event, isInputChecked) => this.changeDownload(event, isInputChecked)}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6 col-sm-6">
                            <SelectField
                                floatingLabelText="Cursos"
                                value={this.state.idCourse}
                                onChange={this.changeCourse}
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
                    <div className="row">
                        <div className="col-md-6 col-sm-6">
                            <TextField
                                floatingLabelText="Ordem"
                                type="number"
                                disabled={this.state.enable}
                                onChange={this.changedField}
                                errorText={this.state.errorOrder}
                                defaultValue={this.state.order}
                                ref={(input) => {this.order = input;} }
                            />  
                               
                        </div>         
            
                        <div className="col-md-6 col-sm-6">
                            <TextField
                                floatingLabelText="Nome"
                                type="text"
                                disabled={this.state.enable}
                                onChange={this.changedField}
                                errorText={this.state.errorName}
                                defaultValue={this.state.name}
                                ref={(input) => {this.name = input;} }
                            />  
                               
                        </div>
                    </div>                  
                </ Dialog>
                     
            </div>
        );
    }

}


export default Material;