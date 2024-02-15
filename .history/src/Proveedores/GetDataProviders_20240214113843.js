import React, { useEffect, useState } from 'react'

function GetDataProviders() {

    const endPoint = 'http://localhost:8080/api/proveedores';

    const [proveedores, setProveedores] = useState([]);
    const [newProveedor, setNewProveedor] = useState({
        nombre: '',
        direccion: '',
        telefono: ''
    });
    const [editProveedor, setEditProveedor] = useState({
        nombre: '',
        direccion: '',
        telefono: ''
    });
    const [isCreateModalOpen, setCreateModalOpen] = useState(false);

    const fetchData = async () => {
        try {
            const response = await fetch(endPoint);
            if (response.ok) {
                const data = await response.json();
                setProveedores(data);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const handleCreate = async () => {
        try {
            const response = await fetch(endPoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newProveedor),
            });

            if (response.ok) {
                console.log('Proveedor creado exitosamente');
                fetchData();
                setNewProveedor({
                    nombre: '',
                    direccion: '',
                    telefono: ''
                });
                setCreateModalOpen(false);
            } else {
                console.error('Error al crear el Proveedor');
            }
        } catch (error) {
            console.error('Error al procesar la solicitud de creación:', error);
        }
    };

    const handleEdit = (proveedor) => {
        setEditProveedor(proveedor);
    };

    const handleUpdate = async () => {
        try {
            const response = await fetch(`${endPoint}/${editProveedor.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(editProveedor),
            });

            if (response.ok) {
                console.log('Proveedor actualizado exitosamente');
                fetchData();
                setEditProveedor({
                    id: null,
                    nombre: '',
                    direccion: '',
                    telefono: ''
                });
            } else {
                console.error('Error al actualizar el Proveedor');
            }
        } catch (error) {
            console.error('Error al procesar la solicitud de actualización:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`${endPoint}/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                console.log('Proveedor eliminado exitosamente');
                fetchData();
            } else {
                console.error('Error al eliminar al Proveedor');
            }
        } catch (error) {
            console.error('Error al procesar la solicitud de eliminación:', error);
        }
    }


    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className='container text-center mt-5'>
            <h1>Lista de Proveedores</h1>
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Dirección</th>
                        <th>Teléfono</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {proveedores.map((proveedor) => (
                        <tr key={proveedor.id_proveedor}>
                            <td>{proveedor.id_proveedor}</td>
                            <td>{proveedor.nombre}</td>
                            <td>{proveedor.direccion}</td>
                            <td>{proveedor.telefono}</td>
                            <td>
                                <button className='btn btn-secondary' onClick={() => handleEdit(proveedor)}>Editar</button>
                                <button className='btn btn-danger' onClick={() => handleDelete(proveedor.id_proveedor)}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button onClick={() => setCreateModalOpen(true)}>Crear Proveedor</button>
            {isCreateModalOpen && (
                <div className="modal" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Crear Nuevo Proveedor</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={() => setCreateModalOpen(false)}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>

                            <div className="modal-body" style={{ display: 'flex', flexDirection: 'column' }}>
                                <input className='mt'
                                    type="text"
                                    placeholder="Nombre"
                                    value={newProveedor.nombre}
                                    onChange={(e) => setNewProveedor({ ...newProveedor, nombre: e.target.value })}
                                />
                                <input
                                    type="text"
                                    placeholder="Dirección"
                                    value={newProveedor.direccion}
                                    onChange={(e) => setNewProveedor({ ...newProveedor, direccion: e.target.value })}
                                />
                                <input
                                    type="text"
                                    placeholder="Teléfono"
                                    value={newProveedor.telefono}
                                    onChange={(e) => setNewProveedor({ ...newProveedor, telefono: e.target.value })}
                                />
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={() => setCreateModalOpen(false)}>Cancelar</button>
                                <button type="button" className="btn btn-primary" onClick={handleCreate}>Crear</button>
                            </div>
                        </div>
                    </div>
                </div>

            )}
            {editProveedor.id && (
                <div>
                    <h2>Editar Proveedor</h2>
                    <input
                        type="text"
                        value={editProveedor.nombre}
                        onChange={(e) => setEditProveedor({ ...editProveedor, nombre: e.target.value })}
                    />
                    <input
                        type="text"
                        value={editProveedor.direccion}
                        onChange={(e) => setEditProveedor({ ...editProveedor, direccion: e.target.value })}
                    />
                    <input
                        type="text"
                        value={editProveedor.telefono}
                        onChange={(e) => setEditProveedor({ ...editProveedor, telefono: e.target.value })}
                    />
                    <button className='btn btn-success' onClick={handleUpdate}>Guardar</button>
                </div>
            )}
        </div>
    );
}

export default GetDataProviders