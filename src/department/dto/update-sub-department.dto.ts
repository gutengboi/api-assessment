import { IsString, MinLength } from 'class-validator';

export class UpdateSubDepartmentDto {
    @IsString()
    @MinLength(2, { message: 'Sub-department name must be at least 2 characters long' })
    name: string;
}