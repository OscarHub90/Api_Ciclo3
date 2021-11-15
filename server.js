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
           BaseMongo.collection('usuario').insertOne(datosUsuarios, (err, result) => {
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

 app.get('/ventas', (req, res) => {
    console.log("Se hizo una llamada a /ventas");
    BaseMongo
    .collection('ventas')
    .find({})
    .limit(100)
    .toArray((err,result) => {
        if (err){
         res.status(500).send('Error al consultar las ventas')
        }else {
          res.json(result);
    }
});

});

app.post('/ventas/nueva', (req, res) => {
    const datosVentas = req.body;
    console.log('llaves: ', Object.keys(datosVentas));
    try {
        if (
            Object.keys(datosVentas).includes('vendedor') &&
            Object.keys(datosVentas).includes('producto') &&
            Object.keys(datosVentas).includes('cantidad')  &&
            Object.keys(datosVentas).includes('precio')
        ) {
           BaseMongo.collection('ventas').insertOne(datosVentas, (err, result) => {
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

app.patch('/ventas/editar', (req, res) => {
    const edicion = req.body;
    console.log(edicion);
    const filtro = {_id: new ObjectId (edicion.id)};
    delete edicion.id
    const operacion = {
        $set:edicion
    }
    BaseMongo.collection('ventas').findOneAndUpdate(filtro, operacion, { upsert: true, returOriginal: true}, (err, result) => {
       if (err){
           console.error('Error actualizando La venta', err);
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


app.delete('/ventas/eliminar', (req, res) => {

    const filtro = {_id: new ObjectId (req.body.id)};
    BaseMongo.collection('ventas').deleteOne(filtro,(err, result)=>{

       if (err){
           console.error('Error eliminando la venta', err);
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
