import React, { useContext, useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { Formik, Form, FieldArray, FieldArrayRenderProps } from 'formik'
import * as Yup from 'yup'
import { Subject } from 'rxjs'
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators'

import { UserPacksContext } from 'components/Layout/contexts/UserPacksProvider/UserPacksProvider'
import Button from 'components/ui/Button/Button'
import FormikField from 'components/ui/FormikFIeld/FormikField'

import arrow from './arrow.gif'

import './styles.scss'

const NEW_PACKAGE = 'newPackage'

export type FormValue = {
  name: string
  words: string[]
  language: 'eng' | 'pl'
  [key: string]: string | string[]
}

const OwnWords = () => {
  const navigate = useNavigate()
  const { userPacks, createPack } = useContext(UserPacksContext)
  const { packId } = useParams()
  const ref = useRef<HTMLFormElement>(null)
  const [selectValue, setSelectValue] = useState([])
  const searchSubject = new Subject<string>()

  const changeActivePackage = (packageId: string) => {
    navigate(`/own-words/${packageId}`)
  }

  const validationSchema = Yup.object({
    name: Yup.string()
      .required('Name is required')
      .min(3, 'Name must be at least 3 characters')
      .max(20, 'Name must be at most 20 characters')
      .matches(/^[a-zA-Z0-9_-\s]{3,20}$/, 'Invalid name format'),
    words: Yup.array()
      .of(
        Yup.string()
          .required('Word is required')
          .matches(
            /^[A-Za-z'\s]+$/,
            'Word must contain only letters and spaces',
          )
          .min(2, 'Word must be at least 2 characters')
          .max(20, 'Word must be at most 20 characters'),
      )
      .min(1, 'At least one word is required'),
    language: Yup.string().required('Language is required'),
  })

  const onSubmit = async (values: FormValue) => {
    try {
      const newPackId = await createPack(values)
      await changeActivePackage(newPackId)
    } catch (err: any) {
      console.error(err)
    }
  }

  const scrollMenu = () => {
    if (ref.current) {
      ref.current.scrollTop = ref.current.scrollHeight
    }
  }

  const getWords = async (text: string) => {
    if (text.length) {
      searchSubject.next(text)
    } else {
      setSelectValue([])
    }
  }

  useEffect(() => {
    const subscription = searchSubject
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        switchMap((text) =>
          axios.get(`https://api.datamuse.com/words?sp=${text}*`),
        ),
      )
      .subscribe({
        next: (response) => setSelectValue(response.data),
        error: (error) => console.error(error),
      })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  return (
    <div className="own-words styled-background">
      {packId || userPacks.packs.length ? (
        <div className="own-words__container styled-border">
          <div className="own-words__container_buttons styled-border-image">
            <Button
              text="Add package"
              onClick={() => changeActivePackage(NEW_PACKAGE)}
              filled={true}
              type="text"
            />

            {userPacks.packs.map((pack) => (
              <Button
                key={pack.id}
                text={pack.name}
                type="text"
                onClick={() => changeActivePackage(pack.id)}
              />
            ))}
          </div>

          {packId === NEW_PACKAGE ? (
            <Formik
              initialValues={{
                name: '',
                words: [],
                language: 'eng',
              }}
              validationSchema={validationSchema}
              onSubmit={onSubmit}
            >
              {({ isSubmitting }) => (
                <Form className="own-words__menu" ref={ref}>
                  <div className="own-words__menu_container">
                    <FormikField
                      label="Package name"
                      name="name"
                      type="text"
                      className="own-words__menu_package-name"
                    />
                    <FormikField
                      label="Language"
                      name="language"
                      type="text"
                      className="own-words__menu_language"
                    >
                      <option value="eng"> English </option>
                    </FormikField>
                  </div>

                  <FieldArray name="words">
                    {({ form, push, remove }: FieldArrayRenderProps) => (
                      <>
                        <div className="own-words__menu_word-fields">
                          {form.values.words.map((_: string, index: number) => (
                            <div
                              key={index}
                              className="own-words__menu_word-field_container"
                            >
                              <FormikField
                                type="text"
                                name={`words[${index}]`}
                                className="own-words__menu_word-field"
                                hideTextError={true}
                                errorBorder={
                                  !!(
                                    form.errors.words &&
                                    (form.errors.words as string[])[index]
                                  )
                                }
                                selectValue={selectValue}
                                onChange={getWords}
                              />

                              <Button
                                onClick={() => remove(index)}
                                type="delete"
                                className="own-words__menu_delete-button"
                              />
                            </div>
                          ))}
                        </div>

                        <div className="own-words__menu_buttons_container">
                          <div className="own-words__menu_buttons">
                            <Button
                              onClick={() => {
                                push('')
                                scrollMenu()
                              }}
                              type="add"
                              className="own-words__menu_add-button"
                            />

                            <Button
                              text="Create"
                              disabled={isSubmitting}
                              filled={true}
                              type="text"
                            />
                          </div>
                          <span className="error-text">
                            {typeof form.errors.words === 'string'
                              ? form.errors.words
                              : Array.isArray(form.errors.words)
                              ? 'Words is required'
                              : ''}
                          </span>
                        </div>
                      </>
                    )}
                  </FieldArray>
                </Form>
              )}
            </Formik>
          ) : packId ? (
            <div>Work with pack</div>
          ) : (
            <></>
          )}
        </div>
      ) : (
        <div className="own-words__emptiness-menu">
          <div className="own-words__emptiness-menu_container">
            <img
              src={arrow}
              alt="arrow"
              className="own-words__emptiness-menu_arrow own-words__emptiness-menu_left-arrow"
            />
            <Button
              text="Add package"
              onClick={() => changeActivePackage(NEW_PACKAGE)}
              filled={true}
              type="text"
            />
            <img
              src={arrow}
              alt="arrow"
              className="own-words__emptiness-menu_arrow own-words__emptiness-menu_right-arrow"
            />
          </div>

          <span className="own-words__emptiness-menu_text">
            You don&apos;t have a single package.
          </span>
        </div>
      )}
    </div>
  )
}

export default OwnWords
