import React from 'react';
import { Link, NavLink } from 'react-router-dom';


export const Navbar = () => {
    return (
        <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/producto">Tienda</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <NavLink 
                                className={ ({ isActive }) => `nav-link ${ isActive ? 'active' : '' }` }                                
                                to="/producto">
                                Producto
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink 
                                className={ ({ isActive }) => `nav-link ${ isActive ? 'active' : '' }` } 
                                to="/usuario">
                                Usuario
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink 
                                className={ ({ isActive }) => `nav-link ${ isActive ? 'active' : '' }` } 
                                to="/proveedor">
                                Proveedor
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink 
                                className={ ({ isActive }) => `nav-link ${ isActive ? 'active' : '' }` } 
                                to="/categoria">
                                Categoria
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink 
                                className={ ({ isActive }) => `nav-link ${ isActive ? 'active' : '' }` } 
                                to="/cliente">
                                Cliente
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink 
                                className={ ({ isActive }) => `nav-link ${ isActive ? 'active' : '' }` } 
                                to="/venta">
                                Venta
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink 
                                className={ ({ isActive }) => `nav-link ${ isActive ? 'active' : '' }` } 
                                to="/factura">
                                Factura
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
} 
