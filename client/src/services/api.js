import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080/api',
});

// Добавляем токен к запросам
api.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// API для аутентификации
export const login = (credentials) => api.post('/auth/login', credentials);
export const register = (userData) => api.post('/auth/register', userData);

// API для участников
export const getParticipant = (id) => api.get(`/participants/${id}`);
export const createParticipant = (data) => api.post('/participants', data);
export const updateParticipant = (id, data) => api.put(`/participants/${id}`, data);
export const deleteParticipant = (id) => api.delete(`/participants/${id}`);
export const getParticipantsByCategory = (categoryId) =>
    api.get(`/participants/filter?categoryId=${categoryId}`);
export const getCategories = () => api.get('/participants/categories');

// API для судей
export const getJudge = (id) => api.get(`/judges/${id}`);
export const createJudge = (data) => api.post('/judges', data);
export const updateJudge = (id, data) => api.put(`/judges/${id}`, data);
export const deleteJudge = (id) => api.delete(`/judges/${id}`);
export const getJudgesByTeam = (teamId) =>
    api.get(`/judges/filter?teamId=${teamId}`);
export const getJudgingTeams = () => api.get('/judges/teams');

// Татами
export const getTatamis = () => api.get('/tatami');

// API для боев
export const getKumite = (id) => api.get(`/kumites/${id}`);
export const deleteKumite = (id) => api.delete(`/kumites/${id}`);
export const createKumite = (data) => api.post('/kumites', data);
export const updateKumite = (id, data) => api.put(`/kumites/${id}`, data);