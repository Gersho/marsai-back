import type { UserResponse } from './User.interface.js';

export default interface AuthResponse {
  user: UserResponse;
  accessToken: string;
}
