require('dotenv').config()
const app = require('express')()
const fs = require('fs')
const bodyParser = require('body-parser')
const { join } = require('path')

app.use(bodyParser.json())

app.get('/', (req, res) => {
  fs.readdir(process.env.LOCATION, (err, files) => {
    res.send(files)
  })
})

app.post('/add', (req, res) => {
  console.log(req.body)
  const { filename, text } = req.body

  fs.writeFile(join(process.env.LOCATION, filename), text, err => {
    if (err) return err
    
    res.send('Done')
  })
})

app.listen(process.env.PORT, () => {
  console.log(`Running on port ${process.env.PORT}`)
})