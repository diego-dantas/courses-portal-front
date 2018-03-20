import React, {Component} from "react";

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import LinearProgress from 'material-ui/LinearProgress';
import {Step, StepLabel, Stepper,} from 'material-ui/Stepper';

//icons
import SendIco from 'material-ui/svg-icons/content/send';
import ArrowForwardIcon from 'material-ui/svg-icons/navigation/arrow-forward';


class SendEmail extends Component {


    constructor(props){
        super(props);
        this.state = {
            open: false,
            stepIndex: 0,
            sending: false,
            html: '',
            subject: '',
            text: '',

            errorHtml: '',
            errorSubject: '',
            errorText: ''
        }
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

                        {/* <span className="display-block">
                             <TextField
                                 hintText="informe o nome do aluno"
                                 floatingLabelText="Pesquisar assinatura"
                                 type="text"
                                 errorText={this.state.errorText.recipients}
                                 fullWidth={true}
                                 onChange={() => this.fncFilterRows()}
                                 ref={(input) => this.search = input}/>
                        </span>
                        <Table
                            height={'300px'}
                            fixedHeader={true}
                            selectable={true}
                            multiSelectable={true}
                            onRowSelection={(item) => this.rowSelected(item)}>
                            <TableHeader
                                style={this.styles.tableHeader}
                                displaySelectAll={true}
                                adjustForCheckbox={true}
                                enableSelectAll={true}>

                                <TableRow>
                                    <TableHeaderColumn>Nome do aluno</TableHeaderColumn>
                                    <TableHeaderColumn>Email do aluno</TableHeaderColumn>
                                    <TableHeaderColumn>Situação da assinatura</TableHeaderColumn>
                                </TableRow>
                            </TableHeader>
                            <TableBody displayRowCheckbox={true}
                                       showRowHover={true}
                                       deselectOnClickaway={false}
                                       style={this.styles.tableBody}>
                                {this.state.rows}
                            </TableBody>
                        </Table> */}
                    </div>
                );

            default:
                return ((<span>error</span>))
        }
    };

    render(){
        const {stepIndex} = this.state;
        const actions = [
            <FlatButton
                label={stepIndex === 0 ? 'Cancelar' : 'Voltar'}
                primary={true}
                onTouchTap={stepIndex === 0 ? this.closeDialog : this.fncHandlePrev}
                style={{marginRight: '10px'}}
            />,

            <RaisedButton
                backgroundColor="#0ac752"
                labelStyle={{color: 'white'}}
                label={stepIndex === 1 ? 'Enviar' : 'Proximo'}
                primary={true}
                onTouchTap={stepIndex === 1 ? this.fncValidAndSendEmail : this.fncHandleNext}
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