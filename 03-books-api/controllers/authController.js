import User from '../models/User.js'
import bcrypt from 'bcrypt'

const register = async (req, res) => {
// valido que el body contenga los campos email y password
  try {
    if (!req.body.email || !req.body.password) {
      return res.status(400).json({ message: 'Email or password are required' })
    }
    // encriptar la contraseña
    const saltRounds = 10

    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds)

    // Reemplazamos la contraseña en texto plano por la contraseña hasheada
    req.body.password = hashedPassword

    // Creamos el usuario en la base de datos
    const newUser = await User.create(req.body)

    // Eliminar la contraseña del objeto de respuesta por seguridad. Mongoose ignora todas las propiedades que tienen el valor undefined.
    newUser.password = undefined

    return res.status(201).json({
      msg: 'User created successfully',
      user: newUser
    })
  } catch (error) {
    return res.status(400).json({ message: `error creating user: ${error.message}` })
  }
}

export { register }
