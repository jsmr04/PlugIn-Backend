const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Event = mongoose.model('Event', new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    title: String,
    datetime: String,
    media: [{ url:String, type:{ type:String } }],
    description: { type: String, require: true },
    location: String,
}, {
    timestamps: true,
}))

module.exports = Event