import React, { Component } from 'react';
import PubSub from 'pubsub-js'
import axios from 'axios';
import NavBar from './../bar/NavBar';

//import material-ui
import RaisedButton from 'material-ui/RaisedButton';

//import modals
import SignIn from '../student/account/SignIn';
import Login  from '../student/account/Login';
export default class Checkout extends Component {
    
    constructor(props){
        super(props);
        this.state = { 
            itensShoppingCart: JSON.parse(localStorage.getItem('itemShoppingCart')),
            student:     JSON.parse(localStorage.getItem('student')),
            coursePlan:  JSON.parse(localStorage.getItem('coursePlan')),
            itemsList: [],
            totalItems: 0,
            showModalSignIn: false,
            showModalLogin:false, 
        }

        console.log(this.state.itensShoppingCart);
    }

    componentDidMount() {
        PubSub.subscribe('close-home-model', this.closeAll);
        PubSub.subscribe('logged', this.loadStudent);
    }
    closeAll = (key, value) =>{
        this.setState({'showModalSignIn':false,
        'showModalLogin':false});
    };
    showModal = (type)=>{
        console.log(type);
        let modal = {[type]:true};
        this.setState(modal);
    };
    
    checkout = () => {
        console.log('To aqui mano')
        axios.get('http://www.dmsmart.com.br/playmentpg.php')
            .then(res => {
                console.log(res);
                document.getElementById('code').valeu = res.data;
                document.getElementById("comprar").submit();

            })
            .catch(error => {
                console.log('Erro ao fazer o pagamento ' + error);
            })
    }
    render(){

        const loginSignIn = [
            <div className='container' key={0}>
                <hr/>
                <div className='row'>
                    <div className='col-md-5'>
                        <RaisedButton 
                            type="button" 
                            label='Fazer Login'
                            secondary={true}
                            onClick={ () => this.showModal('showModalLogin')} 
                            fullWidth={true}
                        />
                    </div>
                    <div className='col-md-2 text-center'>
                    OU
                    </div>
                    <div className='col-md-5'> 
                        <RaisedButton 
                            type="button" 
                            label='Cadastre-se'
                            primary={true}
                            onClick={ () => this.showModal('showModalSignIn')}
                            fullWidth={true}
                        />
                    </div>
                </div>
                <hr/>
            </div>
        ]

        const finalizar = [
            <div className='container' key={0}>
                <hr/>
                <div className='row'>
                    <div className='col-md-12'>
                        <RaisedButton 
                            type="button" 
                            label='Finalizar'
                            primary={true}
                            onClick={ () => this.checkout()}
                            fullWidth={true}
                        />
                    </div>
                </div>
                <hr/>
            </div>
        ]
        return(
            <div>
                <NavBar />
                <br/><br/><br/><br/><br/>

                    { this.state.student === null ? loginSignIn : finalizar }

                    {/*show do modal para cadastro de aluno*/}
                    {(this.state.showModalSignIn) ? <SignIn /> : null}
                    {(this.state.showModalLogin)  ? <Login />  : null}
                    <form id="comprar" action="https://sandbox.pagseguro.uol.com.br/checkout/v2/payment.html" method="post" onSubmit="PagSeguroLightbox(this); return false;">

                    <input type="hidden" name="code" id="code" value="" />

                    </form>
            </div>
        )
    }
}