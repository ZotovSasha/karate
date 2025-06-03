import React, { useState } from 'react';

const FilterBar = ({ categories, onFilter }) => {
    const [categoryId, setCategoryId] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    const handleFilter = () => {
        onFilter(categoryId || null, searchTerm);
    };

    const handleClear = () => {
        setCategoryId('');
        setSearchTerm('');
        onFilter(null, '');
    };

    return (
        <div className="bg-white p-3 rounded-lg shadow mb-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon h-5 w-5 mr-1 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                        </svg>
                        Категория
                    </label>
                    <select
                        value={categoryId}
                        onChange={(e) => setCategoryId(e.target.value)}
                        className="w-full p-2 bg-gray-50 rounded text-sm border border-gray-300 focus:ring-karate-red focus:border-karate-red"
                    >
                        <option value="">Все категории</option>
                        {categories.map(category => (
                            <option key={category.id} value={category.id}>
                                {category.ageGroup} | {category.weightGroup} | {category.gender}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon h-5 w-5 mr-1 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        Найти по Фамилии
                    </label>
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Введите фамилию"
                        className="w-full p-2 bg-gray-50 rounded text-sm border border-gray-300 focus:ring-karate-red focus:border-karate-red"
                    />
                </div>

                <div className="flex items-end space-x-2">
                    <button
                        onClick={handleFilter}
                        className="px-20 py-10 bg-gray-200 text-white rounded-md flex-1"
                    >
                        Подтвердить
                    </button>
                    <button
                        onClick={handleClear}
                        className="px-20 py-10 bg-gray-200 text-gray-800 rounded-md flex-1"
                    >
                        Очистить
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FilterBar;