import React, { Component } from 'react';
import HttpService from '../../../service/http/HttpService';
import Dropzone from '../../../service/Dropzone';

import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
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
            courses: JSON.parse(localStorage.getItem('course')),
            category: JSON.parse(localStorage.getItem('category')),
            subCategory: JSON.parse(localStorage.getItem('subCategory')),
            openCreate: false,
            openImg: false,
            idCourse: '',
            statusCourse: false,
            nameCourse: '',
            descriCourse: '',
            obejCourse: '',
            priceCourse: '',
            hoursCourse: '',
            cat: 0,
            subCat: 0,
            labelStatus: 'Inativo',
            wayImage: '',

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
        this.getCourses();
    }
    

    handleChange = (value) => this.setState({slideIndex: value});
    
    //Metodo para tratamento da mudança do status
    handleToggle(event, isInputChecked){

        this.setState({statusCourse: isInputChecked})
        
        if(!this.state.statusCourse){
            this.setState({labelStatus: 'Ativo'})
        }else{
            this.setState({labelStatus: 'Inativo'})
        }
        
    }

    //Metodos de tratamento de mudança de compo da categoria
    categoryChange = (event, index, value) => {
        this.setState({cat: value});
        this.setState({subCat: 0});
        if(value !== 0 && this.state.subCat !== 0) this.setState({disableField: false})
        if(value === 0 && this.state.subCat === 0) this.setState({disableField: true})
    }

    //Metodos de tratamento de mudança de compo da sub-categoria
    subCategoryChange = (event, index, value) => {
        this.setState({subCat: value});
        if(value !== 0) this.setState({disableField: false})
        if(value === 0) this.setState({disableField: true})
       // this.setState({idCategory: value})
    }

    //valida o campo nome na mudança
    nameChange = () => {
        if(this.state.errorName !== '')
            this.setState({errorName: ''});
    }

    //valida o campo descrição na mudança
    descriptionChange = () => {
        if(this.state.errorDescricao !== '')
            this.setState({errorDescricao: ''});
    }

    //metodo para abrir o modal
    handleOpenCreate = () => {
        this.setState({idCourse: ''});
        this.setState({statusCourse: false});
        this.setState({nameCourse: ''});
        this.setState({descriCourse: ''});
        this.setState({obejCourse: ''});
        this.setState({priceCourse: ''});
        this.setState({hoursCourse: ''});
        this.setState({cat: 0});
        this.setState({subCat: 0});
        this.setState({errorDescricao: ''});
        this.setState({errorName: ''});
        this.setState({disableField: true})
        this.setState({openCreate: true})
    }

    //metodo para fechar o modal 
    handleCloseCreate = () => {
        this.setState({openCreate: false})
    }   


    //metodo de click da tabela
    handleCellClick(col)
    {         
        this.state.courses[col].status ? this.setState({labelStatus: 'Ativo'}) : this.setState({labelStatus: 'Inativo'});
        this.setState({idCourse: this.state.courses[col]._id});
        this.setState({statusCourse: this.state.courses[col].status});
        this.setState({nameCourse: this.state.courses[col].name});
        this.setState({descriCourse: this.state.courses[col].description});
        this.setState({obejCourse: this.state.courses[col].objective});
        this.setState({priceCourse: this.state.courses[col].price});
        this.setState({hoursCourse: this.state.courses[col].hours});
        this.setState({wayImage: this.state.courses[col].wayImage});
        this.setState({cat: this.state.courses[col].grid._id});
        this.setState({subCat: this.state.courses[col].subGrid._id});

        this.setState({disableField: false}) 
        this.setState({openCreate: true});     
    }

    openDialogImg = () => {
        this.setState({openImg: true});
    }

    closeDialogImg = () => {
        this.setState({openImg: false});
    }
    //metodo de validação de compo
    validateField = () => {
        var valid = true;
        if(this.name.input.value === '') {
            this.setState({errorName: 'O Nome do curso é Obrigatório'}); 
            valid = false;
        }
            
        if(this.description.input.value === '') {
            this.setState({errorDescricao: 'A Descrição do curso é Obrigatória'}); 
            valid = false;    
        }

        return valid;
    }
    //Metodos de crud de dados 
    createCourse = () => {
        console.log('to aqui mano');
        if(this.validateField() === true) {
            console.log(this.makeDataForCourses());

            HttpService.make()
                       .post('/createUpdateCourse', this.makeDataForCourses())
                       .then(success => {
                           alert('Curso Salvo com sucesso');
                           this.getCourses();
                           this.handleCloseCreate();
                       })
                       .catch(error => {
                           console.log('Erro ao salvar o curso');
                       }) 
        }
    }


    getCourses = () => {
        HttpService.make()
                   .get('/getCourses')
                   .then(success => {
                        localStorage.setItem('course', JSON.stringify(success.data));
                        this.setState({courses: JSON.parse(localStorage.getItem('course'))});   
                   })
                   .catch(error => {
                       console.log('Erro ao buscar os cursos');
                   })
    }

    makeDataForCourses = () => {
        return {
            _id: this.state.idCourse,
            name: this.name.input.value,
            description: this.description.input.value,
            objective: this.objective.input.value,
            hours: this.hours.input.value,
            price: this.price.input.value,
            wayImage: "src/img/img.jpg",
            status: this.state.statusCourse,
            grid: {
                _id: this.state.cat,
            },
            subGrid: {
                _id: this.state.subCat
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

        const bodyTable = [
            this.state.courses !== null ?
                this.state.courses.map((row, i) =>(
                    <TableRow key={i}>
                        <TableRowColumn>{row._id}</TableRowColumn>
                        <TableRowColumn>{row.name}</TableRowColumn>
                        <TableRowColumn>{row.description}</TableRowColumn>
                        <TableRowColumn>{row.status === true ? 'ATIVO' : 'INATIVO'}</TableRowColumn>
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
                                onTouchTap={this.openDialogImg}                
                            />
                        </TableRowColumn>
                    </TableRow>
                )): ''
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
                    fixedHeader={true}
                    selectable={true}
                    multiSelectable={false}
                    //onCellClick={(col) => this.handleCellClick(col)}                    
                >
                    <TableHeader
                        displaySelectAll={false}
                        adjustForCheckbox={false}
                        enableSelectAll={false}
                    >
                        <TableRow>
                            <TableHeaderColumn tooltip="ID">ID</TableHeaderColumn>
                            <TableHeaderColumn tooltip="Descrição">Nome</TableHeaderColumn>
                            <TableHeaderColumn tooltip="Status">Descrição</TableHeaderColumn>
                            <TableHeaderColumn tooltip="Status">Status</TableHeaderColumn>
                            <TableHeaderColumn tooltip="Status">Alterar</TableHeaderColumn>
                            <TableHeaderColumn tooltip="Status">Imagem</TableHeaderColumn>
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
                    label="Adicionar Curso"
                    actions={actions}
                    open={this.state.openCreate}
                    contentStyle={{width: '80%', height: '100%', maxWidth: 'none'}}
                    autoScrollBodyContent={true}
                >
                    <Toggle 
                        label={'Status: ' + this.state.labelStatus}
                        labelPosition="right"
                        defaultToggled={this.state.statusCourse}
                        onToggle={(event, isInputChecked) => this.handleToggle(event, isInputChecked)}
                    />
                    <div className="row">
                        <div className="col-md-6 col-sm-6">
                            <SelectField
                                floatingLabelText="Categoria"
                                value={this.state.cat}
                                onChange={this.categoryChange}
                            >  
                                <MenuItem value={0} primaryText="Categorias"/>
                                {this.state.category.map( (row, index) => (
                                    <MenuItem 
                                        key={index}
                                        value={row._id} primaryText={row.description}
                                    />
                                ))}
                            
                            </SelectField>
                        </div>
                        <div className="col-md-6 col-sm-6">
                            <SelectField
                                floatingLabelText="Sub-Categoria"
                                value={this.state.subCat}
                                onChange={this.subCategoryChange}
                                
                            >  
                                <MenuItem value={0} primaryText="Sub-Categoria"/>
                                {this.state.subCategory.map( (row, index) => (
                                    row.grid._id === this.state.cat ?
                                        <MenuItem 
                                            key={index}
                                            value={row._id} primaryText={row.description}/>:''                           
                                ))}
                            
                            </SelectField>
                        </div>
                    </div>
                    <TextField 
                        floatingLabelText="Nome"
                        fullWidth={true}
                        defaultValue={this.state.nameCourse}
                        disabled={this.state.disableField}
                        errorText={this.state.errorName}
                        ref={(input) => {this.name = input;} }
                        onChange={this.nameChange}
                    />
                    <TextField 
                        floatingLabelText="Descrição"
                        defaultValue={this.state.descriCourse}
                        fullWidth={true}
                        disabled={this.state.disableField}
                        errorText={this.state.errorDescricao}
                        ref={(input) => {this.description = input;} }
                        onChange={this.descriptionChange}
                    />
                    <TextField 
                        floatingLabelText="Objetivo"
                        defaultValue={this.state.obejCourse}
                        fullWidth={true}
                        disabled={this.state.disableField}
                        ref={(input) => {this.objective = input;} }
                    />
                    <div className="row">
                        <div className="col-md-6 col-sm-6">
                            <TextField 
                                floatingLabelText="Preço"
                                defaultValue={this.state.priceCourse}
                                type="number"
                                disabled={this.state.disableField}
                                ref={(input) => {this.price = input;} }
                            />
                        </div>
                        <div className="col-md-6 col-sm-6">
                            <TextField 
                                floatingLabelText="Carga horária"
                                defaultValue={this.state.hoursCourse}
                                type="number"
                                disabled={this.state.disableField}
                                ref={(input) => {this.hours = input;} }
                            />
                        </div>
                    </div>
                    <TextField 
                        floatingLabelText="Caminho da imagem"
                        defaultValue={this.state.wayImage}
                        type="text"
                        disabled={true}
                                    
                    />
                </Dialog>
                <Dialog
                    open={this.state.openImg}
                    actions={<FlatButton label='Sair' primary={true} onTouchTap={this.closeDialogImg} fullWidth={true}/>}
                >
                    <Dropzone 
                        limitFile={true}
                        local={'courses'}
                    />
                </Dialog>
            </div>
        );
    }
}

export default Courses;