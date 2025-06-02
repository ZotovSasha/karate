import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
    getParticipant,
    createParticipant,
    updateParticipant,
    getCategories
} from '../../services/api';
import { FiSave, FiArrowLeft } from 'react-icons/fi';

const ParticipantForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [formData, setFormData] = useState({
        lastName: '',
        firstName: '',
        personalCode: '',
        categoryId: ''
    });
    const [loading, setLoading] = useState(false);
    const [isEdit, setIsEdit] = useState(false);

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

        if (id) {
            setIsEdit(true);
            fetchParticipant();
        }
    }, [id]);

    const fetchParticipant = async () => {
        setLoading(true);
        try {
            const response = await getParticipant(id);
            setFormData({
                lastName: response.data.lastName,
                firstName: response.data.firstName,
                personalCode: response.data.personalCode,
                categoryId: response.data.category.idCategory
            });
        } catch (error) {
            console.error('Error fetching participant:', error);
        }
        setLoading(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            if (isEdit) {
                await updateParticipant(id, formData);
            } else {
                await createParticipant(formData);
            }
            navigate('/participants');
        } catch (error) {
            console.error('Error saving participant:', error);
            setLoading(false);
        }
    };

    if (loading && isEdit) {
        return <div className="text-center py-10">Загрузка данных участника...</div>;
    }

    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">
                    {isEdit ? 'Редактировать участника' : 'Добавить участника'}
                </h2>
                <button
                    onClick={() => navigate('/participants')}
                    className="flex items-center text-gray-600 hover:text-gray-800"
                >
                    <FiArrowLeft className="mr-1" /> Назад
                </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-gray-700 mb-2">Фамилия:</label>
                    <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-secondary"
                        required
                    />
                </div>

                <div>
                    <label className="block text-gray-700 mb-2">Имя:</label>
                    <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-secondary"
                        required
                    />
                </div>

                <div>
                    <label className="block text-gray-700 mb-2">Личный номер:</label>
                    <input
                        type="text"
                        name="personalCode"
                        value={formData.personalCode}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-secondary"
                        required
                    />
                </div>

                <div>
                    <label className="block text-gray-700 mb-2">Категория:</label>
                    <select
                        name="categoryId"
                        value={formData.categoryId}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-secondary"
                        required
                    >
                        <option value="">Выберите категорию</option>
                        {categories.map(category => (
                            <option key={category.idCategory} value={category.idCategory}>
                                {category.ageGroup} | {category.weightGroup} | {category.gender}
                            </option>
                        ))}
                    </select>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="bg-primary hover:bg-blue-700 text-white py-2 px-4 rounded flex items-center"
                >
                    <FiSave className="mr-2" /> {loading ? 'Сохранение...' : 'Сохранить'}
                </button>
            </form>
        </div>
    );
};

export default ParticipantForm;