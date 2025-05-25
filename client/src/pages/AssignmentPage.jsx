import { useState } from 'react'

export default function AssignmentPage() {
    const [assignmentStatus, setAssignmentStatus] = useState('')

    const handleAutoAssign = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/assign/auto', { method: 'POST' })
            if (response.ok) {
                setAssignmentStatus('Assignment completed successfully!')
            }
            // eslint-disable-next-line no-unused-vars
        } catch (error) {
            setAssignmentStatus('Error during assignment!')
        }
    }

    return (
        <div>
            <h1 className="text-2xl font-bold mb-6">Automatic Assignments</h1>

            <div className="bg-white p-6 rounded-lg shadow max-w-xl">
                <button
                    onClick={handleAutoAssign}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                >
                    Run Auto Assignment
                </button>

                {assignmentStatus && (
                    <div className="mt-4 p-3 bg-green-100 text-green-700 rounded-md">
                        {assignmentStatus}
                    </div>
                )}
            </div>
        </div>
    )
}