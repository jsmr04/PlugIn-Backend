const express = require("express");
const Vacancy = require("../models/Vacancy");
const VacancyApplication = require("../models/VacancyApplication");

const router = express.Router();

/* VACANCY */
router.get("/", (req, res) => {
    Vacancy.find()
    .exec()
    .then((x) => res.status(200).send(x));
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
