import { POSTS_PER_PAGE } from '@/utils/consts'
import { Note } from '../components/types'
import axios from 'axios'

const baseUrl = "http://localhost:3001/notes"


let token: string | null = null

const setToken = (newToken: string | null) => {
    token = `Bearer ${newToken}`
}

const get = async (activePage: number) => {
    try {
        const response = await axios.get(baseUrl, {
            params: {
                activePage,
                postsPerPage: POSTS_PER_PAGE
            }
        })
        return response.data
    } catch (error) {
        console.error("Failed to get notes:", error);
    }
}

const create = async (content: string) => {
    try {
        const config = {
            headers: { Authorization: token },
        }
        await axios.post(baseUrl,  { content: content }, config);

    } catch (error) {
        console.log(error)
        console.error("Failed to create note:", error);
    }
}

const remove = async (note: Note) => {
    try {
        const config = {
            headers: { Authorization: token },
        }
        await axios.delete<Note>(`${baseUrl}/${note.id}`, config);
    } catch (error) {
        console.error("Failed to remove note:", error);
    }
}

const update = async (id: number, newObject: Note) => {
    try {
        const config = {
            headers: { Authorization: token },
        }
        const response = await axios.put<Note>(`${baseUrl}/${id}`, newObject, config);
        return response.data;
    } catch (error) {
        console.error("Failed to update note:", error);
    }
}


export default { get, create, update, remove, setToken }
