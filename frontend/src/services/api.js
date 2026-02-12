import axios from 'axios'

const BASE_URL = 'http://localhost:5000'

export async function generateTasks(payload) {
  const response = await axios.post(`${BASE_URL}/generate`, payload)
  return response.data
}

export async function getHealth() {
  const response = await axios.get(`${BASE_URL}/health`)
  return response.data
}

