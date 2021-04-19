const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Vacancy = mongoose.model('Vacancy', new Schema({
    bandId: { type: Schema.Types.ObjectId, ref: 'User' },
    title: String,
    description: String,
    status: String,
}, {
    timestamps: true,
}))

module.exports = Vacancy