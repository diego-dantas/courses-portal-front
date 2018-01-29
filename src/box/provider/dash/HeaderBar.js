import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';


class HeaderBar extends Component
{
    render()
    {
        return (
            <div>
                <AppBar
                    title = "About"
                    showMenuIconButton={false}
                    style={{paddingLeft:'250px'}}
                />  
            </div>
        )
    };
}

export default HeaderBar;