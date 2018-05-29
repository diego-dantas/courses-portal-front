import React, { Component } from 'react';
import './../../../static/css/index.css'


export default class VideoSection extends Component {
    render(){
        return(
            <div className="background-video-section">
                <div className="embed-responsive embed-responsive-21by9 float-right" style={{width: '400px', height: '200px', marginRight: '5%', marginTop: '50px'}}>
                    <iframe className="embed-responsive-item" src="https://www.youtube.com/embed/nOW0uAWPqM4" title="Vídeo"></iframe>
                </div>
            </div>
        )
    }
}