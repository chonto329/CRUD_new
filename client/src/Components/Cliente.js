
import { useState } from "react";
import Axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2';


export const Cliente = () => {

    const [id_cliente, setId_cliente] = useState();
    const [nombre, setNombre] = useState("");
    const [direccion, setDireccion] = useState("");
    const [telefono, setTelefono] = useState("");

    const [editar, setEditar] = useState(false);

    const [listaCliente, setListaCliente] = useState([]);

    /*metodo de guardar*/
    const AgregarCliente = () => {
        Axios.post("http://localhost:3001/crearCliente", {
            id_cliente: id_cliente,
            nombre: nombre,
            direccion: direccion,
            telefono: telefono
        }).then(() => {
            ListarCliente();
            limpiar();
            Swal.fire({
                title: "<span>Guardado Exitosa</span>",
                html: "<i>El cliente <strong>" + nombre + " </strong> fue guardado con exito</i>",
                icon: "success",
                timer: 2500
            })
        });
    }
    /*metodo de listar*/
    const ListarCliente = () => {
        Axios.get("http://localhost:3001/listarCliente").then((response) => {
            setListaCliente(response.data);
            console.log(response.data);
        });
    }
    /*metodo de editar*/
    const EditarCliente = (val) => {
        setEditar(true);

        setId_cliente(val.id_cliente);
        setNombre(val.nombre);
        setDireccion(val.direccion);
        setTelefono(val.telefono)
    }
    /*metodo de actualizar*/
    const actualizarCliente = () => {
        Axios.put("http://localhost:3001/actualizarCliente", {
            id_cliente: id_cliente,
            nombre: nombre,
            direccion: direccion,
            telefono: telefono
        }).then(() => {
            ListarCliente();
            limpiar();
            Swal.fire({
                title: "<span>Actualizacion Exitosa</span>",
                html: "<i>El cliente <strong>" + nombre + "</strong> fue actualizado con exito</i>",
                icon: "success",
                timer: 2500
            })
        });
    }
    //metodo eliminar
    const EliminarCliente = (val) => {

        Swal.fire({
            title: 'Eliminar Registro',
            html: 'Esta seguro de eliminar el cliente<strong>' + val.nombre + '</strong>?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, bórralo!'
        }).then((result) => {
            if (result.isConfirmed) {

                Axios.delete(`http://localhost:3001/eliminarCliente/${val.id_cliente}`,)
                    .then(() => {
                        ListarCliente();
                        limpiar();
                    });

                Swal.fire({
                    title: 'Eliminacion exitosa',
                    html: 'El cliente<strong>' + val.nombre + '</strong> fue eliminado correctamente',
                    icon: 'success',
                    timer: 2500
                })
            }
        })


    }
    // metodo limpiar cajas de texto
    const limpiar = () => {
        setEditar(false);
        setId_cliente("");
        setNombre("");
        setDireccion("");
        setTelefono("")

    }

    ListarCliente();

    return (
        <div className='container mt-3'>
            <div className="card text-center">
                <div className="card-header">
                    <h4>Registro de Clientes</h4>
                </div>


                <div className="card-body">
                    <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1">ID cliente</span>
                        <input onChange={(event) => { setId_cliente(event.target.value) }} type="number" className="form-control" value={id_cliente} placeholder="1020403437" aria-label="codigo" aria-describedby="basic-addon1" />
                    </div>

                    <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1">Nombre</span>
                        <input onChange={(event) => { setNombre(event.target.value) }} type="text" className="form-control" value={nombre} placeholder="Sara Gomez" aria-label="nombre" aria-describedby="basic-addon1" />
                    </div>

                    <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1">Direccion</span>
                        <input onChange={(event) => { setDireccion(event.target.value) }} type="text" className="form-control" value={direccion} placeholder="Car 20 # 57-64" aria-label="nombre" aria-describedby="basic-addon1" />
                    </div>

                    <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1">Telefono</span>
                        <input onChange={(event) => { setTelefono(event.target.value) }} type="number" className="form-control" value={telefono} placeholder="3216372584" aria-label="telefono" aria-describedby="basic-addon1" />
                    </div>
                    
                    <div className="card-footer text-body-secondary">

                        {
                            editar ?
                                <div><button className='btn btn-warning ' onClick={actualizarCliente}>Actualizar</button>
                                    <button className='btn btn-info m-2' onClick={limpiar}>Cancelar</button>
                                </div>
                                : <button className='btn btn-success' onClick={AgregarCliente}>Guardar</button>

                        }

                    </div>
                </div>
            </div>

            <table className="table table-striped-columns">
                <thead>
                    <tr>
                        <th scope="col">ID cliente</th>
                        <th scope="col">Nombre</th>
                        <th scope="col">Direccion</th>
                        <th scope="col">Telefono</th>
                        <th scope="col">Acciones</th>

                    </tr>
                </thead>
                <tbody>

                    {
                        listaCliente.map((val, key) => {
                            return <tr key={val.id_cliente}>
                                <th scope="row">{val.id_cliente}</th>
                                <td>{val.nombre}</td>
                                <td>{val.direccion}</td>
                                <td>{val.telefono}</td>

                                <td>
                                    <div className="btn-group" role="group" aria-label="Basic example">
                                        <button onClick={() => {
                                            EditarCliente(val);
                                        }} type="button" className="btn btn-info">Editar</button>
                                        <button onClick={() => {
                                            EliminarCliente(val
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


