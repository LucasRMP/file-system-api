import { Injectable } from '@nestjs/common';
import { CreateUsersCodeFirstInput } from './dto/create-users-code-first.input';
import { UpdateUsersCodeFirstInput } from './dto/update-users-code-first.input';

@Injectable()
export class UsersCodeFirstService {
  create(createUsersCodeFirstInput: CreateUsersCodeFirstInput) {
    return 'This action adds a new usersCodeFirst';
  }

  findAll() {
    return `This action returns all usersCodeFirst`;
  }

  findOne(id: number) {
    return `This action returns a #${id} usersCodeFirst`;
  }

  update(id: number, updateUsersCodeFirstInput: UpdateUsersCodeFirstInput) {
    return `This action updates a #${id} usersCodeFirst`;
  }

  remove(id: number) {
    return `This action removes a #${id} usersCodeFirst`;
  }
}
