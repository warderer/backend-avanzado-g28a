import express from 'express'
import { createBook } from '../controllers/bookController.js'

const bookRoutes = express.Router()

bookRoutes.post('/', createBook)

export default bookRoutes
