
import { useState } from "react";
import Axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2';


export const Producto = () => {

    const [codigo_producto, setCodigo_producto] = useState();
    const [nombre, setNombre] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [precio, setPrecio] = useState();
    const [codigo_categoria, setCodigo_categoria] = useState();
    const [codigo_proveedor, setCodigo_proveedor] = useState();
    
    const [editar, setEditar] = useState(false);

    const [listaProducto, setListaProducto] = useState([]);

    //llenar select de categoria

    /*metodo de guardar*/
    const AgregarProducto = () => {
        Axios.post("http://localhost:3001/crearProducto", {
            codigo_producto: codigo_producto,
            nombre: nombre,
            descripcion: descripcion,
            precio: precio,
            codigo_categoria: codigo_categoria,
            codigo_proveedor: codigo_proveedor
        }).then(() => {
            listarProducto();
            limpiar();
            Swal.fire({
                title: "<span>Guardado Exitosa</span>",
                html: "<i>El producto <strong>" + nombre + " </strong> fue guardado con exito</i>",
                icon: "success",
                timer: 2500
            })
        });
    }
    /*metodo de listar*/
    const listarProducto = () => {
        Axios.get("http://localhost:3001/listarProducto").then((response) => {
            setListaProducto(response.data);
        });
    }
    /*metodo de editar*/
    const EditarProducto = (val) => {
        setEditar(true);

        setCodigo_producto(val.codigo_producto);
        setNombre(val.nombre);
        setDescripcion(val.descripcion);
        setPrecio(val.precio);
        setCodigo_categoria(val.codigo_categoria);
        setCodigo_proveedor(val.codigo_proveedor);

    }
    /*metodo de actualizar*/
    const ActualizarProducto = () => {
        Axios.put("http://localhost:3001/actualizarProducto", {
            codigo_producto: codigo_producto,
            nombre: nombre,
            descripcion: descripcion,
            precio: precio,
            codigo_categoria: codigo_categoria,
            codigo_proveedor: codigo_proveedor
        }).then(() => {
            listarProducto();
            limpiar();
            Swal.fire({
                title: "<span>Actualizacion Exitosa</span>",
                html: "<i>El producto <strong>" + nombre + "</strong> fue actualizado con exito</i>",
                icon: "success",
                timer: 2500
            })
        });
    }
    //metodo eliminar
    const EliminarProducto = (val) => {

        Swal.fire({
            title: 'Eliminar Registro',
            html: 'Esta seguro de eliminar el producto <strong>' + val.nombre + '</strong>?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, bórralo!'
        }).then((result) => {
            if (result.isConfirmed) {

                Axios.delete(`http://localhost:3001/eliminarUsuario/${val.codigo_producto}`,)
                    .then(() => {
                        listarProducto();
                        limpiar();
                    });

                Swal.fire({
                    title: 'Eliminacion exitosa',
                    html: 'El producto <strong>' + val.nombre + '</strong> fue eliminado correctamente',
                    icon: 'success',
                    timer: 2500
                })
            }
        })


    }
    // metodo limpiar cajas de texto
    const limpiar = () => {
        setEditar(false);
        setCodigo_producto("");
        setNombre("");
        setDescripcion("");
        setPrecio("");
        setCodigo_categoria("");
        setCodigo_proveedor("");
    }

    listarProducto();

    return (
        <div className='container mt-3'>
            <div className="card text-center">
                <div className="card-header">
                    <h4>Registro de Productos</h4>
                </div>


                <div className="card-body">
                    <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1">Código Producto</span>
                        <input onChange={(event) => { setCodigo_producto(event.target.value) }} type="number" className="form-control" value={codigo_producto} placeholder="10204" aria-label="cedula" aria-describedby="basic-addon1" />
                    </div>

                    <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1">Nombre</span>
                        <input onChange={(event) => { setNombre(event.target.value) }} type="text" className="form-control" value={nombre} placeholder="Azucar Morena" aria-label="nombre" aria-describedby="basic-addon1" />
                    </div>

                    <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1">Descripcion</span>
                        <input onChange={(event) => { setDescripcion(event.target.value) }} type="text" className="form-control" value={descripcion} placeholder="azucar morena de 1 kilogramo" aria-label="Telefono" aria-describedby="basic-addon1" />
                    </div>

                    <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1">Precio</span>
                        <input onChange={(event) => { setPrecio(event.target.value) }} type="number" className="form-control" value={precio} placeholder="5600" aria-label="Usuario" aria-describedby="basic-addon1" />
                    </div>

                    <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1">Código Categoria</span>
                        <input onChange={(event) => { setCodigo_categoria(event.target.value) }} type="number" className="form-control" value={codigo_categoria} placeholder="12346" aria-label="Usuario" aria-describedby="basic-addon1" />
                    </div>
                    <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1">Código Proveedor</span>
                        <input onChange={(event) => { setCodigo_proveedor(event.target.value) }} type="number" className="form-control" value={codigo_proveedor} placeholder="46316" aria-label="Usuario" aria-describedby="basic-addon1" />
                    </div>


                    <div className="card-footer text-body-secondary">

                        {
                            editar ?
                                <div><button className='btn btn-warning ' onClick={ActualizarProducto}>Actualizar</button>
                                    <button className='btn btn-info m-2' onClick={limpiar}>Cancelar</button>
                                </div>
                                : <button className='btn btn-success' onClick={AgregarProducto}>Guardar</button>

                        }

                    </div>
                </div>
            </div>

            <table className="table table-striped-columns">
                <thead>
                    <tr>
                        <th scope="col">Código Producto</th>
                        <th scope="col">Nombre</th>
                        <th scope="col">Descripcion</th>
                        <th scope="col">Precio</th>
                        <th scope="col">Código Categoria</th>
                        <th scope="col">Código Proveedor</th>
                        <th scope="col">Acciones</th>
                    </tr>
                </thead>
                <tbody>

                    {
                        listaProducto.map((val, key) => {
                            return <tr key={val.codigo_producto}>
                                <th scope="row">{val.codigo_producto}</th>
                                <td>{val.nombre}</td>
                                <td>{val.descripcion}</td>
                                <td>{val.precio}</td>
                                <td>{val.codigo_categoria}</td>
                                <td>{val.codigo_proveedor}</td>
                                <td>
                                    <div className="btn-group" role="group" aria-label="Basic example">
                                        <button onClick={() => {
                                            EditarProducto(val);
                                        }} type="button" className="btn btn-info">Editar</button>
                                        <button onClick={() => {
                                            EliminarProducto(val
                                            );
                                        }} type="button" className="btn btn-danger">Eliminar</button>
                                    </div>
                                </td>
                            </tr>
                        })
                    }


                </tbody>
            </table>

        </div>
    );
}





