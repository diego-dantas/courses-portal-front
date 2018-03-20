import React, {Component} from "react";


import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import SendIco from 'material-ui/svg-icons/content/send';


class SendEmail extends Component {

    render(){
        return(
            <div>
                    <RaisedButton
                         label={'Enviar email'}
                         backgroundColor={'#0ac752'}
                         icon={<SendIco color='#FFF'/>}
                         //onTouchTap={() => this.fncHandleOpen()}
                         style={{width:'79%', float:'left', marginTop: '20px'}}
                         labelStyle={{color: 'white'}}
                     />
            </div>
        )
    }
}

export default SendEmail;