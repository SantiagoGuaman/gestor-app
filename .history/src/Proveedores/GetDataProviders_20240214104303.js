import React, { useEffect, useState } from 'react'

function GetDataProviders() {

    //EndPoint
    const EndPoint = 'http://localhost:8080/api/proveedores';

    const [proveedores, setProveedores] = useState([]);
    const [newProveedor, setNewProveedor] = useState('');
    const [editProveedor, setEditProveedor] = useState({
        nombre: '',
        direccion: '',
        telefono: ''
    });

    const [editProveedorId, setEditProveedorId] = useState(null);
    const [isCreateModalOpen, setCreateModalOpen] = useState(false);

    //Handler List of Products
    const fetchData = async () => {
        try {
            const response = await fetch(EndPoint, {
                method: 'GET',
            });

            if (response.ok) {
                const fetchedData = await response.json();
                setProveedores(fetchedData);
            }
        } catch (error) {
            console.error("Error al obtener datos de la API:", error);
        }
    }

    //Handler Creation of Products
    const handleCreate = async () => {
        try {
            const response = await fetch(EndPoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    nombre: newProveedor,
                    direccion: newProveedor,
                    telefono: newProveedor
                }),
            });

            if (response.ok) {
                console.log('Proveedor creado exitosamente');
                fetchData();
                setNewProveedor('');
            } else {
                console.error('Error al crear el Proveedor');
            }
        } catch (error) {
            console.error('Error al procesar la solicitud de creación:', error);
        }
    }

    const handleEdit = (id) => {
        setEditProveedorIdId(id);
        setEditProveedor(nombre);
        setEditProveedor(direccion);
        setEditProveedor(telefono);
    }

    //Handler of Update Category
    const handleUpdate = async () => {
        try {
            const response = await fetch(`${EndPoint}/${editProveedorId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    nombre: editProveedor,
                    direccion: editProveedor,
                    telefono: editProveedor
                }),
            });

            if (response.ok) {
                console.log('Proveedor actualizado exitosamente');
                fetchData();
                setEditProveedorId(null);
                setEdit('');
            } else {
                console.error('Error al actualizar el Proveedor');
            }
        } catch (error) {
            console.error('Error al procesar la solicitud de actualización:', error);
        }
    }

    //Handle Delete Category
    const handleDelete = async (id) => {
        try {
            const response = await fetch(`${EndPoint}/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                console.log('Proveedor eliminado exitosamente');
                fetchData();
            } else {
                console.error('Error al eliminar el Proveedor');
            }
        } catch (error) {
            console.error('Error al procesar la solicitud de eliminación:', error);
        }
    }

    //Data
    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className='container text-center mt-5'>
            <div>
                <h4>Lista de Proveedores</h4>
            </div>
            <div className='card-body'>
                <table className="table table-hover">
                    {proveedores.length > 0 ? (
                        <>
                            <thead>
                                <tr>
                                    <th scope="col">ID</th>
                                    <th scope="col">Nombre</th>
                                    <th scope="col">Dirección</th>
                                    <th scope="col">Teléfono</th>
                                    <th scope="col">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {proveedores.map((proveedor) => (
                                    <tr key={proveedor.id_proveedor}>
                                        <th scope="row">{proveedor.id_proveedor}</th>
                                        <td>{editProveedorId === proveedor.id_proveedor ? (
                                            <input
                                                type="text"
                                                value={editProveedor}
                                                onChange={(e) => setEditProveedor(e.target.value)}
                                            />
                                        ) : (
                                            proveedor.nombre,
                                            proveedor.direccion,
                                            proeedor.telefono
                                        )}</td>
                                        <td>
                                            {editProveedorId === proveedor.id_proveedor ? (
                                                <button className='btn btn-success' onClick={handleUpdate}>Guardar</button>
                                            ) : (
                                                <>
                                                    <button className='btn btn-secondary' onClick={() => handleEdit(proveedor.id_proveedor, categoria.descripcion)}>Editar</button>
                                                    <button className='btn btn-danger' onClick={() => handleDelete(proveedor.id_proveedor)}>Eliminar</button>
                                                </>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </>
                    ) : null}
                </table>
                <div>
                    <h5>Nuevo Proveedor</h5>
                    <button className='btn btn-primary' onClick={() => setCreateModalOpen(true)}>Crear</button>
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
                                    <div className="modal-body">
                                        <input
                                            type="text"
                                            value={newProveedor}
                                            onChange={(e) => setNewProveedor(e.target.value)}
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
                </div>
            </div>
        </div>
    )
}

export default GetDataProviders