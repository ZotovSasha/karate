import { useState } from 'react'
import { GiBelt } from 'react-icons/gi'

export default function ParticipantForm({ participant, onSuccess }) {
    const [formData, setFormData] = useState({
        firstName: participant?.firstName || '',
        lastName: participant?.lastName || '',
        region: participant?.region || '',
        categoryId: participant?.categoryId || ''
    })

    const handleSubmit = async (e) => {
        e.preventDefault()
        const url = participant
            ? `http://localhost:8080/api/participants/${participant.id}`
            : 'http://localhost:8080/api/participants'

        const method = participant ? 'PUT' : 'POST'

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
                <GiBelt className="mr-2 text-dojo-red" />
                {participant ? 'Edit Fighter' : 'Register New Fighter'}
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
                        <label className="block font-body text-dojo-dark/80">Region</label>
                        <input
                            type="text"
                            value={formData.region}
                            onChange={(e) => setFormData({...formData, region: e.target.value})}
                            className="w-full px-4 py-2 rounded-lg border-2 border-dojo-dark/20
                                      focus:border-dojo-red focus:ring-2 focus:ring-dojo-red/30 font-body"
                            placeholder="Enter region"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="block font-body text-dojo-dark/80">Category ID</label>
                        <input
                            type="number"
                            value={formData.categoryId}
                            onChange={(e) => setFormData({...formData, categoryId: e.target.value})}
                            className="w-full px-4 py-2 rounded-lg border-2 border-dojo-dark/20
                                      focus:border-dojo-red focus:ring-2 focus:ring-dojo-red/30 font-body"
                            placeholder="Enter category"
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    className="w-full md:w-auto px-8 py-3 bg-dojo-red text-white rounded-lg
                              hover:bg-dojo-red/90 transition-colors font-heading text-lg
                              shadow-md hover:shadow-lg"
                >
                    {participant ? 'Update Fighter' : 'Register Fighter'}
                </button>
            </form>
        </div>
    )
}