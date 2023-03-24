import {IsEmail, IsNotEmpty, IsString, MaxLength, MinLength} from "class-validator";

export class LoginDto {
    @IsEmail()
    @IsNotEmpty()
    @IsString()
    email: string;

    @MaxLength(20)
    @MinLength(10)
    @IsNotEmpty()
    @IsString()
    password: string;
}
