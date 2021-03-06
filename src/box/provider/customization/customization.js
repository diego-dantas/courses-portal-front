import React, { Component } from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import SwipeableViews from 'react-swipeable-views'

import PubSub from 'pubsub-js';

import SubCategory from '../customization/SubCategory';
import Category from '../customization/Category';
import Descriptive from '../customization/Descriptive';
import Carousel from '../customization/Carousel';


class Customization extends Component {

    constructor(props) {
        super(props);
        this.state = {
            slideIndex: 0,
            provider: JSON.parse(localStorage.getItem('provider'))
        };
        
        
    }
    componentDidMount()
    {
        PubSub.publish('header-label',"Personalização");
    }

    handleChange = (value) => this.setState({slideIndex: value});

    styles = {
        headline: {
            fontSize: 24,
            paddingTop: 16,
            marginBottom: 12,
            fontWeight: 400,
        },
        slide: {
            padding: 10,
        },
        tabs:{
            backgroundColor:"rgb(0, 188, 212)",
            zIndex:2
        },
        tab:{
            backgroundColor:"#fff",
            color:"rgb(0, 188, 212)"
        },
        paddingAbout :{
            paddingLeft: "10px",
            paddingRight: "10px",
            marginLeft: "10px",
            marginRight: "10px"
        }
    };

    render(){
        return (
            <div >
                <br/>
                <div style={this.styles.paddingAbout}>
                    <Tabs
                        inkBarStyle={this.styles.tabs}
                        onChange={this.handleChange}
                        value={this.state.slideIndex} >
                        <Tab style={this.styles.tab} label="Categorias" value={0} />
                        <Tab style={this.styles.tab} label="Sub Categorias" value={1} />
                        <Tab style={this.styles.tab} label="Descritivos" value={2} />
                        <Tab style={this.styles.tab} label="Carrossel" value={3} />
                    </Tabs>
                    <SwipeableViews
                        index={this.state.slideIndex}
                        onChangeIndex={this.handleChange} >
                        <Category />
                        <SubCategory />
                        <Descriptive />
                        <Carousel />
                    </SwipeableViews>
                </div>
            </div>
        );
    }
}

export default Customization;