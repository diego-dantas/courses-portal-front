import React, { Component } from 'react';
import HttpService from './../../../service/http/HttpService';


class CarouselHome extends Component {


    constructor(props){
        super(props);
        this.state = {
            imgs: [],
            imgsSlide: []
        }

    }

    componentDidMount(){
        this.getImages();
    }

    getImages = () => {
        HttpService.make().get('/getImgCarousel')
                          .then(success => {
                              this.setState({imgs: success});
                              this.buildCarousel();
                              console.log(this.state.imgs);
                          })
                          .catch(error => {
                              console.log(error);
                          })
    }

    buildCarousel = () => {

        let imgs = [];
        let imgsSlide = [];
        if(this.state.imgs !== null) {
            imgsSlide = this.state.imgs.map((row, i) =>(
                i === 0 ? 
                    <li data-target="#carouselExampleIndicators" data-slide-to={i} className="active"></li>
                : 
                    <li data-target="#carouselExampleIndicators" data-slide-to={i}></li>
            ));

            imgs = this.state.imgs.map((row, i) =>(
                    i === 0 ? 
                        <div className="carousel-item active" key={i}>
                            <img 
                                className="d-block w-100" 
                                src={'http://localhost:8080/api/getFile?name=carousel/' + row} 
                                alt={row} 
                                style={{width: '100%', height: '500px'}}
                            />
                        </div>
                    : 
                        <div className="carousel-item" key={i}>
                            <img 
                                className="d-block w-100" 
                                src={'http://localhost:8080/api/getFile?name=carousel/' + row} 
                                alt={row} 
                                style={{width: '100%', height: '500px'}}
                            />
                        </div>
                ));
        }
        this.setState({'imgsSlide': imgsSlide});
        this.setState({'imgs'     : imgs});
    }

    
    render(){
        return(
            <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
                <ol className="carousel-indicators">
                   {this.state.imgsSlide}
                </ol>
                <div className="carousel-inner">
                    {this.state.imgs}
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