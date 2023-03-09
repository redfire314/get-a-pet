import Form from "../components/Form";
import Input from "../components/Input";
import BtnSubmit from "../components/BtnSubmit";

import usePet from "../hooks/usePet";

function AdicionarPet() {
    const { createPet } = usePet();

    const handleOnSubmit = (event) => {
        const image = event.target.image.files[0];
        const name = event.target.name.value;
        const breed = event.target.breed.value;
        const color = event.target.color.value;
        const age = event.target.age.value;

        createPet(image, name, breed, color, age);
    };

    return (
        <main>
            <h1>Adicionar Pet</h1>
            <Form submit={handleOnSubmit} encType="multipart/form-data">
                <Input type="file" name="image" label="Imagem" />
                <Input type="text" name="name" label="Nome" />
                <Input type="text" name="breed" label="Raça" />
                <Input type="text" name="color" label="Cor" />
                <Input type="number" name="age" label="Idade" />
                <BtnSubmit text="Cadastrar" />
            </Form>
        </main>
    );
}

export default AdicionarPet;
