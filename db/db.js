import { MongoClient} from 'mongodb';
import dotenv from 'dotenv';

dotenv.config({ path: './.env'})
const stringBaseMongo= process.env.DATABASE_URL;

const client = new MongoClient(stringBaseMongo, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

let BaseMongo; 

const conectarBD = (callback) => {
    client.connect((err, db)=>{
        if (err) {
            console.error('Error al conectar a la Base de datos');
            return 'error';
        }
        BaseMongo = db.db('tienda');
        console.log('conexión exitosa!');
        return callback();
    });
};

const getDB = () => {
    return BaseMongo;
}
export { conectarBD, getDB };