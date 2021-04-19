const mongoose = require('mongoose')
const Schema = mongoose.Schema

const User = mongoose.model('User', new Schema({
    username: { type: String, require: true },
    password: { type: String, require: true },
    salt: { type: String, require: true },
    role: { type: String, default: 'fan' },
    name: String,
    title: String,
    address: String,
    status: String,
    pictureUrl: String,
    skills: [{name: String}], 
    instruments: [{name: String}],
    genres:	[{name: String}],
    about: String,
}, {
    timestamps: true,
}))

module.exports = User