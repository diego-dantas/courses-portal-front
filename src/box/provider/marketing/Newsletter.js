import React, { Component } from 'react';
import HttpService from './../../../service/http/HttpService';
import _ from 'lodash';

import RaisedButton from 'material-ui/RaisedButton';
import TextField    from 'material-ui/TextField';
import Toggle       from 'material-ui/Toggle';
import Dialog       from 'material-ui/Dialog';
import LinearProgress from 'material-ui/LinearProgress';
import {
    Table, 
    TableBody, 
    TableHeader, 
    TableHeaderColumn, 
    TableRow, 
    TableRowColumn,} from 'material-ui/Table';

import NewIco   from 'material-ui/svg-icons/content/add';
import CancelIo from 'material-ui/svg-icons/content/block'

class Newsletter extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            newsletter: JSON.parse(localStorage.getItem('newsletter')),
            rows: [], 
            open: false,
            openLoading: false,
            status: false,
            labelStatus: '',
            errorEmail: '',
        }
    }
    componentDidMount(){
        this.getNewsletter();
    }

    styles =
    {
        tableHeader: {backgroundColor: '#f1f1f1', textAlign: 'left', fontSize: '20px'},
        tableBody: {cursor: 'pointer'},
    };

    validField = () => {
        let valid = true;
        if(this.email.input.value === ''){
            valid = false;
            this.setState({errorEmail: 'Campo de emil obrigatório'})
        }

        return valid;
    }

    emailChange = () => {
        if(this.email.input.value !== '')
            this.setState({errorEmail: ''});
    }
    makeDataForNewsletter = () => {
        return {
            _id: "",
            name: this.name.input.value,
            email: this.email.input.value,
            status: this.state.status
        }
    }

    createUpdateNewslestter = () => {
        if(this.validField()){
            HttpService.make()
                       .post('/createUpdateNewslestter', this.makeDataForNewsletter())
                       .then(success =>{
                            this.getNewsletter();
                            this.closeDialog();
                       })
                       .catch(error => {
                           console.log(error + ' Erro ao buscar os newsletter');
                       })
        }
        
    }
    getNewsletter = () => {
        HttpService.make().get('/getNewsletter')
                          .then(success =>{
                            localStorage.setItem('newsletter', JSON.stringify(success.data));
                            this.setState({newsletter: JSON.parse(localStorage.getItem('newsletter'))});
                            this.fncMakeRows(this.state.newsletter);
                          })
                          .catch(error => {
                              console.log(error + ' Erro ao buscar os newsletter');
                          })
    }

    fncFilterRows = () =>
    {
        let filter = this.search.input.value;
        filter = filter.toUpperCase();
        let result = _.filter(this.state.newsletter, (row) => {
            let email = row.email.toUpperCase();
            return email.includes(filter);
        });
        this.fncMakeRows(result);
    };

    fncMakeRows = (newsletters) =>
    {

        newsletters = _.sortBy(newsletters, ['email', 'name']);

        let rows = newsletters.map((newsletter) =>
            <TableRow key={newsletter._id}>
                <TableRowColumn>{newsletter.email}</TableRowColumn>
                <TableRowColumn>{newsletter.name}</TableRowColumn>
                <TableRowColumn>{newsletter.status ? 'ATIVO' : 'INATIVO'}</TableRowColumn>
                <TableRowColumn>
                    <Toggle 
                        defaultToggled={newsletter.status}
                        onToggle={(event, isInputChecked) => this.isStatus(event, isInputChecked, newsletter)}
                    />
                </TableRowColumn>
            </TableRow>
        );

        this.setState({'rows': rows});
    };

    openDialog = (source) =>{
        if(source === 'update'){

        }else{
            this.setState({status: false});
            this.setState({labelStatus: 'INATIVO'});
            this.setState({errorEmail: ''});
        }
        this.setState({open: true});
    }
    
    closeDialog = () => {
        this.setState({open: false});
    }

    changeStatus = (event, isInputChecked) => {
        this.setState({status: isInputChecked});
        isInputChecked ? this.setState({labelStatus: 'Ativo'}) : this.setState({labelStatus: 'Inativo'});
    }

    isStatus = (event, isInputChecked, source) => {
        this.setState({openLoading: true});
        this.updateStatus(source, isInputChecked);
    }

    updateStatus = (source, isInputChecked) => {
        let val = {
            _id: source._id,
            name: source.name,
            email: source.email,
            status: isInputChecked
        } 
        HttpService.make()
                   .post('/createUpdateNewslestter', val)
                   .then(success =>{
                        this.setState({openLoading: false});
                        this.getNewsletter();
                   })
                   .catch(error => {
                       console.log(error + ' Erro ao atualizar o status');
                   })
    }

    render(){
        const actions = [
            <RaisedButton
                label="salvar"
                backgroundColor="#0ac752"
                icon={<NewIco color="#FFF"/>}
                labelStyle={{color: 'white'}}
                style={{marginRight:'20px'}}
                onClick={this.createUpdateNewslestter}
                disabled={this.state.disableField}

            />,
            <RaisedButton
                label="cancelar"
                backgroundColor="#DD2C00"
                icon={<CancelIo color="#FFF"/>}
                labelStyle={{color: 'white'}}
                onClick={this.closeDialog}
            />
        ]

        return(
            <div>
                 <RaisedButton
                    label="adicionar e-mail"
                    backgroundColor="#0ac752"
                    icon={<NewIco color="#FFF"/>}
                    labelStyle={{color: 'white'}}
                    style={{float: 'right', marginTop:'20px', marginBottom:'20px'}}
                    fullWidth={true}
                    onClick={this.openDialog}
                /> 
                <br/><br/>
                
                {
                    //Barra de loading para atualizar status
                    this.state.openLoading ? <LinearProgress mode="indeterminate" /> : null
                }

                <span className="display-block">
                    <TextField
                        hintText="informe o e-mail"
                        floatingLabelText="Pesquisar e-mail"
                        type="text"
                        fullWidth={true}
                        onChange={() => this.fncFilterRows()}
                        ref={(input) => this.search = input}/>
                </span>
                <Table>
                    <TableHeader
                        adjustForCheckbox={false}
                        enableSelectAll={false}
                        displaySelectAll={false}
                        style={this.styles.tableHeader}
                    >
                        <TableRow>
                            <TableHeaderColumn>Email</TableHeaderColumn>
                            <TableHeaderColumn>Nome</TableHeaderColumn>
                            <TableHeaderColumn>Status</TableHeaderColumn>
                        </TableRow>

                    </TableHeader>
                    <TableBody 
                        displayRowCheckbox={false}
                        showRowHover={true}
                        style={this.styles.tableBody}
                    >
                       {this.state.rows}

                    </TableBody>
                </Table>
                <Dialog
                    title="E-mail"
                    actions={actions}
                    open={this.state.open}
                    contentStyle={{width: '50%', height: '100%', maxWidth: 'none'}}
                    autoScrollBodyContent={true}
                >
                    <Toggle 
                        label={'Status: ' + this.state.labelStatus}
                        labelPosition="right"
                        defaultToggled={false}
                        onToggle={(event, isInputChecked) => this.changeStatus(event, isInputChecked)}
                        style={{marginTop: '20px'}}
                    />
                    <TextField 
                        floatingLabelText="Nome"
                        fullWidth={true}
                        defaultValue={this.state.name}
                        ref={(input) => {this.name = input;} }
                    />
                    <TextField 
                        floatingLabelText="E-mail"
                        type="email"
                        fullWidth={true}
                        defaultValue={this.state.email}
                        errorText={this.state.errorEmail}
                        ref={(input) => {this.email = input;} }
                        onChange={this.emailChange}
                    />
                </Dialog>
            </div>
        )
    }
}

export default Newsletter;