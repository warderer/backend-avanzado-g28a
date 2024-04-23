// #1 importar mongoose
import mongoose from 'mongoose'

const genreEnum = ['Fiction', 'Non-Fiction', 'Poetry', 'Drama', 'Mystery', 'Horror', 'Romance', 'Science Fiction', 'Fantasy', 'Biography', 'Memoir', 'Self-Help', 'Cookbook', 'History', 'Travel', 'Guide', 'Science', 'Art', 'Journal', 'Religion', 'Philosophy', 'Political', 'Children', 'Young Adult', 'Comic', 'Graphic Novel', 'Technical', 'Other']

// #2 definir un esquema
const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  summary: { type: String },
  genre: { type: String, required: true, enum: genreEnum },
  publishDate: { type: Date }, // YYYY-MM-DD
  authors: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Author', required: true }], // ObjectID es un tipo de  dato utilizado por Mongoose para identificar documentos en MongoDb. ref: 'Author' indica que el campo authors se relaciona con el modelo Author
  publisher: { type: String, required: true },
  price: { type: Number, required: true },
  imgUrl: { type: String, required: true },
  isbn: { type: String, required: true },
  isActive: { type: Boolean, default: true }
}, { timestamps: true }) // timestamps: true agrega createdAt y updatedAt

// #3 Crear el modelo y exportarlo
const Book = mongoose.model('Book', bookSchema)
export default Book
