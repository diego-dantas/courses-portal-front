import React, { Component } from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import SwipeableViews from 'react-swipeable-views'

import PubSub from 'pubsub-js';

import HeaderBar from '../dash/HeaderBar';
import NavigationBar from '../dash/NavegationBar';
import SubCategory from '../customization/SubCategory';
import Descriptive from '../customization/Descriptive';
import Category from '../customization/Category';

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
        console.log("to aqui e tenho o provider " + this.state.provider.email);
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
            paddingLeft: "150px",
            paddingRight: "10px",
            marginLeft: "100px",
            marginRight: "10px"
        }
    };

    render(){
        return (
            <div >
                <HeaderBar />
                <NavigationBar />

                <br/>
                <br/>
                <div style={this.styles.paddingAbout}>
                    <Tabs
                        inkBarStyle={this.styles.tabs}
                        onChange={this.handleChange}
                        value={this.state.slideIndex} >
                        <Tab style={this.styles.tab} label="Categorias" value={0} />
                        <Tab style={this.styles.tab} label="Sub Categorias" value={1} />
                        <Tab style={this.styles.tab} label="Descritivos" value={2} />
                        <Tab style={this.styles.tab} label="Home face" value={3} />
                    </Tabs>
                    <SwipeableViews
                    index={this.state.slideIndex}
                    onChangeIndex={this.handleChange} >
                    <Category />
                    <SubCategory />
                    <Descriptive />
                </SwipeableViews>
                </div>
            </div>
        );
    }
}

export default Customization;