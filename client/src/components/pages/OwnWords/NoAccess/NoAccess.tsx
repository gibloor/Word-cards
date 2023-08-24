import React from 'react'

import noWay from './no-way.gif'

import './styles.scss'

const NoAccess = () => {
  return (
    <div className="no-access">
      <div className="no-access__container">
        <img
          src={noWay}
          alt="arrow"
          className="no-access__arrow no-access__left-arrow"
        />
        <span className="text_20 no-access__text">
          You&apos;re not authorized.
          <br /> Try fixing it!
        </span>
        <img
          src={noWay}
          alt="arrow"
          className="no-access__arrow no-access__right-arrow"
        />
      </div>
    </div>
  )
}

export default NoAccess
