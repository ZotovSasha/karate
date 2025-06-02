import React, { useState, useEffect } from 'react';
import {
    getParticipantsByCategory,
    getCategories
} from '../../services/api';

const ParticipantFilter = () => {
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [participants, setParticipants] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await getCategories();
                setCategories(response.data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();
    }, []);

    useEffect(() => {
        if (selectedCategory) {
            fetchParticipants();
        }
    }, [selectedCategory]);

    const fetchParticipants = async () => {
        setLoading(true);
        try {
            const response = await getParticipantsByCategory(selectedCategory);
            setParticipants(response.data);
        } catch (error) {
            console.error('Error fetching participants:', error);
        }
        setLoading(false);
    };

    const filteredParticipants = participants.filter(p =>
        p.lastName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-6">Фильтр участников</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                    <label className="block text-gray-700 mb-2">Категория:</label>
                    <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-secondary"
                    >
                        <option value="">Выберите категорию</option>
                        {categories.map(category => (
                            <option key={category.idCategory} value={category.idCategory}>
                                {category.ageGroup} | {category.weightGroup} | {category.gender}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-gray-700 mb-2">Поиск по фамилии:</label>
                    <input
                        type="text"
                        placeholder="Введите фамилию"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-secondary"
                    />
                </div>
            </div>

            {loading ? (
                <div className="text-center py-6">Загрузка участников...</div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white">
                        <thead className="bg-gray-100">
                        <tr>
                            <th className="py-3 px-4 text-left">Фамилия</th>
                            <th className="py-3 px-4 text-left">Имя</th>
                            <th className="py-3 px-4 text-left">Личный номер</th>
                            <th className="py-3 px-4 text-left">Категория</th>
                        </tr>
                        </thead>
                        <tbody>
                        {filteredParticipants.map(participant => (
                            <tr key={participant.idParticipant} className="border-b hover:bg-gray-50">
                                <td className="py-3 px-4">{participant.lastName}</td>
                                <td className="py-3 px-4">{participant.firstName}</td>
                                <td className="py-3 px-4">{participant.personalCode}</td>
                                <td className="py-3 px-4">
                                    {participant.category.ageGroup} ({participant.category.weightGroup})
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>

                    {filteredParticipants.length === 0 && !loading && (
                        <div className="text-center py-6 text-gray-500">
                            Участники не найдены
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default ParticipantFilter;