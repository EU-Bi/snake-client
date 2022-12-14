import React from 'react'
import { NavLink } from 'react-router-dom'
import {useNavigate} from 'react-router-dom'
import { Button, Container, Nav, Navbar } from 'react-bootstrap'
import { GAME_ROUTE, LOGIN_ROUTE, TABLE_SCORE_ROUTE } from '../utils/constants'
import { connect } from 'react-redux'
import { actionLogOut } from '../store/actions/actionCreateUsers'
import actionTable from '../store/actions/actionTable'

const NavBar = ({isAuth, logOut, getTable}) => {
  const navigate = useNavigate()
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        {isAuth?<NavLink to={GAME_ROUTE} style={{color:'white'}} >SnakeFullStack</NavLink>:<NavLink to={LOGIN_ROUTE}style={{color:'white'}} >SnakeFullStack</NavLink>}
        {isAuth?
        <Nav className="ml-auto" style={{color: 'white'}}>
          <Button
            variant={"outline-light"}
            onClick={() =>{ 
              getTable()
              navigate(TABLE_SCORE_ROUTE)
            }}
          >
            TableScore
          </Button>
          <Button
          variant={"outline-light"}
          onClick={() => {
            logOut()
            navigate(LOGIN_ROUTE)
          }}
          className="ml-2"
          >
            Exit
          </Button>
        </Nav>
        :
        <Nav className="ml-auto" style={{color: 'white'}}>
          <Button 
            variant={"outline-light"} 
            onClick={() => navigate(LOGIN_ROUTE)}
            >
            Авторизация
          </Button>
        </Nav>
        }        
      </Container>
    </Navbar>
  )
}

export default connect(state=>({isAuth:state.user.isAuth}), {logOut:actionLogOut, getTable:actionTable})(NavBar)