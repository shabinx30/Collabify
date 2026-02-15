import { IsString, IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { TRoles } from 'src/common/interfaces/user/role';

export class SignUpDto {
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
    role: TRoles;
}
