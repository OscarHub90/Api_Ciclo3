import Express from 'express';
import dotenv from 'dotenv';
import Cors from 'cors';
import { conectarBD, getDB } from './db/db.js';
import rutasProducto from './views/productos/rutas.js';

dotenv.config({ path: './.env'})

const app = Express()
app.use(Express.json())
app.use(Cors());
app.use(rutasProducto);

const main = () => {
    app.listen(process.env.PORT, () => {
        console.log(`Escuchando en el puerto ${process.env.PORT}`);
    });
};

conectarBD(main);
