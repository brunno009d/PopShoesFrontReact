import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import InputFile from '../../../components/atoms/InputFile';

describe('InputFile Component', () => {
  it('renderiza el input file y la etiqueta', () => {
    const { container } = render(<InputFile label="Subir foto" />);
    const label = container.querySelector('label');
    const input = container.querySelector('input[type="file"]');

    expect(label).toBeTruthy();
    expect(label.textContent).toContain('Subir foto');
    expect(input).toBeTruthy();
  });

  it('llama onChange cuando se selecciona un archivo', () => {
    const handleChange = jasmine.createSpy('handleChange');
    const { container } = render(<InputFile onChange={handleChange} />);
    const input = container.querySelector('input[type="file"]');

    const file = new File(['dummy content'], 'photo.png', { type: 'image/png' });
    fireEvent.change(input, { target: { files: [file] } });

    expect(handleChange).toHaveBeenCalled();
  });
});
