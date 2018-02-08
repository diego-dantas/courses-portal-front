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
import NewIco from 'material-ui/svg-icons/content/add';
import CancelIo from 'material-ui/svg-icons/content/block'
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem'

class SubCategory extends Component {
    constructor (){
        super();
        this.state = {
            openCreate: false,
            openUpdate: false,
            value: 0,
            provider: JSON.parse(localStorage.getItem('provider')),
            categoryTable: JSON.parse(localStorage.getItem('category')),
            subCategoryTable: JSON.parse(localStorage.getItem('subCategory')),
            idCategory: 0,
            descriCategory: '',
            idSubCategory: 0,
            descriSubCategory: '',


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

    makeDataForCategory = (opcao, id) => {
        
        var categorySub = '';
        this.state.categoryTable.map((row, index) =>{
            if(row._id === id)
                categorySub = row;
        })
        
        
        if(opcao === 'create'){
            return{
                description: this.subCategory.input.value,
                grid: categorySub
            }  
        }else if(opcao === 'update'){
            return{
                _id: this.state.idSubCategory,
                description: this.SubcategoryUpdate.input.value,
                grid: {_id: this.state.idCategory}
            }  
        }else if(opcao === 'delete'){
            return{
                _id: this.state.idSubCategory,
                description: this.SubcategoryUpdate.input.value,
                grid: {_id: this.state.idCategory}
            }  
        }
              
    }
    handleChange = (event, index, value) => {
        this.setState({value});
        this.setState({idCategory: value})
    }

    handleOpenCreate = () => {
        this.getCategory();
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

    createCategory = () => {
        
        if(this.state.idCategory === 0){
            alert('Por favor escolher uma categoria');
        }else{
            
            
            HttpService.make().post('/createSubGrid', this.makeDataForCategory('create', this.state.idCategory))
                    .then(success => {
                            this.handleCloseCreate();
                            this.getSubCategory();
                    })
                    .catch(error =>{
                        console.log('Erro na criação da categoria');
                    })
        }
    }

    deleteCategory = () => {
        
        HttpService.make().post('/deleteSubGrid', this.makeDataForCategory('delete', this.state.idCategory))
                   .then(success =>{
                       this.handleCloseUpdate();
                       this.getSubCategory();
                   })
                   .catch(error => {
                       console.log('erro ao excluir o registro')
                   })
    }

    updateCategory = ()  => {

          
        if(this.state.idCategory === 0){
            alert('Por favor escolher uma categoria');
        }else{
            console.log(JSON.stringify(this.makeDataForCategory('update')));
            HttpService.make().post('/updateSubGrid', this.makeDataForCategory('update'))
                        .then(success => {
                            alert('dados atualizados com sucesso');
                            this.handleCloseUpdate();
                            this.getSubCategory();
                        })
                        .catch(error => {
                            console.log('erro ao atualizar o cadastro de categoria');
                        })
        }
    }

    getSubCategory = () =>{
        HttpService.make().get('/getSubGrid')
                   .then(success => {
                        this.setState({subCategoryTable:[{"_id": "", "description": "", "grid": {"_id": "", "provider": null,"description": ""}}]});
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
        let desc = this.state.subCategoryTable[col].description;
        this.setState({idSubCategory: this.state.subCategoryTable[col]._id});
        this.setState({descriSubCategory: desc});
        this.setState({value: this.state.subCategoryTable[col].grid._id});
        this.setState({idCategory: this.state.subCategoryTable[col].grid._id});
        this.handleOpenUpdate();          
    }

    render () {

        const actions = [
            <RaisedButton
                label="salvar"
                backgroundColor="#0ac752"
                icon={<NewIco color="#FFF"/>}
                labelStyle={{color: 'white'}}
                style={{marginRight:'20px'}}
                onClick={this.createCategory}

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
                label="Atualizar"
                backgroundColor="#0ac752"
                icon={<NewIco color="#FFF"/>}
                labelStyle={{color: 'white'}}
                style={{marginRight:'20px'}}
                onClick={this.updateCategory}

            />,
            <RaisedButton
                label="Excluir"
                backgroundColor="#DD2C00"
                icon={<CancelIo color="#FFF"/>}
                labelStyle={{color: 'white'}}
                style={{marginRight:'20px'}}
                onClick={this.deleteCategory}
            />,
            <RaisedButton
                label="cancelar"
                backgroundColor="#FF9800"
                icon={<CancelIo color="#FFF"/>}
                labelStyle={{color: 'white'}}
                style={{marginRight:'20px'}}
                onClick={this.handleCloseUpdate}
            />
        ]

       

        
        const bodyTable = [
            this.state.subCategoryTable.map( (row, index) => (
                <TableRow key={index}>
                    <TableRowColumn>{row._id}</TableRowColumn>
                    <TableRowColumn>{row.description}</TableRowColumn>
                    <TableRowColumn>{row.grid.description}</TableRowColumn>
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
                    onClick={this.handleOpenCreate}
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
                    open={this.state.openCreate}
                >   
                    <SelectField
                        floatingLabelText="Categoria"
                        value={this.state.value}
                        onChange={this.handleChange}
                    >  
                        <MenuItem value={0} primaryText="Categorias"/>
                        {this.state.categoryTable.map( (row, index) => (
                            <MenuItem value={row._id} primaryText={row.description}/>
                         ))}
                      
                    </SelectField>
                    <TextField 
                        floatingLabelText="Sub Categoria"
                        fullWidth={true}
                        disabled={this.state.disableField}
                        ref={(input) => {this.subCategory = input;} }
                    />
                </Dialog>

                <Dialog
                    title="Sub Categoria"
                    actions={actionsUpdate}
                    modal={true}
                    open={this.state.openUpdate}
                >
                     <SelectField
                        floatingLabelText="Categoria"
                        value={this.state.value}
                        onChange={this.handleChange}
                    >  
                        <MenuItem value={0} primaryText="Categorias"/>
                        {this.state.categoryTable.map( (row, index) => (
                            <MenuItem value={row._id} primaryText={row.description}/>
                         ))}
                      
                    </SelectField>
                    <TextField 
                        floatingLabelText="Sub Categoria"
                        fullWidth={true}
                        defaultValue={this.state.descriSubCategory}
                        ref={(input) => {this.SubcategoryUpdate = input;} }
                    />
                </Dialog>
            </div>
        );
    }
}

export default SubCategory;