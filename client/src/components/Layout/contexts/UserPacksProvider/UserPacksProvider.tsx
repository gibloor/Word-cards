import React, { createContext, useReducer, useContext, useEffect } from 'react'
import axios from 'axios'

import { UserContext } from '../UserProvider/UserProvider'
import { FormValue } from 'components/pages/OwnWords/OwnWords'

type UserPacksProviderProps = {
  children: React.ReactNode
}

type Word = {
  сonfirmations: number
  word: string
}

type Pack = {
  id: string
  name: string
  language: string
  dailyCheck: null | Date
  weekCheck: null | Date
  allCheck: null | Date
  words: Word[]
}

type Action = {
  type: 'getPacks' | 'addPack'
  packs?: Pack[]
  pack?: Pack
  error?: string
}

type State = {
  packs: Pack[]
  error: string
  pending: boolean
}

export const initialState: State = {
  packs: [],
  error: '',
  pending: false,
}

type UserPacksContextType = {
  userPacks: State
  createPack: (pack: FormValue) => Promise<string>
  getOwnPacks: () => Promise<true | string>
}

export const UserPacksContext = createContext<UserPacksContextType>({
  userPacks: { ...initialState },
  createPack: async (pack: FormValue) => {
    return ''
  },
  getOwnPacks: async () => {
    return true
  },
})

const DOMAIN = process.env.REACT_APP_DOMAIN || 'localhost:3001'

const UserPacksProvider = (props: UserPacksProviderProps) => {
  const { user } = useContext(UserContext)

  const reducer = (state: State, action: Action) => {
    const newState = { ...state }

    switch (action.type) {
      case 'getPacks':
        action.packs
          ? (newState.packs = [...action.packs])
          : (newState.error = 'Missed packs')
        break

      case 'addPack':
        action.pack
          ? (newState.packs = [action.pack, ...newState.packs])
          : (newState.error = 'Missed pack')
        break

      default:
        throw new Error()
    }

    return newState
  }

  const [state, dispatch] = useReducer(reducer, initialState)

  const createPack = async (pack: FormValue) => {
    try {
      const localToken = (await localStorage.getItem('token')) || ''

      const response = await axios.post(
        `http://${DOMAIN}/pack/create`,
        { ...pack },
        {
          headers: {
            Authorization: `Bearer ${localToken}`,
          },
        },
      )

      dispatch({ type: 'addPack', pack: response.data })

      return response.data.id
    } catch (err: any) {
      return err
    }
  }

  const getOwnPacks = async () => {
    try {
      const localToken = (await localStorage.getItem('token')) || ''

      const response = await axios.get(`http://${DOMAIN}/pack/getOwnPacks`, {
        headers: {
          Authorization: `Bearer ${localToken}`,
        },
      })

      dispatch({ type: 'getPacks', packs: response.data.packs })
      return true
    } catch (err: any) {
      return err
    }
  }

  useEffect(() => {
    if (user.name) {
      getOwnPacks()
    }
  }, [user.name])

  return (
    <UserPacksContext.Provider
      value={{
        userPacks: state,
        createPack,
        getOwnPacks,
      }}
    >
      {props.children}
    </UserPacksContext.Provider>
  )
}

export default UserPacksProvider
