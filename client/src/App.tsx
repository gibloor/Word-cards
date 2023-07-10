import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Layout from './components/Layout/Layout'
import Main from './components/pages/Main/Main'
import OwnCards from './components/pages/OwnCards/OwnCards'
import PublicPackages from './components/pages/PublicPackages/PublicPackages'
import NoPage from './components/pages/NoPage/NoPage'
import Cards, { Card } from './components/ui/Cards/Cards'
import PackMenu from './components/pages/OwnCards/PackMenu/PackMenu'

import './App.scss'

const App = () => {
  const cards: Card[] = [
    {
      firstLang: 'Pochito',
      secondLang: 'Почіто',
      status: 'notPassed',
      passedTimes: 0,
    },
    {
      firstLang: 'Pochito1',
      secondLang: 'Пoчiтo1',
      status: 'learned',
      passedTimes: 0,
    },
    {
      firstLang: 'Pochito2',
      secondLang: 'Пoчiтo2',
      status: 'passed',
      passedTimes: 0,
    }
  ]

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Main />} />
          <Route path='own-cards'>
            <Route index element={<OwnCards />} />
            <Route path=':packId' element={<PackMenu />} />
            <Route path=':packId/daily-cards' element={<Cards cards={cards} reverse={true} />} />
          </Route>
          <Route path="public-packages" element={<PublicPackages />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App
