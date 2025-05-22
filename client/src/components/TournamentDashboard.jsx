import { useState, useEffect } from 'react'
import { ParticipantService } from '../services/api'

export default function TournamentDashboard() {
    const [participants, setParticipants] = useState([])
    const [categories] = useState([
        { id: 1, label: "Кадеты (до 55 кг)" },
        { id: 2, label: "Юниоры (до 68 кг)" },
        { id: 3, label: "Взрослые (до 75 кг)" }
    ])
    const [selectedCategory, setSelectedCategory] = useState(1)
    const [bracketResult, setBracketResult] = useState(null)
    const [newParticipant, setNewParticipant] = useState({
        firstName: '',
        lastName: '',
        region: '',
        categoryId: 1
    })

    useEffect(() => {
        refreshParticipants()
    }, [])

    const refreshParticipants = async () => {
        const data = await ParticipantService.getAll()
        setParticipants(data)
    }

    const handleGenerateBracket = async () => {
        try {
            const result = await ParticipantService.generateBracket(selectedCategory)
            setBracketResult(result)
            alert(`Сетка создана! Матчей: ${result.totalMatches}`)
            await refreshParticipants() // Обновляем список участников
        } catch (error) {
            alert('Ошибка генерации сетки: ' + error.message)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await ParticipantService.create(newParticipant)
            await refreshParticipants()
            setNewParticipant({
                firstName: '',
                lastName: '',
                region: '',
                categoryId: 1
            })
        } catch (error) {
            alert('Ошибка создания участника: ' + error.message)
        }
    }


    return (
        <div className="container">
            <h1>Управление турниром по карате</h1>

            <div className="section">
                <h2>Новый участник</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Имя"
                        value={newParticipant.firstName}
                        onChange={e => setNewParticipant({...newParticipant, firstName: e.target.value})}
                    />
                    <button type="submit">Добавить</button>
                </form>
            </div>

            <div className="section">
                <h2>Генерация турнирной сетки</h2>
                <div className="controls">
                    <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(Number(e.target.value))}
                    >
                        {categories.map(c => (
                            <option key={c.id} value={c.id}>{c.label}</option>
                        ))}
                    </select>
                    <button
                        onClick={handleGenerateBracket}
                        className="generate-button"
                    >
                        Сгенерировать сетку
                    </button>
                </div>
                {bracketResult && (
                    <div className="bracket-info">
                        <p>Создано матчей: {bracketResult.totalMatches}</p>
                        <p>Следующий этап: {bracketResult.nextStep}</p>
                    </div>
                )}
            </div>

            <div className="section">
                <h2>Список участников</h2>
                <div className="grid">
                    {participants.map(p => (
                        <div key={p.id} className="card">
                            <h3>{p.firstName} {p.lastName}</h3>
                            <p>Регион: {p.region}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}