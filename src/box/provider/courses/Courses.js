import React, { Component } from 'react';
import HttpService from '../../../service/http/HttpService';
import Dropzone from '../../../service/Dropzone';
import PubSub from 'pubsub-js';

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
            labelUrl: '',
            cat: 0,
            subCat: 0,
            home: 0,
            labelStatus: 'Inativo',
            wayImage: '',

            //state da validação de compo
            errorName: '',
            errorDescricao: '',
            erroLabel: '',

            disableField: true,

            showDropzone: false,
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
        PubSub.publish('header-label',"Cursos");
        this.getCourses();
        PubSub.subscribe('close-home-model', this.closeAll);
    }
    
    closeAll = (key, value) =>{
        this.setState({'showDropzone':false});
        this.getCourses();
    };

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

    //Metodos de tratamento de mudança de compo da sub-categoria
    homeChange = (event, index, value) => {
        this.setState({home: value});
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

    //valida o campo descrição na mudança
    labelChange = () => {
        if(this.state.erroLabel !== '')
            this.setState({erroLabel: ''});
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
        this.setState({wayImage: ''});
        this.setState({labelUrl: ''});
        this.setState({cat: 0});
        this.setState({subCat: 0});
        this.setState({home: 0});
        this.setState({errorDescricao: ''});
        this.setState({errorName: ''});
        this.setState({erroLabel: ''});
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
        this.getCourses();
        this.state.courses[col].status ? this.setState({labelStatus: 'Ativo'}) : this.setState({labelStatus: 'Inativo'});
        this.setState({idCourse: this.state.courses[col]._id});
        this.setState({statusCourse: this.state.courses[col].status});
        this.setState({nameCourse: this.state.courses[col].name});
        this.setState({descriCourse: this.state.courses[col].description});
        this.setState({obejCourse: this.state.courses[col].objective});
        this.setState({priceCourse: this.state.courses[col].price});
        this.setState({hoursCourse: this.state.courses[col].hours});
        this.setState({wayImage: this.state.courses[col].wayImage});
        this.setState({home: this.state.courses[col].home});
        this.setState({cat: this.state.courses[col].grid._id});
        this.setState({subCat: this.state.courses[col].subGrid._id});
        this.setState({labelUrl: this.state.courses[col].labelUrl});

        this.setState({disableField: false}) 
        this.setState({openCreate: true});     
    }

    openDialogImg = (id) => {
        this.setState({idCourse: id});
        this.showModal('showDropzone')
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

        if(this.labelUrl.input.value === '') {
            this.setState({erroLabel: 'A label da url é Obrigatória'}); 
            valid = false;    
        }

        return valid;
    }
    //Metodos de crud de dados 
    createCourse = () => {
        if(this.validateField() === true) {
            HttpService.make()
                       .post('/createUpdateCourse', this.makeDataForCourses())
                       .then(success => {
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

    deleteFile = (path, id) => {
        let url = '/deleteFile?name='+path;
        console.log(url);
        HttpService.make().get(url)
                          .then(res => {
                                this.setState({wayImage: ''});
                                this.createCourse();
                          })
                          .catch(error => {
                             console.log(error);
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
            wayImage: this.state.wayImage,
            home: this.state.home,
            status: this.state.statusCourse,
            labelUrl: this.labelUrl.input.value,
            grid: {
                _id: this.state.cat,
            },
            subGrid: {
                _id: this.state.subCat
            }
        }
    }

    showModal = (type)=>{
        let modal = {[type]:true};
        this.setState(modal);
    };
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
                                onClick={() => this.openDialogImg(row._id)}                
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
                    title="Curso"
                    actions={actions}
                    open={this.state.openCreate}
                    contentStyle={{width: '80%', height: '100%', maxWidth: 'none'}}
                    autoScrollBodyContent={true}
                >
                    <div className="row">
                        <div className="col-md-4 col-sm-4">
                            <Toggle 
                                label={'Status: ' + this.state.labelStatus}
                                labelPosition="right"
                                defaultToggled={this.state.statusCourse}
                                onToggle={(event, isInputChecked) => this.handleToggle(event, isInputChecked)}
                                style={{marginTop: '20px'}}
                            />
                        </div>
                        <div className="col-md-4 col-sm-4">
                            <SelectField
                                floatingLabelText="Home"
                                value={this.state.home}
                                onChange={this.homeChange}
                                fullWidth={true}                            
                                
                            >  
                                <MenuItem value={0} primaryText="No Home"/>
                                <MenuItem value={1} primaryText="Home 1"/>
                                <MenuItem value={2} primaryText="Home 2"/>
                                <MenuItem value={3} primaryText="Home 3"/>
                            </SelectField>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-4 col-sm-4">
                            <SelectField
                                floatingLabelText="Categoria"
                                value={this.state.cat}
                                onChange={this.categoryChange}
                                fullWidth={true}
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
                        <div className="col-md-4 col-sm-4">
                            <SelectField
                                floatingLabelText="Sub-Categoria"
                                value={this.state.subCat}
                                onChange={this.subCategoryChange}
                                fullWidth={true}                            
                                
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
                        <div className="col-md-4 col-sm-4">
                            <TextField 
                                floatingLabelText="Label url"
                                fullWidth={true}
                                defaultValue={this.state.labelUrl}
                                ref={(input) => {this.labelUrl = input;} }
                                errorText={this.state.erroLabel}
                                onChange={this.labelChange}
                            />
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
                    <div className="row">
                        <div className="col-md-6 col-sm-6">
                            { 
                                this.state.wayImage !== '' ?
                                    <figure>
                                        <img 
                                            alt={this.state.description}
                                            src={'http://localhost:8080/api/getFile?name='+this.state.wayImage} 
                                            style={{width: '50%', height: '50%', border: 'solid 2px', marginTop: '20px'}}
                                        />
                                    </figure> :''
                            }
                        </div>
                        <div className="col-md-6 col-sm-6">
                            { 
                                this.state.wayImage !== '' ?
                                    <FlatButton
                                        label={'Excluir'}
                                        primary={true}
                                        onClick={() => this.deleteFile(this.state.wayImage, this.state.idCourse)}                
                                    />
                                : ''
                            }
                        </div>
                     </div>
                
                    
                </Dialog>
                {
                    this.state.showDropzone ?
                        <Dropzone 
                            limitFile={true}
                            local={'courses'}
                            id={this.state.idCourse}
                        />: null
                }
                
                
            </div>
        );
    }
}

export default Courses;