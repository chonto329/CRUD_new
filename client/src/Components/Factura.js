
import { useState } from "react";
import Axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2';


export const Factura = ()=> {

  const [codigo_factura, setCodigo_factura] = useState();
  const [fecha, setFecha] = useState("");
  const [id_cliente, setId_cliente] = useState("");
  
  const [editar, setEditar] = useState(false);

  const [listaFactura, setListaFactura]= useState([]);

  /*metodo de guardar*/
  const AgregarFactura = () => {
    Axios.post("http://localhost:3001/crearFactura", {
      codigo_factura: codigo_factura,
      fecha: fecha,
      id_cliente : id_cliente
    }).then(() => {
      ListarFactura();
      limpiar();
      Swal.fire({
        title: "<span>Guardado Exitosa</span>",
        html: "<i>La factura <strong>" + codigo_factura + " </strong> fue guardada con exito</i>",
        icon: "success",
        timer: 2500
      })
    });
  }
  /*metodo de listar*/
  const ListarFactura = () => {
    Axios.get("http://localhost:3001/listarFactura").then((response) => {
      setListaFactura(response.data);
      console.log(response.data);
    });
  }
  /*metodo de editar*/
  const EditarFactura = (val) => {
    setEditar(true);

    setCodigo_factura(val.codigo_factura);
    setFecha(val.fecha);
    setId_cliente(val.id_cliente);
  }
  /*metodo de actualizar*/
  const actualizarFactura= () => {
    Axios.put("http://localhost:3001/actualizarFactura", {
      codigo_factura: codigo_factura,
      fecha: fecha,
      id_cliente : id_cliente
    }).then(() => {
    }).then(() => {
      ListarFactura();
      limpiar();
      Swal.fire({
        title: "<span>Actualizacion Exitosa</span>",
        html: "<i>La factura <strong>" + codigo_factura + "</strong> fue actualizada con exito</i>",
        icon: "success",
        timer: 2500
      })
    });
  }
  //metodo eliminar
  const EliminarFactura = (val) => {

    Swal.fire({
      title: 'Eliminar Registro',
      html: 'Esta seguro de eliminar la factura <strong>' + val.codigo_factura + '</strong>?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, bórralo!'
    }).then((result) => {
      if (result.isConfirmed) {

        Axios.delete(`http://localhost:3001/eliminarFactura/${val.codigo_factura}`,)
          .then(() => {
            ListarFactura();
            limpiar();
          });

        Swal.fire({
          title: 'Eliminacion exitosa',
          html: 'La factura<strong>' + val.codigo_factura + '</strong> fue eliminada correctamente',
          icon: 'success',
          timer: 2500
      })
  }
})


  }
// metodo limpiar cajas de texto
const limpiar = () => {
  setEditar(false);
  setCodigo_factura("");
  setFecha("");
  setId_cliente("");
 
}

ListarFactura();

return (
  <div className='container mt-3'>
    <div className="card text-center">
      <div className="card-header">
        <h4>Registro de Categorias</h4>
      </div>


      <div className="card-body">
        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">Código Factura</span>
          <input onChange={(event) => { setCodigo_factura(event.target.value) }} type="number" className="form-control" value={codigo_factura} placeholder="13572" aria-label="codigo" aria-describedby="basic-addon1" />
        </div>

        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">Fecha</span>
          <input onChange={(event) => { setFecha(event.target.value) }} type="date" className="form-control" value={fecha} placeholder="Lacteos" aria-label="fecha" aria-describedby="basic-addon1" />
        </div>

        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">ID cliente</span>
          <input onChange={(event) => { setId_cliente(event.target.value) }} type="number" className="form-control" value={id_cliente} placeholder="1043155442" aria-label="codigo" aria-describedby="basic-addon1" />
        </div>


        <div className="card-footer text-body-secondary">

          {
            editar ?
              <div><button className='btn btn-warning ' onClick={actualizarFactura}>Actualizar</button>
                <button className='btn btn-info m-2' onClick={limpiar}>Cancelar</button>
              </div>
              : <button className='btn btn-success' onClick={AgregarFactura}>Guardar</button>
              
          }

        </div>
      </div>
    </div>

    <table className="table table-striped-columns">
      <thead>
        <tr>
          <th scope="col">Código Factura</th>
          <th scope="col">fecha</th>
          <th scope="col">ID Cliente</th>
          <th scope="col">Acciones</th>

        </tr>
      </thead>
      <tbody>

        {
          listaFactura.map((val, key) => {
            return <tr key={val.codigo_factura}>
              <th scope="row">{val.codigo_factura}</th>
              <td>{val.fecha}</td>
              <td>{val.id_cliente}</td>
              <td>
                <div className="btn-group" role="group" aria-label="Basic example">
                  <button onClick={() => {
                    EditarFactura(val);
                  }} type="button" className="btn btn-info">Editar</button>
                  <button onClick={() => {
                    EliminarFactura(val);
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

 
