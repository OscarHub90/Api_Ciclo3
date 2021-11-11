import Express from "express";

const app = Express()

app.get('/productos', (req, res) => {
    console.log("Se hizo una llamadaaaa");
    const productos = [
    {id:"001", nombre:"cama", valor:"20.000", estado:"activo",};
]
res.send(productos);
});

app.post('/producto/nuevo', (req, res) => {
    res.send('Ok, Vehículo creado');
});

app.listen(4000, () => {
    console.log('Escuchando en el puerto 4000')
});