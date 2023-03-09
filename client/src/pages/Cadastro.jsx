import { Link } from "react-router-dom";

import useAuth from "../hooks/useAuth";

import Form from "../components/Form";
import Input from "../components/Input";
import BtnSubmit from "../components/BtnSubmit";

import style from "./Cadastro.module.css";

function Cadastro() {
    const { register } = useAuth();

    const handleOnSubmit = (event) => {
        const name = event.target.name.value;
        const email = event.target.email.value;
        const phone = event.target.phone.value;
        const zip = event.target.zip.value;
        const password = event.target.password.value;
        const password2 = event.target.password2.value;

        register(name, email, phone, zip, password, password2);
    };

    return (
        <main>
            <h1>Cadastro</h1>
            <Form submit={handleOnSubmit}>
                <Input type="text" name="name" label="Nome" />
                <Input type="email" name="email" label="E-mail" />
                <Input type="text" name="phone" label="Telefone" />
                <Input type="number" name="zip" label="CEP" />
                <Input type="password" name="password" label="Senha" />
                <Input type="password" name="password2" label="Confirme sua senha" />
                <BtnSubmit text="Cadastrar" />
            </Form>
            <div className={style.redirect}>
                <span>Já possuí uma conta? </span>
                <Link to="/entrar">Entrar</Link>
            </div>
        </main>
    );
}

export default Cadastro;
