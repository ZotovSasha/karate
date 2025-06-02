import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
    getJudge,
    createJudge,
    updateJudge,
    getJudgingTeams
} from '../../services/api';
import { FiSave, FiArrowLeft } from 'react-icons/fi';

const JudgeForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [teams, setTeams] = useState([]);
    const [formData, setFormData] = useState({
        lastName: '',
        firstName: '',
        teamId: ''
    });
    const [loading, setLoading] = useState(false);
    const [isEdit, setIsEdit] = useState(false);

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

        if (id) {
            setIsEdit(true);
            fetchJudge();
        }
    }, [id]);

    const fetchJudge = async () => {
        setLoading(true);
        try {
            const response = await getJudge(id);
            setFormData({
                lastName: response.data.lastName,
                firstName: response.data.firstName,
                teamId: response.data.team.idJudgingTeam
            });
        } catch (error) {
            console.error('Error fetching judge:', error);
        }
        setLoading(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            if (isEdit) {
                await updateJudge(id, formData);
            } else {
                await createJudge(formData);
            }
            navigate('/judges');
        } catch (error) {
            console.error('Error saving judge:', error);
            setLoading(false);
        }
    };

    if (loading && isEdit) {
        return <div className="text-center py-10">Загрузка данных судьи...</div>;
    }

    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">
                    {isEdit ? 'Редактировать судью' : 'Добавить судью'}
                </h2>
                <button
                    onClick={() => navigate('/judges')}
                    className="flex items-center text-gray-600 hover:text-gray-800"
                >
                    <FiArrowLeft className="mr-1" /> Назад
                </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-gray-700 mb-2">Фамилия:</label>
                    <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-secondary"
                        required
                    />
                </div>

                <div>
                    <label className="block text-gray-700 mb-2">Имя:</label>
                    <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-secondary"
                        required
                    />
                </div>

                <div>
                    <label className="block text-gray-700 mb-2">Бригада:</label>
                    <select
                        name="teamId"
                        value={formData.teamId}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-secondary"
                        required
                    >
                        <option value="">Выберите бригаду</option>
                        {teams.map(team => (
                            <option key={team.idJudgingTeam} value={team.idJudgingTeam}>
                                Бригада {team.idJudgingTeam} (Татами {team.tatami.idTatami})
                            </option>
                        ))}
                    </select>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="bg-primary hover:bg-blue-700 text-white py-2 px-4 rounded flex items-center"
                >
                    <FiSave className="mr-2" /> {loading ? 'Сохранение...' : 'Сохранить'}
                </button>
            </form>
        </div>
    );
};

export default JudgeForm;