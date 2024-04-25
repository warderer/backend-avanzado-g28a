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
  // Objeto de la consulta que se hará a la base de datos
  const queryDb = { isActive: true }

  // Se va a poder filtrar por: title, genre
  const queryKeys = ['title', 'genre', 'publisher']

  // Recorrer el query string para agregar los filtros a la consulta
  // ?title=Harry&genre=Fiction
  queryKeys.forEach(key => {
    if (req.query[key]) {
      queryDb[key] = { $regex: new RegExp(req.query[key], 'i') }
    }
  })

  /*
  Esta línea de código en JavaScript está creando una consulta para una base de datos MongoDB.

  `queryDb[key] = { $regex: new RegExp(req.query[key], 'i') }`

  Aquí está lo que está sucediendo:

  1. `queryDb[key]`: Establece una propiedad en el objeto `queryDb` con el nombre de la clave obtenida de `key`.

  2. `{ $regex: new RegExp(req.query[key], 'i') }`: Esto crea un objeto que MongoDB puede usar para realizar una búsqueda con expresiones regulares. `$regex` es un operador de consulta de MongoDB que permite buscar utilizando expresiones regulares.

  3. `new RegExp(req.query[key], 'i')`: Crea una nueva expresión regular a partir del valor obtenido de `req.query[key]`. El segundo argumento `'i'` es una bandera que hace que la búsqueda sea insensible a mayúsculas y minúsculas.

  En resumen, esta línea de código está preparando una consulta de MongoDB que buscará en la base de datos cualquier valor que coincida con la expresión regular proporcionada, sin tener en cuenta las mayúsculas y minúsculas.
  */

  try {
    const books = await Book.find(queryDb).populate('authors')

    if (!books) {
      return res.status(404).json({ msg: 'Books not found' })
    }

    res.status(200).json(books)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

const getBookById = async (req, res) => {
  // Valido que el ID sea un ObjectID de Mongo válido (24 caracteres alfanuméricos)
  if (!req.params.bookId.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).json({ msg: 'Invalid book ID' })
  }

  try {
    const book = await Book
      .findById({ _id: req.params.bookId, isActive: true })
      .populate('authors')

    if (!book) {
      return res.status(404).json({ msg: 'Book not found' })
    }

    res.status(200).json(book)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

// UPDATE
const updateBookById = async (req, res) => {
  // Valido que el ID sea un ObjectID de Mongo válido (24 caracteres alfanuméricos)
  if (!req.params.bookId.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).json({ msg: 'Invalid book ID' })
  }

  try {
    const book = await Book
      .findByIdAndUpdate(req.params.bookId, req.body, { new: true })
    if (!book) {
      return res.status(404).json({ msg: 'Book not found' })
    }
    res.status(200).json(book)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

// DELETE
const deleteBookById = async (req, res) => {
  // Valido que el ID sea un ObjectID de Mongo válido (24 caracteres alfanuméricos)
  if (!req.params.bookId.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).json({ msg: 'Invalid book ID' })
  }

  // Si el query string destroy es true, borro el libro permanentemente de la base de datos. ?destroy=true
  if (req.query.destroy === 'true') {
    try {
      const book = await Book
        .findByIdAndDelete(req.params.bookId)
      if (!book) {
        return res.status(404).json({ msg: 'Book not found' })
      }
      return res.status(204).json()
    } catch (err) {
      res.status(400).json({ error: err.message })
    }
  }

  // Softdelete: Si el query string destroy no está presente o es false, cambio el campo isActive a false
  try {
    const book = await Book
      .findByIdAndUpdate(req.params.bookId, { isActive: false }, { new: false })
    if (!book || book.isActive === false) {
      return res.status(404).json({ msg: 'Book not found' })
    }
    res.status(204).json()
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

export {
  createBook,
  getAllBooks,
  getBookById,
  updateBookById,
  deleteBookById
}
