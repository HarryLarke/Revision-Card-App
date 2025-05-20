import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from './app/store.tsx'
import { BrowserRouter as Router, Routes, Route }  from 'react-router-dom'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path='/*' element={<App/>}/>
        </Routes>
      </Router>
    </Provider>
  </StrictMode>,
)
