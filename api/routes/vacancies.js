const express = require("express");
const User = require("../models/User");
const Vacancy = require("../models/Vacancy");
const VacancyApplication = require("../models/VacancyApplication");

const router = express.Router();

/* VACANCY */
router.get("/", async (req, res) => {
    // Vacancy.find()
    // .exec()
    // .then((x) => res.status(200).send(x));

    const vacancies = await Vacancy.find().sort({createdAt: -1}).exec()
    const userIds = vacancies.map(vacancy => vacancy.bandId)
    const users = await User.find({ _id: { $in: userIds }}).exec()

    let vacanciesWithUserList = [] 
    
    vacancies.forEach(x => { 
        const user = users.filter(u => u._id.toString() === x.bandId.toString())[0]

        if (user){
            const vacancyWithUser = {
                _id: x._id,
                bandId: x.bandId,
                title: x.title,
                description: x.description,
                createdAt: x.createdAt,
                updatedAt: x.updatedAt,
                //User attributes
                name: user.name,
                pictureUrl: user.pictureUrl,
            }
            vacanciesWithUserList.push(vacancyWithUser)
        }
    })
    res.status(200).send(vacanciesWithUserList)
});

router.get("/:id", (req, res) => {
    Vacancy.findOne({ _id: req.params.id })
    .exec()
    .then((x) => res.status(200).send(x));
});

router.post("/", (req, res) => {
    Vacancy.create(req.body).then((x) =>
    res.status(200).send(x)
  );
});

router.put("/:id", (req, res) => {
    Vacancy.findByIdAndUpdate(req.params.id, req.body)
    .exec()
    .then(() => res.sendStatus(204));
});

router.delete("/:id", (req, res) => {
    Vacancy.findByIdAndRemove(req.params.id)
    .exec()
    .then(() => res.sendStatus(204));
});

/* VACANCY APPLICATIONS */
router.post("/applications", (req, res) => {
    VacancyApplication.create(req.body).then((x) =>
    res.status(200).send(x)
  );
});

router.get("/applications-by-vacancy/:vacancyId", (req, res) => {
    VacancyApplication.find({ vacancyId: req.params.vacancyId })
    .exec()
    .then((x) => res.status(200).send(x));
});

router.get("/applications/:id", (req, res) => {
    VacancyApplication.findOne({ _id: req.params.id })
    .exec()
    .then((x) => res.status(200).send(x));
});

router.put("/applications/:id", (req, res) => {
    VacancyApplication.findByIdAndUpdate(req.params.id, req.body)
    .exec()
    .then(() => res.sendStatus(204));
});

router.delete("/applications/:id", (req, res) => {
    VacancyApplication.findByIdAndRemove(req.params.id)
    .exec()
    .then((x) => res.status(200).send(x));
});

/* STORAGE */


module.exports = router;
