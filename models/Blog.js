const {Schema, model} = require('mongoose')

const schema = new Schema({

    title: {
        type: String,
        required: true
    },

    text: {
        type: String,
        required: true
    },

    author: {
        type: String,
    },
})

module.exports = model('Blog', schema)