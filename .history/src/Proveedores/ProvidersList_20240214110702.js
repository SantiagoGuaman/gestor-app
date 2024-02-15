import React from 'react'
import GetDataProviders from './GetDataProviders';

function ProvidersList() {
    const providersArray = GetDataProviders();
    const providersData = providersArray.props.children[0];
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

export default ProvidersList