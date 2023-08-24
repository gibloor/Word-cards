import React, { FocusEvent, useState } from 'react'
import { ErrorMessage, Field, useFormikContext } from 'formik'

import { Package } from 'components/pages/OwnWords/MainMenu/AddPack/AddPack'

import './styles.scss'

type FormikFieldProps = {
  type:
    | 'text'
    | 'textarea'
    | 'email'
    | 'password'
    | 'number'
    | 'checkbox'
    | 'radio'
    | 'select'
    | 'file'
    | 'date'
    | 'time'
    | 'range'
    | 'color'
  name: string
  label?: string
  className?: string
  children?: React.ReactNode
  hideTextError?: boolean
  errorBorder?: boolean
  selectValue?: any[]
  onChange?: (text: string) => void
}

const FormikField = (props: FormikFieldProps) => {
  const {
    label,
    type,
    name,
    className,
    children,
    hideTextError,
    errorBorder,
    selectValue,
    onChange,
  } = props

  const [showSelector, setShowSelector] = useState(false)

  const formik = useFormikContext<Package>()

  const hideSelector = (e: FocusEvent<HTMLInputElement>) =>
    setTimeout(() => {
      if (e.relatedTarget?.tagName !== 'LI' && e.relatedTarget?.id !== name) {
        setShowSelector(false)
      }
    }, 100)

  return (
    <div
      className={`formik-field ${className || ''}`}
      onBlur={selectValue ? hideSelector : () => {}}
    >
      {label && (
        <label className="formik-field__label text_20" htmlFor={name}>
          {label}
        </label>
      )}

      {selectValue && onChange ? (
        <>
          <Field
            type={type}
            id={name}
            name={name}
            className={`formik-field__field ${
              errorBorder ? 'error-field' : ''
            }`}
            onClick={(e: any) => {
              setShowSelector(true)
              onChange(e.target.value)
            }}
            onFocus={(e: any) => {
              setShowSelector(true)
              onChange(e.target.value)
            }}
            onChange={(e: any) => {
              formik.handleChange(e)
              onChange(e.target.value)
            }}
            autoComplete="off"
          />
          {selectValue && selectValue.length && showSelector ? (
            <ul className="formik-field__selector">
              {selectValue.map((value) => (
                <li
                  key={value}
                  onClick={() => {
                    formik.setFieldValue(name, value)
                    setShowSelector(false)
                  }}
                  className="formik-field__selector_option"
                  tabIndex={0}
                >
                  {value}
                </li>
              ))}
            </ul>
          ) : null}
        </>
      ) : (
        <Field
          type={type}
          id={name}
          name={name}
          className={`formik-field__field ${errorBorder ? 'error-field' : ''}`}
          as={children ? 'select' : 'input'}
        >
          {children}
        </Field>
      )}

      {!hideTextError && (
        <ErrorMessage
          name={name}
          component="div"
          className="formik-field__error-message"
        />
      )}
    </div>
  )
}

export default FormikField
