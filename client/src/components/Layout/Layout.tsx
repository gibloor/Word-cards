import React from 'react'
import { Outlet } from 'react-router-dom'

import Footer from './Footer/Footer'
import Header from './Header/Header'
import UserProvider from './contexts/UserProvider/UserProvider'
import UserWordsProvider from './contexts/UserWordsProvider/UserWordsProvider'

const Layout = () => {
  return (
    <UserProvider>
      <UserWordsProvider>
        <Header />
        <Outlet />
        <Footer />
      </UserWordsProvider>
    </UserProvider>
  )
}

export default Layout
