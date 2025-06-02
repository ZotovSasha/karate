import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
    getKumite,
    createKumite,
    updateKumite,
    getTatamis,
    getJudgingTeams
} from '../../services/api';
import { FiSave, FiArrowLeft } from 'react-icons/fi';

const KumiteForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [tatamis, setTatamis] = useState([]);
    const [teams, setTeams] = useState([]);
    const [formData, setFormData] = useState({
        tatamiId: '',
        teamId: '',
        winner: ''
    });
    const [loading, setLoading] = useState(false);
    const [isEdit, setIsEdit] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const tatamisResponse = await getTatamis();
                setTatamis(tatamisResponse.data);

                const teamsResponse = await getJudgingTeams();
                setTeams(teamsResponse.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();

        if (id) {
            setIsEdit(true);
            fetchKumite();
        }
    }, [id]);

    const fetchKumite = async () => {
        setLoading(true);
        try {
            const response = await getKumite(id);
            setFormData({
                tatamiId: response.data.tatami.idTatami,
                teamId: response.data.team.idJudgingTeam,
                winner: response.data.winner
            });
        } catch (error) {
            console.error('Error fetching kumite:', error);
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
                await updateKumite(id, formData);
            } else {
                await createKumite(formData);
            }
            navigate('/kumites');
        } catch (error) {
            console.error('Error saving kumite:', error);
            setLoading(false);
        }
    };

    if (loading && isEdit) {
        return <div className="text-center py-10">Загрузка данных боя...</div>;
    }

    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">
                    {isEdit ? 'Редактировать бой' : 'Добавить бой'}
                </h2>
                <button
                    onClick={() => navigate('/kumites')}
                    className="flex items-center text-gray-600 hover:text-gray-800"
                >
                    <FiArrowLeft className="mr-1" /> Назад
                </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-gray-700 mb-2">Татами:</label>
                    <select
                        name="tatamiId"
                        value={formData.tatamiId}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-secondary"
                        required
                    >
                        <option value="">Выберите татами</option>
                        {tatamis.map(tatami => (
                            <option key={tatami.idTatami} value={tatami.idTatami}>
                                Татами {tatami.idTatami}
                            </option>
                        ))}
                    </select>
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
                                Бригада {team.idJudgingTeam}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-gray-700 mb-2">Победитель:</label>
                    <select
                        name="winner"
                        value={formData.winner}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-secondary"
                        required
                    >
                        <option value="">Выберите победителя</option>
                        <option value="RED">Красный</option>
                        <option value="WHITE">Белый</option>
                        <option value="DRAW">Ничья</option>
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

export default KumiteForm;