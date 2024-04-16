import express from 'express'
// import { createCar } from '../controllers/carController.js'
import * as carController from '../controllers/carController.js'

const carRoutes = express.Router()

carRoutes.post('/cars', carController.createCar)

export default carRoutes
