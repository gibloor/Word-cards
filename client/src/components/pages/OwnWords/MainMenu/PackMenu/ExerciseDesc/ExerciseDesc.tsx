import React from 'react'
import { Link } from 'react-router-dom'

import dailyCompleted from './images/dailyCompleted.png'
import dailyNotCompleted from './images/dailyNotCompleted.png'
import weeklyCompleted from './images/weeklyCompleted.png'
import weeklyNotCompleted from './images/weeklyNotCompleted.png'
import monthlyCompleted from './images/monthlyCompleted.png'
import monthlyNotCompleted from './images/monthlyNotCompleted.png'

import './styles.scss'

type ExerciseType = 'daily' | 'weekly' | 'monthly'

type ExerciseDescProps = {
  type: ExerciseType
  wordCount: number
  lastCheck: null | Date
}

const ExerciseDesc = (props: ExerciseDescProps) => {
  const { type, wordCount, lastCheck } = props

  const checkTimeElapsed = () => {
    if (lastCheck) {
      const timeDiff = new Date().getTime() - lastCheck.getTime()

      switch (type) {
        case 'daily':
          return timeDiff < 57600000
        case 'weekly':
          return timeDiff < 561600000
        case 'monthly':
          return timeDiff < 2505600000
        default:
          return false
      }
    } else {
      return false
    }
  }

  const getImage = () => {
    const timeElapsed = checkTimeElapsed().toString()

    switch (`${type}-${timeElapsed}`) {
      case 'daily-true':
        return dailyCompleted

      case 'daily-false':
        return dailyNotCompleted

      case 'weekly-true':
        return weeklyCompleted

      case 'weekly-false':
        return weeklyNotCompleted

      case 'monthly-true':
        return monthlyCompleted

      case 'monthly-false':
        return monthlyNotCompleted
    }
  }

  return (
    <Link to={`./${type.toLocaleLowerCase()}`} className="exercise-desc">
      <div className="exercise-desc__text">
        <span className="exercise-desc__title text_20">{type} check</span>
        <span
          className={`exercise-desc__indicator ${
            checkTimeElapsed()
              ? 'exercise-desc__completed'
              : 'exercise-desc__uncompleted'
          }`}
        >
          {checkTimeElapsed() ? 'Completed' : 'Uncompleted'}
        </span>
      </div>
      <img
        className="exercise-desc__picture"
        src={getImage()}
        alt={'unchecked' || 'checked'}
      />
      <div className="exercise-desc__info">
        <span>Words: {wordCount}</span>
        <span className="">
          Last check: {lastCheck ? lastCheck.getDate() : 'never'}
        </span>
      </div>
    </Link>
  )
}

export default ExerciseDesc
