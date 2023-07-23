import React from 'react'

import './styles.scss'

type ExerciseDescProps = {
  type: 'Daily' | 'Week' | 'Month'
  wordCount: number
  lastCheck: null | Date
}

const ExerciseDesc = (props: ExerciseDescProps) => {
  const { type, wordCount, lastCheck } = props

  return (
    <div className="exercise-desc">
      <div className="exercise-desc__">
        <span className="exercise-desc__title">{type} check</span>

        <div className="exercise-desc__info">
          <span>Words: {wordCount}</span>
        </div>
      </div>

      <div className="exercise-desc__check">
        {/* If Good - 1 img if not - another */}
        <img src={''} alt={'unchecked' || 'checked'} />
        <div>
          <span className="">Last check:</span>
          <span className="">{lastCheck ? lastCheck.getDate() : 'never'}</span>
        </div>
      </div>
    </div>
  )
}

export default ExerciseDesc
