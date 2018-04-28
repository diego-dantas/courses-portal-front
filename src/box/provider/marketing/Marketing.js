import React, { Component } from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import SwipeableViews from 'react-swipeable-views'

import PubSub from 'pubsub-js';

import Promotions from '../marketing/Promotions';
import Email from '../marketing/Email';
import Newsletter from '../marketing/Newsletter';

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
                <br/>
                <div style={this.styles.paddingAbout}>
                    <Tabs
                        inkBarStyle={this.styles.tabs}
                        onChange={this.handleChange}
                        value={this.state.slideIndex} >
                        <Tab style={this.styles.tab} label="Promoções" value={0} />
                        <Tab style={this.styles.tab} label="E-mail" value={1} />
                        <Tab style={this.styles.tab} label="Newsletter" value={2} />
                    </Tabs>
                    <SwipeableViews
                        index={this.state.slideIndex}
                        onChangeIndex={this.handleChange} >                    
                        <Promotions />
                        <Email />
                        <Newsletter/>
                    </SwipeableViews>
                </div>
            </div>
        );
    }
}

export default Marketing;