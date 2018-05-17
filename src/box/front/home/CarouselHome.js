import React, { Component } from 'react';
import HttpService from './../../../service/http/HttpService';

import { Carousel } from 'react-bootstrap';


class CarouselHome extends Component {


    constructor(props){
        super(props);
        this.state = {
            imgs: [],
        }

    }

    componentDidMount(){
        this.getImages();
    }

    getImages = () => {
        HttpService.make().get('/getImgCarousel')
                          .then(success => {
                              this.setState({imgs: success});
                          })
                          .catch(error => {
                              console.log(error);
                          })
    }

    
    render(){
        return(
            <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
                <ol className="carousel-indicators">
                    <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
                    <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                    <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                </ol>
                <div className="carousel-inner">
                {
                            this.state.imgs !== null ?
                                this.state.imgs.map((row, i) => (
                                    <div className="carousel-item active" key={i}>
                                        <img 
                                            alt={row}
                                            src={'http://localhost:8080/api/getFile?name=carousel/'+row} 
                                            style={{width: '100%', height: '450px'}}
                                        />
                                    </div>                                
                            )): ''
                        }
                </div>
                <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="sr-only">Previous</span>
                </a>
                <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="sr-only">Next</span>
                </a>
            </div>

        );
    }
}

export default CarouselHome;