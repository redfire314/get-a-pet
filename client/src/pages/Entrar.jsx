import { Link } from "react-router-dom";

import useAuth from "../hooks/useAuth";

import Form from "../components/Form";
import Input from "../components/Input";
import BtnSubmit from "../components/BtnSubmit";

import style from "./Entrar.module.css";

function Entrar() {
    const { login } = useAuth();

    const handleOnSubmit = (event) => {
        const email = event.target.email.value;
        const password = event.target.password.value;

        login(email, password);
    };

    return (
        <main>
            <h1>Entrar</h1>
            <Form submit={handleOnSubmit}>
                <Input type="email" name="email" label="E-mail" />
                <Input type="password" name="password" label="Senha" />
                <BtnSubmit text="Entrar" />
            </Form>
            <div className={style.redirect}>
                <span>Ainda não possuí uma conta?</span> <Link to="/cadastro">Cadastrar</Link>
            </div>
        </main>
    );
}

export default Entrar;
