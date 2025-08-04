import { IsString, IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { UserTypes } from 'src/common/interfaces/userTypes';

export class createUserDto {
    @IsNotEmpty()
    @IsString()
    username: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    password: string;

    @IsNotEmpty()
    @IsString()
    role: UserTypes
}
