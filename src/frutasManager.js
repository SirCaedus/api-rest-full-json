const fs = require("fs")
require('dotenv').config() 

// Función para guardar frutas en el archivo de base de datos
function guardarFrutas(frutas) {
    const datos = JSON.stringify(frutas)
    fs.writeFileSync(__dirname + process.env.DATABASE_PATH, datos)
}

// Función para leer frutas desde el archivo de base de datos
function leerFrutas() {
    const frutasString = fs.readFileSync(__dirname + process.env.DATABASE_PATH, "utf8")
    const frutas = JSON.parse(frutasString)
    return frutas
}

async function modificarFruta(fruta){
    if (!fruta?.id || !fruta?.imagen || !fruta?.nombre || !fruta?.importe || !fruta?.stock) throw new Error("Error: Datos incompletos.")

    let frutas = leerFrutas()
    const index = frutas.findIndex((obj) => obj.id === fruta.id)
    if (index < 0) throw new Error("Error: ID no existe en la base de datos.")
    
    frutas[index] = fruta
    guardarFrutas(frutas)

    return frutas[index]
}

async function borrarFruta(id){
    if(!id) throw new Error("Error: ID indefinido.")
    
    let frutas = leerFrutas()
    const index = frutas.findIndex((obj) => obj.id === id)
    if (index < 0) throw new Error("Error: ID no existe en la base de datos.")

    const fruta = frutas[index]
    frutas.splice(index,1)
    guardarFrutas(frutas)

    return fruta
}

async function encontrarFruta(id){
    if(!id) throw new Error("Error: ID indefinido.")

    const datos = leerFrutas()
    const fruta = datos.find((obj) => obj.id === id)

    if (!fruta) throw new Error("Error: ID no existe en la base de datos.")

    return fruta
}

// Exportar las funciones para ser utilizadas por otros módulos
module.exports = {
    leerFrutas,
    guardarFrutas,
    modificarFruta,
    borrarFruta,
    encontrarFruta,
}