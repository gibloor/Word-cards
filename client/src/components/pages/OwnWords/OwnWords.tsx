import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

import { UserPacksContext } from 'components/Layout/contexts/UserPacksProvider/UserPacksProvider'
import Button from 'components/ui/Button/Button'

import arrow from './arrow.gif'

import './styles.scss'

const EXCEPTION_NAME = 'newPackage'

const OwnWords = () => {
  const navigate = useNavigate()

  const { userPacks } = useContext(UserPacksContext)
  const { packName } = useParams()

  const changeActivePackage = (packageName: string | null) => {
    navigate(`/own-words/${packageName}`)
  }

  return (
    <div className="own-words styled-background">
      {/* {
        userWords.words.map(words => (
          <div>{words.language}</div>
        ))
      } */}
      {packName || userPacks.packs.length ? (
        <div className="own-words__main-menu styled-border">
          
          <div className="own-words__main-menu_buttons">
            <Button
              text='Add package'
              onClick={() => changeActivePackage(EXCEPTION_NAME)}
              filled={true}
            />

            {userPacks.packs.map(pack => (
              <Button text={pack.name} />
            ))}
          </div>

          <div>
            {EXCEPTION_NAME}
            <div> PackName or input with PackName </div>

            <div>
              2 types of menu
            </div>
          </div>

        </div>
      ) : (
        <div className="own-words__emptiness-menu">
          <div className="own-words__emptiness-menu_container">
            <img src={arrow} alt='arrow' className="own-words__emptiness-menu_arrow own-words__emptiness-menu_left-arrow" />
            <Button
              text='Add package'
              onClick={() => changeActivePackage(EXCEPTION_NAME)}
              filled={true}
              // className="own-words__emptiness-menu_button"
            />
            <img src={arrow} alt='arrow' className="own-words__emptiness-menu_arrow own-words__emptiness-menu_right-arrow" />
          </div>

          <span  className="own-words__emptiness-menu_text">
            You don't have a single package.
          </span>
        </div>
      )}
      

      



    </div>
  )
}

export default OwnWords
