import React, { Component } from 'react';
import HttpService from '../../../../service/http/HttpService';
import _ from 'lodash';

import TextField from 'material-ui/TextField';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn,} from 'material-ui/Table';


class ListStudents extends Component {

    constructor(props){
        super(props);
        this.state = {
            students: JSON.parse(localStorage.getItem('students')),
            rows: [], 
            signatures: [],
            arrayStudents: [2],
        };

        this.keyRowsSelected = [];
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
        console.log('vamos la mano');
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

    makeTeste = () => {
        return {
            email : "jonathan.henrique.smtp@gmail.com",
            name   : "Jonathan",
            signature   :     false,
            status  :  true,
            _id   : "5a4eadde2cdc551c7302a2bd"
        }
    }

    fncFilterRows = () =>
    {
        let filter = this.search.input.value;
        filter = filter.toUpperCase();
        let result = _.filter(this.state.students, (o) => {
            let name = o.name.toUpperCase();
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
                <TableRowColumn>{student.status ? 'ATIVO' : 'INATIVO'}</TableRowColumn>
            </TableRow>
        );

        this.setState({'rows': rows});
    };

    rowSelected = (item) =>
    {
        let rows = this.state.rows;
        this.keyRowsSelected = [];
        if (item === 'all') {
            _.forEach(rows, (item) => {
                let result = _.filter(this.state.students, (o) => {
                    return o._id === item.key
                });
                if (result.length > 0) {
                    this.keyRowsSelected.push(result[0].email);
                }

            });
        }

        if (item !== 'all' && item !== 'none') {
            _.forEach(item, (value) => {

                let result = _.filter(this.state.students, (o) => {
                    return o._id === rows[value].key
                });
                if (result.length > 0) {
                    this.keyRowsSelected.push(result[0].email);
                }
            });

        }

        let remakeRow = [];
        _.forEach(rows, (item) => {
            let result = _.filter(this.state.students, (o) => {
                return o._id === item.key
            });
            if (result.length > 0 && result[0].name !== undefined) {
                remakeRow.push(result[0])
            }
        });

        if (remakeRow.length > 0) {
            this.fncMakeRows(remakeRow);
        }

    };

    isSelectedRow = (id) =>
    {
        let result = _.filter(this.keyRowsSelected, (o) => {
            return o === id
        });
        console.log(result.length > 0);
        return result.length > 0;
    };

    render(){
        return(
            <div 
                className="container"
                style={{width:'100%', float:'center'}}
                >
                <span className="display-block">
                    <TextField
                        hintText="informe o nome do aluno"
                        floatingLabelText="Pesquisar assinatura"
                        type="text"
                        fullWidth={true}
                        onChange={() => this.fncFilterRows()}
                        ref={(input) => this.search = input}/>
                </span>

                <Table
                    height={'300px'}
                    fixedHeader={true}
                    selectable={true}
                    multiSelectable={true}
                    onRowSelection={(item) => this.rowSelected(item)}
                >
                    <TableHeader
                        style={this.styles.tableHeader}
                        displaySelectAll={true}
                        adjustForCheckbox={true}
                        enableSelectAll={true}>

                        <TableRow>
                            <TableHeaderColumn>Nome do aluno</TableHeaderColumn>
                            <TableHeaderColumn>Email do aluno</TableHeaderColumn>
                            <TableHeaderColumn>Situação da assinatura</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody displayRowCheckbox={true}
                               showRowHover={true}
                               deselectOnClickaway={false}
                               style={this.styles.tableBody}>
                        {this.state.rows}
                    </TableBody>
                </Table>

            </div>
        )
    }
}

export default ListStudents;