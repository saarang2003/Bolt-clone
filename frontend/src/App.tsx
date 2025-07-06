
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css'
import { AppProvider } from './context/AppContext';
import { Home } from './pages/Home';
import { Builder } from './pages/Builder';
import {Analytics} from '@vercel/analytics/react'

function App() {

    const isProduction = process.env.NODE_ENV === 'production';
    

  return (
   <>
    <AppProvider>
      <BrowserRouter>
        {isProduction && <Analytics />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/builder" element={<Builder />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
   </>
  )
}

export default App
