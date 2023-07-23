import React, { useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { UserPacksContext } from 'components/Layout/contexts/UserPacksProvider/UserPacksProvider'
import Button from 'components/ui/Button/Button'
import AddPack from './AddPack/AddPack'
import PackMenu from './PackMenu/PackMenu'

import './styles.scss'
import EmptinessMenu from './EmptinessMenu/EmptinessMenu'

export const NEW_PACKAGE = 'newPackage'

const OwnWords = () => {
  const navigate = useNavigate()
  const { userPacks } = useContext(UserPacksContext)
  const { packId } = useParams()

  const changeActivePackage = (packageId: string) => {
    navigate(`/own-words/${packageId}`)
  }

  return (
    <div className="own-words styled-background">
      {packId || userPacks.packs.length ? (
        <div className="own-words__container styled-border">
          <div className="own-words__container_buttons styled-border-image">
            <Button
              text="Add package"
              onClick={() => changeActivePackage(NEW_PACKAGE)}
              filled={true}
              type="text"
            />

            {userPacks.packs.map((pack) => (
              <Button
                key={pack.id}
                text={pack.name}
                type="text"
                onClick={() => changeActivePackage(pack.id)}
              />
            ))}
          </div>

          {packId === NEW_PACKAGE ? (
            <AddPack changeActivePackage={changeActivePackage} />
          ) : packId ? (
            <PackMenu />
          ) : (
            <></>
          )}
        </div>
      ) : (
        <EmptinessMenu changeActivePackage={changeActivePackage} />
      )}
    </div>
  )
}

export default OwnWords
