import React, { Component } from 'react';

import MenuItem from 'material-ui/MenuItem';
import Divider  from 'material-ui/Divider';
import {Link}   from 'react-router-dom';

import Person    from 'material-ui/svg-icons/social/person'
import EventNote from 'material-ui/svg-icons/notification/event-note';

export default class NavDashboard extends Component {

    constructor(props){
        super(props);
        this.state = {
            student: JSON.parse(localStorage.getItem('student')),
            path: 'http://localhost:8080/api/',
        }
    }

    componentDidMount(){
        
    }

    render(){

        const style = {
            fontStyle:{
                fontFamily: 'Roboto sans-serif', textAlign: 'center', marginTop: '20px'
            },

            navStyle:{
                fontFamily: 'Roboto sans-serif'
            },

            sizeImg:{
                width: '150px', height: '150px'       
            }
        }

        return(
            <div>
                <div className="text-center" style={{marginTop: '20px'}}>
                    <div>
                        <img 
                            src={
                                    this.state.student.source === 'site' ?  
                                        this.state.path+''+this.state.student.imagePath :
                                        this.state.student.imagePath
                                }
                            alt="Alterar foto" 
                            style={style.sizeImg}
                            className="rounded-circle"/> 
                    </div>
                    <h5 style={style.fontStyle}>{this.state.student.name.toUpperCase()}</h5>
                </div>
                <Divider />
                <Link to={'/student/profile'} className={"link-routes"} >
                    <MenuItem
                        primaryText="Perfil"
                        leftIcon={<Person />}
                        style={style.navStyle}
                    />
                </Link>
                <Divider />
                <Link to={'/student/plan'} className={"link-routes"} >
                    <MenuItem
                        primaryText="Plano"
                        leftIcon={<EventNote />}
                        style={style.navStyle}
                    />
                </Link>
            </div>
        );
    }
}