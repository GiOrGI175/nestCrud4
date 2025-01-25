// src/expensing/expensing.service.ts
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateExpensingDto } from './dtos/create-expense.dto';
import { UpdateExpensingDto } from './dtos/updaate-expense.dto';

@Injectable()
export class ExpensesService {
  private expenses = [
    {
      id: 1,
      category: 'Electronics',
      productName: 'Laptop',
      quantity: 1,
      price: 1000,
      totalPrice: 1000,
    },
    {
      id: 2,
      category: 'Groceries',
      productName: 'Bananas',
      quantity: 5,
      price: 2,
      totalPrice: 10,
    },
  ];

  create(createExpensingDto: CreateExpensingDto) {
    const { category, productName, quantity, price } = createExpensingDto;

    if (!category || !productName || !quantity || !price) {
      throw new HttpException(
        'All fields are required',
        HttpStatus.BAD_REQUEST,
      );
    }

    const totalPrice = quantity * price;

    const newExpense = {
      id: this.expenses.length + 1,
      category,
      productName,
      quantity,
      price,
      totalPrice,
    };

    this.expenses.push(newExpense);
    return newExpense;
  }

  findAll() {
    return this.expenses;
  }

  findOne(id: number) {
    const expense = this.expenses.find((exp) => exp.id === id);
    if (!expense) {
      throw new HttpException('Expense not found', HttpStatus.NOT_FOUND);
    }
    return expense;
  }

  update(id: number, updateExpensingDto: UpdateExpensingDto) {
    const expenseIndex = this.expenses.findIndex((exp) => exp.id === id);
    if (expenseIndex === -1) {
      throw new HttpException('Expense not found', HttpStatus.NOT_FOUND);
    }

    const updatedExpense = {
      ...this.expenses[expenseIndex],
      ...updateExpensingDto,
    };

    if (updatedExpense.quantity && updatedExpense.price) {
      updatedExpense.totalPrice =
        updatedExpense.quantity * updatedExpense.price;
    }

    this.expenses[expenseIndex] = updatedExpense;
    return updatedExpense;
  }

  remove(id: number) {
    const index = this.expenses.findIndex((exp) => exp.id === id);
    if (index === -1) {
      throw new HttpException('Expense not found', HttpStatus.NOT_FOUND);
    }

    const deletedExpense = this.expenses.splice(index, 1);
    return deletedExpense;
  }
}
