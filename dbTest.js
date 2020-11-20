const db = require('./models')
    /*
    db.category.findOrCreate({
        where: { name: 'node' }
    }).then(([category, created]) => {
        console.log('cat id', category.id)
        db.project.findOne({
            where: { id: 1 }
        }).then(project => {
            project.addCategory(category);
        })
    })



    db.project.findOne({
            where: { id: 1 },
            include: [db.category]
        }).then(function(project) {
            // by using eager loading, the project model should have a categories key
            console.log('project cats', project.categories)
        })
        let cat = ' my category ';
        db.category.findOrCreate({
            where: {
                name: cat.trim()
            },
            include: [db.project]
        }).then(([category, created]) => {
            db.project.findOne().then(project => {
                project.addCategory(category)
                console.log('new cat', category.projects)
                console.log('cat', category)
            })
        }) */