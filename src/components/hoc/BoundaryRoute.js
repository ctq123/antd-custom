import React from 'react'
import { Route } from 'react-router-dom'
import ErrorBoundary from '@components/error/ErrorBoundary'

const BoundaryRoute = (props) => {
  return (
    <ErrorBoundary>
      <Route { ...props } />
    </ErrorBoundary>
  )
}

export default BoundaryRoute