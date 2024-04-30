import jwt from 'jwt-simple'

const isAuth = (req, res, next) => {
  // Obtener el encabezado Authorization: Bearer <token>
  const authHeader = req.headers.authorization

  // Valido que si venga el encabezado Authorization
  if (!authHeader) {
    return res.status(404).json({ message: 'Authorization header is required' })
  }

  // Dividir el encabezado de Authorization en un arreglo, separados por el espacio. El token es el segundo elemento del arreglo.
  const [bearer, token] = authHeader.split(' ') // String a Arreglo: ['Bearer', 'token']

  // Verificar que la primera palabra sea "Bearer"
  if (bearer !== 'Bearer') {
    return res.status(400).json({ message: 'Authorizacion header format is Bearer {token}' })
  }

  // Verificar que el token no sea vacío
  if (!token) {
    return res.status(400).json({ message: 'Token is required' })
  }

  try {
    // Validar que el token sea valido y no este manipulado
    const payload = jwt.decode(token, process.env.SECRET)
    // {"id":"6630524eb91407fde9cd48a5","email":"drstrange4@marvel.com","role":"CUSTOMER","iat":1714446403,"exp":1715051203}

    // Verifico si el token ha expirado
    const now = Math.floor(Date.now() / 1000) // Fecha actual en segundos

    if (payload.exp < now) {
      return res.status(403).json({ message: 'Token has expired' })
    }

    // Guardar el rol del usuario en la petición
    req.role = payload.role

    next() // Si todo esta bien, continua con la petición
  } catch (error) {
    return res.status(403).json({ message: `Token Error: ${error.message}` })
  }
}

export { isAuth }
