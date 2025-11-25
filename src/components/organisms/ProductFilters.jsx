import React from 'react';
import { Card, Form, Button, Accordion } from 'react-bootstrap';

const ProductFilters = ({ groups = [], onClear, hasActiveFilters }) => {
    return (
        <Card className="shadow-sm border-0 p-3 sticky-top" style={{ top: '20px', zIndex: 1 }}>
            {groups.map((group, index) => (
                <div key={group.id} className={index !== groups.length - 1 ? "mb-4 border-bottom pb-3" : ""}>
                    <h6 className="fw-bold mb-3 text-uppercase small text-muted">{group.title}</h6>
                    
                    {group.type === 'checkbox' && (
                        <Form>
                            {group.options.map(option => (
                                <div key={option.id} className="mb-2">
                                    <Form.Check 
                                        type="checkbox"
                                        id={`filter-${group.id}-${option.id}`}
                                        label={option.label}
                                        checked={option.checked}
                                        onChange={option.onChange}
                                        style={{ cursor: 'pointer' }}
                                    />
                                </div>
                            ))}
                            {group.options.length === 0 && (
                                <p className="text-muted small fst-italic">Sin opciones.</p>
                            )}
                        </Form>
                    )}

                    {/* Aqui podriamos meterle otros filtros despues */}
                    {group.type === 'color' && (
                        <div className="d-flex flex-wrap gap-2">
                            <p className="small text-muted">WIP: Colores</p>
                        </div>
                    )}
                </div>
            ))}

            {hasActiveFilters && (
                <div className="mt-2 text-center">
                    <Button 
                        variant="outline-danger" 
                        size="sm" 
                        className="w-100"
                        onClick={onClear}
                    >
                        Limpiar Filtros
                    </Button>
                </div>
            )}
        </Card>
    );
};

export default ProductFilters;