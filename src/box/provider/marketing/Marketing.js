import React, { Component } from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import SwipeableViews from 'react-swipeable-views'

import PubSub from 'pubsub-js';

import HeaderBar from '../dash/HeaderBar';
import NavigationBar from '../dash/NavegationBar';

import Promotions from '../marketing/Promotions';

class Marketing extends Component {

    constructor(props) {
        super(props);
        this.state = {
            slideIndex: 0,
            provider: JSON.parse(localStorage.getItem('provider'))
        };
        
        
    }
    componentDidMount()
    {
        PubSub.publish('header-label',"Marketing");
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
            paddingLeft: "20px",
            paddingRight: "20px",
            marginLeft: "20px",
            marginRight: "20px"
        }
    };

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
                        <Tab style={this.styles.tab} label="Promoções" value={0} />
                    </Tabs>
                    <SwipeableViews
                        index={this.state.slideIndex}
                        onChangeIndex={this.handleChange} >                    
                        <Promotions />
                    </SwipeableViews>
                </div>
            </div>
        );
    }
}

export default Marketing;