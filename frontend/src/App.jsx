import { Routes, Route } from 'react-router'
import HomePage from './pages/HomePage'
import CreatePage from './pages/CreatePage'
import EditPage from './pages/EditPage'
const App = () => {
  return (
    <div className='min-h-screen'>
    <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/create' element={<CreatePage />} />
        <Route path='/note/:id' element={<EditPage />} />
      </Routes>
    </div>
  )
}

export default App