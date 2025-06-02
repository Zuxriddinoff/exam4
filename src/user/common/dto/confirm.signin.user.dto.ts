import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class ConfirmSignInUserDto{
    @IsEmail()
    @IsNotEmpty()
    email: string

    @IsString()
    @IsNotEmpty()
    otp: string
}