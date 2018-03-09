import React, { Component } from 'react';


import HeaderBar from '../dash/HeaderBar';
import NavigationBar from '../dash/NavegationBar';
import TabsFinancial from '../financial/TabsFinancial';
class Financial extends Component {
    render(){
        return(
            <div>
                <HeaderBar />
                <NavigationBar />
                <TabsFinancial/>
            </div>
        );
    }
}

export default Financial;