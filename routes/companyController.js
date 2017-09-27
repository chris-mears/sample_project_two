const express = require("express")
const router = express.Router()

const Schema = require('../db/Schema.js')
const CompanyModel = Schema.CompanyModel

router.get("/", (req, res) => {
    CompanyModel.find({})
        .then((companies) => {
            res.render('companies/index', {
                companies
            })
        })
        .catch((err) => {
            res.send(err);
        })
})

module.exports = router