import React, { Component } from 'react'

export default class Alerts extends Component  {
    constructor(props){
        super(props);
        this.state = {
            msg: props.msg,
            type: props.type
        }
    }

    render(){
        return(
            <div 
                className={
                    this.state.type === 'success' ?
                        'alert alert-success' :
                        'alert alert-danger' 
                } 
                role="alert">
                {this.state.msg}
            </div>
        )
    }
    
}