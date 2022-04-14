/**
 * Examples for rematch commmon
 */
import React from 'react'
import { connect } from 'react-redux'

import { RootState, Dispatch } from '@/store'

const mapState = (state: RootState) => {
  return {
    count: state.count,
  }
}

const mapDispatch = ({ count }: Dispatch) => {
  return {
    increment: () => count.increment(1),
    incrementAsync: () => count.incrementAsync(1),
  }
}

type CountProps = Partial<ReturnType<typeof mapState> & ReturnType<typeof mapDispatch>>

const Count = (props: CountProps) => (
  <div>
    The count is {props.count}
    <button onClick={props.increment}>increment</button>
    <button onClick={props.incrementAsync}>incrementAsync</button>
  </div>
)

export default connect(mapState, mapDispatch)(Count)
