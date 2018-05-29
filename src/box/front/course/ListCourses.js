import React from 'react';
import CardCourse from './../course/component/CardCourse';
import '../../../static/css/listCourses.css';

import NavBar from '../bar/NavBar';

import TextField from 'material-ui/TextField'



const ListCourses = (props) => {   
    
    //let category = Routers.get(props.match.params.cat);
    //let subCateg = Routers.get(props.match.params.subCat);
    let category = props.match.params.cat
    let subCateg = props.match.params.subCat

    return(
        <div>
            <NavBar/>  
            <br/>
            <br/>                
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
            <br/>     
            <CardCourse category={category} subCateg={subCateg} />
        </div>
    )
    
}

export default ListCourses;