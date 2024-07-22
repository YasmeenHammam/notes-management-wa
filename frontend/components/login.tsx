import noteService from "../services/noteService";
import loginService from "../services/loginService";
import { useEffect, useState } from "react";
import { LoginProps } from "./types";

export default function Login({ user, setUser }: LoginProps) {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const user = await loginService.login({
                username, password,
            })
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

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON);
            setUser(user);
            noteService.setToken(user.token);
        }
    }, [setUser])

    const handleLogout = async () => {
        setUsername('')
        setUser(null)
        noteService.setToken(null)
        window.localStorage.removeItem('loggedNoteappUser')
    }


    if (user === null) {
        return (
            <div className="forms-container">
                <b>login</b>
                <form name="login_form" onSubmit={handleLogin}>
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
            <b>{username} logged-in</b>
            <div className="logout">
                <button name="logout" onClick={handleLogout}>logout</button>
            </div>
        </div>
    )
}





