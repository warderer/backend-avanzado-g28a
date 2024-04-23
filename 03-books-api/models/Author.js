// #1 importar mongoose
import mongoose from 'mongoose'

// #2 definir un esquema
const authorSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  bio: { type: String },
  birthDate: { type: Date }, // YYYY-MM-DD
  isActive: { type: Boolean, default: true }
}, { timestamps: true }) // timestamps: true agrega createdAt y updatedAt

// #3 Crear el modelo y exportarlo
const Author = mongoose.model('Author', authorSchema)

export default Author
