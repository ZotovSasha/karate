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
                        className="btn btn-add bg-karate-gray hover:bg-karate-red:700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
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
                    className="mt-1 block w-full md:w-64 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-karate-red focus:border-karate-red text-sm"
                >
                    <option value="">Все бригады</option>
                    {teams.map((team) => (
                        <option key={team.id} value={team.id}>
                            Бригада {team.id}
                        </option>
                    )) || <option value="">Нет бригад</option>}
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
                                {role === 'organizer' && <th className="py-3 px-4 text-right">Действия</th>}
                            </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                            {filteredJudges.map((judge) => (
                                <tr key={judge.idJudge} className="hover:bg-gray-50">
                                    <td className="py-4 px-4 text-gray-900 font-medium whitespace-nowrap">
                                        {judge.lastName}
                                        <span className="text-gray-600"> {judge.firstName}</span>
                                    </td>
                                    <td className="py-4 px-4">
                                        <span className="inline-flex items-center gap-1 bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm font-medium">
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
                                                className="text-blue-600 hover:text-blue-800 inline-flex items-center gap-1"
                                                title="Редактировать"
                                            >
                                                <svg className="icon" viewBox="0 0 20 20" fill="currentColor">
                                                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                                                </svg>
                                            </button>
                                            <button
                                                onClick={() => handleDelete(judge.idJudge)}
                                                className="text-red-600 hover:text-red-800 inline-flex items-center gap-1 ml-2"
                                                title="Удалить"
                                            >
                                                <svg className="icon" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h12a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                                </svg>
                                            </button>
                                        </td>
                                    )}
                                </tr>
                            )) || <tr><td colSpan={role === 'organizer' ? 3 : 2} className="py-4 text-center text-gray-500">Нет судей</td></tr>}
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