import React, { Component } from 'react';

import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import Toggle from 'material-ui/Toggle';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import NewIco from 'material-ui/svg-icons/content/add';
import CancelIo from 'material-ui/svg-icons/content/block'
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';
class Courses extends Component {

    constructor(props){
        super(props);
        this.state = {
            category: JSON.parse(localStorage.getItem('category')),
            subCategory: JSON.parse(localStorage.getItem('subCategory')),
            openCreate: false,
            statusCourse: false,
            cat: 0,
            subCat: 0,
            labelStatus: 'Inativo',

            //state da validação de compo
            errorName: '',
            errorDescricao: '',

            disableField: true,
        }
    }
    styles = {
        headline: {
            fontSize: 24,
            paddingTop: 16,
            marginBottom: 12,
            fontWeight: 400,
        },
        slide: {
            padding: 10,
        },
        tabs:{
            backgroundColor:"rgb(0, 188, 212)",
            zIndex:2
        },
        tab:{
            backgroundColor:"#fff",
            color:"rgb(0, 188, 212)"
        },
        paddingAbout :{
            paddingLeft: "150px",
            paddingRight: "10px",
            marginLeft: "100px",
            marginRight: "10px"
        }
    };

    componentDidMount() {
        
        this.state.subCategory.map((row, i) => {
            if(row.grid._id === 2){
                console.log(row.description);
            }
        })
        
        
        console.log(this.state.subCategory);
    }
    

    handleChange = (value) => this.setState({slideIndex: value});
    
    handleToggle(event, isInputChecked){

        this.setState({statusCourse: isInputChecked})
        
        if(!this.state.statusCourse){
            this.setState({labelStatus: 'Ativo'})
        }else{
            this.setState({labelStatus: 'Inativo'})
        }
        
    }

    categoryChange = (event, index, value) => {
        this.setState({cat: value});
        this.setState({subCat: 0});
        if(value !== 0) this.setState({disableField: false})
        if(value === 0) this.setState({disableField: true})

        
       // this.setState({idCategory: value})
    }

    subCategoryChange = (event, index, value) => {
        this.setState({subCat: value});
       // this.setState({idCategory: value})
    }
    handleOpenCreate = () => {
        this.setState({openCreate: true})
    }

    handleCloseCreate = () => {
        this.setState({openCreate: false})
    }

    //metodo de validação de compo
    validateField = () => {
        if(this.name.input.value === '') this.setState({errorName: 'O Nome do curso é Obrigatório'}); 
        if(this.description.input.value === '') this.setState({errorDescricao: 'A Descrição do curso é Obrigatória'});    
    }
    //Metodos de crud de dados 
    createCourse = () => {
        this.validateField();
    }
    render(){
        const actions = [
            <RaisedButton
                label="salvar"
                backgroundColor="#0ac752"
                icon={<NewIco color="#FFF"/>}
                labelStyle={{color: 'white'}}
                style={{marginRight:'20px'}}
                onClick={this.createCourse}
                disabled={this.state.disableField}

            />,
            <RaisedButton
                label="cancelar"
                backgroundColor="#DD2C00"
                icon={<CancelIo color="#FFF"/>}
                labelStyle={{color: 'white'}}
                onClick={this.handleCloseCreate}
            />
        ]

        return(
            <div>
                <RaisedButton
                    label="adicionar curso"
                    backgroundColor="#0ac752"
                    icon={<NewIco color="#FFF"/>}
                    labelStyle={{color: 'white'}}
                    style={{float: 'right', margin:'20px'}}
                    fullWidth={true}
                    onClick={this.handleOpenCreate}
                /> 
                <br/><br/><br/><br/>
                <Table
                    height='300px'
                    fixedHeader={this.state.fixedHeader}
                    onCellClick={(col) => this.handleCellClick(col)}                    
                >
                    <TableHeader
                        displaySelectAll={this.state.showCheckboxes}
                        adjustForCheckbox={this.state.showCheckboxes}
                        enableSelectAll={this.state.enableSelectAll}
                    >
                        <TableRow>
                            <TableHeaderColumn tooltip="ID">ID</TableHeaderColumn>
                            <TableHeaderColumn tooltip="Descrição">Nome</TableHeaderColumn>
                            <TableHeaderColumn tooltip="Status">Status</TableHeaderColumn>
                            <TableHeaderColumn tooltip="Status">Categoria</TableHeaderColumn>
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
                    label="Adicionar Curso"
                    actions={actions}
                    open={this.state.openCreate}
                    contentStyle={{width: '80%', height: '100%', maxWidth: 'none'}}
                >
                    <Toggle 
                        label={'Status: ' + this.state.labelStatus}
                        labelPosition="right"
                        onToggle={(event, isInputChecked) => this.handleToggle(event, isInputChecked)}
                    />
                    <div className="row">
                        <div className="col-md-6">
                            <SelectField
                                floatingLabelText="Categoria"
                                value={this.state.cat}
                                onChange={this.categoryChange}
                            >  
                                <MenuItem value={0} primaryText="Categorias"/>
                                {this.state.category.map( (row, index) => (
                                    <MenuItem value={row._id} primaryText={row.description}/>
                                ))}
                            
                            </SelectField>
                        </div>
                        <div className="col-md-6">
                            <SelectField
                                floatingLabelText="Sub-Categoria"
                                value={this.state.subCat}
                                onChange={this.subCategoryChange}
                                disabled={this.state.disableField}
                            >  
                                <MenuItem value={0} primaryText="Sub-Categoria"/>
                                {this.state.subCategory.map( (row, index) => (
                                    row.grid._id === this.state.cat ?
                                        <MenuItem value={row._id} primaryText={row.description}/>:''                           
                                ))}
                            
                            </SelectField>
                        </div>
                    </div>
                    <TextField 
                        floatingLabelText="Nome"
                        fullWidth={true}
                        disabled={this.state.disableField}
                        errorText={this.state.errorName}
                        ref={(input) => {this.name = input;} }
                    />
                    <TextField 
                        floatingLabelText="Descrição"
                        fullWidth={true}
                        disabled={this.state.disableField}
                        errorText={this.state.errorDescricao}
                        ref={(input) => {this.description = input;} }
                    />
                    <TextField 
                        floatingLabelText="Objetivo"
                        fullWidth={true}
                        disabled={this.state.disableField}
                        ref={(input) => {this.objective = input;} }
                    />
                    <div className="row">
                        <div className="col-md-6">
                            <TextField 
                                floatingLabelText="Preço"
                                type="number"
                                disabled={this.state.disableField}
                                ref={(input) => {this.price = input;} }
                            />
                        </div>
                        <div className="col-md-6">
                        <TextField 
                            floatingLabelText="Carga horária"
                            type="number"
                            disabled={this.state.disableField}
                            ref={(input) => {this.hours = input;} }
                        />
                        </div>
                    </div>
                </Dialog>
            </div>
        );
    }
}

export default Courses;