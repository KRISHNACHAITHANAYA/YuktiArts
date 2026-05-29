import { useState } from 'react'
import SectionHeader from '../../components/SectionHeader'
import SEO from '../../components/SEO'
import { api } from '../../services/api'

export default function ForgotPassword() {
  const [status, setStatus] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()
    setStatus('')
    setError('')
    try {
      const data = Object.fromEntries(new FormData(event.currentTarget).entries())
      const response = await api.forgotPassword(data)
      setStatus(response.message)
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <>
      <SEO title="Forgot Password" description="Request a password reset for your Yukti Artful account." />
      <section className="section page-hero"><div className="container auth-grid"><SectionHeader eyebrow="Password Help" title="Forgot your password?" copy="Enter your email to start a reset flow." /><form className="contact-panel auth-card" onSubmit={handleSubmit}>{error && <div className="unauthorized">{error}</div>}{status && <div className="form-status">{status}</div>}<label>Email<input name="email" type="email" required /></label><button className="btn btn-primary" type="submit">Request Reset</button></form></div></section>
    </>
  )
}
