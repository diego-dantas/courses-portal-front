import React, { Component } from 'react';
import IconButton from 'material-ui/IconButton';
import ArrowUp from 'material-ui/svg-icons/navigation/arrow-upward';

export default class FloatingButton extends Component {
    constructor(props){
        super(props);
    }

    topFunction = () => {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }
    
    render(){
        return(
            <div>
                <IconButton 
                    id="floatBtn"
                    style={{
                        position: 'fixed',
                        bottom: '20px',
                        right: '30px',
                        zIndex: '99',
                        backgroundColor: '#87CEEB',
                        borderRadius: '100px'
                    }}
                    tooltip="VOLTAR AO TOPO"
                    tooltipPosition="top-center"
                    onClick={() => this.topFunction()}
                >
                    
                    <ArrowUp />
                </IconButton>
            </div>
        )
    }
}