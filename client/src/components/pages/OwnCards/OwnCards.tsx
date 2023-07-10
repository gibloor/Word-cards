import React from 'react'
import { Link } from 'react-router-dom'

import './styles.scss'

const OwnCards = () => {

  //Get cards

  const languagesPacks = [
    {
      id: 0,
      title: 'Improtant',
      firstLanguage: 'ru',
      secondLanguage: 'eng',
    },
    {
      id: 1,
      title: 'Improtant to',
      firstLanguage: 'ru',
      secondLanguage: 'pl',
    }
  ]

  return (
    <div className='own-cards'>

      <div>
        {languagesPacks.map(pack => (
          <Link to={`${pack.id}`}>
            <span>
              {pack.title}
            </span>

            <span>
              {`${pack.firstLanguage}/${pack.secondLanguage}`}
            </span>
          </Link>
        ))}
      </div>

    </div>
  )
}

export default OwnCards