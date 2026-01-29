import type AuthResponse from '../types/interfaces/auth-response.interface.js';
import userModel from '../models/user.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import type { AuthRequest } from '../types/schemas/auth-request.schema.js';

const login = async (
  authRequest: AuthRequest,
): Promise<AuthResponse | null> => {
  const user = await userModel.findByEmail(authRequest.email);
  if (!user) {
    return null;
  }
  const { password, ...userWithoutPassword } = user;
  const isMatch = await bcrypt.compare(authRequest.password, password);

  if (!isMatch) return null;

  //TODO change expiresIn
  const accessToken = jwt.sign(
    { id: user.id, roles: user.roles },
    process.env.JWT_SECRET,
    { expiresIn: '4h' },
  );

  const response: AuthResponse = {
    user: userWithoutPassword,
    accessToken,
  };

  return response;
};

const authService = {
  login,
};

export default authService;
