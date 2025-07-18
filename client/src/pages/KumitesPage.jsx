import React, { useState, useEffect } from 'react';
import axios from 'axios';
import KumiteForm from '../components/KumiteForm';

const KumitesPage = ({ role }) => {
    const [kumites, setKumites] = useState([]);
    const [tatamis, setTatamis] = useState([]);
    const [teams, setTeams] = useState([]);
    const [selectedKumite, setSelectedKumite] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [loading, setLoading] = useState(true);
    const [participants, setParticipants] = useState([]);

    useEffect(() => {
        fetchKumites();
        fetchTatamis();
        fetchTeams();
        fetchParticipants();
    }, []);

    const fetchParticipants = async () => {
        try {
            const response = await axios.get('/api/participants', {
                headers: { 'X-Role': role }
            });
            setParticipants(response.data);
        } catch (error) {
            console.error('Error fetching participants:', error);
        }
    };

    const fetchKumites = async () => {
        try {
            const response = await axios.get('/api/kumites?full=true', {
                headers: { 'X-Role': role }
            });
            setKumites(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching kumites:', error);
            setLoading(false);
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

    const fetchTatamis = async () => {
        try {
            const response = await axios.get('/api/tatamis', {
                headers: { 'X-Role': role }
            });
            setTatamis(response.data);
        } catch (error) {
            console.error('Error fetching tatamis:', error);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Вы уверены, что хотите удалить этот бой?')) return;

        try {
            await axios.delete(`/api/kumites/${id}/delete-with-participants`, {
                headers: { 'X-Role': role }
            });
            fetchKumites();
        } catch (error) {
            console.error('Error deleting kumite:', error);
            alert('Ошибка при удалении боя');
        }
    };

    // Функция для получения правильного ID боя
    const getKumiteId = (kumite) => {
        return kumite.id || kumite.idKumite;
    };

    return (
        <div className="kumites-page">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">
                    Бои
                </h2>
                {role === 'organizer' && (
                    <button
                        onClick={() => {
                            setSelectedKumite(null);
                            setShowForm(true);
                        }}
                        className="btn btn-add bg-karate-gray hover:bg-karate-red-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
                    >
                        <svg className="icon" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 010-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                        </svg>
                        Добавить новый бой
                    </button>
                )}
            </div>

            {loading ? (
                <div className="flex justify-center items-center h-96">
                    <div className="loading-spinner border-4 border-karate-red rounded-full w-16 h-16 animate-spin"></div>
                </div>
            ) : (
                <div className="mt-4">
                    <div className="card mb-4 rounded-lg shadow-md overflow-hidden">
                        <table className="min-w-full">
                            <thead className="bg-gray-800 text-white">
                            <tr>
                                <th className="py-3 px-4 text-left">Номер боя</th>
                                <th className="py-3 px-4 text-left">Татами</th>
                                <th className="py-3 px-4 text-left">Судейская бригада</th>
                                <th className="py-3 px-4 text-left">Победитель</th>
                                {role === 'organizer' && <th className="py-3 px-4 text-right">Действия</th>}
                            </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                            {kumites.map((kumite) => {
                                const kumiteId = getKumiteId(kumite);

                                return (
                                    <tr key={kumiteId} className="hover:bg-gray-50">
                                        <td className="py-4 px-4 font-medium">#{kumiteId}</td>
                                        <td className="py-4 px-4">
                                            <div className="text-gray-700">
                                                Татами {kumite.tatami?.idTatami || 'N/A'}
                                            </div>
                                        </td>
                                        <td className="py-4 px-4">
                                            <div className="inline-flex items-center gap-1 bg-red-100 text-red-800 px-2 py-1 rounded text-xs font-medium">
                                                Бригада {kumite.team?.id}
                                            </div>
                                        </td>
                                        <td className="py-4 px-4">
                                                <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                                                    kumite.winner === 'RED' ? 'bg-red-100 text-red-800' :
                                                        kumite.winner === 'WHITE' ? 'bg-gray-100 text-gray-800' :
                                                            'bg-yellow-100 text-yellow-800'
                                                }`}>
                                                    {kumite.winner === 'RED' ? 'Красный' :
                                                        kumite.winner === 'WHITE' ? 'Белый' :
                                                            'Ничья'}
                                                </span>
                                        </td>
                                        {role === 'organizer' && (
                                            <td className="py-4 px-4">
                                                <div className="flex justify-end gap-2">
                                                    <button
                                                        onClick={() => {
                                                            setSelectedKumite(kumite);
                                                            setShowForm(true);
                                                        }}
                                                        className="text-blue-600 hover:text-blue-800"
                                                        title="Редактировать"
                                                    >
                                                        <svg className="icon" viewBox="0 0 20 20" fill="currentColor">
                                                            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                                                        </svg>
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(kumiteId)}
                                                        className="text-red-600 hover:text-red-800"
                                                        title="Удалить"
                                                    >
                                                        <svg className="icon" viewBox="0 0 20 20" fill="currentColor">
                                                            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h12a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </td>
                                        )}
                                    </tr>
                                );
                            })}
                            </tbody>
                        </table>
                        {kumites.length === 0 && (
                            <div className="p-8 text-center text-gray-500">
                                Нет доступных боев
                            </div>
                        )}
                    </div>
                </div>
            )}

            {showForm && (
                <KumiteForm
                    kumite={selectedKumite}
                    tatamis={tatamis}
                    teams={teams}
                    participants={participants}
                    onClose={() => {
                        setShowForm(false);
                        setSelectedKumite(null);
                    }}
                    onSave={() => {
                        fetchKumites();
                        setShowForm(false);
                        setSelectedKumite(null);
                    }}
                    role={role}
                />
            )}
        </div>
    );
};

export default KumitesPage;