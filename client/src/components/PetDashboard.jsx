import { Link } from "react-router-dom";

import usePet from "../hooks/usePet";

import Form from "../components/Form";

import style from "./PetDashboard.module.css";

function PetDashboard(props) {
    const { removePet, finishAdoption } = usePet();
    const imgUrl = process.env.REACT_APP_IMAGE_BASE_URL + "/" + props.image;

    const handleOnClick = () => {
        removePet(props.id);
    };

    // Set new owner - finish adoption process
    const handleOnSubmit = (event) => {
        const newOwnerId = event.target.newOwnerId.value;
        const petId = event.target.petId.value;

        finishAdoption(petId, newOwnerId);
    };

    const optList = props.pendingOwners.map((name, key) => (
        <option key={key} value={name}>
            {name}
        </option>
    ));

    return (
        <div className={style.pet}>
            <div className={style.about}>
                <img src={imgUrl} alt={props.name} />
                <div>
                    <ul>
                        <li>
                            <h3>{props.name}</h3>
                        </li>
                        <li>Raça: {props.breed}</li>
                        <li>Cor: {props.color}</li>
                        <li>Idade: {props.age}</li>
                    </ul>
                </div>
            </div>
            {!props.newOwner && (
                <div className={style.action}>
                    <ul>
                        <li>
                            <Form submit={handleOnSubmit}>
                                <select name="newOwnerId">
                                    <option selected>- Novo dono -</option>
                                    {optList}
                                </select>
                                <input type="hidden" name="petId" value={props.id} />
                                <button type="submit">Finalizar adoção</button>
                            </Form>
                        </li>
                        <div>
                            <li>
                                <Link to={`/editar-pet/${props.id}`}>Modificar</Link>
                            </li>
                            <li>
                                <button onClick={handleOnClick}>Remover</button>
                            </li>
                        </div>
                    </ul>
                </div>
            )}
            {props.newOwner && <strong>Adotado</strong>}
        </div>
    );
}

export default PetDashboard;
