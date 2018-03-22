import React, { Component } from 'react';

import SendEmail from './component/SendEmail';
import ConfigEmail from './component/ConfigEmail';

class Email extends Component {

    render(){
        return(
            <div>
                <SendEmail />
                <ConfigEmail />
            </div>
        )
    }
}

export default Email;