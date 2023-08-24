import { Word } from 'components/Layout/contexts/UserPacksProvider/UserPacksProvider'

type ExersiceTypes = 'daily' | 'weekly' | 'monthly'

export const DAILY_TYPE = 'daily'
export const WEEKLY_TYPE = 'weekly'
export const MONTHLY_TYPE = 'monthly'

export const isExersiceType = (
  value: string | undefined,
): value is ExersiceTypes => {
  return [DAILY_TYPE, WEEKLY_TYPE, MONTHLY_TYPE].includes(
    value as ExersiceTypes,
  )
}

export const getExerciseWords = (words: Word[], type: ExersiceTypes) => {
  switch (type) {
    case DAILY_TYPE:
      return words.filter((word) => word.сonfirmations < 2)

    case WEEKLY_TYPE:
      return words.filter(
        (word) => word.сonfirmations >= 2 && word.сonfirmations < 4,
      )

    case MONTHLY_TYPE:
      return words.filter((word) => word.сonfirmations >= 4)
  }
}
