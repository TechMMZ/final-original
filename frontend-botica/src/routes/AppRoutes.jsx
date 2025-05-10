import { Routes, Route } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Inventario from "../pages/Inventario";
import Auth from "../pages/Auth";
import Clientes from "../pages/Clientes";
import Ventas from "../pages/Ventas";
import SalesRegister from "../pages/SalesRegister";
import CustomerSupport from "../pages/CustomerSupport";
import PrivateRoute from "../components/routes/PrivateRoute"; // importa tu componente

function AppRoutes() {
    return (
        <Routes>
            {/* Ruta raíz: login */}
            <Route path="/" element={<Auth />} />

            {/* Rutas protegidas */}
            <Route
                path="/dashboard"
                element={
                    <PrivateRoute>
                        <Dashboard />
                    </PrivateRoute>
                }
            />
            <Route
                path="/clientes"
                element={
                    <PrivateRoute>
                        <Clientes />
                    </PrivateRoute>
                }
            />
            <Route
                path="/inventario"
                element={
                    <PrivateRoute>
                        <Inventario />
                    </PrivateRoute>
                }
            />
            <Route
                path="/registro-ventas"
                element={
                    <PrivateRoute>
                        <SalesRegister />
                    </PrivateRoute>
                }
            />
            <Route
                path="/ventas"
                element={
                    <PrivateRoute>
                        <Ventas />
                    </PrivateRoute>
                }
            />
            <Route
                path="/soporte"
                element={
                    <PrivateRoute>
                        <CustomerSupport />
                    </PrivateRoute>
                }
            />
        </Routes>
    );
}

export default AppRoutes;
