import express from 'express'

const PORT = process.env.PORT || 3000

const api = express()
api.use(express.json())

// Aqui van las rutas

api.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT} 🚀`)
})
