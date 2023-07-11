import React from 'react'
import { Formik, Form } from 'formik'
import OutsideClickHandler from 'react-outside-click-handler'

import { FormType } from '../Header'
import FormikField from './FormikFIeld/FormikField'
import Button from '../../../ui/Button/Button'

import './styles.scss'

type SignFormProps = {
  formType: FormType
  changeFormType: (formType: FormType) => void
}

type FormErrors = {
  name?: string
  email?: string
  password?: string
}

const SignForm = (props: SignFormProps) => {
  const { formType } = props

  const nameRegex = /^[a-zA-Z0-9]{3,20}$/
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  return (
    <OutsideClickHandler onOutsideClick={() => props.changeFormType(null)}>
      <div className="sign-form">
        <Formik
          initialValues={{
            name: '',
            email: '',
            password: '',
          }}
          validate={(values) => {
            const errors: FormErrors = {}

            if (formType === 'signUp') {
              if (!values.name) {
                errors.name = 'Name is required'
              } else if (!nameRegex.test(values.name)) {
                errors.name = 'Invalid name format'
              }
            }

            if (!values.email) {
              errors.email = 'Email is required'
            } else if (!emailRegex.test(values.email)) {
              errors.email = 'Invalid email format'
            }

            if (!values.password) {
              errors.password = 'Password is required'
            } else if (!passwordRegex.test(values.password)) {
              errors.password =
                'Password must have 6+ chars, 1 uppercase, 1 lowercase, 1 digit'
            }

            return Object.keys(errors).length === 0 ? {} : errors
          }}
          onSubmit={(values) => {
            console.log(values)
          }}
        >
          {({ isSubmitting }) => (
            <Form className="sign-form__form">
              <div className="sign-form__fields">
                {formType === 'signUp' && (
                  <FormikField label="Login" type="text" name="name" />
                )}
                <FormikField label="Email" type="email" name="email" />
                <FormikField label="Password" type="password" name="password" />
              </div>
              <Button text="Submit" disabled={isSubmitting} filled={true} />
            </Form>
          )}
        </Formik>
      </div>
    </OutsideClickHandler>
  )
}

export default SignForm
