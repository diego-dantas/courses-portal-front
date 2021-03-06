import React, { Component } from 'react';
import Slider from "react-slick";
import HttpService from './../../../../service/http/HttpService';

import {Card, CardActions, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import Divider from 'material-ui/Divider';
import IconButton from 'material-ui/IconButton';
import ArrowLeft from 'material-ui/svg-icons/hardware/keyboard-arrow-left';
import ArrowRight from 'material-ui/svg-icons/hardware/keyboard-arrow-right';


import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

class ScrollCourses extends Component {

    constructor(props){
        super(props);
        
        this.state = {
            home: props.home,
            student:     JSON.parse(localStorage.getItem('student')),
            courses:     JSON.parse(localStorage.getItem('course')),
            coursePlan:  JSON.parse(localStorage.getItem('coursePlan')),
            listCourses: [],
            listVitrine: [],
        }
        this.next = this.next.bind(this);
        this.previous = this.previous.bind(this);
    }

    componentDidMount(){
        this.getCourses();   
        this.buildGrid();        
    }

    next() {
        this.slider.slickNext();
    }
    
    previous() {
        this.slider.slickPrev();
    }

    getCourses = () => {
        HttpService.make()
                   .get('/getCourses')
                   .then(success => {
                        localStorage.setItem('course', JSON.stringify(success.data));
                        this.setState({courses: JSON.parse(localStorage.getItem('course'))});   
                   })
                   .catch(error => {
                       console.log('Erro ao buscar os cursos');
                   })
    }

    getValuePlan = (idCourse, price) => {
        var value = price;
        this.state.coursePlan.map((row, i) => (
            row.plan._id === this.state.student.plan._id && row.course._id === idCourse ?
                value = row.price : ''
        ));
        return parseFloat(value).toFixed(2);
    }
    

    buildGrid = () => {
        
        var listCourses = [];
        var scrollView = [];
             
        
        if(this.state.courses !== null){
            for(var i = 0; i < this.state.courses.length; i++){
                if(this.state.home === this.state.courses[i].home){
                    listCourses.push(this.state.courses[i]);
                }
            }
        }

       

        console.log(listCourses)

        scrollView = listCourses.map((row, i) => (
            <div  key={i} >
                <Card id={this.state.subCateg+''+i} style={{width: '200px', height: '300px',  marginBottom: '1%', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'}}>
                    <a href={"/course/"+row.labelUrl+'/'+row._id}>
                        <CardMedia>
                            { 
                                <img 
                                    alt={row.name}
                                    src={'http://localhost:8080/api/getFile?name='+row.wayImage} 
                                    style={{width: '200px', height: '125px'}}/>
                            }
                        </CardMedia>
                        <CardTitle style={{paddingBottom: '0%'}} titleStyle={{fontSize: '15px', fontWeight: '250'}} title={row.name}/>
                        <CardText  style={{paddingBottom: '0%', width: '200px', height: '75px'}}>
                            {row.description}
                        </CardText>
                        <Divider />
                        <CardActions style={{textAlign:'right', width: '200px', height: '50px'}}>
                            <h4>R$: { 
                                        this.state.student === null ?
                                            parseFloat(row.price).toFixed(2) :
                                            this.getValuePlan(row._id, row.price)
                                    }
                            </h4>
                        </CardActions>
                    </a>
                </Card>
            </div>
        ))

        this.setState({'listCourses': scrollView});
    }


    render(){
        const settingsCard = { 
            dots: true,
            className: "center",
            infinite: false,
            speed: 500,
            slidesToShow:5,
            slidesToScroll: 5,
            initialSlide: 0,
            responsive: [
            {
                breakpoint: 1200,
                settings: {
                slidesToShow: 4,
                slidesToScroll: 4,
                infinite: true,
                dots: true
                }
            },
            {
                breakpoint: 992,
                settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                infinite: true,
                dots: true
                }
            },
            {
                breakpoint: 768,
                settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                slidesToShow: 1,
                slidesToScroll: 1
                }
            }
        ]
      };
      

        const scrollCard = [
            <div key={1}>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-md-8'>
                                <h2 className='title-box'>Cursos em Home ...</h2>
                            </div>
                            <div className='col-md-4'  style={{ textAlign: "center" }}> 
                                <IconButton onClick={this.previous}>
                                    <ArrowLeft />
                                </IconButton>
                                <IconButton onClick={this.next}>
                                    <ArrowRight />
                                </IconButton>
                            </div>
                        </div>
                         <Slider ref={c => (this.slider = c)} {...settingsCard}>
                            {this.state.listCourses}
                         </Slider>
                    </div>
                    <Divider style={{width: '90%',
                        marginLeft: '5%',
                        marginRight: '5%',
                        marginTop: '3%',
                        marginBottom: '3%',
                        backgroundColor: 'rgba(224, 224, 224, 0.5)'}}
                    />
                </div>
        ]

        return(
            <div>
                { scrollCard }
            </div>
        )
    }
}


export default ScrollCourses;