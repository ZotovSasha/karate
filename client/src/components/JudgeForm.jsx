import React, { useState, useEffect } from 'react';
import axios from 'axios';

const JudgeForm = ({ judge, teams, onClose, onSave, role }) => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        teamId: teams.length > 0 ? teams[0].id : ''
    });
    const [selectedTeam, setSelectedTeam] = useState(teams.length > 0 ? teams[0].id : '');

    useEffect(() => {
        if (judge) {
            setFormData({
                firstName: judge.firstName,
                lastName: judge.lastName,
                teamId: judge.team.id
            });
            setSelectedTeam(judge.team.id);
        }
    }, [judge]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = {
                ...formData,
                team: { id: parseInt(formData.teamId) }
            };

            if (judge) {
                await axios.put(`/api/judges/${judge.idJudge}`, data, {
                    headers: { 'X-Role': role }
                });
            } else {
                await axios.post('/api/judges', data, {
                    headers: { 'X-Role': role }
                });
            }
            onSave();
        } catch (error) {
            console.error('Error saving judge:', error);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="card bg-white rounded-lg overflow-hidden w-full max-w-md">
                <div className="bg-red-700 px-6 py-4 text-white flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <svg className="icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" fill="currentColor" />
                        </svg>
                        <h3 className="text-lg font-bold">
                            {judge ? 'Edit Judge' : 'Add New Judge'}
                        </h3>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="p-6">
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            First Name
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
                            Last Name
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

                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Judging Team
                        </label>
                        <select
                            name="teamId"
                            value={formData.teamId}
                            onChange={(e) => {
                                setFormData(prev => ({ ...prev, teamId: e.target.value }));
                                setSelectedTeam(e.target.value);
                            }}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-karate-red focus:border-karate-red"
                        >
                            <option value="">Select Team</option>
                            {teams.map(team => (
                                <option key={team.id} value={team.id}>
                                    Team {team.id}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="flex justify-end space-x-3 pt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="btn-text px-4 py-2 text-gray-600 hover:text-gray-800 flex items-center"
                        >
                            <svg className="icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M15.586 8.586l-7 7L8 12l7-7 1.414 1.414L7.414 13H13v2l-5.586-5.586z" fill="currentColor" />
                            </svg>
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="btn-primary px-4 py-2 text-white hover:bg-red-700 flex items-center"
                        >
                            <svg className="icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" fill="currentColor" />
                            </svg>
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default JudgeForm;
