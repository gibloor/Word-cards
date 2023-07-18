import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Formik, Form, FieldArray, ErrorMessage, Field, FieldArrayRenderProps } from 'formik'
import * as Yup from 'yup'

import { UserPacksContext } from 'components/Layout/contexts/UserPacksProvider/UserPacksProvider'
import Button from 'components/ui/Button/Button'
import FormikField from 'components/ui/FormikFIeld/FormikField'

import arrow from './arrow.gif'

import './styles.scss'

const EXCEPTION_NAME = 'newPackage'

type FormValue = {
  name: string
  words: string[]
  language: 'choose' | 'eng' | 'pl'
}

const OwnWords = () => {
  const navigate = useNavigate()

  const { userPacks } = useContext(UserPacksContext)
  const { packName } = useParams()

  const changeActivePackage = (packageName: string | null) => {
    navigate(`/own-words/${packageName}`)
  }

  const validationSchema = Yup.object({
    name: Yup.string()
      .required('Name is required')
      .min(3, 'Name must be at least 3 characters')
      .max(20, 'Name must be at most 20 characters')
      .matches(/^[a-zA-Z0-9_-\s]{3,20}$/, 'Invalid name format')
      .notOneOf([EXCEPTION_NAME], `Name cannot be ${EXCEPTION_NAME}`),
    words: Yup.array().of(
      Yup.string()
        .required('Word is required')
        .matches(/^[A-Za-z'\s]+$/, 'Word must contain only letters and spaces')
        .min(2, 'Word must be at least 2 characters')
        .max(20, 'Word must be at most 20 characters')
    ).min(1, 'At least one word is required'),
    language: Yup.string().required('Language is required'),
  })

  const onSubmit = async (values: FormValue) => {

  }


  return (
    <div className="own-words styled-background">
      {packName || userPacks.packs.length ? (
        <div className="own-words__container styled-border">
          
          <div className="own-words__container_buttons styled-border-image">
            <Button
              text='Add package'
              onClick={() => changeActivePackage(EXCEPTION_NAME)}
              filled={true}
              type='text'
            />

            {userPacks.packs.map(pack => (
              <Button text={pack.name} type='text' />
            ))}
          </div>

          <div className="own-words__menu">
            {packName === EXCEPTION_NAME ? (
              <div>
                <Formik
                  initialValues={{
                    name: '',
                    words: [],
                    language: 'choose',
                  }}
                  validationSchema={validationSchema}
                  onSubmit={onSubmit}
                >
                  {({ isSubmitting }) => (
                    <Form>
                      <FormikField
                        label='Package name'
                        name='name'
                        type='text'
                        className='own-words__menu_package-name'
                      />
                      <div>
                        <FieldArray name="words">
                          {({ form, push, remove }: FieldArrayRenderProps) => (
                            <>
                              <div className='own-words__menu_word-fields'>
                                {form.values.words.map((word: string, index: number) => (
                                  <div key={index} className='own-words__menu_word-field_container'>
                                    <Field
                                      type="text"
                                      name={`words[${index}]`}
                                      className={`own-words__menu_word-field ${form.errors.words && (form.errors.words as string[])[index] ? 'error-field' : ''}`}
                                    />
                                    {/* <div>
                                      <ErrorMessage
                                        name={`words[${index}]`}
                                        component="div"
                                      />
                                    </div> */}
                                    <Button onClick={() => remove(index)} type='delete' className='own-words__menu_delete-button' />
                                  </div>
                                ))}
                              </div>
                              
                              <button type="button" onClick={() => push('')}>
                                Add Word
                              </button>
                              
                              {form.errors.words === 'At least one word is required' && (
                                <div className="error-field">
                                  At least one word is required
                                </div>
                              )}
                            </>
                          )}
                        </FieldArray>
                      </div>

                      <Button text="Submit" disabled={isSubmitting} filled={true} type='text' />
                    </Form>
                  )}
                </Formik>
              </div>
            ) : packName ? (
                <div>
                  Work with pack
                </div>
            ) : (<></>)}
          </div>

        </div>
      ) : (
        <div className="own-words__emptiness-menu">
          <div className="own-words__emptiness-menu_container">
            <img src={arrow} alt='arrow' className="own-words__emptiness-menu_arrow own-words__emptiness-menu_left-arrow" />
            <Button
              text='Add package'
              onClick={() => changeActivePackage(EXCEPTION_NAME)}
              filled={true}
              type='text'
              // className="own-words__emptiness-menu_button"
            />
            <img src={arrow} alt='arrow' className="own-words__emptiness-menu_arrow own-words__emptiness-menu_right-arrow" />
          </div>

          <span  className="own-words__emptiness-menu_text">
            You don't have a single package.
          </span>
        </div>
      )}
      

      



    </div>
  )
}

export default OwnWords
