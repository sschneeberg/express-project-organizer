let express = require('express')
let db = require('../models')
let router = express.Router()


function addCat(category, project) {
    return db.category.findOrCreate({
        where: { name: category.trim().toUpperCase() }
    }).then(([cat, created]) => {
        project.addCategory(cat);
    }).catch(error => console.log(error))
}

// POST /projects - create a new project
router.post('/', (req, res) => {
    db.project.create({
            name: req.body.name,
            githubLink: req.body.githubLink,
            deployLink: req.body.deployedLink,
            description: req.body.description
        })
        .then((project) => {
            const categories = req.body.categories.split(',');
            const makeCategories = [];
            for (let i = 0; i < categories.length; i++) {
                if (categories[i] !== '') {
                    makeCategories.push(addCat(categories[i], project));
                }
            }
            Promise.all(makeCategories).then(() => {
                res.redirect('/')
            });
        })
        .catch((error) => {
            console.log(error)
            res.status(400).render('main/404')
        })
})

//POST /projects/:id
router.post('/:id', (req, res) => {
    let id = req.params.id;
    db.project.update({
            name: req.body.name,
            githubLink: req.body.githubLink,
            deployLink: req.body.deployedLink,
            description: req.body.description
        }, {
            where: { id: id }
        }).then(() => {
            db.project.findOne({
                where: { id: id }
            }).then((project) => {
                const categories = req.body.categories.split(',');
                const makeCategories = [];
                for (let i = 0; i < categories.length; i++) {
                    makeCategories.push(addCat(categories[i], project));
                }
                console.log('calls', makeCategories);
                Promise.all(makeCategories).then(() => {
                    res.redirect(`/projects/${id}`)
                })
            }).catch((error) => {
                console.log(error)
                res.status(400).render('main/404')
            })
        })
        .catch((error) => {
            console.log(error)
            res.status(400).render('main/404')
        })
})



// GET /projects/new - display form for creating a new project
router.get('/new', (req, res) => {
    res.render('projects/new')
})

// GET /projects/:id - display a specific project
router.get('/:id', (req, res) => {
    db.project.findOne({
            where: { id: req.params.id },
            include: [db.category]
        })
        .then((project) => {
            if (!project) throw Error()
            res.render('projects/show', { project: project })
        })
        .catch((error) => {
            console.log(error)
            res.status(400).render('main/404')
        })
})

//GET /project/edit
router.get('/:id/edit', (req, res) => {
    let id = req.params.id;
    db.project.findOne({
        where: { id: id }
    }).then((project) => {
        res.render('projects/edit', { project })
    })
})


module.exports = router