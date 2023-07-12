import React from 'react'
import { Outlet } from 'react-router-dom'

import Footer from './Footer/Footer'
import Header from './Header/Header'
import UserProvider from './contexts/UserProvider/UserProvider'

const Layout = () => {
  return (
    <UserProvider>
      <Header />
      <Outlet />
      <Footer />
    </UserProvider>
  )
}

export default Layout
