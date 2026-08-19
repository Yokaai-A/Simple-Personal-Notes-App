import useInput from '../hooks/useInput';
import React from 'react';

function RegisterInput({register}) {
    const [name, onNameChange] = useInput('');
    const [email, onEmailChange] = useInput('');
    const [password, onPasswordChange] = useInput('');
    const [confirmPassword, onConfirmPasswordChange] = useInput('');


    const onSubmitHandler = (event) => {
        event.preventDefault();

        if(password !== confirmPassword) {
            alert('Password dan Confirm Password harus sama!')
            return;
        }

        register({ name, email, password })
    }

    return(
        <form onSubmit={onSubmitHandler} className="input-register">
            <label htmlFor="name">Nama</label>
            <input type="text" id="name" value={name} onChange={onNameChange} placeholder='Budi123' required></input>

            <label htmlFor="email">Email</label>
            <input type="email" id="email" value={email} onChange={onEmailChange} placeholder='Budi123@email.com' required></input>

            <label htmlFor="password">Password</label>
            <input type="password" id="password" value={password} onChange={onPasswordChange} placeholder='***' required></input>

            <label htmlFor="confirmPassword">Konfirmasi Password</label>
            <input type="password" id="confirmPassword" value={confirmPassword} onChange={onConfirmPasswordChange} placeholder='***' required></input>

            <button type='submit'>Daftar</button>
        </form>
    )
}

export default RegisterInput;