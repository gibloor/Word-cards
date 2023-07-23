import React from 'react'

import Button from 'components/ui/Button/Button'
import { NEW_PACKAGE } from '../OwnWords'

import arrow from './arrow.gif'

import './styles.scss'

type EmptinessMenuProps = {
  changeActivePackage: (newPackId: string) => void
}

const EmptinessMenu = (props: EmptinessMenuProps) => {
  return (
    <div className="emptiness-menu">
      <div className="emptiness-menu__container">
        <img
          src={arrow}
          alt="arrow"
          className="emptiness-menu__arrow emptiness-menu__left-arrow"
        />
        <Button
          text="Add package"
          onClick={() => props.changeActivePackage(NEW_PACKAGE)}
          filled={true}
          type="text"
        />
        <img
          src={arrow}
          alt="arrow"
          className="emptiness-menu__arrow emptiness-menu__right-arrow"
        />
      </div>

      <span className="emptiness-menu__text">
        You don&apos;t have a single package.
      </span>
    </div>
  )
}

export default EmptinessMenu
