import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';

import { Employee } from 'src/schemas/employee.schema';
import { EmployeeService } from './employee.service';

import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';

@Controller('/api/employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Post()
  async addEmployee(@Body() createEmployeeDto: CreateEmployeeDto) {
    try {
      const newEmployee = await this.employeeService.insertEmployeeService(
        createEmployeeDto,
      );
      return { id: newEmployee.id };
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @Get()
  getAllEmployees(): Promise<Employee[]> {
    return this.employeeService.getAllEmployeesService();
  }

  @Get(':id')
  getEmployeeById(@Param('id') employeeID: string) {
    return this.employeeService.getEmployeeByIdService(employeeID);
  }

  @Get('/usertype/:role')
  getEmployeeByRole(@Param('role') employeeRole: string) {
    return this.employeeService.getEmployeeByRoleService(employeeRole);
  }

  @Put(':id')
  updateEmployee(
    @Param('id') employeeID: string,
    @Body() updateEmployeeDto: UpdateEmployeeDto,
  ): Promise<{ id: string; message: string }> {
    return this.employeeService.updateEmployeeService(
      employeeID,
      updateEmployeeDto,
    );
  }

  @Delete(':id')
  async deleteEmployee(@Param('id') employeeID: string) {
    try {
      return await this.employeeService.deleteEmployeeService(employeeID);
    } catch {
      throw new NotFoundException('Employee Not Found');
    }
  }
}
