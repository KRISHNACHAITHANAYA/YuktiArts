import { api, clearSession, getToken, storeSession } from './api'

export async function hydrateUser() {
  if (!getToken()) return null
  const { user } = await api.me()
  return user
}

export async function loginWithEmail(payload, remember) {
  const data = await api.login(payload)
  storeSession(data.token, remember)
  return data.user
}

export async function signupWithEmail(payload) {
  const data = await api.signup(payload)
  storeSession(data.token, true)
  return data.user
}

export function logout() {
  clearSession()
}
