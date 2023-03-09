import { useState, useEffect } from "react";

import Form from "../components/Form";
import Input from "../components/Input";
import BtnSubmit from "../components/BtnSubmit";

import useAuth from "../hooks/useAuth";

import style from "./Perfil.module.css";

function Perfil() {
    const [data, setData] = useState([]);
    const { profile, update } = useAuth();

    useEffect(() => {
        profile().then((response) => setData(response.data));
    }, []);

    const handleOnSubmit = (event) => {
        const name = event.target.name.value;
        const email = event.target.email.value;
        const phone = event.target.phone.value;
        const zip = event.target.zip.value;
        const password = event.target.password.value;
        const password2 = event.target.password2.value;

        update(name, email, phone, zip, password, password2);
    };

    return (
        <main>
            <h1>Meu perfil</h1>
            <Form submit={handleOnSubmit}>
                <Input type="text" name="name" label="Nome" value={data.name} />
                <Input type="email" name="email" label="E-mail" value={data.email} />
                <Input type="text" name="phone" label="Telefone" value={data.phone} />
                <Input type="number" name="zip" label="CEP" value={data.zipCode} />
                <Input type="password" name="password" label="Senha" />
                <Input type="password" name="password2" label="Confirme sua senha" />
                <BtnSubmit text="Salvar" />
            </Form>
        </main>
    );
}

export default Perfil;
