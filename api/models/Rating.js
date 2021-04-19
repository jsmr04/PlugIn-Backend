const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Rating = mongoose.model('Rating', new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    rate: Number,
    comment: String,
    ratedBy: { type: Schema.Types.ObjectId, ref: 'User' },
}, {
    timestamps: true,
}))

module.exports = Rating