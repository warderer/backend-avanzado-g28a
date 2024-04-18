import express from 'express'
// import { createCar } from '../controllers/carController.js'
import * as carController from '../controllers/carController.js'

const carRoutes = express.Router()

carRoutes.post('/cars', carController.createCar)
carRoutes.get('/cars', carController.getAllCars)
carRoutes.get('/cars/:carId', carController.getCarById)
carRoutes.patch('/cars/:carId', carController.updateCarById)
carRoutes.delete('/cars/:carId', carController.deleteCarById)

export default carRoutes
