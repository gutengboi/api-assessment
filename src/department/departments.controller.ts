import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UseGuards,
    Query,
    ParseIntPipe,
    HttpCode,
    HttpStatus
} from '@nestjs/common';
import { DepartmentsService } from './department.service';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { UpdateSubDepartmentDto } from './dto/update-sub-department.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { DepartmentFilterDto } from './dto/department-filter.dto';

@Controller('departments')
export class DepartmentsController {
    constructor(private readonly departmentsService: DepartmentsService) { }

    @Post()
    @UseGuards(JwtAuthGuard)
    @HttpCode(HttpStatus.CREATED)
    create(@Body() createDepartmentDto: CreateDepartmentDto) {
        return this.departmentsService.create(createDepartmentDto);
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    findAll(@Query() filterDto: DepartmentFilterDto) {
        return this.departmentsService.findAll(filterDto);
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.departmentsService.findOne(id);
    }

    @Patch(':id')
    @UseGuards(JwtAuthGuard)
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateDepartmentDto: UpdateDepartmentDto,
    ) {
        return this.departmentsService.update(id, updateDepartmentDto);
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    @HttpCode(HttpStatus.NO_CONTENT)
    async remove(@Param('id', ParseIntPipe) id: number) {
        await this.departmentsService.remove(id);
        return { message: 'Department deleted successfully' };
    }

    // Sub-department specific endpoints
    @Get('sub/:id')
    @UseGuards(JwtAuthGuard)
    findSubDepartment(@Param('id', ParseIntPipe) id: number) {
        return this.departmentsService.findSubDepartment(id);
    }

    @Patch('sub/:id')
    @UseGuards(JwtAuthGuard)
    updateSubDepartment(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateSubDepartmentDto: UpdateSubDepartmentDto,
    ) {
        return this.departmentsService.updateSubDepartment(id, updateSubDepartmentDto);
    }

    @Delete('sub/:id')
    @UseGuards(JwtAuthGuard)
    @HttpCode(HttpStatus.NO_CONTENT)
    async removeSubDepartment(@Param('id', ParseIntPipe) id: number) {
        await this.departmentsService.removeSubDepartment(id);
        return { message: 'Sub-department deleted successfully' };
    }
}