import Express from 'express';
import { MongoClient, ObjectId } from 'mongodb';
import Cors from 'cors';

const stringBaseMongo=
'mongodb+srv://admin:admin2021@bdciclo3.kzs5u.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

const client = new MongoClient(stringBaseMongo, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

let BaseMongo; 
const app = Express()
app.use(Express.json())
app.use(Cors());

app.get('/productos', (req, res) => {
    console.log("Se hizo una llamada a /productos");
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

app.post('/productos/nuevo', (req, res) => {
    const datosProductos = req.body;
    console.log('llaves: ', Object.keys(datosProductos));
    try {
        if (
            Object.keys(datosProductos).includes('codigo') &&
            Object.keys(datosProductos).includes('nombre') &&
            Object.keys(datosProductos).includes('valor')  &&
            Object.keys(datosProductos).includes('estado')
        ) {
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

 app.patch('/productos/editar', (req, res) => {
     const edicion = req.body;
     console.log(edicion);
     const filtro = {_id: new ObjectId (edicion.id)};
     delete edicion.id
     const operacion = {
         $set:edicion
     }
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

 app.delete('/productos/eliminar', (req, res) => {

     const filtro = {_id: new ObjectId (req.body.id)};
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

const main = () => {
    client.connect((err, db)=>{
        if (err) {
            console.error('Error al conectar a la Base de datos');
        }
        BaseMongo = db.db('tienda');
        console.log('conexión exitosa!');
        return app.listen(5000, () => {
            console.log('Escuchando en el puerto 5000');
        });
    });

};

main();
