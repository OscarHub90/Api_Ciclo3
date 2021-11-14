import Express from 'express'
import { conectarBD, getDB } from '../../db/db.js';

const rutasProducto = Express.Router();

rutasProducto.route('/productos').get((req, res) => {
    console.log("Se hizo una llamada a /productos");
    const BaseMongo = getDB();
    BaseMongo
    .collection('producto')
    .find({})
    .limit(100)
    .toArray((err,result) => {
        if (err){
         res.status(500).send('Error al consultar los productos')
        }else {
          res.json(result);
    }
});

});

rutasProducto.route('/productos/nuevo').post((req, res) => {
    const datosProductos = req.body;
    console.log('llaves: ', Object.keys(datosProductos));
    try {
        if (
            Object.keys(datosProductos).includes('codigo') &&
            Object.keys(datosProductos).includes('nombre') &&
            Object.keys(datosProductos).includes('valor')  &&
            Object.keys(datosProductos).includes('estado')
        ) {
            const BaseMongo = getDB();
           BaseMongo.collection('producto').insertOne(datosProductos, (err, result) => {
                if (err){
                    console.error(err);
                    res.sendStatus(500);
                }else {
                    console.log(result)
                     res.sendStatus(200);
                }
            });

        } else {
            res.sendStatus(500);
        }
    } catch {
        res.sendStatus(500);
     }
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