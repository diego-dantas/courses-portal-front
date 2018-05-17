//import of react
import React, { Component } from 'react';

//import of component
import HeaderBar from './box/front/bar/HeaderBar';
import CarouselHome from './box/front/home/CarouselHome';
import NavBar from './box/front/bar/NavBar';

//import of css
import  './static/style/css/global.css';


import HttpService from '../src/service/http/HttpService';


class App extends Component {
    
    

    componentDidMount(){
        this.getCategory();
        this.getSubCategory();
    }

    getCategory = () =>{
        HttpService.make().get('/getGrid')
                   .then(success => {
                        localStorage.setItem('category', JSON.stringify(success.data));
                   })
                   .catch(error => {
                       console.log('Erro ao carregar as categorias que estão salvas no banco');
                   })
    }
    getSubCategory = () =>{
        HttpService.make().get('/getSubGrid')
                   .then(success => {
                        localStorage.setItem('subCategory', JSON.stringify(success.data));
                   })
                   .catch(error => {
                       console.log('Erro ao carregar as categorias que estão salvas no banco');
                   })
    }

    render(){
        return(
            <div>
                <NavBar />
                <CarouselHome />
            </div>
        );
    } 
}



  
export default App;

