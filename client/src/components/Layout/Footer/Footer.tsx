import React from 'react'

import './styles.scss'

type FooterProps = {

}

type List = {
  title: string,
  list: string[],
}

const Footer = (props: FooterProps) => {

  const lists: List[] = [
    {
      title: 'Libraries',
      list: [
        'MongoDB',
        'SCSS',
      ]
    },
    {
      title: 'Test libraries',
      list: [
        'Jest',
      ]
    }
  ]

  return (
    <div className='footer'>
      <div className='footer__container'>
        {lists.map(list => (
          <div className='footer__column'>
            <span className='text_14'>
              {list.title}
            </span>

            {list.list.map(text => (
              <span className='text_12'>
                {text}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Footer