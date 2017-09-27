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

router.get('/new', (req, res) => {
    const companyId = req.params.companyId
    res.render('boards/new', {
        companyId: companyId
    })
})



router.post('/', (req, res) => {
    const companyId = req.params.companyId
    const newSnowboard = req.body

    CompanyModel.findById(companyId)
        .then((company) => {
            company.snowboards.push(newSnowboard)
            return company.save()
        })
        .then(() => {
            res.redirect(`/companies/${companyId}/snowboards`)
            console.log(companyId)
        })
        .catch((err) => {
            res.send(err);
        })
})


router.get('/:snowboardId/edit', (req, res) => {
    const companyId = req.params.companyId
    const snowboardId = req.params.snowboardId

    CompanyModel.findById(companyId)
        .then((company) => {
            const snowboard = company.snowboards.id(snowboardId)

            res.render('boards/edit', {
                snowboard: snowboard,
                companyId: companyId
            })
        })
})

router.put('/:snowboardId', (req, res) => {
    const companyId = req.params.companyId
    const snowboardId = req.params.snowboardId
    const updatedSnowboard = req.body

    CompanyModel.findById(companyId)
        .then((company) => {
            const snowboard = company.snowboards.id(snowboardId)
            snowboard.name = updatedSnowboard.name
            snowboard.price = updatedSnowboard.price
            return company.save()
        })
        .then(() => {
            res.redirect(`/companies/${companyId}/snowboards/${snowboardId}`)
        })
})

router.get('/:snowboardId', (req, res) => {
    const companyId = req.params.companyId
    const snowboardId = req.params.snowboardId
    CompanyModel.findById(companyId)
        .then((company) => {
            const snowboard = company.snowboards.id(snowboardId)
            console.log(snowboard)
            res.render('boards/show', {
                snowboard: snowboard,
                companyId: companyId
            })
        })
        .catch((err) => {
            res.send(err);
        })
})

router.get('/:snowboardId/delete', (req, res) => {
    const companyId = req.params.companyId
    const snowboardId = req.params.snowboardId
    CompanyModel.findById(companyId)
        .then((company) => {
            const snowboard = company.snowboards.id(snowboardId).remove()
            return company.save()
        })
        .then(() => {
            res.redirect(`/companies/${companyId}/snowboards`)
        })
})
module.exports = router