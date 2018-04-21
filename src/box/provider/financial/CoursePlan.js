import React, { Component } from 'react';
import HttpService from '../../../service/http/HttpService';
import _ from 'lodash';


//componentes 
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField'
import FlatButton   from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';


//icones
import NewIco from 'material-ui/svg-icons/content/add';
import CancelIo from 'material-ui/svg-icons/content/block'
import Delete from 'material-ui/svg-icons/action/delete';
import Search    from 'material-ui/svg-icons/action/search';
import Exposure    from 'material-ui/svg-icons/image/exposure';



class CoursesPlan extends Component{

    constructor(props) {
        super(props);
        this.state = {
            courses:     JSON.parse(localStorage.getItem('course')),
            plan:        JSON.parse(localStorage.getItem('plan')),
            coursePlan:  JSON.parse(localStorage.getItem('coursePlan')),
            category:    JSON.parse(localStorage.getItem('category')),
            subCategory: JSON.parse(localStorage.getItem('subCategory')),
            open: false,
            openClear: false,
            enable:true,
            enableDelete: true,
            idCourse: 0,
            idCoursePlan:'',
            valorCourse: 0,
            idPlan: 0,
            valorPlano: 0,
            percentage: 0,
            listCourses: [],
            listValueCourses: [],
            bodyTable: []
        }

    }
    
    componentDidMount() {
        this.getCoursePlan();
    }

    openDialog = (source) => {
        this.setState({courses:     JSON.parse(localStorage.getItem('course'))});
        this.setState({plan:        JSON.parse(localStorage.getItem('plan'))});
        this.setState({category:    JSON.parse(localStorage.getItem('category'))});
        this.setState({subCategory: JSON.parse(localStorage.getItem('subCategory'))});
       
        // if(source === 'update'){
        //     this.setState({enable: false});
        //     this.setState({enableDelete: false});
        //     this.setState({idCourse: 0});
        //     this.setState({cat: 0});
        //     this.setState({subCat: 0});
        // }else{
            this.setState({listCourses: []});
            this.setState({enable: true});
            this.setState({enableDelete: true});
            this.setState({idCoursePlan: 0});
            this.setState({idCourse: 0});
            this.setState({idPlan: 0});
            this.setState({valorPlano: ''});
            this.setState({valorCourse: ''});
            this.setState({cat: 0});
            this.setState({subCat: 0});
       // }

        this.setState({open: true});
    }

    closeDialog = () => {
        this.setState({open: false});
    }
    openClear = () => {
        this.setState({openClear: true});
        this.makeFilter();
    }

    closeClear = () => {
        this.setState({openClear: false});
    }


    changePlan = (event, index, idPlan) => {
        this.setState({idPlan});
        if(idPlan !== 0) this.setState({enable: false});
        if(idPlan === 0) this.setState({enable: true});
    }

    handleCellClick(col){   
               
        //populo os valores para os states
        this.setState({idCoursePlan: this.state.coursePlan[col]._id});
        this.setState({idCourse: this.state.coursePlan[col].course._id});
        this.setState({idPlan: this.state.coursePlan[col].plan._id});
        this.setState({valorPlano: this.state.coursePlan[col].price});
        this.setState({valorCourse: this.state.coursePlan[col].course.price})
        
        this.openDialog('update');   
    }

    getCoursePlan = () => {
        HttpService.make().get('/getCoursesPlans')
                          .then(success => {
                              localStorage.setItem('coursePlan', JSON.stringify(success.data));
                              this.setState({coursePlan: _.sortBy(JSON.parse(localStorage.getItem('coursePlan')), ['course.name', 'plan.description'])});
                              //this.setState({coursePlan: _.sortBy(JSON.parse(localStorage.getItem('coursePlan')), ['course.name', 'plan.description'])});
                          })
                          .catch(Error =>{
                              console.log('Erro ao buscar os cursos/planos');
                          })
    }

    createUpdateCoursePlan = () =>{
        HttpService.make().post('/createUpdateCoursePlan', this.makeForDataCoursePlan())
                          .then(success => {
                              this.getCoursePlan();
                              this.closeDialog();
                          })
                          .catch(error => {
                              console.log('Erro ao salvar o curso/plano');
                          })
    }

