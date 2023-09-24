import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

import LandingPage from 'components/LandingPage'
import 'react-toastify/dist/ReactToastify.css'
import 'assets/css/App.css'

const App = () => {
  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <div className='min-h-screen h-full'>
          <Routes>
            <Route index element={<LandingPage isRegister={true} />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  )
}

export default App
