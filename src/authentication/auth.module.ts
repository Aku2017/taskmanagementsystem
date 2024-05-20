/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategy';
import { UserService } from 'src/user/user.service';
import { UserModule } from 'src/user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { UserGateway } from 'src/websocket/UserGateway';


@Module({
    imports: [
        UserModule, 
        PassportModule,
        JwtModule.register({
            secret: process.env.JWT_SECRET,
            signOptions:
            {
                expiresIn: process.env.JWT_EXPIRES_IN
            }
        })
    ],
    controllers: [AuthController],
    providers: [AuthService, PrismaService, JwtStrategy, UserService, UserGateway],
    
})
export class AuthModule {

}