const { model, Schema } = require('mongoose');

const celebritySchema = Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    occupation: String,
    catchPhrase: String
});

const celebrity = model('celebrity', celebritySchema);

module.exports = celebrity;