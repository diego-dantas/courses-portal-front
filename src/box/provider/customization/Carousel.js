import React, { Component } from 'react';
import PubSub               from 'pubsub-js';
import Dropzone             from '../../../service/Dropzone';
import HttpService          from '../../../service/http/HttpService';

import RaisedButton         from 'material-ui/RaisedButton';
import FlatButton           from 'material-ui/FlatButton';

//icon
import NewIco from 'material-ui/svg-icons/content/add';


class Carousel extends Component {

    constructor(props){
        super(props);
        this.state = {
            nameImags: [],
            showDropzone: false,
        }

    }

    componentDidMount() {
        this.getNameImage();
        PubSub.subscribe('close-home-model', this.closeAll);
    }

    //Inicio do bloco de controle de imagem 
    showModal = (type)=>{
        let modal = {[type]:true};
        this.setState(modal);
    };

    closeAll = (key, value) =>{
        this.setState({'showDropzone':false});
        this.getNameImage();
    };

    openDialogImg = (id) => {
        //this.setState({idPlan: id});
        this.showModal('showDropzone')
    }

    closeDialogImg = () => {
        this.setState({openImg: false});
    }
    //Fim do bloco de controle da imagem
    

    getNameImage = () => {
        HttpService.make().get('/getImgCarousel')
                          .then(success => {
                              this.setState({nameImags: success});
                          })
                          .catch(error => {
                              console.log(error);
                          })
    }

    deleteFile = (row) => {
        
        let url = '/deleteFile?name=carousel/'+row;
        HttpService.make().get(url)
                          .then(res => {
                             this.getNameImage();
                          })
                          .catch(error => {
                             console.log(error);
                          })
    }

    render(){
        return(
            <div>
                 <RaisedButton
                    label="adicionar Imagem"
                    fullWidth={true}
                    backgroundColor="#0ac752"
                    icon={<NewIco color="#FFF"/>}
                    labelStyle={{color: 'white'}}
                    style={{float: 'right', marginTop:'20px'}}
                    onClick={this.openDialogImg}
                />
                {
                    this.state.showDropzone ?
                        <Dropzone 
                            limitFile={false}
                            local={'carousel'}
                        />: null
                }
                <br/><br/><br/><br/>
                <div className="container">
                    <div className="row">
                    {
                        this.state.nameImags !== null ?
                            this.state.nameImags.map((row, i) => (
                                <div key={i} className="col-md-4 col-sm-4">
                                    <img 
                                        alt={row}
                                        src={'http://localhost:8080/api/getFile?name=carousel/'+row} 
                                        style={{width: '100%', height: '100%', border: 'solid 2px', marginTop: '20px'}}
                                    />
                                    <FlatButton
                                        label={'Excluir'}
                                        primary={true}
                                        fullWidth={true}
                                        onTouchTap={() => this.deleteFile(row)}                
                                    />
                                </div>
                        )): ''
                    }
                    </div>
                </div>
            </div>
        )
    }
}

export default Carousel;