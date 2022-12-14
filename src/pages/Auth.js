import React, { useState } from 'react'
import {connect} from 'react-redux'
import {Container, Form, Button,Card} from "react-bootstrap";
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { REGISTRATION_ROUTE, LOGIN_ROUTE, GAME_ROUTE} from '../utils/constants';
import {actionCreateUsers, actionFullLogin} from '../store/actions/actionCreateUsers';


const Auth = ({registration, login ,isAuth}) => {
  const [nick, setNick]=useState('')
  const location = useLocation()
  const navigate = useNavigate()
  const isLogin = location.pathname === LOGIN_ROUTE
  const click = ()=>{
    if(isLogin){
        login(nick)
        navigate(GAME_ROUTE)
    }else{
        registration(nick)
        navigate(GAME_ROUTE)
    }
  }


  return (
    <Container
            className="d-flex justify-content-center align-items-center"
            style={{height: window.innerHeight - 54}}
        >
            <Card style={{width: 600}} className="p-5">
                <h2 className="m-auto">{isLogin ? 'Авторизация' : "Регистрация"}</h2>
                <Form className="d-flex flex-column">
                    <Form.Control
                        className="mt-3"
                        placeholder="Введите ваш nick..."
                        value={nick}
                        onChange={e => setNick(e.target.value)}
                    />
                    <div className="d-flex justify-content-between mt-3 mr-2">
                        <Button
                            className='mb-3'
                            style={{width:'150px'}}
                            variant={"outline-success"}
                            onClick={click}
                        >
                            {isLogin ? 'Войти' : 'Регистрация'}

                        </Button>
                        {isLogin ?
                            <div>
                                Нет аккаунта? <NavLink to={REGISTRATION_ROUTE}>Зарегистрируйся!</NavLink>
                            </div>
                            :
                            <div>
                                Есть аккаунт? <NavLink to={LOGIN_ROUTE}>Войдите!</NavLink>
                            </div>
                        }
                    </div>

                </Form>
            </Card>
        </Container>
  )
}

export default connect(state=>({isAuth:state.isAuth}),{registration:actionCreateUsers,login: actionFullLogin})(Auth) 