const {Schema, model} = require('mongoose')

const schema = new Schema({

    text: {
        type: String,
        required: true
    },

    author: {
        type: String,
    },
})

module.exports = model('Review', schema)