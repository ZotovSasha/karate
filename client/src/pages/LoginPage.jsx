import React from 'react';
import LoginForm from '../components/Auth/LoginForm';

const LoginPage = () => {
    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4">
            <LoginForm />
        </div>
    );
};

export default LoginPage;