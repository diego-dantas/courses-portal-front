import React, { Component } from 'react';
import {Card, CardActions, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import Divider from 'material-ui/Divider';
import IconButton from 'material-ui/IconButton';
import ArrowLeft from 'material-ui/svg-icons/hardware/keyboard-arrow-left';
import ArrowRight from 'material-ui/svg-icons/hardware/keyboard-arrow-right';

class CardCourse extends Component {

    constructor(props){
        super(props);
        this.state = {
            catUrl: props.category,
            subCateg: props.subCateg,
            category:    JSON.parse(localStorage.getItem('category')),
            subCategory: JSON.parse(localStorage.getItem('subCategory')),
            student:     JSON.parse(localStorage.getItem('student')),
            courses:     JSON.parse(localStorage.getItem('course')),
            listCourses: [],
        }
    }

    componentDidMount(){
        this.buildGrid();
    }
    

    buildGrid = () => {
        let idSub = 0;
        let listCourses = [];
        this.state.subCategory.map((row, i) => (
            row.labelUrl === this.state.subCateg ?
                idSub = row._id : ''
        ))        
            
        listCourses = this.state.courses.map((row, i) =>(
                row.subGrid._id === idSub ?
                    <Card id={'descrição'+i} key={i} style={{width: '250px', height: '300px', marginRight: '2%', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'}}>
                        <a href={"/course/"+row.labelUrl+'/'+row._id}>
                        <CardMedia>
                            { 
                                <img 
                                    alt={row.name}
                                    src={'http://localhost:8080/api/getFile?name='+row.wayImage} 
                                    style={{width: '200px', height: '150px'}}/>
                            }
                        </CardMedia>
                        <CardTitle style={{paddingBottom: '0%'}} titleStyle={{fontSize: '20px', fontWeight: '300'}} title={row.name}/>
                        <CardText>
                            {row.description}
                        </CardText>
                        <Divider />
                        <CardActions style={{textAlign:'right', paddingRight: '0'}}>
                            <h4>R$: {row.price}</h4>
                        </CardActions>
                        </a>
                    </Card> : ''
        ))
        
        this.setState({'listCourses': listCourses});
    }

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
                            {this.state.listCourses}
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