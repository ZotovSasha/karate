import React, { useState, useEffect } from 'react';
import axios from 'axios';

const KumiteForm = ({
                        kumite,
                        tatamis,
                        teams,
                        participants,
                        onClose,
                        onSave,
                        role
                    }) => {
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
            // Преобразуем participantAssociations в формат { participantId, side }
            const formattedParticipants =
                Array.isArray(kumite.participantAssociations) &&
                kumite.participantAssociations.length > 0
                    ? kumite.participantAssociations.map((p) => ({
                        participantId: p.participant.id,
                        side: p.side
                    }))
                    : [
                        { participantId: '', side: 'RED' },
                        { participantId: '', side: 'WHITE' }
                    ];

            // Если пришёл только один участник, добавим «пустого» для второй стороны
            if (formattedParticipants.length === 1) {
                const existingSide = formattedParticipants[0].side;
                const missingSide = existingSide === 'RED' ? 'WHITE' : 'RED';
                formattedParticipants.push({ participantId: '', side: missingSide });
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
        setFormData((prev) => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: '' }));
        }
    };

    const handleParticipantChange = (index, e) => {
        const { name, value } = e.target;
        const updated = [...formData.participants];
        updated[index] = {
            ...updated[index],
            [name]: value
        };
        setFormData((prev) => ({ ...prev, participants: updated }));
        if (errors[`participant_${index}`]) {
            setErrors((prev) => ({ ...prev, [`participant_${index}`]: '' }));
        }
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.tatamiId) newErrors.tatamiId = 'Выберите татами';
        if (!formData.teamId) newErrors.teamId = 'Выберите бригаду';

        formData.participants.forEach((p, idx) => {
            if (!p.participantId) {
                newErrors[`participant_${idx}`] = 'Выберите участника';
            }
        });

        // Проверяем, чтобы они не совпадали
        const ids = formData.participants.map((p) => p.participantId);
        if (ids[0] && ids[1] && ids[0] === ids[1]) {
            newErrors.participants = 'Участники должны быть разными';
        }

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
                winner: formData.winner,
                participants: formData.participants.map((p) => ({
                    participantId: parseInt(p.participantId, 10),
                    side: p.side
                }))
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

                    {formData.participants.map((participant, index) => (
                        <div key={index} className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Участник ({participant.side === 'RED' ? 'Красный' : 'Белый'})
                            </label>
                            <select
                                name="participantId"
                                value={participant.participantId}
                                onChange={(e) => handleParticipantChange(index, e)}
                                className={`w-full px-3 py-2 border rounded-md focus:ring-karate-red focus:border-karate-red ${
                                    errors[`participant_${index}`] ? 'border-red-500' : 'border-gray-300'
                                }`}
                                required
                            >
                                <option value="">Выбрать участника</option>
                                {participants.map((p) => (
                                    <option key={p.id} value={p.id}>
                                        {p.lastName} {p.firstName}
                                    </option>
                                ))}
                            </select>
                            {errors[`participant_${index}`] && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors[`participant_${index}`]}
                                </p>
                            )}
                        </div>
                    ))}

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