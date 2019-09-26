import React from 'react'
import { Button } from 'antd'
import { connect } from 'react-redux'

const Home = (props) => {
  const onIncrement = (e) => {
    props.dispatch({
      type: 'INCREMENT',
      payload: 1,
    })
  }

  const onIncrementAsync = (e) => {
    props.dispatch({
      type: 'INCREMENT_ASYNC',
      payload: {
        data: 10,
      },
    })
  }

  return (
    <aside>
      <Button type='primary' onClick={onIncrement}>+1</Button>
      <Button type='primary' onClick={onIncrementAsync} loading={props.loading}>+10</Button>
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