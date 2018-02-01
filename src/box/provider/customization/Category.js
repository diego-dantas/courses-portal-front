import React, { Component } from 'react';

import RaisedButton from 'material-ui/RaisedButton';
import NewIco from 'material-ui/svg-icons/content/add';
import CancelIo from 'material-ui/svg-icons/content/block'

import Dialog from 'material-ui/Dialog';

class Category extends Component {

    state = {
        open: false
    }

    handleOpen = () => {
        this.setState({open: true});
    }

    handleClose = () =>{
        this.setState({open: false});
    }

    render(){
        const actions = [
            <RaisedButton
                label="salvar"
                backgroundColor="#0ac752"
                icon={<NewIco color="#FFF"/>}
                labelStyle={{color: 'white'}}
                style={{marginRight:'20px'}}

            />,
            <RaisedButton
                label="cancelar"
                backgroundColor="#DD2C00"
                icon={<CancelIo color="#FFF"/>}
                labelStyle={{color: 'white'}}
                onClick={this.handleClose}
            />
        ]

        return(
            <div>
                <RaisedButton
                    label="adicinar categoria"
                    backgroundColor="#0ac752"
                    icon={<NewIco color="#FFF"/>}
                    labelStyle={{color: 'white'}}
                    style={{float: 'right', marginTop:'20px'}}
                    onClick={this.handleOpen}
                />
                <Dialog
                    title="Adicionar categoria"
                    actions={actions}
                    modal={true}
                    open={this.state.open}
                >
                </Dialog>
            </div>
        );
    }
}

export default Category;