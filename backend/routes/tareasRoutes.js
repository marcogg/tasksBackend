const express = require('express')
const router = express.Router()
const {getTareas,  createTareas, updateTareas, deleteTareas} = require('../controllers/tareaControllers')
const {protect} = require('../middleware/authMiddleware')

// Protegemos la ruta con el protect del middleware
router.route('/').get(protect, getTareas).post(protect, createTareas)
    // Aqui mando la respuesta plain, pero podemos controlar que solo cuando todo esté OK con un status
    // res.send({"message": "Get tareas"})

    // Aqui configurmaos que sea cuando toso esté OK con el status
    // res.status(200).json({"message": "Get tareas"})

// En la siguiente linea cualquier puede consultar las tareas con una URL válida, pero arriba la protegemos
// router.post('/', createTareas)

// Podríamos simplificar así las siguientes lineas en una sola:
// router.route('/:id').delete(deleteTareas).put(updateTareas)

// En la siguiente linea cualquier puede consultar las tareas con una URL válida, pero arriba la protegemos
// router.put('/:id', updateTareas)
// router.delete('/:id', deleteTareas)

// Protegemos la ruta con el protect del middleware
router.route('/:id').delete(protect, deleteTareas).put(protect, deleteTareas)

module.exports = router