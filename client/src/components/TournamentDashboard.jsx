import { useState, useEffect } from 'react'
import { ParticipantService } from '../services/api'

export default function TournamentDashboard() {
  const [participants, setParticipants] = useState([])
  const [newParticipant, setNewParticipant] = useState({
    firstName: '',
    lastName: '',
    region: '',
    categoryId: 1
  })

  useEffect(() => {
    ParticipantService.getAll()
      .then(data => setParticipants(data))
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const created = await ParticipantService.create(newParticipant)
    setParticipants([...participants, created])
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