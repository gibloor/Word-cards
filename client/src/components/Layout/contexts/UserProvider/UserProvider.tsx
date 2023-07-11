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

export const initialState: User = {
  id: 0,
  name: '',
  permissions: '',
}

type UserContextType = {
  user: User
  autoSignIn: (props: string) => void
  handSignIn: (props: string) => void
  signUp: (props: string) => void
  signOut: (props: string) => void
}

export const UserContext = createContext<UserContextType>({
  user: initialState,
  autoSignIn: () => {},
  handSignIn: () => {},
  signUp: () => {},
  signOut: () => {},
})

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
    // const user = { id: 1, name: 'Pochito', permissions: 'Lord' }
    // dispatch({ type: 'signIn', user: user })
  }

  const autoSignIn = (props: string) => {
    // call to db

    console.log(props)

    signIn()
  }

  const handSignIn = (props: string) => {
    // call to db

    signIn()
  }

  const signUp = (props: string) => {
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
