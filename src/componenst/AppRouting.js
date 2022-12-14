import React from 'react'
import { connect } from 'react-redux'
import { Route, Navigate, Routes} from 'react-router-dom'
import { authRoutes, publicRoutes } from '../routes'

const AppRouting = ({isAuth}) => {
  console.log(isAuth)
  return (
    <Routes>
      {isAuth && authRoutes.map(({path,Component})=>
        <Route key={path} path={path} element={Component}/>
      )}
      {publicRoutes.map(({path,Component})=>
        <Route key={path} path={path} element={Component}/>
      )}
      <Route key={'/'} path='/' element={<Navigate replace to={'/login'}/>}/>
    </Routes>
  )
}

export default connect(state=>({isAuth:state.user.isAuth}))(AppRouting)