import * as Knex from 'knex';
import bcrypt from 'bcrypt';

const DEFAULT_USERS = [
  {
    id: 1,
    email: 'admin@mail.com',
    password: process.env.ADMIN_PASSWORD,
    role_id: 2,
  },
  {
    id: 2,
    email: 'user@mail.com',
    password: 'user',
    role_id: 1,
  },
  {
    id: 3,
    email: 'test@mail.com',
    password: 'test',
    role_id: 1,
  },
];

export async function seed(knex: Knex): Promise<void[]> {
  return Promise.all(
    DEFAULT_USERS.map(async (user) => {
      const formattedUser = {
        ...user,
        password: await bcrypt.hash(user.password, 10),
      };

      await knex('users').insert(formattedUser);
    }),
  );
}
