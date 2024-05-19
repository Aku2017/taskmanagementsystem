/* eslint-disable prettier/prettier */
import {Injectable, NotFoundException} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { PrismaService } from "src/prisma/prisma.service"
import { UserService } from "src/user/user.service"
import { LoginDto } from "./dto/login-user.dto"
import * as bcrypt from 'bcrypt'
import { RegisterUserDto } from './dto/register-user.dto'
//import { Users } from 'src/user/user.model'

@Injectable()
export class AuthService
{
    constructor(
        private readonly prismaService: PrismaService,
        private jwtService: JwtService,
        private readonly userService: UserService
    ) { }
    
    async login(loginDto: LoginDto): Promise<any>{
        const { email, password } = loginDto;

        const users = await this.prismaService.user.findUnique({
            where: {email}
        })

        if (!users)
        {
            throw new NotFoundException('user not found')    
        }

        const validatePassword = await bcrypt.compare(password, users.password)

        if (!validatePassword) {
            throw new NotFoundException('Invalid Password')
        }

        return {
            token: this.jwtService.sign({ email })
        }
    }
    
  /* async register(createDto: RegisterUserDto): Promise<any> {
    const createUser = new Users();
    createUser.name = createDto.name;
    createUser.email = createDto.email;
    createUser.username = createDto.username;
    createUser.password = await bcrypt.hash(createDto.password, 10);

    try {
        const user = await this.userService.createUser(createUser);
        console.log('User created successfully:', user);

        // Ensure user has an email property before signing the JWT
        if (!user.email) {
            throw new Error('User creation failed: No email returned.');
        }

        const token = this.jwtService.sign({ email: user.email });
        console.log('Token generated:', token);

        return { token };
    } catch (error) {
        console.error('Error in registration:', error);
        throw new Error('Registration failed');
    }
}*/

    
async register(createDto: RegisterUserDto): Promise<any> {
    /*const createUser = new Users();
    createUser.name = createDto.name;
    createUser.email = createDto.email;
    createUser.username = createDto.username;
    createUser.password = await bcrypt.hash(createDto.password, 10);*/
    const hashedPassword = await bcrypt.hash(createDto.password, 10)
    const createUser = {
        ...createDto,
        password: hashedPassword   
    };

    const user = await this.userService.createUser(createUser);
    console.log('User created successfully:', user);

        // This was to create token for registration but may not be needed as sending link to the email
        //can be used to sing in.
    return { token: this.jwtService.sign({ email: user.email }) };
        

    }
}