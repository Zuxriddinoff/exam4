import { Body, Controller, Post, Res, UseInterceptors } from "@nestjs/common";
import { SignInUser } from "./auth.service";
import { SignInUserDto } from "../common/dto/signin-admin.dto";
import { Response } from "express";
import { CacheInterceptor } from "@nestjs/cache-manager";
import { ConfirmSignInUserDto } from "../common/dto/confirm.signin.user.dto";

@Controller('auth')
export class SignInUserController {
    constructor(private readonly signInUser:SignInUser) { }

    @UseInterceptors(CacheInterceptor)
    @Post("signin")
    async signin(
        @Body() signInUserDto:SignInUserDto,
        @Res({passthrough:true}) res: Response){
        return this.signInUser.signInUser(signInUserDto)
    }

    @Post("confirmsignin")
    async confirmSign(@Body() confirmDto: ConfirmSignInUserDto, @Res({passthrough:true}) res:Response){
        return this.signInUser.confirmSignIn(confirmDto, res)
    }

    @Post("signout")
    async signOut(@Res({ passthrough: true }) res: Response) {
        return this.signInUser.signOut(res);
    }
}