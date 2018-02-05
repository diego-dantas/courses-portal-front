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
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem'
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';

class SubCategory extends Component {
    constructor (){
        super();
        this.state = {
            openCreate: false,
            openUpdate: false,
            value: 0,
            provider: JSON.parse(localStorage.getItem('provider')),
            categoryTable: JSON.parse(localStorage.getItem('category')),
            idCategory: 0,
            descriCategory: '',
            


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

    makeDataForCategory = (opcao, id) => {
        var valida = true;
        var i = 0;
        
        while(valida){
            if(id == this.state.categoryTable[i]._id){
                valida = false;
                console.log(this.state.categoryTable[i])
                break;
            }
            i++;
        }
        
        
        if(opcao == 'create'){
            return{
                description: this.subCategory.input.value,
                grid: this.state.categoryTable[i]
            }  
        }else if(opcao == 'update'){
            return{
                _id: this.state.idCategory,
                description: this.categoryUpdate.input.value,
                provider: this.state.provider
            }  
        }else if(opcao == 'delete'){
            return{
                _id: this.state.idCategory,
                description: this.state.descriCategory
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
        
        if(this.state.idCategory == 0){
            alert('Por favor escolher uma categoria');
        }else{
            console.log(JSON.stringify(this.makeDataForCategory('create', this.state.idCategory)));
            
            HttpService.make().post('/createSubGrid', this.makeDataForCategory('create'))
                    .then(success => {
                            this.handleCloseCreate();
                            this.getCategory();
                    })
                    .catch(error =>{
                        console.log('Erro na criação da categoria');
                    })
        }
    }

    deleteCategory = () => {
     /*   HttpService.make().post('/deleteGrid', this.makeDataForCategory('delete'))
                   .then(success =>{
                       this.handleCloseUpdate();
                       this.getCategory();
                   })
                   .catch(error => {
                       console.log('erro ao excluir o registro')
                   })*/
    }

    updateCategory = ()  => {
       /*
        HttpService.make().post('/updateGrid', this.makeDataForCategory('update'))
                   .then(success => {
                       alert('dados atualizados com sucesso');
                       this.handleCloseUpdate();
                       this.getCategory();
                   })
                   .catch(error => {
                       console.log('erro ao atualizar o cadastro de categoria');
                   })*/
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
                label="cancelar"
                backgroundColor="#DD2C00"
                icon={<CancelIo color="#FFF"/>}
                labelStyle={{color: 'white'}}
                style={{marginRight:'20px'}}
                onClick={this.handleCloseUpdate}
            />,
            <RaisedButton
                label="Excluir"
                backgroundColor="#DD2C00"
                icon={<CancelIo color="#FFF"/>}
                labelStyle={{color: 'white'}}
                style={{marginRight:'20px'}}
                onClick={this.deleteCategory}
            />
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
                <br/><br/><br/><br/><br/>
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
            </div>
        );
    }
}

export default SubCategory;