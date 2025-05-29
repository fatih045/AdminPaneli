import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import './App.css'

// Components
import Layout from './components/Layout'
import Login from './pages/Login'
import CargoAd from './pages/CargoAd'
import VehicleAd from './pages/VehicleAd'
import CargoAdOffer from './pages/CargoAdOffer'
import VehicleAdOffer from './pages/VehicleAdOffer'
import UserManagement from './pages/UserManagement'

// Protected Route component
const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { user } = useSelector((state: any) => state.auth);
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        
        <Route path="/" element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }>
          <Route index element={<Navigate to="/cargo-ad" replace />} />
          <Route path="/cargo-ad" element={<CargoAd />} />
          <Route path="/vehicle-ad" element={<VehicleAd />} />
          <Route path="/cargo-ad-offer" element={<CargoAdOffer />} />
          <Route path="/vehicle-ad-offer" element={<VehicleAdOffer />} />
          <Route path="/user-management" element={<UserManagement />} />
        </Route>
        
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  )
}

export default App
