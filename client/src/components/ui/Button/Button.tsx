import React from 'react'

import trash from './trash.svg'
import plus from './plus.svg'

import './styles.scss'

type ButtonProps = {
  type: 'text' | 'delete' | 'add'
  onClick?: () => void
  className?: string
  disabled?: boolean
  filled?: boolean
  text?: string
}

const Button = (props: ButtonProps) => {
  return (
    <button
      className={`${props.className ? props.className : ''} ${
        props.type === 'text'
          ? `text-button ${props.filled ? 'text-button__filled' : ''}`
          : `image-button ${
              props.type === 'add'
                ? 'image-button__add'
                : 'image-button__delete'
            }`
      }`}
      onClick={() => (props.onClick ? props.onClick() : undefined)}
      disabled={props.disabled}
      type={`${props.type === 'text' ? 'submit' : 'button'}`}
    >
      {props.type === 'text' ? (
        props.text
      ) : (
        <img
          src={props.type === 'add' ? plus : trash}
          className="image-button__picture"
        />
      )}
    </button>
  )
}

export default Button
