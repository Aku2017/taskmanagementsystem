/* eslint-disable prettier/prettier */
import { INestApplication, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from 'node_modules/@prisma/client';


export class PrismaService extends PrismaClient implements OnModuleInit{
 
    async onModuleInit() {
        await this.$connect()
    }
 
    async onModuleDestroy() {
        await this.$disconnect()
    }
 
    async enableShutdownHooks(app: INestApplication) {
        app.enableShutdownHooks();
        await app.close();
     }
}
