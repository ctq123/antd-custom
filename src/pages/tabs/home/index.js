import React from 'react'
import { Button } from 'antd'
import { connect } from 'react-redux'

const Home = (props) => {

  const onIncrement = (e) => {
    props.dispatch({
      type: 'home/increment',
      payload: 10,
    })
  } 

  const onIncrementAsync = (e) => {
    props.dispatch({
      type: 'home/increment/async',
      payload: {
        data: 20,
      },
    })
  }

  return (
    <aside>
      <Button type='primary' onClick={onIncrement}>+10</Button>
      <Button type='primary' onClick={onIncrementAsync} loading={props.loading}>+20</Button>
      <h4>count: { props.count }</h4>
    </aside>
  )
}

const mapDispatchToProp = (dispatch) => {
  return { dispatch }
}

const mapStateToProp = state => {
  // 对应index.model.js中的name
  const { home } = state
  return home
}

export default connect(mapStateToProp, mapDispatchToProp)(Home)