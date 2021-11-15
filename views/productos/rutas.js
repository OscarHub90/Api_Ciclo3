import Express from 'express'
import { queryProductos, crearProducto, editarProducto, eliminarProducto } from '../../controllers/productos/controller.js';
import { getDB } from '../../db/db.js';

const rutasProducto = Express.Router();

const genericCallback = (res) => (err, result) => {
    if (err) {
      res.status(500).send('Error!');
    } else {
        res.json(result);
    }
};

rutasProducto.route('/productos').get((req, res) => {
    console.log("Se hizo una llamada a /productos");
    const responseProductos = queryProductos (genericCallback(res));
});

rutasProducto.route('/productos/nuevo').post((req, res) => {
    crearProducto(req.body, genericCallback(res));
 });

 rutasProducto.route('/productos/editar').patch((req, res) => {
    editarProducto(req.body, genericCallback(res))
 });

 rutasProducto.route('/productos/eliminar').delete((req, res) => {
    eliminarProducto(req.body.id, genericCallback(res));
 });

 export default rutasProducto;