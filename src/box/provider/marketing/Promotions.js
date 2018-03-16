import React, { Component } from 'react';
import HttpService from '../../../service/http/HttpService';

import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import Toggle from 'material-ui/Toggle';
import Dialog from 'material-ui/Dialog';
import DatePicker from 'material-ui/DatePicker';
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';

//icons
import NewIco from 'material-ui/svg-icons/content/add';
import CancelIo from 'material-ui/svg-icons/content/block'
import Delete from 'material-ui/svg-icons/action/delete';


class Promotions extends Component {

    constructor(){
        super();
        this.state = {
            promotions: JSON.parse(localStorage.getItem('promotion')),
            courses: JSON.parse(localStorage.getItem('course')),
            open: false,
            openCourse: false,
            
            idPromotion: '',
            description: '',
            coupon: '',
            percentage: '',
            dateStart: new Date(),
            dateFinish: new Date(),

            errorDescription: '',
            errorCoupon: '',
            errorPercentage: '',
            errorDataStart: '',
            errorDataFinish: '',

            disableDelete: true,
            disableToggle: false,

            listCourses: [],
            
        }
    }


    componentDidMount() {
        this.getPromotions();
    }
    

    openDialog = (source) => {
        
        if(source === 'update'){

        }else{
            this.setState({disableDelete: true});
            this.setState({idPromotion: ''});
            this.setState({description: ''});
            this.setState({coupon: ''});
            this.setState({percentage: ''});
            this.setState({dateStart: new Date()});
            this.setState({dateFinish: new Date()});
        }
        
        this.setState({open: true})
    }

    closeDialog = () => {
        this.setState({open: false})
    }

    changeDateStart = (event, date) => {
        this.setState({dateStart: date});
    }

    changeDateFinish = (event, date) => {
        this.setState({dateFinish: date});
    }

    makeDataForPromotions = () => {
        return{
            _id: this.state.idPromotion,
            description: this.description.input.value,
            codigoCupom: this.coupon.input.value,
            percentual: this.percentage.input.value,
            dateInicial: this.state.dateStart,
            dateFinal: this.state.dateFinish
        }
    }
    validateField = () => {
        var valid = true;
        if(this.description.input.value === '') {
            this.setState({errorDescription: 'A descrição da promoção é Obrigatório'}); 
            valid = false;
        }
            
        if(this.coupon.input.value === '') {
            this.setState({errorCoupon: 'O código do cupom é Obrigatório'}); 
            valid = false;    
        }

        if(this.percentage.input.value === ''){
            this.setState({errorPercentage: 'O Percentual do desconto é Obrigatório'}); 
            valid = false;    
        }

        return valid;
    }
    
    createUpdatePromotions = () => {
        if(this.validateField()){
            console.log(this.makeDataForPromotions());
            HttpService.make().post('/createUpdatePromotion', this.makeDataForPromotions())
            .then(success => {
                alert('Dados Salvo com sucesso');
                this.getPromotions();
                this.closeDialog();
            })
            .catch(error =>{
                console.log('Erro ao salvar os dados');
            })
        }
    }
    deletePromotions = () => {     
        if(this.validateField()){
            HttpService.make().post('/deletePromotion', this.makeDataForPromotions())
                              .then(success => {
                                  alert('Dados excluido com sucesso');
                                  this.getPromotions();
                                  this.closeDialog();
                              })
                              .catch(error =>{
                                  console.log('Erro ao exluir uma promoção');
                              })
        }
    }
    getPromotions = () => {
        HttpService.make().get('/getPromotions')
                    .then(success =>{
                        console.log(success.data);
                        localStorage.setItem('promotion', JSON.stringify(success.data));
                        this.setState({promotions: JSON.parse(localStorage.getItem('promotion'))});
                    })
                    .catch(error => {
                        console.log('Erro ao buscar as promoçoes');
                    })
    }

    formateDate = (date) => {   
        var dt = new Date(date);    
        var nextDate = (dt.getDate() + 1);
        dt.setDate(nextDate);
        var newDate = dt.toLocaleString();
        return  newDate.substring(0, 10);
    }

    formateDateTable = (date) => {   
        var dt = new Date(date);    
        var nextDate = (dt.getDate() + 1);
        dt.setDate(nextDate);
        return  dt;
    }
    
