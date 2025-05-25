import { useEffect, useState } from 'react'
import JudgingTeamForm from '../components/JudgingTeamForm'

export default function JudgingTeamsPage() {
    const [teams, setTeams] = useState([])
    const [editingTeam, setEditingTeam] = useState(null)

    useEffect(() => {
        fetchTeams()
    }, [])

    const fetchTeams = async () => {
        const response = await fetch('http://localhost:8080/api/judging-teams')
        const data = await response.json()
        setTeams(data)
    }

    const deleteTeam = async (id) => {
        await fetch(`http://localhost:8080/api/judging-teams/${id}`, { method: 'DELETE' })
        await fetchTeams()
    }

    return (
        <div>
            <h1 className="text-2xl font-bold mb-6">Judging Teams Management</h1>

            <JudgingTeamForm
                team={editingTeam}
                onSuccess={() => {
                    setEditingTeam(null)
                    fetchTeams()
                }}
            />

            <div className="bg-white rounded-lg shadow overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                    </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                    {teams.map((team) => (
                        <tr key={team.id}>
                            <td className="px-6 py-4 whitespace-nowrap">Team #{team.id}</td>
                            <td className="px-6 py-4 whitespace-nowrap space-x-2">
                                <button
                                    onClick={() => setEditingTeam(team)}
                                    className="text-indigo-600 hover:text-indigo-900"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => deleteTeam(team.id)}
                                    className="text-red-600 hover:text-red-900"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}