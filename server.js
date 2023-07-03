require("dotenv").config()

const express = require("express")
const app = express()
const { leerFrutas, guardarFrutas, modificarFruta, borrarFruta, encontrarFruta } = require("./src/frutasManager")
const PORT = process.env.PORT || 3000
let BD = []


app.use(express.json());

app.use((req, res, next) => {
    BD = leerFrutas()
    next() // Pasar al siguiente middleware o ruta
})

// Ruta principal que devuelve los datos de las frutas
app.get("/", (req, res) => {
    res.send(BD)
})

// Ruta para agregar una nueva fruta al arreglo y guardar los cambios
app.post("/post", (req, res) => {
    const nuevaFruta = req.body
    BD.push(nuevaFruta)
    guardarFrutas(BD)
    res.status(201).send("Fruta agregada!")
})

app.get("/get/fruta/:id", (req,res) => {
    const id = req.params.id

    encontrarFruta(Number(id)) 
        .then((fruta) => res.status(200).send(fruta))
        .catch((error) => res.status(400).send(error.message))
})

app.put("/put/fruta/:id", (req,res) => {
    let id = parseInt(req.params.id)
    const {imagen, nombre, importe, stock} = req.body

    modificarFruta({id, imagen, nombre, importe, stock})
        .then((fruta) => res.status(200).send(fruta))
        .catch((error) => res.status(400).send(error.message))
})

app.delete("/delete/fruta/:id", (req,res) => {
    const id = req.params.id

    borrarFruta(Number(id))
        .then((fruta) => res.status(200).send(fruta))
        .catch((error) => res.status(400).send(error.message))
})

// Ruta para manejar las solicitudes a rutas no existentes
app.get("*", (req, res) => {
    res.status(404).send("Lo sentimos, la página que buscas no existe.")
})

// Iniciar el servidor y escuchar en el puerto especificado
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`)
})