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

app.get('/usuarios', (req, res) => {
    console.log("Se hizo una llamada a /usuarios");
    BaseMongo
    .collection('usuario')
    .find({})
    .limit(100)
    .toArray((err,result) => {
        if (err){
         res.status(500).send('Error al consultar los usuarios')
        }else {
          res.json(result);
    }
});

});

app.post('/usuarios/nuevo', (req, res) => {
    const datosUsuarios = req.body;
    console.log('llaves: ', Object.keys(datosUsuarios));
    try {
        if (
            Object.keys(datosUsuarios).includes('cedula') &&
            Object.keys(datosUsuarios).includes('nombre') &&
            Object.keys(datosUsuarios).includes('rol')  &&
            Object.keys(datosUsuarios).includes('estado')
        ) {
           BaseMongo.collection('producto').insertOne(datosUsuarios, (err, result) => {
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

 app.patch('/usuarios/editar', (req, res) => {
     const edicion = req.body;
     console.log(edicion);
     const filtro = {_id: new ObjectId (edicion.id)};
     delete edicion.id
     const operacion = {
         $set:edicion
     }
     BaseMongo.collection('usuario').findOneAndUpdate(filtro, operacion, { upsert: true, returOriginal: true}, (err, result) => {
        if (err){
            console.error('Error actualizando el usuario', err);
            res.sendStatus(500);
        }else {
            console.log('Actualizado con éxito')
             res.sendStatus(200);
        }
     });
 });

 app.delete('/usuarios/eliminar', (req, res) => {

     const filtro = {_id: new ObjectId (req.body.id)};
     BaseMongo.collection('usuario').deleteOne(filtro,(err, result)=>{

        if (err){
            console.error('Error eliminando el usuario', err);
            res.sendStatus(500);
        }else {
            console.log('Actualizado con éxito')
             res.sendStatus(200);
        }
     })
 });

const master = () => {
    client.connect((err, db)=>{
        if (err) {
            console.error('Error al conectar a la Base de datos');
        }
        BaseMongo = db.db('usuarios');
        console.log('conexión exitosa!');
        return app.listen(5000, () => {
            console.log('Escuchando en el puerto 5000');
        });
    });

};

master();
