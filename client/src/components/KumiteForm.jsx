import React, { useState, useEffect } from 'react';
import axios from 'axios';

const KumiteForm = ({
                        kumite,
                        tatamis,
                        teams,
                        onClose,
                        onSave,
                        role
                    }) => {
    const [formData, setFormData] = useState({
        tatamiId: tatamis.length > 0 ? tatamis[0].idTatami : '',
        teamId: teams.length > 0 ? teams[0].id : '',
        winner: 'RED'
    });

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (kumite) {
            setFormData({
                tatamiId: kumite.tatami?.idTatami || '',
                teamId: kumite.team?.id || '',
                winner: kumite.winner || 'RED'
            });
        }
    }, [kumite]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: '' }));
        }
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.tatamiId) newErrors.tatamiId = 'Выберите татами';
        if (!formData.teamId) newErrors.teamId = 'Выберите бригаду';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;
        setIsSubmitting(true);

        try {
            const payload = {
                tatamiId: formData.tatamiId,
                teamId: parseInt(formData.teamId, 10),
                winner: formData.winner
            };

            const kumiteId = kumite?.id || kumite?.idKumite;
            if (kumiteId) {
                await axios.put(`/api/kumites/${kumiteId}`, payload, {
                    headers: { 'X-Role': role }
                });
            } else {
                await axios.post('/api/kumites', payload, {
                    headers: { 'X-Role': role }
                });
            }

            onSave();
        } catch (err) {
            console.error('Error saving kumite:', err);
            setErrors({ submit: 'Ошибка при сохранении боя' });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="modal card bg-white rounded-lg overflow-hidden w-full max-w-lg">
                <div className="bg-red-700 px-6 py-4 text-white flex justify-between items-center">
                    <h3 className="text-lg font-bold">
                        {kumite ? 'Изменить бой' : 'Добавить новый бой'}
                    </h3>
                    <button onClick={onClose} className="text-white hover:text-gray-200">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6">
                    {errors.submit && (
                        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                            {errors.submit}
                        </div>
                    )}

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Татами
                        </label>
                        <select
                            name="tatamiId"
                            value={formData.tatamiId}
                            onChange={handleChange}
                            className={`w-full px-3 py-2 border rounded-md focus:ring-red-500 focus:border-red-500 ${
                                errors.tatamiId ? 'border-red-500' : 'border-gray-300'
                            }`}
                            required
                        >
                            <option value="">Выбрать татами</option>
                            {tatamis.map((t) => (
                                <option key={t.idTatami} value={t.idTatami}>
                                    Татами {t.idTatami}
                                </option>
                            ))}
                        </select>
                        {errors.tatamiId && (
                            <p className="text-red-500 text-sm mt-1">{errors.tatamiId}</p>
                        )}
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
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
                            {teams.map((team) => (
                                <option key={team.id} value={team.id}>
                                    Бригада {team.id}
                                </option>
                            ))}
                        </select>
                        {errors.teamId && (
                            <p className="text-red-500 text-sm mt-1">{errors.teamId}</p>
                        )}
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
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

                    {errors.participants && (
                        <div className="mb-4 text-red-500 text-sm">{errors.participants}</div>
                    )}

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
                            className="btn-primary px-4 py-2 bg-red-600 text-white hover:bg-red-700 rounded-md"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Сохранение...' : 'Сохранить'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default KumiteForm;