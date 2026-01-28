import db from '../database/connection.js';
import type User from '../types/interfaces/User.interface.js';

const findByEmail = async (email: string): Promise<User | null> => {
  const [rows] = await db.execute<User[]>(
    'SELECT u.*, r.name as role FROM user u JOIN role_user ru ON ru.user_id = u.id JOIN role r ON r.id = ru.role_id WHERE u.email = ? LIMIT 1',
    [email],
  );

  return rows[0] ?? null;
};

const userModel = {
  findByEmail,
};

export default userModel;
