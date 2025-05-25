import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import ParticipantsPage from './pages/ParticipantsPage'
import JudgesPage from './pages/JudgesPage'
import JudgingTeamsPage from './pages/JudgingTeamsPage'
import StatsPage from './pages/StatsPage'
import AssignmentPage from './pages/AssignmentPage'
import Navigation from './components/Navigation'

export default function App() {
    return (
        <BrowserRouter>
            <div className="min-h-screen bg-gray-100">
                <Navigation />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <Routes>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/participants" element={<ParticipantsPage />} />
                        <Route path="/judges" element={<JudgesPage />} />
                        <Route path="/judging-teams" element={<JudgingTeamsPage />} />
                        <Route path="/stats" element={<StatsPage />} />
                        <Route path="/assignments" element={<AssignmentPage />} />
                    </Routes>
                </div>
            </div>
        </BrowserRouter>
    )
}