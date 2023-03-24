import {IsEmail, IsNotEmpty, IsString, MaxLength, MinLength} from "class-validator";

export class CreatePlayerDto {
    @MaxLength(20)
    @IsNotEmpty()
    @IsString()
    name: string;

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
