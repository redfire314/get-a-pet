import usePet from "../hooks/usePet";

import Pet from "../components/Pet";

function Pets() {
    const { getAllPets } = usePet();

    const pets = getAllPets();
    const petsComponents = pets.map((pet, index) => (
        <Pet key={index} id={pet._id} image={pet.images[0]} name={pet.name} breed={pet.breed} color={pet.color} age={pet.age} newOwner={pet.newOwner} />
    ));

    return (
        <>
            <main>
                <h1>Pets</h1>
                {petsComponents}
            </main>
        </>
    );
}

export default Pets;
