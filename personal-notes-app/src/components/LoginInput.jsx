import React from 'react';
import useInput from '../hooks/useInput';

function LoginInput({ login }) {
    const [email, onEmailChange ] = useInput('') 
    const [password, onPasswordChange ] = useInput('')

    const onSubmitHandler = (event) => {
        event.preventDefault();

        login({ email, password });
    }

    return(
        <form onSubmit={onSubmitHandler} className="input-login">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" value={email} onChange={onEmailChange} placeholder='Budi123@email.com' required />

            <label htmlFor="password">Password</label>
            <input type="password" id="password" value={password} onChange={onPasswordChange} placeholder='***' required />

            <button type='submit'>Login</button>
        </form>
    )
}

export default LoginInput;