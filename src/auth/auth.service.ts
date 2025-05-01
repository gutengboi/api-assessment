import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { loginDto } from "./dto/login.dto";
import { User } from "src/user/entities/user.entity";
import { Repository } from "typeorm";
import * as bcrypt from 'bcryptjs';
import { JwtService } from "@nestjs/jwt";
import { OTPService } from "src/otp/otp.service";

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private readonly useRepository: Repository<User>,
        private jwtService: JwtService,
        private readonly otpService: OTPService

    ) { }

    async login(dto: loginDto) {
        try {
            const { email, password, otp } = dto;
            //check if user exists
            const user = await this.useRepository.findOne({ where: { email } });

            if (!user) {
                throw new UnauthorizedException('Email doesnt exist');
            }
            const passwordMatch = await bcrypt.compare(password, user.password);
            if (!passwordMatch) {
                throw new UnauthorizedException('Invalid credentials')
            }
            
            // check for account status
            if (user.accountStatus === 'unverified') {
                if (!otp) {
                    return {
                        message: 'Your account is not verified.please provide your otp to verify.'
                    };
                }
                else {
                    await this.verifyToken(user.id, otp);
                }
            }
            // generate a jwt token
            const payload = { id: user.id, email: user.email };
            const accessToken = this.jwtService.sign(payload);

            return {
                accessToken,
                userId: user.id,
                email: user.email
            };
        }
        catch (err) {
            if (
                err instanceof UnauthorizedException || 
                err instanceof BadRequestException
            ) {
                throw err;
            }
            throw new BadRequestException('Login failed');
        }
    }

    async verifyToken(userId: number, token: string) {
        await this.otpService.validateOTP(userId, token);

        const user = await this.useRepository.findOne({
            where: { id: userId },
        });

        if (!user) {
            throw new UnauthorizedException('User not found');
            }
        //if otp is valid, account is verified
        user.accountStatus = 'verified';
        return await this.useRepository.save(user);
    }

    //service for reset password
    async resetPassword(token: string, newPassword: string): Promise<string> {
        const userId = await this.otpService.validateResetPassword(token);

        const user = await this.useRepository.findOne({
            where: {id: userId}
        })
        if (!user) {
            throw new BadRequestException('User not found');
        }

        //hash the new password and update
        user.password = await bcrypt.hash(newPassword, 10);
        await this.useRepository.save(user);

        return 'Password reset successfully';
    }
}