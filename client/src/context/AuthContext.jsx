import React, { createContext, useState, useEffect, useContext } from 'react';
import { login as apiLogin } from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    const login = async (username, password) => {
        try {
            const response = await apiLogin({ username, password });
            const userData = {
                username,
                role: response.data.role,
                token: response.data.token
            };
            localStorage.setItem('user', JSON.stringify(userData));
            localStorage.setItem('token', response.data.token);
            setUser(userData);
            return userData;
        } catch (error) {
            console.error('Login failed:', error);
            throw error;
        }
    };

    const logout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{
            user,
            login,
            logout,
            loading,
            isOrganizer: user?.role === 'ORGANIZER',
            isParticipant: user?.role === 'PARTICIPANT'
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);