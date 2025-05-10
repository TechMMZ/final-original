import React, { useState, useEffect } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { X, Menu } from 'lucide-react';

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    // Obtener el nombre del usuario desde el localStorage
    const username = localStorage.getItem('username');

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username'); // Eliminar el nombre al cerrar sesión
        navigate('/');
    };

    useEffect(() => {
        document.body.style.overflow = menuOpen ? 'hidden' : 'auto';
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [menuOpen]);

    // Si estamos en / no mostrar Navbar
    if (location.pathname === '/') return null;

    return (
        <header className="w-full bg-blue-700 text-white shadow-lg top-0 left-0 z-50">
            <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
                {/* Logo / Nombre */}
                <div className="text-2xl font-bold">
                    Botica Nova Salud
                </div>

                {/* Mostrar el nombre del usuario si está logueado */}
                {username && (
                    <div className="text-lg font-semibold text-white">
                        Hola, {username}
                    </div>
                )}

                {/* Desktop Menu */}
                <nav className="hidden md:flex space-x-4 items-center">
                    <Link to="/dashboard" className="hover:bg-blue-600 px-3 py-2 rounded">Dashboard</Link>
                    <Link to="/clientes" className="hover:bg-blue-600 px-3 py-2 rounded">Clientes</Link>
                    <Link to="/inventario" className="hover:bg-blue-600 px-3 py-2 rounded">Inventario</Link>
                    <Link to="/registro-ventas" className="hover:bg-blue-600 px-3 py-2 rounded">Registro de Ventas</Link>
                    <Link to="/ventas" className="hover:bg-blue-600 px-3 py-2 rounded">Historial de Ventas</Link>
                    <Link to="/soporte" className="hover:bg-blue-600 px-3 py-2 rounded">Atención al Cliente</Link>
                    <button
                        onClick={handleLogout}
                        className="bg-red-500 hover:bg-red-600 px-3 py-2 rounded"
                    >
                        Cerrar Sesión
                    </button>
                </nav>

                {/* Mobile Menu Button */}
                <button
                    onClick={() => setMenuOpen(true)}
                    className="md:hidden p-2 rounded hover:bg-blue-600"
                >
                    <Menu className="w-6 h-6" />
                </button>
            </div>

            {/* Mobile Menu */}
            {menuOpen && (
                <>
                    <div
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
                        onClick={() => setMenuOpen(false)}
                        aria-hidden="true"
                    />
                    <div className="fixed top-0 right-0 w-64 h-full bg-blue-700 text-white z-50 p-6 flex flex-col">
                        <div className="flex justify-between items-center mb-6">
                            <span className="text-xl font-bold">Menú</span>
                            <button onClick={() => setMenuOpen(false)}>
                                <X className="w-6 h-6 text-white" />
                            </button>
                        </div>
                        <nav className="flex flex-col space-y-4">
                            <Link to="/dashboard" onClick={() => setMenuOpen(false)} className="hover:bg-blue-600 px-3 py-2 rounded">Dashboard</Link>
                            <Link to="/clientes" onClick={() => setMenuOpen(false)} className="hover:bg-blue-600 px-3 py-2 rounded">Clientes</Link>
                            <Link to="/inventario" onClick={() => setMenuOpen(false)} className="hover:bg-blue-600 px-3 py-2 rounded">Inventario</Link>
                            <Link to="/registro-ventas" onClick={() => setMenuOpen(false)} className="hover:bg-blue-600 px-3 py-2 rounded">Registro de Ventas</Link>
                            <Link to="/ventas" onClick={() => setMenuOpen(false)} className="hover:bg-blue-600 px-3 py-2 rounded">Historial de Ventas</Link>
                            <Link to="/soporte" onClick={() => setMenuOpen(false)} className="hover:bg-blue-600 px-3 py-2 rounded">Atención al Cliente</Link>
                            <button
                                onClick={handleLogout}
                                className="bg-red-500 hover:bg-red-600 px-3 py-2 rounded"
                            >
                                Cerrar Sesión
                            </button>
                        </nav>
                    </div>
                </>
            )}
        </header>
    );
};

export default Navbar;
