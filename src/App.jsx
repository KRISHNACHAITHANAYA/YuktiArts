import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import PublicLayout from './layouts/PublicLayout'
import AdminLayout from './layouts/AdminLayout'
import ProtectedRoute from './routes/ProtectedRoute'
import Home from './pages/Home/Home'
import About from './pages/About/About'
import Gallery from './pages/Gallery/Gallery'
import Products from './pages/Products/Products'
import Services from './pages/Services/Services'
import CustomOrders from './pages/CustomOrders/CustomOrders'
import Testimonials from './pages/Testimonials/Testimonials'
import FAQ from './pages/FAQ/FAQ'
import Contact from './pages/Contact/Contact'
import Login from './pages/Login/Login'
import Signup from './pages/Signup/Signup'
import ForgotPassword from './pages/ForgotPassword/ForgotPassword'
import Profile from './pages/Profile/Profile'
import UserOrders from './pages/Orders/Orders'
import PrivacyPolicy from './pages/Policies/PrivacyPolicy'
import ShippingPolicy from './pages/Policies/ShippingPolicy'
import Terms from './pages/Policies/Terms'
import AdminLogin from './admin/Login/Login'
import Dashboard from './admin/Dashboard/Dashboard'
import Orders from './admin/Orders/Orders'
import GalleryManagement from './admin/GalleryManagement/GalleryManagement'
import TestimonialsManagement from './admin/TestimonialsManagement/TestimonialsManagement'
import Inquiries from './admin/Dashboard/Inquiries'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="products" element={<Products />} />
          <Route path="gallery" element={<Gallery />} />
          <Route path="services" element={<Services />} />
          <Route path="custom-orders" element={<CustomOrders />} />
          <Route path="testimonials" element={<Testimonials />} />
          <Route path="faq" element={<FAQ />} />
          <Route path="contact" element={<Contact />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="privacy-policy" element={<PrivacyPolicy />} />
          <Route path="shipping-policy" element={<ShippingPolicy />} />
          <Route path="terms" element={<Terms />} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route element={<PublicLayout />}>
            <Route path="profile" element={<Profile />} />
            <Route path="orders" element={<UserOrders />} />
          </Route>
        </Route>

        <Route path="admin/login" element={<AdminLogin />} />
        <Route path="admin" element={<ProtectedRoute adminOnly />}>
          <Route element={<AdminLayout />}>
            <Route index element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="orders" element={<Orders />} />
            <Route path="gallery" element={<GalleryManagement />} />
            <Route path="testimonials" element={<TestimonialsManagement />} />
            <Route path="inquiries" element={<Inquiries />} />
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
