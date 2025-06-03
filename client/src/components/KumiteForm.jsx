import React, { useState, useEffect } from 'react';
import axios from 'axios';

const KumiteForm = ({ kumite, tatamis, teams, onClose, onSave, role }) => {
    const [formData, setFormData] = useState({
        tatamiId: tatamis.length > 0 ? tatamis[0].id : '',
        teamId: teams.length > 0 ? teams[0].id : '',
        winner: 'RED'
    });

    useEffect(() => {
        if (kumite) {
            setFormData({
                tatamiId: kumite.tatami?.id || '',
                teamId: kumite.team?.id || '',
                winner: kumite.winner || 'RED'
            });
        }
    }, [kumite]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = {
                tatami: { id: parseInt(formData.tatamiId) },
                team: { id: parseInt(formData.teamId) },
                winner: formData.winner
            };

            if (kumite) {
                await axios.put(`/api/kumites/${kumite.idKumite}`, data, {
                    headers: { 'X-Role': role }
                });
            } else {
                await axios.post('/api/kumites', data, {
                    headers: { 'X-Role': role }
                });
            }
            onSave();
        } catch (error) {
            console.error('Error saving kumite:', error);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="modal card bg-white rounded-lg overflow-hidden w-full max-w-md">
                <div className="bg-red-700 px-6 py-4 text-white flex justify-between items-center">
                    <svg className="icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10 22a10 10 0 110-20 10 10 0 010 20zM9.5 17a4.5 4.5 0 004.5-4.5V8a4.5 4.5 0 00-4.5-4.5H4a4.5 4.5 0 00-4.5 4.5v4a4.5 4.5 0 004.5 4.5h5.5v6.5A1.5 1.5 0 019 22h0z" fill="currentColor" />
                    </svg>
                    <h3 className="text-lg font-bold">
                        {kumite ? 'Изменить бой' : 'Добавить новый бой'}
                    </h3>
                </div>

                <form onSubmit={handleSubmit} className="p-6">
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            <svg className="icon h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                            Татами
                        </label>
                        <select
                            name="tatamiId"
                            value={formData.tatamiId}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-karate-red focus:border-karate-red"
                            required
                        >
                            <option value="">Выбрать татами</option>
                            {tatamis.map(tatami => (
                                <option key={tatami.id} value={tatami.id}>
                                    Татами {tatami.id}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            <svg className="icon h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                            Судейская бригада
                        </label>
                        <select
                            name="teamId"
                            value={formData.teamId}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-karate-red focus:border-karate-red"
                            required
                        >
                            <option value="">Выбрать бригаду</option>
                            {teams.map(team => (
                                <option key={team.id} value={team.id}>
                                    Бригада {team.id}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            <svg className="icon h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            Победитель
                        </label>
                        <select
                            name="winner"
                            value={formData.winner}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-karate-red focus:border-karate-red"
                            required
                        >
                            <option value="RED">Красный</option>
                            <option value="WHITE">Белый</option>
                            <option value="DRAW">Ничья</option>
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

export default KumiteForm;