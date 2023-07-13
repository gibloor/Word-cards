import React, { useContext } from 'react'
import { UserWordsContext } from 'components/Layout/contexts/UserWordsProvider/UserWordsProvider'

import './styles.scss'
import Button from 'components/ui/Button/Button'

const OwnWords = () => {
  // const { userWords } = useContext(UserWordsContext)

  {/* 3 types of tests */}
  const languagesPacks = [
    {
      title: 'Daily words',
    },
    {
      title: 'Week words',
    },
    {
      title: 'All words',
    },
  ]

  const userWords = {
    words: [
      {
        language: 'eng'
      },
      {
        language: 'ru'
      },
    ]
  }

  return (
    <div className="own-words">
      {/* {
        userWords.words.map(words => (
          <div>{words.language}</div>
        ))
      } */}

      <div className="own-words__menu">
        <Button
          text='Add language'
          onClick={() => {}}
          filled={true}
        />
        {userWords.words.map(words => (
          <Button
            key={words.language}
            text={words.language}
            onClick={() => {}}
            filled={true}
          />
        ))}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        
        <p>button Add language</p>

        <p>|</p>

        <p>else </p>

        <p>|</p>

        <p>Languages...</p>
        <p>&</p>
        <p>button Add language</p>

        <p>|</p>

        <p>1. click on language = languagesPacks - column</p>

        <p>|</p>

        <p> 2. button Add language - menu with choosing language. menu with hand adding and excel adding</p>

      </div>

      {/* <div>
        {languagesPacks.map((pack) => (
          <Link key={pack.id} to={`${pack.id}`}>
            <span>{pack.title}</span>
            <span>{`${pack.firstLanguage}/${pack.secondLanguage}`}</span>
          </Link>
        ))}
      </div> */}
    </div>
  )
}

export default OwnWords
