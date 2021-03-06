import React, { Component } from 'react';
import HttpService  from '../../../service/http/HttpService';

import RaisedButton from 'material-ui/RaisedButton';
import FlatButton   from 'material-ui/FlatButton';
import IconButton   from 'material-ui/IconButton';
import TextField    from 'material-ui/TextField';
import Checkbox     from 'material-ui/Checkbox';
import SelectField  from 'material-ui/SelectField';
import MenuItem     from 'material-ui/MenuItem';
import Toggle       from 'material-ui/Toggle';
import Dialog       from 'material-ui/Dialog';
import DatePicker   from 'material-ui/DatePicker';

import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';

//icons
import NewIco    from 'material-ui/svg-icons/content/add';
import CancelIo  from 'material-ui/svg-icons/content/block'
import Delete    from 'material-ui/svg-icons/action/delete';
import Search    from 'material-ui/svg-icons/action/search';
import LogoutIco from 'material-ui/svg-icons/navigation/arrow-forward';



let DateTimeFormat = global.Intl.DateTimeFormat;

class Promotions extends Component {

    constructor(){
        super();
        this.state = {
            promotions:      JSON.parse(localStorage.getItem('promotion')),
            courses:         JSON.parse(localStorage.getItem('course')),
            coursePromotion: JSON.parse(localStorage.getItem('coursePromotion')),
            category:        JSON.parse(localStorage.getItem('category')),
            subCategory:     JSON.parse(localStorage.getItem('subCategory')),
            open: false,
            openCourse: false,
            openClear: false,
            
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
            disableField:  true,
            allCourses:    false,
            checked:       false,

            arrayCourses:       [],
            arrayNewCourses:    [],
            arrayAllCourses:    [],
            arrayAllNewCourses: [],
            listCourses:        [],
            listAllCourses:     []
            
        }
    }


    componentDidMount() {
        this.getPromotions();
        this.getCoursePromotion();
    }
    
    openClear = () => {
        this.setState({openClear: true});
    }

    closeClear = () => {
        this.setState({openClear: false});
    }

