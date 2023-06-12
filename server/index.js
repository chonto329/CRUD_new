const mysql = require("mysql");
const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "crud"
});


//// METODO CRUD USUARIOS
//metodo guardar usuarios 
app.post("/crearUsuario", (req, res) => {
    const cedula = req.body.cedula;
    const nombre = req.body.nombre;
    const telefono = req.body.telefono;
    const usuario = req.body.usuario;
    const contraseña = req.body.contraseña;

    db.query("INSERT INTO usuario(cedula,nombre,telefono,usuario,contraseña)  VALUES (?,?,?,?,?)",[cedula, nombre, telefono, usuario, contraseña], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

//metodo listar usuarios
app.get("/listarUsuario", (req, res) => {
    
    db.query("SELECT * FROM usuario", (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

//metodo actualizar usuarios
app.put("/actualizarUsuario", (req, res) => {
    const cedula = req.body.cedula;
    const nombre = req.body.nombre;
    const telefono = req.body.telefono;
    const usuario = req.body.usuario;
    const contraseña = req.body.contraseña;

    db.query("UPDATE usuario SET nombre=?,telefono=?,usuario=?,contraseña=? WHERE cedula=?",[nombre, telefono, usuario, contraseña,cedula], (err, result) => {
        if (err) {
            console.log(err + " no se puede");
        } else {
            res.send(result);
        }
    });
});
//metodo eliminar usuarios
app.delete("/eliminarUsuario/:cedula", (req, res) => {
    const cedula = req.params.cedula;

    db.query("DELETE FROM usuario WHERE cedula=?",cedula, (err, result) => {
        if (err) {
            console.log(err + " no se puede");
        } else {
            res.send(result);
        }
    });
});


//// METODO CRUD PRODUCTOS
//metodo crear productos
app.post("/crearProducto", (req, res) => {
    const codigo_producto = req.body.codigo_producto;
    const nombre = req.body.nombre;
    const descripcion = req.body.descripcion;
    const precio = req.body.precio;
    const codigo_categoria = req.body.codigo_categoria;
    const codigo_proveedor = req.body.codigo_proveedor;

    db.query("INSERT INTO productos(codigo_producto,nombre,descripcion,precio,codigo_categoria,codigo_proveedor)  VALUES (?,?,?,?,?,?)",[codigo_producto, nombre, descripcion, precio, codigo_categoria,codigo_proveedor], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

//metodo listar productos
app.get("/listarProducto", (req, res) => {
    
    db.query("SELECT * FROM productos", (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

//metodo actualizar productos
app.put("/actualizarProducto", (req, res) => {
    const codigo_producto = req.body.codigo_producto;
    const nombre = req.body.nombre;
    const descripcion = req.body.descripcion;
    const precio = req.body.precio;
    const codigo_categoria = req.body.codigo_categoria;
    const 	codigo_proveedor = req.body.	codigo_proveedor;

    db.query("UPDATE productos SET nombre=?,descripcion=?,precio=?,codigo_categoria=?,codigo_proveedor=? WHERE codigo_producto=?",[nombre, descripcion, precio, codigo_categoria,	codigo_proveedor,codigo_producto], (err, result) => {
        if (err) {
            console.log(err + " no se puede");
        } else {
            res.send(result);
        }
    });
});
//metodo eliminar productos
app.delete("/eliminarProducto/:codigo_producto", (req, res) => {
    const codigo_producto = req.params.codigo_producto;

    db.query("DELETE FROM productos WHERE codigo_producto=?",codigo_producto, (err, result) => {
        if (err) {
            console.log(err + " no se puede");
        } else {
            res.send(result);
        }
    });
});

//// METODO CRUD PROVEEDOR
//metodo crear proveedor
app.post("/crearProveedor", (req, res) => {
    const codigo_proveedor = req.body.codigo_proveedor ;
    const nombre = req.body.nombre;
    const telefono = req.body.telefono;
    const email = req.body.email;

    db.query("INSERT INTO proveedor(codigo_proveedor,nombre,telefono,email)  VALUES (?,?,?,?)",[codigo_proveedor , nombre, telefono, email], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

//metodo listar proveedor
app.get("/listarProveedor", (req, res) => {
    
    db.query("SELECT * FROM proveedor", (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

//metodo actualizar proveedor
app.put("/actualizarProveedor", (req, res) => {
    const codigo_proveedor  = req.body.codigo_proveedor ;
    const nombre = req.body.nombre;
    const telefono = req.body.telefono;
    const email = req.body.email;

    db.query("UPDATE proveedor SET nombre=?,telefono=?,email=? WHERE codigo_proveedor =?",[nombre, telefono, email, codigo_proveedor ], (err, result) => {
        if (err) {
            console.log(err + " no se puede");
        } else {
            res.send(result);
        }
    });
});
//metodo eliminar proveedor
app.delete("/eliminarProveedor/:codigo_proveedor ", (req, res) => {
    const codigo_proveedor  = req.params.codigo_proveedor;

    db.query("DELETE FROM proveedor WHERE codigo_proveedor =?",codigo_proveedor , (err, result) => {
        if (err) {
            console.log(err + " no se puede");
        } else {
            res.send(result);
        }
    });
});


//// METODO CRUD CATEGORIA
//metodo crear categoria
app.post("/crearCategoria", (req, res) => {
    const codigo_categoria = req.body.codigo_categoria;
    const nombre = req.body.nombre;

    db.query("INSERT INTO categoria(codigo_categoria,nombre)  VALUES (?,?)",[codigo_categoria, nombre], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

//metodo listar categoria
app.get("/listarCategoria", (req, res) => {
    
    db.query("SELECT * FROM categoria", (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

//metodo actualizar categoria
app.put("/actualizarCategoria", (req, res) => {
    const codigo_categoria = req.body.codigo_categoria;
    const nombre = req.body.nombre;
    
    db.query("UPDATE categoria SET nombre=? WHERE codigo_categoria=?",[nombre,codigo_categoria], (err, result) => {
        if (err) {
            console.log(err + " no se puede");
        } else {
            res.send(result);
        }
    });
});
//metodo eliminar categoria
app.delete("/eliminarCategoria/:codigo_categoria", (req, res) => {
    const codigo_categoria = req.params.codigo_categoria;

    db.query("DELETE FROM categoria WHERE codigo_categoria=?",codigo_categoria, (err, result) => {
        if (err) {
            console.log(err + " no se puede");
        } else {
            res.send(result);
        }
    });
});


//METODOS CRUD CLIENTE
//metodo guardar cliente 
app.post("/crearCliente", (req, res) => {
    const id_cliente = req.body.id_cliente;
    const nombre = req.body.nombre;
    const direccion = req.body.direccion;
    const telefono = req.body.telefono;
    

    db.query("INSERT INTO cliente(id_cliente,nombre,direccion,telefono)  VALUES (?,?,?,?)",[id_cliente, nombre, direccion, telefono], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

//metodo listar cliente
app.get("/listarCliente", (req, res) => {
    
    db.query("SELECT * FROM cliente", (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

//metodo actualizar cliente
app.put("/actualizarCliente", (req, res) => {
    const id_cliente = req.body.id_cliente;
    const nombre = req.body.nombre;
    const direccion = req.body.direccion;
    const telefono = req.body.telefono;

    db.query("UPDATE cliente SET nombre=?, direccion= ?,telefono=? WHERE id_cliente=?",[nombre,direccion,telefono,id_cliente], (err, result) => {
        if (err) {
            console.log(err + " no se puede");
        } else {
            res.send(result);
        }
    });
});
//metodo eliminar cliente
app.delete("/eliminarCliente/:id_cliente", (req, res) => {
    const id_cliente = req.params.id_cliente;

    db.query("DELETE FROM cliente WHERE id_cliente=?",id_cliente, (err, result) => {
        if (err) {
            console.log(err + " no se puede");
        } else {
            res.send(result);
        }
    });
});


//METODOS CRUD VENTA
//metodo guardar venta 
app.post("/crearVenta", (req, res) => {
    const codigo_venta = req.body.codigo_venta;
    const id_producto = req.body.id_producto;
    const codigo_factura = req.body.codigo_factura;
    const cantidad = req.body.cantidad;
    

    db.query("INSERT INTO venta(codigo_venta,id_producto,codigo_factura,cantidad)  VALUES (?,?,?,?)",[codigo_venta, id_producto, codigo_factura, cantidad], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

//metodo listar venta
app.get("/listarVenta", (req, res) => {
    
    db.query("SELECT * FROM venta", (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

//metodo actualizar venta
app.put("/actualizarVenta", (req, res) => {
    const codigo_venta = req.body.codigo_venta;
    const id_producto = req.body.id_producto;
    const codigo_factura = req.body.codigo_factura;
    const cantidad = req.body.cantidad;

    db.query("UPDATE venta SET id_producto=?, codigo_factura= ?,cantidad=? WHERE codigo_venta=?",[id_producto,codigo_factura,cantidad,codigo_venta], (err, result) => {
        if (err) {
            console.log(err + " no se puede");
        } else {
            res.send(result);
        }
    });
});
//metodo eliminar venta
app.delete("/eliminarVenta/:codigo_venta", (req, res) => {
    const codigo_venta = req.params.codigo_venta;

    db.query("DELETE FROM venta WHERE codigo_venta=?",codigo_venta, (err, result) => {
        if (err) {
            console.log(err + " no se puede");
        } else {
            res.send(result);
        }
    });
});


//METODOS CRUD FACTURA
//metodo guardar factura 
app.post("/crearFactura", (req, res) => {
    const codigo_factura = req.body.codigo_factura;
    const fecha = req.body.fecha;
    const id_cliente = req.body.id_cliente;
    
    

    db.query("INSERT INTO factura(codigo_factura,fecha,id_cliente)  VALUES (?,?,?)",[codigo_factura, fecha, id_cliente], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

//metodo listar factura
app.get("/listarFactura", (req, res) => {
    
    db.query("SELECT * FROM factura", (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

//metodo actualizar factura
app.put("/actualizarFactura", (req, res) => {
    const codigo_factura = req.body.codigo_factura;
    const fecha = req.body.fecha;
    const id_cliente = req.body.id_cliente;

    db.query("UPDATE factura SET fecha=?, id_cliente= ? WHERE codigo_factura=?",[fecha,id_cliente,codigo_factura], (err, result) => {
        if (err) {
            console.log(err + " no se puede");
        } else {
            res.send(result);
        }
    });
});
//metodo eliminar factura
app.delete("/eliminarFactura/:codigo_factura", (req, res) => {
    const codigo_factura = req.params.codigo_factura;

    db.query("DELETE FROM factura WHERE codigo_factura=?",codigo_factura, (err, result) => {
        if (err) {
            console.log(err + " no se puede");
        } else {
            res.send(result);
        }
    });
});

app.listen(3001, () => {
    console.log("corriendo en el puerto 3001")
})