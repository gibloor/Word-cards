import React, { useState } from 'react'
import OutsideClickHandler from 'react-outside-click-handler'

import arrow from './arrow.svg'

import './styles.scss'

type Option = {
  title: string
  value: string
}

type SelectorProps = {
  options: Option[]
  onSelect: (value: string) => void
  exception?: string
  defaultValue?: string
}

const Selector = (props: SelectorProps) => {
  const { defaultValue, options, onSelect } = props

  const [selectorValue, setSelectorValue] = useState(defaultValue || 'Select')
  const [showOptions, setShowOptions] = useState(false)

  const onBlur = (e: React.FocusEvent<HTMLDivElement | HTMLLIElement>) => {
    if (e.relatedTarget?.className !== 'selector__option') {
      setShowOptions(false)
    }
  }

  return (
    <OutsideClickHandler
      onOutsideClick={() => showOptions && setShowOptions(false)}
    >
      <div className="selector">
        <div
          className="selector__value"
          onClick={() => setShowOptions(!showOptions)}
          tabIndex={0}
          onBlur={onBlur}
          onKeyDown={(e) =>
            e.key === 'Enter' ? setShowOptions(!showOptions) : null
          }
        >
          <span>{selectorValue}</span>
          <img
            alt="arrow"
            src={arrow}
            className={`selector__arrow ${
              showOptions ? 'selector__arrow_rotate' : ''
            }`}
          />
        </div>

        {showOptions && (
          <ul className="selector__list">
            {options.map((option) =>
              !props.exception || props.exception !== option.value ? (
                <li
                  key={option.value}
                  onClick={() => {
                    setSelectorValue(option.value)
                    onSelect(option.value)
                  }}
                  onBlur={onBlur}
                  className="selector__option"
                  tabIndex={0}
                >
                  {option.title}
                </li>
              ) : null,
            )}
          </ul>
        )}
      </div>
    </OutsideClickHandler>
  )
}

export default Selector
