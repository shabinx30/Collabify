import { IsString, IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class SignInDto {
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    password: string;
}
