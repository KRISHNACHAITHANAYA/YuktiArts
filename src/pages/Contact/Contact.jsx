import { Camera, Mail, Phone, Sparkles } from 'lucide-react'
import InquiryForm from '../../components/InquiryForm'
import SectionHeader from '../../components/SectionHeader'
import SEO from '../../components/SEO'

export default function Contact() {
  return (
    <>
      <SEO title="Contact" description="Contact Yukti Artful for handmade resin jewellery, portraits, frames, paintings, and custom gift inquiries." />
      <section className="section page-hero">
        <div className="container contact-grid">
          <div className="contact-panel">
            <SectionHeader eyebrow="Contact" title="Begin a conversation." copy="Share your idea, occasion, reference photo, preferred colors, and delivery timeline." />
            <div className="contact-list">
              <div className="contact-line"><Phone size={20} /> <span>WhatsApp: +91 XXXXXXXXXX</span></div>
              <div className="contact-line"><Mail size={20} /> <span>Email: yuktiartful@gmail.com</span></div>
              <div className="contact-line"><Camera size={20} /> <span>Instagram: @yukti_artful</span></div>
              <div className="contact-line"><Sparkles size={20} /> <span>Working Hours: Mon-Sat, 10AM - 7PM</span></div>
            </div>
          </div>
          <div className="contact-panel"><InquiryForm /></div>
        </div>
      </section>
    </>
  )
}
