import { useEffect, useState } from 'react'
import ParticipantList from '../components/ParticipantList.jsx'
import { GiKarateBelts } from 'react-icons/gi'

export default function ParticipantsPage() {
    const [participants, setParticipants] = useState([])
    const [editingParticipant, setEditingParticipant] = useState(null)

    useEffect(() => { fetchParticipants() }, [])

    const fetchParticipants = async () => {
        const response = await fetch('http://localhost:8080/api/participants')
        const data = await response.json()
        setParticipants(data)
    }

    const deleteParticipant = async (id) => {
        await fetch(`http://localhost:8080/api/participants/${id}`, { method: 'DELETE' })
        await fetchParticipants()
    }

    return (
        <div className="min-h-screen bg-dojo-sand p-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-heading text-dojo-dark mb-8 border-l-4 border-dojo-red pl-4">
                    <GiKarateBelts className="inline-block mr-3 text-dojo-red" />
                    Participants Management
                </h1>

                <ParticipantList
                    participant={editingParticipant}
                    onSuccess={() => {
                        setEditingParticipant(null)
                        fetchParticipants()
                    }}
                />

                <div className="bg-white rounded-xl shadow-2xl overflow-hidden border-t-4 border-dojo-red">
                    <table className="min-w-full divide-y divide-dojo-dark/10">
                        <thead className="bg-dojo-dark">
                        <tr>
                            <th className="px-6 py-4 text-left text-dojo-sand font-body text-sm uppercase tracking-wider">Name</th>
                            <th className="px-6 py-4 text-left text-dojo-sand font-body text-sm uppercase tracking-wider">Region</th>
                            <th className="px-6 py-4 text-left text-dojo-sand font-body text-sm uppercase tracking-wider">Category</th>
                            <th className="px-6 py-4 text-left text-dojo-sand font-body text-sm uppercase tracking-wider">Actions</th>
                        </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-dojo-dark/10">
                        {participants.map((participant) => (
                            <tr key={participant.id} className="hover:bg-dojo-sand/10 transition-colors">
                                <td className="px-6 py-4 font-body text-dojo-dark">
                                    <span className="font-bold">{participant.lastName}</span>, {participant.firstName}
                                </td>
                                <td className="px-6 py-4 font-body text-dojo-dark">{participant.region}</td>
                                <td className="px-6 py-4 font-body text-dojo-dark">#{participant.categoryId}</td>
                                <td className="px-6 py-4 space-x-3">
                                    <button
                                        onClick={() => setEditingParticipant(participant)}
                                        className="bg-dojo-red/10 text-dojo-red px-4 py-2 rounded-lg
                                                      hover:bg-dojo-red/20 transition-colors font-body"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => deleteParticipant(participant.id)}
                                        className="bg-dojo-dark/10 text-dojo-dark px-4 py-2 rounded-lg
                                                      hover:bg-dojo-dark/20 transition-colors font-body"
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
        </div>
    )
}