import React from 'react';
import { Form } from 'react-bootstrap';

/**
 * Átomo: InputFile
 * Wrapper estilizado para inputs de tipo archivo.
 * @param {Function} onChange - Función que maneja el evento de selección.
 * @param {string} label - Etiqueta del input.
 */
function InputFile({ onChange, label = "Seleccionar imagen" }) {
  return (
    <Form.Group className="mb-3">
      <Form.Label>{label}</Form.Label>
      <Form.Control 
        type="file" 
        accept="image/*" 
        onChange={onChange} 
      />
      <Form.Text className="text-muted">
        Formatos: JPG, PNG, WEBP. Se optimizará automáticamente.
      </Form.Text>
    </Form.Group>
  );
}

export default InputFile;