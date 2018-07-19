import React, {Component} from 'react';

export default class Footer extends Component {
    render(){
        return(
            <div>
                <footer className="footer navbar-fixed-bottom navbar-expand-md navbar-primary bg-primary">
                    <div className="row text-white"
                        style={{paddingTop: '5%'}}
                    >
                        <div className="col-md-4">
                            <ul>
                                <li>Quem somos</li>
                                <li>Central de Atendimento</li>
                                <li>Reclame Aqui</li>
                            </ul>
                        </div>

                        <div className="col-md-4 text-center">
                            <label htmlFor="newsletter">Assine a nossa Newsletter</label>
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text" id="basic-addon1"><i className="fa fa-newspaper-o" aria-hidden="true"></i></span>
                                </div>
                                <input type="email" className="form-control" placeholder="Insira aqui seu e-mail" aria-label="newsletter" aria-describedby="newsletter" />
                                <div className="input-group-append">
                                    <button className="btn btn-secondary" type="button">Assinar</button>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-4 text-center">
                            <div className="row">
                                <div className="col-md-12">
                                    <i className="fa fa-facebook-square fa-3x" style={{margin: '2%'}}></i>
                                    <i className="fa fa-twitter-square fa-3x" style={{margin: '2%'}}></i>
                                    <i className="fa fa-instagram fa-3x" style={{margin: '2%'}}></i>
                                </div>                                
                            </div>
                        </div>                        
                    </div>
                </footer>
            </div>
        )
    }
}