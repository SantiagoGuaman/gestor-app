import React, { useEffect, useState } from 'react'

function GetDataCategories() {
    
    //EndPoint
    const EndPoint = 'http://localhost:8080/api/categorias';

    const [categorias, setCategorias] = useState([]);
    const [newCategoria, setNewCategoria] = useState('');
    const [editCategoria, setEditCategoria] = useState('');
    const [editCategoriaId, setEditCategoriaId] = useState(null);
    const [isCreateModalOpen, setCreateModalOpen] = useState(false);

    //Handler List of categories
    const fetchData = async () => {
        try {
            const response = await fetch(EndPoint, {
                method: 'GET',
            });

            if (response.ok) {
                const fetchedData = await response.json();
                setCategorias(fetchedData);
            }
        } catch (error) {
            console.error("Error al obtener datos de la API:", error);
        }
    }

    //Handler Creation of Category
    const handleCreate = async () => {
        try {
            const response = await fetch(EndPoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    descripcion: newCategoria,
                }),
            });

            if (response.ok) {
                console.log('Categoría creada exitosamente');
                fetchData();
                setNewCategoria('');
            } else {
                console.error('Error al crear la categoría');
            }
        } catch (error) {
            console.error('Error al procesar la solicitud de creación:', error);
        }
    }

    const handleEdit = (id, descripcion) => {
        setEditCategoriaId(id);
        setEditCategoria(descripcion);
    }

    //Handler of Update Category
    const handleUpdate = async () => {
        try {
            const response = await fetch(`${EndPoint}/${editCategoriaId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    descripcion: editCategoria,
                }),
            });

            if (response.ok) {
                console.log('Categoría actualizada exitosamente');
                fetchData();
                setEditCategoriaId(null);
                setEditCategoria('');
            } else {
                console.error('Error al actualizar la categoría');
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
                console.log('Categoría eliminada exitosamente');
                fetchData();
            } else {
                console.error('Error al eliminar la categoría');
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
                <h4>Lista de Categorías</h4>
            </div>
            <div className='card-body'>
                <table className="table table-hover">
                    {categorias.length > 0 ? (
                        <>
                            <thead>
                                <tr>
                                    <th scope="col">ID</th>
                                    <th scope="col">Nombre</th>
                                    <th scope="col">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {categorias.map((categoria) => (
                                    <tr key={categoria.id_categoria}>
                                        <th scope="row">{categoria.id_categoria}</th>
                                        <td>{editCategoriaId === categoria.id_categoria ? (
                                            <input
                                                type="text"
                                                value={editCategoria}
                                                onChange={(e) => setEditCategoria(e.target.value)}
                                            />
                                        ) : (
                                            categoria.descripcion
                                        )}</td>
                                        <td>
                                            {editCategoriaId === categoria.id_categoria ? (
                                                <button className='btn btn-success' onClick={handleUpdate}>Guardar</button>
                                            ) : (
                                                <>
                                                    <button className='btn btn-secondary btn-sm me-2' onClick={() => handleEdit(categoria.id_categoria, categoria.descripcion)}>Editar</button>
                                                    <button className='btn btn-danger' onClick={() => handleDelete(categoria.id_categoria)}>Eliminar</button>
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
                    <h5>Nueva Categoría</h5>
                    <button className='btn btn-primary' onClick={() => setCreateModalOpen(true)}>Crear</button>
                    {isCreateModalOpen && (
                        <div className="modal" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
                            <div className="modal-dialog" role="document">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title">Crear Nueva Categoría</h5>
                                        <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={() => setCreateModalOpen(false)}>
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div className="modal-body">
                                        <input
                                            type="text"
                                            value={newCategoria}
                                            onChange={(e) => setNewCategoria(e.target.value)}
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

export default GetDataCategories