import React, { Component } from 'react';
import {Card, CardActions, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import Divider from 'material-ui/Divider';
import NavBar from './NavBar';
export default class Search extends Component {

    constructor(props){
        super(props);
        this.state = {
            search:  props.match.params.search,
            courses: JSON.parse(localStorage.getItem('course')),
            student: JSON.parse(localStorage.getItem('student')),
            coursePlan:  JSON.parse(localStorage.getItem('coursePlan')),
            listCourses: []
        }
    }

    componentDidMount(){
        this.getSearch();
    }
    getValuePlan = (idCourse) => {
        var value = 0;
        this.state.coursePlan.map((row, i) => (
            row.plan._id === this.state.student.plan._id && row.course._id === idCourse ?
                value = row.price : ''
        ));
        return parseFloat(value).toFixed(2);
    }
    getSearch = () => {
        
        var getData = this.state.courses.map((row) => (
            row.labelUrl.toLowerCase().match(this.state.search.toLowerCase()) ?
                row : null
        ));

        var list = getData.map((row, i) => (
            row !== null ?
                // <a href={"/course/"+row.labelUrl+'/'+row._id}>
                //     <div className='row'
                //         style={{
                //             width: '75%',
                //             height: '150px',
                //             border: 'solid 1px',
                //             borderColor: '#A9A9A9',
                //             marginTop: '20px',
                //             color: '#000'
                //         }}
                //     >
                //         <div>
                //             { 
                //                 <img 
                //                     alt={row.name}
                //                     src={'http://localhost:8080/api/getFile?name='+row.wayImage} 
                //                     style={{width: '200px', height: '150px'}}/>
                //             }
                //         </div>
                //         <div style={{margin: '10px'}}>
                //             <h4>{row.name}</h4>
                //             <h5>{row.description}</h5>
                //             <h5>R$: { 
                //                         this.state.student === null ?
                //                             parseFloat(row.price).toFixed(2) :
                //                             this.getValuePlan(row._id)
                //                     }
                //             </h5>
                //         </div>
                //     </div>
                // </a>
                <Card id={this.state.subCateg+''+i} key={i} style={{width: '200px', height: '300px', marginRight: '1%', marginLeft: '1%',  marginTop: '5%', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'}}>
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
            : ''    
        ))
        this.setState({listCourses: list});
    }

    render(){
        return(
            <div>
                <NavBar/>
                <br/>
                <br/>  
                <br/>
                <div className='container'>
                    <div className='row'>
                        { this.state.listCourses }
                    </div>                   
                </div>  
                
            </div>
        )
    }
}