import { useState } from 'react'
import { GiWhistle } from 'react-icons/gi'

export default function JudgeForm({ judge, onSuccess }) {
    const [formData, setFormData] = useState({
        firstName: judge?.firstName || '',
        lastName: judge?.lastName || '',
        judgeCategory: judge?.judgeCategory || '',
        judgingTeamId: judge?.judgingTeam?.id || ''
    })

    const handleSubmit = async (e) => {
        e.preventDefault()
        const url = judge
            ? `http://localhost:8080/api/judges/${judge.id}`
            : 'http://localhost:8080/api/judges'

        const method = judge ? 'PUT' : 'POST'

        await fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        })

        onSuccess()
    }

    return (
        <div className="mb-8 p-8 bg-white rounded-xl shadow-xl border-t-4 border-dojo-red">
            <h2 className="text-xl font-heading text-dojo-dark mb-6 flex items-center">
                <GiWhistle className="mr-2 text-dojo-red" />
                {judge ? 'Edit Official' : 'Register New Judge'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="block font-body text-dojo-dark/80">First Name</label>
                        <input
                            type="text"
                            value={formData.firstName}
                            onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                            className="w-full px-4 py-2 rounded-lg border-2 border-dojo-dark/20
                                      focus:border-dojo-red focus:ring-2 focus:ring-dojo-red/30 font-body"
                            placeholder="Enter first name"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="block font-body text-dojo-dark/80">Last Name</label>
                        <input
                            type="text"
                            value={formData.lastName}
                            onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                            className="w-full px-4 py-2 rounded-lg border-2 border-dojo-dark/20
                                      focus:border-dojo-red focus:ring-2 focus:ring-dojo-red/30 font-body"
                            placeholder="Enter last name"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="block font-body text-dojo-dark/80">Category</label>
                        <input
                            type="text"
                            value={formData.judgeCategory}
                            onChange={(e) => setFormData({...formData, judgeCategory: e.target.value})}
                            className="w-full px-4 py-2 rounded-lg border-2 border-dojo-dark/20
                                      focus:border-dojo-red focus:ring-2 focus:ring-dojo-red/30 font-body"
                            placeholder="Enter category"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="block font-body text-dojo-dark/80">Team ID</label>
                        <input
                            type="number"
                            value={formData.judgingTeamId}
                            onChange={(e) => setFormData({...formData, judgingTeamId: e.target.value})}
                            className="w-full px-4 py-2 rounded-lg border-2 border-dojo-dark/20
                                      focus:border-dojo-red focus:ring-2 focus:ring-dojo-red/30 font-body"
                            placeholder="Enter team ID"
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    className="w-full md:w-auto px-8 py-3 bg-dojo-red text-white rounded-lg
                              hover:bg-dojo-red/90 transition-colors font-heading text-lg
                              shadow-md hover:shadow-lg"
                >
                    {judge ? 'Update Judge' : 'Register Judge'}
                </button>
            </form>
        </div>
    )
}