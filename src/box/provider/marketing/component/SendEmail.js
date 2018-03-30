import React, {Component} from "react";
import HttpService from '../../../../service/http/HttpService';
import _ from 'lodash';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import LinearProgress from 'material-ui/LinearProgress';
import {Step, StepLabel, Stepper,} from 'material-ui/Stepper';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn,} from 'material-ui/Table';

//icons
import SendIco from 'material-ui/svg-icons/content/send';
import ArrowForwardIcon from 'material-ui/svg-icons/navigation/arrow-forward';


class SendEmail extends Component {


    constructor(props){
        super(props);
        this.state = {
            students: JSON.parse(localStorage.getItem('students')),
            open: false,
            stepIndex: 0,
            sending: false,
            screenDisable: false,
            html: '',
            subject: '',
            text: '',

            errorHtml: '',
            errorSubject: '',
            errorText: '',

            rows: [], 
            signatures: [],
            arrayStudents: [],
        }

        this.keyRowsSelected = [];
    }

    styles =
    {
        tableHeader: {backgroundColor: '#f1f1f1', textAlign: 'left', fontSize: '20px'},
        tableBody: {cursor: 'pointer'},
    };

    componentDidMount() {
        this.getStudents();
    }


    openDialog = () => {
        this.setState({subject: ''});
        this.setState({text:    ''});
        this.setState({html:    ''});
        this.setState({open: true});
    }

    closeDialog = () => {
        this.setState({open: false});
    }

    fncHandlePrev = () =>
    {
        const {stepIndex} = this.state;

        if(stepIndex > 0) {
            this.setState({stepIndex: stepIndex - 1});
        }
    }

    fncHandleNext = () =>
    {
        const {stepIndex} = this.state;
        let status = this.validField();

        if (stepIndex < 1 && status) {
            this.setState({subject: this.subject.input.value});
            this.setState({text:    this.text.input.refs.input.value});
            this.setState({html:    this.html.input.refs.input.value});
            this.setState({stepIndex: stepIndex + 1});
        }
    };

    validField = () => {
        
        let valid = true;
        if(this.subject.input.value === ''){
            this.setState({errorSubject: 'Campo Obrigatório'});
            valid = false;
        } 
        if(this.text.input.refs.input.value === ''){
            this.setState({errorText: 'Campo Obrigatório'});
            valid = false;
        } 
        if(this.html.input.refs.input.value === ''){
            this.setState({errorHtml: 'Campo Obrigatório'});
            valid = false;
        } 
        return valid;
    }

    changeField = () => {
        if(this.subject.input.value         !== '') this.setState({errorSubject: ''});
        if(this.text.input.refs.input.value !== '') this.setState({errorText:    ''});
        if(this.html.input.refs.input.value !== '') this.setState({errorHtml:    ''});
        
    }

    getStudents = () => {
        console.log('vamos la mano');
        HttpService.make().get('/getStudents')
                   .then(success => {
                        console.log(success.data);
                        localStorage.setItem('students', JSON.stringify(success.data));
                        this.setState({students: JSON.parse(localStorage.getItem('students'))});
                        this.fncMakeRows(this.state.students);
                   })
                   .catch(error => {
                       console.log('Erro ao buscar os alunos');
                   })
    }

    fncFilterRows = () =>
    {
        let filter = this.search.input.value;
        filter = filter.toUpperCase();
        let result = _.filter(this.state.students, (o) => {
            let name = o.name.toUpperCase();
            return name.includes(filter);
        });
        this.fncMakeRows(result);
    };

    fncMakeRows = (students) =>
    {
        students = _.sortBy(students, ['name', 'email']);

        let rows = students.map((student) =>
            <TableRow key={student._id}>
                <TableRowColumn>{student.name}</TableRowColumn>
                <TableRowColumn>{student.email}</TableRowColumn>
                <TableRowColumn>{student.status ? 'ATIVO' : 'INATIVO'}</TableRowColumn>
            </TableRow>
        );

        this.setState({'rows': rows});
    };

    rowSelected = (item) =>
    {
        
        let rows = this.state.rows;
        this.keyRowsSelected = [];
        if (item !== 'all' && item !== 'none') {
            
            _.forEach(item, (value) => {
                console.log(rows[value].key);
                
                this.state.students.map((row, i) => (
                    parseInt(rows[value].key, 0) === row._id ? this.keyRowsSelected.push(row.email) : '' 
                ))
            });
        }       

        if (item === 'all') {
            _.forEach(rows, (item) => {
                let result = _.filter(this.state.students, (o) => {
                    return o._id === item.key
                });
                if (result.length > 0) {
                    this.keyRowsSelected.push(result[0].email);
                }

            });
        }

        // if (item !== 'all' && item !== 'none') {
        //     _.forEach(item, (value) => {

        //         let result = _.filter(this.state.students, (o) => {
        //             return o._id === rows[value].key
        //         });
        //         if (result.length > 0) {
        //             this.keyRowsSelected.push(result[0].email);
        //         }
        //     });

        // }
        
        let remakeRow = [];
        _.forEach(rows, (item) => {
            let result = _.filter(this.state.students, (o) => {
                return o._id === item.key
            });
            if (result.length > 0 && result[0].name !== undefined) {
                remakeRow.push(result[0])
            }
        });

        if (remakeRow.length > 0) {
            this.fncMakeRows(remakeRow);
        }
    };

    isSelectedRow = (id) =>
    {
        let result = _.filter(this.keyRowsSelected, (o) => {
            return o === id
        });
        console.log(result.length > 0);
        return result.length > 0;
    };

