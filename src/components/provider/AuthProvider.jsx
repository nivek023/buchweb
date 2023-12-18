import { createContext, useState } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'

export const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState('')
  const [rolle, setRolle] = useState('lesen')

  const login = async (username, password) => {
    try {
      const response = await loginUser({ username, password })
      const { token, roles } = await response.json()
      setToken(token)
      roles.forEach((r) => {
        if (r === 'admin') {
          setRolle('bearbeiten')
        }
      })
    } catch (error) {
      // TODO: Error Handling
    }
  }

  const loginUser = async ({ username, password }) => {
    const url = '/api/auth/login'
    const headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Access-Control-Allow-Origin': '*',
        'connection':'keep-alive',
        'accept-encoding':'gzip,deflate, br',
        Accept: 'text/plain',
    }
    const requestData = `username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`;
    //TODO wenn !ok
    const response = await axios.post(
      url,
      requestData,{ headers });
    console.log(response);

    return response
  }

  const logout = () => {
    setToken('')
    setRolle('lesen')
  }

  return (
    <AuthContext.Provider value={{ token, rolle, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
}
