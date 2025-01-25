import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Delete,
  Body,
} from '@nestjs/common';
import { ExpensesService } from './expenses.service';
import { CreateExpensingDto } from './dtos/create-expense.dto';
import { UpdateExpensingDto } from './dtos/updaate-expense.dto';
@Controller('expenses')
export class ExpensesController {
  constructor(private readonly expensesService: ExpensesService) {}

  @Post()
  create(@Body() CreateExpensingDto: CreateExpensingDto) {
    return this.expensesService.create(CreateExpensingDto);
  }

  @Get()
  findAll() {
    return this.expensesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id) {
    return this.expensesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() UpdateExpensingDto: UpdateExpensingDto,
  ) {
    return this.expensesService.update(+id, UpdateExpensingDto);
  }

  @Delete(':id')
  remove(@Param('id') id) {
    return this.expensesService.remove(id);
  }
}
