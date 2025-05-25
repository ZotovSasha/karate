import { useEffect, useState } from 'react'
import { Pie } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { GiTrophyCup } from 'react-icons/gi'

ChartJS.register(ArcElement, Tooltip, Legend)

export default function StatsPage() {
    const [stats, setStats] = useState({})

    useEffect(() => { fetchStats() }, [])

    const fetchStats = async () => {
        const response = await fetch('http://localhost:8080/api/judges/stats')
        const data = await response.json()
        setStats(data)
    }

    const chartData = {
        labels: Object.keys(stats),
        datasets: [{
            data: Object.values(stats),
            backgroundColor: [
                '#B71C1C', // dojo-red
                '#2A2A2A', // dojo-dark
                '#FFD700', // dojo-gold
                '#FFF3E0', // dojo-sand
                '#B71C1CAA' // transparent red
            ],
            borderColor: '#fff',
            borderWidth: 2
        }]
    }

    return (
        <div className="min-h-screen bg-dojo-sand p-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-heading text-dojo-dark mb-8 border-l-4 border-dojo-red pl-4">
                    <GiTrophyCup className="inline-block mr-3 text-dojo-red" />
                    Championship Statistics
                </h1>

                <div className="bg-white rounded-xl shadow-2xl p-8 border-t-4 border-dojo-red">
                    <div className="max-w-2xl mx-auto">
                        <Pie
                            data={chartData}
                            options={{
                                plugins: {
                                    legend: {
                                        labels: {
                                            font: {
                                                family: "'Roboto Condensed', sans-serif"
                                            }
                                        }
                                    }
                                }
                            }}
                        />
                        <div className="mt-6 text-center text-dojo-dark/80 font-body italic">
                            Decision distribution across judging categories
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}