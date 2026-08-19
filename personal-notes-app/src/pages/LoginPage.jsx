import { login, putAccessToken } from "../utils/network-data";
import { Link } from "react-router-dom";
import React from "react";
import LoginInput from "../components/LoginInput";

function LoginPage({ loginSuccess }) {
    async function onLogin({ email, password }) {
        const { error, data } = await login({ email, password });

        if(!error) {
            putAccessToken(data.accessToken)
            loginSuccess();
        }
    }

    return (
        <section className="login-page">
            <h2>Login, untuk menggunakan aplikasi</h2>
            <LoginInput login={onLogin} />
            <p>Belum punya akun? <Link to='/register'>Daftar</Link></p>
        </section>
    )
}

export default LoginPage;
