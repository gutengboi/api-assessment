import { IsOptional, IsBoolean, IsString, IsInt, Min } from 'class-validator';
import { Transform, Type } from 'class-transformer';

export class DepartmentFilterDto {
    @IsOptional()
    @IsBoolean()
    @Transform(({ value }) => value === 'true')
    topLevelOnly?: boolean;

    @IsOptional()
    @IsString()
    search?: string;

    @IsOptional()
    @IsInt()
    @Min(1)
    @Type(() => Number)
    page?: number = 1;

    @IsOptional()
    @IsInt()
    @Min(1)
    @Type(() => Number)
    limit?: number = 10;
}