const express = require("express")
const router = express.Router({ mergeParams: true })
const Schema = require('../db/Schema.js')
const CompanyModel = Schema.CompanyModel

router.get('/', (req, res) => {
    const companyId = req.params.companyId
    CompanyModel.findById(companyId)
        .then((company) => {
            res.render('boards/index', {
                company
            })
        })
        .catch((err) => {
            res.send(err);
        })
})


module.exports = router