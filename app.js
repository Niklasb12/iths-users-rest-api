const express = require('express')
const Datastore = require('nedb-promise')

const users = new Datastore({ filename: 'users.db', autoload: true })

const app = express()

// const usersList = require('./users.json')

// users.insert(usersList.results, function(err, newDoc) {});

app.use(express.json())

app.get('/users', async(req, res) => {
    const responseJSON = await users.find({})
    res.json({ "responseJSON": responseJSON })
        // let responseBody = JSON.stringify(responseJSON)
        // res.set("Content-Type", "application/json")
        // res.send(responseBody)


})

app.get('/users/:id', async(req, res) => {
    const result = await users.findOne({ _id: req.params.id }) // Hämtar den användaren som jag skriver in i url:en med ett id.
    res.json({ "result": result })
})

app.post('/users', async(req, res) => {
    const newUsers = {
        name: {
            title: req.body.title,
            first: req.body.first,
            last: req.body.last,
        },
        email: req.body.email,
        nat: req.body.nat
    }
    const result = await users.insert(newUsers)
    res.json({ "result": result })
})

//     app.patch('/users/:id', (req, res) => {
//         const newUsers = {
//             name: {
//                 title: req.body.title,
//                 first: req.body.first,
//                 last: req.body.last,
//             },
//             email: req.body.email,
//             nat: req.body.nat
//         }

//         users.update({ _id: req.params.id }, { $set: { "name.title": req.body.title, "name.first": req.body.first, "name.last": req.body.last, email: req.body.email, nat: req.body.nat } }, function(err, docs) {

//         })
//     })

//     app.delete('/users/:id', (req, res) => {
//         users.remove({ _id: req.params.id }, function(err, docs) {

//         })
//     })


function startServer() {
    console.log("Server started")
}

app.listen(8080, startServer)