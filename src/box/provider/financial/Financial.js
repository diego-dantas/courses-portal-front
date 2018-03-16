import React, { Component } from 'react';

import NavigationBar from '../dash/NavegationBar';
import TabsFinancial from '../financial/TabsFinancial';
class Financial extends Component {
    render(){
        return(
            <div>
                <NavigationBar />
                <TabsFinancial/>
            </div>
        );
    }
}

export default Financial;