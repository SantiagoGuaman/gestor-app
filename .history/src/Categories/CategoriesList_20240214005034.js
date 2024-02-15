import React from 'react'

function CategoriesList() {
    const categoriasArray = c();
    const categoriasData = categoriasArray.props.children[0];
    /*
    const columns = [
        { name: "id_categoria", headerName: "ID", align: "left" },
        { name: "descripcion", headerName: "CATEGORIA", align: "left" },
        // Agrega otras columnas según sea necesario
    ];*/

    return (
        <ul>
            {Array.isArray(categoriasData) ? (
                categoriasData.map((item, index) => (
                    <li key={index}>
                        <strong>ID:</strong> {item.id_categoria}, <strong>CATEGORIA:</strong> {item.descripcion}
                        {/* Agrega otras propiedades según sea necesario */}
                    </li>
                ))
            ) : (
                <li>No hay datos disponibles</li>
            )}
        </ul>
    );
}

export default CategoriesList