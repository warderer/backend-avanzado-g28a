import Car from '../models/Car.js'

// Create
const createCar = async (req, res) => {
  if (!req.body.plate || !req.body.year || !req.body.model || !req.body.brand || !req.body.color || !req.body.carType) {
    return res.status(400).json({ msg: 'Missing required fields' })
  }

  try {
    const newCar = await Car.create(req.body)
    res.status(201).json(newCar)
  } catch (error) {
    res.status(400).json({ msg: 'Error Creating Car', error })
  }
}

// Read

// - Get all cars
const getAllCars = async (req, res) => {
  try {
    const cars = await Car.find({ isActive: true })
    res.status(200).json(cars)
  } catch (error) {
    res.status(400).json({ msg: 'Error Getting Cars', error })
  }
}

// - Get car by id
const getCarById = async (req, res) => {
  try {
    const car = await Car.find({ _id: req.params.carId, isActive: true })
    res.status(200).json(car)
  } catch (error) {
    res.status(400).json({ msg: 'Error Getting Car', error })
  }
}

// Update
const updateCarById = async (req, res) => {
  if (Object.keys(req.body).length === 0) return res.status(400).json({ msg: 'No data to update (empty body)' })
  // Para actualizar, normalmente comprobamos si el carro existe (findById) y luego lo actualizamos (update).
  // Pero en este caso, usaremos el método findByIdAndUpdate que hace ambas cosas.
  // Mandamos el id del carro a actualizar (req.params.carId), los datos a actualizar (req.body) y un objeto con la opción { new: true } para que nos devuelva el carro actualizado y no el carro antes de actualizar.

  try {
    const updatedCar = await Car.findByIdAndUpdate(req.params.carId, req.body, { new: true })
    res.status(200).json(updatedCar)
  } catch (error) {
    res.status(400).json({ msg: 'Error Updating Car', error })
  }
}

// Delete
const deleteCarById = async (req, res) => {
  if (!req.params.carId) return res.status(400).json({ msg: 'Missing carId' })

  // Si el query string destroy es true, eliminamos el carro fisicamente de la base de datos.
  if (req.query.destroy === 'true') {
    try {
      const deletedCar = await Car.findByIdAndDelete(req.params.carId)
      if (deletedCar === null) return res.status(404).json({ msg: 'Delete: Car not found' })
      return res.status(204).json() // No content
    } catch (error) {
      return res.status(400).json({ msg: 'Error Deleting Car', error })
    }
  }

  // Si el query string destroy es false o no se envía, actualizamos el campo isActive a false.
  try {
    const updateCar = await Car
      .findByIdAndUpdate(req.params.carId, { isActive: false }, { new: true })
    if (updateCar === null) return res.status(404).json({ msg: 'Delete: Car not found' })
    return res.status(204).json() // No content
  } catch (error) {
    return res.status(400).json({ msg: 'Error Deleting Car', error })
  }
}

export {
  createCar,
  getAllCars,
  getCarById,
  updateCarById,
  deleteCarById
}
