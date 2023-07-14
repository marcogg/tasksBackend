// La dependencia Async Handler nos permite manejar el asincronismo de mis funciones controladoras, pero deben envolver a cada una
const asyncHandler = require('express-async-handler')
const Tarea = require("../models/tareasModel")




// GET TAREAS
const getTareas = asyncHandler( async (req, res) => {

    // si quiro filtar es así:
    // const tareas = await Tarea.find({text:'pizza'})
    
    // Así me busca todas las tareas 
    const tareas = await Tarea.find()
    res.status(200).json({"message": "Get tareas"})
})
const createTareas = asyncHandler(async (req, res) => {
    if (!req.body.descripcion) {
        throw new Error("Por favor teclea una descipción")
        // res.status(404).json({message: "Por favor teclea una descripcion"})
    }

    const tarea = await Tarea.create({
        texto:req.body.texto
    })
res.status(201).json({"message": "Crear tareas"})

})



// UPDATING TASKS
const updateTareas = asyncHandler(async (req, res) => {
    // Primero buscamos la tarea y comprobamos que existe
    const tarea = await Tarea.findById(req.params.id)

    if (!tarea){
        res.status(400)
        throw new Error("Esa tarea no existe")
    }

    // Verifying if the tasks belongs to logged user
    // In next line we evaluate if the user in task belongs to user of token
    if (tarea.user.toString() !== req.user.id){
        res.status(401)
        throw new Error("Forbidden")
    } else {
        // Acá lo actulizo. Le pongo req.body para que actualice todo el contenido
        const tareaUpdated = await Tarea.findByIdAndUpdate(req.params.id, req.body, {new: true})
        res.status(200).json(tareaUpdated)
    }

})



// DELETING TASKS

const deleteTareas = asyncHandler(async (req, res) => {
    const tarea = await Tarea.findById(req.params.id)

    if (!tarea){
        res.status(400)
        throw new Error("Esa tarea no existe")
    }

    // Verifying if the tasks belongs to logged user
    // In next line we evaluate if the user in task belongs to user of token
    if (tarea.user.toString() !== req.user.id){
        res.status(401)
        throw new Error("Forbidden")
    } else {
        // Acá lo actulizo. Le pongo req.body para que actualice todo el contenido
        tarea.deleteOne()
    }


    res.status(200).json({id:req.params.id})
})



// EXPORTS

module.exports = {
    getTareas,
    createTareas,
    updateTareas,
    deleteTareas

}