import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './components/homepage/HomePage'
import { useGetSession } from './hooks/sessionHooks'
import Dashboard from './components/dashboard/Dashboard'
import Menu from './components/menu/Menu'
import Orders from './components/orders/Orders'
function App() {

  useGetSession()

  return (
    <Router>
      <Routes>
        <Route path='/:restaurantUrl/dashboard' element={<Dashboard />} />
        <Route path='/' element={<HomePage />} />
        <Route path='/:restaurantUrl/menu' element={<Menu />} />
        <Route path='/:restaurantUrl/orders' element={<Orders/>} />
      </Routes>
    </Router>
  )
}

export default App
