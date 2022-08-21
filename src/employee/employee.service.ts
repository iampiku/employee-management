import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Employee } from 'src/schemas/employee.schema';
import { EmployeeRole } from 'src/enum/employee-role.enum';

import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectModel('Employee') private readonly employeeModel: Model<Employee>,
  ) {}

  employeeRoles = Object.values(EmployeeRole);

  async insertEmployeeService(createEmployeeDto: CreateEmployeeDto) {
    if (!this.employeeRoles.includes(createEmployeeDto.role))
      throw new BadRequestException(
        "Employee Role doesn't exist in the system",
      );
    return await new this.employeeModel(createEmployeeDto).save();
  }

  async getAllEmployeesService(): Promise<Employee[]> {
    try {
      const allEmployees = await this.employeeModel.find().exec();
      return allEmployees.map((employee) => ({
        id: employee.id,
        firstName: employee.firstName,
        lastName: employee.lastName,
        emailID: employee.emailID,
        address: employee.address,
        role: employee.role,
      })) as Employee[];
    } catch {
      throw new NotFoundException('No Employees in the system');
    }
  }

  async getEmployeeByIdService(employeeID: string): Promise<{
    id: string;
    firstName: string;
    lastName: string;
    emailID: string;
    address: string;
    role: string;
  }> {
    try {
      const employee = await this.employeeModel.findById(employeeID).exec();
      return {
        id: employee.id,
        firstName: employee.firstName,
        lastName: employee.lastName,
        emailID: employee.emailID,
        address: employee.address,
        role: employee.role,
      };
    } catch {
      throw new NotFoundException('Employee is not present in the Database');
    }
  }

  async getEmployeeByRoleService(employeeRole: string): Promise<Employee[]> {
    const filteredEmployees = await this.employeeModel
      .find({
        role: employeeRole,
      })
      .exec();
    if (filteredEmployees.length === 0)
      throw new NotFoundException('Given role does not exisit in the DB');
    return filteredEmployees.map((employee) => ({
      id: employee.id,
      firstName: employee.firstName,
      lastName: employee.lastName,
      emailID: employee.emailID,
      address: employee.address,
      role: employee.role,
    })) as Employee[];
  }

  async updateEmployeeService(
    employeeID: string,
    updateEmployeeDto: UpdateEmployeeDto,
  ): Promise<{ id: string; message: string }> {
    try {
      const updatedEmployee = await this.employeeModel
        .findByIdAndUpdate({ _id: employeeID }, updateEmployeeDto)
        .exec();
      updatedEmployee.save();
      return {
        id: updatedEmployee.id,
        message: 'Employee Updated Successfully',
      };
    } catch {
      throw new NotFoundException('Employee is not present in the Database');
    }
  }

  async deleteEmployeeService(employeeID: string) {
    const employee = this.employeeModel.findById(employeeID);
    // check if there is any employee with employeeID present in the DB;
    if (!employee) throw new NotFoundException('Employee Not found');

    return this.employeeModel
      .deleteOne({
        _id: employeeID,
      })
      .exec();
  }
}
