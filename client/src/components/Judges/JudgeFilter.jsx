import React, { useState, useEffect } from 'react';
import {
    getJudgesByTeam,
    getJudgingTeams
} from '../../services/api';

const JudgeFilter = () => {
    const [teams, setTeams] = useState([]);
    const [selectedTeam, setSelectedTeam] = useState('');
    const [judges, setJudges] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchTeams = async () => {
            try {
                const response = await getJudgingTeams();
                setTeams(response.data);
            } catch (error) {
                console.error('Error fetching teams:', error);
            }
        };

        fetchTeams();
    }, []);

    useEffect(() => {
        if (selectedTeam) {
            fetchJudges();
        }
    }, [selectedTeam]);

    const fetchJudges = async () => {
        setLoading(true);
        try {
            const response = await getJudgesByTeam(selectedTeam);
            setJudges(response.data);
        } catch (error) {
            console.error('Error fetching judges:', error);
        }
        setLoading(false);
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-6">Фильтр судей</h2>

            <div className="mb-6">
                <label className="block text-gray-700 mb-2">Судейская бригада:</label>
                <select
                    value={selectedTeam}
                    onChange={(e) => setSelectedTeam(e.target.value)}
                    className="w-full md:w-1/2 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-secondary"
                >
                    <option value="">Выберите бригаду</option>
                    {teams.map(team => (
                        <option key={team.idJudgingTeam} value={team.idJudgingTeam}>
                            Бригада {team.idJudgingTeam} (Татами {team.tatami.idTatami})
                        </option>
                    ))}
                </select>
            </div>

            {loading ? (
                <div className="text-center py-6">Загрузка судей...</div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white">
                        <thead className="bg-gray-100">
                        <tr>
                            <th className="py-3 px-4 text-left">Фамилия</th>
                            <th className="py-3 px-4 text-left">Имя</th>
                            <th className="py-3 px-4 text-left">Бригада</th>
                            <th className="py-3 px-4 text-left">Татами</th>
                        </tr>
                        </thead>
                        <tbody>
                        {judges.map(judge => (
                            <tr key={judge.idJudge} className="border-b hover:bg-gray-50">
                                <td className="py-3 px-4">{judge.lastName}</td>
                                <td className="py-3 px-4">{judge.firstName}</td>
                                <td className="py-3 px-4">Бригада {judge.team.idJudgingTeam}</td>
                                <td className="py-3 px-4">Татами {judge.team.tatami.idTatami}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>

                    {judges.length === 0 && !loading && selectedTeam && (
                        <div className="text-center py-6 text-gray-500">
                            Судьи не найдены для выбранной бригады
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default JudgeFilter;