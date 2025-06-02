import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getKumites, deleteKumite } from '../../services/api';
import { FiEdit, FiTrash2, FiPlus } from 'react-icons/fi';

const KumiteList = () => {
    const [kumites, setKumites] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchKumites = async () => {
            try {
                const response = await getKumites();
                setKumites(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching kumites:', error);
                setLoading(false);
            }
        };

        fetchKumites();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm('Вы уверены, что хотите удалить бой?')) {
            try {
                await deleteKumite(id);
                setKumites(kumites.filter(k => k.idKumite !== id));
            } catch (error) {
                console.error('Error deleting kumite:', error);
            }
        }
    };

    if (loading) {
        return <div className="text-center py-10">Загрузка боев...</div>;
    }

    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Список боев</h2>
                <Link
                    to="/kumites/new"
                    className="bg-primary hover:bg-blue-700 text-white py-2 px-4 rounded flex items-center"
                >
                    <FiPlus className="mr-2" /> Добавить бой
                </Link>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full bg-white">
                    <thead className="bg-gray-100">
                    <tr>
                        <th className="py-3 px-4 text-left">ID</th>
                        <th className="py-3 px-4 text-left">Татами</th>
                        <th className="py-3 px-4 text-left">Бригада</th>
                        <th className="py-3 px-4 text-left">Победитель</th>
                        <th className="py-3 px-4 text-right">Действия</th>
                    </tr>
                    </thead>
                    <tbody>
                    {kumites.map(kumite => (
                        <tr key={kumite.idKumite} className="border-b hover:bg-gray-50">
                            <td className="py-3 px-4">{kumite.idKumite}</td>
                            <td className="py-3 px-4">Татами {kumite.tatami.idTatami}</td>
                            <td className="py-3 px-4">Бригада {kumite.team.idJudgingTeam}</td>
                            <td className="py-3 px-4">{kumite.winner}</td>
                            <td className="py-3 px-4 text-right">
                                <div className="flex justify-end space-x-2">
                                    <Link
                                        to={`/kumites/edit/${kumite.idKumite}`}
                                        className="text-blue-600 hover:text-blue-800"
                                    >
                                        <FiEdit size={18} />
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(kumite.idKumite)}
                                        className="text-red-600 hover:text-red-800"
                                    >
                                        <FiTrash2 size={18} />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default KumiteList;