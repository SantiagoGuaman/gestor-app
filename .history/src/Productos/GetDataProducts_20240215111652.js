import React, { useEffect, useState } from 'react'

function GetDataProducts() {
    const endPoint = 'http://localhost:8080/api/productos';

    const [productos, setProductos] = useState([]);
    const [newProducto, setNewProducto] = useState({
        descripcion: '',
        categoria: '',
        proveedor: ''
    });

    const [editProducto, setEditProducto] = useState({
        descripcion: '',
        categoria: '',
        proveedor: ''
    });

    const [isCreateModalOpen, setCreateModalOpen] = useState(false);

    const fetchData = async () => {
        try {
            const response = await fetch(endPoint);
            if (response.ok) {
                const data = await response.json();
                setProductos(data);
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
                console.log('Producto creado exitosamente');
                fetchData();
                setNewProducto({
                    descripcion: '',
                    categoria: '',
                    proveedor: ''
                });
                setCreateModalOpen(false);
            } else {
                console.error('Error al crear el Producto');
            }
        } catch (error) {
            console.error('Error al procesar la solicitud de creación:', error);
        }
    };

    const handleEdit = (producto) => {
        setEditProducto(producto);
    };

    const handleUpdate = async () => {
        try {
            const response = await fetch(`${endPoint}/${editProducto.id_producto}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(editProducto),
            });

            if (response.ok) {
                console.log('Producto actualizado exitosamente');
                fetchData();
                setEditProducto({
                    descripcion: '',
                    categoria: '',
                    proveedor: ''
                });
            } else {
                console.error('Error al actualizar el Producto');
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
                console.log('Producto eliminado exitosamente');
                fetchData();
            } else {
                console.error('Error al eliminar el Producto');
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
            <h1>Lista de Productos</h1>
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Descripción</th>
                        <th>Categoría</th>
                        <th>Proveedor</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {productos.map((producto) => (
                        <tr key={producto.id_producto}>
                            <td>{producto.id_producto}</td>
                            <td>{producto.categoria.descripcion}</td>
                            <td>{producto.proveedor.nombre}</td>
                            <td>
                                <button className='btn btn-secondary btn-sm me-2' onClick={() => handleEdit(producto)}>Editar</button>
                                <button className='btn btn-danger btn-sm' onClick={() => handleDelete(producto.id_producto)}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button className='btn btn-primary btn-sm' onClick={() => setCreateModalOpen(true)}>Crear Producto</button>
            {isCreateModalOpen && (
                <div className="modal" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Crear Nuevo Producto</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={() => setCreateModalOpen(false)}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>

                            <div className="modal-body" style={{ display: 'flex', flexDirection: 'column' }}>
                                <input className='form-control mt-3'
                                    type="text"
                                    placeholder="Descripción"
                                    value={newProducto.descripcion}
                                    onChange={(e) => setNewProducto({ ...newProducto, descripcion: e.target.value })}
                                />
                                <input className='form-control mt-3'
                                    type="text"
                                    placeholder="Categoría"
                                    value={newProducto.categoria}
                                    onChange={(e) => setNewProducto({ ...newProducto, categoria: e.target.value })}
                                />
                                <input className='form-control mt-3'
                                    type="text"
                                    placeholder="Proveedor"
                                    value={newProducto.proveedor}
                                    onChange={(e) => setNewProducto({ ...newProducto, proveedor: e.target.value })}
                                />
                            </div>
                            <div className="modal-footer mt-3">
                                <button type="button" className="btn btn-primary" onClick={handleCreate}>Crear</button>
                                <button type="button" className="btn btn-secondary" onClick={() => setCreateModalOpen(false)}>Cancelar</button>
                            </div>
                        </div>
                    </div>
                </div>

            )}

            {editProducto.id_producto && (
                <div>
                    <h2>Editar Producto</h2>
                    <input
                        type="text"
                        value={editProducto.descripcion}
                        onChange={(e) => setEditProducto({ ...editProducto, descripcion: e.target.value })}
                    />
                    <input
                        type="text"
                        value={editProducto.direccion}
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

export default GetDataProducts