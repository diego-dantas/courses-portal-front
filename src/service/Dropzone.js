import React, {Component} from 'react';
import DropzoneComponent from 'react-dropzone-component';

import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import PubSub from 'pubsub-js';

import 'react-dropzone-component/styles/filepicker.css';
import 'dropzone/dist/min/dropzone.min.css';

import axios from 'axios';
import HttpService from '../service/http/HttpService';


class Dropzone extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
                file: '', 
                limitFile: props.limitFile,
                local: props.local,
                open: true,
                id: props.id
            };

        this.djsConfig =
            {
                addRemoveLinks: true,
                acceptedFiles: "image/jpeg, image/png, image/gif, application/pdf, text/plain",
                autoProcessQueue: false,
                previewTemplate: "<div class=\"dz-preview dz-file-preview\">\n  <div class=\"dz-image\"><img data-dz-thumbnail /></div>\n  <div class=\"dz-details\">\n    <div class=\"dz-size\"><span data-dz-size></span></div>\n    <div class=\"dz-filename\"><span data-dz-name></span></div>\n  </div>\n  <div class=\"dz-progress\"><span class=\"dz-upload\" data-dz-uploadprogress></span></div>\n  <div class=\"dz-error-message\"><span data-dz-errormessage></span></div>\n  <div class=\"dz-success-mark\">\n    <svg width=\"54px\" height=\"54px\" viewBox=\"0 0 54 54\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" xmlns:sketch=\"http://www.bohemiancoding.com/sketch/ns\">\n      <title>Check</title>\n      <defs></defs>\n      <g id=\"Page-1\" stroke=\"none\" stroke-width=\"1\" fill=\"none\" fill-rule=\"evenodd\" sketch:type=\"MSPage\">\n        <path d=\"M23.5,31.8431458 L17.5852419,25.9283877 C16.0248253,24.3679711 13.4910294,24.366835 11.9289322,25.9289322 C10.3700136,27.4878508 10.3665912,30.0234455 11.9283877,31.5852419 L20.4147581,40.0716123 C20.5133999,40.1702541 20.6159315,40.2626649 20.7218615,40.3488435 C22.2835669,41.8725651 24.794234,41.8626202 26.3461564,40.3106978 L43.3106978,23.3461564 C44.8771021,21.7797521 44.8758057,19.2483887 43.3137085,17.6862915 C41.7547899,16.1273729 39.2176035,16.1255422 37.6538436,17.6893022 L23.5,31.8431458 Z M27,53 C41.3594035,53 53,41.3594035 53,27 C53,12.6405965 41.3594035,1 27,1 C12.6405965,1 1,12.6405965 1,27 C1,41.3594035 12.6405965,53 27,53 Z\" id=\"Oval-2\" stroke-opacity=\"0.198794158\" stroke=\"#747474\" fill-opacity=\"0.816519475\" fill=\"#FFFFFF\" sketch:type=\"MSShapeGroup\"></path>\n      </g>\n    </svg>\n  </div>\n  <div class=\"dz-error-mark\">\n    <svg width=\"54px\" height=\"54px\" viewBox=\"0 0 54 54\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" xmlns:sketch=\"http://www.bohemiancoding.com/sketch/ns\">\n      <title>Check</title>\n      <defs></defs>\n      <g id=\"Page-1\" stroke=\"none\" stroke-width=\"1\" fill=\"none\" fill-rule=\"evenodd\" sketch:type=\"MSPage\">\n        <path d=\"M23.5,31.8431458 L17.5852419,25.9283877 C16.0248253,24.3679711 13.4910294,24.366835 11.9289322,25.9289322 C10.3700136,27.4878508 10.3665912,30.0234455 11.9283877,31.5852419 L20.4147581,40.0716123 C20.5133999,40.1702541 20.6159315,40.2626649 20.7218615,40.3488435 C22.2835669,41.8725651 24.794234,41.8626202 26.3461564,40.3106978 L43.3106978,23.3461564 C44.8771021,21.7797521 44.8758057,19.2483887 43.3137085,17.6862915 C41.7547899,16.1273729 39.2176035,16.1255422 37.6538436,17.6893022 L23.5,31.8431458 Z M27,53 C41.3594035,53 53,41.3594035 53,27 C53,12.6405965 41.3594035,1 27,1 C12.6405965,1 1,12.6405965 1,27 C1,41.3594035 12.6405965,53 27,53 Z\" id=\"Oval-2\" stroke-opacity=\"0.198794158\" stroke=\"#747474\" fill-opacity=\"0.816519475\" fill=\"#FFFFFF\" sketch:type=\"MSShapeGroup\"></path>\n      </g>\n    </svg>\n  </div>\n</div>"
            };

        this.componentConfig =
            {
                iconFiletypes: ['.jpg', '.png', '.gif', '.pdf', '.txt'],
                showFiletypeIcon: true,
                postUrl: 'http://localhost:8080/api/upload/'+this.state.local
            };

        this.dropzone = null;
    }

    componentDidMount()
    {
        PubSub.subscribe('dropzone-make-upload', this.handlePost);
        
    };

    limitFileService = () =>
    {
        if(this.state.limitFile === true)
        {
            if (this.dropzone.files[1] != null)
            {
                this.dropzone.removeFile(this.dropzone.files[0]);
            }
        }
    };

    cleanDrop = () =>
    {
        this.dropzone.removeAllFiles(true);
    };

    handleFileAdded = (file) =>
    {
        console.log(this.dropzone);
        this.limitFileService();
        this.setState({file: file});
    };

    returnWay = (way, id) => {
        return{
            wayImage: way,
            _id: id
        }
    }


    returnWayMaterial = (id) => {
        let urlUpdate = '/'+this.state.local;
        let way = '';
        let ways = [];
        for(var i = 0; i <  this.dropzone.files.length; i++){

            way = urlUpdate + '/' + this.dropzone.files[i].name
            ways.push({
                _id: "",
                imagePath: way,
                material: {
                    _id: id
                }
            })
        }
        console.log(ways);
        return ways;
    }

    handlePost = () =>
    {
        this.dropzone.processQueue();


        const fb = new FormData();
        for(var i = 0; i < this.dropzone.files.length; i++){
            console.log(this.dropzone.files[i]);
            fb.append('files', this.dropzone.files[i], this.dropzone.files[i].name) 
        }
        let url = 'http://localhost:8080/api/upload/'+this.state.local;
        axios.post(url, fb)
             .then(res => {
                
                if(this.state.local !== 'carousel'){
                    let urlUpdate = '/'+this.state.local;
                    let way = urlUpdate + '/' + this.dropzone.files[0].name;

                    if(this.state.local === 'material'){
                        
                        HttpService.make().post(urlUpdate, this.returnWayMaterial(this.state.id))
                                          .then(success =>{
                                              console.log('update with success Material');
                                              this.closeDialog();
                                          })
                                          .catch(error =>{
                                              console.log(error);
                                              alert('Erro ao atualizar a imagem')
                                          })   
                    
                        
                    }else{

                        HttpService.make().post(urlUpdate, this.returnWay(way, this.state.id))
                                          .then(success =>{
                                              console.log('update with success');
                                              this.closeDialog();
                                          })
                                          .catch(error =>{
                                              console.log(error);
                                              alert('Erro ao atualizar a imagem')
                                          })
                    }
                    
                }
                
             })
             .catch(error =>{
                 console.log(error)
             })
    };
    
    closeDialog = () => {
        this.setState({open: false});
        PubSub.publish('close-home-model', false);
    }
    render()
    {
        const config = this.componentConfig;
        const djsConfig = this.djsConfig;

        // For a list of all possible events (there are many), see README.md!
        const eventHandlers =
            {
                init: dz => this.dropzone = dz,
                addedfile: this.handleFileAdded,
            };

        return (
            <div>
                <Dialog
                    open={this.state.open}
                    actions={<FlatButton label='Sair' primary={true} onTouchTap={this.closeDialog} fullWidth={true}/>}
                    autoScrollBodyContent={true}
                >
                    <DropzoneComponent
                        config={config}
                        eventHandlers={eventHandlers}
                        djsConfig={djsConfig} />
                    <RaisedButton 
                        label="salvar arquivo"
                        onClick={this.handlePost}
                        fullWidth={true}
                        style={{marginTop: '20px'}}
                    />
                </Dialog>
            </div>
        );
    }
}

export default Dropzone;