import React, { createContext, useReducer, useContext, useEffect } from 'react'
import axios from 'axios'

import { UserContext } from '../UserProvider/UserProvider'
import { Package } from 'components/pages/OwnWords/MainMenu/AddPack/AddPack'
import _ from 'lodash'

type UserPacksProviderProps = {
  children: React.ReactNode
}

export type Word = {
  id: string
  сonfirmations: number
  word: string
}

export type ModifiedWord = Word & {
  sentence: string
  translation: string
  sessionConfirmation: boolean
}

type ModifiedReqWord = {
  word: string
  index: number
}

export type ModifiedResWord = ModifiedReqWord & {
  wordT: string
  sentence: string
  sentenceT: string
}

type Pack = {
  id: string
  name: string
  language: string
  secondLanguage: string
  dailyCheck: null | Date
  weekCheck: null | Date
  monthCheck: null | Date
  words: Word[]
}

type Action = {
  type: 'getPacks' | 'addPack' | 'deletePack' | 'changeSecondLang'
  packs?: Pack[]
  pack?: Pack
  language?: string
  id?: string
  index?: number
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
  createPack: (pack: Package) => Promise<string>
  getPacks: () => Promise<true | string>
  deletePack: (id: string, index: number) => Promise<true | string>
  updatePack: () => Promise<true | string>
  changeSecondLang: (language: string, index: number) => void
  translatePack: (
    words: ModifiedReqWord[],
    language: string,
  ) => Promise<ModifiedResWord[] | true>
  updateConfirmations: (words: ModifiedWord[]) => void
}

export const UserPacksContext = createContext<UserPacksContextType>({
  userPacks: { ...initialState },
  createPack: async () => {
    return ''
  },
  getPacks: async () => {
    return true
  },
  deletePack: async () => {
    return true
  },
  updatePack: async () => {
    return true
  },
  changeSecondLang: async () => {
    return true
  },
  translatePack: async () => {
    return true
  },
  updateConfirmations: async () => {},
})

const getToken = async () => (await localStorage.getItem('token')) || ''

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

      case 'deletePack':
        action.id && action.index
          ? newState.packs.splice(action.index, 1)
          : (newState.error = 'Missed id or index')
        break

      case 'changeSecondLang':
        action.language && typeof action.index === 'number'
          ? (newState.packs[action.index].secondLanguage = action.language)
          : (newState.error = 'Missed language or index')
        break

      default:
        throw new Error()
    }

    return newState
  }

  const [state, dispatch] = useReducer(reducer, initialState)

  const createPack = async (pack: Package) => {
    try {
      const token = await getToken()

      const response = await axios.post(
        `http://${DOMAIN}/pack/create`,
        { ...pack },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )

      dispatch({ type: 'addPack', pack: response.data })

      return response.data.id
    } catch (err: any) {
      console.error(err.message)
    }
  }

  const getPacks = async () => {
    try {
      const token = await getToken()

      const response = await axios.get(`http://${DOMAIN}/pack/getOwnPacks`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      dispatch({ type: 'getPacks', packs: response.data.packs })
      return true
    } catch (err: any) {
      return err
    }
  }

  const deletePack = async (id: string, index: number) => {
    try {
      const token = await getToken()

      await axios.delete(`http://${DOMAIN}/pack/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      dispatch({ type: 'deletePack', id, index })

      return true
    } catch (err: any) {
      return err
    }
  }

  const updatePack = async () => {
    return ''
  }

  const changeSecondLang = async (language: string, index: number) => {
    try {
      dispatch({ type: 'changeSecondLang', language, index })
    } catch (err: any) {
      console.error(err.message)
    }
  }

  const translatePack = async (words: ModifiedReqWord[], language: string) => {
    try {
      const response = await axios.post(`http://${DOMAIN}/pack/translate`, {
        words,
        language,
      })

      if (response.data.words) {
        return response.data.words
      }

      // dispatch({ type: 'changeSecondLang', language, index })
    } catch (err: any) {
      console.error(err.message)
    }
  }

  const updateConfirmations = async (words: ModifiedWord[]) => {
    try {
      const token = await getToken()
      const groupdWords = _.groupBy(words, 'id')
      const confirmedIds = Object.keys(groupdWords).filter(
        (key) => groupdWords[key].length > 1,
      )

      await axios.patch(
        `http://${DOMAIN}/pack/update-confirmations`,
        {
          confirmedIds,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
    } catch (err: any) {
      console.error(err.message)
    }
  }

  useEffect(() => {
    if (user.name) {
      getPacks()
    }
  }, [user.name])

  return (
    <UserPacksContext.Provider
      value={{
        userPacks: state,
        createPack,
        getPacks,
        deletePack,
        updatePack,
        changeSecondLang,
        translatePack,
        updateConfirmations,
      }}
    >
      {props.children}
    </UserPacksContext.Provider>
  )
}

export default UserPacksProvider
