import React, { createContext, useEffect, useReducer } from 'react'
import axios from 'axios'

type UserProviderProps = {
  children: React.ReactNode
}

type User = {
  name: string
  permissions: number
}

type Action = {
  type: 'signIn' | 'signOut'
  user?: User
}

type signInData = {
  email: string
  password: string
}

type signUpData = signInData & {
  name: string
}

export const initialState: User = {
  name: '',
  permissions: 0,
}

type UserContextType = {
  user: User
  autoSignIn: () => void
  handSignIn: (authData: signInData) => Promise<true | string>
  signUp: (authData: signUpData) => Promise<true | string>
  signOut: () => void
}

export const UserContext = createContext<UserContextType>({
  user: { ...initialState },
  autoSignIn: () => {},
  handSignIn: async () => {
    return true
  },
  signUp: async () => {
    return true
  },
  signOut: () => {},
})

const DOMAIN = process.env.REACT_APP_DOMAIN || 'localhost:3001'

const UserProvider = (props: UserProviderProps) => {
  const reducer = (state: User, action: Action) => {
    let newState = { ...state }

    switch (action.type) {
      case 'signIn':
        if (action.user) {
          newState = { ...action.user }
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

  const signIn = (token: string, user: User) => {
    localStorage.setItem('token', token)
    dispatch({ type: 'signIn', user })
  }

  const autoSignIn = async () => {
    const localToken = await localStorage.getItem('token')
    if (localToken) {
      try {
        const request = await axios.post(
          `http://${DOMAIN}/user/autoSignIn`,
          {},
          {
            headers: {
              Authorization: `Bearer ${localToken}`,
            },
          },
        )
        const { token, user } = request.data
        await signIn(token, user)
      } catch (err: any) {
        console.error(err)
      }
    }
  }

  const handSignIn = async (authData: signInData) => {
    try {
      const request = await axios.post(`http://${DOMAIN}/user/signIn`, {
        ...authData,
      })
      const { token, user } = request.data
      await signIn(token, user)

      return true
    } catch (err: any) {
      console.error(err.response.data.message)
      return err.response.data.message
    }
  }

  const signUp = async (authData: signUpData) => {
    try {
      const request = await axios.post(`http://${DOMAIN}/user/signUp`, {
        ...authData,
      })
      const { token, user } = request.data
      await signIn(token, user)

      return true
    } catch (err: any) {
      console.error(err.response.data.message)
      return err.response.data.message
    }
  }

  const signOut = async () => {
    localStorage.removeItem('token')
    await dispatch({ type: 'signOut' })
  }

  useEffect(() => {
    autoSignIn()
  }, [])

  return (
    <UserContext.Provider
      value={{
        user: state,
        autoSignIn,
        handSignIn,
        signUp,
        signOut,
      }}
    >
      {props.children}
    </UserContext.Provider>
  )
}

export default UserProvider
