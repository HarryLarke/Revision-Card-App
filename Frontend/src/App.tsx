import { Routes, Route } from 'react-router'

import Layout from './pages/Layout'
import Home from './pages/Home'
import Bundle from './pages/Bundle'
import EditBundle from './pages/EditBundle'
import Card from './pages/Card'
import EditCard from './pages/EditCard'
import Practice from './pages/Practice'
import Missing from './pages/Missing'
import CreateBundle from './pages/CreateBundle'
import CreateCard from './pages/CreateCard'

function App() {

  return (
    <Routes>
        <Route path='/' element={<Layout/>}>

          {/*User Routes*/}
          <Route path='/' element={<Home/>}/>

          {/*Bundle Routes*/}     
          <Route path='/bundle/create' element={<CreateBundle/>}/>
          <Route path='/bundle/:bundleId' element={<Bundle/>}/>
          <Route path='/bundle/edit/:bundleId' element={<EditBundle/>}/>
          
          {/*Card Routes*/}
          <Route path='/card/create/:bundleId' element={<CreateCard/>}/>
          <Route path='/card/:cardId' element={<Card/>}/>
          <Route path='/card/edit/:cardId' element={<EditCard/>}/>

          {/*Practice Routes*/}
          <Route path='/practice/:bundleId' element={<Practice/>}/>
          
          <Route path='*' element={<Missing/>}/>

        </Route>
    </Routes>
  )
}

export default App
