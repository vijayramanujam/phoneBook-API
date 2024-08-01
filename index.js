
const express = require("express")
const app = express()

app.use(express.json())
const PORT = 8000

let persons = [
    // {
    //     "id": "1",
    //     "name": "Arto Hellas",
    //     "number": "040-123456"
    // },
    // {
    //     "id": "2",
    //     "name": "Ada Lovelace",
    //     "number": "39-44-5323523"
    // },
    // {
    //     "id": "3",
    //     "name": "Dan Abramov",
    //     "number": "12-43-234345"
    // },
    // {
    //     "id": "4",
    //     "name": "Mary Poppendieck",
    //     "number": "39-23-6423122"
    // }
]


app.get('/', (req, res) => {

    res.sendFile(__dirname + '/welcome.html')
})

app.get('/api/persons', (req, res) => {

    res.json(persons)
})

app.get('/info', (req, res) => {

    const today = new Date().toString()
    const length = persons.length

    res.send(`<p>Phonebook has info for ${length} people.<br/>${today}</p>`)
})


app.get('/api/persons/:id', (req, res) => {

    const id = req.params.id
    const person = persons.find(person => {

        return person.id === id
    })
    if (person) res.json(person)


    res.sendStatus(404).end()

})


app.delete('/api/persons/:id', (req, res) => {

    const id = req.params.id

    persons = persons.filter(person => {

        return person.id !== id

    })

    res.status(204).end()
})


app.post('/api/persons', (req, res) => {


    const person = req.body
    console.log(person)

    // check for incomplete details
    if (!person.number || !person.name) {
        return res.status(400).json({
            error: 'content missing'
        })
    }

    // Check if number exists
    for (let i of persons) {

        if (i.number === person.number) {
            return res.status(400).json({
                error: 'Number already exists'
            })
        }
    }

    person.id = Math.floor(100000000 + Math.random() * 900000000).toString()
    persons = persons.concat(person)
    res.json(person)
})


// port listening
app.listen(PORT, (req, res) => {

    console.log(`Server is up and running on port: ${PORT}`)
})  