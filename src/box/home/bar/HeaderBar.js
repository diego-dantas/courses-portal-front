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
            
        }
        
    }
    componentDidMount(){
        this.buildCourseMenu();
        console.log('menu null ' + this.state.menu);
        // while(this.state.menu === null){
        //     console.log('menu null');
        // }
        
    }

   
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

        let categories = JSON.parse(localStorage.getItem('category'));
        
        if(categories !== undefined && categories !== null){
            
            let menu =  categories.map((category, index) =>
                (this.validateSubMenu(category._id) === true) ?
                    <MenuItem key={index}
                        rightIcon={<ArrowDropRight />}
                        value = {category.description}
                        primaryText = {category.description}
                        
                        menuItems={[
                            <MenuItem 
                                value = 'Teste'
                                primaryText = {category.description}
                            />,
                            this.buildSubMenu(category._id)
                            
                        ]}
                    />   
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
        
        let subMenu = arraySub.map((sub, index) =>                    
            <Link to={'/course/'+sub.grid.labelUrl+'/'+sub.labelUrl} className={"link-routes"}>
                <MenuItem 
                    key={index}
                    value = {sub.description}
                    primaryText = {sub.description}
                    open={false}
                    //onTouchTap={() => {console.log('/course/'+sub.grid.labelUrl+'/'+sub.labelUrl)}}
                    onTouchTap={() => {PubSub.publish('idCat', sub.grid._id)}}
                />    
            </Link>
              
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
                 />
            </div>
            )
    };
    groupMenu = () => {
        return (  
            <div style={this.style.marginNav}>
                
                <FlatButton label="COURSES"
                    style={{color: "#fff"}}
                />    
                <FlatButton label="Categorias"
                    onMouseEnter={this.handleClick}
                    onClick={this.handleClick}
                    style={{color: "#fff"}}
                    icon={<ActionDashboard/>}
                />
                <Popover
                    open={this.state.open}
                    anchorEl={this.state.anchorEl}
                    anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
                    targetOrigin={{horizontal: 'left', vertical: 'top'}}
                    onRequestClose={this.handleRequestClose}>
                    <Menu 
                        
                    > 
                        {this.state.menu}
                    </Menu>
                </Popover>
            </div>      
        )
      };

    render(){
        return(
            <div>
                <AppBar 
                    iconElementLeft={this.groupMenu()}
                    iconElementRight={this.groupButton()}
                    titleStyle={{display: 'none'}}
                />            
            </div>
        );
    }
}

export default HeaderBar;