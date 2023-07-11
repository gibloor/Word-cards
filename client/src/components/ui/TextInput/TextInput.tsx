import React from 'react'

type TextInputProps = {
  onChange: (text: string) => void
  value: string
  className?: string
}

const TextInput = (props: TextInputProps) => {
  return (
    <input
      type="text"
      value={props.value}
      onChange={(e) => props.onChange(e.target.value)}
      className={`${props.className ? props.className : ''}`}
    />
  )
}

export default TextInput
