import React, { useState, useEffect } from 'react';
import axios from 'axios';
import JudgeForm from '../components/JudgeForm';

const JudgesPage = ({ role }) => {
    const [teams, setTeams] = useState([]);
    const [filteredJudges, setFilteredJudges] = useState([]);
    const [selectedJudge, setSelectedJudge] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchJudges();
        fetchTeams();
    }, []);

    const fetchJudges = async () => {
        try {
            const response = await axios.get('/api/judges', {
                headers: { 'X-Role': role }
            });
            setFilteredJudges(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching judges:', error);
        }
    };

    const fetchTeams = async () => {
        try {
            const response = await axios.get('/api/judges/teams', {
                headers: { 'X-Role': role }
            });
            setTeams(response.data);
        } catch (error) {
            console.error('Error fetching teams:', error);
        }
    };

    const handleFilter = async (teamId) => {
        try {
            const response = await axios.get('/api/judges/filter', {
                params: { teamId },
                headers: { 'X-Role': role }
            });
            setFilteredJudges(response.data);
        } catch (error) {
            console.error('Error filtering judges:', error);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this judge?')) return;

        try {
            await axios.delete(`/api/judges/${id}`, {
                headers: { 'X-Role': role }
            });
            fetchJudges();
        } catch (error) {
            console.error('Error deleting judge:', error);
        }
    };

    return (
        <div className="judges-page">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                    {role === 'guest' ? 'Судьи' : 'Судьи'}
                </h2>
                {role === 'organizer' && (
                    <button
                        onClick={() => {
                            setSelectedJudge(null);
                            setShowForm(true);
                        }}
                        className="btn-add bg-karate-red hover:bg-karate-red:700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
                    >
                        <svg className="icon" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 010-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                        </svg>
                        Добавить нового судью
                    </button>
                )}
            </div>

            <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Фильтр по бригаде
                </label>
                <select
                    onChange={(e) => handleFilter(e.target.value || null)}
                    className="mt-1 block w-full md:w-64 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-karate-red focus:border-karate-red"
                >
                    <option value="">Все бригады</option>
                    {teams.map((team) => (
                        <option key={team.id} value={team.id}>
                            Бригада {team.id}
                        </option>
                    ))}
                </select>
            </div>

            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="loading-spinner border-4 border-karate-red rounded-full w-16 h-16 animate-spin"></div>
                </div>
            ) : (
                <div className="mt-4">
                    <div className="card rounded-lg overflow-hidden shadow-md">
                        <table className="min-w-full">
                            <thead className="bg-gray-80 text-white">
                            <tr>
                                <th className="py-3 px-4 text-left">Фамилия Имя</th>
                                <th className="py-3 px-4 text-left">Судейская бригада</th>
                                {role === 'organizer' && <th className="py-3 px-4 text-right">Actions</th>}
                            </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                            {filteredJudges.map((judge) => (
                                <tr key={judge.idJudge} className="hover:bg-gray-50">
                                    <td className="py-4 px-4">
                                        <div className="font-medium text-gray-900">
                                            {judge.lastName} {judge.firstName}
                                        </div>
                                    </td>
                                    <td className="py-4 px-4">
                                        <span className="inline-block bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
                                            Бригада {judge.team?.id}
                                        </span>
                                    </td>
                                    {role === 'organizer' && (
                                        <td className="py-4 px-4 text-right">
                                            <button
                                                onClick={() => {
                                                    setSelectedJudge(judge);
                                                    setShowForm(true);
                                                }}
                                                className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800"
                                            >
                                                <svg className="icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M8 14.9217L12 18.9609L16 14.9217V3H8V4.9217ZM12 15.9609V22H2V3H14V15.9609ZM12 9V17H2V5H14V9Z" fill="currentColor" />
                                                </svg>
                                            </button>
                                            <button
                                                onClick={() => handleDelete(judge.idJudge)}
                                                className="inline-flex items-center gap-1 ml-3 text-red-600 hover:text-red-800"
                                            >
                                                <svg className="icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M7 4.93011L5.66302 6.00471C4.45391 7.03728 1.68505 8.54968 1 10V14C1.68505 16.0503 4.45391 17.5627 5.66302 18.5953L7 19.67L11 16.34L15 19.67L16.3364 18.5953C17.5455 17.5627 20.3144 16.0503 21 14C20.3144 11.9497 17.5455 10.4373 16.3364 9.40466L15 8.32908L11 12.3701V4.93011Z" fill="currentColor" />
                                                </svg>
                                            </button>
                                        </td>
                                    )}
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {showForm && (
                <JudgeForm
                    judge={selectedJudge}
                    teams={teams}
                    onClose={() => {
                        setShowForm(false);
                        setSelectedJudge(null);
                    }}
                    onSave={() => {
                        fetchJudges();
                        setShowForm(false);
                    }}
                    role={role}
                />
            )}
        </div>
    );
};

export default JudgesPage;