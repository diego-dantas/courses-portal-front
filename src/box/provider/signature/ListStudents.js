import React, { Component } from 'react';
import HttpService from '../../../service/http/HttpService';
import _ from 'lodash';

import TextField from 'material-ui/TextField';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn,} from 'material-ui/Table';


class ListStudents extends Component {

    constructor(props){
        super(props);
        this.state = {
            students: JSON.parse(localStorage.getItem('students')),
            rows: [], 
            signatures: []
        }
    }

    componentDidMount() {
        this.getStudents();
    }
    
    styles =
    {
        tableHeader: {backgroundColor: '#f1f1f1', textAlign: 'left', fontSize: '20px'},
        tableBody: {cursor: 'pointer'},
    };

    getStudents = () => {
        HttpService.make().get('/getStudents')
                   .then(success => {
                        console.log(success.data);
                        localStorage.setItem('students', JSON.stringify(success.data));
                        this.setState({students: JSON.parse(localStorage.getItem('students'))});
                        this.fncMakeRows(this.state.students);
                   })
                   .catch(error => {
                       console.log('Erro ao buscar os alunos');
                   })
    }

    fncFilterRows = () =>
    {
        let filter = this.search.input.value;
        filter = filter.toUpperCase();
        let result = _.filter(this.state.students, (row) => {
            let name = row.name.toUpperCase();
            return name.includes(filter);
        });
        this.fncMakeRows(result);
    };

    fncMakeRows = (students) =>
    {

        students = _.sortBy(students, ['name', 'email']);

        let rows = students.map((student) =>
            <TableRow key={student._id}>
                <TableRowColumn>{student.name}</TableRowColumn>
                <TableRowColumn>{student.email}</TableRowColumn>
            </TableRow>
        );

        this.setState({'rows': rows});
    };


    render(){
        return(
            <div className="container">
                <span className="display-block">
                    <TextField
                        hintText="informe o nome do aluno"
                        floatingLabelText="Pesquisar assinatura"
                        type="text"
                        fullWidth={true}
                        onChange={() => this.fncFilterRows()}
                        ref={(input) => this.search = input}/>
                </span>

                <Table>
                    <TableHeader
                        adjustForCheckbox={false}
                        enableSelectAll={false}
                        displaySelectAll={false}
                        style={this.styles.tableHeader}
                    >
                        <TableRow>
                            <TableHeaderColumn>Nome do aluno</TableHeaderColumn>
                            <TableHeaderColumn>Email do aluno</TableHeaderColumn>
                            <TableHeaderColumn>Situação da assinatura</TableHeaderColumn>
                            <TableHeaderColumn>Ação</TableHeaderColumn>
                        </TableRow>

                    </TableHeader>
                    <TableBody 
                        displayRowCheckbox={false}
                        showRowHover={true}
                        style={this.styles.tableBody}
                    >
                        {this.state.rows}

                    </TableBody>
                </Table>

            </div>
        )
    }
}

export default ListStudents;