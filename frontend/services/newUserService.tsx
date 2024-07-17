import { User } from '@/components/types'
import axios from 'axios'
const baseUrl = "http://localhost:3001/users"

const create = async (user: User) => {
    const newUser = {
        name: user.name,
        email: user.email,
        username: user.username,
        password : user.password
    }
    console.log(newUser);

    const response = await axios.post(baseUrl, newUser)
    return response.data
}

export default { create }