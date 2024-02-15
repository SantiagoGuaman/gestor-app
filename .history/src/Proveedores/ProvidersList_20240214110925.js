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
            {Array.isArray(providersData) ? (
                providersData.map((item, index) => (
                    <li key={index}>
                        <strong>ID:</strong>
                        {item.id_proveedor},
                        <strong>Nombre:</strong>
                        {item.nombre},
                        <strong>Dirección:</strong>
                        {item.direccion},
                         <strong>Teléfono:</strong>
                        {item.telefono},
                       
                    </li>
                ))
            ) : (
                <li>No hay datos disponibles</li>
            )}
        </ul>
    );
}

export default ProvidersList