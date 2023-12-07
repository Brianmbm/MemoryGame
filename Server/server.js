const express = require('express')
const fs = require('fs')
const cors = require('cors')//Was getting errors. library to be able to read and write from other domains/ports

const app = express()
const port = 4000
app.use(cors())
app.listen(port, () => {console.log(`Server running: ${port}`)});
app.use(express.json())

app.post('/highscores', (req, res) => {
    const { score } = req.body
    const existingHighScores = readHighScores();
    existingHighScores.push({ score, date: new Date().toISOString() })
    writeHighScores(existingHighScores);
    res.json({ success: true })})

app.get('/highscores', (req, res) => {
    const highScores = readHighScores()
    res.json(highScores);})


function readHighScores() {
    try {
        const highscores = fs.readFileSync('highscores.json', 'utf8')
        return JSON.parse(highscores);
    } catch (err) {
        console.error('Server writing error:', err.message);
        return []
    }}

function writeHighScores(highscores) {
    try {
        fs.writeFileSync('highscores.json', JSON.stringify(highscores, null, 2), 'utf8')
    } catch (err) {
        console.error('Server writing error:', err.message)
    }}

