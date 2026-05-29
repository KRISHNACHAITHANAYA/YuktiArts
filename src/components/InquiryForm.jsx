import { useState } from 'react'
import { Send, Upload } from 'lucide-react'
import { categories } from '../data/siteData'
import { useAuth } from '../context/useAuth'
import { api } from '../services/api'

export default function InquiryForm({ mode = 'contact' }) {
  const [formErrors, setFormErrors] = useState({})
  const [formStatus, setFormStatus] = useState('')
  const { isAuthenticated } = useAuth()

  const validateForm = (form) => {
    const data = Object.fromEntries(new FormData(form).entries())
    const errors = {}
    if (!data.name?.trim()) errors.name = 'Name is required.'
    if (!/^[0-9+\-\s]{8,15}$/.test(data.phone || '')) errors.phone = 'Enter a valid phone number.'
    if (!/^\S+@\S+\.\S+$/.test(data.email || '')) errors.email = 'Enter a valid email address.'
    if (!data.artworkType) errors.artworkType = 'Choose an artwork type.'
    if (!data.message?.trim()) errors.message = 'Tell us a little about your idea.'
    return errors
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const errors = validateForm(event.currentTarget)
    setFormErrors(errors)
    if (Object.keys(errors).length) {
      setFormStatus('')
      return
    }
    try {
      if (mode === 'order') {
        if (!isAuthenticated) {
          setFormStatus('Please login before submitting a custom order.')
          return
        }
        const orderData = new FormData(event.currentTarget)
        orderData.set('description', orderData.get('message'))
        if (orderData.get('reference')?.name) {
          orderData.set('referenceImage', orderData.get('reference'))
        }
        orderData.delete('reference')
        orderData.delete('message')
        orderData.delete('name')
        orderData.delete('phone')
        orderData.delete('email')
        await api.createOrder(orderData)
        setFormStatus('Custom order submitted successfully. View it under My Orders.')
      } else {
        setFormStatus('Inquiry ready. Connect EmailJS service IDs to send this form live.')
      }
    } catch (err) {
      setFormStatus(err.message)
      return
    }
    event.currentTarget.reset()
  }

  return (
    <form className="form" onSubmit={handleSubmit} noValidate>
      <div className="field-grid">
        <label>Name<input name="name" type="text" autoComplete="name" />{formErrors.name && <small>{formErrors.name}</small>}</label>
        <label>Phone Number<input name="phone" type="tel" autoComplete="tel" />{formErrors.phone && <small>{formErrors.phone}</small>}</label>
      </div>
      <label>Email<input name="email" type="email" autoComplete="email" />{formErrors.email && <small>{formErrors.email}</small>}</label>
      <label>Artwork Type<select name="artworkType" defaultValue=""><option value="" disabled>Select artwork type</option>{categories.map((category) => <option key={category} value={category}>{category}</option>)}</select>{formErrors.artworkType && <small>{formErrors.artworkType}</small>}</label>
      <label>Message<textarea name="message" rows="5" />{formErrors.message && <small>{formErrors.message}</small>}</label>
      <label>Upload Reference Image<input name="reference" type="file" accept="image/*" /></label>
      <button className="btn btn-primary" type="submit"><Send size={18} /> Submit Inquiry</button>
      <div className="form-status" role="status" aria-live="polite">{formStatus}</div>
      <p className="section-copy"><Upload size={16} style={{ display: 'inline', verticalAlign: '-3px' }} /> EmailJS package is installed; add service/template/public IDs to send inquiries from production.</p>
    </form>
  )
}
