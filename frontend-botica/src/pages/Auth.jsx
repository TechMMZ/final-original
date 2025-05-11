import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Auth() {
    const [modo, setModo] = useState('login');
    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rol, setRol] = useState('vendedor'); // valor por defecto
    const [mensaje, setMensaje] = useState('');
    const navigate = useNavigate();

    // Función para decodificar el JWT
    const decodeToken = (token) => {
        const payload = token.split('.')[1]; // Obtenemos la parte del payload
        const decodedPayload = atob(payload); // Decodificamos el payload de base64
        return JSON.parse(decodedPayload); // Lo parseamos a objeto JSON
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const endpoint = modo === 'login' ? '/api/auth/login' : '/api/auth/registro';

        try {
            const payload = modo === 'login'
                ? { email, password }  // Aquí estamos asegurándonos de enviar 'password'
                : { nombre, email, password, rol };

            const response = await axios.post(`http://localhost:5000${endpoint}`, payload);

            if (modo === 'login') {
                // Si el login es exitoso, redirigimos al usuario
                const { token } = response.data;
                localStorage.setItem('token', token);
                setMensaje('✅ Sesión iniciada correctamente');

                // Decodificar el token para obtener el rol
                const decodedToken = decodeToken(token); // Usamos la función para decodificar el token
                const userRole = decodedToken.rol; // Extraemos el rol del token

                setTimeout(() => {
                    if (userRole === 'admin') {
                        navigate('/dashboard'); // Redirigir a la vista del admin
                    } else {
                        navigate('/dashboard'); // Redirigir a la vista del vendedor
                    }
                }, 1000);
            } else {
                // Si el registro es exitoso, cambiamos a la vista de login
                setMensaje('✅ Usuario registrado correctamente');
                setModo('login');
            }

        } catch (error) {
            console.error(error);
            // Aseguramos que el mensaje de error sea visible y claro
            setMensaje(error.response?.data?.mensaje || '❌ Error en la autenticación');
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md space-y-6">
                <h2 className="text-3xl font-bold text-center text-gray-800">
                    {modo === 'login' ? 'Iniciar Sesión' : 'Registrarse'}
                </h2>

                {mensaje && (
                    <div className={`p-3 rounded text-white text-center ${mensaje.includes('✅') ? 'bg-green-600' : 'bg-red-600'}`}>
                        {mensaje}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    {modo === 'registro' && (
                        <>
                            <input
                                type="text"
                                placeholder="Nombre"
                                value={nombre}
                                onChange={e => setNombre(e.target.value)}
                                required
                                className="w-full p-3 border rounded focus:ring-2 focus:ring-blue-400"
                            />

                            <select
                                value={rol}
                                onChange={e => setRol(e.target.value)}
                                required
                                className="w-full p-3 border rounded focus:ring-2 focus:ring-blue-400"
                            >
                                <option value="vendedor">Vendedor</option>
                                <option value="admin">Administrador</option>
                            </select>
                        </>
                    )}

                    <input
                        type="email"
                        placeholder="Correo"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                        className="w-full p-3 border rounded focus:ring-2 focus:ring-blue-400"
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                        className="w-full p-3 border rounded focus:ring-2 focus:ring-blue-400"
                    />

                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded font-semibold shadow"
                    >
                        {modo === 'login' ? 'Entrar' : 'Registrarse'}
                    </button>
                </form>

                <p className="text-center text-gray-600">
                    {modo === 'login' ? '¿No tienes cuenta?' : '¿Ya tienes cuenta?'}{' '}
                    <button
                        onClick={() => setModo(modo === 'login' ? 'registro' : 'login')}
                        className="text-blue-600 hover:underline font-semibold"
                    >
                        {modo === 'login' ? 'Regístrate' : 'Inicia sesión'}
                    </button>
                </p>
            </div>
        </div>
    );
}

export default Auth;
