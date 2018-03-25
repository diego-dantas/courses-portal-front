import React, { Component } from 'react';
import HttpService from '../../../service/http/HttpService';


//componentes 
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField'
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


class CoursesPlan extends Component{

    constructor(props) {
        super(props);
        this.state = {
            courses: JSON.parse(localStorage.getItem('course')),
            plan: JSON.parse(localStorage.getItem('plan')),
            coursePlan: JSON.parse(localStorage.getItem('coursePlan')),
            open: false,
            enable:true,
            enableDelete: true,
            idCourse: 0,
            idCoursePlan:'',
            valorCourse: 0,
            idPlan: 0,
            valorPlano: 0,
        }

    }
    
    componentDidMount() {
        this.getCoursePlan();
    }

    openDialog = (source) => {
        this.setState({courses: JSON.parse(localStorage.getItem('course'))});
        this.setState({plan:    JSON.parse(localStorage.getItem('plan'))});
        
       
        if(source === 'update'){
            this.setState({enable: false});
            this.setState({enableDelete: false});
        }else{
            this.setState({enable: true});
            this.setState({enableDelete: true});
            this.setState({idCoursePlan: ''});
            this.setState({idCourse: ''});
            this.setState({idPlan: ''});
            this.setState({valorPlano: ''});
            this.setState({valorCourse: ''})
        }

        this.setState({open: true});
    }

    closeDialog = () => {
        this.setState({open: false});
    }

    changeCourse = (event, index, idCourse) => {
        this.setState({idCourse});
        this.state.courses.map( (row, index) => (
            
            row._id === idCourse ? 
                this.setState({valorCourse: row.price}) : null
        ))
        if(idCourse !== 0 && this.state.idPlan !== 0) this.setState({enable: false});
        if(idCourse === 0) this.setState({enable: true});
    }

    changePlan = (event, index, idPlan) => {
        this.setState({idPlan});
        if(idPlan !== 0 && this.state.idCourse !== 0) this.setState({enable: false});
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
                              this.setState({coursePlan: JSON.parse(localStorage.getItem('coursePlan'))});
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

    makeForDataCoursePlan = () =>{
        return{
            _id: this.state.idCoursePlan,
            price: this.valorPlano.input.value,
            plan: {
                _id: this.state.idPlan
            },
            course: {
                _id: this.state.idCourse
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

        const bodyTable = [
            this.state.coursePlan === null ? '' :
                this.state.coursePlan.map((row, i) =>(          
                    <TableRow key={i}>
                        <TableRowColumn>{row._id}</TableRowColumn>
                        <TableRowColumn>{row.course.name}</TableRowColumn>
                        <TableRowColumn>{row.plan.description}</TableRowColumn>
                        <TableRowColumn>{row.price}</TableRowColumn>
                    </TableRow>
                ))           
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
                    onCellClick={(col) => this.handleCellClick(col)}                    
                >
                    <TableHeader
                        displaySelectAll={false}
                        adjustForCheckbox={false}
                        enableSelectAll={false}
                    >
                        <TableRow>
                            <TableHeaderColumn tooltip="ID">ID</TableHeaderColumn>
                            <TableHeaderColumn tooltip="Descrição">Curso</TableHeaderColumn>
                            <TableHeaderColumn tooltip="Status">Plano</TableHeaderColumn>
                            <TableHeaderColumn tooltip="Status">Valor</TableHeaderColumn>
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
                                floatingLabelText="Cursos"
                                value={this.state.idCourse}
                                onChange={this.changeCourse}
                            >  
                                <MenuItem value={0} primaryText="Curso"/>
                                {
                                    this.state.courses !== null ?
                                        this.state.courses.map( (row, index) => (
                                            <MenuItem 
                                                key={index}
                                                value={row._id} primaryText={row.name}
                                            />
                                        )): ''
                                }
                        
                            </SelectField>
                        </div>         
            
                        <div className="col-md-6 col-sm-6">
                            <SelectField
                                floatingLabelText="Planos"
                                value={this.state.idPlan}
                                onChange={this.changePlan}
                                
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
                    </div>
                    <div className="row">
                        <div className="col-md-6 col-sm-6">
                            <TextField
                                floatingLabelText="Valor do Curso"
                                type="number"
                                value={this.state.valorCourse}
                                disabled={true}
                            />  
                               
                        </div>         
            
                        <div className="col-md-6 col-sm-6">
                            <TextField
                                floatingLabelText="Valor do Plano"
                                type="number"
                                disabled={this.state.enable}
                                defaultValue={this.state.valorPlano}
                                ref={(input) => {this.valorPlano = input;} }
                            />  
                               
                        </div>
                    </div>
                </ Dialog>
                     
            </div>
        );
    }

}


export default CoursesPlan;