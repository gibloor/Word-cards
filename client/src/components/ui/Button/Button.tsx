import React from 'react'

import './styles.scss'

type ButtonProps = {
  text: string,
  onClick: () => void
  className?: string
  disabled?: boolean
}

const Button = (props: ButtonProps) => {

  return (
    <button
      className={`button ${props.className}`}
      onClick={() => props.onClick()}
      disabled={props.disabled}
    >
      {props.text}
    </button>
  )
}

export default Button