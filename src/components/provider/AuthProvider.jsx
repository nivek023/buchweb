import { createContext, useState } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'

export const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [cToken, setCToken] = useState('')
  const [role, setRole] = useState('read')

  const login = async (username, password) => {
    try {
      const response = await loginUser({ username, password })
      console.log('AuthProvider.login: response:', response)
      const { token, roles } = response.data
      setCToken(token)
      console.log('AuthProvider.login: setToken executed')
      console.log('AuthProvider.login: token: ', token)
      const isAdminOrFachabteilung = roles.some(
        (r) => r === 'admin' || r === 'fachabteilung'
      )
      const isKunde = roles.includes('kunde')

      if (isAdminOrFachabteilung) {
        setRole('write')
        return true
      }
      if (isKunde) {
        return true
      }
      return false
    } catch (error) {
      console.log('AuthProvider.login: error, login nicht erfolgreich')
      return false
    }
  }

  const loginUser = async ({ username, password }) => {
    const url = '/api/auth/login'
    const requestData = `username=${encodeURIComponent(
      username
    )}&password=${encodeURIComponent(password)}`
    const response = await axios.post(url, requestData)
    console.log('AuthProvider.loginUser: axios.post executed')
    if (response.status === 200) {
      console.log('AuthProvider.loginUser: (200)')
      return response
    } else {
      console.log('AuthProvider.loginUser: axios.post failed')
      throw new Error('Login failed')
    }
  }

  const logout = () => {
    setCToken('')
    setRole('read')
  }

  return (
    <AuthContext.Provider value={{ cToken, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
}
