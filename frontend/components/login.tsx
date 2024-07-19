import noteService from "../services/noteService";
import loginService from "../services/loginService";
import { useState } from "react";

export default function Login() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)

    const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const user = await loginService.login({
                username, password,
            })
            // console.log(username + " logged in ");
            noteService.setToken(user.token)    
            window.localStorage.setItem(
                'loggedNoteappUser', JSON.stringify(user)
            )
            setUser(user)
            setPassword('')
        } catch (error) {
            console.error('Failed to login', error);
        }
    }

    const handleLogout = async () => {
        // console.log(user + "logged out ");
        setUsername('')
        setUser(null)
        noteService.setToken(null)
        window.localStorage.removeItem('loggedNoteappUser')
    }


    if (user === null) {
        return (
            <div className="forms-container">
                <b>login</b>
            <form onSubmit={handleLogin}>
                <div>
                    Username:
                    <input className="input-login"
                        type="text"
                        value={username}
                        name="login_form_username"
                        onChange={({ target }) => setUsername(target.value)}
                    />
                </div>
                <div>
                    Password:
                    <input className="input-login"
                        type="password"
                        value={password}
                        name="login_form_password"
                        onChange={({ target }) => setPassword(target.value)}
                    />
                </div>
                <div className="login">
                    <button name="login_form_login" type="submit">login</button>
                </div>
                </form>
                </div>
        )
    }
    return (
        <div>
            <p>{username} logged-in</p>
            <div className="logout">
                <button onClick={handleLogout}>logout</button>
                </div>
        </div>
    )
}





