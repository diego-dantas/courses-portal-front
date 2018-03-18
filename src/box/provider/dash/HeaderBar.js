import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import PubSub from 'pubsub-js'

class HeaderBar extends Component
{
    constructor()
    {
        super();
        this.state = {label:''};
        PubSub.subscribe('header-label', this.fncChangeHeaderLabel);
    }; 
    
    fncChangeHeaderLabel = (key, label)=>
    {
        this.setState({'label':label});
    };

    render()
    {
        return (
            <div>
                <AppBar
                    title={this.state.label}
                    showMenuIconButton={true}
                    onLeftIconButtonClick={this.handleToggle}
                    style={{paddingLeft:'100px'}}
                />  
            </div>
        )
    };
}

export default HeaderBar;