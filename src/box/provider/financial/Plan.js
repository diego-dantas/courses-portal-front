import React, { Component } from 'react';
import PubSub from 'pubsub-js';
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';

import HttpService from '../../../service/http/HttpService';
import RaisedButton from 'material-ui/RaisedButton';
import NewIco from 'material-ui/svg-icons/content/add';
import CancelIo from 'material-ui/svg-icons/content/block'
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import Toggle from 'material-ui/Toggle';

import Dropzone from './../../../service/Dropzone';



class Plan extends Component {

    constructor(){
        super();
        this.state = {
            tablePlan: JSON.parse(localStorage.getItem('plan')),
            subCategoryTable: JSON.parse(localStorage.getItem('subCategory')),
            openCreate: false,
            openUpdate: false,
            status: false,
            idPlan: '',
            descPlan: '',
            wayImg: '',
             //state da tabela
             fixedHeader: true,
             stripedRows: false,
             showRowHover: false,
             selectable: true,
             multiSelectable: false,
             enableSelectAll: false,
             deselectOnClickaway: true,
             showCheckboxes: false,
        }
    }

    componentDidMount() {
        this.getPlan();
    }
    

    handleOpenCreate = () => {
        this.setState({openCreate: true});   
    }
    handleOpenUpdate = () => {        
        this.setState({openUpdate: true});       
    }

    handleCloseCreate = () =>{
        this.setState({openCreate: false});        
    }

    handleCloseUpdate = () =>{        
        this.setState({openUpdate: false});   
    }

    setDateStart = (date) => {
        this.setState({dateStart: date.target.value })
    }

    setDateFinished = (date) => {
        this.setState({dateFinished: date.target.value })
    }

    handleCellClick(col)
    {   
        //converto o retorno da data do banco
        let desc = this.state.tablePlan[col].description;
             
        //populo os valores para os states
        this.setState({idPlan: this.state.tablePlan[col]._id});
        this.setState({descPlan: desc});
        this.setState({wayImg: ''});
        this.setState({status: this.state.tablePlan[col].status});


        this.handleOpenUpdate();          
    }

    handleToggle(event, isInputChecked){
        this.setState({status: isInputChecked})
    }

    formateDate = (date) => {       
        var dt = new Date(date);
        var nextDate = dt.getDate();
        dt.setDate(nextDate);
        var newDate = dt.toLocaleString();
        return  newDate;
    }
    makeDataForPlan = () => {
        return{
            _id: this.state.idPlan,
            description: this.description.input.value,
            wayImagen: 'wayImagen',
            status: this.state.status
        }
    }

    createPlan = () => {     

        console.log(JSON.stringify(this.makeDataForPlan()));
         
        HttpService.make().post('/createPlan', this.makeDataForPlan())
                            .then(success => {
                                alert('Plano incluido com sucesso');
                                this.getPlan();
                                this.handleCloseCreate();
                            })
                            .catch(error =>{
                                console.log('Erro ao criar uma promoção');
                            })
    }

    updatePromotions = () => {     
        
       console.log(JSON.stringify(this.makeDataForPlan()));
       HttpService.make().post('/updatePlan', this.makeDataForPlan())
                           .then(success => {
                               alert('Plano atualizado com sucesso');
                               this.getPlan();
                               this.handleCloseUpdate();
                           })
                           .catch(error =>{
                               console.log('Erro ao alterar o plano');
                           })
   }

   deletePromotions = () => {     
       
        HttpService.make().post('/deletePlan', this.makeDataForPlan())
                        .then(success => {
                            alert('Dados excluido com sucesso');
                            this.getPlan();
                            this.handleCloseUpdate();
                        })
                        .catch(error =>{
                            console.log('Erro ao exluir uma promoção');
                        })
    }

    getPlan = () => {
        HttpService.make().get('/getPlan')
                    .then(success =>{
                        localStorage.setItem('plan', JSON.stringify(success.data));
                        this.setState({tablePlan: JSON.parse(localStorage.getItem('plan'))});
                    })
                    .catch(error => {
                        console.log('Erro ao buscar as promoçoes');
                    })
    }

    uploadFile = () =>
    {
        PubSub.publish('dropzone-make-upload');
    };

