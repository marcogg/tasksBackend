const mongoose = require('mongoose')

const tareaSchema = mongoose.Schema({
    // Here we assign the reference for the Suser Schema
    user:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref:'User'
    },
    texto: {
        type: String,
        required: [true, 'Teclea una descripción'],
    }
},{
    timestamps: true,
})
// EN mi DB en mongo por defecto lo pone en minúscula y busca el plural de la palabra!! para añadir en esa collection
module.exports = mongoose.model('Tarea', tareaSchema)