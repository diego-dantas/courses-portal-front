import React, { Component } from 'react';

import NavBar from './../bar/NavBar';
import Footer from './../bar/Footer';
import IconButton from 'material-ui/IconButton';
import RemoveShoopingCart from 'material-ui/svg-icons/action/remove-shopping-cart';
import RaisedButton from 'material-ui/RaisedButton';



import { rmvShoppingCart } from './../actions/shoppingCart/shoppingCartAction';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class ShoppingCart extends Component{
    constructor(props){
        super(props);
        this.state = { 
            itensShoppingCart: JSON.parse(localStorage.getItem('itemShoppingCart')),
            student:     JSON.parse(localStorage.getItem('student')),
            coursePlan:  JSON.parse(localStorage.getItem('coursePlan')),
            itemsList: [],
            totalItems: 0
        }

        console.log(this.state.itensShoppingCart);
    }

    componentDidMount() {
        this.buildItemsList();
    }

    getValuePlan = (idCourse, price) => {
        var value = price;
        this.state.coursePlan.map((row, i) => (
            row.plan._id === this.state.student.plan._id && row.course._id === idCourse ?
                value = row.price : ''
        ));
        return parseFloat(value);
    }

    buildTotalItems = () => {
        var totalItems = 0;
        this.state.itensShoppingCart.map((row, i) =>(
            this.state.student === null ?
                totalItems = totalItems + parseFloat(row.price) :
                totalItems = totalItems + this.getValuePlan(row._id, row.price)
        ))
        this.setState({'totalItems': totalItems.toFixed(2)});
    }

    buildItemsList = () => {
        let itemsList = [];

        itemsList = this.state.itensShoppingCart.map((row, i) =>(
                        <tr key={i}>
                            <th scope="row" width="150px" height="100px">
                                <img 
                                    alt={row.name}
                                    src={'http://localhost:8080/api/getFile?name='+row.wayImage} 
                                    style={{width: '100%', height: '100%'}}/>
                            </th>
                            <td>
                                <p>{row.name}</p>
                                <p>{row.description}</p>
                            </td>
                            <td className="text-center">
                                <p style={{marginTop: '15%'}}>
                                    R$: {
                                            this.state.student === null ?
                                                parseFloat(row.price).toFixed(2) :
                                                this.getValuePlan(row._id, row.price).toFixed(2)
                                        }
                                </p>
                            </td>
                            <td className="text-center">
                                <IconButton 
                                    tooltip="Remover do Carrinho"
                                    tooltipPosition="top-center"
                                    style={{marginTop: '15%'}}
                                    onClick={() => this.props.rmvShoppingCart(row)}
                                >
                                    <RemoveShoopingCart />
                                </IconButton>
                            </td>
                        </tr> 
        ));

        this.setState({'itemsList': itemsList});
        this.buildTotalItems();
    }

    render(){
        return(
            <div>
                <NavBar />
                <br/><br/><br/><br/><br/>

                <div className="container">
                    <h5 className="text-center">Carrinho</h5>
                    <div className="row">
                        <div className="col-md-9" style={{marginTop: '10px'}}>
                            <table className="table table-bordered">
                                <thead className="text-center">
                                    <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Descrição</th>
                                    <th scope="col">Valor</th>
                                    <th scope="col">Remover</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    { this.state.itemsList }
                                </tbody>
                            </table>
                        </div> 
                        <div className="col-md-3" style={{marginTop: '10px'}}>
                            <h4>
                                Total R$: { this.state.totalItems }
                            </h4>
                            <RaisedButton label="Finalizar Compra" primary={true} fullWidth={true} />

                        </div>
                    </div>
                </div>

                <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
                <Footer />
            </div>
        )
    }
}


const mapStateToProps = store => ({
    store
})


const mapDispatchToProps = dispatch => bindActionCreators({ rmvShoppingCart }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingCart);