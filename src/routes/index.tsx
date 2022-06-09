import React from 'react'
import { BrowserRouter, RouteObject, useRoutes } from 'react-router-dom'

const Home = React.lazy(() => import(/* webpackChunkName: "home" */ '@/pages/index'))
const Post = React.lazy(() => import(/* webpackChunkName: "post" */ '@/pages/post'))

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/post',
    element: <Post />,
  },
]

const Routes = () => {
  const element = useRoutes(routes)
  return element
}

const RouterViewer = () => {
  return (
    <BrowserRouter>
      <React.Suspense fallback={<div>loading...</div>}>
        <Routes />
      </React.Suspense>
    </BrowserRouter>
  )
}

export default RouterViewer
