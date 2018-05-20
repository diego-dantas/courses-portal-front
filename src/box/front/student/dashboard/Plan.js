import React, { Component } from 'react';

export default class Plan extends Component {
    render(){
        const style = {
            fontStyle:{
                fontFamily: 'Roboto sans-serif',
                textAlign: 'auto'
            }
        }
        return(
            <div>
                <div className="col-lg-12 text-center">
                    <h3 style={style.fontStyle}>Plano</h3>  
                </div>   
                <hr/>
                
            </div>
        );
    }
}