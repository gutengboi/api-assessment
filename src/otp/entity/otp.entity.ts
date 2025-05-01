import { User } from "src/user/entities/user.entity";
import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn
} from "typeorm";
import { OTPType } from "../type/otpTypes";

@Entity()
export class OTP {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, { nullable: false })
    @JoinColumn()
    user: User;

    @Column()
    token: string //hashed otp for verification or reset token for password

    @Column({ type: 'enum', enum: OTPType })
    type: OTPType;

    @Column()
    expiresAt: Date;

    @CreateDateColumn()
    createdAt: Date;
}