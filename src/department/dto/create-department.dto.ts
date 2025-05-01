import { IsString, IsOptional, ValidateNested, MinLength, IsArray } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateSubDepartmentDto {
    @IsString()
    @MinLength(2, { message: 'Sub-department name must be at least 2 characters long' })
    name: string;
}

export class CreateDepartmentDto {
    @IsString()
    @MinLength(2, { message: 'Department name must be at least 2 characters long' })
    name: string;

    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateSubDepartmentDto)
    subDepartments?: CreateSubDepartmentDto[];
}