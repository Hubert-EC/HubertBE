const express = require('express')
const  connectDb  = require('./common/connectDb')
const app = express()
const {PORT} = require('./common/config')

connectDb()

app.listen(PORT, () => console.log(`Listen on port ${PORT}`))