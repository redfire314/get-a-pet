import { Link } from "react-router-dom";

import useAuth from "../../hooks/useAuth";

import logo from "../../assets/images/logo.png";
import style from "./Navbar.module.css";

export default function Navbar() {
    const { checkAuth, logout } = useAuth();
    const token = checkAuth();

    return (
        <header>
            <nav className={style.navbar}>
                <div>
                    <img src={logo} alt="Logo" />
                </div>
                <ul>
                    <li>
                        <Link to="/">Pets</Link>
                    </li>
                    {token ? (
                        <>
                            <li>
                                <Link to="/dashboard">Dashboard</Link>
                            </li>
                            <li>
                                <Link to="/meu-perfil">Meu perfil</Link>
                            </li>
                            <li>
                                <button onClick={logout}>Sair</button>
                            </li>
                        </>
                    ) : (
                        <>
                            <li>
                                <Link to="/cadastro">Entrar/Cadastro</Link>
                            </li>
                        </>
                    )}
                </ul>
            </nav>
        </header>
    );
}
