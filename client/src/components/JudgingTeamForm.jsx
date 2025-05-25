import { useState } from 'react'

export default function JudgingTeamForm({ team, onSuccess }) {
    const [formData, setFormData] = useState({
        id: team?.id || ''
    })

    const handleSubmit = async (e) => {
        e.preventDefault()
        const url = team
            ? `http://localhost:8080/api/judging-teams/${team.id}`
            : 'http://localhost:8080/api/judging-teams'

        const method = team ? 'PUT' : 'POST'

        await fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        })

        onSuccess()
    }

    return (
        <div className="mb-8 p-6 bg-white rounded-lg shadow">
            <h2 className="text-lg font-medium mb-4">
                {team ? 'Edit Judging Team' : 'Add New Judging Team'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Team ID</label>
                    <input
                        type="number"
                        value={formData.id}
                        onChange={(e) => setFormData({...formData, id: e.target.value})}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        disabled={!!team}
                    />
                </div>

                <button
                    type="submit"
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                >
                    {team ? 'Update' : 'Create'}
                </button>
            </form>
        </div>
    )
}