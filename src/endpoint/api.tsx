export const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";
export const API_ENDPOINTS = {  
    register: `${API_URL}/auth/register`,
    login: `${API_URL}/auth/login`,
    rooms: `${API_URL}/rooms`,
    queue: `${API_URL}/queue`,
    seats: `${API_URL}/seats`,
    booking : `${API_URL}/seats/booking`,
}