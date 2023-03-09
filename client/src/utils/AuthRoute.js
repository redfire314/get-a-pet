import { Navigate } from "react-router-dom";

import useAuth from "../hooks/useAuth";

function AuthRoute(props) {
    const { checkAuth } = useAuth();
    const token = checkAuth();

    return <>{token ? props.children : <Navigate to="/entrar" />}</>;
}

export default AuthRoute;