    updatePromotion = (col) => {

          //populo os valores para os states
          this.setState({idPromotion: this.state.promotions[col]._id});
          this.setState({description: this.state.promotions[col].description});
          this.setState({coupon: this.state.promotions[col].codigoCupom});
          this.setState({percentage: this.state.promotions[col].percentual});
          this.setState({dateStart: this.formateDateTable(this.state.promotions[col].dateInicial)})
          this.setState({dateFinish: this.formateDateTable(this.state.promotions[col].dateFinal)})
            
          this.openDialog('update');         
    }

    linkCourses = (col) => {
        this.setState({disableToggle: false});  
        this.setState({idPromotion: this.state.promotions[col]._id});
        this.setState({description: this.state.promotions[col].description});
        this.setState({coupon: this.state.promotions[col].codigoCupom});
        this.setState({openCourse: true});
    }

    closeLinkCourse = () => {
        this.setState({openCourse: false});
    }

    //Metodo para tratamento da mudança do status
    handleToggle(event, isInputChecked, id){
        
        if(id === 'all' && isInputChecked){
            this.setState({disableToggle: true});
        }else if(isInputChecked){

            if(this.state.listCourses.indexOf(id) === -1){
                this.state.listCourses.push(id);
            }
            console.log('valor ' + isInputChecked + ' id ' + id);
            this.setState({disableToggle: false});
        }else if(!isInputChecked){
            if(this.state.listCourses.indexOf(id) !== -1){
                this.state.listCourses.pop(id);
            }
        }
    }

    linkCoursesPromotions = () => {
        
        console.log(this.state.listCourses)
        // .map((row, index) =>(
        //     console.log(row)
        // ))
    }

