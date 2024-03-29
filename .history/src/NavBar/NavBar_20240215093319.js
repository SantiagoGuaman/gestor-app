import React from 'react'
import { Link } from 'react-router-dom'
import './NavBar.css';
function NavBar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-dark lg">
            <Link className="navbar-brand" to="/" style={{ color: '#FFFFFF' }}>Gestor</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav" >
                    <li className="nav-item active">
                        <Link className="nav-link" to="/" >Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/categories" style={{ color: '#FFFFFF' }}>Categorías</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/providers" style={{ color: '#FFFFFF' }}>Proveedores</Link>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default NavBar