    deleteCoursePlan = () => {
        HttpService.make().post('/deleteCoursePlan', this.makeForDataCoursePlan())
                   .then(success => {
                        alert('Dados excluido com sucesso');
                        this.getCoursePlan();
                        this.closeDialog();
                   })
                   .catch(error => {
                        console.log('Erro ao excluir o curso/plano');
                   })
    }

    deleteLinkCoursesPlan = () => {
        HttpService.make().post('/deleteCoursePlan', this.makeForDataCoursePlan())
                          .then(success => {
                              this.getCoursePlan();
                              this.closeClear();
                              this.closeDialog();
                          })
                          .catch(error => {
                              console.log('Erro ao salvar as informções');
                          })

    }

    makeForDataCoursePlan = () =>{

        let returnValue = this.state.listValueCourses.map((row) => (
            {
                _id: this.state.idCoursePlan,
                price: document.getElementById('curso'+row._id).value,
                percentage: this.percentage.input.value,
                plan: {
                    _id: this.state.idPlan
                },
                course: {
                    _id: row._id
                }
            }
        ));
        return returnValue;        
    }


    //Metodos de tratamento de mudança de compo da categoria
    categoryChange = (event, index, value) => {
        this.setState({cat: value});
        this.setState({subCat: 0});
        this.setState({idCourse: 0});   
        if(value !== 0) this.setState({disableField: false})
        if(value === 0) this.setState({disableField: true})
    }

    //Metodos de tratamento de mudança de compo da sub-categoria
    subCategoryChange = (event, index, value) => {
        this.setState({subCat: value});   
        this.setState({idCourse: 0});     
    }

    changeCourse = (event, index, idCourse) => {
        this.setState({idCourse});
        this.state.courses.map( (row, index) => (
            
            row._id === idCourse ? 
                this.setState({valorCourse: row.price}) : null
        ))       
    }


    //fuction que recupera os filtros e lista na tela
    makeFilter = () => {

        let listCourses = [];
        if(this.state.cat === 0 && this.state.subCat === 0 && this.state.idCourse === 0){
            for(var i = 0; i < this.state.courses.length; i++){
                    listCourses.push(this.state.courses[i]);
            }
        }else if(this.state.subCat === 0 && this.state.idCourse === 0){
            for(i = 0; i < this.state.courses.length; i++){
                if(this.state.courses[i].grid._id === this.state.cat)
                    listCourses.push(this.state.courses[i]);
            }
        }else if(this.state.idCourse === 0){
            for(i = 0; i < this.state.courses.length; i++){
                if(this.state.courses[i].grid._id === this.state.cat && this.state.courses[i].subGrid._id === this.state.subCat)
                    listCourses.push(this.state.courses[i]);
            }
        }else if(this.state.idCourse !== 0){
            for(i = 0; i < this.state.courses.length; i++){
                if(this.state.courses[i]._id === this.state.idCourse)
                    listCourses.push(this.state.courses[i]);
            }
        }

        this.setState({listValueCourses: listCourses});
        let list = listCourses.map((row, index) => (
            <div className="row" key={index}>
                <div className="col-md-4 col-sm-4">
                    <TextField
                        floatingLabelText="Descrição do curso"
                        type="text"
                        value={row.name}
                        fullWidth={true}
                        disabled={true}
                    />    
                </div>  
                <div className="col-md-4 col-sm-4">
                    <TextField
                        floatingLabelText="Valor do Curso"
                        type="number"
                        value={row.price}
                        fullWidth={true}
                        disabled={true}
                    />    
                </div>         
                <div className="col-md-4 col-sm-4">
                    <TextField
                        id={'curso'+row._id}
                        floatingLabelText="Valor do Plano"
                        type="number"
                        disabled={this.state.enable}
                        defaultValue={this.returnValue(row._id) !== 0 ?  this.returnValue(row._id) : row.price}
                        fullWidth={true}
                        ref={(input) => {this.valorPlano = input;} }
                    />  
                </div>
            </div>
        ));
        this.setState({'listCourses': list});            
    }

    calculaValor = () => {
        this.setState({percentage: this.percentage.input.value})
        this.state.listValueCourses.map((row) => (
            document.getElementById('curso'+row._id).value = (row.price - ((row.price / 100) * this.percentage.input.value))
        ));       
    }

    returnValue = (id) => {
        
        var valor = 0;
        for(var i = 0; i < this.state.coursePlan.length; i++){
            if((this.state.coursePlan[i].course._id === id))
                valor = this.state.coursePlan[i].price;
        }
        console.log(valor)
        return valor;
    }