    render(){
        const actions = [
            <RaisedButton
                label="Salvar"
                backgroundColor="#0ac752"
                icon={<NewIco color="#FFF"/>}
                labelStyle={{color: 'white'}}
                style={{marginRight:'20px'}}
                onClick={this.createUpdatePromotions}
    
            />,
            <RaisedButton
                label="excluir"
                backgroundColor="#DD2C00"
                icon={<Delete color="#FFF"/>}
                labelStyle={{color: 'white'}}
                style={{marginRight:'20px'}}
                onClick={this.deletePromotions}
                disabled={this.state.disableDelete}
            />,
            <RaisedButton
                label="cancelar"
                backgroundColor="#FF9800"
                icon={<CancelIo color="#FFF"/>}
                labelStyle={{color: 'white'}}
                onClick={this.closeDialog}
            />
        ]

        const actionsLink = [
            <RaisedButton
                label="Salvar"
                backgroundColor="#0ac752"
                icon={<NewIco color="#FFF"/>}
                labelStyle={{color: 'white'}}
                style={{marginRight:'20px'}}
                onClick={this.linkCoursesPromotions}
    
            />,
            <RaisedButton
                label="cancelar"
                backgroundColor="#FF9800"
                icon={<CancelIo color="#FFF"/>}
                labelStyle={{color: 'white'}}
                onClick={this.closeLinkCourse}
            />
        ]


        const bodyTable = [
            this.state.promotions !== null ?
                this.state.promotions.map( (row, index) => (
                    <TableRow key={index}>
                        <TableRowColumn>{row._id}</TableRowColumn>
                        <TableRowColumn>{row.description}</TableRowColumn>
                        <TableRowColumn>{row.codigoCupom}</TableRowColumn>
                        <TableRowColumn>{row.percentual}</TableRowColumn>
                        <TableRowColumn>{this.formateDate(row.dateInicial)}</TableRowColumn>
                        <TableRowColumn>{this.formateDate(row.dateFinal)}</TableRowColumn>
                        <TableRowColumn>
                            <FlatButton
                                label="Alterar"
                                primary={true}
                                onClick={() => this.updatePromotion(index)}
                            />
                        </TableRowColumn>
                        <TableRowColumn>
                            <FlatButton
                                label="Cursos"
                                primary={true}
                                onClick={() => this.linkCourses(index)}
                            />
                        </TableRowColumn>
                    </TableRow>
                ))
            : ''
        ]


        return(
            <div>
                <RaisedButton
                    label="adicinar Promoção"
                    fullWidth={true}
                    backgroundColor="#0ac752"
                    icon={<NewIco color="#FFF"/>}
                    labelStyle={{color: 'white'}}
                    style={{float: 'right', marginTop:'20px'}}
                    onClick={this.openDialog}
                /><br/><br/><br/>
                <Table
                    height='300px'
                    fixedHeader={this.state.fixedHeader}
                    fixedFooter={this.state.fixedFooter}
                    selectable={this.state.selectable}
                    multiSelectable={this.state.multiSelectable}             
                >
                    <TableHeader
                    displaySelectAll={false}
                    adjustForCheckbox={false}
                    enableSelectAll={false}
                    >
                        <TableRow>
                            <TableHeaderColumn tooltip="ID">ID</TableHeaderColumn>
                            <TableHeaderColumn tooltip="Descrição">Descrição</TableHeaderColumn>
                            <TableHeaderColumn tooltip="Código">Código</TableHeaderColumn>
                            <TableHeaderColumn tooltip="%">%</TableHeaderColumn>
                            <TableHeaderColumn tooltip="Data Inicial">Data Inicial</TableHeaderColumn>
                            <TableHeaderColumn tooltip="Data Final">Data Final</TableHeaderColumn>
                            <TableHeaderColumn >Alterar</TableHeaderColumn>
                            <TableHeaderColumn >Cursos</TableHeaderColumn>
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
                    title="Adicionar Promoção"
                    actions={actions}
                    modal={true}
                    open={this.state.open}
                    autoScrollBodyContent={true}
                >  
                    <TextField 
                        floatingLabelText="Descrição"
                        fullWidth={true}
                        errorText={this.state.errorDescription}
                        onChange={this.changeField}
                        defaultValue={this.state.description}
                        ref={ (input) => {this.description = input;} }
                    />
                    <div className="row">
                        <div className="col-md-6 col-sm-6">
                            <TextField 
                                floatingLabelText="Código do cupom "
                                fullWidth={true}
                                errorText={this.state.errorCoupon}
                                onChange={this.changeField}
                                defaultValue={this.state.coupon}
                                ref={ (input) => {this.coupon = input;} }
                            />
                        </div>
                        <div className="col-md-6 col-sm-6">
                            <TextField 
                                floatingLabelText="Percentual"
                                type="number"
                                fullWidth={true}
                                errorText={this.state.errorPercentage}
                                onChange={this.changeField}
                                defaultValue={this.state.percentage}
                                ref={ (input) => {this.percentage = input;} }
                            />
                        </div>
                    </div>
                    <br/>
                    <div className="row">
                        <div className="col-md-6 col-sm-6">
                            <DatePicker 
                                floatingLabelText="Data inicial "
                                hintText="Data Inicial" 
                                fullWidth={true}
                                defaultDate={this.state.dateStart}
                                onChange={this.changeDateStart}
                                errorText={this.state.errorDataStart}
                            />
                        </div>
                        <div className="col-md-6 col-sm-6">
                            <DatePicker 
                                floatingLabelText="Data Final "
                                hintText="Data Inicial" 
                                fullWidth={true}
                                defaultDate={this.state.dateFinish}
                                onChange={this.changeDateFinish}
                                errorText={this.state.errorDataFinish}
                            />
                        </div>
                    </div>
                </Dialog> 


                <Dialog
                    title="Vincular Curso"
                    actions={actionsLink}
                    modal={true}
                    open={this.state.openCourse}
                    autoScrollBodyContent={true}
                >   
                    <div className="row">
                        <div className="col-md-6 col-sm-6">
                            <TextField 
                                floatingLabelText="Descrição"
                                fullWidth={true}
                                errorText={this.state.errorDescription}
                                onChange={this.changeField}
                                defaultValue={this.state.description}
                                disabled={true}
                                ref={ (input) => {this.description = input;} }
                            />
                        </div>
                        <div className="col-md-6 col-sm-6">
                            <TextField 
                                floatingLabelText="Código do cupom "
                                fullWidth={true}
                                errorText={this.state.errorCoupon}
                                onChange={this.changeField}
                                defaultValue={this.state.coupon}
                                disabled={true}
                                ref={ (input) => {this.coupon = input;} }
                            />
                        </div>
                    </div>

                    <hr/>
                    <Toggle 
                        label={'TODOS OS CURSOS'}
                        labelPosition="right"
                        defaultToggled={this.state.statusCourse}
                        onToggle={(event, isInputChecked) => this.handleToggle(event, isInputChecked, 'all')}
                    />
                    
                    {
                        this.state.courses !== null ?
                            this.state.courses.map((row, index)=> (
                                <Toggle 
                                    key={index}
                                    label={row.description}
                                    labelPosition="right"
                                    disabled={this.state.disableToggle}
                                    defaultToggled={this.state.allChecked}
                                    onToggle={(event, isInputChecked) => this.handleToggle(event, isInputChecked, row._id)}
                                />
                            ))
                            : ''
                    }
                    
                </Dialog>
            </div>
        )

    }
}

export default Promotions;