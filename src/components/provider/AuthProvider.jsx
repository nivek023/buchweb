import { createContext, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

// eslint-disable-next-line import/exports-last
export const AuthProvider = ({ children }) => {
  const [cToken, setCToken] = useState('');
  const [writeAccess, setWriteAccess] = useState(false);

  const login = async (username, password) => {
    try {
      const response = await loginUser({ username, password });
      const { token, roles } = response.data;
      setCToken(token);

      const isAdminOrFachabteilung = roles.some(
        (r) => r === 'admin' || r === 'fachabteilung'
      );
      const isKunde = roles.includes('kunde');
      setWriteAccess(isAdminOrFachabteilung);
      return isAdminOrFachabteilung || isKunde;
    } catch (error) {
      return false;
    }
  };

  const loginUser = async ({ username, password }) => {
    const url = '/api/auth/login';
    const requestData = `username=${encodeURIComponent(
      username
    )}&password=${encodeURIComponent(password)}`;

    const response = await axios.post(url, requestData);
    if (response.status === 200) {
      return response;
    } else {
      throw new Error('Login failed');
    }
  };

  const logout = () => {
    setCToken('');
    setWriteAccess(false);
  };

  const isLoggedIn = () => {
    return (cToken !== '')
  }

  return (
    <AuthContext.Provider value={{ cToken, writeAccess, login, logout, isLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const AuthContext = createContext(null);
