import React from 'react';
import { useAuth } from '../context/AuthContext';
import { FiUsers, FiAward, FiShield } from 'react-icons/fi';

const DashboardPage = () => {
    const { user } = useAuth();

    return (
        <div className="container mx-auto py-8">
            <h1 className="text-3xl font-bold mb-8">Добро пожаловать, {user?.username}!</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <div className="flex items-center mb-4">
                        <FiUsers className="text-3xl text-primary mr-3" />
                        <h2 className="text-xl font-semibold">Участники</h2>
                    </div>
                    <p className="text-gray-600">
                        Просмотр и управление списком участников соревнований
                    </p>
                    <div className="mt-4">
                        <a
                            href="/participants"
                            className="text-secondary hover:underline"
                        >
                            Перейти к участникам →
                        </a>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md">
                    <div className="flex items-center mb-4">
                        <FiShield className="text-3xl text-primary mr-3" />
                        <h2 className="text-xl font-semibold">Судьи</h2>
                    </div>
                    <p className="text-gray-600">
                        Управление судьями и судейскими бригадами
                    </p>
                    <div className="mt-4">
                        <a
                            href="/judges"
                            className="text-secondary hover:underline"
                        >
                            Перейти к судьям →
                        </a>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md">
                    <div className="flex items-center mb-4">
                        <FiAward className="text-3xl text-primary mr-3" />
                        <h2 className="text-xl font-semibold">Бои</h2>
                    </div>
                    <p className="text-gray-600">
                        Управление боями и результатами соревнований
                    </p>
                    <div className="mt-4">
                        <a
                            href="/kumites"
                            className="text-secondary hover:underline"
                        >
                            Перейти к боям →
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;