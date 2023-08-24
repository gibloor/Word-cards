import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Layout from 'components/Layout/Layout'
import Main from 'components/pages/Main/Main'
import OwnWords from 'components/pages/OwnWords/OwnWords'
import PublicPackages from 'components/pages/PublicPackages/PublicPackages'
import NoPage from 'components/pages/NoPage/NoPage'
import MainMenu from 'components/pages/OwnWords/MainMenu/MainMenu'
import Exercise from 'components/pages/OwnWords/Exercise/Exersice'

import './App.scss'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Main />} />
          <Route path="own-words" element={<OwnWords />}>
            <Route index path=":packId?" element={<MainMenu />} />
            <Route path=":packId/:ExerciseType" element={<Exercise />} />
          </Route>
          <Route path="public-packs" element={<PublicPackages />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
