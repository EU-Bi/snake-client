import { LOGIN, LOGOUT, REGISTRATION, UPDATE } from '../utils/constants'

const initialState = {
  isAuth:false,
  nick:null,
  score:0
} 

export function authReducer(state=initialState,{type,payload}){
  switch(type){
    case REGISTRATION :
    return{
      type:type,
      payload
    };
    case LOGIN:return{
      isAuth:true,
      type:type,
      payload
    };
    case LOGOUT: return {initialState}
    default: return state
  }  

}

export function snakeReducer(state={},{type,payload}){
 switch(type){
  case UPDATE:return {
    isAuth:true,
    type:type,
    payload
  };
  default: return state
 }
}