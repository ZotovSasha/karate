import axios from 'axios'

const api = axios.create({
    baseURL: '/api', // Соответствует проксированному пути
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json'
    }
})

// Обработчик ошибок
const handleError = (error) => {
    if (error.response) {
        throw new Error(error.response.data.message || 'API Error')
    }
    throw new Error('Network Error')
}

export const ParticipantService = {
    async getAll() {
        try {
            const { data } = await api.get('/participants')
            return data
        } catch (error) {
            handleError(error)
        }
    },

    async create(participant) {
        try {
            const { data } = await api.post('/participants', participant)
            return data
        } catch (error) {
            handleError(error)
        }
    },

    async generateBracket(categoryId) {
        try {
            const { data } = await api.post(`/participants/generate-bracket/${categoryId}`)
            return data
        } catch (error) {
            handleError(error)
        }
    }
}

export default api