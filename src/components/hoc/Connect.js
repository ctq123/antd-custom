
import React from 'react'
import { connect } from 'react-redux'

const Connect = (ChildComponent, mapStateToProp) => {

  !mapStateToProp && (mapStateToProp = (state) => ({ ...state })) 
  
  const mapDispatchToProp = (dispatch) => {
    return { dispatch }
  }

  return (
    connect(mapStateToProp, mapDispatchToProp)(ChildComponent)
  )
}


export default Connect