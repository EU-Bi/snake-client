import React from 'react'
import { TABLE } from '../utils/constants';

function tableReducer(state={},{type,payload}){
  switch(type){
    case TABLE:return {
      type:type,
      payload
    };
    default: return state
   }
}

export default tableReducer