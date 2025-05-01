import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { SubDepartment } from './sub-department.entity';

@Entity()
export class Department {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100 })
    name: string;

    @OneToMany(() => SubDepartment, subDepartment => subDepartment.department, {
        cascade: true,
        eager: true
    })
    subDepartments: SubDepartment[];
}