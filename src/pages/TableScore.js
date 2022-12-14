import React from 'react'
import {Container, Table } from 'react-bootstrap'
import { connect } from 'react-redux'

const TableScore = ({usersArr}) => {
  if(Array.isArray(usersArr)){
    const filterArr = usersArr.sort(function(a,b){
      return b.score-a.score
    })
    return (
      <Container style={{width: 600}} d-flex justify-content-center align-items-center>
        <Table striped bordered hover>
            <thead>
            <tr>
              <th>#</th>
              <th>Nick</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {filterArr.map((user, indx)=>
              <tr>
                <td>{indx+1}</td>
                <td>{user.nick}</td>
                <td>{user.score}</td>
              </tr>
            )}
          </tbody>
        </Table>
      </Container>
    )
  }
  
  
}

export default connect(state=>({usersArr:state.table.payload}))(TableScore)