const mongoose = require('mongoose');

const toplantiSchema = new mongoose.Schema({
    tarih: {
        type: String,
        required: true
    },
    metin: {
        type: String,
        required: false
    },
    kanal: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Toplanti', toplantiSchema);