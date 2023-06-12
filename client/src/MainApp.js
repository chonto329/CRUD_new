import React from 'react';
import { Navbar } from './Components/Navbar';
import { Routes, Route, Navigate, BrowserRouter } from 'react-router-dom';
import { Producto } from './Components/Producto';
import { Usuario } from './Components/Usuario';
import { Proveedor } from './Components/Proveedor';
import { Categoria } from './Components/Categoria';
import { Cliente } from './Components/Cliente';
import { Venta } from './Components/Venta';
import { Factura } from './Components/Factura';


const MainApp = () => {
    return <>
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path='producto' element={<Producto />} />
                <Route path='usuario' element={<Usuario />} />
                <Route path='proveedor' element={<Proveedor />} />
                <Route path='categoria' element={<Categoria />} />
                <Route path='cliente' element={<Cliente />} />
                <Route path='venta' element={<Venta />} />
                <Route path='factura' element={<Factura />} />

                <Route path='*' element={<Navigate to='/producto' />} />
            </Routes>
        </BrowserRouter>
    </>
}

export default MainApp;