    openDialog = (source) => {
        
        if(source === 'update'){
            this.setState({errorDescription: ''});
            this.setState({errorCoupon: ''});
            this.setState({errorPercentage: ''});
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
            dateInicial: this.state.idPromotion === '' ? this.state.dateStart : this.formateDateTableUpdate(this.state.dateStart),
            dateFinal: this.state.idPromotion === '' ? this.state.dateFinish : this.formateDateTableUpdate(this.state.dateFinish)
        }
    }
    makeDataForCourses = () => {
        
        let valor = [];
        if(this.state.checked){
            this.state.arrayAllNewCourses.map((row, index) => (
                valor.push({
                             _id: "",
                             course : { 
                                 _id : row 
                             }, 
                             promotion : { 
                                 _id :  this.state.idPromotion  
                             } 
                         }
                     )
            ))
        }else{
            this.state.arrayNewCourses.map((row, index) => (
                valor.push({
                             _id: "",
                             course : { 
                                 _id : row 
                             }, 
                             promotion : { 
                                 _id :  this.state.idPromotion  
                             } 
                         }
                     )
             
            ))
        }
        
        return valor;
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
                        localStorage.setItem('promotion', JSON.stringify(success.data));
                        this.setState({promotions: JSON.parse(localStorage.getItem('promotion'))});
                    })
                    .catch(error => {
                        console.log('Erro ao buscar as promoçoes');
                    })
    }

    getCoursePromotion = () => {
        HttpService.make().get('/getCoursePromotion')
                    .then(success =>{
                        localStorage.setItem('coursePromotion', JSON.stringify(success.data));
                        this.setState({coursePromotion: JSON.parse(localStorage.getItem('coursePromotion'))}); 
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

    formateDateTableUpdate = (date) => {   
        var dt = new Date(date);    
        var nextDate = (dt.getDate());
        dt.setDate(nextDate);
        return  dt;
    }
    
    updatePromotion = (col) => {

        //populo os valores para os states
        this.setState({idPromotion: this.state.promotions[col]._id});
        this.setState({description: this.state.promotions[col].description});
        this.setState({coupon: this.state.promotions[col].codigoCupom});
        this.setState({percentage: this.state.promotions[col].percentual});
        this.setState({dateStart: this.state.promotions[col].dateInicial})
        this.setState({dateFinish: this.state.promotions[col].dateFinal})
            
        this.openDialog('update');         
    }

    linkCourses = (col) => {

        this.setState({arrayCourses:       []});
        this.setState({arrayNewCourses:    []});
        this.setState({arrayAllCourses:    []});
        this.setState({arrayAllNewCourses: []});
        this.setState({listCourses:        []});   
        this.setState({listAllCourses:     []});   
        this.setState({cat:    0});
        this.setState({subCat: 0});
 
        this.setState({statusCourse: false});
        this.setState({checked:      false});
        this.setState({openCourse:   true});
        this.setState({disableField: true});
        this.setState({idPromotion: this.state.promotions[col]._id});
        this.setState({description: this.state.promotions[col].description});
        this.setState({coupon:      this.state.promotions[col].codigoCupom});
        
    }

    closeLinkCourse = () => {
        this.setState({openCourse: false});
    }

    
    handleToggle(event, toggled, idCourse){

        this.setState({
            [event.target.name]: toggled,
          });
          if(toggled){
            
            var find = false;
            this.state.arrayNewCourses.map((row, index) =>(
                row === idCourse ? find = true : ''
            ))

            if(!find)
                this.state.arrayNewCourses.push(idCourse);

        }else{

            var i = -1;        
            this.state.arrayNewCourses.map((row, index) =>(
                row === idCourse ? 
                    i = index: ''
            ))
            if(i >= 0)
                this.state.arrayNewCourses.splice(i, 1);
        }
        console.log(this.state.arrayNewCourses);
    }

    handleAllToggle(event, toggled, idCourse){
        
        this.setState({
            [event.target.name]: toggled,
          });
          if(toggled){
            
            var find = false;
            this.state.arrayAllNewCourses.map((row, index) =>(
                row === idCourse ? find = true : ''
            ))

            if(!find)
                this.state.arrayAllNewCourses.push(idCourse);

        }else{

            var i = -1;        
            this.state.arrayAllNewCourses.map((row, index) =>(
                row === idCourse ? 
                    i = index: ''
            ))
            if(i >= 0)
                this.state.arrayAllNewCourses.splice(i, 1);
        }
        console.log(this.state.arrayAllNewCourses);
    }

    validAllCourses(event, toggled){
        this.setState({allCourses: toggled});
    }

    linkCoursesPromotions = () => {
        HttpService.make().post('/saveCoursePromotion', this.makeDataForCourses())
                          .then(success => {
                              this.getCoursePromotion();
                              alert('Cursos gravados com sucesso');  
                          })
                          .catch(error => {
                              console.log('Erro ao salvar as informções');
                          })

    }

    deleteLinkCoursesPromotions = () => {
        HttpService.make().post('/deleteCoursePromotion', this.makeDataForCourses())
                          .then(success => {
                              this.getCoursePromotion();
                              this.closeClear();
                              this.closeLinkCourse();
                          })
                          .catch(error => {
                              console.log('Erro ao salvar as informções');
                          })

    }
    validStatus = (id, i) => {
        
        var status = false;
            
        if(this.state.coursePromotion !== null){
            this.state.coursePromotion.map((row1, index) => (
                row1.promotion._id === this.state.idPromotion ?
                    this.validID(row1.course._id) : ''
            ))   
        }        

        
        this.state.arrayCourses.map((row, i) => (
             id === row ? status = true : ''
        ))    
        
        
        return status;
    }
    validID = (id) => {
        var find = false;

        this.state.arrayCourses.map((row2, index) =>(
            row2 === id ? find = true : ''
        ))

        if(!find){
            this.state.arrayCourses.push(id);
            this.state.arrayNewCourses.push(id);
        }
    }

    validAllStatus = (id, i) => {
        
        var status = true;
        this.state.courses.map((row, i) => (
             id === row._id ? this.validAllID(id) : ''
        ))
        return status;
    }

    validAllClearStatus = (id, i) => {
        
        var status = false;
        
        return status;
    }

    validAllID = (id) => {
        var find = false;

        this.state.arrayAllCourses.map((row2, index) =>(
            row2 === id ? find = true : ''
        ))

        if(!find){
            this.state.arrayAllCourses.push(id);
            this.state.arrayAllNewCourses.push(id);
        }
    }
   
    updateCheck() {
        this.setState((oldState) => {
          return {
            checked: !oldState.checked,
          };
        });
    }

    clearCourses = () => {
        alert("to aqui");
    }

    //Metodos de tratamento de mudança de compo da categoria
    categoryChange = (event, index, value) => {
        this.setState({cat: value});
        this.setState({subCat: 0});
        if(value !== 0) this.setState({disableField: false})
        if(value === 0) this.setState({disableField: true})
    }

    //Metodos de tratamento de mudança de compo da sub-categoria
    subCategoryChange = (event, index, value) => {
        this.setState({subCat: value});        
    }

    makeListCourses = () => {
        
        if(this.state.disableField === true)
            this.setState({disableField: false});

        let listCourses = [];
        if(this.state.cat === 0 && this.state.subCat === 0){
            for(var i = 0; i < this.state.courses.length; i++){
                listCourses.push(this.state.courses[i]);
            }
        }else if(this.state.subCat === 0){
            for(i = 0; i < this.state.courses.length; i++){
                if(this.state.courses[i].grid._id === this.state.cat)
                    listCourses.push(this.state.courses[i]);
            }
        }else{
            for(i = 0; i < this.state.courses.length; i++){
                if(this.state.courses[i].grid._id === this.state.cat && this.state.courses[i].subGrid._id === this.state.subCat)
                    listCourses.push(this.state.courses[i]);
            }
        }
        
        let list = listCourses.map((row, index) => (
            <Toggle
                key={row._id}
                name={'Toggle' + row._id}
                label={row.name}
                labelPosition="right"
                onToggle={(event, toggled) => this.handleToggle(event, toggled, row._id)}
                defaultToggled={this.validStatus(row._id, index)}
            />
        ));

        let allList = listCourses.map((row, index) => (
            <Checkbox
                key={index}
                name={'Checkbox' + row._id}
                label={row.name}
                //defaultChecked={this.state.checked}
                defaultChecked={this.validAllStatus(row._id, index)}
                onCheck={(event, toggled) => this.handleAllToggle(event, toggled, row._id)}
            />
        ));
        this.setState({'listCourses':    list});        
        this.setState({'listAllCourses': allList});  
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
                label="Cancelar"
                backgroundColor="#FF9800"
                icon={<CancelIo color="#FFF"/>}
                labelStyle={{color: 'white'}}
                onClick={this.closeDialog}
            />
        ]

        const actionsLink = [
            <RaisedButton
                label="gravar"
                backgroundColor="#0ac752"
                icon={<NewIco color="#FFF"/>}
                labelStyle={{color: 'white'}}
                style={{marginRight:'20px'}}
                onClick={this.linkCoursesPromotions}
    
            />,
            <RaisedButton
                label="sair"
                backgroundColor="#FF9800"
                icon={<LogoutIco color="#FFF"/>}
                labelStyle={{color: 'white'}}
                onClick={this.closeLinkCourse}
            />
        ]

        const actionsClear = [
            <RaisedButton
                label="SIM"
                backgroundColor="#0ac752"
                icon={<NewIco color="#FFF"/>}
                labelStyle={{color: 'white'}}
                style={{marginRight:'20px'}}
                onClick={this.deleteLinkCoursesPromotions}
    
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
                    label="adicionar Promoção"
                    fullWidth={true}
                    backgroundColor="#0ac752"
                    icon={<NewIco color="#FFF"/>}
                    labelStyle={{color: 'white'}}
                    style={{float: 'right', marginTop:'20px'}}
                    onClick={this.openDialog}
                />
                <br/><br/><br/>
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
                                defaultDate={
                                    this.state.idPromotion === '' ? 
                                    this.formateDateTableUpdate(this.state.dateStart) :
                                    this.formateDateTable(this.state.dateStart)
                                }
                                onChange={this.changeDateStart}
                                errorText={this.state.errorDataStart}
                                formatDate={new DateTimeFormat('pt-BR', {
                                    day: 'numeric',
                                    month: 'numeric',
                                    year: 'numeric',
                                }).format}
                            />
                        </div>
                        <div className="col-md-6 col-sm-6">
                            <DatePicker 
                                floatingLabelText="Data Final "
                                hintText="Data Inicial" 
                                fullWidth={true}
                                defaultDate={
                                    this.state.idPromotion === '' ? 
                                        this.formateDateTableUpdate(this.state.dateFinish) :
                                        this.formateDateTable(this.state.dateFinish)
                                }
                                onChange={this.changeDateFinish}
                                errorText={this.state.errorDataFinish}
                                formatDate={new DateTimeFormat('pt-BR', {
                                    day: 'numeric',
                                    month: 'numeric',
                                    year: 'numeric',
                                }).format}
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
                        <div className="col-md-5 col-sm-5">
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
                        <div className="col-md-1 col-sm-1">
                        <IconButton
                             style={{float:'right' , marginTop:'30px'}}
                             onClick={() => this.makeListCourses()}
                        >
                            <Search />
                        </IconButton>
                        </div>
                    </div>
                    <hr/>
                    <div className="row">
                        <div className="col-md-6">
                            <Toggle 
                                label={'MARCAR TODOS'}
                                labelPosition="right"
                                defaultToggled={this.state.statusCourse}
                                onToggle={this.updateCheck.bind(this)}
                                disabled={this.state.disableField}
                            />
                            {
                                
                                (this.state.checked) ?
                                    this.state.listAllCourses :                            
                                    this.state.listCourses
                            }
                        </div>
                        <div className="col-md-6">
                            <FlatButton 
                                label={'LIMPAR TODOS'}
                                primary={true}
                                onClick={() => this.openClear()}
                                disabled={this.state.disableField}
                            />
                        </div>
                    </div>
                </Dialog>

                <Dialog
                    title="Vincular Curso"
                    actions={actionsClear}
                    modal={true}
                    open={this.state.openClear}
                    autoScrollBodyContent={true}
                >   
                    <h3>Esta ação excluirá o vínculo dessa promoção com todos os cursos relacionados. Deseja prosseguir?</h3>
                </Dialog>
            </div>
        )

    }
}

export default Promotions;