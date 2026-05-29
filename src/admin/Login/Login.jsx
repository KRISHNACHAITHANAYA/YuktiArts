import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Lock } from 'lucide-react'
import SEO from '../../components/SEO'
import { useAuth } from '../../context/useAuth'

export default function Login() {
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const location = useLocation()
  const message = location.state?.message
  const { login } = useAuth()

  const handleSubmit = async (event) => {
    event.preventDefault()
    const data = Object.fromEntries(new FormData(event.currentTarget).entries())
    try {
      const user = await login({ email: data.email, password: data.password }, true)
      if (user.role !== 'admin') {
        setError('Admin access required.')
        return
      }
      navigate('/admin/dashboard', { replace: true })
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className="admin-login-page">
      <SEO title="Admin Login" description="Protected Yukti Artful admin login." />
      <form className="contact-panel admin-login-card" onSubmit={handleSubmit}>
        <span className="eyebrow"><Lock size={15} /> Protected Admin</span>
        <h1 className="section-title">Admin Login</h1>
        {message && <div className="unauthorized">{message}</div>}
        {error && <div className="unauthorized">{error}</div>}
        <label>Email<input name="email" type="email" placeholder="admin@yuktiartful.com" /></label>
        <label>Password<input name="password" type="password" placeholder="Enter admin password" /></label>
        <button className="btn btn-primary" type="submit">Login</button>
      </form>
    </div>
  )
}
