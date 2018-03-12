import React, { Component } from 'react';
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
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';

//Icon
import NewIco from 'material-ui/svg-icons/content/add';
import CancelIo from 'material-ui/svg-icons/content/block';
import Delete from 'material-ui/svg-icons/action/delete';



class Category extends Component {
    constructor(){
        super();
        this.state = {
            open: false,
            provider: JSON.parse(localStorage.getItem('provider')),
            categoryTable: JSON.parse(localStorage.getItem('category')),
            idCategory: '',
            description: '',
            labelUrl: '',
            enableButton: true,
            alert: false,
            disable: false,
            enableDelete: true,
            
            errorDesc: '',
            erroLabel:'',

            //state da tabela
            fixedHeader: true,
            stripedRows: false,
            showRowHover: false,
            selectable: true,
            multiSelectable: false,
            enableSelectAll: false,
            deselectOnClickaway: true,
            showCheckboxes: false,
            height: '300px',
        }
    }

    componentDidMount() {
        this.getCategory();
    }
  
    openDialog = (source) => {
        this.setState({open: true});  
        this.setState({alert: false});
        this.setState({disable: false});
        
        if(source === 'update'){
            this.setState({enableDelete: false})
        }else{
            this.setState({idCategory: ''});
            this.setState({descriCategory: ''});
            this.setState({labelUrl: ''})      
        }
    }

    closeDialog = () =>{
        this.setState({open: false});
    }


    makeDataForCategory = (opcao, _id) => {
        return{
            _id: this.state.idCategory,
            description: this.description.input.value,
            labelUrl: this.labelUrl.input.value,
            provider: this.state.provider
        }  
    }

    fieldValidation = () => {
        var valid = true;
        if(this.description.input.value === '') {
            valid = false;
            this.setState({errorDesc: 'Nome da categoria é obrigatorio'});
        }
        if(this.labelUrl.input.value === '') {
            valid = false;
            this.setState({erroLabel: 'Label da URL, da categoria é obrigatorio'});
        }

        return valid;
    }
    createUpdateCategory = () => {
        if(this.fieldValidation() === true){
            HttpService.make().post('/createUpdateGrid', this.makeDataForCategory())
                              .then(success => {
                                  this.closeDialog();
                                  this.getCategory();
                              })
                              .catch(error =>{
                                  console.log('Erro ao salvar a categoria');
                              })
        }
       
    }

    deleteCategory = () => {
        if(this.fieldValidation() === true){
            HttpService.make().post('/deleteGrid', this.makeDataForCategory())
                       .then(success =>{
                           this.closeDialog();
                           this.getCategory();
                        })
                        .catch(error => {
                            this.setState({alert: true})
                            this.setState({disable: true})
                       })
        }
    }

    getCategory = () =>{
        HttpService.make().get('/getGrid')
                   .then(success => {
                        this.setState({categoryTable:[{_id: '',description: ''}]});
                        localStorage.setItem('category', JSON.stringify(success.data));
                        this.setState({categoryTable: JSON.parse(localStorage.getItem('category'))});
                   })
                   .catch(error => {
                       console.log('Erro ao carregar as categorias que estão salvas no banco');
                   })
    }

    handleCellClick(col)
    {   
        let desc = this.state.categoryTable[col].description;
        this.setState({idCategory: this.state.categoryTable[col]._id});
        this.setState({description: desc});
        this.setState({labelUrl: this.state.categoryTable[col].labelUrl})
        this.openDialog('update');          
    }
  
    render(){
        const actions = [
            <RaisedButton
                label="salvar"
                backgroundColor="#0ac752"
                icon={<NewIco color="#FFF"/>}
                labelStyle={{color: 'white'}}
                style={{marginRight:'20px'}}
                onClick={this.createUpdateCategory}

            />,
            <RaisedButton
                label="Excluir"
                backgroundColor="#DD2C00"
                icon={<Delete color="#FFF"/>}
                labelStyle={{color: 'white'}}
                style={{marginRight:'20px'}}
                disabled={this.state.enableDelete}
                onClick={this.deleteCategory}
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
                    label="adicinar categoria"
                    backgroundColor="#0ac752"
                    icon={<NewIco color="#FFF"/>}
                    labelStyle={{color: 'white'}}
                    style={{float: 'right', margin:'20px'}}
                    fullWidth={true}
                    onClick={this.openDialog}
                />
                <br/><br/><br/><br/>
                <Table
                    height={this.state.height}
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
                            <TableHeaderColumn tooltip="The ID">ID</TableHeaderColumn>
                            <TableHeaderColumn tooltip="The Name">Descrição</TableHeaderColumn>
                            <TableHeaderColumn tooltip="The Name">Label URL</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody
                        displayRowCheckbox={this.state.showCheckboxes}
                        deselectOnClickaway={this.state.deselectOnClickaway}
                        showRowHover={this.state.showRowHover}
                        stripedRows={this.state.stripedRows}
                    >
                        {this.state.categoryTable.map( (row, index) => (
                            <TableRow key={index}>
                                <TableRowColumn>{row._id}</TableRowColumn>
                                <TableRowColumn>{row.description}</TableRowColumn>
                                <TableRowColumn>{row.labelUrl}</TableRowColumn>
                            </TableRow>
                         ))}
                    </TableBody>
                </Table>


                <Dialog
                    title="Categoria"
                    actions={actions}
                    modal={true}
                    open={this.state.open}
                    style={{textAlign: 'center'}}
                >
                    {
                        this.state.alert === true ?
                            <div className="alert alert-danger" role="alert">
                                Não e possivel excluir uma categoria que tenha sub-categorias cadastradas
                            </div>: ''
                    }
                    <TextField 
                        floatingLabelText="Categoria"
                        fullWidth={true}
                        defaultValue={this.state.description}
                        ref={(input) => {this.description = input;} }
                        errorText={this.state.errorDesc}
                    />
                    <TextField 
                        floatingLabelText="Label url"
                        fullWidth={true}
                        defaultValue={this.state.labelUrl}
                        ref={(input) => {this.labelUrl = input;} }
                        errorText={this.state.erroLabel}
                    />

                </Dialog>                
            </div>
        );
    }
}

export default Category;