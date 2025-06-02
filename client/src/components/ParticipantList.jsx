import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
    getParticipants,
    deleteParticipant
} from '../../services/api';
import { FiEdit, FiTrash2, FiPlus } from 'react-icons/fi';

const ParticipantList = () => {
    const [participants, setParticipants] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchParticipants = async () => {
            try {
                const response = await getParticipants();
                setParticipants(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching participants:', error);
                setLoading(false);
            }
        };

        fetchParticipants();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm('Вы уверены, что хотите удалить участника?')) {
            try {
                await deleteParticipant(id);
                setParticipants(participants.filter(p => p.idParticipant !== id));
            } catch (error) {
                console.error('Error deleting participant:', error);
            }
        }
    };

    if (loading) {
        return <div className="text-center py-10">Загрузка участников...</div>;
    }

    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Участники соревнований</h2>
                <Link
                    to="/participants/new"
                    className="bg-primary hover:bg-blue-700 text-white py-2 px-4 rounded flex items-center"
                >
                    <FiPlus className="mr-2" /> Добавить участника
                </Link>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full bg-white">
                    <thead className="bg-gray-100">
                    <tr>
                        <th className="py-3 px-4 text-left">ID</th>
                        <th className="py-3 px-4 text-left">Фамилия</th>
                        <th className="py-3 px-4 text-left">Имя</th>
                        <th className="py-3 px-4 text-left">Личный номер</th>
                        <th className="py-3 px-4 text-left">Категория</th>
                        <th className="py-3 px-4 text-right">Действия</th>
                    </tr>
                    </thead>
                    <tbody>
                    {participants.map(participant => (
                        <tr key={participant.idParticipant} className="border-b hover:bg-gray-50">
                            <td className="py-3 px-4">{participant.idParticipant}</td>
                            <td className="py-3 px-4">{participant.lastName}</td>
                            <td className="py-3 px-4">{participant.firstName}</td>
                            <td className="py-3 px-4">{participant.personalCode}</td>
                            <td className="py-3 px-4">
                                {participant.category?.ageGroup} ({participant.category?.weightGroup})
                            </td>
                            <td className="py-3 px-4 text-right">
                                <div className="flex justify-end space-x-2">
                                    <Link
                                        to={`/participants/edit/${participant.idParticipant}`}
                                        className="text-blue-600 hover:text-blue-800"
                                    >
                                        <FiEdit size={18} />
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(participant.idParticipant)}
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

export default ParticipantList;