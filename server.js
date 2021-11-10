import Express from "express";

const app = Express()

app.get('/productos', (req, res) => {
    console.log("Se gizo una llamadaaaa")
    res.send("<h1>HOLA PUESSS</h1>")
});

app.listen(4000, () => {
    console.log('Escuchando en el puerto 4000')
});