    render(){
        
        //Botões para o Modal
        const actions = [
            <RaisedButton
                label="salvar"
                backgroundColor="#0ac752"
                icon={<NewIco color="#FFF"/>}
                labelStyle={{color: 'white'}}
                style={{marginRight:'20px'}}
                onClick={this.createPlan}

            />,
            <RaisedButton
                label="cancelar"
                backgroundColor="#DD2C00"
                icon={<CancelIo color="#FFF"/>}
                labelStyle={{color: 'white'}}
                onClick={this.handleCloseCreate}
            />
        ]

        const actionsUpdate = [
            <RaisedButton
                label="atualizar"
                backgroundColor="#0ac752"
                icon={<NewIco color="#FFF"/>}
                labelStyle={{color: 'white'}}
                style={{marginRight:'20px'}}
                onClick={this.updatePromotions}

            />,
            <RaisedButton
                label="excluir"
                backgroundColor="#DD2C00"
                icon={<CancelIo color="#FFF"/>}
                labelStyle={{color: 'white'}}
                style={{marginRight:'20px'}}
                onClick={this.deletePromotions}
            />,
            <RaisedButton
                label="cancelar"
                backgroundColor="#FF9800"
                icon={<CancelIo color="#FFF"/>}
                labelStyle={{color: 'white'}}
                onClick={this.handleCloseUpdate}
            />
        ]

     

        const bodyTable = [
            this.state.tablePlan.map((row, i) =>(
                <TableRow key={i}>
                    <TableRowColumn>{row._id}</TableRowColumn>
                    <TableRowColumn>{row.description}</TableRowColumn>
                    <TableRowColumn>{row.status === true ? 'ATIVO' : 'INATIVO'}</TableRowColumn>
                </TableRow>
            ))
           
             
            
        ]

        return(
            <div>
                <RaisedButton
                    label="adicinar Plano"
                    fullWidth={true}
                    backgroundColor="#0ac752"
                    icon={<NewIco color="#FFF"/>}
                    labelStyle={{color: 'white'}}
                    style={{float: 'right', marginTop:'20px'}}
                    onClick={this.handleOpenCreate}
                />
                 <br/><br/><br/>
                <Table
                    height='300px'
                    fixedHeader={this.state.fixedHeader}
                    fixedFooter={this.state.fixedFooter}
                    selectable={this.state.selectable}
                    multiSelectable={this.state.multiSelectable}
                    onCellClick={(col) => this.handleCellClick(col)}                    
                >
                    <TableHeader
                        displaySelectAll={this.state.showCheckboxes}
                        adjustForCheckbox={this.state.showCheckboxes}
                        enableSelectAll={this.state.enableSelectAll}
                    >
                        <TableRow>
                            <TableHeaderColumn tooltip="ID">ID</TableHeaderColumn>
                            <TableHeaderColumn tooltip="Descrição">Descrição</TableHeaderColumn>
                            <TableHeaderColumn tooltip="Status">Status</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody
                        displayRowCheckbox={this.state.showCheckboxes}
                        deselectOnClickaway={this.state.deselectOnClickaway}
                        showRowHover={this.state.showRowHover}
                        stripedRows={this.state.stripedRows}
                    >   
                        
                       {bodyTable}

                    </TableBody>
                </Table>

                <Dialog
                    title="Adicionar Plano"
                    actions={actions}
                    modal={true}
                    open={this.state.openCreate}
                >   
                    
                    <TextField 
                        floatingLabelText="Descrição"
                        fullWidth={true}
                        disabled={this.state.disableField}
                        ref={(input) => {this.description = input;} }
                    />
                    <Toggle
                        label="Status:"
                        defaultToggled={this.state.status}
                        style={{paddingLeft: '600px'}}
                        onToggle={(event, isInputChecked) => this.handleToggle(event, isInputChecked)}
                    />
                    <Dropzone limitFile={true}/>
                                        
                </Dialog>

                <Dialog
                    title="Alterar ou Excluir Plano"
                    actions={actionsUpdate}
                    modal={true}
                    open={this.state.openUpdate}
                >   
                    
                    <TextField 
                        floatingLabelText="Descrição"
                        fullWidth={true}
                        disabled={this.state.disableField}
                        defaultValue={this.state.descPlan}
                        ref={(input) => {this.description = input;} }
                    />
                    <Toggle
                    label="Status:"
                    defaultToggled={this.state.status}
                    style={{paddingLeft: '600px'}}
                    onToggle={(event, isInputChecked) => this.handleToggle(event, isInputChecked)}
                />
                <Dropzone limitFile={true}/>
                </Dialog>

            </div>
        );
    }
}

export default Plan;