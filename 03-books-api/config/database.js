import dotenv from 'dotenv'
import mongoose from 'mongoose'

dotenv.config() // Leo las variables de entorno

const connect = () => {
  mongoose.connect(process.env.DB_CONNECT_URI) // Nos conectamos a la base de datos

  const { connection } = mongoose // Traemos la conexión de mongoose para ver si hay errores

  connection.once('open', () => {
    console.log('✅ Database connection stablished')
  })

  connection.on('error', (error) => {
    console.error('❌ Database connection error:', error)
  })
}

export { connect }
