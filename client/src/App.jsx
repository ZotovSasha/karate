// App.jsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import JudgesPage from './pages/JudgesPage';
import ParticipantsPage from './pages/ParticipantsPage';
import KumitesPage from './pages/KumitesPage';
import './index.css';

const NavLink = ({ to, children }) => {
    const location = useLocation();
    const isActive = location.pathname === to;

    return (
        <Link
            to={to}
            className={`px-4 py-3 font-medium flex items-center transition text-sm ${
                isActive
                    ? 'bg-karate-red text-white'
                    : 'text-gray-300 hover:bg-karate-red hover:text-white'
            }`}
        >
            {children}
        </Link>
    );
};

function App() {
    const [role, setRole] = useState('guest');

    return (
        <Router>
            <div className="min-h-screen bg-light-gray">
                <header className="bg-gradient-to-r from-karate-red to-karate-deeper-red text-white shadow-lg">
                    <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                        {/* Logo и название */}
                        <div className="flex items-center">
                            <div className="bg-white rounded-full p-1 mr-2">
                            </div>
                            <h1 className="text-xl font-bold">Соревнования по карате</h1>
                        </div>

                        <div className="flex items-center space-x-3">
                            <div className="bg-white text-karate-red px-3 py-1 rounded-full font-semibold flex items-center text-xs">
                                {role === 'guest' ? 'Гость' : 'Организатор'}
                            </div>
                            <button
                                onClick={() => setRole(role === 'guest' ? 'organizer' : 'guest')}
                                className="bg-yellow-500 hover:bg-yellow-600 text-black px-3 py-1 rounded-lg font-semibold transition flex items-center text-xs inline-flex"
                            >
                                Сменить роль
                            </button>
                        </div>

                        <nav className="flex space-x-2 md:space-x-4 mt-2 md:mt-0 hidden md:flex">
                            <NavLink to="/" end>
                                <svg xmlns="http://www.w3.org/2000/svg" className="icon h-5 w-5 mr-1 text-current" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                                Участники соревнований
                            </NavLink>
                            <NavLink to="/judges">
                                <svg xmlns="http://www.w3.org/2000/svg" className="icon h-5 w-5 mr-1 text-current" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                </svg>
                                Судьи
                            </NavLink>
                            <NavLink to="/kumites">
                                <svg xmlns="http://www.w3.org/2000/svg" className="icon h-5 w-5 mr-1 text-current" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                                Бои
                            </NavLink>
                        </nav>
                    </div>
                </header>

                {/* Main Content */}
                <main className="container mx-auto px-4 py-6">
                    <Routes>
                        <Route path="/" element={<ParticipantsPage role={role} />} />
                        <Route path="/judges" element={<JudgesPage role={role} />} />
                        <Route path="/kumites" element={<KumitesPage role={role} />} />
                    </Routes>
                </main>

                {/* Footer */}
                <footer className="bg-gray-900 text-white py-4 mt-8">
                    <div className="container mx-auto px-4 text-center">
                        <p className="text-sm">© 2025 Система Соревнований по Карате</p>
                    </div>
                </footer>
            </div>
        </Router>
    );
}

export default App;
