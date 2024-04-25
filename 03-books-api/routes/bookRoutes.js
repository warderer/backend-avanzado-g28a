import express from 'express'
import { createBook, deleteBookById, getAllBooks, getBookById, updateBookById } from '../controllers/bookController.js'

const bookRoutes = express.Router()

bookRoutes.post('/', createBook)
bookRoutes.get('/', getAllBooks)
bookRoutes.get('/:bookId', getBookById)
bookRoutes.patch('/:bookId', updateBookById)
bookRoutes.delete('/:bookId', deleteBookById)

export default bookRoutes
