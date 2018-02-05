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


class Promotions extends Component {

    constructor(){
        super();
        this.state = {
            openCreate: false,
            openUpdate: false,
            dateStart: null,
            dateFinished: null,
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

    setDateStart = (event, date) => {
        this.setState({dateStart: date})
    }

    setDateFinished = (event, date) => {
        this.setState({dateFinished: date})
    }

    formateDate = (date) => {       
        return  new Intl.DateTimeFormat('pt-BR', { 
            year: 'numeric', 
            month: '2-digit', 
            day: '2-digit' 
        }).format(date)
    }
    makeDataForPromotions = () => {

        

        return{
            description: this.description.input.value,
            coupon: this.coupon.input.value,
            percentage: this.percentage.input.value,
            dataInicial: this.formateDate(this.state.dateStart),
            dataFinal: this.formateDate(this.state.dateFinished)
        }
    }

    createPromotions = () => {
        console.log(JSON.stringify(this.makeDataForPromotions()));
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
                 <br/><br/><br/><br/><br/>
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
                    <DatePicker 
                        hintText="Data Inicio"
                        onChange={this.setDateStart}
                    />
                    <DatePicker 
                        hintText="Data Final"
                        onChange={this.setDateFinished}  
                    />
                </Dialog>

            </div>
        );
    }
}

export default Promotions;