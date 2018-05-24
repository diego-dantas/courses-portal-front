import React, { Component } from 'react';
import PubSub from 'pubsub-js'

//import mateiral-ui
import FlatButton from 'material-ui/FlatButton';

//Incones
import ActionDashboard from 'material-ui/svg-icons/action/dashboard';


import SignIn from '../student/account/SignIn';
class NavBar extends Component {

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
        this.buildCourseMenu();
        PubSub.subscribe('close-home-model', this.closeAll);
    }

    buildCourseMenu = () =>{
        let categories = JSON.parse(localStorage.getItem('category'));
        if(categories !== undefined && categories !== null){
            
            let menu =  categories.map((category, index) =>
                (this.validateSubMenu(category._id) === true) ?
                    <li key={index}>
                        <a className="dropdown-item dropdown-toggle" href={category.labelUrl}>{category.description}</a>
                        <ul className="dropdown-menu">
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

        let subMenu = arraySub.map((sub, index) =>  
            <li key={index}>                      
                <a className="dropdown-item" href={'/courses/'+sub.grid.labelUrl+'/'+sub.labelUrl}>{sub.description}</a>
            </li>              
        );
    
        return subMenu;
    };

    showModal = (type)=>{
        console.log(type);
        let modal = {[type]:true};
        this.setState(modal);
    };

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

    render(){
        return(
            <div >
                <nav 
                    className="navbar navbar-expand-md navbar-light bg-light btco-hover-menu fixed-top"
                    style={{boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'}}
                >
                    <a className="navbar-brand" href="/">E Odonto Digital</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavDropdown">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item dropdown">
                                <FlatButton 
                                    label="Categorias"
                                    style={{color: "#000"}}
                                    icon={<ActionDashboard/>}
                                    className="nav-link dropdown-toggle" 
                                    id="navbarDropdownMenuLink" 
                                    data-toggle="dropdown" 
                                    aria-haspopup="true" 
                                    aria-expanded="false"
                                />
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                    {this.state.menu}
                                </ul>
                            </li>
                        </ul>
                        <form className="form-inline my-2 my-lg-0">
                            <div className="input-group mr-md-3">
                                <input type="text" className="form-control" placeholder="Seach..." aria-label="Recipient's username" aria-describedby="basic-addon2" />
                                <div className="input-group-append">
                                    <button className="btn btn-outline-secondary" type="button">
                                        Buscar..
                                    </button>
                                </div>
                            </div>
                            <div className=" my-3 my-lg-3">
                                <button 
                                    type="button" 
                                    className="btn btn-outline-secondary" 
                                >
                                    Fazer Login
                                </button>
                                <button 
                                    type="button" 
                                    className="btn btn-outline-primary"
                                    onClick={ () => this.showModal('showModalSignIn')}
                                    style={{marginLeft: '10px', marginRight: '10px'}}
                                >
                                    Cadastre-se
                                </button>
                            </div>
                        </form>
                    </div>
                </nav>           

                {/*show do modal para cadastro de aluno*/}
                {(this.state.showModalSignIn) ? <SignIn/> : null}
            </div>
        )
    }
}

export default NavBar;