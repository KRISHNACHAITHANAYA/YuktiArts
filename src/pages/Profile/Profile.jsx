import { useState } from 'react'
import SectionHeader from '../../components/SectionHeader'
import SEO from '../../components/SEO'
import { useAuth } from '../../context/useAuth'
import { api } from '../../services/api'

export default function Profile() {
  const { user, setUser } = useAuth()
  const [status, setStatus] = useState('')
  const [error, setError] = useState('')

  const updateProfile = async (event) => {
    event.preventDefault()
    setStatus('')
    setError('')
    try {
      const formData = new FormData(event.currentTarget)
      const { user: nextUser } = await api.updateProfile(formData)
      setUser(nextUser)
      setStatus('Profile updated successfully.')
    } catch (err) {
      setError(err.message)
    }
  }

  const changePassword = async (event) => {
    event.preventDefault()
    setStatus('')
    setError('')
    try {
      const data = Object.fromEntries(new FormData(event.currentTarget).entries())
      await api.changePassword(data)
      event.currentTarget.reset()
      setStatus('Password changed successfully.')
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <>
      <SEO title="Profile" description="View and edit your Yukti Artful profile." />
      <section className="section page-hero">
        <div className="container">
          <SectionHeader eyebrow="My Profile" title={`Welcome, ${user?.fullName || 'Artist'}.`} copy="Manage your profile details and password." />
          {error && <div className="unauthorized">{error}</div>}
          {status && <div className="form-status">{status}</div>}
          <div className="profile-grid">
            <article className="contact-panel profile-card">
              <div className="profile-image">{user?.profileImage ? <img src={`${import.meta.env.VITE_API_ORIGIN || 'http://localhost:5000'}${user.profileImage}`} alt={user.fullName} /> : user?.fullName?.slice(0, 1)}</div>
              <h3>{user?.fullName}</h3>
              <p>{user?.email}</p>
              <p>{user?.phoneNumber}</p>
              <p>Joined: {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : '-'}</p>
            </article>
            <form className="contact-panel auth-card" onSubmit={updateProfile}>
              <h3>Edit Profile</h3>
              <label>Full Name<input name="fullName" defaultValue={user?.fullName || ''} /></label>
              <label>Phone Number<input name="phoneNumber" defaultValue={user?.phoneNumber || ''} /></label>
              <label>Profile Picture<input name="profileImage" type="file" accept="image/*" /></label>
              <button className="btn btn-primary" type="submit">Save Profile</button>
            </form>
            <form className="contact-panel auth-card" onSubmit={changePassword}>
              <h3>Change Password</h3>
              <label>Current Password<input name="currentPassword" type="password" /></label>
              <label>New Password<input name="newPassword" type="password" /></label>
              <button className="btn btn-primary" type="submit">Change Password</button>
            </form>
          </div>
        </div>
      </section>
    </>
  )
}
