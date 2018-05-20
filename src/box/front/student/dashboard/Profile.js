import React, { Component } from 'react';


export default class Profile extends Component{
    render(){

        const style = {
            fontStyle:{
                fontFamily: 'Roboto sans-serif',
                textAlign: 'auto'
            }
        }
        return(
            <div>
                <div className="row">
                    <div className="col-lg-12 text-center">
                        <h3 style={style.fontStyle}>Perfil</h3>  
                    </div>   
                </div>
                
            </div>
        );
    }
}