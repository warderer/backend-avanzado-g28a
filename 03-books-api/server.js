import { connect } from './config/database.js'
import express from 'express'
import bookRoutes from './routes/bookRoutes.js'

const PORT = process.env.PORT || 3000

connect() // Nos conectamos a la base de datos

const api = express()
api.use(express.json())

// Aqui van las rutas
api.use('/api/v1/books', bookRoutes)

api.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT} 🚀`)
})
