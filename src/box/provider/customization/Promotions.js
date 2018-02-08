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
  import DatePicker from 'material-ui/DatePicker';
  import MaskedInput from 'react-maskedinput'


//Import BootStrap 
import { 
    FormGroup, 
    FormControl,
    ControlLabel
} from 'react-bootstrap';



class Promotions extends Component {

    constructor(){
        super();
        this.state = {
            promotionTabel: JSON.parse(localStorage.getItem('promotion')),
            openCreate: false,
            openUpdate: false,
            dateStart: null,
            dateFinished: null,
            idPromotion:'',
            descPromotion: '',
            codCupomPromotion: '',
            percentual:'',
            dataIni: '',
            dataFin: '',

             //state da tabela
             fixedHeader: true,
             stripedRows: false,
             showRowHover: false,
             selectable: true,
             multiSelectable: false,
             enableSelectAll: false,
             deselectOnClickaway: true,
             showCheckboxes: false,
        }
    }

    componentDidMount() {
        this.getPromotion();
    }
    

    handleOpenCreate = () => {
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

    setDateStart = (date) => {
        this.setState({dateStart: date.target.value })
    }

    setDateFinished = (date) => {
        this.setState({dateFinished: date.target.value })
    }

    handleCellClick(col)
    {   
        //converto o retorno da data do banco
        let desc = this.state.promotionTabel[col].description;
        let dataInicialC  = this.formateDate(this.state.promotionTabel[col].dateInicial).substring(0,10);
        let dataFinalC  = this.formateDate(this.state.promotionTabel[col].dateFinal).substring(0,10);
        let dtIn = dataInicialC.substring(6,10) + '-' + dataInicialC.substring(3,5) + '-' + dataInicialC.substring(0,2)
        let dtFn = dataFinalC.substring(6,10) + '-' + dataFinalC.substring(3,5) + '-' + dataFinalC.substring(0,2);        
        
        //populo os valores para os states
        this.setState({idPromotion: this.state.promotionTabel[col]._id});
        this.setState({descPromotion: desc});
        this.setState({codCupomPromotion: this.state.promotionTabel[col].codigoCupom});
        this.setState({percentual: this.state.promotionTabel[col].percentual});
        this.setState({dataIni: dtIn});
        this.setState({dataFin: dtFn});

        this.handleOpenUpdate();          
    }

    formateDate = (date) => {       
        var date = new Date(date);
        var nextDate = date.getDate();
        date.setDate(nextDate);
        var newDate = date.toLocaleString();
        return  newDate;
    }
    makeDataForPromotions = () => {
        return{
            _id: this.state.idPromotion,
            description: this.description.input.value,
            codigoCupom: this.coupon.input.value,
            percentual: this.percentage.input.value,
            dateInicial: this.state.dataIni.value,
            dateFinal: this.state.dataFin.value
        }
    }

    createPromotions = () => {     
         
        console.log(JSON.stringify(this.makeDataForPromotions()));
        HttpService.make().post('/createPromotion', this.makeDataForPromotions())
                            .then(success => {
                                alert('Dados incluido com sucesso');
                                this.getPromotion();
                                this.handleCloseCreate();
                            })
                            .catch(error =>{
                                console.log('Erro ao criar uma promoção');
                            })
    }

    updatePromotions = () => {     
        
       console.log(JSON.stringify(this.makeDataForPromotions()));
       HttpService.make().post('/updatePromotion', this.makeDataForPromotions())
                           .then(success => {
                               alert('Dados atualizados com sucesso');
                               this.getPromotion();
                               this.handleCloseUpdate();
                           })
                           .catch(error =>{
                               console.log('Erro ao alterar uma promoção');
                           })
   }

   deletePromotions = () => {     
    
   console.log(JSON.stringify(this.makeDataForPromotions()));
   HttpService.make().post('/deletePromotion', this.makeDataForPromotions())
                       .then(success => {
                           alert('Dados excluido com sucesso');
                           this.getPromotion();
                           this.handleCloseUpdate();
                       })
                       .catch(error =>{
                           console.log('Erro ao exluir uma promoção');
                       })
    }

    getPromotion = () => {
        HttpService.make().get('/getPromotion')
                    .then(success =>{
                        
                        this.setState({promotionTabel: [ {
                            "_id": "",
                            "description": "",
                            "dateInicial": "",
                            "dateFinal": "",
                            "percentual": "",
                            "codigoCupom": ""
                        }]});
                        localStorage.setItem('promotion', JSON.stringify(success));
                        this.setState({promotionTabel: JSON.parse(localStorage.getItem('promotion'))});
                    })
                    .catch(error => {
                        console.log('Erro ao buscar as promoçoes');
                    })
    }

    render(){
        
        //Botões para o Modal
        const actions = [
            <RaisedButton
                label="salvar"
                backgroundColor="#0ac752"
                icon={<NewIco color="#FFF"/>}
                labelStyle={{color: 'white'}}
                style={{marginRight:'20px'}}
                onClick={this.createPromotions}

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
                label="atualizar"
                backgroundColor="#0ac752"
                icon={<NewIco color="#FFF"/>}
                labelStyle={{color: 'white'}}
                style={{marginRight:'20px'}}
                onClick={this.updatePromotions}

            />,
            <RaisedButton
                label="excluir"
                backgroundColor="#DD2C00"
                icon={<CancelIo color="#FFF"/>}
                labelStyle={{color: 'white'}}
                style={{marginRight:'20px'}}
                onClick={this.deletePromotions}
            />,
            <RaisedButton
                label="cancelar"
                backgroundColor="#FF9800"
                icon={<CancelIo color="#FFF"/>}
                labelStyle={{color: 'white'}}
                onClick={this.handleCloseUpdate}
            />
        ]

        const bodyTable = [
            this.state.promotionTabel.map( (row, index) => (
                <TableRow key={index}>
                    <TableRowColumn>{row._id}</TableRowColumn>
                    <TableRowColumn>{row.description}</TableRowColumn>
                    <TableRowColumn>{row.codigoCupom}</TableRowColumn>
                    <TableRowColumn>{row.percentual}</TableRowColumn>
                    <TableRowColumn>{this.formateDate(row.dateInicial).substring(0,10)}</TableRowColumn>
                    <TableRowColumn>{this.formateDate(row.dateFinal).substring(0,10)}</TableRowColumn>
                </TableRow>
            ))
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
                    onClick={this.handleOpenCreate}
                />
                 <br/><br/><br/>
                <Table
                    height='300px'
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
                            <TableHeaderColumn tooltip="ID">ID</TableHeaderColumn>
                            <TableHeaderColumn tooltip="Descrição">Descrição</TableHeaderColumn>
                            <TableHeaderColumn tooltip="Código">Código</TableHeaderColumn>
                            <TableHeaderColumn tooltip="%">%</TableHeaderColumn>
                            <TableHeaderColumn tooltip="Data Inicial">Data Inicial</TableHeaderColumn>
                            <TableHeaderColumn tooltip="Data Final">Data Final</TableHeaderColumn>
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
                    title="Adicionar Promoção"
                    actions={actions}
                    modal={true}
                    open={this.state.openCreate}
                >   
                    
                    <TextField 
                        floatingLabelText="Descrição"
                        fullWidth={true}
                        disabled={this.state.disableField}
                        ref={(input) => {this.description = input;} }
                    />
                    <TextField 
                        floatingLabelText="Código do Cupom "
                        fullWidth={false}
                        style={{marginRight: '30px'}}
                        ref={(input) => {this.coupon = input;} }
                    />
                    <TextField 
                        floatingLabelText="Percentual"
                        fullWidth={false}
                        style={{marginLeft: '30px'}}
                        type='number'
                        ref={(input) => {this.percentage = input;} }
                    />
                    <br /><br />
                    <div className="row">
                        <div className="col-md-5">
                            <FormGroup controlId="formInlineName">
                                
                                <ControlLabel>Data Inicial</ControlLabel>{' '}
                                <FormControl 
                                    type="date" 
                                    inputRef={(ref) => {this.state.dataIni = ref}} 
                                />
                            </FormGroup>{' '}
                        </div>
                        <div className="col-md-5">
                            <FormGroup controlId="formInlineEmail">
                                <ControlLabel>Data Final</ControlLabel>{' '}
                                <FormControl 
                                type="date" 
                                inputRef={(ref) => {this.state.dataFin = ref}} 
                                />
                                
                            </FormGroup>{' '}
                        </div>
                    </div>
                </Dialog>

                <Dialog
                    title="Alterar ou Excluir Promoção"
                    actions={actionsUpdate}
                    modal={true}
                    open={this.state.openUpdate}
                >   
                    
                    <TextField 
                        floatingLabelText="Descrição"
                        fullWidth={true}
                        disabled={this.state.disableField}
                        defaultValue={this.state.descPromotion}
                        ref={(input) => {this.description = input;} }
                    />
                    <TextField 
                        floatingLabelText="Código do Cupom "
                        fullWidth={false}
                        style={{marginRight: '30px'}}
                        defaultValue={this.state.codCupomPromotion}
                        ref={(input) => {this.coupon = input;} }
                    />
                    <TextField 
                        floatingLabelText="Percentual"
                        fullWidth={false}
                        style={{marginLeft: '30px'}}
                        type='number'
                        defaultValue={this.state.percentual}
                        ref={(input) => {this.percentage = input;} }
                    />
                    <br /><br />
                    <div className="row">
                        <div className="col-md-5">
                            <FormGroup controlId="formInlineName">
                                
                                <ControlLabel>Data Inicial</ControlLabel>{' '}
                                <FormControl 
                                    type="date" 
                                    defaultValue={this.state.dataIni}
                                    inputRef={(ref) => {this.state.dataIni = ref}} 
                                />
                            </FormGroup>{' '}
                        </div>
                        <div className="col-md-5">
                            <FormGroup controlId="formInlineEmail">
                                <ControlLabel>Data Final</ControlLabel>{' '}
                                <FormControl 
                                    type="date" 
                                    defaultValue={this.state.dataFin}
                                    inputRef={(ref) => {this.state.dataFin = ref}} 
                                />
                                
                            </FormGroup>{' '}
                        </div>
                    </div>
                </Dialog>

            </div>
        );
    }
}

export default Promotions;