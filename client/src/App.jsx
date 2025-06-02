import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Layout/Navbar';
import ProtectedRoute from './components/Layout/ProtectedRoute';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import ParticipantsPage from './pages/ParticipantsPage';
import JudgesPage from './pages/JudgesPage';
import KumitesPage from './pages/KumitesPage';
import ParticipantFilter from './components/Participants/ParticipantFilter';
import JudgeFilter from './components/Judges/JudgeFilter';
import ParticipantForm from './components/Participants/ParticipantForm';
import JudgeForm from './components/Judges/JudgeForm';
import KumiteForm from './components/Kumites/KumiteForm';

function App() {
    return (
        <AuthProvider>
            <Router>
                <div className="min-h-screen flex flex-col">
                    <Navbar />

                    <main className="flex-grow container mx-auto py-6 px-4">
                        <Routes>
                            <Route path="/login" element={<LoginPage />} />

                            <Route path="/" element={
                                <ProtectedRoute>
                                    <DashboardPage />
                                </ProtectedRoute>
                            } />

                            <Route path="/participants" element={
                                <ProtectedRoute roles={['ORGANIZER']}>
                                    <ParticipantsPage />
                                </ProtectedRoute>
                            } />

                            <Route path="/participants/new" element={
                                <ProtectedRoute roles={['ORGANIZER']}>
                                    <ParticipantForm />
                                </ProtectedRoute>
                            } />

                            <Route path="/participants/edit/:id" element={
                                <ProtectedRoute roles={['ORGANIZER']}>
                                    <ParticipantForm />
                                </ProtectedRoute>
                            } />

                            <Route path="/participants/filter" element={
                                <ProtectedRoute>
                                    <ParticipantFilter />
                                </ProtectedRoute>
                            } />

                            <Route path="/judges" element={
                                <ProtectedRoute roles={['ORGANIZER']}>
                                    <JudgesPage />
                                </ProtectedRoute>
                            } />

                            <Route path="/judges/new" element={
                                <ProtectedRoute roles={['ORGANIZER']}>
                                    <JudgeForm />
                                </ProtectedRoute>
                            } />

                            <Route path="/judges/edit/:id" element={
                                <ProtectedRoute roles={['ORGANIZER']}>
                                    <JudgeForm />
                                </ProtectedRoute>
                            } />

                            <Route path="/judges/filter" element={
                                <ProtectedRoute>
                                    <JudgeFilter />
                                </ProtectedRoute>
                            } />

                            <Route path="/kumites" element={
                                <ProtectedRoute roles={['ORGANIZER']}>
                                    <KumitesPage />
                                </ProtectedRoute>
                            } />

                            <Route path="/kumites/new" element={
                                <ProtectedRoute roles={['ORGANIZER']}>
                                    <KumiteForm />
                                </ProtectedRoute>
                            } />

                            <Route path="/kumites/edit/:id" element={
                                <ProtectedRoute roles={['ORGANIZER']}>
                                    <KumiteForm />
                                </ProtectedRoute>
                            } />
                        </Routes>
                    </main>

                    <footer className="bg-gray-800 text-white py-4">
                        <div className="container mx-auto px-4 text-center">
                            &copy; {new Date().getFullYear()} Всероссийские соревнования по карате
                        </div>
                    </footer>
                </div>
            </Router>
        </AuthProvider>
    );
}

export default App;