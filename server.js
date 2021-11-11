import Express from 'express';
import { MongoClient } from 'mongodb';

const stringConexion="mongodb+srv://dmin:Admin2021@proyectociclo3.rjx9p.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
const client = new MongoClient(stringConexion, {useNewUrlParser: true,useUnifiedTopology: true,});

const app = Express()
app.use(Express.json())

app.get('/productos', (req, res) => {
    console.log("Se hizo una llamada a /productos");
    const productos = [
    {id:"001", nombre:"cama", valor:"20.000", estado:"activo",},
    {id:"002", nombre:"mesa", valor:"100.000", estado:"activo",}

];
res.send(productos);
});

app.post('/productos/nuevo', (req, res) => {
    // Acá va el código para crear el producto
    const datosProductos = req.body;
    console.log('llaves: ', Object.keys(datosProductos));
    try {
        
        if (
            Object.keys(datosProductos).includes('id') &&
            Object.keys(datosProductos).includes('nombre') &&
            Object.keys(datosProductos).includes('valor')  &&
            Object.keys(datosProductos).includes('estado')
        ) {
            res.sendStatus(200);
        } else {
            res.sendStatus(500);
        }
    } catch {
        res.sendStatus(500);
     }
    });

    
const main = () => {
    client.connect((err, db) => {
        if (err) {
            console.error('Error al conectar a la BD');
        }
        const conexion = db.db('ciclo3');
        return app.listen(4000, () => {
            console.log('Escuchando en el puerto 4000');
        });
    });

};

main();
