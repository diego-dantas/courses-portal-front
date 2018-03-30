import React, { Component } from 'react';
import PubSub from 'pubsub-js';
import Dropzone from '../../../service/Dropzone';
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
import FlatButton from 'material-ui/FlatButton';
import NewIco from 'material-ui/svg-icons/content/add';
import CancelIo from 'material-ui/svg-icons/content/block'
import Delete from 'material-ui/svg-icons/action/delete';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import Toggle from 'material-ui/Toggle';


class Plan extends Component {

    constructor(){
        super();
        this.state = {
            tablePlan: JSON.parse(localStorage.getItem('plan')),
            openCreate: false,
            status: false,   
            idPlan: '',
            description: '',
            wayImagen: '',
            erroDescription: '',
            img: [],
            labelStatus: 'Inativo',
            enableDelete: true,

             //state da tabela
             fixedHeader: true,
             stripedRows: false,
             showRowHover: false,
             selectable: true,
             multiSelectable: false,
             enableSelectAll: false,
             deselectOnClickaway: true,
             showCheckboxes: false,

             fileSelec: [],

             showDropzone: false,
        }
    }

    componentDidMount() {
        this.getPlan();
        PubSub.subscribe('close-home-model', this.closeAll);
    }

    //Inicio do bloco de controle de imagem 
    showModal = (type)=>{
        let modal = {[type]:true};
        this.setState(modal);
    };

    closeAll = (key, value) =>{
        this.setState({'showDropzone':false});
        this.getPlan();
    };

    openDialogImg = (id) => {
        this.setState({idPlan: id});
        this.showModal('showDropzone')
    }

    closeDialogImg = () => {
        this.setState({openImg: false});
    }
    //Fim do bloco de controle da imagem

    handleOpenCreate = (source) => {
        this.getPlan();
        if(source === 'update'){
            this.setState({enableDelete: false});
        }else{
            this.setState({idPlan:   ''});
            this.setState({description: ''});
            this.setState({wayImagen:   ''});
            this.setState({status: false});
            this.setState({erroDescription:''});
            this.setState({enableDelete: true});
        }
        this.state.status ? this.setState({labelStatus: 'Ativo'}) : this.setState({labelStatus: 'Inativo'});
        this.setState({openCreate: true});   
    }

    handleCloseCreate = () =>{
        this.setState({openCreate: false});        
    }

    handleCellClick(col)
    {   
        //populo os valores para os states
        this.setState({idPlan: this.state.tablePlan[col]._id});
        this.setState({description: this.state.tablePlan[col].description});
        this.setState({wayImagen: this.state.tablePlan[col].wayImage});
        this.setState({status: this.state.tablePlan[col].status})   
        console.log(this.state.tablePlan[col].wayImage);
        let vam = <figure>
                    <img 
                        alt={this.state.description}
                        src={'http://localhost:8080/api/getFile?name='+this.state.tablePlan[col].wayImage} 
                        style={{width: '50%', height: '50%', border: 'solid 2px', marginTop: '20px'}}
                    />
                </figure>
        this.setState({img: vam})   
        this.handleOpenCreate('update');        
    }
    
    handleToggle(event, isInputChecked){
        
        this.setState({status: isInputChecked})
        
        if(!this.state.status){
            this.setState({labelStatus: 'Ativo'})
        }else{
            this.setState({labelStatus: 'Inativo'})
        }
        
    }

    validField = () =>{
        var valid = true;
        if(this.description.input.value === ''){
            this.setState({erroDescription: 'campo obrigatório'});
            valid = false;
        }
        return valid;
    }

    changeField = () => {
        if(this.description.input.value !== '')
            this.setState({erroDescription: ''});
    }

    makeDataForPlan = () => {
        return{
            _id: this.state.idPlan,
            description: this.description.input.value,
            wayImage: this.state.wayImagen,
            status: this.state.status
        }
    }

    createPlan = () => {      
        if(this.validField()){
            HttpService.make().post('/createUpdatePlan', this.makeDataForPlan())
                              .then(success => {
                                  this.getPlan();
                                  this.handleCloseCreate();
                              })
                              .catch(error =>{
                                  console.log('Erro ao salvar plano');
                              })
        }        
       
    }

    deletePlan = () => {     
        HttpService.make().post('/deletePlan', this.makeDataForPlan())
                        .then(success => {
                            alert('Dados excluido com sucesso');
                            this.getPlan();
                            this.handleCloseCreate();
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
                label="Excluir"
                backgroundColor="#DD2C00"
                icon={<Delete color="#FFF"/>}
                labelStyle={{color: 'white'}}
                style={{marginRight:'20px'}}
                disabled={this.state.enableDelete}
                onClick={this.deletePlan}
            />,
            <RaisedButton
                label="cancelar"
                backgroundColor="#FF9800"
                icon={<CancelIo color="#FFF"/>}
                labelStyle={{color: 'white'}}
                onClick={this.handleCloseCreate}
            />
        ]
        const bodyTable = [
            this.state.tablePlan.map((row, i) =>(
                <TableRow key={i}>
                    <TableRowColumn>{row._id}</TableRowColumn>
                    <TableRowColumn>{row.description}</TableRowColumn>
                    <TableRowColumn>{row.status === true ? 'ATIVO' : 'INATIVO'}</TableRowColumn>
                    <TableRowColumn>{row.wayImage}</TableRowColumn>
                    <TableRowColumn>
                            <FlatButton
                                label={'Alterar'}
                                primary={true}
                                onTouchTap={() => this.handleCellClick(i)}                
                                
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
                            <TableHeaderColumn tooltip="Status">Caminho</TableHeaderColumn>
                            <TableHeaderColumn tooltip="Status">Alterar</TableHeaderColumn>
                            <TableHeaderColumn tooltip="Status">Imagem</TableHeaderColumn>
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
                    autoScrollBodyContent={true}
                >   
                    <div className="row">
                        <div className="col-md-12 col-sm-12">
                            <TextField 
                                floatingLabelText="Descrição"
                                fullWidth={true}
                                disabled={this.state.disableField}
                                onChange={this.changeField}
                                errorText={this.state.erroDescription}
                                defaultValue={this.state.description}
                                ref={(input) => {this.description = input;} }
                            />
                        </div>
                        <div className="col-md-12 col-sm-12">
                            <Toggle 
                                label={'Status: ' + this.state.labelStatus}
                                labelPosition="right"
                                defaultToggled={this.state.status}
                                onToggle={(event, isInputChecked) => this.handleToggle(event, isInputChecked)}
                            />
                        </div>
                    </div>
                    {this.state.img}                     
                </Dialog>
                {
                    this.state.showDropzone ?
                        <Dropzone 
                            limitFile={true}
                            local={'plan'}
                            id={this.state.idPlan}
                        />: null
                }
            </div>
        );
    }
}

export default Plan;