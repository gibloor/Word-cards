import React, { useContext, useEffect, useRef, useState } from 'react'
import { Formik, Form, FieldArray, FieldArrayRenderProps } from 'formik'
import * as Yup from 'yup'
import axios, { AxiosResponse } from 'axios'
import { Subject } from 'rxjs'
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators'

import FormikField from 'components/ui/FormikFIeld/FormikField'
import Button from 'components/ui/Button/Button'
import { UserPacksContext } from 'components/Layout/contexts/UserPacksProvider/UserPacksProvider'

import './styles.scss'

export type Package = {
  name: string
  words: string[]
  language: 'eng' | 'pl'
  [key: string]: string | string[]
}

type WordResponse = {
  word: string
  score: number
}

type AddPackProps = {
  changeActivePackage: (newPackId: string) => void
}

const AddPack = (props: AddPackProps) => {
  const { changeActivePackage } = props

  const ref = useRef<HTMLFormElement>(null)
  const [selectValue, setSelectValue] = useState<string[]>([])
  const searchSubject = new Subject<string>()
  const { createPack } = useContext(UserPacksContext)

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

  const onSubmit = async (values: Package) => {
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

  const getWords = (text: string) => {
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
          axios.get<WordResponse[]>(
            `https://api.datamuse.com/words?sp=${text}*`,
          ),
        ),
      )
      .subscribe({
        next: (response: AxiosResponse<WordResponse[]>) => {
          setSelectValue(response.data.map((data) => data.word))
        },
        error: (error) => console.error(error),
      })

    return () => {
      subscription.unsubscribe()
    }
  }, [searchSubject])

  return (
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
        <Form className="add-pack" ref={ref}>
          <div className="add-pack__container">
            <FormikField
              label="Package name"
              name="name"
              type="text"
              className="add-pack__package-name"
            />
            <FormikField
              label="Language"
              name="language"
              type="text"
              className="add-pack__language"
            >
              <option value="eng"> English </option>
            </FormikField>
          </div>

          <FieldArray name="words">
            {({ form, push, remove }: FieldArrayRenderProps) => (
              <>
                <span className="text_20 add-pack__word-fields_title">
                  Words
                </span>
                <div className="add-pack__word-fields">
                  {form.values.words.map((_: string, index: number) => (
                    <div key={index} className="add-pack__word-field_container">
                      <FormikField
                        type="text"
                        name={`words[${index}]`}
                        className="add-pack__word-field"
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
                        className="add-pack__delete-button"
                      />
                    </div>
                  ))}
                </div>

                <div className="add-pack__buttons_container">
                  <div className="add-pack__buttons">
                    <Button
                      onClick={() => {
                        push('')
                        scrollMenu()
                      }}
                      type="add"
                      className="add-pack__add-button"
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
  )
}

export default AddPack
