import React, { Component } from 'react';
import CircularProgress from 'material-ui/CircularProgress';


export default class CustomLoad extends Component {

    render(){
        return(
            <div 
                style={{
                    position: 'fixed', height: '100%', width: '100%', 
                    top: '0px', left: '0px', opacity: '1', 
                    backgroundColor: 'rgba(0, 0, 0, 0.54)',                              
                    willChange: 'opacity', transform: 'translateZ(0px)', transition: 'left 0ms cubic-bezier(0.23, 1, 0.32, 1) 0ms, opacity 400ms cubic-bezier(0.23, 1, 0.32, 1) 0ms',
                    zIndex: '1400'
                }}>
                
                <CircularProgress 
                    size={100} 
                    thickness={10} 
                    style={{marginLeft: '50%', marginRight: '50%', marginTop: '20%'}}
                />
            </div>
        )
    }
}

