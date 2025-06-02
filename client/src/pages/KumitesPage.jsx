import React from 'react';
import KumiteList from '../components/Kumites/KumiteList';

const KumitesPage = () => {
    return (
        <div className="container mx-auto py-6">
            <h1 className="text-3xl font-bold mb-6">Управление боями</h1>
            <KumiteList />
        </div>
    );
};

export default KumitesPage;