import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ParticipantForm = ({ participant, categories, onClose, onSave, role }) => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        personalCode: '',
        categoryId: categories.length > 0 ? categories[0].id : ''
    });

    useEffect(() => {
        if (participant) {
            setFormData({
                firstName: participant.firstName,
                lastName: participant.lastName,
                personalCode: participant.personalCode,
                categoryId: participant.category.id
            });
        }
    }, [participant]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = {
                ...formData,
                category: { id: parseInt(formData.categoryId) }
            };

            if (participant) {
                await axios.put(`/api/participants/${participant.id}`, data, {
                    headers: { 'X-Role': role }
                });
            } else {
                await axios.post('/api/participants', data, {
                    headers: { 'X-Role': role }
                });
            }
            onSave();
        } catch (error) {
            console.error('Error saving participant:', error);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="modal card bg-white rounded-lg overflow-hidden w-full max-w-md">
                <div className="bg-red-700 px-6 py-4 text-white flex justify-between items-center">
                    <svg className="icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2a10 10 0 00-3.93 15.65L6.2 8.6iA6 6 0 007.5 7l.4.58A5 5 0 0115.08 2H12z" fill="currentColor" />
                    </svg>
                    <h3 className="text-lg font-bold">
                        {participant ? 'Изменить участника' : 'Добавить нового участника'}
                    </h3>
                </div>

                <form onSubmit={handleSubmit} className="p-6">
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Имя
                        </label>
                        <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-karate-red focus:border-karate-red"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Фамилия
                        </label>
                        <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-karate-red focus:border-karate-red"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Личный номер
                        </label>
                        <input
                            type="text"
                            name="personalCode"
                            value={formData.personalCode}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-karate-red focus:border-karate-red"
                            required
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Категория
                        </label>
                        <select
                            name="categoryId"
                            value={formData.categoryId}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-karate-red focus:border-karate-red"
                        >
                            <option value="">Выберите категорию</option>
                            {categories.map(category => (
                                <option key={category.id} value={category.id}>
                                    {category.ageGroup} | {category.weightGroup} | {category.gender}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="flex justify-end space-x-3 pt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="btn-text px-4 py-2 text-gray-600 hover:text-gray-800"
                        >
                            Отмена
                        </button>
                        <button
                            type="submit"
                            className="btn-primary px-4 py-2 text-white hover:bg-red-700"
                        >
                            Сохранить
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ParticipantForm;