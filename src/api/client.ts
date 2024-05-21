import axios from 'axios'

const token = typeof window !== "undefined" ? localStorage.getItem('token') : '' 

const headers = {
    'Content-Type': 'application/json',
    'Authorization': ''
}

if (token) {
    headers.Authorization = `Bearer ${token}`
}   


export const client = axios.create({
    baseURL: 'http://localhost:3000',
    headers
})