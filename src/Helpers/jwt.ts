import jwt, { Secret, SignOptions, JwtPayload } from 'jsonwebtoken';

// Clave secreta (deberías usar una variable de entorno en producción)
const JWT_SECRET: Secret = process.env.JWT_SECRET || 'mi_clave_secreta';

// Función para generar un token
export function generateToken(payload: Record<string, any>): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '24h' } as SignOptions);
}

// Función para verificar un token
export function verifyToken(token: string): JwtPayload | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded as JwtPayload;
  } catch (err) {
    console.error('Token inválido o expirado', err);
    return null;
  }
}
