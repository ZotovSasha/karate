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
                        <div className="flex items-center gap-2">
                            <h1 className="text-xl font-bold text-white">Соревнования по карате</h1>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="bg-white text-karate-red px-3 py-1 rounded-full font-semibold text-xs flex items-center gap-1">
                                {role === 'guest' ? (
                                    <svg className="icon h-4 w-4 text-karate-red" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                        <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                                    </svg>
                                ) : (
                                    <svg className="icon h-4 w-4 text-karate-red" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                                    </svg>
                                )}
                                {role === 'guest' ? '   Гость' : '   Организатор'}
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
                                Участники
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
            </div>
            {/* Footer */}
            <footer className="bg-gray-900 text-white py-4 mt-8">
                <div className="container mx-auto px-4 text-center">
                    <p className="text-sm">© 2025 Система Соревнований по Карате</p>
                </div>
            </footer>
        </Router>
    );
}

export default App;
