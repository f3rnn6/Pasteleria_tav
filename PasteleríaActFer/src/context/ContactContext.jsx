import React, { createContext, useState, useContext } from 'react';

const ContactContext = createContext();

export const ContactProvider = ({ children }) => {
  const [email, setEmail] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const validateAndSend = () => {
    setError('');
    setSuccess(false);

    // Validación de dominio
    if (!email.toLowerCase().endsWith('@duocuc.cl')) {
      setError('Debes usar un correo institucional (@duocuc.cl)');
      return false;
    }

    // lógica de API/Envío
    console.log("Enviando datos:", { email, mensaje });
    setSuccess(true);
    
    // Limpiar campos tras éxito
    setEmail('');
    setMensaje('');
    return true;
  };

  const value = {
    email, setEmail,
    mensaje, setMensaje,
    error, success,
    validateAndSend
  };

  return (
    <ContactContext.Provider value={value}>
      {children}
    </ContactContext.Provider>
  );
};

// Hook 
export const useContact = () => useContext(ContactContext);