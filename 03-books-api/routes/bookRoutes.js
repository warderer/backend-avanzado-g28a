import express from 'express'
import { createBook, getAllBooks } from '../controllers/bookController.js'

const bookRoutes = express.Router()

bookRoutes.post('/', createBook)
bookRoutes.get('/', getAllBooks)

export default bookRoutes
