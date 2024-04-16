// 1. Importo mongoose
import mongoose from 'mongoose'

// 2. Crear el Schema
const carSchema = new mongoose.Schema({
  // campo: tipo de dato || campo: { type: tipo de dato, options }
  plate: { type: String, required: true }, // Placa del auto
  year: { type: Number, required: true }, // Año del auto
  model: { type: String, required: true }, // Modelo del auto
  brand: { type: String, required: true }, // Marca del auto
  version: String, // Versión del auto
  color: {
    type: String,
    required: true,
    enum: ['red', 'blue', 'black', 'white', 'silver', 'gray', 'green', 'yellow', 'orange', 'brown', 'purple', 'pink', 'gold']
  },
  carType: {
    type: String,
    required: true,
    enum: ['sedan', 'hatchback', 'suv', 'coupe', 'convertible', 'pickup', 'van', 'minivan', 'sport', 'luxury', 'hybrid', 'electric', 'wagon', 'compact']
  },
  vin: String, // Número de serie del vehiculo
  newCar: { type: Boolean, default: true }, // Es un auto nuevo?
  isActive: { type: Boolean, default: true } // Está activo?
}, { timestamps: true }) // Timestamps: true agrega createdAt y updatedAt (opcional)

// 3. Crear el modelo y exportarlo
// El modelo se crea siempre en singular (Car) y mongoose lo pluraliza (cars) en la base de datos
const Car = mongoose.model('Car', carSchema)

export default Car