    getStepContent(stepIndex)
    {
        switch (stepIndex) {
            case 0:
                return (
                    <div>
                        <TextField
                            hintText="Informe o assunto do email"
                            floatingLabelText="Assundo"
                            type="text"
                            disabled={this.state.makeSend}
                            errorText={this.state.errorSubject}
                            fullWidth={true}
                            ref={(input) => this.subject = input}
                            onChange={this.changeField}
                            defaultValue={this.state.subject}
                        />
                        <TextField
                            hintText="Informe o corpo do email (caso o html não carregue)"
                            floatingLabelText="Texto"
                            type="text"
                            disabled={this.state.makeSend}
                            errorText={this.state.errorText}
                            fullWidth={true}
                            multiLine={true}
                            rows={2}
                            ref={(input) => this.text = input}
                            onChange={this.changeField}
                            defaultValue={this.state.text}
                        />
                        <TextField
                            hintText="Informe o html do email"
                            floatingLabelText="HTML"
                            type="text"
                            disabled={this.state.makeSend}
                            errorText={this.state.errorHtml}
                            fullWidth={true}
                            multiLine={true}
                            rows={2}
                            ref={(input) => this.html = input}
                            onChange={this.changeField}
                            defaultValue={this.state.html}
                        />

                    </div>
                );

            case 1:
                return (
                    <div>
                         <div 
                            className="container"
                            style={{width:'100%', float:'center'}}
                            >
                            <span className="display-block">
                                <TextField
                                    hintText="informe o nome do aluno"
                                    floatingLabelText="Pesquisar assinatura"
                                    type="text"
                                    fullWidth={true}
                                    onChange={() => this.fncFilterRows()}
                                    ref={(input) => this.search = input}/>
                            </span>

                            <Table
                                height={'300px'}
                                fixedHeader={true}
                                selectable={true}
                                multiSelectable={true}
                                onRowSelection={(item) => this.rowSelected(item)}
                                disabled={this.state.screenDisable}
                            >
                                <TableHeader
                                    style={this.styles.tableHeader}
                                    displaySelectAll={true}
                                    adjustForCheckbox={true}
                                >

                                    <TableRow>
                                        <TableHeaderColumn>Nome do aluno</TableHeaderColumn>
                                        <TableHeaderColumn>Email do aluno</TableHeaderColumn>
                                        <TableHeaderColumn>Situação da assinatura</TableHeaderColumn>
                                    </TableRow>
                                </TableHeader>
                                <TableBody displayRowCheckbox={true}
                                        showRowHover={true}
                                        deselectOnClickaway={false}
                                        disabled={this.state.screenDisable}
                                        style={this.styles.tableBody}>
                                    {this.state.rows}
                                </TableBody>
                            </Table>

                        </div>
                    </div>
                );

            default:
                return ((<span>error</span>))
        }
    };

    fncValidAndSendEmail = () =>
    {
        let email = [];
        this.keyRowsSelected.map((row, i) => (
            email.push({
                assunto: this.state.subject,
                textoHtml: this.state.html,
                textoSimples: this.state.text,
                student: {
                    email: row
                }
            })
        ))        
        return email;
    };

    sendListEmail = () => {
        this.setState({screenDisable: true});
        this.setState({sending: true})
        HttpService.make().post('/sendEmail', this.fncValidAndSendEmail())
                          .then(success => {
                                this.setState({screenDisable: false});
                                this.setState({sending: false});
                                this.closeDialog();
                          })
                          .catch(error =>{
                              console.log(error)
                          })
    }

    render(){
        const {stepIndex} = this.state;
        const actions = [
            <FlatButton
                label={stepIndex === 0 ? 'Cancelar' : 'Voltar'}
                primary={true}
                onTouchTap={stepIndex === 0 ? this.closeDialog : this.fncHandlePrev}
                style={{marginRight: '10px'}}
                disabled={this.state.screenDisable}
            />,

            <RaisedButton
                backgroundColor="#0ac752"
                disabled={this.state.screenDisable}
                labelStyle={{color: 'white'}}
                label={stepIndex === 1 ? 'Enviar' : 'Proximo'}
                primary={true}
                onTouchTap={stepIndex === 1 ? this.sendListEmail : this.fncHandleNext}
                style={{float: 'right', marginRight: '10px'}}/>
            ,
        ]

        return(
            <div>
                <RaisedButton
                     label={'Enviar email'}
                     backgroundColor={'#0ac752'}
                     icon={<SendIco color='#FFF'/>}
                     onTouchTap={() => this.openDialog()}
                     style={{width:'79%', float:'left', marginTop: '20px'}}
                     labelStyle={{color: 'white'}}
                />
                <Dialog 
                    title="Enviar email"
                    open={this.state.open}
                    autoScrollBodyContent={true}
                    actions={actions}
                    modal={true}
                    style={{margin:'0',minHeight: '450px', maxHeight: '450px'}}
                    titleStyle={{padding:'30px', marginTop:'-40px'}}
                    contentStyle={{width: '80%', maxWidth: 'none',minHeight: '450px', maxHeight: '450px'}}
                    bodyStyle={{minHeight: '400px', maxHeight: '400px'}}
                >
                    <br/>
                    {this.state.sending ?<LinearProgress mode="indeterminate" />  : null}
                    
                    <Stepper activeStep={stepIndex} connector={<ArrowForwardIcon/>}>
                        <Step>
                            <StepLabel>Informações básicas</StepLabel>
                        </Step>

                        <Step>
                            <StepLabel>Destinatários</StepLabel>
                        </Step>
                    </Stepper>

                    {this.getStepContent(stepIndex)}
                </Dialog>
            </div>
        )
    }
}

export default SendEmail;