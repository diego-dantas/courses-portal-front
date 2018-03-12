import React, { Component } from 'react';


import HeaderBar from '../dash/HeaderBar';
import NavigationBar from '../dash/NavegationBar';
import {Tabs, Tab} from 'material-ui/Tabs';
import SwipeableViews from 'react-swipeable-views'

import PubSub from 'pubsub-js';


import Courses from '../courses/Courses';
import Steps from '../courses/Steps';
import Material from '../courses/Material';

class TabsCourses extends Component {

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
            paddingLeft: "20px",
            paddingRight: "20px",
            marginLeft: "20px",
            marginRight: "20px"
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
                <NavigationBar />
                <br/>
                <div style={this.styles.paddingAbout}>
                    <Tabs
                        inkBarStyle={this.styles.tabs}
                        onChange={this.handleChange}
                        value={this.state.slideIndex} >
                        <Tab style={this.styles.tab} label="Cursos" value={0} />
                        <Tab style={this.styles.tab} label="Steps" value={1} />
                        <Tab style={this.styles.tab} label="Material" value={2} />
                    </Tabs>
                    <SwipeableViews
                        index={this.state.slideIndex}
                        onChangeIndex={this.handleChange} >
                        <Courses />
                        <Steps />
                        <Material />
                    </SwipeableViews>
                </div>
            </div>
        );
    }
}

export default TabsCourses;