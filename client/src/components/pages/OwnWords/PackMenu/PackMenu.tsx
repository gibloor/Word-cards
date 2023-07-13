import React from 'react'
import { Link } from 'react-router-dom'

const PackMenu = () => {
  return (
    <div>
      <Link to="daily-words">
        <span>Daily words</span>
      </Link>

      <div>Week words</div>

      <div>All words</div>
    </div>
  )
}

export default PackMenu
