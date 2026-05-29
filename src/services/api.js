const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

export function getToken() {
  return localStorage.getItem('yukti-token') || sessionStorage.getItem('yukti-token')
}

export function storeSession(token, remember = false) {
  const primary = remember ? localStorage : sessionStorage
  const secondary = remember ? sessionStorage : localStorage
  secondary.removeItem('yukti-token')
  primary.setItem('yukti-token', token)
}

export function clearSession() {
  localStorage.removeItem('yukti-token')
  sessionStorage.removeItem('yukti-token')
}

async function request(path, options = {}) {
  const token = getToken()
  const headers = new Headers(options.headers)
  if (!(options.body instanceof FormData)) {
    headers.set('Content-Type', 'application/json')
  }
  if (token) headers.set('Authorization', `Bearer ${token}`)

  let response
  try {
    response = await fetch(`${API_URL}${path}`, {
      ...options,
      headers,
    })
  } catch {
    throw new Error('Unable to connect to server. Check backend hosting, MongoDB, and VITE_API_URL.')
  }

  const data = await response.json().catch(() => ({}))
  if (!response.ok) {
    throw new Error(data.message || data.errors?.[0]?.message || 'Request failed')
  }
  return data
}

export const api = {
  signup: (payload) => request('/auth/signup', { method: 'POST', body: JSON.stringify(payload) }),
  login: (payload) => request('/auth/login', { method: 'POST', body: JSON.stringify(payload) }),
  forgotPassword: (payload) => request('/auth/forgot-password', { method: 'POST', body: JSON.stringify(payload) }),
  me: () => request('/auth/me'),
  updateProfile: (payload) => request('/users/profile', { method: 'PUT', body: payload }),
  changePassword: (payload) => request('/users/change-password', { method: 'PUT', body: JSON.stringify(payload) }),
  createOrder: (payload) => request('/orders', { method: 'POST', body: payload }),
  myOrders: () => request('/orders/my'),
  allOrders: () => request('/orders'),
  updateOrderStatus: (id, orderStatus) => request(`/orders/${id}/status`, { method: 'PATCH', body: JSON.stringify({ orderStatus }) }),
  createInquiry: (payload) => request('/contact', { method: 'POST', body: JSON.stringify(payload) }),
  gallery: () => request('/gallery'),
  testimonials: () => request('/testimonials'),
  adminDashboard: () => request('/admin/dashboard'),
}
