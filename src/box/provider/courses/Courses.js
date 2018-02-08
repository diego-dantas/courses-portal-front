import React, { Component } from 'react';


import HeaderBar from '../dash/HeaderBar';
import NavigationBar from '../dash/NavegationBar';
import {Tabs, Tab} from 'material-ui/Tabs';
import SwipeableViews from 'react-swipeable-views'

import PubSub from 'pubsub-js';


import Category from '../customization/Category';
import SubCategory from '../customization/SubCategory';

class Courses extends Component {

    constructor(props){
        super(props);
        this.state = {
            slideIndex: 0
        }
    }
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
            paddingLeft: "150px",
            paddingRight: "10px",
            marginLeft: "100px",
            marginRight: "10px"
        }
    };

    componentDidMount()
    {
        PubSub.publish('header-label',"Cursos");
    }

    handleChange = (value) => this.setState({slideIndex: value});

    render(){
        return(
            <div>
                <HeaderBar />
                <NavigationBar />

                <br/>
                <br/>
                <div style={this.styles.paddingAbout}>
                    <Tabs
                        inkBarStyle={this.styles.tabs}
                        onChange={this.handleChange}
                        value={this.state.slideIndex} >
                        <Tab style={this.styles.tab} label="Cursos" value={0} />
                    </Tabs>
                    <SwipeableViews
                        index={this.state.slideIndex}
                        onChangeIndex={this.handleChange} >
                        <Category />
                    </SwipeableViews>
                </div>
            </div>
        );
    }
}

export default Courses;