import express from 'express'
// import { createCar } from '../controllers/carController.js'
import * as carController from '../controllers/carController.js'

const carRoutes = express.Router()

carRoutes.post('/cars', carController.createCar)
carRoutes.get('/cars', carController.getAllCars)
carRoutes.get('/cars/:carId', carController.getCarById)

export default carRoutes
