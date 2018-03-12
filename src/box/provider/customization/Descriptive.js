import React, { Component } from 'react';
import HttpService from '../../../service/http/HttpService';

import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';

//Icon
import NewIco from 'material-ui/svg-icons/content/add';
import CancelIo from 'material-ui/svg-icons/content/block'
import Delete from 'material-ui/svg-icons/action/delete';

class Descriptive extends Component {

    constructor(props){
        super(props)
        this.state ={
            descriptive: JSON.parse(localStorage.getItem('descriptive')),
            _id: '',
            title: '',
            content: '',
            errorTitle: '',
            errorContent: '',

            disabledDelete: true,
            open: false,
        }
    }
    componentDidMount() {
        this.getDescriptive();
    }
    

    openDialog = (source) => {
        

        if(source === 'update'){
            this.setState({disabledDelete: false})
        }else{
            this.setState({_id: ''});
            this.setState({title: ''});
            this.setState({content: ''});
            this.setState({disabledDelete: true});
            this.setState({errorTitle: ''});
            this.setState({errorContent: ''});
        }
        this.setState({open: true});
    }

    closeDialog = () => {
        this.setState({open: false});
    }

    handleCellClick(col){   
        
        //populo os valores para os states
        this.setState({_id: this.state.descriptive[col]._id});
        this.setState({title: this.state.descriptive[col].title});
        this.setState({content: this.state.descriptive[col].content});
        this.setState({disabledDelete: false});
        
        this.openDialog('update');   
    }


    //metodo para validar o campo
    validateField = () => {
        var valid = true;
        if(this.title.input.value === '') {
            this.setState({errorTitle: 'O titulo é Obrigatório'}); 
            valid = false;
        }
            
        if(this.content.input.value === '') {
            this.setState({errorContent: 'O conteudo é Obrigatório'}); 
            valid = false;    
        }
        return valid;
    }
    
    changedField = () => {
        if(this.title.input.value !== '') this.setState({errorTitle: ''});
        if(this.content.input.value  !== '') this.setState({errorContent: ''});
    }
    makeForDataDescriptive = () => {
        return {
            _id: this.state._id,
            title: this.title.input.value,
            content: this.content.input.value,
        }
    }
    createUpdateDescriptive = () =>{
        if(this.validateField()){
            console.log(this.makeForDataDescriptive());
            HttpService.make().post('/createUpdateDescriptive', this.makeForDataDescriptive())
                              .then(success => {
                                  alert('Dados salvo com sucesso');
                                  this.getDescriptive();
                                  this.closeDialog();
                              })
                              .catch(error => {
                                  console.log('Erro ao salvar o curso/plano');
                              })
        }
    }

    deleteDescriptive = () => {
        if(this.validateField()){
            console.log(this.makeForDataDescriptive());
            HttpService.make().post('/deleteDescriptive', this.makeForDataDescriptive())
                              .then(success => {
                                  alert('Dados Excluido com sucesso');
                                  this.getDescriptive();
                                  this.closeDialog();
                              })
                              .catch(error => {
                                  console.log('Erro ao Excluir os dados');
                              })
        }
    }

    getDescriptive = () => {
        HttpService.make().get('/getDescriptive')
                          .then(success => {
                            console.log(success.data);
                            localStorage.setItem('descriptive', JSON.stringify(success.data));
                            this.setState({descriptive: JSON.parse(localStorage.getItem('descriptive'))});
                          })
                          .catch(Error =>{
                            console.log('Erro ao buscar os cursos/planos');
                         })
    }
    render(){
        const actions = [
            <RaisedButton
                label="salvar"
                backgroundColor="#0ac752"
                icon={<NewIco color="#FFF"/>}
                labelStyle={{color: 'white'}}
                style={{marginRight:'20px'}}
                onClick={this.createUpdateDescriptive}
                disabled={this.state.enable}

            />,
            <RaisedButton
                label="Excluir"
                backgroundColor="#DD2C00"
                icon={<Delete color="#FFF"/>}
                labelStyle={{color: 'white'}}
                style={{marginRight:'20px'}}
                disabled={this.state.disabledDelete}
                onClick={this.deleteDescriptive}
            />,
            <RaisedButton
                label="cancelar"
                backgroundColor="#FF9800"
                icon={<CancelIo color="#FFF"/>}
                labelStyle={{color: 'white'}}
                onClick={this.closeDialog}
            />
        ]
        return(
            <div>
                <RaisedButton
                    label="adicinar Descrição"
                    backgroundColor="#0ac752"
                    icon={<NewIco color="#FFF"/>}
                    labelStyle={{color: 'white'}}
                    fullWidth={true}
                    style={{float: 'right', marginTop:'20px'}}
                    onClick={this.openDialog}
                /><br/><br/><br/><br/>
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
                            <TableHeaderColumn tooltip="Descrição">Titulo</TableHeaderColumn>
                            <TableHeaderColumn tooltip="Status">Conteudo</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody
                        displayRowCheckbox={false}
                        deselectOnClickaway={this.state.deselectOnClickaway}
                        showRowHover={this.state.showRowHover}
                        stripedRows={this.state.stripedRows}
                    >   
                        
                        {
                            this.state.descriptive !== null ?
                                this.state.descriptive.map((row, i) =>(          
                                    <TableRow key={i}>
                                        <TableRowColumn>{row._id}</TableRowColumn>
                                        <TableRowColumn>{row.title}</TableRowColumn>
                                        <TableRowColumn>{row.content}</TableRowColumn>
                                    </TableRow>
                                )) 
                            :''
                        }

                    </TableBody>
                </Table> 
                <Dialog
                    title="Descritivo"
                    actions={actions}
                    modal={true}
                    open={this.state.open}
                    autoScrollBodyContent={true}
                >
                    <TextField
                        floatingLabelText="Titulo"
                        fullWidth={true}
                        onChange={this.changedField}
                        errorText={this.state.errorTitle}
                        defaultValue={this.state.title}
                        ref={(input) => {this.title = input;} }
                    />  
                    <TextField
                        floatingLabelText="Conteudo"
                        fullWidth={true}
                        onChange={this.changedField}
                        errorText={this.state.errorContent}
                        defaultValue={this.state.content}
                        ref={(input) => {this.content = input;} }
                    />  
                </Dialog>   
            </div>
        );
    }
}

export default Descriptive;