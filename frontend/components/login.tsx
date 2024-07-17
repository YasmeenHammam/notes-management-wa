import loginService from "../services/loginService";
import { useState } from "react";

export default function Login() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)

    const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        try {
            const user = await loginService.login({
                username, password,
            })
            // noteService.setToken(user.token)
            // window.localStorage.setItem(
            //     'loggedNoteappUser', JSON.stringify(user)
            // )
            setUser(user)
            setUsername('')
            setPassword('')
        } catch { }
    }
    
    return (
        <form onSubmit={handleLogin}>
            <label>login</label>
            <div>
                username
                <input className="input-login"
                    type="text"
                    value={username}
                    name="login_form_username"
                    onChange={({ target }) => setUsername(target.value)}
                />
            </div>
            <div>
                password
                <input className="input-login"
                    type="password"
                    value={password}
                    name="login_form_password"
                    onChange={({ target }) => setPassword(target.value)}
                />
            </div>
            <button name="login_form_login" type="submit">login</button>
        </form>
    )
}





