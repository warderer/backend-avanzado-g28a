import { connect } from './config/database.js'
import express from 'express'

const PORT = process.env.PORT || 3000

connect()

const api = express()
api.use(express.json())

// Aqui van las rutas

api.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT} 🚀`)
})
