import React, { Component } from 'react';
import history from '../../../../service/router/history';
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
            coursePlan:  JSON.parse(localStorage.getItem('coursePlan')),
            listCourses: [],
        }
    }

    componentDidMount(){
        this.buildGrid();
        // console.log(this.state.student.plan)
        // this.state.coursePlan.map((row, i) => (
        //     console.log(row.plan._id)    
        // ))
        
    }

    getValuePlan = (idCourse) => {
        var value = 0;

        this.state.coursePlan.map((row, i) => (
            row.plan._id === this.state.student.plan._id && row.course._id === idCourse ?
                value = row.price : ''
        ));
        return parseFloat(value).toFixed(2);
    }

    buildGrid = () => {
        let idSub = 0;
        var listCourses = [];
        this.state.subCategory.map((row, i) => (
            row.labelUrl === this.state.subCateg ?
                idSub = row._id : ''
        ))        
        
        listCourses !== null ?
            listCourses = this.state.courses.map((row, i) => (
                row.subGrid._id === idSub ? row : undefined
            ))
        :''

        Array.prototype.remByVal = function(val) {
            for (var i = 0; i < this.length; i++) {
                if (this[i] === val) {
                    this.splice(i, 1);
                    i--;
                }
            }
            return this;
        }
        listCourses = listCourses.remByVal(undefined)

        listCourses = listCourses.map((row, i) => (
            <Card id={this.state.subCateg+''+i} key={i} style={{width: '200px', height: '300px', marginRight: '1%', marginLeft: '1%', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'}}>
                <a href={"/course/"+row.labelUrl+'/'+row._id}>
                    <CardMedia>
                        { 
                            <img 
                                alt={row.name}
                                src={'http://localhost:8080/api/getFile?name='+row.wayImage} 
                                style={{width: '200px', height: '125px'}}/>
                        }
                    </CardMedia>
                    <CardTitle style={{paddingBottom: '0%'}} titleStyle={{fontSize: '15px', fontWeight: '250'}} title={row.name}/>
                    <CardText  style={{paddingBottom: '0%', width: '200px', height: '75px'}}>
                        {row.description}
                    </CardText>
                    <Divider />
                    <CardActions style={{textAlign:'right', width: '200px', height: '50px'}}>
                        <h4>R$: { 
                                    this.state.student === null ?
                                        parseFloat(row.price).toFixed(2) :
                                        this.getValuePlan(row._id)
                                }
                        </h4>
                    </CardActions>
                </a>
            </Card>
        ))
        this.setState({'listCourses': listCourses});
    }

    actionMove = (event, action) =>
    {
        event.preventDefault();
        let qtd = this.state.listCourses.length;
        console.log(this.state.subCateg+ '' + (qtd - 1));
        
        //history.push('/courses/desenvolvimento/dev-web');
        // const id = '#' + grade.description;
        // let box = this.state.componentMove;
        // let move = this.state.componentMove[grade.description];
        // const step = 4;

        if(action === 'go')
        {
            // if(grade.courses.length < move.lastItem + step)
            // {
            //     move.firstItem = grade.courses.length - step;
            //     move.lastItem = grade.courses.length - 1;
            // }
            // else
            // {
            //     move.firstItem += step;
            //     move.lastItem += step;
            // }
            window.location = '#'+this.state.subCateg+ '' + (qtd - 1);
        }
        else
        {
            // if(move.firstItem - step < 0)
            // {
            //     move.firstItem = 0;
            //     move.lastItem = 3;
            // }
            // else
            // {
            //     move.firstItem -= step;
            //     move.lastItem -= step;
            // }

            window.location = '#'+this.state.subCateg+ '' + 0;
        }

        history.push('/courses/'+this.state.catUrl+'/'+this.state.subCateg);

        // box[move] = move;
        // history.push('/courses');

    };
    render(){


        return(
            <div>
                <div key={1}>
                    <h2 className='title-box'>Cursos em {this.state.catUrl.toUpperCase()} ...</h2>
                    <div className='container-fluid component-category'>
                        <IconButton
                            style={{background: 'transparent', width: 64, height: 64, padding: 8, float: 'left'}}
                            iconStyle={{width: 48, height: 48}}
                            tooltip='Voltar'
                            onClick={(event, object, action) => this.actionMove(event, 'back')}
                            >
                            <ArrowLeft color='#00bcd4'/>
                        </IconButton>
                        <div className="horizontal-scroll">
                            {this.state.listCourses}
                        </div>
                        <IconButton
                            style={{background: 'transparent', width: 64, height: 64, padding: 8, float: 'right'}}
                            iconStyle={{width: 48, height: 48}}
                            tooltip='Ir'
                            onClick={(event, object, action) => this.actionMove(event, 'go')}
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