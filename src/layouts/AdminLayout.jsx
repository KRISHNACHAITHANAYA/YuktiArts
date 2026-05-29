import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { Image, LayoutDashboard, LogOut, MessageSquare, PackageCheck, Star } from 'lucide-react'
import { useAuth } from '../context/useAuth'

export default function AdminLayout() {
  const navigate = useNavigate()
  const { logout } = useAuth()

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <div className="brand">
          <span className="brand-mark">YA</span>
          <span className="brand-name">Admin</span>
        </div>
        <nav>
          <NavLink to="/admin/dashboard"><LayoutDashboard size={18} /> Dashboard</NavLink>
          <NavLink to="/admin/orders"><PackageCheck size={18} /> Orders</NavLink>
          <NavLink to="/admin/gallery"><Image size={18} /> Gallery</NavLink>
          <NavLink to="/admin/testimonials"><Star size={18} /> Testimonials</NavLink>
          <NavLink to="/admin/inquiries"><MessageSquare size={18} /> Inquiries</NavLink>
        </nav>
        <button
          className="btn btn-secondary"
          type="button"
          onClick={() => {
            logout()
            navigate('/admin/login')
          }}
        >
          <LogOut size={18} /> Logout
        </button>
      </aside>
      <main className="admin-main">
        <Outlet />
      </main>
    </div>
  )
}
