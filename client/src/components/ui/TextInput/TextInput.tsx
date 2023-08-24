import React from 'react'

import './styles.scss'

type TextInputProps = {
  onChange: (text: string) => void
  value: string
  className?: string
  disabled?: boolean
  onKeyDown?: () => void
}

const TextInput = (props: TextInputProps) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (props.onKeyDown && e.key === 'Enter') {
      props.onKeyDown()
    }
  }

  return (
    <input
      type="text"
      value={props.value}
      onChange={(e) => props.onChange(e.target.value)}
      className={`text-input ${props.className ? props.className : ''}`}
      disabled={props.disabled}
      onKeyDown={handleKeyDown}
      autoFocus
    />
  )
}

export default TextInput
