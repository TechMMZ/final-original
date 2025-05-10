import React, { useState } from 'react';

// Componente para el chat de Atención al Cliente
const CustomerSupportChat = () => {
    const [customerName, setCustomerName] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [isAdminTyping, setIsAdminTyping] = useState(false);

    // Maneja el envío de mensajes del cliente
    const handleSendMessage = () => {
        if (!message.trim()) return; // Evitar enviar mensajes vacíos

        const newMessage = {
            sender: 'Cliente',
            text: message,
            timestamp: new Date(),
        };

        setMessages((prevMessages) => [...prevMessages, newMessage]);
        setMessage('');

        // Simular respuesta automática del administrador
        setIsAdminTyping(true);
        setTimeout(() => {
            setMessages((prevMessages) => [
                ...prevMessages,
                {
                    sender: 'Administrador',
                    text: `Gracias, ${customerName}. ¿En qué más puedo ayudarte?`,
                    timestamp: new Date(),
                },
            ]);
            setIsAdminTyping(false);
        }, 2000); // Respuesta del administrador después de 2 segundos
    };

    return (
        <div className="max-w-xl mx-auto p-4 bg-white shadow-lg rounded-lg">
            <h2 className="text-3xl font-semibold text-center mb-4">Atención al Cliente</h2>

            <div className="mb-4">
                <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Ingresa tu nombre"
                    className="w-full p-2 border rounded-md mb-2"
                />
            </div>

            <div className="h-80 overflow-y-auto bg-gray-100 p-4 rounded-lg mb-4">
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        className={`flex ${msg.sender === 'Cliente' ? 'justify-start' : 'justify-end'} mb-2`}
                    >
                        <div
                            className={`p-3 rounded-lg max-w-xs ${msg.sender === 'Cliente' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'
                                }`}
                        >
                            <p className="font-semibold">{msg.sender}</p>
                            <p>{msg.text}</p>
                            <p className="text-xs text-gray-500">{new Date(msg.timestamp).toLocaleTimeString()}</p>
                        </div>
                    </div>
                ))}
                {isAdminTyping && (
                    <div className="flex justify-end mb-2">
                        <div className="p-3 rounded-lg max-w-xs bg-gray-300 text-black italic">
                            Administrador está escribiendo...
                        </div>
                    </div>
                )}
            </div>

            <div className="flex items-center space-x-2">
                <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Escribe tu mensaje..."
                    className="w-full p-2 border rounded-md h-20 resize-none"
                />
                <button
                    onClick={handleSendMessage}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
                >
                    Enviar
                </button>
            </div>
        </div>
    );
};

export default CustomerSupportChat;
