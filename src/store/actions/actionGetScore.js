import React from 'react'
import { $host } from '../../http'
import { UPDATE } from '../../utils/constants'
import { actionPromise } from '../promiseReduser'

const actionGetScore = (id,score) => 
async(dispatch)=>{
  const user = $host.post('api/user/game',{id,score})
  const action = actionPromise('score', user)
  const result = await dispatch(action)
  dispatch({type:UPDATE, payload: result.data})
}

export default actionGetScore