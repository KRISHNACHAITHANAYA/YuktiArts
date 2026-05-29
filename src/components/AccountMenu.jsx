import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { LayoutDashboard, LogOut, PackageCheck, User, UserCircle } from 'lucide-react'
import { useAuth } from '../context/useAuth'

export default function AccountMenu() {
  const [open, setOpen] = useState(false)
  const { user, isAuthenticated, isAdmin, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    setOpen(false)
    navigate('/')
  }

  return (
    <div className="account-menu">
      <button className="icon-btn" type="button" onClick={() => setOpen((value) => !value)} aria-label="Account menu">
        <UserCircle size={21} />
      </button>
      {open && (
        <div className="account-dropdown">
          {!isAuthenticated && (
            <>
              <Link to="/login" onClick={() => setOpen(false)}><User size={17} /> Login</Link>
              <Link to="/signup" onClick={() => setOpen(false)}><UserCircle size={17} /> Signup</Link>
            </>
          )}
          {isAuthenticated && !isAdmin && (
            <>
              <div className="account-name">{user.fullName}</div>
              <Link to="/profile" onClick={() => setOpen(false)}><User size={17} /> My Profile</Link>
              <Link to="/orders" onClick={() => setOpen(false)}><PackageCheck size={17} /> My Orders</Link>
              <button type="button" onClick={handleLogout}><LogOut size={17} /> Logout</button>
            </>
          )}
          {isAuthenticated && isAdmin && (
            <>
              <div className="account-name">{user.fullName}</div>
              <Link to="/admin/dashboard" onClick={() => setOpen(false)}><LayoutDashboard size={17} /> Dashboard</Link>
              <Link to="/admin/orders" onClick={() => setOpen(false)}><PackageCheck size={17} /> Orders</Link>
              <Link to="/admin/gallery" onClick={() => setOpen(false)}><UserCircle size={17} /> Gallery Management</Link>
              <button type="button" onClick={handleLogout}><LogOut size={17} /> Logout</button>
            </>
          )}
        </div>
      )}
    </div>
  )
}
