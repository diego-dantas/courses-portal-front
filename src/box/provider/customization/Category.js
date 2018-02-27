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
import CancelIo from 'material-ui/svg-icons/content/block';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';


class Category extends Component {
    constructor(){
        super();
        this.state = {
            openCreate: false,
            openUpdate: false,
            provider: JSON.parse(localStorage.getItem('provider')),
            categoryTable: JSON.parse(localStorage.getItem('category')),
            idCategory: '',
            descriCategory: '',
            enableButton: true,
            alert: false,
            disable: false,

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
  
    handleOpenCreate = () => {
        this.setState({openCreate: true});  
        this.setState({alert: false});
        this.setState({disable: false});
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

    makeDataForCategory = (opcao, _id) => {
        if(opcao === 'create'){
            return{
                description: this.category.input.value,
                provider: this.state.provider
            }  
        }else if(opcao === 'update'){
            return{
                _id: this.state.idCategory,
                description: this.categoryUpdate.input.value,
                provider: this.state.provider
            }  
        }else if(opcao === 'delete'){
            return{
                _id: this.state.idCategory,
                description: this.state.descriCategory
            }  
        }
              
    }

    createCategory = () => {
        
        HttpService.make().post('/createGrid', this.makeDataForCategory('create'))
                   .then(success => {
                        this.handleCloseCreate();
                        this.getCategory();
                   })
                   .catch(error =>{
                       console.log('Erro na criação da categoria');
                   })
    }

    deleteCategory = () => {
        HttpService.make().post('/deleteGrid', this.makeDataForCategory('delete'))
                   .then(success =>{
                       this.handleCloseUpdate();
                       this.getCategory();
                   })
                   .catch(error => {
                        this.setState({alert: true})
                        this.setState({disable: true})
                   })
    }

    updateCategory = ()  => {
       
        HttpService.make().post('/updateGrid', this.makeDataForCategory('update'))
                   .then(success => {
                       alert('dados atualizados com sucesso');
                       this.handleCloseUpdate();
                       this.getCategory();
                   })
                   .catch(error => {
                       console.log('erro ao atualizar o cadastro de categoria');
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
        let desc = this.state.categoryTable[col].description;
        this.setState({idCategory: this.state.categoryTable[col]._id});
        this.setState({descriCategory: desc});
        this.handleOpenUpdate();          
    }
  
    render(){
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
                disabled={this.state.disable}
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
        


        return(
            <div>
                <RaisedButton
                    label="adicinar categoria"
                    backgroundColor="#0ac752"
                    icon={<NewIco color="#FFF"/>}
                    labelStyle={{color: 'white'}}
                    style={{float: 'right', margin:'20px'}}
                    fullWidth={true}
                    onClick={this.handleOpenCreate}
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
                            </TableRow>
                         ))}
                    </TableBody>
                </Table>


                <Dialog
                    title="Adicionar categoria"
                    actions={actions}
                    modal={true}
                    open={this.state.openCreate}
                    style={{textAlign: 'center'}}
                >
                    <TextField 
                        floatingLabelText="Categoria"
                        fullWidth={true}
                        ref={(input) => {this.category = input;} }
                    />
                </Dialog>

                <Dialog
                    title="Categoria"
                    actions={actionsUpdate}
                    modal={true}
                    open={this.state.openUpdate}
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
                        defaultValue={this.state.descriCategory}
                        ref={(input) => {this.categoryUpdate = input;} }
                    />
                </Dialog>
                
            </div>
        );
    }
}

export default Category;