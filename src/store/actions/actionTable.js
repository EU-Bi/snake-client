import React from 'react'
import { $host } from '../../http'
import { TABLE } from '../../utils/constants'
import { actionPromise } from '../promiseReduser'

const actionTable = () => 
async(dispatch)=>{
  const table = $host.get('api/user/rating')
  const action = actionPromise('table',table)
  const result = await dispatch(action)
  dispatch({type:TABLE, payload:result.data})
}
export default actionTable