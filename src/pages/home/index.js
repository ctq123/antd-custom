import React from 'react'
import { Button } from 'antd'
import { connect } from 'react-redux'
import incrementAction from '../../redux/increment.action'

const Home = (props) => {
  const onIncrement = (e) => {
    props.dispatch(incrementAction(1))
  }

  return (
    <aside>
      <Button type='primary' onClick={onIncrement}>+1</Button>
      <h4>count: { props.count }</h4>
    </aside>
  )
}

const mapDispatchToProp = (dispatch) => {
  return { dispatch }
}

const mapStateToProp = state => {
  const { incrementReducer } = state
  return incrementReducer
}

export default connect(mapStateToProp, mapDispatchToProp)(Home)