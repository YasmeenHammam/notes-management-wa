import { Credentials } from '../components/types'
import axios from 'axios'
const baseUrl = "http://localhost:3001/login"

const login = async (credentials: Credentials) => {
    const response = await axios.post(baseUrl, credentials)
    // console.log(response.data)
    return response.data
}

export default { login }