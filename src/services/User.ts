import _dissoc from 'ramda/src/dissoc';

import User from '../models/User';
import { DEFAULT_PAGINATION_PAYLOAD } from '../constants/pagination';
import { PaginationRequestPayload } from '../types/PaginationRequestPayload';
import { ResponseWithPagination } from '../types/ResponseWithPagination';

class UserService {
  static async getAll(pagination: PaginationRequestPayload): Promise<ResponseWithPagination<User>> {
    const page = Number(pagination?.page) || DEFAULT_PAGINATION_PAYLOAD.page;
    const limit = Number(pagination?.per_page) || DEFAULT_PAGINATION_PAYLOAD.per_page;
    const offsetValue = (page - 1) * limit;

    const users = await User.query().orderBy('email').limit(limit).offset(offsetValue);
    const usersCount = await User.query().resultSize();
    const totalPageCount = Math.ceil(usersCount / limit);

    return {
      metadata: {
        page,
        per_page: limit,
        page_count: totalPageCount,
        total_count: usersCount,
      },
      data: users.map((user) => _dissoc('password', user)),
    };
  }

  static async getById(id: number): Promise<User> {
    const user = await User.query().findById(id).throwIfNotFound({
      message: 'User does not exist',
    });

    return _dissoc('password', user);
  }

  static delete(id: number): Promise<number> {
    return User.query().deleteById(id).throwIfNotFound();
  }

  static async update(id: number, options: Partial<User>): Promise<User | number> {
    const user = await User.query().updateAndFetchById(id, options).throwIfNotFound();

    return _dissoc('password', user);
  }
}

export default UserService;
