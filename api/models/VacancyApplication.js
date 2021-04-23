const mongoose = require('mongoose')
const Schema = mongoose.Schema

const VacancyApplication = mongoose.model('VacancyApplication', new Schema({
    vacancyId: { type: Schema.Types.ObjectId, ref: 'Vacancy' },
    applicantId: { type: Schema.Types.ObjectId, ref: 'User' },
    bandId: { type: Schema.Types.ObjectId, ref: 'User' },
    title: String,
    status: String,
    description: String,
    attachments: [{name:String, url:String}],
}, {
    timestamps: true,
}))

module.exports = VacancyApplication
