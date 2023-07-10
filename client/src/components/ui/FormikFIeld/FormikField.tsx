import React from 'react'
import { ErrorMessage, Field } from 'formik'

import './styles.scss'

type FormikFieldProps = {
  label: string,
  type: string,
  name: string,
}

const FormikField = (props: FormikFieldProps) => {
  const { label, type, name } = props

  return (
    <div className='formik-field'>
      <label className='formik-field__label' htmlFor={name}>
        {label}
      </label>
      <Field type={type} id={name} name={name} className='formik-field__field' />
      <ErrorMessage name={name} component="div" className='formik-field__error-message' />
    </div>
  )
}

export default FormikField