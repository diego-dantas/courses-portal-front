import React, { Component } from 'react';

import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';


//Icons
import NewIco from 'material-ui/svg-icons/content/add';
import CancelIo from 'material-ui/svg-icons/content/block'


class Question extends Component {

    constructor(){
        super();
        this.state = {
            open: false,
        }
    }


    openDialog = () => {
        this.setState({open: true});
    }

    closeDialog = () => {
        this.setState({open: false});
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
                onClick={this.closeDialog}
            />
        ]

        return(
            <div>
                <RaisedButton
                    label="adicinar Questão"
                    fullWidth={true}
                    backgroundColor="#0ac752"
                    icon={<NewIco color="#FFF"/>}
                    labelStyle={{color: 'white'}}
                    style={{float: 'right', marginTop:'20px'}}
                    //onClick={() => alert('To aqui')}
                    onClick={this.openDialog}
                />
                <Dialog
                    title="Questão"
                    actions={actions}
                    modal={true}
                    open={this.state.open}
                    autoScrollBodyContent={true}
                >   

                </Dialog>
            </div>
        )
    }
}

export default Question;