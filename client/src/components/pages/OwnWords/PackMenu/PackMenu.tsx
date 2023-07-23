import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import ExerciseDesc from './ExerciseDesc/ExerciseDesc'
import { UserPacksContext } from 'components/Layout/contexts/UserPacksProvider/UserPacksProvider'

import './styles.scss'
import Button from 'components/ui/Button/Button'

const PackMenu = () => {
  const { packId } = useParams()
  const { userPacks } = useContext(UserPacksContext)

  const [packIndex, setPackIndex] = useState<null | number>(null)

  useEffect(() => {
    userPacks.packs.forEach((pack, index) => {
      pack.id === packId && setPackIndex(index)
    })
  }, [userPacks.packs.length, packId])

  return (
    <div className="packmenu">
      {packIndex !== null ? (
        (() => {
          const pack = userPacks.packs[packIndex]

          return (
            <>
              <div className="packmenu__main-info">
                <span className="text_20">Pack name: {pack.name}</span>

                <span className="text_20">Language: {pack.language}</span>
              </div>

              <div>
                <ExerciseDesc
                  type="Daily"
                  wordCount={
                    pack.words.filter((word) => word.сonfirmations < 2).length
                  }
                  lastCheck={pack.dailyCheck}
                />
                <ExerciseDesc
                  type="Week"
                  wordCount={
                    pack.words.filter(
                      (word) =>
                        word.сonfirmations > 2 && word.сonfirmations < 4,
                    ).length
                  }
                  lastCheck={pack.weekCheck}
                />
                <ExerciseDesc
                  type="Month"
                  wordCount={
                    pack.words.filter((word) => word.сonfirmations > 4).length
                  }
                  lastCheck={pack.monthCheck}
                />
              </div>

              <div className="packmenu__buttons">
                <Button type="text" text="Make changes in pack" filled={true} />
                <Button type="text" text="Delete pack" filled={true} />
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
