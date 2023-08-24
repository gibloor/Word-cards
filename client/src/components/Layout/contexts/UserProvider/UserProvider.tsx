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
  type: 'signIn' | 'signOut' | 'signError' | 'clearError'
  user?: User
  error?: string
}

type signInData = {
  email: string
  password: string
}

type signUpData = signInData & {
  name: string
}

type InitialState = User & {
  error: string
}

export const initialState: InitialState = {
  name: '',
  permissions: 0,
  error: '',
}

type UserContextType = {
  user: InitialState
  autoSignIn: () => void
  handSignIn: (authData: signInData) => void
  signUp: (authData: signUpData) => void
  signOut: () => void
  clearError: () => void
}

export const UserContext = createContext<UserContextType>({
  user: { ...initialState },
  autoSignIn: () => {},
  handSignIn: () => {},
  signUp: () => {},
  signOut: () => {},
  clearError: () => {},
})

const DOMAIN = process.env.REACT_APP_DOMAIN || 'localhost:3001'

const UserProvider = (props: UserProviderProps) => {
  const reducer = (state: InitialState, action: Action) => {
    let newState = { ...state }

    switch (action.type) {
      case 'signIn':
        if (action.user) {
          newState = { ...action.user, error: '' }
        }
        break

      case 'signOut':
        newState = { ...initialState }
        break

      case 'signError':
        if (action.error) {
          newState.error = action.error
        }
        break

      case 'clearError':
        newState.error = ''
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
    } catch (err: any) {
      dispatch({ type: 'signError', error: err.response.data.message })
    }
  }

  const signUp = async (authData: signUpData) => {
    try {
      const request = await axios.post(`http://${DOMAIN}/user/signUp`, {
        ...authData,
      })
      const { token, user } = request.data
      await signIn(token, user)
    } catch (err: any) {
      dispatch({ type: 'signError', error: err.response.data.message })
    }
  }

  const signOut = async () => {
    localStorage.removeItem('token')
    await dispatch({ type: 'signOut' })
  }

  const clearError = async () => {
    await dispatch({ type: 'clearError' })
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
        clearError,
      }}
    >
      {props.children}
    </UserContext.Provider>
  )
}

export default UserProvider
