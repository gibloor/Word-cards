import React from 'react'
import { ErrorMessage, FastField } from 'formik'

import './styles.scss'

type FormikFieldProps = {
  label: string
  type: string
  name: string
  className?: string
}

const FormikField = (props: FormikFieldProps) => {
  const { label, type, name, className } = props

  return (
    <div className={`formik-field ${className ? className : ''}`}>
      <label className="formik-field__label text_20" htmlFor={name}>
        {label}
      </label>
      <FastField
        type={type}
        id={name}
        name={name}
        className="formik-field__field"
      />
      <ErrorMessage
        name={name}
        component="div"
        className="formik-field__error-message"
      />
    </div>
  )
}

export default FormikField
