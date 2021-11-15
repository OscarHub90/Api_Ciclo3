import { ObjectId } from 'mongodb';
import { getDB } from '../../db/db.js';

const queryProductos = async (callback) => {
    const BaseMongo = getDB();
    await BaseMongo.collection('producto').find().limit(100).toArray(callback);
};

const crearProducto = async (datosProductos, callback) => {
  const baseDeDatos = getDB();
  console.log('llaves: ', Object.keys(datosProductos));
        if (
            Object.keys(datosProductos).includes('codigo') &&
            Object.keys(datosProductos).includes('nombre') &&
            Object.keys(datosProductos).includes('valor')  &&
            Object.keys(datosProductos).includes('estado')
        ) {
           const BaseMongo = getDB();
           BaseMongo.collection('producto').insertOne(datosProductos, callback)
        } else {
            return 'error';
        }
};

const editarProducto = async (edicion, callback) => {
    const filtroProducto = { _id: new ObjectId(edicion.id) };
    delete edicion.id;
    const operacion = {
      $set: edicion,
    };
    const BaseMongo = getDB();
    await BaseMongo
      .collection('producto')
      .findOneAndUpdate(filtroProducto, operacion, { upsert: true, returnOriginal: true }, callback);
  };

const eliminarProducto = async (id, callback) => {
    const filtroProducto = { _id: new ObjectId(id) };
    const baseDeDatos = getDB();
    await baseDeDatos.collection('producto').deleteOne(filtroProducto, callback);
  };
export {queryProductos, crearProducto, editarProducto, eliminarProducto};