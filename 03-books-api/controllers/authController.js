import User from '../models/User.js'
import bcrypt from 'bcrypt'
import jwt from 'jwt-simple'

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

const login = async (req, res) => {
  try {
    // Valido que el body contenga los campos email y password
    if (!req.body.email || !req.body.password) {
      return res.status(400).json({ message: 'Email or password are required' })
    }

    // Buscamos el usuario en la base de datos
    const user = await User.findOne({ email: req.body.email })

    // Si no existe el usuario en la base de datos, marca error
    if (!user) {
      return res.status(400).json({ message: 'User or password error' })
    }

    // Si el usuario si existe, comparamos la contraseña en texto plano con la contraseña hasheada con bcrypt
    const isPasswordValid = await bcrypt.compare(
      req.body.password, // contraseña enviada por el usuario
      user.password // contraseña hasheada en la base de datos
    ) // devuelve true o false

    // Si la contraseña no coincide: 401 Unauthorized
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'User or password error' })
    }

    // Si la contraseña es valida, entonces creamos un jwt (token) con la libreria jwt-simple

    // info del payload del token
    const payload = {
      id: user._id,
      email: user.email,
      role: user.role,
      iat: Math.floor(Date.now() / 1000), // fecha de creacion del token
      exp: Math.floor(Date.now() / 1000 + (60 * 60 * 24 * 7)) // convertir a segundos y sumar 7 dias
    }

    // genero el token
    const token = jwt.encode(payload, process.env.SECRET)

    // regreso el token
    return res.status(200).json({
      msg: 'Login success',
      token
    })
  } catch (error) {
    return res.status(400).json({ message: `incorrect login data: ${error.message}` })
  }
}

export { register, login }
