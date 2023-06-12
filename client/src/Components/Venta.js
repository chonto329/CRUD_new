
import { useState } from "react";
import Axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2';


export const Venta = ()=> {

  const [codigo_venta, setCodigo_venta] = useState();
  const [id_producto, setId_producto] = useState("");
  const [codigo_factura, setCodigo_factura] = useState("");
  const [cantidad, setCantidad] = useState("");
  
  const [editar, setEditar] = useState(false);

  const [listaVenta, setListaVenta] = useState([]);

  /*metodo de guardar*/
  const AgregarVenta = () => {
    Axios.post("http://localhost:3001/crearVenta", {
        codigo_venta: codigo_venta,
        id_producto: id_producto,
        codigo_factura :codigo_factura,
        cantidad : cantidad
    }).then(() => {
      ListarVenta();
      limpiar();
      Swal.fire({
        title: "<span>Guardado Exitosa</span>",
        html: "<i>La venta <strong>" + codigo_venta + " </strong> fue guardada con exito</i>",
        icon: "success",
        timer: 2500
      })
    });
  }
  /*metodo de listar*/
  const ListarVenta = () => {
    Axios.get("http://localhost:3001/listarVenta").then((response) => {
      setListaVenta(response.data);
      console.log(response.data);
    });
  }
  /*metodo de editar*/
  const EditarVenta = (val) => {
    setEditar(true);

    setCodigo_venta(val.codigo_venta);
    setId_producto(val.id_producto);
    setCodigo_factura(val.codigo_factura);
    setCantidad(val.cantidad);
  }
  /*metodo de actualizar*/
  const actualizarVenta = () => {
    Axios.put("http://localhost:3001/actualizarVenta", {
        codigo_venta: codigo_venta,
        id_producto: id_producto,
        codigo_factura :codigo_factura,
        cantidad : cantidad
    }).then(() => {
      ListarVenta();
      limpiar();
      Swal.fire({
        title: "<span>Actualizacion Exitosa</span>",
        html: "<i>La venta <strong>" + codigo_venta + "</strong> fue actualizada con exito</i>",
        icon: "success",
        timer: 2500
      })
    });
  }
  //metodo eliminar
  const eliminarVenta = (val) => {

    Swal.fire({
      title: 'Eliminar Registro',
      html: 'Esta seguro de eliminar la venta <strong>' + val.codigo_venta + '</strong>?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, bórralo!'
    }).then((result) => {
      if (result.isConfirmed) {

        Axios.delete(`http://localhost:3001/eliminarVenta/${val.codigo_venta}`,)
          .then(() => {
            ListarVenta();
            limpiar();
          });

        Swal.fire({
          title: 'Eliminacion exitosa',
          html: 'La venta<strong>' + val.codigo_venta + '</strong> fue eliminada correctamente',
          icon: 'success',
          timer: 2500
      })
  }
})


  }
// metodo limpiar cajas de texto
const limpiar = () => {
  setEditar(false);
  setCodigo_venta("");
  setId_producto("");
  setCodigo_factura("");
  setCantidad("");
 
}

ListarVenta();

return (
  <div className='container mt-3'>
    <div className="card text-center">
      <div className="card-header">
        <h4>Registro de Ventas</h4>
      </div>


      <div className="card-body">
        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">Código Venta</span>
          <input onChange={(event) => { setCodigo_venta(event.target.value) }} type="number" className="form-control" value={codigo_venta} placeholder="1020403437" aria-label="codigo" aria-describedby="basic-addon1" />
        </div>

        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">ID producto</span>
          <input onChange={(event) => { setId_producto(event.target.value) }} type="number" className="form-control" value={id_producto} placeholder="10246" aria-label="nombre" aria-describedby="basic-addon1" />
        </div>

        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">Codigo Factura</span>
          <input onChange={(event) => { setCodigo_factura(event.target.value) }} type="number" className="form-control" value={codigo_factura} placeholder="1020403437" aria-label="nombre" aria-describedby="basic-addon1" />
        </div>

        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">Cantidad</span>
          <input onChange={(event) => { setCantidad(event.target.value) }} type="number" className="form-control" value={cantidad} placeholder="24" aria-label="nombre" aria-describedby="basic-addon1" />
        </div>
        


        <div className="card-footer text-body-secondary">

          {
            editar ?
              <div><button className='btn btn-warning ' onClick={actualizarVenta}>Actualizar</button>
                <button className='btn btn-info m-2' onClick={limpiar}>Cancelar</button>
              </div>
              : <button className='btn btn-success' onClick={AgregarVenta}>Guardar</button>
              
          }

        </div>
      </div>
    </div>

    <table className="table table-striped-columns">
      <thead>
        <tr>
          <th scope="col">Código Venta</th>
          <th scope="col">ID producto</th>
          <th scope="col">Código Factura</th>
          <th scope="col">Cantidad</th>
          <th scope="col">Acciones</th>

        </tr>
      </thead>
      <tbody>

        {
          listaVenta.map((val, key) => {
            return <tr key={val.codigo_venta}>
              <th scope="row">{val.codigo_venta}</th>
              <td>{val.id_producto}</td>
              <td>{val.codigo_factura}</td>
              <td>{val.cantidad}</td>
              
              <td>
                <div className="btn-group" role="group" aria-label="Basic example">
                  <button onClick={() => {
                    EditarVenta(val);
                  }} type="button" className="btn btn-info">Editar</button>
                  <button onClick={() => {
                    eliminarVenta(val
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

 
