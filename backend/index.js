import express from 'express'
import 'dotenv/config'

const app = express()

app.get('/', (req, res) => {
    res.send("batata")
})

app.listen(process.env.PORT, () => {
    console.log(`Server listening at ${process.env.PORT}`)
})