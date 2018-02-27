//import of react
import React, { Component } from 'react';

//import mateiral-ui
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import AutoComplete from 'material-ui/AutoComplete';

//componentes do menu
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';


//Incones
import ArrowDropRight from 'material-ui/svg-icons/navigation-arrow-drop-right';
import ActionDashboard from 'material-ui/svg-icons/action/dashboard';
import ActionSearch from 'material-ui/svg-icons/action/search';

import {Grid, Row} from 'react-bootstrap';




class HeaderBar extends Component {

    constructor(){
        super();
        this.state = {
            category: JSON.parse(localStorage.getItem('category')),
            subCategory: JSON.parse(localStorage.getItem('subCategory')),
            menu:[],
            menuCurso:false,
            open: false,
            dataSource: [],
        }
    }
    componentDidMount(){
        this.buildCourseMenu();
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
                <MenuItem 
                    rightIcon={<ArrowDropRight />}
                    value = {category.description}
                    primaryText = {category.description}
                    menuItems={(this.validateSubMenu(category._id) === true) ? 
                       
                        this.buildSubMenu(category._id): null}
                    //onClick={() => alert('item')}
                    //onMouseOver = {() => alert('vamos brincar')}
                />             
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
               : null            
        );
        
        let subMenu = arraySub.map((sub, index) =>                    
            <MenuItem 
                value = {sub.description}
                primaryText = {sub.description}
            />       
        );
        
        return subMenu;
       

    };

    groupButton = () => {
      return (  
            <div style={this.style.marginNav}>
                <FlatButton 
                    style={{color: "#fff", marginRight: '10px'}}
                    icon={<ActionSearch/>}
                />
                <RaisedButton 
                    label="Fazer Login"
                    primary={true}
                    style={{marginRight: '10px'}}
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
      //implementação no front end 
    grupSearch = () => {
        return (
        <div>
            <AutoComplete
                hintText="Type anything"
                dataSource={this.state.dataSource}
                onUpdateInput={this.handleUpdateInput}
                floatingLabelText="Full width"
                fullWidth={true}
                style={this.style.search}
            />
        </div>
        )
    };
    render(){
        return(
            <div>
                <AppBar 
                    icon={this.groupMenu()}
                    iconElementLeft={this.groupMenu()}
                    iconElementRight={this.groupButton()}
                />
                <Grid>
                    <Row>
                        <AutoComplete
                            hintText="Type anything"
                            dataSource={this.state.dataSource}
                            onUpdateInput={this.handleUpdateInput}
                            floatingLabelText="Full width"
                            fullWidth={true}
                            visible={false}
                        />
                    </Row>                            
                    
                </Grid>   
                
            </div>
        );
    }
}

export default HeaderBar;