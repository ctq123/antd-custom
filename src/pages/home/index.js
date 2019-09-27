import React from 'react'
import { Button } from 'antd'
import { connect } from 'react-redux'

const Home = (props) => {

  const onIncrementAsync = (e) => {
    props.dispatch({
      type: 'INCREMENT_ASYNC',
      payload: {
        data: 10,
      },
    })
  }

  const onIncrementAsync2 = (e) => {
    props.dispatch({
      type: 'home/increment',
      payload: {
        data: 20,
      },
    })
  }

  return (
    <aside>
      <aside>
        <Button type='primary' onClick={onIncrementAsync} loading={props.loading}>+10</Button>
        <h4>count: { props.count }</h4>
      </aside>
      <Button type='primary' onClick={onIncrementAsync2} loading={props.homeLoading}>+20</Button>
      <h4>count: { props.homeCount }</h4>
    </aside>
  )
}

const mapDispatchToProp = (dispatch) => {
  console.dir(dispatch)
  return { dispatch }
}

const mapStateToProp = state => {
  // console.dir(state)
  const { home, incrementReducer } = state
  return {
    ...incrementReducer,
    homeLoading: home.loading,
    homeCount: home.count,
  }
}

export default connect(mapStateToProp, mapDispatchToProp)(Home)