import React, { Component } from 'react';
import HttpService from '../../../service/http/HttpService';

import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
  } from 'material-ui/Table';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem'

//Incon
import NewIco from 'material-ui/svg-icons/content/add';
import CancelIo from 'material-ui/svg-icons/content/block'
import Delete from 'material-ui/svg-icons/action/delete';
class SubCategory extends Component {
    constructor (){
        super();
        this.state = {
            open: false,
            value: 0,
            provider: JSON.parse(localStorage.getItem('provider')),
            categoryTable: JSON.parse(localStorage.getItem('category')),
            subCategoryTable: JSON.parse(localStorage.getItem('subCategory')),
            idCategory: 0,
            descriCategory: '',
            idSubCategory: 0,
            description: '',
            labelUrl: '',


            disableField: true,
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
        this.getSubCategory();
    }

    makeDataForCategory = () => {
        return{
            _id: this.state.idSubCategory,
            description: this.description.input.value,
            labelUrl: this.labelUrl.input.value,
            grid: {_id: this.state.idCategory}
        }  
    }


    handleChange = (event, index, value) => {
        this.setState({value});
        this.setState({idCategory: value})
        if(value === 0) this.setState({disableField: true})
        if(value !== 0) this.setState({disableField: false})
    }

    openDialog = (source) => {
        this.getCategory();
        this.setState({open: true});   
        this.setState({disableField: true});
        this.setState({errorDesc: ''});
        this.setState({erroLabel: ''});
        if(source === 'update'){
            this.setState({enableDelete: false});
            this.setState({disableField: false});
        }else{
            this.setState({description: ''});
            this.setState({value: ''});
            this.setState({idCategory: ''});
            this.setState({labelUrl: ''});
        }
    }
   
    closeDialog = () =>{
        this.setState({open: false});        
    }
    fieldValidation = () => {
        var valid = true;
        if(this.description.input.value === '') {
            valid = false;
            this.setState({errorDesc: 'Nome da Sub Categoria é obrigatorio'});
        }
        if(this.labelUrl.input.value === '') {
            valid = false;
            this.setState({erroLabel: 'Label da URL, da categoria é obrigatorio'});
        }

        return valid;
    }

    createUpdateCategory = () => {
        if(this.fieldValidation()){          
            HttpService.make().post('/createUpdateSubGrid', this.makeDataForCategory())
                    .then(success => {
                            this.getSubCategory();
                            this.closeDialog();
                            
                    })
                    .catch(error =>{
                        console.log('Erro na criação da categoria');
                    })
        }
    }

    deleteCategory = () => {
        if(this.fieldValidation()){  
            HttpService.make().post('/deleteSubGrid', this.makeDataForCategory())
                    .then(success =>{
                        this.getSubCategory();
                        alert('Dados excluidos com sucesso!');
                        this.closeDialog();
                    })
                    .catch(error => {
                        console.log('erro ao excluir o registro')
                    })
        }
    }


    getSubCategory = () =>{
        HttpService.make().get('/getSubGrid')
                   .then(success => {
                        localStorage.setItem('subCategory', JSON.stringify(success.data));
                        this.setState({subCategoryTable: JSON.parse(localStorage.getItem('subCategory'))});
                   })
                   .catch(error => {
                       console.log('Erro ao carregar as categorias que estão salvas no banco');
                   })
    }
    getCategory = () =>{
        HttpService.make().get('/getGrid')
                   .then(success => {
                        localStorage.setItem('category', JSON.stringify(success.data));
                        this.setState({categoryTable: JSON.parse(localStorage.getItem('category'))});
                   })
                   .catch(error => {
                       console.log('Erro ao carregar as categorias que estão salvas no banco');
                   })
    }
    handleCellClick(col)
    {   
        //let desc = this.state.subCategoryTable[col].description;
        this.setState({idSubCategory: this.state.subCategoryTable[col]._id});
        this.setState({description: this.state.subCategoryTable[col].description});
        this.setState({value: this.state.subCategoryTable[col].grid._id});
        this.setState({idCategory: this.state.subCategoryTable[col].grid._id});
        this.setState({labelUrl: this.state.subCategoryTable[col].labelUrl})
        this.openDialog('update');          
    }

    render () {

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

        
        const bodyTable = [
            this.state.subCategoryTable.map( (row, index) => (
                <TableRow key={index}>
                    <TableRowColumn>{row._id}</TableRowColumn>
                    <TableRowColumn>{row.description}</TableRowColumn>
                    <TableRowColumn>{row.grid.description}</TableRowColumn>
                    <TableRowColumn>{row.labelUrl}</TableRowColumn>
                </TableRow>
            ))  
        ]
        
                      
            
        return(
            <div>
                <RaisedButton
                    label="adicinar sub categoria"
                    backgroundColor="#0ac752"
                    icon={<NewIco color="#FFF"/>}
                    labelStyle={{color: 'white'}}
                    style={{float: 'right', marginTop:'20px'}}
                    fullWidth={true}
                    onClick={this.openDialog}
                />
                <br/><br/><br/>
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
                            <TableHeaderColumn tooltip="The Name">Sub Categoria</TableHeaderColumn>
                            <TableHeaderColumn tooltip="The Name">Categoria</TableHeaderColumn>
                            <TableHeaderColumn tooltip="The Name">Label URL</TableHeaderColumn>
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
                    title="Adicionar Sub Categoria"
                    actions={actions}
                    modal={true}
                    open={this.state.open}
                >   
                    <SelectField
                        floatingLabelText="Categoria"
                        value={this.state.value}
                        onChange={this.handleChange}
                    >  
                        <MenuItem value={0} primaryText="Categorias"/>
                        {this.state.categoryTable.map( (row, index) => (
                            <MenuItem 
                                key={index}
                                value={row._id} primaryText={row.description}
                            />
                         ))}
                      
                    </SelectField>
                    <TextField 
                        floatingLabelText="Sub Categoria"
                        fullWidth={true}
                        disabled={this.state.disableField}
                        defaultValue={this.state.description}
                        errorText={this.state.errorDesc}
                        ref={(input) => {this.description = input;} }
                    />
                    <TextField 
                        floatingLabelText="Label URL"
                        fullWidth={true}
                        disabled={this.state.disableField}
                        defaultValue={this.state.labelUrl}
                        errorText={this.state.erroLabel}
                        ref={(input) => {this.labelUrl = input;} }
                    />
                </Dialog>
            </div>
        );
    }
}

export default SubCategory;