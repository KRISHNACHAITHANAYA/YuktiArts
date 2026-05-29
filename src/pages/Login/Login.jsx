import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import SectionHeader from '../../components/SectionHeader'
import SEO from '../../components/SEO'
import { useAuth } from '../../context/useAuth'

export default function Login() {
  const [error, setError] = useState('')
  const [remember, setRemember] = useState(true)
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')
    try {
      const data = Object.fromEntries(new FormData(event.currentTarget).entries())
      const user = await login({ email: data.email, password: data.password }, remember)
      navigate(user.role === 'admin' ? '/admin/dashboard' : '/profile', { replace: true })
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <>
      <SEO title="Login" description="Login to your Yukti Artful account." />
      <section className="section page-hero">
        <div className="container auth-grid">
          <SectionHeader eyebrow="Account" title="Login to your account." copy="Access your profile, custom orders, and account details." />
          <form className="contact-panel auth-card" onSubmit={handleSubmit}>
            {location.state?.message && <div className="unauthorized">{location.state.message}</div>}
            {error && <div className="unauthorized">{error}</div>}
            <label>Email<input name="email" type="email" autoComplete="email" required /></label>
            <label>Password<input name="password" type="password" autoComplete="current-password" required /></label>
            <label className="checkbox-row"><input type="checkbox" checked={remember} onChange={(event) => setRemember(event.target.checked)} /> Remember me</label>
            <button className="btn btn-primary" type="submit">Login</button>
            <p><Link to="/forgot-password">Forgot Password?</Link></p>
            <p>New here? <Link to="/signup">Create an account</Link></p>
          </form>
        </div>
      </section>
    </>
  )
}
