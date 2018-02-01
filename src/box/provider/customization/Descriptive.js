import React, { Component } from 'react';


import RaisedButton from 'material-ui/RaisedButton';
import NewIco from 'material-ui/svg-icons/content/add';

class Descriptive extends Component {

    render(){
        return(
            <div>
                <RaisedButton
                    label="adicinar tópico"
                    backgroundColor="#0ac752"
                    icon={<NewIco color="#FFF"/>}
                    labelStyle={{color: 'white'}}
                    style={{float: 'right', marginTop:'20px'}}
                />
            </div>
        );
    }
}

export default Descriptive;