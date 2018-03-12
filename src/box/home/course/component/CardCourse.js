import React, { Component } from 'react';
import {Card, CardActions, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import Divider from 'material-ui/Divider';
import IconButton from 'material-ui/IconButton';
import ArrowLeft from 'material-ui/svg-icons/hardware/keyboard-arrow-left';
import ArrowRight from 'material-ui/svg-icons/hardware/keyboard-arrow-right';

class CardCourse extends Component {

    
    render(){
        return(
            <div>
                
                <div key={1}>
                    <h2 className='title-box'>Cursos em {'Java'} ...</h2>
                    <div className='component-category'>
                        <IconButton
                            style={{background: 'transparent', width: 64, height: 64, padding: 8, float: 'left'}}
                            iconStyle={{width: 48, height: 48}}
                            tooltip='Voltar'
                            //onClick={(event, object, action) => this.actionMove(event, grade, 'back')}
                            >
                            <ArrowLeft color='#00bcd4'/>
                        </IconButton>
                        <div className="horizontal-scroll">
                        <Card id={'descrição'+1} key={1} style={{width: '23.47%', marginRight: '2%'}}>
                            <CardMedia>
                                {/* <img src={this.state.image} alt=''/> */}
                            </CardMedia>
                            <CardTitle style={{paddingBottom: '0%'}} titleStyle={{fontSize: '20px', fontWeight: '300'}} title={'nome do curso'}/>
                            <CardText>
                                {'descrição curso'}
                            </CardText>
                            <Divider />
                            <CardActions style={{textAlign:'right', paddingRight: '0'}}>
                                <RaisedButton
                                    label="Acessar curso"
                                    backgroundColor={this.props.styleAccess}
                                    labelStyle={{color: 'white'}}
                                />
                            </CardActions>
                        </Card>
                        </div>
                        <IconButton
                            style={{background: 'transparent', width: 64, height: 64, padding: 8, float: 'left'}}
                            iconStyle={{width: 48, height: 48}}
                            tooltip='Ir'
                            //onClick={(event, object, action) => this.actionMove(event, grade, 'go')}
                            >
                            <ArrowRight color='#00bcd4'/>
                        </IconButton>
                    </div>
                    <Divider style={{width: '80.5%',
                        marginLeft: '9.8%',
                        marginTop: '2%',
                        backgroundColor: 'rgba(224, 224, 224, 0.5)'}}
                    />
                </div>
            </div>
        )
    }
}


export default CardCourse;