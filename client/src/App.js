import { BrowserRouter, Routes, Route } from "react-router-dom";

import Pets from "./pages/Pets";
import Pet from "./pages/Pet";
import Cadastro from "./pages/Cadastro";
import NotFound from "./pages/NotFound";
import Entrar from "./pages/Entrar";
import Dashboard from "./pages/Dashboard";
import Perfil from "./pages/Perfil";
import AdicionarPet from "./pages/AdicionarPet";
import EditarPet from "./pages/EditarPet";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

import AuthRoute from "./utils/AuthRoute";

function App() {
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="/" element={<Pets />} />
                <Route path="/cadastro" element={<Cadastro />} />
                <Route path="/entrar" element={<Entrar />} />
                <Route
                    path="/dashboard"
                    element={
                        <AuthRoute>
                            <Dashboard />
                        </AuthRoute>
                    }
                />
                <Route
                    path="/meu-perfil"
                    element={
                        <AuthRoute>
                            <Perfil />
                        </AuthRoute>
                    }
                />
                <Route
                    path="/pet/:id"
                    element={
                        <AuthRoute>
                            <Pet />
                        </AuthRoute>
                    }
                />
                <Route
                    path="/adicionar-pet"
                    element={
                        <AuthRoute>
                            <AdicionarPet />
                        </AuthRoute>
                    }
                />
                <Route
                    path="/editar-pet/:id"
                    element={
                        <AuthRoute>
                            <EditarPet />
                        </AuthRoute>
                    }
                />
                <Route path="*" element={<NotFound />} />
            </Routes>
            <Footer />
        </BrowserRouter>
    );
}

export default App;
