const express = require('express');
const router = express.Router();
const db = require('../models');

router.get('/', (req, res) => {
    //display all categories
    db.category.findAll().then((categories) => {
        res.render('categories/index', { categories })
    })
})

router.get('/:id', (req, res) => {
    //display all the projects belonging to a single category
    db.category.findOne({
        where: { id: req.params.id },
        include: [db.project]
    }).then(category => {
        res.render('categories/show', { category })
    })

})



module.exports = router;