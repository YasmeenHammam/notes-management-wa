import newUserService from "../services/newUserService"
import { useState } from "react"

export default function Register() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')

    const handleNewUser = async (event: React.FormEvent<HTMLFormElement>) => {
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
        <>
            <form onSubmit={handleNewUser}>
                <div>
                    Name :
                    <input
                        type="text"
                        value={name}
                        name="Name"
                        onChange={({ target }) => setName(target.value)}
                    />
                </div>
                <div>
                    Email :
                    <input
                        type="email"
                        value={email}
                        name="Email"
                        onChange={({ target }) => setEmail(target.value)}
                    />
                </div>
                <div>
                    Username :
                    <input
                        type="text"
                        value={username}
                        name="Username"
                        onChange={({ target }) => setUsername(target.value)}
                    />
                </div>
                <div>
                    Password :
                    <input
                        type="password"
                        value={password}
                        name="Password"
                        onChange={({ target }) => setPassword(target.value)}
                    />
                </div>
                <button name="create_user_form_create_user" type="submit">Create User</button>
            </form>
        </>)
}