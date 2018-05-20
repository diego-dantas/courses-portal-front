import React, { Component } from 'react';
import '../../../static/css/listCourses.css';

import NavBar from '../bar/NavBar';

import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton';

import CardCourse from '../course/component/CardCourse';



class ListCourses extends Component {

    render(){
        return(
            <div>
                <NavBar/>                    
                <TextField
                    hintText="O que você está procurando ?"
                    floatingLabelText="Buscar cursos"
                    className='input-search'
                    style={{marginLeft: '5%', width: '90%', position: 'fixed', backgroundColor: '#fff'}}
                    onChange={()=> this.fncFilterCourses()}
                    ref={(input) => this.search = input}
                />
                <br/>
                <br/>
                <br/>
                
                <div className='component-category box-search'>
                    <div className='card-search'>
                        <div style={{display: 'flex'}}>
                            <div style={{maxWidth: '20%', minWidth: '20%', width: '20%'}}>
                                <img src={this.props.image} alt='' style={{width: '100%', height: '100%'}}/>
                            </div>
                            <div style={{maxWidth: '80%', minWidth: '80%', width: '80%', fontFamily: 'Roboto'}}>
                                <div style={{padding: '2%', fontSize: '20px'}}>{'teste'}</div>
                                <div style={{padding: '2%'}}>{'teste'}</div>
                                <div style={{padding: '2%', float: 'right'}}>
                                    <RaisedButton
                                        label="Acessar curso"
                                        backgroundColor={this.props.styleAccess}
                                        labelStyle={{color: 'white'}}
                                        
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <br/>
                <br/>
                <br/>
                <br/>
                <CardCourse/>
            </div>
        )
    }
}

export default ListCourses;