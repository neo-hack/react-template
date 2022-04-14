import React from 'react'
import { BrowserRouter, RouteObject, useRoutes } from 'react-router-dom'
import Loadable from 'react-loadable'

const Home = Loadable({
  loader: () => import(/* webpackChunkName: "Home" */ '@/pages/Home'),
  loading: () => <div>loading</div>,
})

const In = Loadable({
  loader: () => import(/* webpackChunkName: "In" */ '@/pages/Home/In'),
  loading: () => <div>loading</div>,
})

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/in',
    element: <In />,
  },
]

const Routes = () => {
  const element = useRoutes(routes)
  return element
}

const RouterViewer = () => {
  return (
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  )
}

export default RouterViewer
