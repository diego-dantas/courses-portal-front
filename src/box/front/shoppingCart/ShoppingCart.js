import React, { Component } from 'react';

import NavBar from './../bar/NavBar';


export default class ShoppingCart extends Component{
    render(){
        return(
            <div>
                <NavBar />
                <br/><br/><br/><br/><br/>

                <div className="container">
                    <h5 className="text-center">Carrinho</h5>

                    <div className="row" style={{borderWidth: '1px', borderStyle: 'solid', borderColor: '#DCDCDC'}}>
                        <ul>
                            <li>1</li>
                            <li>2</li>
                            <li>3</li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}