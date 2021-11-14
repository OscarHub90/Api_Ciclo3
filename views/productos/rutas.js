import Express from 'express'
import { queryProductos, crearProducto } from '../../controllers/productos/controller.js';
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
     const edicion = req.body;
     console.log(edicion);
     const filtro = {_id: new ObjectId (edicion.id)};
     delete edicion.id
     const operacion = {
         $set:edicion
     }
     const BaseMongo = getDB();
     BaseMongo.collection('producto').findOneAndUpdate(filtro, operacion, { upsert: true, returOriginal: true}, (err, result) => {
        if (err){
            console.error('Error actualizando el producto', err);
            res.sendStatus(500);
        }else {
            console.log('Actualizado con éxito')
             res.sendStatus(200);
        }
     });
 });

 rutasProducto.route('/productos/eliminar').delete((req, res) => {

     const filtro = {_id: new ObjectId (req.body.id)};
     const BaseMongo = getDB();
     BaseMongo.collection('producto').deleteOne(filtro,(err, result)=>{

        if (err){
            console.error('Error eliminando el producto', err);
            res.sendStatus(500);
        }else {
            console.log('Actualizado con éxito')
             res.sendStatus(200);
        }
     })
 });

 export default rutasProducto;