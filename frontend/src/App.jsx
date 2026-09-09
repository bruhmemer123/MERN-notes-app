import { Routes, Route, Navigate } from 'react-router'
import HomePage from './pages/HomePage'
import CreatePage from './pages/CreatePage'
import EditPage from './pages/EditPage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import { useAuthStore } from './store/useAuthStore'
import { useEffect } from 'react'
import { LoaderIcon } from 'lucide-react'
const App = () => {
  const { user, checkAuth, isCheckingAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <LoaderIcon className="size-10 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className='min-h-screen'>
      <Routes>
        <Route path='/' element={user ? <HomePage /> : <Navigate to="/login" replace />} />
        <Route path='/create' element={user ? <CreatePage /> : <Navigate to="/login" replace />} />
        <Route path='/note/:id' element={user ? <EditPage /> : <Navigate to="/login" replace />} />
        <Route path="/login" element={!user ? <LoginPage /> : <Navigate to="/" replace />} />
        <Route path="/signup" element={!user ? <SignupPage /> : <Navigate to="/" replace />} />
      </Routes>
    </div>
  )
}

export default App