import express from 'express'
import { createBook, getAllBooks, getBookById } from '../controllers/bookController.js'

const bookRoutes = express.Router()

bookRoutes.post('/', createBook)
bookRoutes.get('/', getAllBooks)
bookRoutes.get('/:bookId', getBookById)

export default bookRoutes
