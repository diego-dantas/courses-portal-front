//import of react
import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import PubSub from 'pubsub-js'

//import mateiral-ui
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';


//componentes do menu
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';


//Incones
import ArrowDropRight from 'material-ui/svg-icons/navigation-arrow-drop-right';
import ActionDashboard from 'material-ui/svg-icons/action/dashboard';

import SignIn from '../student/account/SignIn';

import './../../../static/css/bootstrap.min.css'
import './../../../static/css/animate.min.css';
import './../../../static/css/bootstrap-dropdownhover.min.css';


  
class HeaderBar extends Component {

    constructor(){
        super();
        this.state = {
            category: JSON.parse(localStorage.getItem('category')),
            subCategory: JSON.parse(localStorage.getItem('subCategory')),
            menu:null,
            menuCurso:false,
            open: false,
            dataSource: ['nome', 'casa', 'nossa'],
            display: 'none',
            showModalSignIn: false
            
        }
        
    }
    componentDidMount(){
        PubSub.subscribe('close-home-model', this.closeAll);
        this.buildCourseMenu();
        // while(this.state.menu === null){
        //     console.log('menu null');
        // }
        
    }

    
    closeAll = (key, value) =>{
        this.setState({'showModalSignIn':false});
    };
    handleClick = (event) => {
        // This prevents ghost click.
        event.preventDefault();
    
        this.setState({
          open: true,
          anchorEl: event.currentTarget,
        });
      };
    
      handleRequestClose = () => {
        this.setState({
          open: false,
        });
      };

    style={
        fontTitle:{
            fontSize: "20px",
            color:"#fff", 
            marginTop:"12px", 
            marginBottom:"20px",
        },
        marginBar:{
            marginTop: "12x",
        },
        
        marginNav:{
            color:"#fff", 
            marginTop:"12px", 
            marginBottom:"20px",
            marginRight: "10px",
            marginLeft: "10px"
        },
        search: {
            border: "2px solid",
            backgroundColor: "#fff"
        }
    };

    colors = [
        'Red',
        'Orange',
        'Yellow',
        'Green',
        'Blue',
        'Purple',
        'Black',
        'White',
    ];

    buildCourseMenu = () =>{

        // let categories = JSON.parse(localStorage.getItem('category'));
        
        // if(categories !== undefined && categories !== null){
            
        //     let menu =  categories.map((category, index) =>
        //         (this.validateSubMenu(category._id) === true) ?
        //             <MenuItem key={index}
        //                 rightIcon={<ArrowDropRight />}
        //                 value = {category.description}
        //                 primaryText = {category.description}
                        
        //                 menuItems={[
        //                     <MenuItem 
        //                         value = 'Teste'
        //                         primaryText = {'Todos em ' + category.description}
        //                     />,
        //                     this.buildSubMenu(category._id)
                            
        //                 ]}
        //             />   
        //         : ''          
        //     ); 
        //     this.setState({'menu': menu});
            
        // }        
        
        let categories = JSON.parse(localStorage.getItem('category'));
        
        if(categories !== undefined && categories !== null){
            
            let menu =  categories.map((category, index) =>
                (this.validateSubMenu(category._id) === true) ?
                    <li className="dropdown" key={index}>
                        <a href={category.labelUrl}>{category.description}</a>
                        <ul className="dropdown-menu">
                            <li>
                                <a href={category.labelUrl}>{"Todos em " + category.description}</a>
                            </li>
                            {this.buildSubMenu(category._id)}
                        </ul>
                    </li>
                : ''          
            ); 
            this.setState({'menu': menu});
            
        }        
    };

    validateSubMenu = (idCategory) => {

        let subCategories = JSON.parse(localStorage.getItem('subCategory'));
        if(subCategories !== undefined && subCategories !== null){
            
            var ret = false
            subCategories.map((sub, index) =>
                sub.grid._id === idCategory ?  
                ret = true : ret
            );
            return ret;
        }

    };

    buildSubMenu = (idCategory) => {
        
        let arraySub = [];
        let subCategories = JSON.parse(localStorage.getItem('subCategory'));
        subCategories.map((sub, index) =>                    
                sub.grid._id === idCategory ? 
                arraySub.push(sub)
               : 0            
        );
        
        // let subMenu = arraySub.map((sub, index) =>                    
        //     <Link to={'/course/'+sub.grid.labelUrl+'/'+sub.labelUrl} className={"link-routes"}>
        //         <MenuItem 
        //             key={index}
        //             value = {sub.description}
        //             primaryText = {sub.description}
        //             open={false}
        //             //onTouchTap={() => {console.log('/course/'+sub.grid.labelUrl+'/'+sub.labelUrl)}}
        //             onTouchTap={() => {PubSub.publish('idCat', sub.grid._id)}}
        //         />    
        //     </Link>
              
        // );
        let subMenu = arraySub.map((sub, index) =>                               
            <li key={index}>
                <a href={'/courses/'+sub.grid.labelUrl+'/'+sub.labelUrl}>{sub.description}</a>
            </li>              
        );
        
        return subMenu;
       

    };

    groupButton = () => {
      return (  
            <div >
                <RaisedButton 
                    label="Fazer Login"
                    primary={true}
                    style={{marginRight: '10px', marginTop: '15px'}}
                />
                <RaisedButton
                    label="Cadastre-se"
                    secondary={true}
                    onClick={()=>this.showModal('showModalSignIn')}
                 />
            </div>
            )
    };
    groupMenu = () => {
        return (  
            <div className="row">
                <div style={this.style.marginNav}>
                    <FlatButton label="COURSES"
                        style={{color: "#fff"}}
                    />    
                </div>      
                <div className="dropdown">
                    <FlatButton 
                        label="Categorias"
                        style={{color: "#fff"}}
                        icon={<ActionDashboard/>}
                        className="btn btn-default dropdown-toggle" 
                        type="button" 
                        data-toggle="dropdown" 
                        data-hover="dropdown"
                    />
                    <ul className="dropdown-menu">
                        {this.state.menu}
                    </ul>
                </div>
            </div>
        )
      };

    showModal = (type)=>{
        let modal = {[type]:true};
        this.setState(modal);
    };
    render(){
        return(
            <div>
                <AppBar 
                    iconElementLeft={this.groupMenu()}
                    iconElementRight={this.groupButton()}
                    titleStyle={{display: 'none'}}
                    style={{position: 'fixed'}}
                />   
                {(this.state.showModalSignIn) ? <SignIn/> : null}    
            </div>
        );
    }
}

export default HeaderBar;