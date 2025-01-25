import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { createUserDto } from './dtos/create-user.dto';
import { updateUserDto } from './dtos/update-user.dto';

@Injectable()
export class UsersService {
  private users = [
    {
      id: 1,
      firstName: 'levan',
      lastName: 'levanadze',
      email: 'levanadze@gmail.com',
      phoneNumber: '595207580',
      gender: 'male',
    },
    {
      id: 2,
      firstName: 'levan2',
      lastName: 'levanadze2',
      email: 'levanadze2@gmail.com',
      phoneNumber: '511417582',
      gender: 'male',
    },
  ];

  create(createUserDto: createUserDto) {
    const { firstName, lastName, email, phoneNumber, gender } = createUserDto;

    if (firstName || lastName || email || phoneNumber || gender)
      throw new HttpException('all fildes is required', HttpStatus.BAD_REQUEST);

    const lastId = this.users[this.users.length - 1]?.id || 0;

    const newUser = {
      id: lastId + 1,
      firstName,
      lastName,
      email,
      phoneNumber,
      gender,
    };

    this.users.push(newUser);
    return newUser;
  }

  findAll() {
    return this.users;
  }

  findOne(id: number) {
    const user = this.users.find((el) => el.id === id);

    return user;
  }

  update(id: number, updateUserDto: updateUserDto) {
    const userIndex = this.users.findIndex((el) => el.id === id);
    if (userIndex === -1) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const updatedUser = { ...this.users[userIndex], ...updateUserDto };

    this.users[userIndex] = updatedUser;

    return updatedUser;
  }

  remove(id: number) {
    const index = this.users.findIndex((el) => el.id === id);
    if (index === -1)
      throw new HttpException('user not  found', HttpStatus.NOT_FOUND);

    const deleteUser = this.users.splice(index, 1);

    return deleteUser;
  }
}
