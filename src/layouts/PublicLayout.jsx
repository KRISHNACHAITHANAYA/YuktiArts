import { useEffect, useState } from 'react'
import { Link, NavLink, Outlet } from 'react-router-dom'
import { ChevronUp, Menu, Moon, Phone, Sun, X } from 'lucide-react'
import AccountMenu from '../components/AccountMenu'

const navItems = [
  ['Home', '/'],
  ['About', '/about'],
  ['Products', '/products'],
  ['Gallery', '/gallery'],
  ['Services', '/services'],
  ['Custom Orders', '/custom-orders'],
  ['Contact', '/contact'],
]

export default function PublicLayout() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.documentElement.dataset.theme = darkMode ? 'dark' : 'light'
  }, [darkMode])

  return (
    <div className="app">
      <header className={`nav scrolled ${scrolled ? 'is-scrolled' : ''} ${menuOpen ? 'menu-open' : ''}`}>
        <div className="container nav-inner">
          <Link className="brand" to="/" aria-label="Yukti Artful home">
            <span className="brand-mark">YA</span>
            <span>
              <span className="brand-name">Yukti Artful</span>
              <span className="brand-tag">Handmade art studio</span>
            </span>
          </Link>
          <nav className={`nav-links ${menuOpen ? 'open' : ''}`} aria-label="Primary navigation">
            {navItems.map(([label, href]) => (
              <NavLink key={label} to={href} onClick={() => setMenuOpen(false)}>
                {label}
              </NavLink>
            ))}
          </nav>
          <div className="nav-actions">
            <AccountMenu />
            <button className="icon-btn" type="button" onClick={() => setDarkMode((value) => !value)} aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}>
              {darkMode ? <Sun size={19} /> : <Moon size={19} />}
            </button>
            <Link className="btn btn-primary" to="/custom-orders">Order Now</Link>
            <button className="menu-btn" type="button" onClick={() => setMenuOpen((value) => !value)} aria-label="Toggle menu">
              {menuOpen ? <X size={21} /> : <Menu size={21} />}
            </button>
          </div>
        </div>
      </header>

      <main className="page-main">
        <Outlet />
      </main>

      <footer className="footer">
        <div className="container">
          <h2>"Art That Speaks the Language of Feelings"</h2>
          <p>Handcrafted resin art, personalized gifts, custom portraits, paintings, and unique creations made with creativity and love.</p>
          <div className="footer-grid">
            <div>
              <h3>About</h3>
              <p>Yukti Artful is a premium handmade studio creating emotional, personalized keepsakes for gifting and home decor.</p>
            </div>
            <div>
              <h3>Quick Links</h3>
              <ul>
                {navItems.map(([label, href]) => (
                  <li key={label}><Link to={href}>{label}</Link></li>
                ))}
              </ul>
            </div>
            <div>
              <h3>Policies</h3>
              <ul>
                <li><Link to="/privacy-policy">Privacy Policy</Link></li>
                <li><Link to="/shipping-policy">Shipping Policy</Link></li>
                <li><Link to="/terms">Terms & Conditions</Link></li>
              </ul>
            </div>
            <div>
              <h3>Delivery & Shipping</h3>
              <ul>
                <li>Pan India Delivery Available</li>
                <li>Secure Packaging</li>
                <li>Resin Jewellery: 5-7 Days</li>
                <li>Portrait Sketches: 7-10 Days</li>
                <li>Customized Frames: 7-12 Days</li>
                <li>Paintings: 10-15 Days</li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <span>© 2026 Yukti Artful</span>
            <span>Handcrafted With Creativity & Love</span>
          </div>
        </div>
      </footer>

      <div className="floating-actions">
        <a className="icon-btn whatsapp" href="https://wa.me/91XXXXXXXXXX" target="_blank" rel="noreferrer" aria-label="Open WhatsApp">
          <Phone size={21} />
        </a>
        <button className={`icon-btn top-btn ${scrolled ? 'visible' : ''}`} type="button" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="Back to top">
          <ChevronUp size={22} />
        </button>
      </div>
    </div>
  )
}
