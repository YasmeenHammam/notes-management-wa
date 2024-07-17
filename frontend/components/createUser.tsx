import newUserService from "../services/createService"
import { useState } from "react"

export default function CreateUser() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')

    const handleCreateUser = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const user = await newUserService.create({
                name, email, username, password
            })
            console.log(user);
            setUsername('');
            setEmail('');
            setPassword('');
            setName('');
        }
        catch {

        }
    };
    return (
        <div>
            <h1>Create User</h1>
            <form className="create_user_form" onSubmit={handleCreateUser}>
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
                <button className="form-button" name="create_user_form_create_user" type="submit">Create User</button>
            </form>
        </div>
    )
}