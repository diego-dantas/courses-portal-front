//import of react
import React, { Component } from 'react';

//import of component
import NavBar from './box/front/bar/NavBar';
import CarouselHome from './box/front/home/CarouselHome';
import VideoSection from './box/front/home/VideoSection';
import Footer from './box/front/bar/Footer';
import ScrollCourses from './box/front/course/component/ScrollCourses';
//import of css



import HttpService from '../src/service/http/HttpService';


class App extends Component {
    
    

    componentDidMount(){
        this.getCategory();
        this.getSubCategory();
        this.getCoursePlan();
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

    getCoursePlan = () =>{
        HttpService.make().get('/getCoursesPlans')
                   .then(success => {
                        localStorage.setItem('coursePlan', JSON.stringify(success.data));
                   })
                   .catch(error => {
                       console.log('Erro ao carregar os dados');
                   })
    }

    render(){
        return(
            <div>
                <NavBar />
                <CarouselHome />
                <ScrollCourses home={1}/>
                <ScrollCourses home={2}/>
                <ScrollCourses home={3}/>
                <VideoSection />
                <Footer/>
            </div>
        );
    } 
}



  
export default App;

