import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'

import Button from '../../ui/Button/Button'
import { UserContext } from '../contexts/UserProvider/UserProvider'

import logo from './logo.png'
import notification from './notification.svg'

import './styles.scss'

type HeaderProps = {

}

const Header = (props: HeaderProps) => {
  const { user, autoSignIn, signUp } = useContext(UserContext)

  const id = 0

  useEffect(() => {
    autoSignIn('XXX')
  }, [])

  useEffect(() => {
    console.log(user)
  }, [user])


  return (
    <div className='header'>
      <div className='header__navigation text_14'>
        <Link to="/">
          <img src={logo} className='header__logo' />
        </Link>
        <Link to='/own-cards'>
          Own cards
        </Link>
        <Link to='/public-cards'>
          Public cards
        </Link>
      </div>

      <div className='header__authentication'>
        <div
          className='header__notification'
          tabIndex={0}
          // onKeyPress={() => (props.changeAuthVariant('login'))}
        >
          <img className='header__notification_picture' src={notification} />
        </div>
        <Link to={`/profile:${id}`}>
          User
        </Link>
        <Button text="Sign in" onClick={() => {}} />
        <Button text="Sign up" onClick={() => {}} />
      </div>
    </div>
)
}

export default Header