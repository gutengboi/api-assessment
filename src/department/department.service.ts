import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Department } from './entities/department.entity';
import { SubDepartment } from './entities/sub-department.entity';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { UpdateSubDepartmentDto } from './dto/update-sub-department.dto';
import { DepartmentFilterDto } from './dto/department-filter.dto';

@Injectable()
export class DepartmentsService {
    constructor(
        @InjectRepository(Department)
        private departmentRepository: Repository<Department>,
        @InjectRepository(SubDepartment)
        private subDepartmentRepository: Repository<SubDepartment>,
    ) { }

    async create(createDepartmentDto: CreateDepartmentDto): Promise<Department> {
        const department = this.departmentRepository.create({
            name: createDepartmentDto.name,
            subDepartments: createDepartmentDto.subDepartments?.map(subDept => ({
                name: subDept.name,
            })) || [],
        });

        return this.departmentRepository.save(department);
    }

    async findAll(filterDto: DepartmentFilterDto): Promise<{ departments: Department[]; total: number; page: number; limit: number }> {
        const { topLevelOnly, search, page = 1, limit = 10 } = filterDto;
        const skip = (page - 1) * limit;

        const queryBuilder = this.departmentRepository.createQueryBuilder('department')
            .leftJoinAndSelect('department.subDepartments', 'subDepartment');

        if (topLevelOnly) {
            queryBuilder.andWhere('department.id NOT IN (SELECT DISTINCT "departmentId" FROM sub_department WHERE "departmentId" IS NOT NULL)');
        }

        if (search) {
            queryBuilder.andWhere('department.name LIKE :search OR subDepartment.name LIKE :search', { search: `%${search}%` });
        }

        const [departments, total] = await queryBuilder
            .skip(skip)
            .take(limit)
            .getManyAndCount();

        return {
            departments,
            total,
            page,
            limit
        };
    }

    async findOne(id: number): Promise<Department> {
        const department = await this.departmentRepository.findOne({
            where: { id },
            relations: ['subDepartments']
        });

        if (!department) {
            throw new NotFoundException(`Department with ID ${id} not found`);
        }

        return department;
    }

    async update(id: number, updateDepartmentDto: UpdateDepartmentDto): Promise<Department> {
        const department = await this.findOne(id);

        if (updateDepartmentDto.name) {
            department.name = updateDepartmentDto.name;
        }

        // Handle sub-departments update if provided
        if (updateDepartmentDto.subDepartments) {
            // Remove existing sub-departments
            if (department.subDepartments.length > 0) {
                await this.subDepartmentRepository.remove(department.subDepartments);
            }

            // Create new sub-departments
            department.subDepartments = updateDepartmentDto.subDepartments.map(subDept =>
                this.subDepartmentRepository.create({
                    name: subDept.name,
                    department
                })
            );
        }

        return this.departmentRepository.save(department);
    }

    async remove(id: number): Promise<void> {
        const department = await this.findOne(id);
        await this.departmentRepository.remove(department);
    }

    // Sub-department specific operations
    async findSubDepartment(id: number): Promise<SubDepartment> {
        const subDepartment = await this.subDepartmentRepository.findOne({
            where: { id },
            relations: ['department']
        });

        if (!subDepartment) {
            throw new NotFoundException(`Sub-department with ID ${id} not found`);
        }

        return subDepartment;
    }

    async updateSubDepartment(id: number, updateSubDepartmentDto: UpdateSubDepartmentDto): Promise<SubDepartment> {
        const subDepartment = await this.findSubDepartment(id);

        if (updateSubDepartmentDto.name) {
            subDepartment.name = updateSubDepartmentDto.name;
        }

        return this.subDepartmentRepository.save(subDepartment);
    }

    async removeSubDepartment(id: number): Promise<void> {
        const subDepartment = await this.findSubDepartment(id);
        await this.subDepartmentRepository.remove(subDepartment);
    }
}