    // getList = () => {   
        
    //     if(this.state.coursePlan !== null){
    //         this.setState({coursePlan: JSON.parse(localStorage.getItem('coursePlan'))})
    //         let coursesPlan = _.sortBy(this.state.coursePlan, ['course.name', 'plan.description']);
    //         let bodyTable = coursesPlan.map((row, i) =>(          
    //                 <TableRow key={i}>
    //                     <TableRowColumn style={{width: '30px'}}>{row._id}</TableRowColumn>
    //                     <TableRowColumn>{row.course.name}</TableRowColumn>
    //                     <TableRowColumn style={{textAlign: 'center'}}>{row.plan.description}</TableRowColumn>
    //                     <TableRowColumn style={{width: '10%', textAlign: 'center'}}>{row.course.price}</TableRowColumn>
    //                     <TableRowColumn style={{width: '10%', textAlign: 'center'}}>{row.price}</TableRowColumn>
    //                     <TableRowColumn style={{textAlign: 'center'}}>{row.percentage + '%'}</TableRowColumn>
    //                 </TableRow>
    //             ))  
    //         this.setState({'bodyTable': bodyTable});
    //     }
    // }
    
    render(){

        const actions = [
            <RaisedButton
                label="salvar"
                backgroundColor="#0ac752"
                icon={<NewIco color="#FFF"/>}
                labelStyle={{color: 'white'}}
                style={{marginRight:'20px'}}
                onClick={this.createUpdateCoursePlan}
                disabled={this.state.enable}

            />,
            <RaisedButton
                label="Excluir"
                backgroundColor="#DD2C00"
                icon={<Delete color="#FFF"/>}
                labelStyle={{color: 'white'}}
                style={{marginRight:'20px'}}
                disabled={this.state.enableDelete}
                onClick={this.deleteCoursePlan}
            />,
            <RaisedButton
                label="cancelar"
                backgroundColor="#FF9800"
                icon={<CancelIo color="#FFF"/>}
                labelStyle={{color: 'white'}}
                onClick={this.closeDialog}
            />
        ]

        const actionsClear = [
            <RaisedButton
                label="SIM"
                backgroundColor="#0ac752"
                icon={<NewIco color="#FFF"/>}
                labelStyle={{color: 'white'}}
                style={{marginRight:'20px'}}
                onClick={this.deleteLinkCoursesPlan}
    
            />,
            <RaisedButton
                label="NÃO"
                backgroundColor="#FF9800"
                icon={<CancelIo color="#FFF"/>}
                labelStyle={{color: 'white'}}
                onClick={this.closeClear}
            />
        ] 
        
        const bodyTable = [
            this.state.coursePlan !== null ? 
                this.state.coursePlan.map((row, i) =>(          
                    <TableRow key={i}>
                        <TableRowColumn style={{width: '30px'}}>{row._id}</TableRowColumn>
                        <TableRowColumn>{row.course.name}</TableRowColumn>
                        <TableRowColumn style={{textAlign: 'center'}}>{row.plan.description}</TableRowColumn>
                        <TableRowColumn style={{width: '10%', textAlign: 'center'}}>{row.course.price}</TableRowColumn>
                        <TableRowColumn style={{width: '10%', textAlign: 'center'}}>{row.price}</TableRowColumn>
                        <TableRowColumn style={{textAlign: 'center'}}>{row.percentage + '%'}</TableRowColumn>
                    </TableRow>
                ))  
            :''
        ]
        return(
            <div>
                <RaisedButton
                    label="Vincular Plano/Curso"
                    backgroundColor="#0ac752"
                    fullWidth={true}
                    icon={<NewIco color="#FFF"/>}
                    labelStyle={{color: 'white'}}
                    style={{float: 'right', margin:'20px'}}
                    onClick={this.openDialog}
                    

                /> 
                <br/><br/><br/><br/>
                <Table
                    height='300px'
                    fixedHeader={true}
                    selectable={true}
                    multiSelectable={false}
                    autoScrollBodyContent={true}
                    //onCellClick={(col) => this.handleCellClick(col)}                    
                >
                    <TableHeader
                        displaySelectAll={false}
                        adjustForCheckbox={false}
                        enableSelectAll={false}
                    >
                        <TableRow>
                            <TableHeaderColumn tooltip="ID" style={{width: '30px'}}>ID</TableHeaderColumn>
                            <TableHeaderColumn tooltip="Descrição" style={{textAlign: 'center'}}>Curso</TableHeaderColumn>
                            <TableHeaderColumn tooltip="Status" style={{textAlign: 'center'}}>Plano</TableHeaderColumn>
                            <TableHeaderColumn tooltip="Status" style={{width: '10%', textAlign: 'center'}}>Valor do curso</TableHeaderColumn>
                            <TableHeaderColumn tooltip="Status" style={{width: '10%', textAlign: 'center'}}>Valor do plano</TableHeaderColumn>
                            <TableHeaderColumn tooltip="Status" style={{textAlign: 'center'}}>Porcentagem</TableHeaderColumn>
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
                    title="Plano / Curso"
                    actions={actions}
                    modal={true}
                    open={this.state.open}
                    autoScrollBodyContent={true}
                >   
                    <div className="row">
                        <div className="col-md-6 col-sm-6">
                            <SelectField
                                floatingLabelText="Planos"
                                value={this.state.idPlan}
                                onChange={this.changePlan}
                                fullWidth={true}
                                
                            >  
                                <MenuItem value={0} primaryText="Plano"/>
                                {this.state.plan.map( (row, index) => (
                                    row.status ?
                                        <MenuItem 
                                            key={index}
                                            value={row._id} primaryText={row.description}
                                        />
                                    : ''
                                ))}
                            </SelectField>
                        </div>
                        <div className="col-md-6 col-sm-6">
                            <FlatButton 
                                label={'LIMPAR TODOS'}
                                primary={true}
                                onClick={() => this.openClear()}
                                disabled={this.state.enable}
                                style={{margin:'20px'}}
                            />
                        </div>
                        
                    </div>
                    <div className="row">
                        <div className="col-md-6 col-sm-6">
                            <SelectField
                                floatingLabelText="Categoria"
                                fullWidth={true}
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
                                fullWidth={true}
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
                    <div className="row">
                        <div className="col-md-6 col-sm-6">
                            <SelectField
                                floatingLabelText="Cursos"
                                value={this.state.idCourse}
                                onChange={this.changeCourse}
                                fullWidth={true}
                            >  
                                <MenuItem value={0} primaryText="Curso"/>
                                {
                                    this.state.courses !== null ?
                                        
                                        this.state.courses.map( (row, index) => (
                                            this.state.subCat === 0 ? 
                                                row.grid._id === this.state.cat ?
                                                    <MenuItem 
                                                        key={index}
                                                        value={row._id} primaryText={row.name}
                                                    /> : ''
                                            :
                                                (row.grid._id === this.state.cat && row.subGrid._id === this.state.subCat) ?
                                                    <MenuItem 
                                                        key={index}
                                                        value={row._id} primaryText={row.name}
                                                    /> : ''

                                        )): ''
                                }
                        
                            </SelectField>
                        </div>    

                         <div className="col-md-5 col-sm-5">
                            <FlatButton
                                label="Buscar"
                                primary={true}                                
                                fullWidth={true}
                                icon={<Search/>}
                                style={{margin:'20px'}}
                                onClick={() => this.makeFilter()}
                            />
                        </div>     
                    </div>
                    <div className="row">
                        <div className="col-md-6 col-sm-6">
                            <TextField
                                floatingLabelText="Percentual de desconto"
                                type="number"
                                fullWidth={true}
                                //onChange={() => this.calculaValor()}
                                ref={(input) => {this.percentage = input;} }
                            />    
                        </div>    

                         <div className="col-md-5 col-sm-5">
                            <FlatButton
                                label="Calcular"
                                primary={true}                                
                                fullWidth={true}
                                icon={<Exposure/>}
                                style={{margin:'20px'}}
                                onClick={() => this.calculaValor()}
                            />
                        </div>     
                    </div>
                    <hr/>
                    {this.state.listCourses}
                </ Dialog>
                <Dialog
                    title="Vincular Curso"
                    actions={actionsClear}
                    modal={true}
                    open={this.state.openClear}
                    autoScrollBodyContent={true}
                >   
                    <h3>Esta ação excluirá o vínculo desse plano com todos os cursos relacionados. Deseja prosseguir?</h3>
                </Dialog>
                     
            </div>
        );
    }

}


export default CoursesPlan;