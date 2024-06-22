import React from 'react'
import Navigation from './Navigation'
import Dashboard from './Dashboard'
import { Outlet } from 'react-router-dom'

const Adminpanel = () => {
  return (
    <>
      <Navigation/>
      <Outlet/>
    </>
  )
}

export default Adminpanel