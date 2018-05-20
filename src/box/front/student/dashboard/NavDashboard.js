import React, { Component } from 'react';

import MenuItem from 'material-ui/MenuItem';
import Divider  from 'material-ui/Divider';
import {Link}   from 'react-router-dom';

import Person    from 'material-ui/svg-icons/social/person'
import EventNote from 'material-ui/svg-icons/notification/event-note';

export default class NavDashboard extends Component {
    render(){

        const style = {
            fontStyle:{
                fontFamily: 'Roboto sans-serif', textAlign: 'center'
            },

            navStyle:{
                fontFamily: 'Roboto sans-serif'
            },

            sizeImg:{
                width: '150px', height: '150px', marginBottom: '30px'        
            }
        }

        return(
            <div>
                <div className="text-center" style={{marginTop: '20px'}}>
                    <img 
                        src={'http://localhost:8080/api/getFile?name=carousel/caneca.png'} 
                        alt="..." 
                        style={style.sizeImg}
                        className="rounded-circle" />
                    <h5 style={style.fontStyle}>Diego Dantas</h5>
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