import { useEffect, useMemo, useState } from 'react'
import { hydrateUser, loginWithEmail, logout, signupWithEmail } from '../services/auth'
import { AuthContext } from './authStore'

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    hydrateUser()
      .then(setUser)
      .catch(() => setUser(null))
      .finally(() => setLoading(false))
  }, [])

  const value = useMemo(
    () => ({
      user,
      loading,
      isAuthenticated: Boolean(user),
      isAdmin: user?.role === 'admin',
      login: async (payload, remember) => {
        const nextUser = await loginWithEmail(payload, remember)
        setUser(nextUser)
        return nextUser
      },
      signup: async (payload) => {
        const nextUser = await signupWithEmail(payload)
        setUser(nextUser)
        return nextUser
      },
      setUser,
      logout: () => {
        logout()
        setUser(null)
      },
    }),
    [loading, user],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
