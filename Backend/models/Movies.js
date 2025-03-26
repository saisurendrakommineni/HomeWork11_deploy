const mongoose = require('mongoose')

const movieSchema = new mongoose.Schema({
    name: { type: String, required: true },
    actor: { type: String, required: true },
    director: { type: String, required: true },
    gross: { type: String, required: true },
    yearreleased: { type: Number, required: true },
})

const Movies = mongoose.model('Movies', movieSchema);
module.exports = Movies;
