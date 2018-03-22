import React, { Component } from 'react';

import SendEmail from './component/SendEmail';
import ConfigEmail from './component/ConfigEmail';
import TesteCompo from './component/testeCompo';

class Email extends Component {

    render(){
        return(
            <div>
                <SendEmail />
                <ConfigEmail />
                {/* <TesteCompo /> */}
            </div>
        )
    }
}

export default Email;