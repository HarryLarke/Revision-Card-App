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
          <Route path='/bundle/:id' element={<Bundle/>}/>
          <Route path='/bundle/edit/:id' element={<EditBundle/>}/>
          
          {/*Card Routes*/}
          <Route path='/card/create' element={<CreateCard/>}/>
          <Route path='/card/:id' element={<Card/>}/>
          <Route path='/card/edit/:id' element={<EditCard/>}/>

          {/*Practice Routes*/}
          <Route path='/practice/:id' element={<Practice/>}/>
          
          <Route path='*' element={<Missing/>}/>

        </Route>
    </Routes>
  )
}

export default App
