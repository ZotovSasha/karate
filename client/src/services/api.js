import axios from 'axios'

const api = axios.create({
  baseURL: '/api',
  timeout: 5000
})

export const ParticipantService = {
  async getAll() {
    const { data } = await api.get('/participants')
    return data
  },

  async create(participant) {
    const { data } = await api.post('/participants', participant)
    return data
  },

  async generateBracket(categoryId) {
    const { data } = await api.post(`/participants/generate-bracket/${categoryId}`)
    return data
  }
}