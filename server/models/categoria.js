const { Schema, model } = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const categoriaSchema = new Schema({
    descripcion: {
        type: String,
        unique: true,
        required: [true, 'La descripción es obligatoria'],
    },
    usuario: {
            type: Schema.Types.ObjectId,
            ref: 'Usuario'
    }
    
});

categoriaSchema.plugin(uniqueValidator, {
    message: 'Esta categoria ya esta creada.'
});

module.exports = model('Categoria', categoriaSchema);