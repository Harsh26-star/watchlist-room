let media = [{"id": 1, "title": "Inception"},{"id": 2, "title": "Interstellar"}]

const express = require('express')
const app = express();
const port = 3000; 

app.use(express.json())

app.get("/", (req, res) => {
    res.send("Home")
})
app.get("/media", (req, res) => {
    res.json(media) 
})
app.post("/media", (req, res) => {
    const newItem = {id: Date.now(), title: req.body.title}
    media.push(newItem)
    console.log(newItem)
    res.status(201).json(newItem)
})

app.listen(port, () => {
    console.log(`Server running on port 3000`)
})