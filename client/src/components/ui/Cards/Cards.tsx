import React, { useState } from 'react'
import { useParams } from 'react-router-dom'

import Button from '../Button/Button'
import TextInput from '../TextInput/TextInput'

import './styles.scss'

export type Card = {
  firstLang: string
  secondLang: string
  status: 'learned' | 'passed' | 'notPassed'
  passedTimes: number
}

type CardsProps = {
  // cards: Card[]
  // reverse: boolean
}

const Cards = (props: CardsProps) => {
  const { reverse } = useParams()
  const cards: Card[] = [] // get from context
  // const reverse = true // get from url

  const [activeCard, setActiveCard] = useState(0)
  const [answer, setAnswer] = useState('')
  const [repeatCount, setRepeatCount] = useState(0)
  const [correctAnswer, setCorrectAnswer] = useState<boolean>(false)
  const [answered, setAnswered] = useState(false)

  const onSubmit = () => {
    const word = reverse
      ? cards[activeCard].firstLang
      : cards[activeCard].secondLang

    if (answer === word) {
      setCorrectAnswer(true)
      if (repeatCount === 0) {
        cards[activeCard].passedTimes += 1 // TODO change on correct set with dispatch
      }
    } else {
      setCorrectAnswer(false)
    }

    setRepeatCount(repeatCount + 1)
    setAnswered(true)
  }

  const nextCard = () => {
    setAnswered(false)
    setAnswer('')
    setActiveCard(activeCard + 1)
  }

  return (
    <div className="cards">
      <div className="cards__card_container">
        {cards.map((card, index) => (
          <div
            key={card.firstLang}
            className={`cards__card ${
              activeCard === index ? 'cards__card-show' : 'cards__card-hide'
            } ${reverse ? 'cards__card-reverse' : ''}`}
          >
            <span
              className={`cards__card_word
                ${reverse && !answered ? 'cards__card_word-hide' : ''}
                ${
                  reverse && answered
                    ? correctAnswer
                      ? 'cards__card_word_correct'
                      : 'cards__card_word_wrong'
                    : ''
                }
              `}
            >
              {card.firstLang}
            </span>
            <span>/</span>
            <span
              className={`cards__card_word
                ${!reverse && !answered ? 'cards__card_word-hide' : ''}
                ${
                  !reverse && answered
                    ? correctAnswer
                      ? 'cards__card_word_correct'
                      : 'cards__card_word_wrong'
                    : ''
                }
              `}
            >
              {card.secondLang}
            </span>
          </div>
        ))}

        <TextInput
          value={answer}
          onChange={setAnswer}
          className="cards__input"
        />

        <div>
          <Button
            text="Submit"
            onClick={onSubmit}
            disabled={answered}
            type="text"
          />
          <Button
            text="Next"
            onClick={nextCard}
            disabled={!answered}
            type="text"
          />
        </div>
      </div>
    </div>
  )
}

export default Cards
