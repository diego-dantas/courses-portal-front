import React, { Component } from 'react';

import {Tabs, Tab} from 'material-ui/Tabs';
import SwipeableViews from 'react-swipeable-views'

import PubSub from 'pubsub-js';

import Plan from '../financial/Plan';
import CoursesPlan from '../financial/CoursePlan';

class TabsFinancial extends Component {
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
        PubSub.publish('header-label',"Financeiro");
    }

    handleChange = (value) => this.setState({slideIndex: value});

    render(){
        return(
            <div>
                <br/>
                <div style={this.styles.paddingAbout}>
                    <Tabs
                        inkBarStyle={this.styles.tabs}
                        onChange={this.handleChange}
                        value={this.state.slideIndex} >
                        <Tab style={this.styles.tab} label="Plano" value={0} />
                        <Tab style={this.styles.tab} label="Curso / Plano" value={1} />
                    </Tabs>
                    <SwipeableViews
                        index={this.state.slideIndex}
                        onChangeIndex={this.handleChange} >
                        <Plan />
                        <CoursesPlan />
                    </SwipeableViews>
                </div>
            </div>
        );
    }
}

export default TabsFinancial;