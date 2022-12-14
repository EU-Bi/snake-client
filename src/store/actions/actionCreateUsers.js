import React from 'react'
import { $host } from '../../http'
import { LOGIN, LOGOUT, REGISTRATION } from '../../utils/constants'
import { actionPromise } from '../promiseReduser'


const actionLogOut = ()=>
  (dispatch)=>{
    dispatch({type:LOGOUT})
  }


const actionFullLogin = (nick)=>
async (dispatch)=>{
  const user= $host.post('api/user/login',{nick})
  const action = actionPromise('login', user)
  const result = await dispatch(action)
  dispatch({type:LOGIN, payload: result.data})


}

const actionRegistration = (nick, result)=>
  (dispatch)=>{
      dispatch({type: REGISTRATION, payload:result.data})
      if(result){
        dispatch(actionFullLogin(nick))
      }
  }



const actionCreateUsers = (nick) => 
 async(dispatch)=>{

  const user= $host.post('api/user/registration',{nick})

  const action = actionPromise('registration', user)
  const result = await dispatch(action)
  dispatch(actionRegistration(nick,result))

}

export {actionCreateUsers, actionFullLogin, actionLogOut}