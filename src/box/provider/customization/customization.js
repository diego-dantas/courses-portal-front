import React, { Component } from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import SwipeableViews from 'react-swipeable-views'

import HeaderBar from '../dash/HeaderBar';
import NavigationBar from '../dash/NavegationBar';

class Customization extends Component {

    constructor(props) {
        super(props);
        this.state = {slideIndex: 0};
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
                        <Tab style={this.styles.tab} label="Descritivos" value={1} />
                        <Tab style={this.styles.tab} label="Home face" value={2} />
                    </Tabs>
                    <SwipeableViews
                    index={this.state.slideIndex}
                    onChangeIndex={this.handleChange} >


                </SwipeableViews>
                </div>
            </div>
        );
    }
}

export default Customization;