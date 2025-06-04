import React, { useState, useEffect } from 'react';
import axios from 'axios';

const KumiteForm = ({ kumite, tatamis, teams, participants, onClose, onSave, role }) => {
    const [formData, setFormData] = useState({
        tatamiId: tatamis.length > 0 ? tatamis[0].idTatami : '',
        teamId: teams.length > 0 ? teams[0].id : '',
        winner: 'RED',
        participants: [
            { participantId: '', side: 'RED' },
            { participantId: '', side: 'WHITE' }
        ]
    });

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (kumite) {
            const formattedParticipants = kumite.participantAssociations?.map(p => ({
                participantId: p.participant.id,
                side: p.side
            })) || [
                { participantId: '', side: 'RED' },
                { participantId: '', side: 'WHITE' }
            ];

            // Убеждаемся, что у нас есть участник для каждой стороны
            if (formattedParticipants.length === 1) {
                const existingSide = formattedParticipants[0].side;
                const missingSide = existingSide === 'RED' ? 'WHITE' : 'RED';
                formattedParticipants.push({ participantId: '', side: missingSide });
            } else if (formattedParticipants.length === 0) {
                formattedParticipants.push(
                    { participantId: '', side: 'RED' },
                    { participantId: '', side: 'WHITE' }
                );
            }

            setFormData({
                tatamiId: kumite.tatami?.idTatami || '',
                teamId: kumite.team?.id || '',
                winner: kumite.winner || 'RED',
                participants: formattedParticipants
            });
        }
    }, [kumite]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        // Очищаем ошибку для этого поля
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const handleParticipantChange = (index, e) => {
        const { name, value } = e.target;
        const updatedParticipants = [...formData.participants];
        updatedParticipants[index] = {
            ...updatedParticipants[index],
            [name]: value
        };

        setFormData(prev => ({
            ...prev,
            participants: updatedParticipants
        }));

        // Очищаем ошибку для участника
        if (errors[`participant_${index}`]) {
            setErrors(prev => ({ ...prev, [`participant_${index}`]: '' }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.tatamiId) {
            newErrors.tatamiId = 'Выберите татами';
        }

        if (!formData.teamId) {
            newErrors.teamId = 'Выберите судейскую бригаду';
        }

        formData.participants.forEach((participant, index) => {
            if (!participant.participantId) {
                newErrors[`participant_${index}`] = 'Выберите участника';
            }
        });

        // Проверяем, что участники разные
        const participantIds = formData.participants
            .filter(p => p.participantId)
            .map(p => p.participantId);

        if (participantIds.length === 2 && participantIds[0] === participantIds[1]) {
            newErrors.participants = 'Участники должны быть разными';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);

        try {
            const data = {
                tatamiId: formData.tatamiId,
                teamId: parseInt(formData.teamId),
                winner: formData.winner,
                participants: formData.participants
                    .filter(p => p.participantId) // Фильтруем пустых участников
                    .map(p => ({
                        participantId: parseInt(p.participantId),
                        side: p.side
                    }))
            };

            const kumiteId = kumite?.id || kumite?.idKumite;

            if (kumiteId) {
                await axios.put(`/api/kumites/${kumiteId}`, data, {
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
                    <button
                        onClick={onClose}
                        className="text-white hover:text-gray-200"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
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
                            <svg className="inline h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                            Татами
                        </label>
                        <select
                            name="tatamiId"
                            value={formData.tatamiId}
                            onChange={handleChange}
                            className={`w-full px-3 py-2 border rounded-md focus:ring-red-500 focus:border-red-500 ${errors.tatamiId ? 'border-red-500' : 'border-gray-300'}`}
                            required
                        >
                            <option value="">Выбрать татами</option>
                            {tatamis.map(tatami => (
                                <option key={tatami.idTatami} value={tatami.idTatami}>
                                    Татами {tatami.idTatami}
                                </option>
                            ))}
                        </select>
                        {errors.tatamiId && <p className="text-red-500 text-sm mt-1">{errors.tatamiId}</p>}
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

                    {formData.participants.map((participant, index) => (
                        <div key={index} className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Участник ({participant.side === 'RED' ? 'Красный' : 'Белый'})
                            </label>
                            <select
                                name="participantId"
                                value={participant.participantId}
                                onChange={(e) => handleParticipantChange(index, e)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-karate-red focus:border-karate-red"
                                required
                            >
                                <option value="">Выбрать участника</option>
                                {participants.map(p => (
                                    <option key={p.id} value={p.id}>
                                        {p.lastName} {p.firstName}
                                    </option>
                                ))}
                            </select>
                        </div>
                    ))}

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