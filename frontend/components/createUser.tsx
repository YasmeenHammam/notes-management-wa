import newUserService from "../services/createService"
import { useState } from "react"
import { CreateProps } from "./types"

export default function CreateUser({ user } : CreateProps) {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')

    const handleCreateUser = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            await newUserService.create({
                name, email, username, password
            })
            setUsername('');
            setPassword('');
            setEmail('');
            setName('');
        }
        catch (error) {
            console.error('Failed to create new user', error);
        }
    };

    if (user === null) {
        return (
            <div className="forms-container">
                <b>Create User</b>
                <form name="create_user_form" onSubmit={handleCreateUser}>
                    <div>
                        Name:
                        <input className="input-register"
                            type="text"
                            value={name}
                            name="create_user_form_name"
                            onChange={({ target }) => setName(target.value)}
                        />
                    </div>
                    <div>
                        Email:
                        <input className="input-register"
                            type="email"
                            value={email}
                            name="create_user_form_email"
                            onChange={({ target }) => setEmail(target.value)}
                        />
                    </div>
                    <div>
                        Username:
                        <input className="input-register"
                            type="text"
                            value={username}
                            name="create_user_form_username"
                            onChange={({ target }) => setUsername(target.value)}
                        />
                    </div>
                    <div>
                        Password:
                        <input className="input-register"
                            type="password"
                            value={password}
                            name="create_user_form_password"
                            onChange={({ target }) => setPassword(target.value)}
                        />
                    </div>
                    <div className="create">
                        <button name="create_user_form_create_user" type="submit">Create User</button>
                    </div>
                </form>
            </div>
        )
    } 
}