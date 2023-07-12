import React from 'react'

import './styles.scss'

type ButtonProps = {
  text: string
  onClick?: () => void
  className?: string
  disabled?: boolean
  filled?: boolean
}

const Button = (props: ButtonProps) => {
  return (
    <button
      className={`button ${props.filled ? 'button__filled' : ''} ${
        props.className ? props.className : ''
      }`}
      onClick={() => (props.onClick ? props.onClick() : undefined)}
      disabled={props.disabled}
      type="submit"
    >
      {props.text}
    </button>
  )
}

export default Button
