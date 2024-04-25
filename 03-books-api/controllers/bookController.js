// Importo mis modelos para trabajar con ellos
import Book from '../models/Book.js'
import Author from '../models/Author.js'

// CREATE
const createBook = async (req, res) => {
  try {
    const bookData = req.body

    // Validar que los datos del libro estén completos
    if (!bookData.authors) {
      return res.status(400).json({ msg: 'Authors data is missing' })
    }

    if (!bookData) {
      return res.status(400).json({ msg: 'Book data is missing' })
    }

    if (!Array.isArray(bookData.authors)) {
      return res.status(400).json({ msg: 'Authors data should be an array' })
    }

    // Crear a los autores uno por uno y esperar a que todo se guarden en la base de datos
    const authorModels = await Promise.all(bookData.authors.map(async author => {
      // Buscar si el autor ya existe
      const existingAuthor = await Author.findOne({ firstName: author.firstName, lastName: author.lastName, birthDate: author.birthDate })

      // Si el autor ya existe, devolverlo
      if (existingAuthor) {
        return existingAuthor
      }

      // Si el autor no existe, crearlo
      const newAuthor = new Author(author)
      return await Author.create(newAuthor)
    }))

    // Como ya se guardaron los autores, tengo que obtener los IDS de ellos para asignarlos al libro en cuestión
    bookData.authors = authorModels.map(author => author.id)

    // Creamos el libro
    const newBook = await Book.create(bookData)
    res.status(201).json(newBook)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

// READ
const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find({ isActive: true }).populate('authors')

    if (!books) {
      return res.status(404).json({ msg: 'Books not found' })
    }

    res.status(200).json(books)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

// UPDATE

// DELETE

export { createBook, getAllBooks }
