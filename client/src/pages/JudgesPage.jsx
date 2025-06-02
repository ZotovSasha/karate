import React from 'react';
import JudgeList from '../components/Judges/JudgeList';

const JudgesPage = () => {
    return (
        <div className="container mx-auto py-6">
            <h1 className="text-3xl font-bold mb-6">Управление судьями</h1>
            <JudgeList />
        </div>
    );
};

export default JudgesPage;