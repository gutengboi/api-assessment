import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { DepartmentsService } from './department.service';
import { Department } from './entities/department.entity';
import { SubDepartment } from './entities/sub-department.entity';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { UpdateSubDepartmentDto } from './dto/update-sub-department.dto';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { DepartmentFilterDto } from './dto/department-filter.dto';

@Resolver(() => Department)
export class DepartmentResolver {
    constructor(private readonly departmentsService: DepartmentsService) { }

    @Mutation(() => Department)
    @UseGuards(JwtAuthGuard)
    createDepartment(@Args('input') createDepartmentDto: CreateDepartmentDto) {
        return this.departmentsService.create(createDepartmentDto);
    }

    @Query(() => [Department])
    @UseGuards(JwtAuthGuard)
    departments(@Args('filter', { nullable: true }) filterDto: DepartmentFilterDto) {
        return this.departmentsService.findAll(filterDto).then(result => result.departments);
    }

    @Query(() => Department)
    @UseGuards(JwtAuthGuard)
    department(@Args('id', { type: () => Int }) id: number) {
        return this.departmentsService.findOne(id);
    }

    @Mutation(() => Department)
    @UseGuards(JwtAuthGuard)
    updateDepartment(
        @Args('id', { type: () => Int }) id: number,
        @Args('input') updateDepartmentDto: UpdateDepartmentDto,
    ) {
        return this.departmentsService.update(id, updateDepartmentDto);
    }

    @Mutation(() => Boolean)
    @UseGuards(JwtAuthGuard)
    deleteDepartment(@Args('id', { type: () => Int }) id: number) {
        return this.departmentsService.remove(id).then(() => true);
    }

    @Query(() => SubDepartment)
    @UseGuards(JwtAuthGuard)
    subDepartment(@Args('id', { type: () => Int }) id: number) {
        return this.departmentsService.findSubDepartment(id);
    }

    @Mutation(() => SubDepartment)
    @UseGuards(JwtAuthGuard)
    updateSubDepartment(
        @Args('id', { type: () => Int }) id: number,
        @Args('input') updateSubDepartmentDto: UpdateSubDepartmentDto,
    ) {
        return this.departmentsService.updateSubDepartment(id, updateSubDepartmentDto);
    }

    @Mutation(() => Boolean)
    @UseGuards(JwtAuthGuard)
    deleteSubDepartment(@Args('id', { type: () => Int }) id: number) {
        return this.departmentsService.removeSubDepartment(id).then(() => true);
    }
}