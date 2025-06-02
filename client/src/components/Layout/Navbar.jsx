import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FiLogOut, FiUser } from 'react-icons/fi';

const Navbar = () => {
    const { user, logout, isOrganizer } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="bg-primary text-white shadow-lg">
            <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                <Link to="/" className="text-xl font-bold">Karate Championships</Link>

                <div className="flex items-center space-x-6">
                    {user ? (
                        <>
                            <div className="flex items-center space-x-4">
                                {isOrganizer && (
                                    <>
                                        <Link to="/participants" className="hover:text-secondary transition">Участники</Link>
                                        <Link to="/judges" className="hover:text-secondary transition">Судьи</Link>
                                        <Link to="/kumites" className="hover:text-secondary transition">Бои</Link>
                                    </>
                                )}
                                <Link to="/participants/filter" className="hover:text-secondary transition">Фильтр участников</Link>
                                <Link to="/judges/filter" className="hover:text-secondary transition">Фильтр судей</Link>
                            </div>

                            <div className="flex items-center space-x-2">
                                <div className="flex items-center">
                                    <FiUser className="mr-1" />
                                    <span>{user.username} ({user.role})</span>
                                </div>
                                <button
                                    onClick={handleLogout}
                                    className="flex items-center bg-red-600 hover:bg-red-700 px-3 py-1 rounded transition"
                                >
                                    <FiLogOut className="mr-1" /> Выйти
                                </button>
                            </div>
                        </>
                    ) : (
                        <Link to="/login" className="bg-secondary hover:bg-blue-700 px-4 py-2 rounded transition">
                            Вход
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;