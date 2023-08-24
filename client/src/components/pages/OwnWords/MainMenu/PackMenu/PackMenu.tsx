import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import ExerciseDesc from './ExerciseDesc/ExerciseDesc'
import {
  DAILY_TYPE,
  getExerciseWords,
  MONTHLY_TYPE,
  WEEKLY_TYPE,
} from '../../converters/converters'
import { UserPacksContext } from 'components/Layout/contexts/UserPacksProvider/UserPacksProvider'
import Button from 'components/ui/Button/Button'
import Selector from 'components/ui/Selector/Selector'

import './styles.scss'

type PackMenuProps = {
  changeActivePackage: (newPackId: string) => void
}

const PackMenu = (props: PackMenuProps) => {
  const { packId } = useParams()
  const { userPacks, deletePack } = useContext(UserPacksContext)
  const [packIndex, setPackIndex] = useState<null | number>(null)

  useEffect(() => {
    setPackIndex(userPacks.packs.findIndex((pack) => pack.id === packId))
  }, [userPacks.packs.length, packId])

  const languages = [
    {
      title: 'English',
      value: 'eng',
    },
    {
      title: 'Polish',
      value: 'pl',
    },
    {
      title: 'Spanish',
      value: 'sp',
    },
    {
      title: 'Russian',
      value: 'ru',
    },
  ]

  return (
    <div className="packmenu">
      {packIndex !== null && packIndex >= 0 ? (
        (() => {
          const pack = userPacks.packs[packIndex]
          return (
            <>
              <div className="packmenu__main-info">
                <span className="text_32 packmenu__main-info_pack-name">
                  {pack.name}
                </span>

                <div className="packmenu__languages">
                  <div className="text_20 packmenu__language">
                    <span>Language:</span>
                    <span>{pack.language}</span>
                  </div>

                  <div className="packmenu__translation">
                    <span className="text_20">Translate on:</span>
                    <Selector
                      options={languages}
                      onSelect={() => {}}
                      exception={pack.language}
                    />
                  </div>
                </div>
              </div>

              <div className="packmenu__exercises">
                <ExerciseDesc
                  type="daily"
                  wordCount={getExerciseWords(pack.words, DAILY_TYPE).length}
                  lastCheck={pack.dailyCheck}
                />
                <ExerciseDesc
                  type="weekly"
                  wordCount={getExerciseWords(pack.words, WEEKLY_TYPE).length}
                  lastCheck={pack.weekCheck}
                />
                <ExerciseDesc
                  type="monthly"
                  wordCount={getExerciseWords(pack.words, MONTHLY_TYPE).length}
                  lastCheck={pack.monthCheck}
                />
              </div>

              <div className="packmenu__buttons">
                <Button type="text" text="Make changes in pack" filled={true} />

                <Button
                  type="text"
                  text="Delete pack"
                  filled={true}
                  className="packmenu__delete-button"
                  onClick={() => {
                    deletePack(pack.id, packIndex)
                    props.changeActivePackage('')
                  }}
                />
              </div>
            </>
          )
        })()
      ) : (
        <span>Searching pack</span>
      )}
    </div>
  )
}

export default PackMenu
