import React, { createContext, useState, useContext } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Register User
    const registerUser = async (userData) => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.post(`http://192.168.1.68:8000/register/`, userData);
            setUser(response.data);
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed');
        } finally {
            setLoading(false);
        }
    };

    // Login User
    const loginUser = async (credentials) => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.post(`http://192.168.1.68:8000/token/`, credentials);
            // Save token in localStorage and user data
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('access', response.data.access);
            localStorage.setItem('user', JSON.stringify(response.data.user));

            setUser(response.data);
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                error,
                registerUser,
                loginUser,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

// Custom Hook for AuthContext
export const useAuthContext = () => useContext(AuthContext);
