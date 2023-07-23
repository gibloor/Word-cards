import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'

import Button from '../../ui/Button/Button'
import { UserContext } from 'components/Layout/contexts/UserProvider/UserProvider'
import SignForm from './SignForm/SignForm'

import logo from './logo.png'
import notification from './notification.svg'

import './styles.scss'

export type FormType = null | 'signIn' | 'signUp'

const Header = () => {
  const { user, signOut } = useContext(UserContext)
  const [formType, setFormType] = useState<FormType>(null)

  const id = 0

  return (
    <>
      <div className="header">
        <div className="header__navigation text_20">
          <Link to="/">
            <img src={logo} className="header__logo" />
          </Link>
          <Link to="/own-words">Own words</Link>
          <Link to="/public-packs">Public packs</Link>
        </div>

        <div className="header__authentication">
          <div
            className="header__notification"
            tabIndex={0}
            // onKeyPress={() => (props.changeAuthVariant('login'))}
          >
            <img className="header__notification_picture" src={notification} />
          </div>

          {user.name ? (
            <>
              <Link to={`/profile:${id}`}>User</Link>
              <Button text="Sign out" onClick={() => signOut()} type="text" />
            </>
          ) : (
            <>
              <Button
                text="Sign in"
                onClick={() => setFormType('signIn')}
                type="text"
              />
              <Button
                text="Sign up"
                onClick={() => setFormType('signUp')}
                type="text"
              />
            </>
          )}
        </div>
      </div>

      {formType && (
        <SignForm formType={formType} changeFormType={setFormType} />
      )}
    </>
  )
}

export default Header
