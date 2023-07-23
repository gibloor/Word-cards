import React, { useContext } from 'react'
import { Formik, Form } from 'formik'
import OutsideClickHandler from 'react-outside-click-handler'
import * as Yup from 'yup'

import { FormType } from '../Header'
import FormikField from 'components/ui/FormikFIeld/FormikField'
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

  const validationSchema = Yup.object().shape({
    name:
      formType === 'signUp'
        ? Yup.string()
            .required('Name is required')
            .min(3, 'Name must be at least 3 characters')
            .max(20, 'Name must be at most 20 characters')
            .matches(/^[a-zA-Z0-9_-]{3,20}$/, 'Invalid name format')
        : Yup.string(),
    email: Yup.string()
      .required('Email is required')
      .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Invalid email format'),
    password: Yup.string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters')
      .max(200, 'Password must be shorter than 200 characters')
      .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
      .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .matches(/\d/, 'Password must contain at least one digit'),
  })

  const onSubmit = async (values: FormValue) => {
    let response: string | boolean = false

    if (formType === 'signIn') {
      response = await handSignIn(values)
    }

    if (formType === 'signUp') {
      response = await signUp(values)
    }

    if (response === true) {
      changeFormType(null)
    } else if (response) {
      console.log(response)
    } else {
      console.error("Authentications does't work correct")
    }
  }

  return (
    <OutsideClickHandler onOutsideClick={() => changeFormType(null)}>
      <div className="sign-form styled-window styled-border">
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
          validationSchema={validationSchema}
          // validate={validate}
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
                <Button
                  text="Submit"
                  disabled={isSubmitting}
                  filled={true}
                  type="text"
                />
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
