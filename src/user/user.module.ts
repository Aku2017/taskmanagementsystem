/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UsersController } from './user.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
    imports: [PrismaModule],
    controllers: [UsersController],
    providers: [UserService],
})
export class UserModule {}

// src/user/user.module.ts
//import { Module } from '@nestjs/common';
//import { UserService } from './user.service';
//import { UsersController } from './user.controller';
//import { PrismaModule } from 'src/prisma/prisma.module';

//@Module({
  //imports: [PrismaModule],
  //controllers: [UsersController],
 // providers: [UserService],
//})
//export class UserModule {}
