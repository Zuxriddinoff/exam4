import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { User } from "../common/models/user.model";
import {SignInUserDto} from "../common/dto/signin-admin.dto"
import { decrypt } from "src/utils/bcrypt-decrypt";
import { catchError } from "src/utils/catch-error";
import { Token } from "src/utils/generate-token";
import { Response } from "express";
import { generateOtp } from "src/utils/generate-otp";
import { MailService } from "src/mail/mail.service";
import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { Cache } from "cache-manager";
import { ConfirmSignInUserDto } from "../common/dto/confirm.signin.user.dto";
import { writeToCookie } from "src/utils/write-cookiie";

@Injectable()
export class SignInUser {
    constructor(@InjectModel(User) private model: typeof User,
    private readonly token:Token,
    private readonly mailService: MailService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache
    ) { }

    async signInUser(signInAdminDto:SignInUserDto):Promise<object>{
        try {
            console.log('salom');
            
            const {email, password} = signInAdminDto
        
            const admin =await this.model.findOne({where:{email}})
            if(!admin){
                throw new BadRequestException('emial or password incorrect')
            }
            const ISMatchPassword = await decrypt(password, admin?.dataValues?.hashedPassword);
            if(!ISMatchPassword){
                throw new BadRequestException('emial or password incorrect')
            }
            
            const otp = generateOtp()
            console.log(otp);
            await this.cacheManager.set(email, otp, 120000 )
            await this.mailService.sendOtp('zuxriddinovoff@gmail.com', otp)
            return {
                statusCode:200,
                message: 'success',
                data: otp
            }
        } catch (error) {
            return catchError(error)
        }
    }

    async confirmSignIn(confirmDto: ConfirmSignInUserDto, res: Response){
        try {
            const {email, otp } = confirmDto;
            const user = await this.model.findOne({where:{email}})
            if(!user){
                throw new BadRequestException('email address incorrect')
            }
            const isTrueOtp = await this.cacheManager.get(email);
            if(!isTrueOtp || isTrueOtp != otp){
                throw new BadRequestException('OTP expired');
            }
            const {id, role} = user.dataValues;
            const payload = {id, role};
            const accessToken = await this.token.generateAccessToken(payload)
            const refreshToken = await this.token.generateRefreshToken(payload)
            writeToCookie(res, "refreshToken", refreshToken)
            return {
                StatusCode:200,
                message:"success",
                token:accessToken
            }
        } catch (error) {
            return catchError(error)
        }
    }

    async signOut(res: Response): Promise<object> {
    try {
        res.clearCookie("refreshToken");

        return {
            statusCode: 200,
            message: "Successfully signed out",
        };
    } catch (error) {
        return catchError(error);
    }
}

}