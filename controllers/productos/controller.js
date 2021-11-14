import { getDB } from '../../db/db.js';

const queryProductos = async (callback) => {
    const BaseMongo = getDB();
    await BaseMongo.collection('producto').find({}).limit(100).toArray(callback);
};

const crearProducto = async (datosProductos, callback) => {

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
export {queryProductos, crearProducto};