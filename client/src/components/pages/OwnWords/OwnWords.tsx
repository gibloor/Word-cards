import React, { useContext, useEffect } from 'react'

import { UserContext } from 'components/Layout/contexts/UserProvider/UserProvider'
import { Outlet } from 'react-router-dom'
import NoAccess from './NoAccess/NoAccess'

import './styles.scss'

const OwnWords = () => {
  const { user } = useContext(UserContext)

  useEffect(() => {}, [])

  return (
    <div className="own-words styled-background">
      {user.name ? (
        <div className="own-words__container styled-border">
          <Outlet />
        </div>
      ) : (
        <NoAccess />
      )}
    </div>
  )
}

export default OwnWords
