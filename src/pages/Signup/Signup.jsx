import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import SectionHeader from '../../components/SectionHeader'
import SEO from '../../components/SEO'
import { useAuth } from '../../context/useAuth'

export default function Signup() {
  const [error, setError] = useState('')
  const { signup } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')
    try {
      const data = Object.fromEntries(new FormData(event.currentTarget).entries())
      await signup(data)
      navigate('/profile', { replace: true })
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <>
      <SEO title="Signup" description="Create a Yukti Artful account with email and password." />
      <section className="section page-hero">
        <div className="container auth-grid">
          <SectionHeader eyebrow="Signup" title="Create your Yukti Artful account." copy="Register to submit orders and view your handmade art requests." />
          <form className="contact-panel auth-card" onSubmit={handleSubmit}>
            {error && <div className="unauthorized">{error}</div>}
            <label>Full Name<input name="fullName" type="text" autoComplete="name" required /></label>
            <label>Email<input name="email" type="email" autoComplete="email" required /></label>
            <label>Phone Number<input name="phoneNumber" type="tel" autoComplete="tel" required /></label>
            <label>Password<input name="password" type="password" autoComplete="new-password" required /></label>
            <label>Confirm Password<input name="confirmPassword" type="password" autoComplete="new-password" required /></label>
            <button className="btn btn-primary" type="submit">Create Account</button>
            <p>Already have an account? <Link to="/login">Login</Link></p>
          </form>
        </div>
      </section>
    </>
  )
}
