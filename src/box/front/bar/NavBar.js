import './../../../static/css/index.css';
import React, { Component } from 'react';
import PubSub from 'pubsub-js'
import history from  './../../../service/router/history'

import { connect } from 'react-redux';

//import mateiral-ui
import FlatButton from 'material-ui/FlatButton';
import Avatar from 'material-ui/Avatar';
import AutoComplete from 'material-ui/AutoComplete';
import Dialog from 'material-ui/Dialog';
import Badge from 'material-ui/Badge';
import IconButton from 'material-ui/IconButton';


//Incones
import ActionDashboard from 'material-ui/svg-icons/action/dashboard';
import Search from 'material-ui/svg-icons/action/search';
import ExitToApp from 'material-ui/svg-icons/action/exit-to-app';
import ViewCompact from 'material-ui/svg-icons/image/view-compact'
import ShoppingCart from 'material-ui/svg-icons/maps/local-grocery-store';

//import modals
import SignIn from '../student/account/SignIn';
import Login  from '../student/account/Login';

class NavBar extends Component {

    constructor(){
        super();
        this.state = {
            category: JSON.parse(localStorage.getItem('category')),
            subCategory: JSON.parse(localStorage.getItem('subCategory')),
            student: JSON.parse(localStorage.getItem('student')),
            courses: JSON.parse(localStorage.getItem('course')),
            menu:null,
            menuCurso:false,
            open: false,            
            display: 'none',
            showModalSignIn: false,
            showModalLogin:false, 
            path: 'http://localhost:8080/api/',
            openSearch: false,
            openDialog: false,
            searchData: [],
            textSearh: '',
            
        }
        this.buildCourseMenu();
    }

    componentDidMount(){
        PubSub.subscribe('close-home-model', this.closeAll);
        PubSub.subscribe('logged', this.loadStudent);
        this.buildCourseMenu();
        this.buildSearch();
    }

    buildSearch = () => {
        var searchData = [];
        if(this.state.courses !== null){
            searchData = this.state.courses.map((row, i) => (
                row.name
            ))
        }
        this.setState({'searchData': searchData})
    }
    handleToggle = () => this.setState({openSearch: !this.state.openSearch});

    handleClose = () => this.setState({openSearch: false});

    handleUpdateInput = (searchText) => {
        this.setState({
          searchText: searchText,
        });
    };

    handleNewRequest = () => {
        console.log(this.state.searchText);
        var searchNew = '';
        var searchSplit = this.state.searchText.split(" ");
        searchSplit.map((row) => (
            searchNew += row
        ));
        this.handleClose();
        window.location.reload();
        history.push('/search/'+searchNew);
    };

    loadStudent = () =>
    {
        this.setState({'student': JSON.parse(localStorage.getItem('student'))});
    };

    buildCourseMenu = () =>{
        let categories = JSON.parse(localStorage.getItem('category'));
        // while(JSON.parse(localStorage.getItem('category')) === null){
        //     CacheData.getCategory();
        // }
        
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
        this.setState({'showModalSignIn':false,
        'showModalLogin':false});
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
    
    notLogged = () => (
        <div>
            <button 
                type="button" 
                className="btn btn-outline-secondary"
                onClick={ () => this.showModal('showModalLogin')} 
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
    )
    logged = () => (
        <ul className="navbar-nav mr-auto">
            <li className="nav-item dropdown">
                <FlatButton
                    labelPosition="before"
                    style={{color:"#000"}}
                    label={'Olá, ' + this.state.student.name}
                    icon={<Avatar 
                            src={   
                                this.state.student.source === 'site' ?
                                this.state.path + '' + this.state.student.imagePath:
                                this.state.student.imagePath
                            } 
                            size={35}/>}
                />
                <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                    <li>                      
                        <FlatButton
                            className="dropdown-item text-left"
                            label="Painel"
                            labelPosition="after"
                            icon={<ViewCompact />}
                            onClick={()=> {history.push('/student/profile');}}
                            fullWidth={true}
                        />   
                    </li> 
                    <li>  
                        <FlatButton
                            className="dropdown-item text-left"
                            label="Sair"
                            labelPosition="after"
                            icon={<ExitToApp />}
                            onTouchTap={() => this.logoff()}
                            fullWidth={true}
                            
                        />                    
                    </li> 
                </ul>
            </li>
        </ul>
    )

    logoff = () =>
    {
        localStorage.removeItem('student');
        this.setState({'student': null});
        window.location.replace("/");
    };
    handleOpen = () => {
        this.setState({openDialog: true});
    };
    
    handleClose = () => {
        this.setState({openDialog: false});
    };

    render(){
        const actions = [
            <FlatButton
              label="Sair"
              primary={true}
              onClick={this.handleClose}
            />
        ];
        return(
            <div >
                <nav 
                    className="navbar navbar-expand-md navbar-light bg-light btco-hover-menu fixed-top"
                    style={{boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'}}
                >
                    <a className="navbar-brand" href="/" style={{marginLeft: '5%'}} >
                        <img src="/img/eodontodigital.jpg" alt="E Odonto Digital"
                            style={{width: '40px'}}
                        />
                    </a>
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
                            <FlatButton
                                labelPosition="before"
                                style={{color:"#000"}}
                                label={'Buscar '}
                                icon={<Search />}
                                onClick={this.handleOpen}
                            />
                            <Badge
                                badgeContent={this.props.shoppingCart}
                                primary={true}
                                badgeStyle={{top: 20, right: 20}}
                            >
                                <IconButton
                                    tooltip="IR PARA O CARRINHO"
                                    onClick={() =>  history.push('/shopping-cart')}
                                >
                                    <ShoppingCart />
                                </IconButton>
                            </Badge>
                            {
                                (this.state.student === null) ?
                                    (this.notLogged()) : 
                                    (this.logged())
                            }
                        </form>
                    </div>
                </nav>                                
                {/*show do modal para cadastro de aluno*/}
                {(this.state.showModalSignIn) ? <SignIn /> : null}
                {(this.state.showModalLogin)  ? <Login />  : null}
               

                <Dialog
                    title="O QUE PODEMOS LHE AJUDAR"
                    actions={actions}
                    modal={false}
                    open={this.state.openDialog}
                    onRequestClose={this.handleClose}
                    className='text-center'
                    style={{height: '80%'}}
                >
                    <AutoComplete
                        hintText="Digite o que procura"
                        searchText={this.state.searchText}
                        dataSource={this.state.searchData}
                        onUpdateInput={this.handleUpdateInput}
                        onNewRequest={this.handleNewRequest}
                        filter={AutoComplete.caseInsensitiveFilter}
                        floatingLabelText="Digite aqui !!"
                        fullWidth={true}
                        style={{width: '90%'}}                       

                    />
                </Dialog>
            </div>
        )
    }
}


const mapStateToProps = state => ({
    shoppingCart: state.shoppingCart.value
})

export default connect(mapStateToProps)(NavBar);
