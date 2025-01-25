import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Delete,
  Body,
  UseGuards,
} from '@nestjs/common';
import { ExpensesService } from './expenses.service';
import { CreateExpensingDto } from './dtos/create-expense.dto';
import { UpdateExpensingDto } from './dtos/updaate-expense.dto';
import { DateRestrictedGuard } from 'src/guards/resetDay.guard';
import { validExpense } from 'src/guards/validExpense.guard';
@Controller('expenses')
export class ExpensesController {
  constructor(private readonly expensesService: ExpensesService) {}

  @Post()
  @UseGuards(DateRestrictedGuard)
  @UseGuards(validExpense)
  create(@Body() CreateExpensingDto: CreateExpensingDto) {
    return this.expensesService.create(CreateExpensingDto);
  }

  @Get()
  @UseGuards(DateRestrictedGuard)
  @UseGuards(validExpense)
  findAll() {
    return this.expensesService.findAll();
  }

  @Get(':id')
  @UseGuards(DateRestrictedGuard)
  @UseGuards(validExpense)
  findOne(@Param('id') id) {
    return this.expensesService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(DateRestrictedGuard)
  @UseGuards(validExpense)
  update(
    @Param('id') id: string,
    @Body() UpdateExpensingDto: UpdateExpensingDto,
  ) {
    return this.expensesService.update(+id, UpdateExpensingDto);
  }

  @Delete(':id')
  @UseGuards(DateRestrictedGuard)
  @UseGuards(validExpense)
  remove(@Param('id') id) {
    return this.expensesService.remove(id);
  }
}
