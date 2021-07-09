const {Schema, model} = require('mongoose')

const schema = new Schema({

    author: {
        type: String,
        required: true
    },

    title: {
        type: String,
        required: true
    },

    date: {
        type: String
    },

    duration: {
        type: String
    }
})

module.exports = model('Music', schema)