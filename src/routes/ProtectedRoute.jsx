import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../context/useAuth'

export default function ProtectedRoute({ adminOnly = false }) {
  const location = useLocation()
  const { loading, isAuthenticated, isAdmin } = useAuth()

  if (loading) {
    return <div className="admin-login-page">Checking access...</div>
  }

  if (!isAuthenticated) {
    const target = location.pathname.startsWith('/admin') ? '/admin/login' : '/login'
    return <Navigate to={target} replace state={{ from: location, message: 'Unauthorized Access' }} />
  }

  if (adminOnly && !isAdmin) {
    return <Navigate to="/login" replace state={{ from: location, message: 'Unauthorized Access' }} />
  }

  return <Outlet />
}
