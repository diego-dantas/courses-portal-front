//import of react
import React, { Component } from 'react';

//import mateiral-ui
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import MenuItem from 'material-ui/MenuItem';
import IconMenu from 'material-ui/IconMenu';



class HeaderBar extends Component {

    constructor(){
        super();
        this.state = {
            menu:['nome', 'nome2', 'nome3']
        }
    }
    
    style={
        marginBar:{
            marginTop: "12x",
        },
        
        marginNav:{
            color:"#fff", 
            marginTop:"12px", 
            marginBottom:"20px",
            marginRight: "10px",
            marginLefr: "10px"
        }
    };

    colors = [
        'Red',
        'Orange',
        'Yellow',
        'Green',
        'Blue',
        'Purple',
        'Black',
        'White',
    ];

    groupButton = () => {
      return (  
            <div style={this.style.marginNav}>

                <IconMenu
                    iconButtonElement={ <FlatButton label="CURSOS" />}
                    onRequestChange={this.handleOnRequestChange}
                >
                    {this.state.menu}
                </IconMenu>

                <RaisedButton 
                    label="Fazer Login"
                    primary={true}
                    style={{marginRight: '10px'}}
                />
                <RaisedButton
                    label="Cadastre-se"
                    secondary={true}
                 />
            </div>
            )
    };


    render(){
        return(
            <AppBar 
                title = {<span>COURSES</span>}
                showMenuIconButton={false}
                iconElementRight={this.groupButton()}
            />
        );
    }
}

export default HeaderBar;