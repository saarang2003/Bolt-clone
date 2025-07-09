
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { Builder } from './pages/Builder';
import {Analytics} from '@vercel/analytics/react'
import Landing from './pages/Landing';

function App() {

    const isProduction = process.env.NODE_ENV === 'production';
    

  return (
   <>
    <AppProvider>
      <BrowserRouter>
        {isProduction && <Analytics />}
        <Routes>
          <Route path="/"element = {<Landing/>}/>
          {/* <Route path="/" element={<Home />} /> */}
          <Route path="/builder" element={<Builder />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
   </>
  )
}

export default App
