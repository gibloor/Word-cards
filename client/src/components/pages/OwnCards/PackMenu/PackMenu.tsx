import React from 'react'
import { Link } from 'react-router-dom'

const PackMenu = () => {

  return (
    <div>
      <Link to="daily-cards">
        <span>
          Daily cards
        </span>
      </Link>

      <div>
        Week cards
      </div>

      <div>
        All cards
      </div>
    </div>
  )
}

export default PackMenu