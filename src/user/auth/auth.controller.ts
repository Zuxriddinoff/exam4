import { Body, Controller, Post, Res } from "@nestjs/common";
import { SignInUser } from "./auth.service";
import { SignInUserDto } from "../common/dto/signin-admin.dto";
import { Response } from "express";

@Controller('signin')
export class SignInUserController {
    constructor(private readonly signInUser:SignInUser) { }

    @Post()
    signin(
        @Body() signInUserDto:SignInUserDto,
        @Res({passthrough:true}) res: Response){
        return this.signInUser.signInUser(signInUserDto)
    }
}