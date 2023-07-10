import React, { useContext, useEffect } from 'react'
import { Outlet } from 'react-router-dom'

import Footer from './Footer/Footer'
import Header from './Header/Header'
import UserProvider, { UserContext } from './contexts/UserProvider/UserProvider'


const Layout = () => {
  const { autoSignIn } = useContext(UserContext)
  
  useEffect(() => {
    setTimeout(autoSignIn, 5000)
  }, [])

  return (
    <UserProvider>
      <Header />
      <Outlet />
      <Footer />
    </UserProvider>
  )
}

export default Layout