import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Layout from 'components/Layout/Layout'
import Main from 'components/pages/Main/Main'
import OwnWords from 'components/pages/OwnWords/OwnWords'
import PublicPackages from 'components/pages/PublicPackages/PublicPackages'
import NoPage from 'components/pages/NoPage/NoPage'
import Cards from 'components/ui/Cards/Cards'
import PackMenu from 'components/pages/OwnWords/PackMenu/PackMenu'
import AddPackageMenu from 'components/pages/OwnWords/AddPackageMenu/AddPackageMenu'

import './App.scss'

const App = () => {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Main />} />
          <Route path="own-words/:packName?" element={<OwnWords />} />
            {/* <Route index element={<OwnWords />} /> */}
            {/* <Route path='add-pack' element={<AddPackageMenu />} />
            <Route path=":packId" element={<PackMenu />} />
            <Route path=":packId/daily-words/:reverse?" element={<Cards />} /> */}
          {/* </Route> */}
          <Route path="public-packages" element={<PublicPackages />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
