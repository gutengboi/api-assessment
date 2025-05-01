// import { Module } from "@nestjs/common";
// import { TypeOrmModule } from "@nestjs/typeorm";
// import { User } from "src/user/entities/user.entity";
// import { AuthService } from "./auth.service";
// import { JwtModule, JwtService } from "@nestjs/jwt";
// import { ConfigModule, ConfigService } from "@nestjs/config";
// import { AuthController } from "./auth.controller";
// import { OTPModule } from "src/otp/otp.module";
// import { JwtAuthGuard } from "./guards/jwt-auth.guard";


// @Module({
//     imports: [TypeOrmModule.forFeature([User]),
//     JwtModule.registerAsync({
//         imports: [ConfigModule],
//         inject: [ConfigService],
//         useFactory: async (configService: ConfigService) => ({
//             secret: configService.get<string>('JWT_SECRET'),
//             signOptions: { expiresIn: '1h' }
//         }),
//     }),
//     OTPModule,
//     ],
//     controllers: [AuthController, JwtAuthGuard],
//     providers: [AuthService, JwtAuthGuard, JwtService],
// })
// export class AuthModule {}

import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/user/entities/user.entity";
import { AuthService } from "./auth.service";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { AuthController } from "./auth.controller";
import { OTPModule } from "src/otp/otp.module";
import { JwtStrategy } from "./jwt.strategy";

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get<string>('JWT_SECRET'),
                signOptions: { expiresIn: '1h' },
            }),
        }),
        OTPModule,
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy], // ✅ JwtStrategy instead of JwtAuthGuard
    exports: [AuthService, JwtModule],     // ✅ Export JwtModule so other modules get JwtService
})
export class AuthModule { }
