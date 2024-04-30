// #1 importar mongoose
import mongoose from 'mongoose'

// #2 definir el schema
const userSchema = new mongoose.Schema({
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  role: {
    type: String,
    required: true,
    enum: ['ADMIN', 'CUSTOMER'],
    default: 'CUSTOMER'
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, { timestamps: true }) // timestamps: true agrega createdAt y updatedAt

// #3 Crear el modelo y exportarlo
export default mongoose.model('User', userSchema)
