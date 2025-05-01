// departments.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DepartmentsService } from './department.service';
import { DepartmentsController } from './departments.controller';
import { Department } from './entities/department.entity';
import { SubDepartment } from './entities/sub-department.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([Department, SubDepartment]),
        AuthModule,
    ],
    controllers: [DepartmentsController],
    providers: [DepartmentsService],
    exports: [DepartmentsService],
})
export class DepartmentsModule { }