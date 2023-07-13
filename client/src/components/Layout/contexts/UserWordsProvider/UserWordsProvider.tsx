import React, { createContext, useEffect, useReducer, useContext } from 'react'
import axios from 'axios'
import { UserContext } from '../UserProvider/UserProvider'

type UserWordsProviderProps = {
  children: React.ReactNode
}

type Word = {
  сonfirmations: number
  word: string
}

type UserWords = {
  language: 'eng' | 'ru'
  words: Word[]
}

type Action = {
  // type: 'signIn' | 'signOut'
  // user?: UserWords
}

// type signInData = {
//   email: string
//   password: string
// }

// type signUpData = signInData & {
//   name: string
// }

type State = {
  words: UserWords[]
  error: boolean
  pending: boolean
}

export const initialState: State = {
  words: [],
  error: false,
  pending: false,
}

type UserWordsContextType = {
  userWords: State
  getWords: () => Promise<true | string>
  addWord: () => Promise<true | string>
  addWords: () => Promise<true | string>
  updateWord: () => Promise<true | string>
  deleteWord: () => Promise<true | string>
}

export const UserWordsContext = createContext<UserWordsContextType>({
  userWords: { ...initialState },
  getWords: async () => {return true},
  addWord: async () => {return true},
  addWords: async () => {return true},
  updateWord: async () => {return true},
  deleteWord: async () => {return true},
})

const DOMAIN = process.env.REACT_APP_DOMAIN || 'localhost:3001'

const UserWordsProvider = (props: UserWordsProviderProps) => {
  const { user } = useContext(UserContext)

  const reducer = (state: State, action: Action) => {
    let newState = { ...state }

    // switch (action.type) {
    //   case 'signIn':
    //     if (action.user) {
    //       newState = { ...action.user }
    //     }
    //     break

    //   case 'signOut':
    //     newState = { ...initialState }
    //     break

    //   default:
    //     throw new Error()
    // }

    return newState
  }

  const [state, dispatch] = useReducer(reducer, initialState)

  // const signIn = (token: string, user: User) => {
  //   localStorage.setItem('token', token)
  //   dispatch({ type: 'signIn', user })
  // }

  // const autoSignIn = async () => {
  //   const localToken = await localStorage.getItem('token')
  //   if (localToken) {
  //     try {
  //       const request = await axios.post(
  //         `http://${DOMAIN}/user/autoSignIn`,
  //         {},
  //         {
  //           headers: {
  //             Authorization: `Bearer ${localToken}`,
  //           },
  //         },
  //       )
  //       const { token, user } = request.data
  //       await signIn(token, user)
  //     } catch (err: any) {
  //       console.error(err)
  //     }
  //   }
  // }

  // const handSignIn = async (authData: signInData) => {
  //   try {
  //     const request = await axios.post(`http://${DOMAIN}/user/signIn`, {
  //       ...authData,
  //     })
  //     const { token, user } = request.data
  //     await signIn(token, user)

  //     return true
  //   } catch (err: any) {
  //     console.error(err.response.data.message)
  //     return err.response.data.message
  //   }
  // }

  // const signUp = async (authData: signUpData) => {
  //   try {
  //     const request = await axios.post(`http://${DOMAIN}/user/signUp`, {
  //       ...authData,
  //     })
  //     const { token, user } = request.data
  //     await signIn(token, user)

  //     return true
  //   } catch (err: any) {
  //     console.error(err.response.data.message)
  //     return err.response.data.message
  //   }
  // }

  // const signOut = async () => {
  //   localStorage.removeItem('token')
  //   await dispatch({ type: 'signOut' })
  // }

  // useEffect(() => {
  //   autoSignIn()
  // }, [])

  const getWords = async () => {
    try {
      return true
    } catch (err: any) {
      return ''
    }
  }

  const addWord = async () => {
    try {
      return true
    } catch (err: any) {
      return ''
    }
  }
  
  const addWords = async () => {
    try {
      return true
    } catch (err: any) {
      return ''
    }
  }
  
  const updateWord = async () => {
    try {
      return true
    } catch (err: any) {
      return ''
    }
  }
  
  const deleteWord = async () => {
    try {
      return true
    } catch (err: any) {
      return ''
    }
  }

  useEffect(() => {
    try {
      if (user.name) {
        getWords()
      }
    } catch (err: any) {
      console.error(err)
    }
  }, [user.name])

  return (
    <UserWordsContext.Provider
      value={{
        userWords: state,
        getWords,
        addWord,
        addWords,
        updateWord,
        deleteWord,
      }}
    >
      {props.children}
    </UserWordsContext.Provider>
  )
}

export default UserWordsProvider
