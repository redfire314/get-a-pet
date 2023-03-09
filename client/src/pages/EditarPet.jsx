import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import usePet from "../hooks/usePet";

import Form from "../components/Form";
import Input from "../components/Input";
import BtnSubmit from "../components/BtnSubmit";

function EditarPet() {
    const [pet, setPet] = useState([]);
    const { id } = useParams();
    const { updatePet, getPetDetails } = usePet();

    useEffect(() => {
        getPetDetails(id).then((response) => setPet(response.data));
    }, []);

    const handleOnSubmit = (event) => {
        const image = event.target.image.files[0];
        const name = event.target.name.value;
        const breed = event.target.breed.value;
        const color = event.target.color.value;
        const age = event.target.age.value;

        updatePet(id, image, name, breed, color, age);
    };

    return (
        <main>
            <h1>Editar Pet</h1>
            <Form submit={handleOnSubmit}>
                <Input type="file" name="image" label="Imagem" />
                <Input type="text" name="name" label="Nome" value={pet.name} />
                <Input type="text" name="breed" label="Raça" value={pet.breed} />
                <Input type="text" name="color" label="Cor" value={pet.color} />
                <Input type="number" name="age" label="Idade" value={pet.age} />
                <BtnSubmit text="Salvar" />
            </Form>
        </main>
    );
}

export default EditarPet;
