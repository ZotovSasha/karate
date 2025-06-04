import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ParticipantForm from '../components/ParticipantForm';
import FilterBar from '../components/FilterBar';

const ParticipantsPage = ({ role }) => {
    const [categories, setCategories] = useState([]);
    const [filteredParticipants, setFilteredParticipants] = useState([]);
    const [selectedParticipant, setSelectedParticipant] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchParticipants();
        fetchCategories();
    }, []);

    const fetchParticipants = async () => {
        try {
            const response = await axios.get('/api/participants', {
                headers: { 'X-Role': role }
            });
            setFilteredParticipants(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching participants:', error);
        }
    };

    const fetchCategories = async () => {
        try {
            const response = await axios.get('/api/participants/categories', {
                headers: { 'X-Role': role }
            });
            setCategories(response.data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    const handleFilter = async (categoryId, searchTerm) => {
        try {
            const normalizedSearch = searchTerm ? searchTerm.toLowerCase() : null;
            const response = await axios.get('/api/participants/filter', {
                params: {
                    categoryId: categoryId || null,
                    search: normalizedSearch || null
                },
                headers: { 'X-Role': role }
            });
            setFilteredParticipants(response.data);
        } catch (error) {
            console.error('Error filtering participants:', error);
        }
    };

    return (
        <div className="participants-page">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">
                    Участники соревнований
                </h2>
                {role === 'organizer' && (
                    <button
                        onClick={() => {
                            setSelectedParticipant(null);
                            setShowForm(true);
                        }}
                        className="btn btn-add bg-karate-gray hover:bg-red-800  px-4 py-2 rounded-lg flex items-center gap-2"
                    >
                        <svg className="icon h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 010-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                        </svg>
                        Добавить нового участника
                    </button>
                )}
            </div>

            <FilterBar categories={categories} onFilter={handleFilter} />

            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="loading-spinner border-4 border-karate-red rounded-full w-16 h-16 animate-spin"></div>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                    {filteredParticipants.map((participant) => (
                        <div
                            key={participant.id}
                            className="card bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition transform hover:-translate-y-1 duration-300"
                        >
                            <div className="p-5 relative">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-800 mb-1">
                                            {participant.lastName} {participant.firstName}
                                        </h3>
                                        <p className="text-gray-600 text-sm mb-2">
                                            Личный номер: {participant.personalCode}
                                        </p>
                                        <div className="inline-block bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs font-medium mb-2">
                                            Категория: {participant.category?.ageGroup} | {participant.category?.weightGroup}
                                        </div>
                                    </div>
                                </div>

                                {role === 'organizer' && (
                                    <div className="flex space-x-2 mt-4">
                                        <button
                                            onClick={() => {
                                                setSelectedParticipant(participant);
                                                setShowForm(true);
                                            }}
                                            className="hover:bg-blue-700 text-white px-3 py-1 rounded text-sm flex items-center gap-1"
                                        >
                                            <svg className="icon" viewBox="0 0 20 20" fill="currentColor">
                                                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                                            </svg>
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {showForm && (
                <ParticipantForm
                    participant={selectedParticipant}
                    categories={categories}
                    onClose={() => {
                        setShowForm(false);
                        setSelectedParticipant(null);
                    }}
                    onSave={() => {
                        fetchParticipants();
                        setShowForm(false);
                    }}
                    role={role}
                />
            )}
        </div>
    );
};

export default ParticipantsPage;