import React, { useState, useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import _ from 'lodash'

import Button from 'components/ui/Button/Button'
import TextInput from 'components/ui/TextInput/TextInput'
import {
  ModifiedWord,
  UserPacksContext,
  Word,
} from 'components/Layout/contexts/UserPacksProvider/UserPacksProvider'
import { getExerciseWords, isExersiceType } from '../converters/converters'

import './styles.scss'

const Exercise = () => {
  const { packId, ExerciseType } = useParams()
  const { userPacks, translatePack, updateConfirmations } =
    useContext(UserPacksContext)
  const [words, setWords] = useState<ModifiedWord[]>([])

  const modReqPack = (pack: Word[]) =>
    pack.map((word, index) => ({ word: word.word, index }))

  useEffect(() => {
    ;(async () => {
      const packIndex = userPacks.packs.findIndex((pack) => pack.id === packId)
      if (
        packIndex !== -1 &&
        userPacks.packs[packIndex].words.length &&
        isExersiceType(ExerciseType)
      ) {
        const pack = _.shuffle(
          getExerciseWords(
            userPacks.packs[packIndex].words.slice(0, 20),
            ExerciseType,
          ),
        )
        const words = await translatePack(modReqPack(pack), 'ru')

        if (words !== true) {
          const wordUnpack = await words.flatMap((word) => [
            {
              id: pack[word.index].id,
              word: word.word,
              translation: word.wordT,
              sentence: word.sentenceT,
              сonfirmations: pack[word.index].сonfirmations,
              sessionConfirmation: false,
            },
            {
              id: pack[word.index].id,
              word: word.wordT,
              translation: word.word,
              sentence: word.sentence,
              сonfirmations: pack[word.index].сonfirmations,
              sessionConfirmation: false,
            },
          ])

          await setWords(_.shuffle(wordUnpack))
        }
      }
    })()
  }, [packId, ExerciseType, userPacks.packs.length])

  const [activeCard, setActiveCard] = useState(0)
  const [answer, setAnswer] = useState('')
  const [confirmed, setConfirmed] = useState(false)
  const [runCounter, setRunCounter] = useState(1)

  const onSubmit = () => {
    setTimeout(() => {
      setConfirmed(true)

      if (answer === words[activeCard].translation) {
        words[activeCard].sessionConfirmation = true
      }
    }, 0)
  }

  const nextCard = () => {
    setConfirmed(false)
    setAnswer('')
    setActiveCard(activeCard + 1)
  }

  const nextRound = () => {
    setActiveCard(0)
  }

  useEffect(() => {
    if (words.length && activeCard >= words.length) {
      if (runCounter === 1) {
        updateConfirmations(words.filter((word) => word.sessionConfirmation))
      }

      setRunCounter(runCounter + 1)
      setWords(words.filter((word) => !word.sessionConfirmation))
    }
  }, [activeCard])

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'Enter' && document.activeElement === document.body) {
        if (activeCard > words.length && runCounter < 1) {
          nextRound()
        } else if (confirmed && answer.length) {
          nextCard()
        } else if (answer.length && !confirmed) {
          onSubmit()
        }
      }
    }
    document.addEventListener('keypress', handleKeyPress)

    return () => {
      document.removeEventListener('keypress', handleKeyPress)
    }
  }, [confirmed, answer.length, activeCard, words.length, runCounter])

  return (
    <div className="exercise">
      <div className="exercise__card_container">
        {activeCard < words.length ? (
          <>
            {words.map((word, index) => (
              <div
                key={word.word}
                className={`exercise__card ${
                  activeCard !== index ? 'exercise__hide' : ''
                }`}
              >
                <span className="text_20 exercise__word">{word.word}</span>
                <div className="exercise__separator" />
                {confirmed ? (
                  answer === words[activeCard].translation ? (
                    <span className="exercise__answer_correct text_20">
                      {word.translation}
                    </span>
                  ) : (
                    <>
                      <span className="exercise__answer_wrong text_20">
                        {answer}
                      </span>
                      <span className="text_20">/</span>
                      <span className="exercise__answer_correct text_20">
                        {word.translation}
                      </span>
                    </>
                  )
                ) : (
                  <TextInput
                    value={answer}
                    onChange={setAnswer}
                    className="exercise__input"
                    disabled={confirmed}
                    onKeyDown={answer.length ? onSubmit : undefined}
                  />
                )}
              </div>
            ))}

            {confirmed && <span>{words[activeCard].sentence}</span>}

            <div className="exercise__buttons">
              <Button
                text="Submit"
                onClick={onSubmit}
                disabled={!answer.length || confirmed}
                type="text"
              />
              <Button
                text="Next"
                onClick={nextCard}
                disabled={!confirmed}
                type="text"
              />
            </div>
          </>
        ) : runCounter === 1 ? (
          <div>ChatGPT working</div>
        ) : words.length ? (
          <Button
            text={`Start round: ${runCounter}`}
            onClick={nextRound}
            type="text"
          />
        ) : (
          <span>GG</span>
        )}
      </div>
    </div>
  )
}

export default Exercise
