import { Routes, Route } from 'react-router'

import Layout from './pages/Layout'
import Home from './pages/Home'
import Bundle from './pages/Bundle'
import EditBundle from './pages/EditBundle'
import Card from './pages/Card'
import EditCard from './pages/EditCard'
import Practice from './pages/Practice'
import Missing from './pages/Missing'

function App() {

  return (
    <Routes>
      <Route>
        <Route path='/' element={<Layout/>}>

          {/*User Routes*/}
          <Route path='/' element={<Home/>}

          {/*Bundle Routes*/}
          <Route path='/bundle/:id' element={<Bundle/>}/>
          <Routes path="/bundle/:id/edit" element={<EditBundle/>}/>

          {/*Card Routes*/}
          <Route path='/card/:id' element={<Card/>}/>
          <Route path='/card/:id/edit' element={<EditCard/>}/>

          {/*Practice Routes*/}
          <Route path='/practice/:id' element={<Practice/>}
          
          <Route path='*' element={<Missing/>}/>

        </Route>
      </Route>
    </Routes>
  )
}

export default App
