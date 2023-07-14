const express = require('express')
const router = express.Router()
const {getTareas,  createTareas, updateTareas, deleteTareas} = require('../controllers/tareaControllers')
const {protect} = require('../middleware/authMiddleware')

router.get('/', getTareas)
    // Aqui mando la respuesta plain, pero podemos controlar que solo cuando todo esté OK con un status
    // res.send({"message": "Get tareas"})

    // Aqui configurmaos que sea cuando toso esté OK con el status
    // res.status(200).json({"message": "Get tareas"})

router.post('/', createTareas)

// Podríamos simplificar así las siguientes lineas en una sola:
// router.route('/:id').delete(deleteTareas).put(updateTareas)

router.put('/:id', updateTareas)

router.delete('/:id', deleteTareas)

module.exports = router