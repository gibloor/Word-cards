import axios from 'axios'
import React, { createContext, useReducer } from 'react'

type UserProviderProps = {
  children: React.ReactNode
}

type User = {
  id: number
  name: string
  permissions: string
}

type Action = {
  type: 'signIn' | 'signOut'
  user?: User
}

type signInData = {
  email: string,
  password: string,
}

type signUpData = signInData & {
  name: string
}

export const initialState: User = {
  id: 0,
  name: '',
  permissions: '',
}

type UserContextType = {
  user: User
  autoSignIn: (token: string) => void
  handSignIn: (authData: signInData) => void
  signUp: (authData: signUpData) => void
  signOut: (props: string) => void
}

export const UserContext = createContext<UserContextType>({
  user: initialState,
  autoSignIn: () => {},
  handSignIn: () => {},
  signUp: () => {},
  signOut: () => {},
})

const DOMAIN = process.env.REACT_APP_DOMAIN || 'localhost:3001';

const UserProvider = (props: UserProviderProps) => {
  const reducer = (state: User, action: Action) => {
    let newState = { ...state }

    switch (action.type) {
      case 'signIn':
        if (action.user) {
          newState = action.user
        }
        break

      case 'signOut':
        newState = { ...initialState }
        break

      default:
        throw new Error()
    }

    return newState
  }

  const [state, dispatch] = useReducer(reducer, initialState)

  const signIn = () => {
    console.log("Hi")
    // const user = { id: 1, name: 'Pochito', permissions: 'Lord' }
    // dispatch({ type: 'signIn', user: user })
  }

  const autoSignIn = (token: string) => {
    // call to db

    signIn()
  }

  const handSignIn = (authData: signInData) => {
    // call to db

    signIn()
  }

  const signUp = async (authData: signUpData) => {
    const request = await axios.post(`http://${DOMAIN}/user/signUp`,
      {...authData},
    )

    await console.log(request.data)
    
    // call to db

    signIn()
  }

  const signOut = (props: string) => {
    dispatch({ type: 'signOut' })
  }

  return (
    <UserContext.Provider
      value={{ user: state, autoSignIn, handSignIn, signUp, signOut }}
    >
      {props.children}
    </UserContext.Provider>
  )
}

export default UserProvider
