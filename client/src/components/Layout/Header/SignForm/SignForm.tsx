import React, { useContext } from 'react'
import { Formik, Form } from 'formik'
import OutsideClickHandler from 'react-outside-click-handler'

import { FormType } from '../Header'
import FormikField from './FormikFIeld/FormikField'
import Button from 'components/ui/Button/Button'
import { UserContext } from 'components/Layout/contexts/UserProvider/UserProvider'

import './styles.scss'

type SignFormProps = {
  formType: FormType
  changeFormType: (formType: FormType) => void
}

type FormValue = {
  name: string
  email: string
  password: string
}

const SignForm = (props: SignFormProps) => {
  const { formType, changeFormType } = props
  const { signUp, handSignIn } = useContext(UserContext)

  const reverseForm = formType === 'signIn' ? 'signUp' : 'signIn'

  const nameRegex = /^[a-zA-Z0-9]{3,20}$/
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  const validate = (values: FormValue) => {
    const errors: Partial<FormValue> = {}

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
  }

  const onSubmit = async (values: FormValue) => {
    let response: string | boolean = false

    if (formType === 'signIn') {
      response = await handSignIn(values)
    }

    if (formType === 'signUp') {
      response =await signUp(values)
    }

    if (response === true) {
      changeFormType(null)
    } else if (response) {
      console.log(response)
    } else {
      console.error('Authentications does\'t work correct')
    }
  }

  return (
    <OutsideClickHandler onOutsideClick={() => changeFormType(null)}>
      <div className="sign-form">
        <div className="sign-form__close-button_container">
          <span
            className="sign-form__close-button"
            tabIndex={0}
            onClick={() => changeFormType(null)}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                changeFormType(null)
              }
            }}
          >
            X
          </span>
        </div>
        <Formik
          initialValues={{
            name: '',
            email: '',
            password: '',
          }}
          validate={validate}
          onSubmit={onSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="sign-form__form">
              <div className="sign-form__fields">
                {formType === 'signUp' && (
                  <FormikField label="Name" type="text" name="name" />
                )}
                <FormikField label="Email" type="email" name="email" />
                <FormikField label="Password" type="password" name="password" />
              </div>
              <div className="sign-form__buttons">
                <Button text="Submit" disabled={isSubmitting} filled={true} />
                <span
                  onClick={() => changeFormType(reverseForm)}
                  tabIndex={0}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter') {
                      changeFormType(reverseForm)
                    }
                  }}
                >
                  {reverseForm}
                </span>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </OutsideClickHandler>
  )
}

export default SignForm
