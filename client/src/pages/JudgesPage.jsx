import { useEffect, useState } from 'react'
import JudgeForm from '../components/JudgeForm'
import { GiScaleMail } from 'react-icons/gi'

export default function JudgesPage() {
    const [judges, setJudges] = useState([])
    const [editingJudge, setEditingJudge] = useState(null)

    useEffect(() => { fetchJudges() }, [])

    const fetchJudges = async () => {
        const response = await fetch('http://localhost:8080/api/judges')
        const data = await response.json()
        setJudges(data)
    }

    const deleteJudge = async (id) => {
        await fetch(`http://localhost:8080/api/judges/${id}`, { method: 'DELETE' })
        await fetchJudges()
    }

    return (
        <div className="min-h-screen bg-dojo-sand p-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-heading text-dojo-dark mb-8 border-l-4 border-dojo-red pl-4">
                    <GiScaleMail className="inline-block mr-3 text-dojo-red" />
                    Judges Management
                </h1>

                <JudgeForm
                    judge={editingJudge}
                    onSuccess={() => {
                        setEditingJudge(null)
                        fetchJudges()
                    }}
                />

                <div className="bg-white rounded-xl shadow-2xl overflow-hidden border-t-4 border-dojo-red">
                    <table className="min-w-full divide-y divide-dojo-dark/10">
                        <thead className="bg-dojo-dark">
                        <tr>
                            <th className="px-6 py-4 text-left text-dojo-sand font-body text-sm uppercase tracking-wider">Judge</th>
                            <th className="px-6 py-4 text-left text-dojo-sand font-body text-sm uppercase tracking-wider">Category</th>
                            <th className="px-6 py-4 text-left text-dojo-sand font-body text-sm uppercase tracking-wider">Team ID</th>
                            <th className="px-6 py-4 text-left text-dojo-sand font-body text-sm uppercase tracking-wider">Actions</th>
                        </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-dojo-dark/10">
                        {judges.map((judge) => (
                            <tr key={judge.id} className="hover:bg-dojo-sand/10 transition-colors">
                                <td className="px-6 py-4 font-body text-dojo-dark">
                                    {judge.lastName}, {judge.firstName}
                                </td>
                                <td className="px-6 py-4 font-body text-dojo-dark">{judge.judgeCategory}</td>
                                <td className="px-6 py-4 font-body text-dojo-dark">#{judge.judgingTeamId}</td>
                                <td className="px-6 py-4 space-x-3">
                                    <button
                                        onClick={() => setEditingJudge(judge)}
                                        className="bg-dojo-red/10 text-dojo-red px-4 py-2 rounded-lg
                                                      hover:bg-dojo-red/20 transition-colors font-body"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => deleteJudge(judge.id)}
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